<h1 align="center">
  Neth-express-api-ts
</h1>
<h4 align="center">A RESTful API written in Typescript using <a href="https://github.com/expressjs/express" target="_blank">Express</a></h4>
<h5 align="center">JWT auth, Access-Control Lists (ACL), Uploads, MongoDB in one :package: </h5>
<div align="center">
    <img src="#lines#" alt="Lines Covered">
    <img src="#buildstatus#" alt="Build Status">
    <img src="https://img.shields.io/badge/Node-%3E=12.0.0-grey?logo=node.js&color=339933" alt="Node Version Required">
    <img src="https://img.shields.io/badge/Built%20with-Typescript-blue" alt="Built with Typescript">
</div>
<div align="center">
  <sub>Made with ❤ by <a href="https://github.com/Netherium">Netherium</a></sub>
</div>


## Table of contents

- [Quick Start](#quick-start)
- [Features](#features)
- [Basic Routes](#basic-routes)
- [Resource Permissions](#resource-permissions)
- [Coding Tips](#coding-tips)
- [Structure](#structure)
- [Media Objects](#media-objects)
- [Query Parameters](#query-parameters)
- [Tests](#tests)
- [Debug](#debug)
- [Authors](#authors)
- [Copyright and license](#copyright-and-license)


## Quick Start


1. :zap: Clone this repo
    ```bash
    $ git clone https://github.com/Netherium/neth-express-api-ts
    ```

2. :pray: Install dependencies
    ```bash
    $ npm install
    ```

3. :evergreen_tree: Setup your environment files: `.env`, `.env.test`, `.env.production`, according to `.env.sample`
    ```bash
    ADDRESS=localhost
    PORT=4000
    MONGODB_URL=mongodb://localhost:27017/YOUDBNAMEHERE
    ELASTIC_URL=localhost:9200
    SECRET=YOURSECRETHERE
    ....
    ```

4. :dash: Develop
     ```bash
    $ npm run dev
    ```

5. :bulb: Initialize: Navigate to http://localhost:4000/api/auth/init
    - 2 Roles will be created, 1 Admin, 1 Public
    - 1 User will be created, based on your `.env` credentials
    - Resource permissions will be created for basic routes, with default access to admin Role

6. :rocket: Build!
    ```bash
    $ npm run build
    ```

## Features
  
- Typescript Intellisense Awesomeness
- Robust routing and middleware based on same principles of Express
- MongoDB integration
- Fuzzy search with 'mongoose-fuzzy-searching'
- Protected routes, ACL based with middleware, using [`jwt-token`](https://jwt.io/)
- File Upload routes and thumbnail generator
- Test and Coverage
- REST API Documentation via [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)
- Various helper files and tools, i.e. CORS integration, swagger.yaml, .env environment setup
- Several scripts for easy development and testing


## Basic Routes

The basic routes provided are listed below.
Each one of them is being reflected by its own `route`, `controller`, `model`
 
#### Auth
- :unlock: `api/auth/register` [POST]
- :unlock: `api/auth/login` [POST]
- :closed_lock_with_key: `api/auth/profile` [GET, PUT, DELETE]
- :unlock: `api/auth/init` [GET]

#### Roles
- :closed_lock_with_key: `api/roles` [GET, GET `/:id`, POST, PUT `/:id`, DELETE `/:id`]

#### Resource Permissions
- :closed_lock_with_key: `api/resource-permissions` [GET, GET `/:id`, POST, PUT `/:id`, DELETE `/:id`]

#### Users
- :closed_lock_with_key: `api/users` [GET, GET `/:id`, POST, PUT `/:id`, DELETE `/:id`]

#### Media Objects
- :closed_lock_with_key: `api/media-objects` [GET, GET `/:id`, POST, PUT `/:id`, DELETE `/:id`]

#### Docs
- :unlock: `api/docs` [GET]

#### Root
- :unlock: `/` [GET]

#### Endpoints
- :closed_lock_with_key: `api/endpoints` [GET]

#### Books (Provided example Resource Route)
- :closed_lock_with_key: `api/books` [GET, GET `/:id`, POST, PUT `/:id`, DELETE `/:id`]

## Resource Permissions

- Add a new route with Access-Control List (ACL) by invoking middleware function `Auth.getACL()`
I.e. file `book.route.ts`
```typescript
    export class BookRoute {
      constructor() {
        this.router.get('/', Auth.getAcl(), controller.list);
        ...
        this.router.post('/', Auth.getAcl(), controller.create);
      }
    }
```

- Add the appropriate resource-permission for this resource for each method (`list`, `create`, in this case) and for each method the roles that will have access to.

```bash
POST api/resource-permissions
{
    resourceName: 'books',
    methods: [
        {
            name: 'list',
            roles: [PublicRoleId]
        },
        {
            name: 'create',
            roles: [AdminRoleId, RegisteredUserRoleId]
        }
    ]
}
``` 
:warning: **If you add at least 1 unauthenticated role then this resource route will be open**


## Coding Tips

Get Service

- Register any service in `server.ts`, under `registerServices` function
- Access it anywhere by destructuring it `const {uploadService} = req.app.get('services');`

Get Authenticated User

- When a route is authenticated, you can access the authenticated user by `res.locals.authUser`

Get Resource Permissions

- For optimization, resource-permissions are stored in `app.locals.resourcePermissions`.
    If you update manually a resource (i.e. not via api call, but database manipulation), restart server or call `Auth.updateAppPermissions()`


## Structure

Follow the structure below. It will keep things and your mind tidy :blossom:

    .
    ├── dist                # Compiled files ready to deploy `npm run test`
    ├── uploads             # When using local provider this is where uploads go
    │
    ├── src                 # Your code goes here
    │   ├── routes          # Routes that define endpoints, methods, handlers and middleware
    │   ├── controllers     # Controllers that handle functionality from routes
    │   ├── models          # Mongoose models and typescript interfaces
    │   ├── middleware      # Middleware functions
    │   ├── services        # Services in OOP style that can be called in controllers 
    │   ├── helpers         # Exported functions that need no instantiation  
    │   └── server.ts       # Server entrypoint file
    │                       
    ├── test                # Automated tests `npm run test`
    │
    ├── swagger.yaml        # Swagger documentation (`api/docs`) defined in yaml format
    ├── LICENSE             # License file
    └── README.md           # This File


## Media Objects

- MediaObjects can be stored locally or remotely, see `.env`
- To upload a file `POST api/media-objects` with `Content-Type: multipart/form-data;` or use [Postman](https://www.postman.com/)
- Field `file` is the file data, `altenativeText`, `caption` are optional strings
- `PUT api/media-objects/:id` accepts `Content-Type: application/json;` as only `altenativeText`, `caption` can be modified
- If file is of image type, a thumbnail (80x80) will be generated

## Query Parameters

The following query parameters are available for all routes

Key | Type | Description | Example | Notes
:---: | --- | --- | --- | :---:
`q` | Parameter |  search like | `api/books?q=rings` | searches all fields that have fuzzy search enabled
`_eq` | Suffix |  property equal to | `api/books?title_eq=Lord of the rings` | - 
`_ne` | Suffix |  property not equal to | `api/books?title_ne=Lord of the rings` | -
`_lt` | Suffix |  property less than | `api/books?isbn_lt=1235466` | -
`_lte` | Suffix |  property less or equal | `api/books?isbn_lte=1235466` | -
`_gt` | Suffix |  property greater than | `api/books?isbn_gt=1235466` | -
`_gte` | Suffix |  property greater or equal | `api/books?isbn_gte=123546`6 | -
`_sort` | Parameter |  sort by property | `api/books?_sort=-isbn` | use `-` for desc
`_limit` | Parameter |  limit by a number  | `api/books?_limit=-1` | use -1 for unlimited<br>**Default: All list routes have limit=10**
`_page` | Parameter |  get paginated results | `api/books?_limit=-1` | use with `_limit`


## Tests

Testing is based on [Mocha](https://www.npmjs.com/package/mocha), [chai](https://www.npmjs.com/package/chai) and [chai-http](https://www.npmjs.com/package/chai-http)

Run tests, based on `.env.test`
```bash
$ npm test
```


## Coverage

Coverage is based on [nyc](https://www.npmjs.com/package/nyc)

Run coverage (generated under folder `coverage`)

```bash
$ npm run test:coverage
```


## Debug
  
To debug TS without compiling it, you can setup your IDE of choice as in the example below  
Note: Running older versions of node  may require attaching `--inspect` before `--require`

<img src="https://raw.githubusercontent.com/Netherium/neth-express-api-ts/master/img/debug_setup.png">


## Authors
**[Netherium](https://github.com/Netherium)**


## Copyright and license
Code released under [the MIT license](https://github.com/Netherium/neth-express-api-ts/blob/master/LICENSE)
