# API Docs
## Auth
#### Signup

Endpoint: POST /auth/signup

Body: 
```json
{
  "first_name": "string",
  "last_name": "string",
  "email": "string (email format)",
  "password": "string (min 8 chars)"
}
```
Response: users_id and token to authorize subsequent HTTP calls
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
  "email": "string",
  "password": "string"
}
```
Response: users_id and token to authorize subsequent HTTP calls
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

Response: a list of users objects with their images
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

Response: user object including the list of images belonging to him
```json
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
```
___
## Images
#### Upload Image

Endpoint: POST /images

Body: 
```json
{
  "title": "string",
  "image_base64": "string (base64)"
}
```

Response: array of images belonging to the user
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
___
#### Retrieve Images List

Endpoint: GET /images

Body: 
```json
{
  "title": "string",
  "image_base64": "string (base64)"
}
```

Response: array of images belonging to the user
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
___
#### Update Image

Endpoint: PUT /images/:id

Body: 
```json
{
  "title": "string",
}
```

Response: array of images belonging to the user (including the updated one)
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
___
#### Delete Image

Endpoint: DELETE /images/:id

Response: array of images belonging to the user (not including the deleted one)
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
___
#### Download Image

Endpoint: GET /images/:id

Response: download the requested image
