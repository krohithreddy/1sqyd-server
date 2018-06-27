const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const buyController = require('../controllers/buy');

// Handle incoming GET requests to /buy
router.get("/", checkAuth, buyController.buy_get_all);

router.delete("/:buyId", checkAuth, buyController.buy_delete);

module.exports = router;
