// src/components/SelectShowtime.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SelectShowtime.css'; // Import the custom CSS file for styling

function SelectShowtime() {
  const [selectedDate, setSelectedDate] = useState('');
  const [showtime, setShowtime] = useState('');
  const [movieName, setMovieName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the saved movie name from local storage
    const savedMovieName = localStorage.getItem('searchedMovie');
    if (savedMovieName) {
      setMovieName(savedMovieName);
    }
  }, []);

  const handleSelect = () => {
    if (selectedDate && showtime) {
      // Save the selected date and showtime to local storage
      localStorage.setItem('selectedDate', selectedDate);
      localStorage.setItem('selectedShowtime', showtime);

      navigate('/seat-selection');
    } else {
      alert('Please select both a date and a showtime.');
    }
  };

  return (
    <div className="select-showtime-container">
      <h2 className="select-showtime-title">Choose Your Date & Showtime</h2>
      {movieName && <p className="movie-name">Movie: {movieName}</p>}

      {/* Date Selection */}
      <div className="date-picker-wrapper">
        <label htmlFor="showdate" className="date-label">Select Date:</label>
        <input
          type="date"
          id="showdate"
          className="select-date-input"
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {/* Showtime Selection */}
      <div className="select-wrapper">
        <label htmlFor="showtime" className="time-label">Select Showtime:</label>
        <select
          id="showtime"
          className="select-showtime-dropdown"
          onChange={(e) => setShowtime(e.target.value)}
          disabled={!selectedDate} // Disable dropdown until a date is selected
        >
          <option value="">Select a showtime</option>
          <option value="10:00 AM">10:00 AM</option>
          <option value="1:00 PM">1:00 PM</option>
          <option value="4:00 PM">4:00 PM</option>
          <option value="7:00 PM">7:00 PM</option>
        </select>
      </div>

      <button onClick={handleSelect} className="select-showtime-btn">
        Select Showtime
      </button>
    </div>
  );
}

export default SelectShowtime;
