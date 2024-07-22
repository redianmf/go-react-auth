// Package docs Code generated by swaggo/swag. DO NOT EDIT
package docs

import "github.com/swaggo/swag"

const docTemplate = `{
    "schemes": {{ marshal .Schemes }},
    "swagger": "2.0",
    "info": {
        "description": "{{escape .Description}}",
        "title": "{{.Title}}",
        "contact": {
            "name": "Redian Fikri",
            "email": "redianmf@gmail.com"
        },
        "license": {
            "name": "MIT",
            "url": "https://opensource.org/licenses/MIT"
        },
        "version": "{{.Version}}"
    },
    "host": "{{.Host}}",
    "basePath": "{{.BasePath}}",
    "paths": {
        "/auth/dummy": {
            "get": {
                "security": [
                    {
                        "Bearer": []
                    }
                ],
                "description": "Dummy endpoint with protected route",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Dummy"
                ],
                "summary": "dummy endpoint",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/auth/login": {
            "post": {
                "description": "Login user",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Auth"
                ],
                "summary": "login",
                "parameters": [
                    {
                        "description": "payload",
                        "name": "payload",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/models.LoginPayload"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "code": {
                                    "type": "number"
                                },
                                "data": {
                                    "type": "object",
                                    "properties": {
                                        "token": {
                                            "$ref": "#/definitions/models.AuthToken"
                                        },
                                        "user": {
                                            "$ref": "#/definitions/models.UserApiResponse"
                                        }
                                    }
                                },
                                "message": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/auth/logout": {
            "post": {
                "security": [
                    {
                        "Bearer": []
                    }
                ],
                "description": "Logout",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Auth"
                ],
                "summary": "logout",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "code": {
                                    "type": "number"
                                },
                                "message": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/auth/refresh-token": {
            "post": {
                "security": [
                    {
                        "Bearer": []
                    }
                ],
                "description": "Refresh auth token",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Auth"
                ],
                "summary": "refresh token",
                "parameters": [
                    {
                        "description": "payload",
                        "name": "payload",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/models.RefreshTokenPayload"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "code": {
                                    "type": "number"
                                },
                                "data": {
                                    "$ref": "#/definitions/models.AuthToken"
                                },
                                "message": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/auth/register": {
            "post": {
                "description": "Register new user",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Auth"
                ],
                "summary": "register",
                "parameters": [
                    {
                        "description": "payload",
                        "name": "payload",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/models.RegisterPayload"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "code": {
                                    "type": "number"
                                },
                                "data": {
                                    "$ref": "#/definitions/models.UserApiResponse"
                                },
                                "message": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "models.AuthToken": {
            "type": "object",
            "properties": {
                "access_token": {
                    "type": "string"
                },
                "access_token_exp": {
                    "type": "string"
                },
                "refresh_token": {
                    "type": "string"
                },
                "refresh_token_exp": {
                    "type": "string"
                }
            }
        },
        "models.LoginPayload": {
            "type": "object",
            "properties": {
                "email": {
                    "type": "string",
                    "example": "redian@gmail.com"
                },
                "password": {
                    "type": "string",
                    "example": "123123123"
                }
            }
        },
        "models.RefreshTokenPayload": {
            "type": "object",
            "properties": {
                "refresh_token": {
                    "type": "string",
                    "example": "eyJiowrr98..."
                }
            }
        },
        "models.RegisterPayload": {
            "type": "object",
            "properties": {
                "email": {
                    "type": "string",
                    "example": "redian@gmail.com"
                },
                "name": {
                    "type": "string",
                    "example": "Redian"
                },
                "password": {
                    "type": "string",
                    "example": "123123123"
                }
            }
        },
        "models.UserApiResponse": {
            "type": "object",
            "properties": {
                "email": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "user_id": {
                    "type": "string"
                }
            }
        }
    },
    "securityDefinitions": {
        "Bearer": {
            "description": "Format: Bearer {token}",
            "type": "apiKey",
            "name": "Authorization",
            "in": "header"
        }
    }
}`

// SwaggerInfo holds exported Swagger Info so clients can modify it
var SwaggerInfo = &swag.Spec{
	Version:          "0.1.0",
	Host:             "localhost:8080",
	BasePath:         "/api/v1",
	Schemes:          []string{},
	Title:            "Go React Auth Backend",
	Description:      "Backend service for Go React Auth https://github.com/redianmf/go-react-auth",
	InfoInstanceName: "swagger",
	SwaggerTemplate:  docTemplate,
	LeftDelim:        "{{",
	RightDelim:       "}}",
}

func init() {
	swag.Register(SwaggerInfo.InstanceName(), SwaggerInfo)
}
