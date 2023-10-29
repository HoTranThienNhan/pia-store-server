const OrderService = require('../services/OrderService');

const createOrder = async (req, res) => {
    try {
        var { orderItems, fullname, address, phone, email, paymentMethod, shippingPrice, subtotalPrice, totalPrice, user } = req.body;

        // Check required fields
        if (!orderItems, !fullname || !address || !phone || !email || !paymentMethod || !shippingPrice || !subtotalPrice || !totalPrice || !user) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The order information is required'
            });
        } 

        const response = await OrderService.createOrder(req.body);
        
        return res.status(200).json(response);

    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

const getAllOrders = async (req, res) => {
    try {

        const userId = req.params.id;

        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'User ID is required'
            });
        }

        const response = await OrderService.getAllOrders(userId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

const getAllOrdersByAdmin = async (req, res) => {
    try {
        const response = await OrderService.getAllOrdersByAdmin();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

const cancelOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const orderItems = req.body.orderItems;
        const status = req.body.status;

        if (!orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The order ID is required'
            });
        }
        if (status !== 'pending' && status !== 'pickingup' ) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The order cannot be canceled'
            });
        }

        const response = await OrderService.cancelOrder(orderId, orderItems);
        
        return res.status(200).json(response);

    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

const updateOrderState = async (req, res) => {
    try {
        const orderId = req.params.id;
        const orderItems = req.body.data.orderItems;
        const status = req.params.status;

        if (!orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The order ID is required'
            });
        }

        const response = await OrderService.updateOrderState(orderId, orderItems, status);
        
        return res.status(200).json(response);

    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

const getOrderByStatus = async (req, res) => {
    try {

        const userId = req.params.id;
        const status = req.params.status;

        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'User ID is required'
            });
        }
        if (!status) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Order status is required'
            });
        }

        const response = await OrderService.getOrderByStatus(userId, status);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

const getOrderDetails = async (req, res) => {
    try {
        const orderId = req.params.id;

        const response = await OrderService.getOrderDetails(orderId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

module.exports = { 
    createOrder,
    getAllOrders,
    cancelOrder,
    updateOrderState,
    getOrderByStatus,
    getAllOrdersByAdmin,
    getOrderDetails,
}