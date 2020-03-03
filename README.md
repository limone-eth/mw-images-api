# API Docs
## Auth
#### Signup

Endpoint: POST /auth/signup

Body: 
```json
{
  "first_name": "string"
  "last_name": "string"
  "email": "string (email format)"
  "password": "string (min 8 chars)"
}
```
Response:
```json
authentication: {
  "token": "string"
},
user: {
  "id": "integer"
}
```
___
#### Login

Endpoint: POST /auth/login

Body: 
```json
{
  "email": "string"
  "password": "string"
}
```
Response:
```json
authentication: {
  "token": "string"
},
user: {
  "id": "integer"
}
```
___
#### Logout

Endpoint: POST /auth/logout

Response: /

## Users
#### Retrieve User Profile

Endpoint: GET /users

Response:
```json
[
  {
    "id": "integer",
    "first_name": "string",
    "last_name": "string",
    "email": "string",
    "images": [
      {
        "id": "integer",
        "key": "string",
        "title": "string"
      }, 
      {
        "...": "..."
      }
    ]
  }
]
```
___
#### Retrieve Users List

Endpoint: GET /users/:id

Response:
```json
{
  "id: "integer",
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "images": [
    {
      "id": "integer",
      "key": "string",
      "title": "string"
    }, 
    {
      "...": "..."
    }
  ]
}
```
___
## Images
#### Upload Image

Endpoint: POST /images

Body: 
```json
{
  "title": "string"
  "image_base64": "string (base64)"
}
```

Response:
```json
[
  {
    "id": "integer",
    "key": "string",
    "title": "string"
  }, 
  {
    "...": "..."
  }
]
```
