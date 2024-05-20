package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/redianmf/go-react-auth/database"
	"github.com/redianmf/go-react-auth/models"
	"github.com/redianmf/go-react-auth/services"
	"golang.org/x/crypto/bcrypt"
)

func Register(c *gin.Context) {
	var (
		user         models.User
		existingUser models.User
	)

	err := c.ShouldBindJSON(&user)
	if err != nil {
		panic(err)
	}

	// Check empty payload
	if user.Name == "" || user.Email == "" || user.Password == "" {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": map[string]any{
				"code":    http.StatusBadRequest,
				"message": "Incomplete data",
			},
		})
		return
	}

	// Check if email exist
	database.DB.Where("email = ?", user.Email).First(&existingUser)
	if existingUser != (models.User{}) {
		c.AbortWithStatusJSON(http.StatusUnprocessableEntity, gin.H{
			"error": map[string]any{
				"code":    http.StatusUnprocessableEntity,
				"message": "Email already exist",
			},
		})
		return
	}

	// Hash password
	hashed, err := bcrypt.GenerateFromPassword([]byte(user.Password), 10)
	if err != nil {
		panic(err)
	}

	user.Password = string(hashed)

	if err = database.DB.Create(&user).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
			"error": map[string]any{
				"code":    http.StatusInternalServerError,
				"message": "Unable to register user",
			},
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"code":    http.StatusOK,
		"message": "Success register user",
		"data":    user,
	})
}

func Login(c *gin.Context) {
	var (
		user            models.User
		existingUser    models.User
		userApiResponse models.UserApiResponse
	)

	err := c.ShouldBindJSON(&user)
	if err != nil {
		panic(err)
	}

	// Validate input
	if user.Email == "" || user.Password == "" {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": map[string]any{
				"code":    http.StatusBadRequest,
				"message": "Please enter username and password",
			},
		})
		return
	}

	// Check if user exist
	database.DB.Where("email = ?", user.Email).First(&existingUser)
	if existingUser.ID == 0 {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{
			"error": map[string]any{
				"code":    http.StatusNotFound,
				"message": "User not found",
			},
		})
		return
	}

	// Compare hashed password
	err = bcrypt.CompareHashAndPassword([]byte(existingUser.Password), []byte(user.Password))
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": map[string]any{
				"code":    http.StatusBadRequest,
				"message": "Invalid email or password",
			},
		})
		return
	}

	// Create auth token
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

	c.JSON(http.StatusOK, gin.H{
		"code":    http.StatusOK,
		"message": "Login success",
		"data": map[string]any{
			"user":  userApiResponse,
			"token": authToken,
		},
	})
}

func RefreshAuthToken(c *gin.Context) {
	var (
		user     models.User
		token    models.AuthToken
		newToken models.AuthToken
	)

	err := c.ShouldBindJSON(&token)
	if err != nil {
		panic(err)
	}

	// Check empty payload
	if token.RefreshToken == "" {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": map[string]any{
				"code":    http.StatusBadRequest,
				"message": "Refresh token not found",
			},
		})
		return
	}

	// Validate refresh token
	jwtService := services.Jwt{}
	user, err = jwtService.ValidateRefreshToken(token)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
			"error": map[string]any{
				"code":    http.StatusUnauthorized,
				"message": err.Error(),
			},
		})
		return
	}

	newToken, err = jwtService.CreateAuthToken(user)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
			"error": map[string]any{
				"code":    http.StatusInternalServerError,
				"message": err.Error(),
			},
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"code":    http.StatusOK,
		"message": "Refreshing token success",
		"data": map[string]any{
			"token": newToken,
		},
	})

}
