const OrderService = require('../services/OrderService');

const createOrder = async (req, res) => {
    try {
        var { orderItems, fullname, address, phone, paymentMethod, shippingPrice, subtotalPrice, totalPrice, user } = req.body;

        // Check required fields
        if (!orderItems, !fullname || !address || !phone, !paymentMethod || !shippingPrice || !subtotalPrice || !totalPrice || !user) {
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

module.exports = { 
    createOrder,
    getAllOrders,
}