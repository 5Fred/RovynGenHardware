const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Create a new sale/order and update inventory stock
// @route   POST /api/orders
// @access  Public
const createOrder = async (req, res) => {
    try {
        const { items, paymentMethod } = req.body;
        let totalAmount = 0;

        // Verify stock and calculate total before changing anything
        for (const item of items) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(404).json({ message: `Product not found` });
            }
            if (product.stock < item.quantity) {
                return res.status(400).json({ message: `Insufficient stock for ${product.name}. Available: ${product.stock}` });
            }
            totalAmount += item.priceAtSale * item.quantity;
        }

        // Deduct stock systematically
        for (const item of items) {
            await Product.findByIdAndUpdate(item.product, {
                $inc: { stock: -item.quantity }
            });
        }

        // Create the record
        const order = await Order.create({
            items,
            totalAmount,
            paymentMethod
        });

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all sales/orders
// @route   GET /api/orders
// @access  Public
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('items.product', 'name sku');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// @desc    Get sales report dashboard summary
// @route   GET /api/orders/report
// @access  Public
const getSalesReport = async (req, res) => {
    try {
        const orders = await Order.find().populate('items.product', 'name');
        
        const totalTransactions = orders.length;
        const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

        res.status(200).json({
            success: true,
            totalTransactions,
            totalRevenue,
            recentOrders: orders.slice(-5).reverse()
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createOrder,
    getOrders,
    getSalesReport
};