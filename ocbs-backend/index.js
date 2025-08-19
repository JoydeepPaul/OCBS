const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
app.use(cors());

// Middleware
app.use(express.json());

// Root Route
app.get('/', (req, res) => {
    res.send('Welcome to the Cinema Booking Backend - SQLite Database');
});

// Sign-Up Route
app.post('/signup', async (req, res) => {
    try {
        const { username, email, password, contactInfo } = req.body;

        // Check if user already exists
        const userExists = await User.exists(email, username);
        
        if (userExists) {
            return res.status(400).json({ 
                message: 'User already exists with this email or username' 
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            contactInfo
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
});

// Sign-In Route
app.post('/signin', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user
        const user = await User.findByUsername(username);
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Verify password using bcrypt
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: 'Sign in successful',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Signin error:', error);
        res.status(500).json({ message: 'Error signing in', error: error.message });
    }
});

// Edit Profile Route
app.post('/edit-profile', async (req, res) => {
    try {
        const { email, newUsername, newPassword } = req.body;

        // Find user by email
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const updates = {};
        
        if (newUsername) {
            // Check if new username is already taken
            const existingUser = await User.findByUsername(newUsername);
            if (existingUser && existingUser.id !== user.id) {
                return res.status(400).json({ message: 'Username already taken' });
            }
            updates.username = newUsername;
        }

        if (newPassword) {
            // Hash new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            updates.password = hashedPassword;
        }

        const updated = await User.updateProfile(email, updates);
        if (updated) {
            res.status(200).json({ message: 'Profile updated successfully' });
        } else {
            res.status(400).json({ message: 'No changes made' });
        }
    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
});

// Forgot password route
app.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;

        // Check if the email exists in the database
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'No user found with this email' });
        }

        // Respond with a success message (No reset code generated on backend now)
        res.status(200).json({ message: 'Email found, please generate reset code on the frontend' });
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ message: 'Error processing request', error: error.message });
    }
});

// Reset password route
app.post('/reset-password', async (req, res) => {
    try {
        const { email, resetCode, newPassword } = req.body;

        // Check if the email exists in the database
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'No user found with this email' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password
        const updated = await User.updatePassword(email, hashedPassword);
        if (updated) {
            res.status(200).json({ message: 'Password successfully updated' });
        } else {
            res.status(400).json({ message: 'Failed to update password' });
        }
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ message: 'Error resetting password', error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
