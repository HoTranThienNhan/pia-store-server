const Order = require('../models/OrderModel');
const Product = require('../models/ProductModel');

const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        const { orderItems, fullname, address, phone, paymentMethod, shippingPrice, subtotalPrice, totalPrice, user } = newOrder;
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
                        },
                        paymentMethod,
                        shippingPrice,
                        subtotalPrice,
                        totalPrice,
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

module.exports = {
    createOrder,
    getAllOrders,
}