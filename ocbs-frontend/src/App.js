// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import SignUp from './SignUp';
import SignIn from './SignIn';
import ForgotPassword from './ForgotPassword';
import Dashboard from './Dashboard';
import BookingManagement from './BookingManagement'; // Booking Management component
import Notification from './Notification'; // Notification component
import Payment from './Payment'; // Payment component
import SearchMovies from './SearchMovies'; // Search Movies component
import SeatSelection from './SeatSelection'; // Seat Selection component
import SelectShowTime from './SelectShowTime'; // Select ShowTime component
import EditProfile from './EditProfile'; // Edit Profile component
import CustomerSupport from './CustomerSupport'; // Customer Support component
import StaffManagement from './StaffManagement'; // Staff Management component
import './styles.css'; // General styling

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Home Page Route */}
          <Route path="/" element={<Home />} />

          {/* Authentication Routes */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Dashboard and Functional Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/booking-management" element={<BookingManagement />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/search-movies" element={<SearchMovies />} />
          <Route path="/seat-selection" element={<SeatSelection />} />
          <Route path="/select-showtime" element={<SelectShowTime />} />
          <Route path="/edit-profile" element={<EditProfile />} />

          {/* Support and Management Routes */}
          <Route path="/customer-support" element={<CustomerSupport />} />
          <Route path="/staff-management" element={<StaffManagement />} />

          {/* Fallback Route */}
          <Route path="*" element={<div>Page not found. Please check the URL or go back to <a href="/">Home</a>.</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
