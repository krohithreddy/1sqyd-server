const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const OrdersController = require('../controllers/orders');

// Handle incoming GET requests to /orders
router.get("/", checkAuth, OrdersController.orders_get_all);

router.post("/", checkAuth, OrdersController.orders_create_order);

router.post("/trade", checkAuth, OrdersController.orders_create_trade_order);

router.get("/:email", checkAuth, OrdersController.orders_get_order);

router.delete("/:orderId", checkAuth, OrdersController.orders_delete_order);

module.exports = router;
