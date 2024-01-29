package main

import (
	"context"
	"fmt"
	"net/http"
	"time"
		
	"go.mongodb.org/mongo-driver/bson/primitive"
	"github.com/gin-gonic/gin"
)


// Log structure representing the log data format
type Log struct {
	Level      string    `json:"level"`
	Message    string    `json:"message"`
	ResourceID string    `json:"resourceId"`
	Timestamp  time.Time `json:"timestamp"`
	TraceID    string    `json:"traceId"`
	SpanID     string    `json:"spanId"`
	Commit     string    `json:"commit"`
	Metadata   struct {
		ParentResourceID string `json:"parentResourceId"`
	} `json:"metadata"`
}


// ingestLog handles log ingestion HTTP endpoint with the context ctx.
// The context store the information about the current HTTP request that has been made.

func IngestLogs(ctx *gin.Context) {
	var logs []Log
	if err := ctx.BindJSON(&logs); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	
	var logsArray primitive.A

	// Insert logs into MongoDB
	insertResult, err := collection.InsertMany(context.Background(), logsArray)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to ingest logs"})
		return
	}

	// Get the number of inserted documents
	numInserted := len(insertResult.InsertedIDs)

	ctx.JSON(http.StatusOK, gin.H{"message": fmt.Sprintf("Successfully ingested %d logs", numInserted)})

}

