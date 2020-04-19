const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const orderController = require("../controllers/orders");

router.get('/ordered_product_based_on_customer', orderController.get_ordered_product_based_on_customer);

router.get('/cust_based_orders', orderController.get_customer_based_orders);

router.get('/order_product_based_date', orderController.get_ordered_product_based_date);

router.get('/all_details', orderController.get_all_details);

router.get('/', checkAuth, orderController.get_your_orders);

router.get('/:orderId', checkAuth,orderController.get_a_order);

router.post('/', checkAuth, orderController.post_new_order);

router.delete('/:orderId', checkAuth, orderController.delete_order);

router.patch('/:orderId', checkAuth, orderController.update_order);



module.exports = router;