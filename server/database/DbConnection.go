package database

import (
	"log"
	"os"

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
}

// func ConnectDB() {
// 	dsn := fmt.Sprintf("host=%s port=%s user=%s "+"password=%s dbname=%s sslmode=disable", os.Getenv("DB_HOST"), os.Getenv("DB_PORT"), os.Getenv("DB_USER"), os.Getenv("DB_PASSWORD"), os.Getenv("DB_NAME"))

// 	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
// 	if err != nil {
// 		log.Fatal(err)
// 	}

// 	DB = db
// }
