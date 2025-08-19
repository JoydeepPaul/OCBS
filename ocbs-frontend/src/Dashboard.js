// src/components/Dashboard.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Updated to use a CSS file named Dashboard.css

function Dashboard() {
  const navigate = useNavigate();

  const handleRedirectHome = () => {
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome to Your Dashboard!</h1>
      <nav className="dashboard-nav">
        <Link to="/search-movies" className="dashboard-link">
          🎬 Book Tickets
        </Link>
        <Link to="/booking-management" className="dashboard-link">
          📝 Your Bookings
        </Link>
        <Link to="/notification" className="dashboard-link">
          🔔 Notification Settings
        </Link>
        <Link to="/staff-management" className="dashboard-link">
          👥 Staff Details
        </Link>
        <Link to="/customer-support" className="dashboard-link">
          📞 Customer Support
        </Link>
        <Link to="/edit-profile" className="dashboard-link">
          ✏️ Edit Profile
        </Link>
      </nav>
      <button className="dashboard-home-button" onClick={handleRedirectHome}>
        Sign Out
      </button>
    </div>
  );
}

export default Dashboard;
