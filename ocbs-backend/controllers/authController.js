const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config(); // Load environment variables

// Sign-up logic
exports.signup = async (req, res) => {
  const { username, email, password, contactInfo } = req.body;
  
  // Basic input validation
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email, and password are required.' });
  }

  try {
    // Check if the user already exists
    const userExists = await User.exists(email, username);
    
    if (userExists) {
      return res.status(400).json({ 
        message: 'User already exists with this email or username' 
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      contactInfo
    });

    res.status(201).json({ message: 'Account creation successful.' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Error creating account. Please try again later.' });
  }
};

// Sign-in logic
exports.signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find user in database
    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user.id, username: user.username, email: user.email }, 
      process.env.JWT_SECRET, 
      { expiresIn: '24h' }
    );

    res.status(200).json({ 
      message: 'Logged in successfully.', 
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
};
