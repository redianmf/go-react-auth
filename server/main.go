package main

import (
	"os"

	"github.com/gin-gonic/gin"
	"github.com/redianmf/go-react-auth/database"
	"github.com/redianmf/go-react-auth/initializers"
	"github.com/redianmf/go-react-auth/routes"
)

func init() {
	initializers.LoadEnv()
	database.ConnectDB()
}

func main() {
	router := gin.Default()
	routes.AuthRoutes(router)
	router.Run("localhost:" + os.Getenv("APP_PORT"))
}
