package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/redianmf/go-react-auth/controllers"
	"github.com/redianmf/go-react-auth/middlewares"
)

func AuthRoutes(route *gin.Engine) {
	auth := route.Group("/auth")

	auth.POST("/register", controllers.Register)
	auth.POST("/login", controllers.Login)
	auth.POST("/refresh-token", controllers.RefreshAuthToken)
	auth.GET("/dummy", middlewares.ValidateAuth, controllers.DummyAPI)
}
