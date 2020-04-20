const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const orderController = require("../controllers/orders");

router.get('/ordered_product_based_on_customer', checkAuth, orderController.get_ordered_product_based_on_customer); //list of ordered product based on customer

router.get('/cust_based_orders', checkAuth, orderController.get_customer_based_orders); //list customer based product purchased

router.get('/order_product_based_date', checkAuth, orderController.get_ordered_product_based_date); //list of ordered product count based on date

router.get('/all_details', checkAuth, orderController.get_all_details); //All the customer , order info

router.get('/', checkAuth, orderController.get_your_orders); //Get your order

router.get('/:orderId', checkAuth,orderController.get_a_order); //Get A order

router.post('/', checkAuth, orderController.post_new_order); //Create A order

router.delete('/:orderId', checkAuth, orderController.delete_order); //Delete A order

router.patch('/:orderId', checkAuth, orderController.update_order); //Updates A order



module.exports = router;