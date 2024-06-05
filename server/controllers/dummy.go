package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// @Summary dummy endpoint
// @Description Dummy endpoint with protected route
// @Tags Dummy
// @Produce json
// @Success 200 {object} object{message=string}
// @Router /auth/dummy [get]
// @Security Bearer
func DummyAPI(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "This is authenticated endpoint",
	})
}
