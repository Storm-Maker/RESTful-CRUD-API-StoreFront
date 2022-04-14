# Storefront Backend Project

* [Description](#Description)
* [Required-Technologies](#Required-Technologies)
* [Getting-Started](#Getting-Started)
* [Features](#Features)
* [Instructions](#Instructions)
* [Optional-Resources](#Optional-Resources)
* [Built With](#Built-With)
* [Contributors](#Contributors)
* [Copy Rights](#CopyRights)
---

## Description
Store Front RESTful CRUD API with protected routes using TypeScript, Node JS, ExpressJS, PostgreSQL, and JWT.
---

## Required-Technologies
- PostgreSQL for the database
- Node/Express to run the application
---

## Getting-Started

### Set-up Project:
1. Clone the project - `git clone https://github.com/Storm-Maker/RESTful-CRUD-API-StoreFront.git`
2. Go into the project directory `./`
3. Install the dependencies - `npm install`
4. Start the server - `npm run watch`
5. To run unit testing with Jasmine - `npm run test`

### Database Requirement:
- Create new user in postgress with:
```
    username: shopping_user 
    password: password123
```
- run from terminal: npm run newDB

### Database Connectivity:
-   IP: localhost / 127.0.0.1
-   Port: 5432
-   User Name: shopping_user
-   Password: password123
-   Database Name: shopping
-   Test Database Name: shopping_test

### Environment Variables:
```
NODE_ENV            = [dev or test]
PORT                = [Server Port]
POSTGRES_HOST       = [Postgres IP/host]
POSTGRES_PORT       = [Postgres Port]
POSTGRES_DB         = 'shopping'
POSTGRES_DB_TEST    = 'shopping_test'
POSTGRES_USER       = 'shopping_user'
POSTGRES_PASSWORD   = [Postgres Password]
BCRYPT_PASSWORD     = [Password for BCRYPT]
SALT_ROUNDS         = [Assign number as salt rounds]
TOKEN_SECRET        = [Assign a token secret]
```
---

## Features
1. RESTful CRUD routes for [user, products, orders]
2. Protected Routes using JWT
3. Dashboard Query routes for [Orders By User, Completed Orders By User, Products By Category, Top Five Products]

---

## Instructions

### TO connect to the RESTful Routes:

#### Products - id = Product ID
```
- Index         route: '/products'              [GET]
- Show          route: '/products/:id'          [GET]
- Create        route: '/products'              [POST]      [Token Required]
- Update        route: '/products/:id'          [PUT]       [Token Required]
- Delete        route: '/products/:id'          [DELETE]    [Token Required]
```
#### Users - user_name = user name
```
- Index         route: '/users'                 [GET]       [Token Required]
- Show          route: '/users/:user_name'      [GET]       [Token Required]
- Create        route: '/users'                 [POST]
- Update        route: '/users/:user_name'      [PUT]       [Token Required]
- Delete        route: '/users/:user_name'      [DELETE]    [Token Required]
- Authenticate  route: '/users/authenticate'    [POST]
```
#### Orders - id = product ID
```
- Index         route: '/orders'                [GET]       [Token Required]
- Show          route: '/orders/:id'            [GET]       [Token Required]
- Create        route: '/orders'                [POST]      [Token Required]
- Update        route: '/orders/:id'            [PUT]       [Token Required]
- Delete        route: '/orders/:id'            [DELETE]    [Token Required]
- Add Product   route: '/orders/:id/products'   [POST]      [Token Required]
```
#### Dashboard
```
- Show user orders:             '/orders-by-user/:user_id'              [GET]    [Token Required]
- Show user completed orders:   '/completed-orders-by-user/:user_id'    [GET]    [Token Required]
- Show products by category:    '/list-products-category/:category'     [GET]
- Show top five products by quantity in orders: '/top-five-products'   
```
---

## Optional-Resources

### Postman-Collection
- you can find all the *postman* collection `.json` in 
    `".\Resources\Postman Collection\Store Front API.postman_collection.json"`
- can be imported using postman application

### Shopping-Database
- you can find the exported database `.sql` in: 
    `".\Resources\Shopping Database\shopping.sql"`
- can be imported using SQL Shell, pgAdmin application, etc.. and use shopping_user as the owner.
---
## Built With
- TypeScript
- Node JS
- Express JS
- PostgreSQL
- Jasmine - Unit Testing
- JWT - Jason Web Token
- db-migrate - Framework
---
## Contributors
- Udacity "starter code" <https://review.udacity.com/>
- Mohammed Ahmed Morsi "RESTful API" <stormmaker_cf@hotmail.com>
---

## CopyRights
- The starter code was downloaded from Udacity for the purpose of this project.