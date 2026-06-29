const express = require('express');
const router = express.Router();
const { getProducts, createProduct } = require('../controllers/productController');

// Route for fetching all products & creating a new one
router.route('/')
    .get(getProducts)
    .post(createProduct);

module.exports = router;