# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

## RESTful Routes:
#### Products
- Index         route: '/products'              [GET]
- Show          route: '/products/:id'          [GET]
- Create        route: '/products'              [POST]      [Token Required]
- Update        route: '/products/:id'          [PUT]       [Token Required]
- Delete        route: '/products/:id'          [DELETE]    [Token Required]

#### Users
- Index         route: '/users'                 [GET]       [Token Required]
- Show          route: '/users/:user_name'      [GET]       [Token Required]
- Create        route: '/users'                 [POST]
- Update        route: '/users/:user_name'      [PUT]       [Token Required]
- Delete        route: '/users/:user_name'      [DELETE]    [Token Required]
- Authenticate  route: '/users/authenticate'    [POST]

#### Orders
- Index         route: '/orders'                [GET]       [Token Required]
- Show          route: '/orders/:id'            [GET]       [Token Required]
- Create        route: '/orders'                [POST]      [Token Required]
- Update        route: '/orders/:id'            [PUT]       [Token Required]
- Delete        route: '/orders/:id'            [DELETE]    [Token Required]
- Add Product   route: '/orders/:id/products'   [POST]      [Token Required]

#### Dashboard
- Show user orders  route:                      '/orders-by-user/:user_id'              [GET]      [Token Required]
- Show user completed orders:                   '/completed-orders-by-user/:user_id'    [GET]      [Token Required]
- Show products by category:                    '/list-products-category/:category'     [GET]
- Show top five products by quantity in orders: '/top-five-products'                    [GET]

## Database Tables:
#### products (
    id:         VARCHAR, 
    name:       VARCHAR(100)    NOT NULL, 
    price:      Number          NOT NULL, 
    category:   VARCHAR(64)
    )

#### users (
    id              VARCHAR, 
    first_name      VARCHAR(100) NOT NULL, 
    last_name       VARCHAR(100) NOT NULL, 
    user_name       VARCHAR(100) NOT NULL   UNIQUE, 
    password_digest VARCHAR      NOT NULL
    );

#### orders (
    id      VARCHAR, 
    user_id String [foreign key to users table], 
    status  VARCHAR(16)
    );

#### order_products (
    id          VARCHAR, 
    quantity    Number, 
    order_id    String [foreign key to orders table], 
    product_id  String [foreign key to products table]
    );