package models

import (
	"time"
	"gorm.io/gorm"
)

type PostgresLog struct {
	gorm.Model
	Level      string   
	Message    string   
	ResourceID string   
	Timestamp  time.Time 
	TraceID    string    
	SpanID     string   
	Commit     string    
}

type MongoDBLog struct {
	ID       string `json:"_id"`
	Metadata struct {
		ParentResourceID string `json:"parentResourceId"`
	} `json:"metadata"`
}
