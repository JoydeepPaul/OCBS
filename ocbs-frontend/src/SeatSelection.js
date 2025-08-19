import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SeatSelection.css'; // Import the custom CSS file for styling

function SeatSelection() {
  const [numPersons, setNumPersons] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(1 * 200); // Default total price for 1 person, base price = 200
  const navigate = useNavigate();

  const totalSeats = 30; // Total number of seats in the theater
  const seatsPerRow = 6; // Number of seats per row
  const basePrice = 200; // Base price for one person (in currency, e.g., 200 INR)

  const handleSeatClick = (seat) => {
    // Only allow selection up to the number of persons specified
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else if (selectedSeats.length < numPersons) {
      setSelectedSeats([...selectedSeats, seat]);
    } else {
      alert(`You can only select up to ${numPersons} seat(s).`);
    }
  };

  const handleConfirm = () => {
    if (selectedSeats.length > 0) {
      // Save selected seats and price to local storage
      localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
      localStorage.setItem('totalPrice', totalPrice);
      navigate('/payment'); // Redirect to payment page
    } else {
      alert('Please select at least one seat.');
    }
  };

  const handleNumPersonsChange = (e) => {
    const selectedNum = parseInt(e.target.value);
    setNumPersons(selectedNum);
    setSelectedSeats([]); // Reset selected seats when number of persons changes
    setTotalPrice(selectedNum * basePrice); // Update total price based on number of persons
  };

  return (
    <div className="seat-selection-container">
      <h2 className="seat-selection-title">Seat Selection</h2>

      {/* Price Section */}
      <div className="price-section">
        <p>Base Price per Person ticket: ₹{basePrice}</p>
        <p>Total Price for {numPersons} person(s): ₹{totalPrice}</p>
      </div>

      <div className="seat-options">
        <label htmlFor="numPersons">Number of Persons:</label>
        <select
          id="numPersons"
          value={numPersons}
          onChange={handleNumPersonsChange}
        >
          {[...Array(10)].map((_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      <div className="seats">
        {[...Array(totalSeats)].map((_, index) => (
          <div
            key={index}
            className={`seat ${selectedSeats.includes(index) ? 'selected' : ''}`}
            onClick={() => handleSeatClick(index)}
          >
            {index + 1}
          </div>
        ))}
      </div>

      <button onClick={handleConfirm} className="confirm-btn">
        Confirm Selection & Proceed for Booking
      </button>
    </div>
  );
}

export default SeatSelection;
