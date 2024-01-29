package initializers

import (
  "context"
  "fmt"
  "log"
  "os"

  "gorm.io/driver/postgres"
   "go.mongodb.org/mongo-driver/mongo/options"
   "go.mongodb.org/mongo-driver/mongo"
  "gorm.io/gorm"
)


var mongoClient *mongo.Client
var collection *mongo.Collection
var DB *gorm.DB

func ConnectToPostgresDb(){
	var err error
	dsn := os.Getenv("POSTGRES_DB_URL")
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err !=nil{
		log.Fatal("Failed to connect to postgres database: ",err)
	}

	fmt.Println("Connected to Postgres.")
}

// initMongoDB initializes the MongoDB connection
func ConnectToMongoDb(){

	// Replace the mongoDB URI
	clientOptions := options.Client().ApplyURI(os.Getenv("MONGO_DB_URL"))
	// Extracting client and the error from the mongodb connection.
	client, err := mongo.Connect(context.Background(), clientOptions)
	
	// Error handling
	if err != nil {
		log.Fatal("Failed to connect to MongoDB: ",err)
	}

	// Check the connection
	err = client.Ping(context.Background(), nil)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB")

	mongoClient = client
	collection = client.Database("logsdb").Collection("logs")

}