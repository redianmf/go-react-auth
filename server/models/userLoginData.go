package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type UserLoginData struct {
	UserId       uuid.UUID `json:"user_id" gorm:"type:uuid"`
	UserAgent    string    `json:"user_agent" gorm:"type:text"`
	ClientIp     string    `json:"client_ip"`
	RefreshToken string    `json:"refresh_token" gorm:"type:text;unique"`
	ExpiredAt    time.Time `json:"expired_at"`
	ReplacedBy   string    `json:"replaced_by" gorm:"type:text"`
	IsActive     bool      `json:"is_active"`
	gorm.Model
}
