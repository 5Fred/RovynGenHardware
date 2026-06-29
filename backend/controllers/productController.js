const Product = require('../models/Product');

// @desc    Get all hardware products
// @route   GET /api/products
// @access  Public (Free users)
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Server Error fetching products", error: error.message });
    }
};

// @desc    Create a new product
// @route   POST /api/products
// @access  Private (Admin only - adding temporary public access for testing)
const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, countInStock, imageUrl } = req.body;

        const newProduct = new Product({
            name,
            description,
            price,
            category,
            countInStock,
            imageUrl
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: "Invalid product data", error: error.message });
    }
};

module.exports = {
    getProducts,
    createProduct
};