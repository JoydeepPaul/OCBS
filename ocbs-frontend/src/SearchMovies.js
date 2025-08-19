// src/components/SearchMovies.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchMovies() {
  const [searchCriteria, setSearchCriteria] = useState('');
  const [cinemaHall, setCinemaHall] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    console.log('Searching for:', searchCriteria, 'in cinema hall:', cinemaHall);

    if (searchCriteria && cinemaHall) {
      // Set the success message with professional style
      setMessage(`Congratulations! 🎉 Your searched movie, "${searchCriteria}", is now available at "${cinemaHall}". Get ready for an unforgettable experience!`);

      // Store the searched movie name and cinema hall in local storage
      localStorage.setItem('searchedMovie', searchCriteria);
      localStorage.setItem('cinemaHall', cinemaHall);

      // Delay the navigation to show the message
      setTimeout(() => {
        navigate('/select-showtime');
      }, 2500); // Wait 2.5 seconds before redirecting
    } else {
      alert('Please enter both movie search criteria and cinema hall name.');
    }
  };

  return (
    <div className="search-movies-container">
      <h2 className="title">Find Your Movie</h2>
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter movie title, genre, or release date"
          onChange={(e) => setSearchCriteria(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Enter cinema hall name"
          onChange={(e) => setCinemaHall(e.target.value)}
          className="input-field"
        />
      </div>
      <button onClick={handleSearch} className="btn">Search</button>

      {/* Display the congratulatory message */}
      {message && (
        <div className="congratulation-message">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}

export default SearchMovies;
