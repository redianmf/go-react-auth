package database

import (
	"log"
	"os"

	"github.com/redianmf/go-react-auth/models"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	pgConfig := PostgresConnection{}

	pgConfig.Config = &DBConfig{
		Host:     os.Getenv("DB_HOST"),
		Port:     os.Getenv("DB_PORT"),
		User:     os.Getenv("DB_USER"),
		Password: os.Getenv("DB_PASSWORD"),
		DBName:   os.Getenv("DB_NAME"),
		SSLMode:  "disable",
	}

	db, err := pgConfig.Connect()
	if err != nil {
		log.Fatal(err)
	}

	DB = db

	// Migrations
	db.Statement.AutoMigrate(&models.User{})
	db.Statement.AutoMigrate(&models.UserLoginData{})
}
