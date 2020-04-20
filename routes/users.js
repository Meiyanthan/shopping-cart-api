const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const userController = require("../controllers/users");

router.post("/signup", userController.signUp_new_user);

router.post("/login", userController.login_user);

module.exports = router;