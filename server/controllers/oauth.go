package controllers

import (
	"context"
	"crypto/rand"
	"encoding/base64"
	"encoding/json"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/redianmf/go-react-auth/config"
	"github.com/redianmf/go-react-auth/database"
	"github.com/redianmf/go-react-auth/models"
	"github.com/redianmf/go-react-auth/services"
	"golang.org/x/oauth2"
)

// @Summary google login
// @Description Google OAuth2 Login
// @Tags Auth
// @Produce json
// @Success 200 {object} object{code=number,url=string}
// @Router /auth/google/login [get]
func GoogleOAuthLogin(c *gin.Context) {
	oAuthState := generateStateOAuth()
	u := config.GoogleOauthConfig.AuthCodeURL(oAuthState, oauth2.AccessTypeOffline)

	c.JSON(http.StatusOK, gin.H{
		"code": http.StatusOK,
		"url":  u,
	})
}

// @Summary google login callback
// @Description Google OAuth2 Login Callback
// @Tags Auth
// @Produce json
// @Success 200 {object} object{code=number,message=string,data=object{user=models.UserApiResponse,token=models.AuthToken}}
// @Param code query string false "code from google oauth2"
// @Router /auth/google/callback [post]
func GoogleOAuthCallback(c *gin.Context) {
	var (
		user            models.User
		existingUser    models.User
		userApiResponse models.UserApiResponse
	)

	userAgent := c.Request.UserAgent()
	userIpAddress := c.ClientIP()

	tx := database.DB.Begin()

	code := c.Query("code")
	if code == "" {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": map[string]any{
				"code":    http.StatusBadRequest,
				"message": "Invalid callback url",
			},
		})
		return
	}

	// Get token from google
	googleToken, err := config.GoogleOauthConfig.Exchange(context.Background(), code)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Get user information from google
	userInfo, err := services.GetGoogleUserInfo(googleToken.AccessToken)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Check if email exist
	tx.Where("email = ?", userInfo["email"].(string)).First(&existingUser)
	if existingUser.ID == 0 {
		// Register user if email not found
		user.Email = userInfo["email"].(string)
		user.Name = userInfo["name"].(string)

		if err = tx.Create(&user).Error; err != nil {
			tx.Rollback()
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
				"error": map[string]any{
					"code":    http.StatusInternalServerError,
					"message": "Unable to save user data",
				},
			})
			return
		}
	}

	// TODO:Save google oauth data to db

	// Create own token
	tx.Where("email = ?", userInfo["email"].(string)).First(&existingUser)
	jwtService := services.Jwt{}
	authToken, err := jwtService.CreateAuthToken(existingUser)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
			"error": map[string]any{
				"code":    http.StatusInternalServerError,
				"message": "Cannot create auth token",
			},
		})
		return
	}

	// Soft delete user login data if already expired or not active
	deleteLoginData := tx.Delete(&models.UserLoginData{}, "user_id = ? AND expired_at < ? OR is_active = ?", existingUser.UserId, time.Now(), false)
	if deleteLoginData.Error != nil {
		tx.Rollback()
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
			"error": map[string]any{
				"code":    http.StatusInternalServerError,
				"message": "Cannot login",
			},
		})
		return
	}

	// Save user login data
	userLoginData := models.UserLoginData{
		UserId:       existingUser.UserId,
		UserAgent:    userAgent,
		ClientIp:     userIpAddress,
		RefreshToken: authToken.RefreshToken,
		ExpiredAt:    authToken.RefreshTokenExp,
		IsActive:     true,
	}
	saveLoginData := tx.Create(&userLoginData)
	if saveLoginData.Error != nil {
		tx.Rollback()
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
			"error": map[string]any{
				"code":    http.StatusInternalServerError,
				"message": "Cannot login",
			},
		})
		return
	}

	// Transform struct
	userJson, err := json.Marshal(existingUser)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
			"error": map[string]any{
				"code":    http.StatusInternalServerError,
				"message": "Error user data",
			},
		})
		return
	}

	err = json.Unmarshal(userJson, &userApiResponse)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
			"error": map[string]any{
				"code":    http.StatusInternalServerError,
				"message": "Error user data",
			},
		})
		return
	}

	tx.Commit()

	c.JSON(http.StatusOK, gin.H{
		"code":    http.StatusOK,
		"message": "Login success",
		"data": map[string]any{
			"user":  userApiResponse,
			"token": authToken,
		},
	})
}

func generateStateOAuth() string {
	b := make([]byte, 16)
	rand.Read(b)
	state := base64.URLEncoding.EncodeToString(b)

	return state
}
