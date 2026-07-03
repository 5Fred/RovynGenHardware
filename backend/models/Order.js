const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            priceAtSale: {
                type: Number,
                required: true
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true,
        default: 0
    },
    paymentMethod: {
        type: String,
        enum: ['Cash', 'M-Pesa', 'Card'],
        default: 'Cash'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);