package middlewares

import "github.com/gin-contrib/cors"

var CorsConfig = cors.New(cors.Config{
	AllowOrigins:     []string{"http://localhost:5173"},
	AllowMethods:     []string{"GET", "POST"},
	AllowHeaders:     []string{"Content-Type", "Content-Length", "Accept-Encoding", "Authorization", "Cache-Control"},
	ExposeHeaders:    []string{"Content-Length"},
	AllowCredentials: true,
})
