const Review = require('../models/ReviewModel');
const Order = require('../models/OrderModel');
const User = require('../models/UserModel');
const mongoose = require('mongoose');

const createReview = (newReview) => {
    return new Promise(async (resolve, reject) => {
        const { userId, productId, orderId, rating, images, comment } = newReview;

        try {
            // update order isReviewed 
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
            // find review
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

const getReviewByProduct = (productId) => {
    return new Promise(async (resolve, reject) => {

        const product = productId;

        try {
            // find review
            const reviewedProduct = await Review.find({
                productId: product,
            });
            if (reviewedProduct) {
                reviewedProduct.map(async (productItem) => {
                    const productDetails = await User.findOne({
                        _id: productItem?.userId
                    });
                    const reviewedProductWithUser = await Review.aggregate([
                        {
                            "$match": {
                                "productId": new mongoose.Types.ObjectId(product),
                            },
                        },
                        {
                            "$lookup": {
                                "from": "users",
                                "localField": "userId",
                                "foreignField": "_id",
                                "as": "userDetails"
                            },
                        }
                    ]);
                    resolve({
                        status: 'OK',
                        message: 'GET REVIEW SUCCESSFULLY',
                        data: reviewedProductWithUser
                    });
                });
            } else {
                resolve({
                    status: 'ERR',
                    message: 'PRODUCT HAS NOT BEEN REVIEWED',
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createReview,
    getReview,
    getReviewByProduct,
}
