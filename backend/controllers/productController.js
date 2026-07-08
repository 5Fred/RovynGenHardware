const Product = require('../models/Product');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a product or update stock if it already exists
// @route   POST /api/products
// @access  Public
const createProduct = async (req, res) => {
    try {
        const { name, sku, category, price, stock } = req.body;

        // Check if a product with the same name or SKU already exists
        const existingProduct = await Product.findOne({
            $or: [
                { name: name },
                { sku: sku }
            ]
        });

        if (existingProduct) {
            // Add the incoming units to the existing database stock amount
            existingProduct.stock += Number(stock);
            
            // Sync with the latest submitted price
            existingProduct.price = price;

            await existingProduct.save();
            return res.status(200).json(existingProduct);
        }

        // Otherwise, create a brand new product row
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a product details (Manual Edit)
// @route   PUT /api/products/:id
// @access  Public
const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } // Returns the modified document instead of original
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a product from inventory
// @route   DELETE /api/products/:id
// @access  Public
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
};