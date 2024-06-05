package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/redianmf/go-react-auth/docs"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func SwaggerRoutes(route *gin.RouterGroup) {
	docs.SwaggerInfo.BasePath = "/api/v1"
	route.GET("/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
}
