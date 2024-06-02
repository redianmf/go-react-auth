package middlewares

import (
	"errors"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/redianmf/go-react-auth/services"
)

func ValidateAuth(c *gin.Context) {
	jwtService := services.Jwt{}

	// Get JWT from header
	tokenString, err := GetJWT(c.GetHeader("Authorization"))
	if err != nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
			"error": "token not found",
		})
		return
	}

	_, err = jwtService.ValidateAccessToken(tokenString)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.Next()
}

func GetJWT(authString string) (token string, err error) {
	if authString == "" {
		return "", errors.New("please authenticate")
	}

	tokenArr := strings.Split(authString, " ")
	if len(tokenArr) != 2 {
		return "", errors.New("invalid credentials")
	}

	return tokenArr[1], nil
}
