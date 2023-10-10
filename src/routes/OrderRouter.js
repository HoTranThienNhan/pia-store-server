const express = require("express");
const router = express.Router();
const OrderController = require('../controllers/OrderController');
const { authAdminMiddleware } = require("../middleware/authMiddleware");

router.post('/createOrder', OrderController.createOrder);

module.exports = router;