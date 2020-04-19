# shopping-cart-api

 -    REST Api in Node.js + MongoDB.
 -    JWT for Authetication and Authorization.

    ```
    npm install
    ```
-   then
    ```
    npm start
    ```
    will start a server !
    
    **localhost:3000**
         

### For Testing (Postman)
- Postman extension can be used for testing !

## Available API Routes

upload product info  -  POST/products/
### [Products Routes](#1-product-routes)
| Routes        | Description           | 
| ------------- |:-------------:|
| [`GET/products/`](#a-get-list-of-all-products)    |Get list of all products|
| [`POST/products/`](#b-post-a-new-product)     | Post a new product if exist it will update the product |     
| [`GET/products/:productId`](#c-get-details-of-a-particular-product)| Get details of a particular product. |    


### [User Routes](#2-user-routes)
| Routes        | Description           | 
| ------------- |:-------------:|
| [`POST/user/signUp`](#a-sign-up-a-new-user)    | Sign up a new user |
| [`POST/user/login`](#b-login-a-existing-user)     | Login a user |     


### [Order Routes](#3-order-routes)
| Routes        | Description           | 
| ------------- |:-------------:|
| [`GET/orders/`](#a-get-list-of-all-orders)    | Get all orders by the logged in user |
| [`POST/orders/`](#b-post-a-new-order)     | Post a new order for the logged in user |
| [`GET/orders/:orderId`](#c-get-details-of-a-particular-order)| Fetch details of a particular order |    
| [`DELETE/orders/:orderId`](#d-delete-a-particular-order) | Deletes a particular order |
| [`GET/orders/ordered_product_based_on_customer`](#e-order-based-on-customer) | List ordered product based on the customer or buyer |
| [`GET/orders/cust_based_orders`](#f-customer-based-order) | List customer based on the number of product purchased |
| [`GET/orders/order_product_based_date`](#g-order-prodcut-based-date) | List ordered product count based on date |
| [`GET/orders/all_details`](#h-all-details) | List all the customer, order info |

## 1. Product Routes

### A. Get list of all Products.
Send Get request to fetch the list of all products with seller email in JSON format..
```
Method: GET 
URL: /products/
```

----

### B. Post a new product
  
  User must be logged in to do that.
  
```
Method: POST
URL: /products/
Authorization: {token}
```
#### Parameters :
| Field        | Type           |Required  |Description |
| ------------- |:-------------:|:-------:|:-----:|
| name   | String |Required    | Name of the product |
| price   | String |Required    | Price of the product |
| productDesc   | String |Required    | productDesc of the product |

----



### C. Get details of a particular product

```
Method: GET
URL: /products/:productId
````
----

## 2. User Routes

### A. Sign up a new User.
  Sends a POST request to create a new user and returns a web token for further authentication.
```
Method: POST 
URL: /user/signup
```
#### Parameters :
| Field        | Type           |Required  |Description |
| ------------- |:-------------:|:-------:|:-----:|
| email   | Email |Required    | User Email |
| password   | String |Required    | password |

  
----

### B. Login a existing user

Sends a POST request to login a exisiting user
    
```
Method: POST
URL: /user/login
```
#### Parameters :
| Field        | Type           |Required  |Description |
| ------------- |:-------------:|:-------:|:-----:|
| email   | Email |Required    | User Email |
| password   | String |Required    | password |

#### Example :
- **Request:**  `/user/login`

- **Response:**
````
      {
        "message": "Auth Successful!!",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthbHBpdEB0ZXN0LmNvbSIsIklkIjoiNWMyMWUxNGRjNmNmYjQ2ZDhjNTFiNjE1IiwiaWF0IjoxNTQ1NzI0MjcyLCJleHAiOjE1NDU3Mjc4NzJ9.0Ro0iBOO0I_mEjYHhQHPhXy0JmP_iAYhgZAHI3a4vkI"
      }
````    

## 3. Order Routes

### A. Get list of all Orders.
Send Get request to fetch the list of Orders by a User in JSON format.
User must be logged in to do that
```
Method: GET 
URL: /orders/
Authorization: {token}
```
----

### B. Post a new order
  
  User must be logged in to do that.
  
```
Method: POST
URL: /orders/
Authorization: {token}
```
#### Parameters :
| Field        | Type           |Required  |Description |
| ------------- |:-------------:|:-------:|:-----:|
| productId   | String |Required    | Id of the product to be ordered |
| quantity   | integer |Required    | Quantity |

    
----

### C. Get details of a particular order
  User must be logged in to do that
```
Method: GET
URL: /orders/:orderId
Authorization: {token}
```  
----
### D. Delete a particular order
  User must be logged in to do that.
```
Method: DELETE
URL: /orders/:orderId
Authorization: Bearer {token}
```

----
### E. Order based on customer
  User logged in not required.
  List ordered product based on the customer or buyer
```
Method: GET
URL: /orders/ordered_product_based_on_customer
```

----
### F. Customer based order
  User logged in not required.
  List customer based on the number of product purchased
```
Method: GET
URL: /orders/cust_based_orders
```

----
### G. Order Prodcut based Date
  User logged in not required.
  List ordered product count based on date
```
Method: GET
URL: /orders/order_product_based_date
```

----
### H. All Details
  User logged in not required.
  List all the customer, order info
```
Method: GET
URL: /orders/all_details
``` 
