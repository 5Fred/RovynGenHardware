const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// @desc    Auth user & get token
// @route   POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // 2. Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // 3. Generate JWT Token (Expires in 1 day)
    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET || 'fallback_secret_key', 
      { expiresIn: '1d' }
    );

    // 4. Return token along with profile info
    res.json({
      _id: user._id,
      email: user.email,
      token: token
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;