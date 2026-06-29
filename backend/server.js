const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('🔥 MongoDB Connected Successfully to Rovyn DB!'))
    .catch((err) => console.error('❌ Database connection error:', err));

// Mount Product Routes
app.use('/api/products', productRoutes);

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