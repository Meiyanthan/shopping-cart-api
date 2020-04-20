# shopping-cart-api

 -    REST API in Node.js + MongoDB.
 -    JWT.

    npm install

-   then
 ```
   npm start
 ``` 
   start a server !
    
    **localhost:3000**
         

### For Testing (Postman)
- Postman extension can be used for testing !

## Available API Routes

## Users API :

- Signup - POST / http://localhost:3000/user/signup 

```
1.email (required)
2.password (required)
```

- Login - POST / http://localhost:3000/user/login

```
1.email (required)
2.password (required)        
```

```
Output : Get a token.
```

## Products API :

- Create Product - POST / http://localhost:3000/products            
```  
Headers - authorization - {token}
```

```
1.name (required)
2.price (required)
3.productDesc (required)
```

- Get All Product - GET / http://localhost:3000/products   
```
Headers - authorization - {token}
```

- Get A Product - GET / http://localhost:3000/products/:productId  
```
Headers - authorization - {token}
```

## Orders API :
Create Order -  POST /  http://localhost:3000/orders 
```
Headers - authorization - {token}
```

```
1.productId (required)
2.quantity (required)
```

- Update Order -  PATCH /  http://localhost:3000/orders/:orderId   
```
Headers - authorization - {token}
```

```
1.quantity (required)
```

- Cancel Order -  DELETE /  http://localhost:3000/orders/:orderId        
```
Headers - authorization - {token}
```

- Get Your Order -  GET /  http://localhost:3000/orders           
```
Headers - authorization - {token}
```

- List of Ordered Product Based on Customer -  GET /  http://localhost:3000/orders/ordered_product_based_on_customer   
```
Headers - authorization - {token}
```

- List of Ordered Product Count Based on Date -  GET /  http://localhost:3000/orders/order_product_based_date  
```
Headers - authorization - {token}
```

- List Customer Based No of Product Purchased -  GET /  http://localhost:3000/orders/cust_based_orders           
```
Headers - authorization - {token}
```

- List All Customer Order Info -  GET /  http://localhost:3000/orders/all_details           
```
Headers - authorization - {token}
```
