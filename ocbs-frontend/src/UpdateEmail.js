// src/components/UpdateEmail.js
import React, { useState } from 'react';
import './UpdateEmail.css'; // Create a CSS file for styling

function UpdateEmail() {
  const [oldEmail, setOldEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleEmailUpdate = () => {
    // Logic to update email (e.g., API call)
    setConfirmationMessage(
      'Your email has been successfully updated from ' + oldEmail + ' to ' + newEmail + '.'
    );
  };

  return (
    <div className="update-email-container">
      <h2>Update Email Address</h2>
      <input
        type="email"
        placeholder="Enter your old email"
        value={oldEmail}
        onChange={(e) => setOldEmail(e.target.value)}
      />
      <input
        type="email"
        placeholder="Enter your new email"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
      />
      <button onClick={handleEmailUpdate}>Update Email</button>
      {confirmationMessage && <p>{confirmationMessage}</p>}
    </div>
  );
}

export default UpdateEmail;
