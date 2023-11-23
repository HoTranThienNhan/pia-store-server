const express = require("express");
const router = express.Router();
const OrderController = require('../controllers/OrderController');
const { authUserMiddleware, authAdminMiddleware } = require("../middleware/authMiddleware");

router.post('/createOrder', authUserMiddleware, OrderController.createOrder);
router.get('/getAllOrders/:id', authUserMiddleware, OrderController.getAllOrders);
router.delete('/cancelOrder/:id', OrderController.cancelOrder);
router.put('/updateOrderState/:id&:status', OrderController.updateOrderState);
router.get('/getOrderByStatus/:id&:status', authUserMiddleware, OrderController.getOrderByStatus);
router.get('/getAllOrdersByAdmin', OrderController.getAllOrdersByAdmin);
router.get('/getNotCanceledOrdersByAdmin', OrderController.getNotCanceledOrdersByAdmin);
router.get('/getOrderDetails/:id', OrderController.getOrderDetails);

module.exports = router;