package models

import "time"

type AuthToken struct {
	AccessToken     string    `json:"access_token"`
	AccessTokenExp  time.Time `json:"access_token_exp"`
	RefreshToken    string    `json:"refresh_token"`
	RefreshTokenExp time.Time `json:"refresh_token_exp"`
}
