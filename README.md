# API Docs

## :exclamation: Important to know
* :no_entry_sign: means that the endpoint is authenticated, this means that the user needs to include the Bearer token in the header field Authorization

* :cop: means that the endpoint relates only to objects belonging to the user (e.g., you cannot download images that does not belong to you)

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
#### Logout :no_entry_sign:

Endpoint: POST /auth/logout

Response: /

## Users
#### Retrieve User Profile :no_entry_sign: :cop:

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
#### Retrieve Users List :no_entry_sign:

Endpoint: GET /users/:id

Response: user object including the list of images belonging to him
```json
{
  "id": "integer",
  "first_name": "string",
  "last_name": "string",
  "email": "string"
}
```
___
## Images 
#### Upload Image :no_entry_sign:

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
#### Retrieve Images List :no_entry_sign: :cop:

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
#### Update Image :no_entry_sign: :cop:

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
#### Delete Image :no_entry_sign: :cop:

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
#### Download Image :no_entry_sign: :cop:

Endpoint: GET /images/:id

Response: download the requested image
