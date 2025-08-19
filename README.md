# Online Cinema Booking System (OCBS)

A full-stack web application for cinema ticket booking with user authentication and SQLite database.

## Features
- User registration and authentication
- Movie browsing and selection
- Seat selection and booking
- Payment processing
- User profile management
- SQLite database for data persistence

## Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: SQLite
- **Authentication**: JWT tokens, bcrypt password hashing

## Project Structure
```
project/
├── ocbs-frontend/          # React frontend application
│   ├── src/
│   │   ├── SignUp.js      # User registration
│   │   ├── SignIn.js      # User login
│   │   ├── Dashboard.js   # User dashboard
│   │   └── ...
│   └── package.json
├── ocbs-backend/           # Node.js backend API
│   ├── controllers/       # Route controllers
│   ├── models/           # Database models
│   ├── database/         # SQLite database setup
│   └── index.js          # Main server file
└── README.md
```

## Installation & Setup

### Backend Setup
```bash
cd ocbs-backend
npm install
npm start
```

### Frontend Setup
```bash
cd ocbs-frontend
npm install
npm start
```

## API Endpoints
- `POST /signup` - User registration
- `POST /signin` - User login
- `POST /edit-profile` - Update user profile
- `POST /forgot-password` - Password recovery
- `POST /reset-password` - Reset password

## Database
Uses SQLite for local data storage with automatic table creation.

## Running the Project
1. Start backend: `cd ocbs-backend && npm start`
2. Start frontend: `cd ocbs-frontend && npm start`
3. Access app at `http://localhost:3000`

## Author
Joydeep Paul
