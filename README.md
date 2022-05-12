# Vank API

## Description

API que permite registrar clientes, modificar datos de ellos, consultar datos de facturaciones y actualiza la base de datos desde un archivo csv.

## Installation

```bash
$ npm install
```

## Check for environment file

Make sure you have `.env` file in the root directory of this project. This file contain sensitive data, so be careful with it.

## Running the app - local

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running the app - docker

Assuming that there is already Docker installed in your environment, execute the following commands.

```bash
# build
$ docker build . -t vank-api

# run
$ docker run -p 8080:8080 vank-api
```

## Unit Tests

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Testing the API

You can go to `/api` path to checkout the documentation and test from there too.

You will see something like this.

![Alt text](https://firebasestorage.googleapis.com/v0/b/test-xepelin.appspot.com/o/Screenshot%202022-05-12%20054733.png?alt=media&token=3a90e9d6-77dc-433d-bd68-523b1f9b0238 'Swagger')

## Arquitecture Diagram

![Alt text](https://firebasestorage.googleapis.com/v0/b/test-xepelin.appspot.com/o/Screenshot%202022-05-12%20075501.png?alt=media&token=95dc7829-20ae-4344-aa13-79383845b58e 'Arquitecture Diagram')

## Production ENV

[Link](https://vank-api-v1-pgzjuz2ysq-uc.a.run.app/api/) to access to this app deployed from a container image (using Container Registry service) in Cloud Run.

## Stay in touch

- Author - Avilio Boscan

## License

[MIT licensed](LICENSE).
