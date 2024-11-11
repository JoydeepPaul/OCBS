// src/components/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <nav>
        <Link to="/search-movies">Search Movies</Link>
        <Link to="/bookings">Your Bookings</Link>
        <Link to="/payment">Manage Payments</Link>
        <Link to="/notifications">Notifications</Link>
        <Link to="/staff-management">Staff Management</Link>
        <Link to="/customer-support">Customer Support</Link>
      </nav>
    </div>
  );
}

export default Dashboard;
