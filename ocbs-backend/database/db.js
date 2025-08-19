const { createClient } = require('@libsql/client');

// Create Turso client
const db = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
});

// Initialize database tables
async function initializeDatabase() {
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
    try {
        await db.execute(createUsersTable);
        console.log('Users table ready');
    } catch (err) {
        console.error('Error creating users table:', err.message);
    }
}

// Call initialization
initializeDatabase();

// Database operations
const dbOperations = {
    // Create new user
    createUser: async (userData) => {
        const { username, email, password, contactInfo } = userData;
        const sql = `INSERT INTO users (username, email, password, contactInfo) VALUES (?, ?, ?, ?)`;
        
        const result = await db.execute({
            sql,
            args: [username, email, password, contactInfo],
        });

        return { id: result.lastInsertRowid, username, email, contactInfo };
    },

    // Find user by email or username
    findUser: async (identifier, type = 'username') => {
        const safeType = ['username', 'email'].includes(type) ? type : 'username';
        const sql = `SELECT * FROM users WHERE ${safeType} = ?`;
        
        const result = await db.execute({
            sql,
            args: [identifier],
        });

        return result.rows.length > 0 ? result.rows[0] : null;
    },

    // Check if user exists by email or username
    userExists: async (email, username) => {
        const sql = `SELECT 1 FROM users WHERE email = ? OR username = ? LIMIT 1`;
        
        const result = await db.execute({
            sql,
            args: [email, username],
        });

        return result.rows.length > 0;
    },

    // Update user password
    updatePassword: async (email, newPassword) => {
        const sql = `UPDATE users SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE email = ?`;
        
        const result = await db.execute({
            sql,
            args: [newPassword, email],
        });

        return result.rowsAffected > 0;
    },

    // Update user profile
    updateProfile: async (email, updates) => {
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

        if (params.length === 1) { // only email is present
            return false; // No fields to update
        }

        const result = await db.execute({
            sql,
            args: params,
        });

        return result.rowsAffected > 0;
    }
};

module.exports = { db, dbOperations };
