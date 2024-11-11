// src/components/Notification.js
import React from 'react';

function Notification() {
  const notifications = [
    { id: 1, message: 'Your booking for Movie A has been confirmed!' },
    { id: 2, message: 'Payment for Movie B has been processed successfully.' },
  ];

  return (
    <div className="notification-container">
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>{notification.message}</li>
        ))}
      </ul>
    </div>
  );
}

export default Notification;
