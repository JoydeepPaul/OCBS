// src/components/BookingManagement.js
import React from 'react';

function BookingManagement() {
  const bookings = [
    { id: 1, movie: 'Movie A', showtime: '10:00 AM', status: 'Confirmed' },
    { id: 2, movie: 'Movie B', showtime: '1:00 PM', status: 'Cancelled' },
  ];

  return (
    <div className="booking-management-container">
      <h2>Your Bookings</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            {booking.movie} - {booking.showtime} ({booking.status})
            {/* Implement cancel booking logic if needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookingManagement;
