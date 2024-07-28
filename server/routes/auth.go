package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/redianmf/go-react-auth/controllers"
	"github.com/redianmf/go-react-auth/middlewares"
)

func AuthRoutes(route *gin.RouterGroup) {
	route.POST("/register", controllers.Register)
	route.POST("/login", controllers.Login)
	route.POST("/logout", controllers.Logout)
	route.POST("/refresh-token", controllers.RefreshAuthToken)
	route.GET("/google/login", controllers.GoogleOAuthLogin)
	route.POST("/google/callback", controllers.GoogleOAuthCallback)
	route.GET("/dummy", middlewares.ValidateAuth, controllers.DummyAPI)
}
