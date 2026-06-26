const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a product name"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please add a description"]
    },
    price: {
        type: Number,
        required: [true, "Please add a price"],
        default: 0.0
    },
    category: {
        type: String,
        required: [true, "Please specify a category"],
        enum: ['Generators', 'Solar Panels', 'Spare Parts', 'Cables', 'Tools', 'Other'] 
    },
    countInStock: {
        type: Number,
        required: [true, "Please add stock quantity"],
        default: 0
    },
    imageUrl: {
        type: String,
        default: "https://via.placeholder.com/150" // Placeholder if no image is uploaded yet
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Product', ProductSchema);