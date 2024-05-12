package initializers

import (
	"fmt"

	"github.com/joho/godotenv"
)

func LoadEnv() {
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Println("Failed to load file env")
	} else {
		fmt.Println("Success load file env")
	}
}
