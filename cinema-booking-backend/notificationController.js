// notificationController.js

// Simulated notification system
exports.sendNotification = (req, res) => {
  const { userId, message } = req.body;
  if (!userId || !message) {
    return res.status(400).json({ message: 'User ID and message are required.' });
  }

  // Simulate sending notification (e.g., email or SMS)
  console.log(`Notification sent to user ${userId}: ${message}`);
  res.status(200).json({ message: 'Notification sent successfully.' });
};
