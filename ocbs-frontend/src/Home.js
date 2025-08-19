// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Make sure to create and import this CSS file

function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Welcome to the Online Cinema Booking System</h1>
        <p className="home-subtitle">
          Book your favorite movies with ease and experience an unparalleled cinema experience.
        </p>
        <div className="button-container">
          <Link to="/signin">
            <button className="btn btn-signin">Sign In</button>
          </Link>
          <Link to="/signup">
            <button className="btn btn-signup">Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
