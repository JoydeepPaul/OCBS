// src/components/CinemaSelection.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function CinemaSelection() {
  const [cinema, setCinema] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { movieName } = location.state;

  const handleCinemaSelect = () => {
    // Redirect to showtime selection page
    navigate('/select-showtime', { state: { movieName, cinema } });
  };

  return (
    <div>
      <h2>Select Cinema for {movieName}</h2>
      <select value={cinema} onChange={(e) => setCinema(e.target.value)}>
        <option value="">Select a Cinema</option>
        <option value="Cinema 1">Cinema 1</option>
        <option value="Cinema 2">Cinema 2</option>
        {/* Add more cinema options */}
      </select>
      <button onClick={handleCinemaSelect}>Next</button>
    </div>
  );
}

export default CinemaSelection;
