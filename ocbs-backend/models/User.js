const { dbOperations } = require('../database/db');

class User {
    constructor(userData) {
        this.username = userData.username;
        this.email = userData.email;
        this.password = userData.password;
        this.contactInfo = userData.contactInfo;
    }

    // Create new user
    static async create(userData) {
        try {
            const result = await dbOperations.createUser(userData);
            return result;
        } catch (error) {
            throw error;
        }
    }

    // Find user by username
    static async findByUsername(username) {
        try {
            const user = await dbOperations.findUser(username, 'username');
            return user;
        } catch (error) {
            throw error;
        }
    }

    // Find user by email
    static async findByEmail(email) {
        try {
            const user = await dbOperations.findUser(email, 'email');
            return user;
        } catch (error) {
            throw error;
        }
    }

    // Check if user exists
    static async exists(email, username) {
        try {
            const exists = await dbOperations.userExists(email, username);
            return exists;
        } catch (error) {
            throw error;
        }
    }

    // Update user password
    static async updatePassword(email, newPassword) {
        try {
            const updated = await dbOperations.updatePassword(email, newPassword);
            return updated;
        } catch (error) {
            throw error;
        }
    }

    // Update user profile
    static async updateProfile(email, updates) {
        try {
            const updated = await dbOperations.updateProfile(email, updates);
            return updated;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = User;
