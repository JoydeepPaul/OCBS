const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create database connection - use in-memory for serverless environment
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
            console.log('Users table ready');
        }
    });
}

// Database operations
const dbOperations = {
    // Create new user
    createUser: (userData) => {
        return new Promise((resolve, reject) => {
            const { username, email, password, contactInfo } = userData;
            const sql = `INSERT INTO users (username, email, password, contactInfo) VALUES (?, ?, ?, ?)`;
            
            db.run(sql, [username, email, password, contactInfo], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id: this.lastID, username, email, contactInfo });
                }
            });
        });
    },

    // Find user by email or username
    findUser: (identifier, type = 'username') => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM users WHERE ${type} = ?`;
            
            db.get(sql, [identifier], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    },

    // Check if user exists by email or username
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
    },

    // Update user password
    updatePassword: (email, newPassword) => {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE users SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE email = ?`;
            
            db.run(sql, [newPassword, email], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes > 0);
                }
            });
        });
    },

    // Update user profile
    updateProfile: (email, updates) => {
        return new Promise((resolve, reject) => {
            const { username, password } = updates;
            let sql = `UPDATE users SET updated_at = CURRENT_TIMESTAMP`;
            const params = [];

            if (username) {
                sql += `, username = ?`;
                params.push(username);
            }
            if (password) {
                sql += `, password = ?`;
                params.push(password);
            }

            sql += ` WHERE email = ?`;
            params.push(email);

            db.run(sql, params, function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes > 0);
                }
            });
        });
    }
};

module.exports = { db, dbOperations };
