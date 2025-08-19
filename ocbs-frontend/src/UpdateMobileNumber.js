// src/components/UpdateMobileNumber.js
import React, { useState } from 'react';
import './UpdateMobileNumber.css'; // Create a CSS file for styling

function UpdateMobileNumber() {
  const [oldNumber, setOldNumber] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleMobileNumberUpdate = () => {
    // Logic to update mobile number (e.g., API call)
    setConfirmationMessage(
      'Your mobile number has been successfully updated from ' + oldNumber + ' to ' + newNumber + '.'
    );
  };

  return (
    <div className="update-mobile-number-container">
      <h2>Update Mobile Number</h2>
      <input
        type="text"
        placeholder="Enter your old mobile number"
        value={oldNumber}
        onChange={(e) => setOldNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter your new mobile number"
        value={newNumber}
        onChange={(e) => setNewNumber(e.target.value)}
      />
      <button onClick={handleMobileNumberUpdate}>Update Mobile Number</button>
      {confirmationMessage && <p>{confirmationMessage}</p>}
    </div>
  );
}

export default UpdateMobileNumber;
