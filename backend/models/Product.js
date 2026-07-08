const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a product name'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    category: {
        type: String,
        required: [true, 'Please add a category (e.g., Electrical, Plumbing, Tools)']
    },
    price: {
        type: Number,
        required: [true, 'Please add a price'],
        min: 0
    },
    stock: {
        type: Number,
        required: [true, 'Please add stock quantity'],
        min: 0,
        default: 0
    },
    sku: {
        type: String,
        trim: true,
        // Do NOT make this unique at the field level.
        // MongoDB treats multiple { sku: null } values as duplicates for a unique index.
        default: undefined
    }
}, {
    timestamps: true // Automatically creates createdAt and updatedAt fields
});

// Partial unique index: enforce uniqueness only when sku is a real string.
productSchema.index(
    { sku: 1 },
    { unique: true, partialFilterExpression: { sku: { $type: 'string' } } }
);

module.exports = mongoose.model('Product', productSchema);
