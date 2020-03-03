# API Docs
## Auth
#### Signup

Endpoint: POST /auth/signup

Body: 
```json
first_name: string
last_name: string
email: string (email format)
password: string (min 8 chars)
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
### Login

Endpoint: POST /auth/login

Body: 
```json
email: string
password: string
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
