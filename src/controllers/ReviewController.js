const ReviewService = require('../services/ReviewService');

const createReview = async (req, res) => {
    try {
        let { userId, productId, orderId, rating, images, comment } = req.body;

        // Check required fields
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'User Id is required'
            });
        } 
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Product Id is required'
            });
        } 
        if (!orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Order Id is required'
            });
        } 
        if (!rating) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Rating is required'
            });
        } 
        if (!images) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Images are required'
            });
        } 
        if (!comment) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Comment is required'
            });
        } 

        const response = await ReviewService.createReview(req.body);
        
        return res.status(200).json(response);

    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

const getReview = async (req, res) => {
    try {
        const userId = req.params.userId;
        const productId = req.params.productId;
        const orderId = req.params.orderId;

        // Check required fields
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'User Id is required'
            });
        } 
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Product Id is required'
            });
        } 
        if (!orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Order Id is required'
            });
        } 

        const response = await ReviewService.getReview(orderId, productId, userId);
        
        return res.status(200).json(response);

    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

const getReviewByProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        // Check required fields
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Product Id is required'
            });
        } 

        const response = await ReviewService.getReviewByProduct(productId);
        
        return res.status(200).json(response);

    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

module.exports = { 
    createReview, 
    getReview,
    getReviewByProduct,
}
