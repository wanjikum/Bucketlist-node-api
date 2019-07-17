[![Build Status](https://travis-ci.org/travis-ci/travis-web.svg?branch=master)](https://travis-ci.org/travis-ci/travis-web) [![Coverage Status](https://coveralls.io/repos/github/wanjikum/Bucketlist-node-api/badge.svg?branch=master)](https://coveralls.io/github/wanjikum/Bucketlist-node-api?branch=master)

# BucketList Application API

It's an API that is used to store a list of things that one has not done before but wants to do before dying. It's CRUD API app built on node, express and MongoDB.

## Features

- Users can sign up
- Users can Log in
- A logged in user can Create, View, Update and Delete a bucketlist.
- A logged in user can Create, View, Update and Delete a bucketlist item.

# Documentation

## Endpoints

| EndPoint                                                          | Functionality                                |
| :---------------------------------------------------------------- | :------------------------------------------- |
| `POST /api/v1/auth/signin`                                        | Logs a user in                               |
| `POST /api/v1/auth/signup`                                        | Register a user                              |
| `POST /api/v1/bucketlists/`                                       | Logs a user in                               |
| `GET /api/v1/bucketlists/`                                        | Lists all the created bucket lists           |
| `GET /api/v1/bucketlists?limit=<limit number>&page=<page number>` | Paginates all the created bucket lists       |
| `GET /api/v1/bucketlists/<id>`                                    | Get single bucket list                       |
| `PUT /api/v1/bucketlists/<id>`                                    | Update this bucket list                      |
| `DELETE /api/v1/bucketlists/<id>`                                 | Delete this single bucket list               |
| `GET /api/v1/bucketlists/<id>/bucketlistItems/?limit=1&page=2`    | Paginates all the created bucket lists items |
| `POST /api/v1/bucketlists/<id>/bucketlistItems/`                  | Create a new item in bucket list             |
| `PUT /api/v1/bucketlists/<id>/bucketlistItems/<item_id>`          | Update a bucket list item                    |
| `DELETE /api/v1/bucketlists/<id>/bucketlistItems/<item_id>`       | Delete an item in a bucket list              |

## Swagger documentation

The app is currently documented using swagger 2.0 and the Open API Specification found [here](https://www.google.com).

# GETTING STARTED:

### Running the api locally

1. Clone Repo:

   ```
   $ git clone https://github.com/wanjikum/Bucketlist-node-api.git
   ```

2. Navigate to local directory.

   ```
   $ cd Bucketlist-node-api
   ```

3. Install dependencies

   ```
   $ npm install
   ```

4. Create a .env file with the following details. You can modify them if you wish to.

```
  DEV_SECRET=myDevEnvSecretKey
  DEV_DATABASE='mongodb://127.0.0.1/bucketlist_db'
  DEV_PORT=5000


  TEST_SECRET=myTestEnvSecretKey
  TEST_DATABASE='mongodb:/127.0.0.1/test_bucketlist_db'
  TEST_PORT=5001


  PRODUCTION_SECRET=myProductionEnvSecretKey
  PRODUCTION_DATABASE='mongodb:/127.0.0.1/production_bucketlist_db'
  PRODUCTION_PORT=5002
```

5. Start the server

   ```
   $ npm start
   ```

6. Use Postman to test api on localhost:5000

### Running the tests locally

Assuming you have already done step 1 - 4 above, you can just run this command:

```
$ npm run test
```

# Prerequisites

- Node
- Postman

# Author

Wanjiku
