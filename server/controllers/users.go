package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/redianmf/go-react-auth/database"
	"github.com/redianmf/go-react-auth/models"
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
