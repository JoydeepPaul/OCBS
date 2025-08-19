const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const authController = require('./controllers/authController');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
app.use(cors());

// Middleware
app.use(express.json());

// Root Route
app.get('/', (req, res) => {
    res.send('Welcome to the Cinema Booking Backend - Mock Authentication');
});

// Sign-Up Route (using mock controller)
app.post('/signup', authController.signup);

// Sign-In Route (using mock controller)
app.post('/signin', authController.signin);

// Mock Edit Profile Route
app.post('/edit-profile', async (req, res) => {
    try {
        const { email, newUsername, newPassword } = req.body;
        
        // Mock successful profile update
        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
});

// Mock Forgot password route
app.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        
        // Mock successful email found
        res.status(200).json({ message: 'Email found, please generate reset code on the frontend' });
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ message: 'Error processing request', error: error.message });
    }
});

// Mock Reset password route
app.post('/reset-password', async (req, res) => {
    try {
        const { email, resetCode, newPassword } = req.body;
        
        // Mock successful password reset
        res.status(200).json({ message: 'Password successfully updated' });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ message: 'Error resetting password', error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
