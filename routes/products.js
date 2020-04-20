const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const productController = require("../controllers/products");

router.get('/', checkAuth,productController.get_all_products);

router.get('/:productId', checkAuth, productController.get_a_product);

router.post('/', checkAuth,productController.post_new_product);


module.exports = router;