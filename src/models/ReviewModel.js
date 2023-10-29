const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
        userId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        },
        productId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Product', 
            required: true 
        },
        orderId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Order', 
            required: true 
        },
        rating: { type: Number, required: false },
        comment: { type: String, required: true },
        images: [
            { type: String, required: true }
        ],
    },
    {
        timestamps: true
    }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;