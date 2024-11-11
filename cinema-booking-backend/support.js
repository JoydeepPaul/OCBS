// cinema-booking-backend/routes/support.js
const express = require('express');
const router = express.Router();
const { submitQuery, viewSupportStatus } = require('../controllers/supportController');

// Route to submit a support query
router.post('/submit', submitQuery);

// Route to view the status of a support query
router.get('/status/:queryId', viewSupportStatus);

module.exports = router;
