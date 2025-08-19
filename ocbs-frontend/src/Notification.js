import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // For navigation

const Notification = () => {
  const [selection, setSelection] = useState(null);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSelection = (type) => {
    setSelection(type);
    setError(''); // Reset error when the user makes a new selection
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    if (!input) {
      setError('Please provide a valid input.');
      return;
    }
    
    // Alert to notify user of their selection
    alert(`You have selected to receive notifications via ${selection}.`);

    // Redirect to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="notification-container">
      <h2>Select below options from where to send you notifications regarding OCBS:</h2>
      
      {/* Buttons for selecting Email or SMS */}
      <div className="selection-buttons">
        <button onClick={() => handleSelection('email')}>Email</button>
        <button onClick={() => handleSelection('sms')}>SMS</button>
      </div>

      {/* Display input field based on selection */}
      {selection && (
        <div>
          {selection === 'email' ? (
            <div>
              <label htmlFor="email">Enter your email:</label>
              <input
                type="email"
                id="email"
                value={input}
                onChange={handleInputChange}
                placeholder="example@example.com"
              />
            </div>
          ) : (
            <div>
              <label htmlFor="phone">Enter your phone number:</label>
              <input
                type="tel"
                id="phone"
                value={input}
                onChange={handleInputChange}
                placeholder="123-456-7890"
              />
            </div>
          )}
        </div>
      )}

      {/* Error message */}
      {error && <p className="error-message">{error}</p>}

      {/* Submit button */}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Notification;
