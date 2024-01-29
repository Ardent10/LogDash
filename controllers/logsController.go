package controllers

import (
	"fmt"
	"time"
		
	// "go.mongodb.org/mongo-driver/bson/primitive"
	"github.com/gin-gonic/gin"
	"LogDash/initializers"
	"LogDash/models"
)


// ingestLog handles log ingestion HTTP endpoint with the context ctx.
// The context store the information about the current HTTP request that has been made.


func IngestLogs(ctx *gin.Context) {

	// Get data of request body
	var body []models.PostgresLog

	if err := ctx.Bind(&body); err != nil {
		ctx.JSON(400, gin.H{"error": "Failed to parse request body"})
		return
	}

	var postgresLogs []models.PostgresLog

	for _, log := range body {
		postgresLog := models.PostgresLog{
			Level:      log.Level,
			Message:    log.Message,
			ResourceID: log.ResourceID,
			Timestamp:  log.Timestamp,
			TraceID:    log.TraceID,
			SpanID:     log.SpanID,
			Commit:     log.Commit,
		}
		postgresLogs = append(postgresLogs, postgresLog)
	}
	

	result := initializers.DB.CreateInBatches(&postgresLogs, len(postgresLogs))

	// returns inserted data's primary key
	if result.Error != nil {
		ctx.Status(400)
		fmt.Println("Failed to create log:", result.Error)
		return
	}

	ctx.JSON(200, gin.H{
		"log created successfully. Log ID": result.RowsAffected,
	})
 
	
	//  Insert Metadata into MongoDB
	// insertResult, err := initializers.collection.InsertMany(context.Background(), logsArray)
	// if err != nil {
	// 	ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to ingest logs"})
	// 	return
	// }

	// // Get the number of inserted documents
	// numInserted := len(insertResult.InsertedIDs)

	// ctx.JSON(http.StatusOK, gin.H{"message": fmt.Sprintf("Successfully ingested %d logs", numInserted)})

}

func QueryLogs(ctx *gin.Context) {
	queryParams := ctx.Request.URL.Query()
	// Construct the filter based on query parameters
	var filter models.PostgresLog

	// Example filters based on query parameters
	if level := queryParams.Get("level"); level != "" {
		filter.Level = level
	}
	if message := queryParams.Get("message"); message != "" {
		filter.Message = "%" + message + "%"
	}
	if resourceID := queryParams.Get("resourceId"); resourceID != "" {
		filter.ResourceID = resourceID
	}
	if traceID := queryParams.Get("traceId"); traceID != "" {
		filter.TraceID = traceID
	}
	if spanID := queryParams.Get("spanId"); spanID != "" {
		filter.SpanID = spanID
	}
	if commit := queryParams.Get("commit"); commit != "" {
		filter.Commit = commit
	}
	if timestamp := queryParams.Get("timestamp"); timestamp != "" {
		// Assuming timestamps are provided in the same format as the log data
		t, err := time.Parse(time.RFC3339, timestamp)
		if err != nil {
			ctx.JSON(400, gin.H{"error": "Invalid timestamp format"})
			return
		}

		filter.Timestamp = t
	}
	// Add similar checks for other query parameters...
	fmt.Println(queryParams,filter)

	// Query PostgreSQL database with the constructed filter
	var resultLogs []models.PostgresLog
	if err := initializers.DB.Where(&filter).Find(&resultLogs).Error; err != nil {
		ctx.JSON(400, gin.H{"error": "Failed to execute query"})
		return
	}

	ctx.JSON(200, resultLogs)
}
