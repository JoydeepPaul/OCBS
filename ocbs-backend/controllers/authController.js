const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables

// Sign-up logic (mock - no database)
exports.signup = async (req, res) => {
  const { username, email, password, contactInfo } = req.body;
  
  // Basic input validation
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email, and password are required.' });
  }

  try {
    // Mock successful signup
    res.status(201).json({ message: 'Account creation successful.' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Error creating account. Please try again later.' });
  }
};

// Sign-in logic (mock - no database)
exports.signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Basic input validation
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    // Mock successful signin for any valid input
    const token = jwt.sign(
      { userId: 1, username: username, email: `${username}@example.com` }, 
      process.env.JWT_SECRET || 'fallback_secret', 
      { expiresIn: '24h' }
    );

    res.status(200).json({ 
      message: 'Logged in successfully.', 
      token,
      user: {
        id: 1,
        username: username,
        email: `${username}@example.com`
      }
    });
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({ message: 'Error signing in', error: error.message });
  }
};
