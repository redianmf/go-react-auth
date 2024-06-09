package models

import (
	"errors"
	"fmt"
	"reflect"

	"github.com/go-playground/validator/v10"
	"github.com/google/uuid"
	"github.com/redianmf/go-react-auth/utils"
	"gorm.io/gorm"
)

type User struct {
	UserId   uuid.UUID `json:"user_id" gorm:"type:uuid;unique;primaryKey"`
	Name     string    `json:"name" validate:"required,min=2"`
	Email    string    `json:"email" gorm:"unique" validate:"required,email"`
	Password string    `json:"password" validate:"required,min=6,max=64,contain-number,contain-uppercase,contain-lowercase"`
	gorm.Model
}

func (u *User) BeforeCreate(tx *gorm.DB) error {
	u.UserId = uuid.New()
	return nil
}

func (u User) Validate() (errorList map[string]string, err error) {
	validate := *validator.New()
	validate.RegisterValidation("contain-number", utils.IsContainNumber)
	validate.RegisterValidation("contain-uppercase", utils.IsContainUppercase)
	validate.RegisterValidation("contain-lowercase", utils.IsContainLowercase)

	err = validate.Struct(u)
	if err != nil {
		validationErrors := err.(validator.ValidationErrors)
		errorList := make(map[string]string)

		for _, e := range validationErrors {
			var errMessage string
			field, _ := reflect.TypeOf(u).FieldByName(e.StructField())
			fieldName := field.Tag.Get("json")

			switch e.Tag() {
			case "required":
				errMessage = fmt.Sprintf("%s cannot empty", fieldName)
			case "email":
				errMessage = "invalid email"
			case "min":
				errMessage = fmt.Sprintf("%s minimum %s characters", fieldName, e.Param())
			case "max":
				errMessage = fmt.Sprintf("%s maximum %s characters", fieldName, e.Param())
			case "contain-number":
				errMessage = fmt.Sprintf("%s must contains at least 1 number", fieldName)
			case "contain-uppercase":
				errMessage = fmt.Sprintf("%s must contains at least 1 upper case", fieldName)
			case "contain-lowercase":
				errMessage = fmt.Sprintf("%s must contains at least 1 lower case", fieldName)
			default:
				errMessage = "validation error"
			}

			errorList[fieldName] = errMessage
		}

		return errorList, errors.New("validation error")
	}

	return errorList, nil
}

type LoginPayload struct {
	Email    string `json:"email" example:"redian@gmail.com"`
	Password string `json:"password" example:"123123123"`
}

type RegisterPayload struct {
	Name     string `json:"name" example:"Redian"`
	Email    string `json:"email" example:"redian@gmail.com"`
	Password string `json:"password" example:"123123123"`
}

type RefreshTokenPayload struct {
	RefreshToken string `json:"refresh_token" example:"eyJiowrr98..."`
}

type UserApiResponse struct {
	UserId uuid.UUID `json:"user_id"`
	Name   string    `json:"name"`
	Email  string    `json:"email"`
}
