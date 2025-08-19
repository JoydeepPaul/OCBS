// src/components/BookingManagement.js
import React, { useEffect, useState } from 'react';
import './BookingManagement.css'; // Import the CSS file for custom styles

function BookingManagement() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Retrieve movie, showtime, seat data, cinema hall name, and total price from local storage
    const savedMovie = localStorage.getItem('searchedMovie');
    const savedShowtime = localStorage.getItem('selectedShowtime');
    const savedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    const paymentMethod = localStorage.getItem('paymentMethod');
    const totalPrice = localStorage.getItem('totalPrice'); // Retrieve the total price
    const cinemaHall = localStorage.getItem('cinemaHall'); // Retrieve cinema hall name

    if (savedMovie && savedShowtime && savedSeats && cinemaHall) {
      const bookingData = {
        id: 1,
        movie: savedMovie,
        showtime: savedShowtime,
        seats: savedSeats.join(', '),
        paymentMethod,
        status: 'Confirmed',
        totalPrice, // Include the total price in the booking data
        cinemaHall, // Include the cinema hall name
      };
      setBookings([bookingData]);
    }
  }, []);

  // Function to handle booking cancellation
  const cancelBooking = (id) => {
    setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== id));
    // Optional: Clear relevant booking data from local storage
    localStorage.removeItem('searchedMovie');
    localStorage.removeItem('selectedShowtime');
    localStorage.removeItem('selectedSeats');
    localStorage.removeItem('paymentMethod');
    localStorage.removeItem('totalPrice'); // Clear the total price from local storage
    localStorage.removeItem('cinemaHall'); // Clear the cinema hall from local storage
  };

  return (
    <div className="booking-management-container">
      <h2 className="title">Your Bookings</h2>
      {bookings.length > 0 ? (
        <div className="booking-list">
          {bookings.map((booking) => (
            <div className="booking-card" key={booking.id}>
              <div className="booking-details">
                <p><strong>Movie:</strong> {booking.movie}</p>
                <p><strong>Cinema Hall:</strong> {booking.cinemaHall}</p> {/* Display cinema hall */}
                <p><strong>Showtime:</strong> {booking.showtime}</p>
                <p><strong>Seat Position:</strong> {booking.seats}</p>
                <p><strong>Payment Method:</strong> {booking.paymentMethod || 'N/A'}</p>
                <p className="status"><strong>Booking Status:</strong> {booking.status}</p>
                <p><strong>Total Price:</strong> ₹{booking.totalPrice}</p> {/* Display total price */}
              </div>
              <button
                className="cancel-button"
                onClick={() => cancelBooking(booking.id)}
              >
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-bookings">No bookings found.</p>
      )}
    </div>
  );
}

export default BookingManagement;
