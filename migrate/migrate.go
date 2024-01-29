package main

import (
	"LogDash/initializers"
	"LogDash/models"
)

func init(){
	initializers.LoadEnvVars()
	initializers.ConnectToPostgresDb()
}

func main(){
	initializers.DB.AutoMigrate(&models.PostgresLog{})
}