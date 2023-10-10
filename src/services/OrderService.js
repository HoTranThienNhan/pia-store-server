const Order = require('../models/OrderModel');

const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        const { orderItems, fullname, address, phone, paymentMethod, shippingPrice, subtotalPrice, totalPrice, user } = newOrder;
        try {
            const createdOrder = await Order.create({
                orderItems,
                deliveryInformation: {
                    fullname,
                    address,
                    phone,
                },
                paymentMethod,
                shippingPrice,
                subtotalPrice,
                totalPrice,
                user: user,
            });
            if (createdOrder) {
                resolve({
                    status: 'OK',
                    message: 'CREATE NEW ORDER SUCCESS',
                    data: createdOrder
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createOrder,
}