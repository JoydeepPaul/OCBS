const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const serverless = require('serverless-http');
const sqlite3 = require('sqlite3').verbose();

const app = express();

// CORS configuration
app.use(cors());

// Middleware
app.use(express.json());

// In-memory SQLite database for serverless environment
const db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite in-memory database');
        initializeDatabase();
    }
});

// Initialize database tables
function initializeDatabase() {
    const createUsersTable = `
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            contactInfo TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `;

    db.run(createUsersTable, (err) => {
        if (err) {
            console.error('Error creating users table:', err.message);
        } else {
            console.log('Users table created or already exists');
        }
    });
}

// Database operations
const dbOperations = {
    createUser: (userData) => {
        return new Promise((resolve, reject) => {
            const { username, email, password, contactInfo } = userData;
            const sql = `INSERT INTO users (username, email, password, contactInfo) VALUES (?, ?, ?, ?)`;
            
            db.run(sql, [username, email, password, contactInfo], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id: this.lastID, ...userData });
                }
            });
        });
    },

    findUserByUsername: (username) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM users WHERE username = ?`;
            
            db.get(sql, [username], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    },

    userExists: (email, username) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM users WHERE email = ? OR username = ?`;
            
            db.get(sql, [email, username], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(!!row);
                }
            });
        });
    }
};

// Root Route
app.get('/', (req, res) => {
    res.json({ message: 'Cinema Booking System API - SQLite Database' });
});

// Sign-Up Route
app.post('/signup', async (req, res) => {
    try {
        const { username, email, password, contactInfo } = req.body;

        // Check if user already exists
        const userExists = await dbOperations.userExists(email, username);
        
        if (userExists) {
            return res.status(400).json({ 
                message: 'User already exists with this email or username' 
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await dbOperations.createUser({
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
        const user = await dbOperations.findUserByUsername(username);
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
            process.env.JWT_SECRET || 'fallback_secret_key',
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

// Export the serverless function
exports.handler = serverless(app);
