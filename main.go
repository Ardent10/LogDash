package main

import (
	// "context"
	// "fmt"
	// "log"
	// "time"
	
	// "LogDash/ingestLogs"
	// "LogDash/queryLogs"

	"github.com/gin-gonic/gin"
	"LogDash/initializers"
	"LogDash/controllers"
)


func init(){
	initializers.LoadEnvVars()
	initializers.ConnectToPostgresDb()
	initializers.ConnectToMongoDb()
}

func main() {
	
	// Create Gin router
	router := gin.Default()


	router.POST("/api/ingest-logs", controllers.IngestLogs)
	router.GET("/api/get-logs", controllers.QueryLogs)


	router.Run()
}
