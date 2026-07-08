const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const mongoose = require('mongoose');
// ... rest of your server code
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Route Imports
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');

// Load environment variables right away
dotenv.config();

// Initialize the Express App instance
const app = express();

// Global Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
connectDB();

// Mount API Route Middlewares
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Base Test Route
app.get('/', (req, res) => {
    res.send('Rovyn Gen Hardware API is running smoothly!');
});

// Define Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
    console.log(`Server is blasting off on port ${PORT}`);
});