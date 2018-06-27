const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const tradeController = require('../controllers/trade');

// Handle incoming GET requests to /trade
router.get("/", checkAuth, tradeController.trade_get_all);

router.post("/", checkAuth, tradeController.trade_create_buy);

module.exports = router;
