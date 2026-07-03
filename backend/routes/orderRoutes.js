const express = require('express');
const router = express.Router();
const { createOrder, getOrders, getSalesReport } = require('../controllers/orderController');

// Specific dashboard metrics route
router.route('/report')
    .get(getSalesReport);

// Standard orders collection routes
router.route('/')
    .post(createOrder)
    .get(getOrders);

module.exports = router;