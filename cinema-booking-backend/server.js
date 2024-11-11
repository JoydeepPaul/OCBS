const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Import routes
const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movies');
const bookingRoutes = require('./routes/booking');
const paymentRoutes = require('./routes/payment');
const notificationRoutes = require('./routes/notifications');
const supportRoutes = require('./routes/support');

// Use routes
app.use('/auth', authRoutes);
app.use('/movies', movieRoutes);
app.use('/booking', bookingRoutes);
app.use('/payment', paymentRoutes);
app.use('/notifications', notificationRoutes);
app.use('/support', supportRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
