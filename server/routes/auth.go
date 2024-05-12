package routes

import "github.com/gin-gonic/gin"

func AuthRoutes(route *gin.Engine) {
	auth := route.Group("/auth")

	auth.GET("/users", func(ctx *gin.Context) {
		ctx.JSON(200, "List users")
	})
}
