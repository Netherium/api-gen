<p align="center">
  <img src="https://raw.githubusercontent.com/Netherium/api-gen/master/img/repo-logo-760x480.png" alt="Neth-api-gen" width="380">
</p>

<h4 align="center">A powerful RESTful Headless CMS written in Typescript using <a href="https://github.com/expressjs/express" target="_blank">Express</a> and <a href="https://angular.io/" target="_blank">Angular</a></h4>
<h5 align="center">JWT auth, Access-Control Lists (ACL), Uploads, MongoDB, Angular and Angular Material in one :package:  </h5>
<p align="center">
    <img src="https://img.shields.io/badge/Coverage-99.02%25-brightgreen.svg" alt="Lines Covered">
    <img src="https://img.shields.io/badge/Build-Passing-brightgreen.svg" alt="Build Status">
    <img src="https://img.shields.io/badge/Node-%3E=12.0.0-grey?logo=node.js&color=339933" alt="Node Version Required">
    <img src="https://img.shields.io/badge/Built%20with-Typescript-blue" alt="Built with Typescript">
</p>
<p align="center">
  <sub>Made with ❤ by <a href="https://github.com/Netherium">Netherium</a></sub>
</p>


## Table of contents

- [Quick Start](#quick-start)
- [Features](#features)
- [Cli Options](#cli-options)
- [Develop](#develop)
- [Basic API Routes](#basic-api-routes)
- [Resource Permissions](#resource-permissions)
- [Coding Tips](#coding-tips)
- [Structure](#structure)
- [Uploads](#uploads)
- [Under The Hood](#under-the-hood)
- [Tests](#tests)
- [Debug](#debug)
- [Authors](#authors)
- [Copyright and license](#copyright-and-license)


## Quick Start

1. :zap: Npm install <b>globally</b>
    ```bash
    $ npm i -g @netherium/api-gen
    ```

2. :rocket: Launch
    ```bash
    $ neth-api-gen
    ```

3. :computer: Fill in choices
<img src="https://raw.githubusercontent.com/Netherium/api-gen/master/img/cli.png">

4.  :pray: If you generated project, navigate and install dependencies

    Server

     ```bash
    $ cd myproject/server
    $ npm install
    $ copy `.env.sample` to `.env` and adjust credentials
    $ npm run dev 
    ```
    Navigate to http://localhost:4000/api/auth/init to initialize app
   
    Client

    ```bash
    $ cd myproject/client
    $ npm install
    $ npm run start (or ng serve)
    ```

    Navigate to http://localhost:4200 and login with your credentials

<p align="center">
    <img src="https://raw.githubusercontent.com/Netherium/api-gen/master/img/admin-panel-login.png" alt="Admin Panel Login">
</p>

   All resources are located in the sidenav under `Resources`
    
<p align="center">
    <img src="https://raw.githubusercontent.com/Netherium/api-gen/master/img/admin-panel-sidenav.png" alt="Admin Panel Sidenav">
</p>

## Features
  
- Typescript Intellisense Awesomeness throughout backend and UI
- Robust routing and middleware based on same principles of Express
- Solid modularized admin panel with [Angular](https://angular.io) and [Angular Material](https://material.angular.io)
- MongoDB integration
- Fuzzy search with 'mongoose-fuzzy-searching'
- Protected routes, ACL based with middleware, using [`jwt-token`](https://jwt.io)
- File Upload routes and thumbnail generator
- Test and Coverage
- REST API Documentation via [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)
- Various helper files and tools, i.e. CORS integration, swagger.yaml, .env environment setup
- Several scripts for easy development and testing


## Cli Options

1. :dash: Gimmie my API!!!
    
   - `neth-api-gen`
   - Select `app`
   - Add entities according to your needs
   - Get a production ready(:crossed_fingers:) api + admin panel including [basic routes](#basic-routes) + the entities you've added ([ACL required](#resource-permissions))
   - Impress your team!

2. :bulb: I forgot to add...

   - `neth-api-gen`
   - Select `entities`
   - Add more entities to your existing neth-api-gen project, or a solid boilerplate for an ExpressJs/Angular project (modifications may apply)
   - Go and play!

3. :joystick: I want more control and faster!!!

   - `neth-api-gen -i mysample.json`
   - Import all the options from a json file, instead of a UI
   - Do it once, do it many!    

4. :confused: But where is that JSON???

   - `neth-api-gen -s`
   -  Oh yeah, forgot to mention it

5. :question: Can you help???

   - `neth-api-gen -h`
   - I can

:warning: When `generateApp: true`, `swaggerDocs` is irrelevant, but you need to provide `swaggerPath: "myproject/swagger.yaml"`
    

## Develop

1.  :pray: If you generated project, navigate and install dependencies
    
    Server
        
     ```bash
    $ cd myproject/server
    $ npm install
    ```

    Client
    
     ```bash
    $ cd myproject/client
    $ npm install
    ```

2. :evergreen_tree: Setup your environment files:

    Server `.env`, `.env.test`, `.env.production`, according to `.env.sample` (under myproject/server)
    
    ```bash
    ADDRESS=localhost
    PORT=4000
    MONGODB_URL=mongodb://localhost:27017/YOUDBNAMEHERE
    ELASTIC_URL=localhost:9200
    SECRET=YOURSECRETHERE
    ...
    ```
   
   Client `environment.ts`, `environment.prod.ts` (under myproject/client/environments)
       
   ```bash
   apiUrl: 'http://localhost:4000/api',         // Endpoint of the server
   authorizedRole: ['Admin']                    // Roles that have authorized access to admin panel
   ...
   ```

3. :dash: Develop

    Server
    
     ```bash
    $ npm run dev
    ```
   
    Client
    
     ```bash
    $ npm run start (ng serve)
    ```   
   

4. :bulb: Initialize: Navigate to http://localhost:4000/api/auth/init
    - 2 Roles will be created, 1 Admin, 1 Public
    - 1 User will be created, based on your `.env` credentials
    - Resource permissions will be created for basic routes, with default access to admin Role

5. :rocket: Build!
    
    Server
    ```bash
    $ npm run build
    ```
    Client
    ```bash
    $ npm run build
    ```
   
6. :fireworks:Your build is ready to deploy !:fireworks:

## Basic API Routes

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

#### Uploads
- :closed_lock_with_key: `api/uploads` [GET, GET `/:id`, POST, PUT `/:id`, DELETE `/:id`]

#### Docs
- :unlock: `api/docs` [GET]

#### Root
- :unlock: `/` [GET]

#### Endpoints
- :closed_lock_with_key: `api/endpoints` [GET]

#### Articles (Example Resource Route)
- :closed_lock_with_key: `api/articles` [GET, GET `/:id`, POST, PUT `/:id`, DELETE `/:id`]

## Resource Permissions

- Add a new route with Access-Control List (ACL) by invoking middleware function `Auth.getACL()`
I.e. file `article.route.ts`
```typescript
    export class ArticleRoute {
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
    resourceName: 'articles',
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

    Server
    .
    ├── dist                # Compiled files ready to deploy `npm run build`
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
    └── README.md

    Client
    .
    ├── dist                            # Compiled files ready to deploy `npm run build`
    │
    ├── src                             # Your code goes here
    │   ├── app             
    │   │   ├── components              # Shared components throughout the Angular app
    │   │   ├── models                  # Shared models throughout the Angular app    
    │   │   ├── services                # Shared core services throughout the Angular app
    │   │   ├── dialogs                 # Shared dialogs
    │   │   ├── modules                 # Lazy loaded modules, each generated resource corresponds to 1 module
    │   │   └── app-routing.module.ts   # Routing module that binds all lazy loaded modules, each generated resource has a child under `childrenRoutes`  
    │   ├── assets                      # Static resources
    │   ├── environments                # Angular environment configuration
    │   ├── theming                     # Angular Material Theming Styles
    │                      
    ... Rest Default Angular Structure


## Uploads

- Uploads can be stored locally or remotely, see `.env`
- To upload a file `POST api/uploads` with `Content-Type: multipart/form-data;` or use [Postman](https://www.postman.com/)
- Field `file` is the file data, `altenativeText`, `caption` are optional strings
- `PUT api/uploads/:id` accepts `Content-Type: application/json;` as only `altenativeText`, `caption` can be modified
- If file of image type, a thumbnail (80x80) will be generated


## Under The Hood

- When you generate an `App`, an Express server project based on [Neth-express-api-ts](https://github.com/Netherium/neth-express-api-ts) and an Angular project are being created
- When you generate an `Entity`, multiple files are generated under `server` and `client` folders
    Server
    - Controller, Model, Route files are generated under their corresponding folders `./server/src/controllers/entity.controller.ts, ./server/src/models/entity.model.ts, ./server/src/routes/entity.route.ts`
    - An entry in `server.ts` is created, under method `routes`
    
    Client
    - A module is being created under its corresponding folder  `./client/src/app/modules/entityfolder/...`
    - An entry in `app-routing.module.ts` is created, under variable `childrenRoutes`


## Tests

- Server testing based on [Mocha](https://www.npmjs.com/package/mocha), [chai](https://www.npmjs.com/package/chai) and [chai-http](https://www.npmjs.com/package/chai-http)
- Client testing based on the default Angular test tools [Jasmine](https://angular.io/guide/testing)
<sub>(Tests not provided/generated for Angular, but you can follow standard Angular practices)</sub>

Run tests

Server
```bash
$ cd myproject/server
$ npm test
```

Client
```bash
$ cd myproject/client
$ npm test (or ng test)
```

## Coverage

Server Coverage is based on [nyc](https://www.npmjs.com/package/nyc)

Run coverage (generated under folder `coverage`)
```bash
$ npm run test:coverage
```

## Debug
  
To debug TS without compiling it, you can setup your IDE of choice as in the example below  
Note: Running older versions of node  may require attaching `--inspect` before `--require`

<img src="https://raw.githubusercontent.com/Netherium/api-gen/master/img/debug_setup.png">


## Authors
**[Netherium](https://github.com/Netherium)**


## Copyright and license
Code released under [the MIT license](https://github.com/Netherium/api-gen/blob/master/LICENSE)
