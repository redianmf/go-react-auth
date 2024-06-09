package utils

import (
	"regexp"

	"github.com/go-playground/validator/v10"
)

func IsContainNumber(fl validator.FieldLevel) bool {
	regex, err := regexp.Compile(`.*[0-9].*`)
	if err != nil {
		panic(err)
	}

	return regex.MatchString(fl.Field().String())
}

func IsContainUppercase(fl validator.FieldLevel) bool {
	regex, err := regexp.Compile(`.*[A-Z].*`)
	if err != nil {
		panic(err)
	}

	return regex.MatchString(fl.Field().String())
}

func IsContainLowercase(fl validator.FieldLevel) bool {
	regex, err := regexp.Compile(`.*[a-z].*`)
	if err != nil {
		panic(err)
	}

	return regex.MatchString(fl.Field().String())
}
