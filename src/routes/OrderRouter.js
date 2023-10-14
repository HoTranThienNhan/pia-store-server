const express = require("express");
const router = express.Router();
const OrderController = require('../controllers/OrderController');
const { authUserMiddleware } = require("../middleware/authMiddleware");

router.post('/createOrder', authUserMiddleware, OrderController.createOrder);
router.get('/getAllOrders/:id', authUserMiddleware, OrderController.getAllOrders);

module.exports = router;