// src/components/SelectShowtime.js
import React, { useState } from 'react';

function SelectShowtime() {
  const [showtime, setShowtime] = useState('');

  const handleSelect = () => {
    // Implement showtime selection logic here
    console.log('Selected showtime:', showtime);
  };

  return (
    <div className="select-showtime-container">
      <h2>Select Showtime</h2>
      <select onChange={(e) => setShowtime(e.target.value)}>
        <option value="">Select a showtime</option>
        <option value="10:00 AM">10:00 AM</option>
        <option value="1:00 PM">1:00 PM</option>
        <option value="4:00 PM">4:00 PM</option>
        <option value="7:00 PM">7:00 PM</option>
      </select>
      <button onClick={handleSelect} className="btn">Select</button>
    </div>
  );
}

export default SelectShowtime;
