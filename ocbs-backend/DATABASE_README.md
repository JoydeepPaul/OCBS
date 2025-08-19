# SQLite Database Integration

## Overview
Your cinema booking system now uses SQLite instead of MongoDB for user authentication and data storage.

## Database Features
- **Local SQLite database** (`cinema_booking.db`)
- **Automatic table creation** on server startup
- **Secure password hashing** with bcrypt
- **JWT token authentication**
- **User management** (create, find, update)

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    contactInfo TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

## API Endpoints

### Authentication
- `POST /signup` - Register new user
- `POST /signin` - User login with JWT token
- `POST /edit-profile` - Update user profile
- `POST /forgot-password` - Password recovery
- `POST /reset-password` - Reset user password

## Usage

### Start Server
```bash
cd ocbs-backend
npm start
```

### Test Database
```bash
node test-db.js
```

## Files Modified
- `index.js` - Main server with SQLite routes
- `models/User.js` - SQLite-based User model
- `database/db.js` - SQLite connection and operations
- `controllers/authController.js` - Updated authentication logic
- `package.json` - Added sqlite3 dependency

## Frontend Integration
Your existing React components (`SignUp.js`, `SignIn.js`) work seamlessly with the new SQLite backend - no changes needed!

## Database Location
The SQLite database file is created at:
`ocbs-backend/database/cinema_booking.db`
