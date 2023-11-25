const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
    {
        orderItems: [
            {
                name: { type: String, required: true },
                amount: { type: Number, required: true },
                image: { type: String, required: true },
                price: { type: Number, required: true },
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                },
                isReviewed: { type: Boolean, default: false },
            },
        ],

        deliveryInformation: {
            fullname: { type: String, required: true },
            address: { type: String, required: true },
            phone: { type: String, required: true },
            email: { type: String, required: true },
        },

        paymentMethod: { type: String, required: true },
        subtotalPrice: { type: Number, required: true },
        shippingPrice: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        userId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        },
        status: { type: String },
    },
    {
        timestamps: true
    }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;