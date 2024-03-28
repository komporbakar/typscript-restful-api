# Address API Spec

## Create Address

Endpoint : POST /api/contact/:idContact/addresses

Request Header :

- X-API_TOKEN : token

Request Body :

```json
{
  "street": "Jalan nangka",
  "city": "Sleman",
  "province": "DI Yogyakarta",
  "country": "Indonesia",
  "postal_code": "45122"
}
```

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "street": "Jalan nangka",
    "city": "Sleman",
    "province": "DI Yogyakarta",
    "country": "Indonesia",
    "postal_code": "45122"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "street must not blank, ..."
}
```

## Get Address

Endpoint : GET /api/contact/:idContact/addresses/:idAddress

Request Header :

- X-API_TOKEN : token

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "street": "Jalan nangka",
    "city": "Sleman",
    "province": "DI Yogyakarta",
    "country": "Indonesia",
    "postal_code": "45122"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Addresses is not found"
}
```

## Update Address

Endpoint : PUT /api/contact/:idContact/addresses/:idAddress

Request Header :

- X-API_TOKEN : token

Request Body :

```json
{
  "street": "Jalan nangka",
  "city": "Sleman",
  "province": "DI Yogyakarta",
  "country": "Indonesia",
  "postal_code": "45122"
}
```

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "street": "Jalan nangka",
    "city": "Sleman",
    "province": "DI Yogyakarta",
    "country": "Indonesia",
    "postal_code": "45122"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "street must not blank, ..."
}
```

## Remove Address

Endpoint : DELETE /api/contact/:idContact/addresses/:idAddress

Request Header :

- X-API_TOKEN : token

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "street": "Jalan nangka",
    "city": "Sleman",
    "province": "DI Yogyakarta",
    "country": "Indonesia",
    "postal_code": "45122"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Unauthorized, Address not found"
}
```

## List Address

Endpoint : GET /api/contact/:idContact/addresses

Request Header :

- X-API_TOKEN : token

Response Body (Success):

```json
{
  "data": [
    {
      "id": 1,
      "street": "Jalan nangka",
      "city": "Sleman",
      "province": "DI Yogyakarta",
      "country": "Indonesia",
      "postal_code": "45122"
    },
    {
      "id": 2,
      "street": "Jalan nangka",
      "city": "Sleman",
      "province": "DI Yogyakarta",
      "country": "Indonesia",
      "postal_code": "45122"
    }
  ]
}
```

Response Body (Failed):

```json
{
  "errors": "Unauthorized, Address is not found, Contact is not found"
}
```
