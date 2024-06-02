package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/redianmf/go-react-auth/controllers"
)

func AuthRoutes(route *gin.Engine) {
	auth := route.Group("/auth")

	auth.POST("/register", controllers.Register)
	auth.POST("/login", controllers.Login)
	auth.POST("/refresh-token", controllers.RefreshAuthToken)
}
