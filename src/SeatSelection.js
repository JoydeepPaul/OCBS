// src/components/SeatSelection.js
import React, { useState } from 'react';

function SeatSelection() {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seat) => {
    // Toggle seat selection
    setSelectedSeats((prevSeats) =>
      prevSeats.includes(seat) ? prevSeats.filter((s) => s !== seat) : [...prevSeats, seat]
    );
  };

  const handleConfirm = () => {
    // Implement seat confirmation logic here
    console.log('Selected seats:', selectedSeats);
  };

  return (
    <div className="seat-selection-container">
      <h2>Select Your Seats</h2>
      <div className="seats">
        {[...Array(20)].map((_, index) => (
          <div
            key={index}
            className={`seat ${selectedSeats.includes(index) ? 'selected' : ''}`}
            onClick={() => handleSeatClick(index)}
          >
            {index + 1}
          </div>
        ))}
      </div>
      <button onClick={handleConfirm} className="btn">Confirm Selection</button>
    </div>
  );
}

export default SeatSelection;
