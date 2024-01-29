package queryLogs

import (
	"context"
	"net/http"
	
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"

	"github.com/gin-gonic/gin"
)

// This function will help in finding logs, or getting logs based on the parameters.
// Modify the queryLogs function

func QueryLogs(ctx *gin.Context) {
	// Extract query parameters
	queryParams := ctx.Request.URL.Query()

	// Construct the filter based on query parameters
	filter := bson.M{}

	// Example filters based on query parameters
	if level := queryParams.Get("level"); level != "" {
		filter["level"] = level
	}
	if message := queryParams.Get("message"); message != "" {
		filter["message"] = primitive.Regex{Pattern: message, Options: "i"} // Case-insensitive regex match for message
	}
	if resourceID := queryParams.Get("resourceId"); resourceID != "" {
		filter["resourceId"] = resourceID
	}
	if timestamp := queryParams.Get("timestamp"); timestamp != "" {
		// Assuming timestamps are provided in the same format as the log data
		filter["timestamp"] = timestamp
	}
	if traceID := queryParams.Get("traceId"); traceID != "" {
		filter["traceId"] = traceID
	}
	if spanID := queryParams.Get("spanId"); spanID != "" {
		filter["spanId"] = spanID
	}
	if commit := queryParams.Get("commit"); commit != "" {
		filter["commit"] = commit
	}
	if parentResourceID := queryParams.Get("metadata.parentResourceId"); parentResourceID != "" {
		filter["metadata.parentResourceId"] = parentResourceID
	}

	// Query MongoDB with the constructed filter
	cursor, err := collection.Find(context.Background(), filter)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to execute query"})
		return
	}
	defer cursor.Close(context.Background())

	// Iterate over the result cursor and collect the logs
	var resultLogs []Log
	for cursor.Next(context.Background()) {
		var log Log
		if err := cursor.Decode(&log); err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode query result"})
			return
		}
		resultLogs = append(resultLogs, log)
	}

	ctx.JSON(http.StatusOK, resultLogs)
}
