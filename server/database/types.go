package database

import (
	"fmt"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type DBConnection *gorm.DB

type DatabaseConnection interface {
	Connect() (DBConnection, error)
}

type DBConfig struct {
	DBName    string
	User      string
	Password  string
	Host      string
	Port      string
	Type      string
	SSLMode   string
	TimeZone  string
	dialector gorm.Dialector
}

func (config *DBConfig) Connect() (DBConnection, error) {
	db, err := gorm.Open(config.dialector, &gorm.Config{})
	return db, err
}

// Postgres implementation
type PostgresConnection struct {
	Config *DBConfig
}

func (p *PostgresConnection) Connect() (DBConnection, error) {
	dsn := "host=%s port=%s user=%s " + "password=%s dbname=%s sslmode=disable"
	p.Config.dialector = postgres.Open(fmt.Sprintf(dsn, p.Config.Host, p.Config.Port, p.Config.User, p.Config.Password, p.Config.DBName))
	db, err := p.Config.Connect()

	return db, err
}
