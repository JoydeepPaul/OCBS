// authController.js

// Simulated user database
const users = [];

// Sign-up logic
exports.signup = (req, res) => {
  const { username, email, password, contactInfo } = req.body;
  // Simple validation (for demonstration purposes)
  if (!username || !email || !password || !contactInfo) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Check if the user already exists
  const userExists = users.find(user => user.email === email);
  if (userExists) {
    return res.status(400).json({ message: 'User already exists.' });
  }

  // Add new user to the simulated database
  users.push({ username, email, password, contactInfo });
  res.status(201).json({ message: 'Account creation successful.' });
};

// Sign-in logic
exports.signin = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    return res.status(200).json({ message: 'Logged in successfully.' });
  } else {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }
};
