// cinema-booking-backend/routes/payment.js
const express = require('express');
const router = express.Router();
const { processPayment, offlinePayment } = require('../controllers/paymentController');

// Route to handle online payment
router.post('/online', processPayment);

// Route to handle offline payment selection
router.post('/offline', offlinePayment);

module.exports = router;
