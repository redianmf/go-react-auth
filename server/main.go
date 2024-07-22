package main

import (
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/redianmf/go-react-auth/database"
	"github.com/redianmf/go-react-auth/initializers"
	"github.com/redianmf/go-react-auth/routes"
)

func init() {
	initializers.LoadEnv()
	database.ConnectDB()
}

// @title Go React Auth Backend
// @version 0.1.0
// @description Backend service for Go React Auth https://github.com/redianmf/go-react-auth

// @contact.name Redian Fikri
// @contact.email redianmf@gmail.com

// @license.name MIT
// @license.url https://opensource.org/licenses/MIT

// @host localhost:8080
// @BasePath /api/v1
// @query.collection.format multi

// @securityDefinitions.apikey Bearer
// @in header
// @name Authorization
// @description Format: Bearer {token}
func main() {
	router := gin.Default()
	router.Use(cors.Default())

	v1 := router.Group("/api/v1")
	{
		routes.SwaggerRoutes(v1.Group("/swagger"))
		routes.AuthRoutes(v1.Group("auth"))
	}

	router.Run("localhost:" + os.Getenv("APP_PORT"))
}
