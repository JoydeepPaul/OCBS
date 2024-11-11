// cinema-booking-backend/routes/auth.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// Route to handle user registration
router.post('/signup', registerUser);

// Route to handle user login
router.post('/signin', loginUser);

module.exports = router;
