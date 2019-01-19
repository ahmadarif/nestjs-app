## Description

```
Simple NestJS Apps
```

## Requirements
- NodeJS
- Redis
- [Http Server](https://www.npmjs.com/package/http-server) (optional, for running client app)

## Installation

```bash
$ npm install
```

## Configuration
```bash
# copy environment config (update your own connection settings)
$ cp .env.example .env
```

## Running the app

```bash
# development
$ npm run serve

# production mode
$ npm run start:prod

# build
$ npm run build

# run compiled code
$ npm run start / npm start

# run client app (websocket client)
$ http-server client
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```