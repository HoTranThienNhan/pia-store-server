const Review = require('../models/ReviewModel');
const Order = require('../models/OrderModel');

const createReview = (newReview) => {
    return new Promise(async (resolve, reject) => {
        const { userId, productId, orderId, rating, images, comment } = newReview;

        try {
            // update order isReviewed 
            console.log(userId, "-", productId, '-', orderId);
            const orderData = await Order.findOneAndUpdate(
                {
                    _id: orderId,
                    user: userId,
                    orderItems: {
                        $elemMatch: {
                            product: productId,
                        }
                    },
                },
                {
                    $set: {
                        "orderItems.$.isReviewed": true
                    }
                }
            );
            // create new review
            const createdReview = await Review.create({
                userId,
                productId,
                orderId,
                rating,
                images,
                comment
            });
            if (createdReview) {
                resolve({
                    status: 'OK',
                    message: 'CREATE NEW REVIEW SUCCESSFULLY',
                    data: createdReview
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

const getReview = (orderId, productId, userId) => {
    return new Promise(async (resolve, reject) => {

        const order = orderId;
        const product = productId;
        const user = userId;

        try {
            // create new review
            const reviewedProduct = await Review.findOne({
                orderId: order,
                userId: user,
                productId: product,
            });
            if (reviewedProduct) {
                resolve({
                    status: 'OK',
                    message: 'PRODUCT HAS BEEN REVIEWED',
                    data: reviewedProduct
                });
            }
            resolve({
                status: 'ERR',
                message: 'PRODUCT HAS NOT BEEN REVIEWED',
            });
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createReview,
    getReview,
}
