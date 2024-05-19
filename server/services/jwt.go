package services

import (
	"errors"
	"fmt"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"github.com/redianmf/go-react-auth/models"
)

type Jwt struct{}

func (j Jwt) CreateAuthToken(user models.User) (models.AuthToken, error) {
	var err error

	// Generate JWT
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.UserId,
		"exp": time.Now().Add(time.Hour * 1).Unix(),
	})

	var authToken models.AuthToken

	authToken.AccessToken, err = token.SignedString([]byte(os.Getenv("SECRET")))
	if err != nil {
		return authToken, err
	}

	return j.createRefreshToken(authToken)
}

func (Jwt) createRefreshToken(authToken models.AuthToken) (models.AuthToken, error) {
	var err error

	// Generate JWT
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"token": authToken.AccessToken,
		"exp":   time.Now().Add(time.Hour * 24 * 7).Unix(),
	})

	authToken.RefreshToken, err = token.SignedString([]byte(os.Getenv("SECRET")))
	if err != nil {
		return authToken, err
	}

	return authToken, nil
}

func (Jwt) ValidateAccessToken(accessToken string) (models.User, error) {
	token, err := jwt.Parse(accessToken, func(token *jwt.Token) (interface{}, error) {
		_, ok := token.Method.(*jwt.SigningMethodHMAC)
		if !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		return []byte(os.Getenv("SECRET")), nil
	})

	user := models.User{}
	if err != nil {
		return user, err
	}

	payload, ok := token.Claims.(jwt.MapClaims)
	if ok && token.Valid {
		user.UserId = payload["sub"].(uuid.UUID)

		return user, nil
	}

	return user, errors.New("invalid token")
}

func (j Jwt) ValidateRefreshToken(model models.AuthToken) (models.User, error) {
	token, err := jwt.Parse(model.RefreshToken, func(token *jwt.Token) (interface{}, error) {
		_, ok := token.Method.(*jwt.SigningMethodHMAC)
		if !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		return []byte(os.Getenv("SECRET")), nil
	})

	user := models.User{}
	if err != nil {
		return user, err
	}

	payload, ok := token.Claims.(jwt.MapClaims)
	if !(ok && token.Valid) {
		return user, errors.New("invalid token")
	}

	claims := jwt.MapClaims{}
	parser := jwt.Parser{}
	token, _, err = parser.ParseUnverified(payload["token"].(string), claims)
	if err != nil {
		return user, err
	}

	payload, ok = token.Claims.(jwt.MapClaims)
	if !ok {
		return user, errors.New("invalid token")
	}

	user.UserId = payload["user_id"].(uuid.UUID)

	return user, nil
}
