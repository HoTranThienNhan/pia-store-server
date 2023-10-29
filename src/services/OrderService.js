const Order = require('../models/OrderModel');
const Product = require('../models/ProductModel');
const EmailService = require('../services/EmailService');

const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        const { orderItems, fullname, address, phone, paymentMethod, shippingPrice, subtotalPrice, totalPrice, user, email } = newOrder;
        const status = 'pending';
        try {
            let addedIntoDatabase = 0;
            const promisesProduct = orderItems.map(async (item) => {
                const productData = await Product.findOneAndUpdate(
                    {
                        _id: item.product,
                        countInStock: { $gte: item.amount },
                    },
                    {
                        $inc: {
                            countInStock: -item.amount,
                            sold: +item.amount,
                        }
                    },
                    { new: true }
                );
                if (productData) {
                    addedIntoDatabase++;
                }
                // pass to database only once (for the first time)
                if (addedIntoDatabase === 1) {
                    const createdOrder = await Order.create({
                        orderItems,
                        deliveryInformation: {
                            fullname,
                            address,
                            phone,
                            email
                        },
                        paymentMethod,
                        shippingPrice,
                        subtotalPrice,
                        totalPrice,
                        status: status,
                        user: user,
                    });
                    if (createdOrder) {
                        return {
                            status: 'OK',
                            message: 'CREATE NEW ORDER SUCCESSFUL'
                        }
                    }
                } else {
                    return {
                        status: 'ERR',
                        message: 'INSUFFICIENT PRODUCT COUNT IN STOCK',
                        data: [item.product]
                    }
                }
            });
            const resultsProduct = await Promise.all(promisesProduct);
            const newData = resultsProduct && resultsProduct.filter((item) => item.id);
            if (newData.length) {
                resolve({
                    status: 'ERR',
                    message: `PRODUCT WITH ID ${newData.join(',')} IS INSUFFICIENT`,
                });
            } else {
                await EmailService.sendEmailCreateOrder(email, orderItems, shippingPrice, subtotalPrice, totalPrice, paymentMethod, fullname, address, phone);
                resolve({
                    status: 'OK',
                    message: 'CREATE NEW ORDER SUCCESSFUL'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

const getAllOrders = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {

            // check if order exists (found by user field in order)
            const getOrderDataByUserId = await Order.find({
                user: userId
            });

            if (getOrderDataByUserId == null) {
                resolve({
                    status: 'ERR',
                    message: 'Order does not exist'
                });
            }

            resolve({
                status: 'OK',
                message: 'GET ORDER SUCCESS',
                data: getOrderDataByUserId
            });

        } catch (e) {
            reject(e);
        }
    });
}

const getAllOrdersByAdmin = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const getAllOrders = await Order.find();
            resolve({
                status: 'OK',
                message: 'GET ALL ORDERS SUCCESS',
                data: getAllOrders
            });

        } catch (e) {
            reject(e);
        }
    });
}

const cancelOrder = (orderId, orderItems) => {
    return new Promise(async (resolve, reject) => {
        try {
            orderItems.map(async (item) => {
                await Product.findOneAndUpdate(
                    {
                        _id: item.product,
                    },
                    {
                        $inc: {
                            countInStock: +item.amount,
                            sold: -item.amount,
                        }
                    },
                    { new: true }
                );
                const order = await Order.findByIdAndUpdate(
                    orderId,
                    { status: 'canceled' },
                    { new: true }
                );
                if (order === null) {
                    resolve({
                        status: 'ERR',
                        message: `THE ORDER IS NOT DEFINED`,
                    });
                }
                resolve({
                    status: 'OK',
                    message: `DELETE ORDER SUCCESSFULLY`,
                    data: order
                });
            });
        } catch (e) {
            reject(e);
        }
    })
}

const updateOrderState = (orderId, orderItems, status) => {
    return new Promise(async (resolve, reject) => {
        try {
            orderItems.map(async (item) => {
                const order = await Order.findByIdAndUpdate(
                    orderId,
                    { status: status },
                    { new: true }
                );
                if (order === null) {
                    resolve({
                        status: 'ERR',
                        message: `THE ORDER IS NOT DEFINED`,
                    });
                }
                resolve({
                    status: 'OK',
                    message: `UPDATE ORDER STATUS SUCCESSFULLY`,
                    data: order
                });
            });
        } catch (e) {
            reject(e);
        }
    })
}

const getOrderByStatus = (userId, status) => {
    return new Promise(async (resolve, reject) => {
        try {

            // check if order exists (found by user field in order)
            const getOrderDataByUserIdAndStatus = await Order.find({
                user: userId,
                status: status,
            });

            if (getOrderDataByUserIdAndStatus.length === 0) {
                resolve({
                    status: 'ERR',
                    message: 'Order does not exist'
                });
            }


            resolve({
                status: 'OK',
                message: 'GET ORDER SUCCESS',
                data: getOrderDataByUserIdAndStatus
            });

        } catch (e) {
            reject(e);
        }
    });
}

const getOrderDetails = (orderId) => {
    return new Promise(async (resolve, reject) => {
        try {

            const getOrderDetails = await Order.findOne({
                _id: orderId
            });

            if (getOrderDetails.length === 0) {
                resolve({
                    status: 'ERR',
                    message: 'Order does not exist'
                });
            }

            resolve({
                status: 'OK',
                message: 'GET ORDER DETAILS SUCCESS',
                data: getOrderDetails
            });

        } catch (e) {
            reject(e);
        }
    });
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