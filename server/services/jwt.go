package services

import (
	"errors"
	"fmt"
	"os"
	"strconv"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"github.com/redianmf/go-react-auth/models"
)

type Jwt struct{}

func (j Jwt) CreateAuthToken(user models.User) (models.AuthToken, error) {
	var err error

	accessTokenExpireDuration, err := strconv.Atoi(os.Getenv("JWT_ACCESS_TOKEN_EXPIRE"))
	if err != nil {
		panic(err)
	}

	accessTokenExpiredTime := time.Now().Add(time.Second * time.Duration(accessTokenExpireDuration))

	// Generate JWT
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.UserId,
		"exp": accessTokenExpiredTime.Unix(),
	})

	var authToken models.AuthToken

	authToken.AccessTokenExp = accessTokenExpiredTime
	authToken.AccessToken, err = token.SignedString([]byte(os.Getenv("SECRET")))
	if err != nil {
		return authToken, err
	}

	return j.createRefreshToken(authToken)
}

func (Jwt) createRefreshToken(authToken models.AuthToken) (models.AuthToken, error) {
	var err error

	refreshTokenExpireDuration, err := strconv.Atoi(os.Getenv("JWT_REFRESH_TOKEN_EXPIRE"))
	if err != nil {
		panic(err)
	}

	refreshTokenExpiredTime := time.Now().Add(time.Second * time.Duration(refreshTokenExpireDuration))

	// Generate JWT
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"token": authToken.AccessToken,
		"exp":   refreshTokenExpiredTime.Unix(),
	})

	authToken.RefreshTokenExp = refreshTokenExpiredTime
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

	claims, ok := token.Claims.(jwt.MapClaims)
	if ok && token.Valid {
		user.UserId = uuid.MustParse(claims["sub"].(string))
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

	if payload["token"].(string) != model.AccessToken {
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

	user.UserId = uuid.MustParse(payload["sub"].(string))

	return user, nil
}
