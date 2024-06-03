package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func DummyAPI(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "This is authenticated endpoint",
	})
}
