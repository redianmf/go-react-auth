package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type User struct {
	UserId   uuid.UUID `json:"user_id" gorm:"type:uuid;unique;primaryKey"`
	Name     string    `json:"name"`
	Email    string    `json:"email" gorm:"unique"`
	Password string    `json:"password"`
	gorm.Model
}

func (u *User) BeforeCreate(tx *gorm.DB) error {
	u.UserId = uuid.New()
	return nil
}

type UserApiResponse struct {
	UserId uuid.UUID `json:"user_id"`
	Name   string    `json:"name"`
	Email  string    `json:"email"`
}
