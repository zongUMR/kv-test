# KV-test

This project build up a Node.js server for storing and retrieving according to the assessment

## Pre-requirements

### Using Docker

1. Only need to install docker on your machine

### Using lcoal deployment

1. Node.js >= 14
2. Postgresql:
   1. Create an user: **dbuser** with `superuser` role
   2. Create a database `postgres`. It should be the default db if you install PostgreSQL successfully.

## Usage

### Using Docker(Recommend)

1. `docker-compose up`: this command will run the app service and postgresSQL db automatically and expose the 3000 port public

### Using local deployment

1. `git clone https://github.com/zongUMR/kv-test.git`
2. `cd kv-test && npm install`
3. Run you postgresql database under the user **dbuser** and database `postgres`: `psql -d postgres -U dbuser`
4. `npm run run:prod`, code will run the server.

Now you can request the apis from the server, `localhost:3000`

## APIS

- local test: `http://localhost/{insert/get}`
- cloud test: `${cloud_ip}/api/{insert/get}`

### Create a record

- Endpoint: `/insert`
- Method: `POST`
- Params body:
  - key: string, this's the key field
  - value: string, this's the value field
- Response:

```json
{
  "result": {
    "key": "key",
    "value": "value",
    "timestamp": "2022-05-26T13:47:58.536Z"
  }
}
```

Request demo

```curl
curl -X "POST" "http://localhost:3000/insert" \
     -H 'Content-Type: application/json' \
     -d $'{
  "key": "zong",
  "value": "meng"
}'
```

### Retrieve a record

- Endpoint: `/get/{key}`
- Method: 'GET'
- Params:
  - timestamp(optional): unix timestamp, api will only return the latest one record before or equal to this timestamp. If user doesn't pass one, api will use current time
- Response:

```json
{
  "data": {
    "value": "meng"
  }
}
```

Request demo:

```curl
curl "http://localhost:3000/get/zong" \
     -H 'Content-Type: application/json'

```
