const express = require("express");
const { createOrder, processOrder, getAllOrders, getOrderItem, deleteOrderItem } = require("../controllers/OrdersController");
const { createOrderValidator } = require("../validations/userValidation");

const router = express.Router();

router.post("/createorder", createOrderValidator, createOrder);
router.put("/:_id", processOrder);
router.get("/allorders", getAllOrders);
router.get("/:_id", getOrderItem);
router.delete("/:_id", deleteOrderItem);

module.exports = router;