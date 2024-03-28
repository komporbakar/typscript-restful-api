# User API Spec

## Register User

Endpoint : POST /api/users

Request Body :

```json
{
  "username": "nurrohman",
  "password": "rahasia",
  "name": "Arif Nurrohman"
}
```

Response Body (Success) :

```json
{
  "data": {
    "username": "nurrohman",
    "name": "Arif Nurrohman"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Username must not blank, ..."
}
```

## Login User

Endpoint : POST /api/users/login

Request Body :

```json
{
  "username": "nurrohman",
  "password": "rahasia"
}
```

Response Body (Success) :

```json
{
  "data": {
    "username": "nurrohman",
    "name": "Arif Nurrohman",
    "token": "token123123123213"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Username or password wrong, ..."
}
```

## Get User

Endpoint : GET /api/users/current

Request Header

- X-API-TOKEN : token

Response Body (Success) :

```json
{
  "data": {
    "name": "Arif Nurrohman", //not mandatory
    "password": "rahasia" // not mandatory
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Unauthorized, ..."
}
```

## Update User

Endpoint : PATCH /api/users/current

Request Header

- X-API-TOKEN : token

Request Body :

```json
{
  "username": "nurrohman",
  "password": "rahasia",
  "name": "Arif Nurrohman"
}
```

Response Body (Success) :

```json
{
  "data": {
    "username": "nurrohman",
    "name": "Arif Nurrohman"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Unauthorized, ..."
}
```

## Logout User

Endpoint : PATCH /api/users/current

Request Header

- X-API-TOKEN : token

Response Body (Success) :

```json
{
  "data": "OK"
}
```

Response Body (Failed) :

```json
{
  "errors": "Unauthorized, ..."
}
```
