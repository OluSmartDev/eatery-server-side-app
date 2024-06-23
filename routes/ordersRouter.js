const express = require("express");
const { createOrder } = require("../controllers/OrdersController");
const { createOrderValidator } = require("../validations/userValidation");

const router = express.Router();

router.post("/createorder", createOrderValidator, createOrder);

module.exports = router;