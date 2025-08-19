import React, { useState } from 'react';
import './StaffManagement.css';

function StaffManagement() {
  const [cinemaHall, setCinemaHall] = useState('');
  const [staffDetails, setStaffDetails] = useState([]);
  const [showStaff, setShowStaff] = useState(false);

  // Sample staff data (we'll select from this pool randomly)
  const sampleStaffData = [
    {
      name: 'John Doe',
      position: 'Manager',
      contact: '123-456-7890',
      email: 'johndoe@cinema.com',
      workingHours: '9:00 AM - 6:00 PM',
    },
    {
      name: 'Jane Smith',
      position: 'Ticket Seller',
      contact: '987-654-3210',
      email: 'janesmith@cinema.com',
      workingHours: '10:00 AM - 7:00 PM',
    },
    {
      name: 'Tom Harris',
      position: 'Security Guard',
      contact: '456-789-1234',
      email: 'tomharris@cinema.com',
      workingHours: '12:00 PM - 9:00 PM',
    },
    {
      name: 'Alice Johnson',
      position: 'Manager',
      contact: '234-567-8901',
      email: 'alicejohnson@cinema.com',
      workingHours: '9:00 AM - 5:00 PM',
    },
    {
      name: 'Bob Brown',
      position: 'Ticket Seller',
      contact: '345-678-9012',
      email: 'bobbrown@cinema.com',
      workingHours: '11:00 AM - 8:00 PM',
    },
    {
      name: 'Charlie White',
      position: 'Cleaner',
      contact: '456-789-0123',
      email: 'charliewhite@cinema.com',
      workingHours: '8:00 AM - 4:00 PM',
    },
    {
      name: 'Sophia Green',
      position: 'Concessions',
      contact: '567-890-1234',
      email: 'sophiagreen@cinema.com',
      workingHours: '1:00 PM - 10:00 PM',
    },
    {
      name: 'David Black',
      position: 'Ticket Seller',
      contact: '678-901-2345',
      email: 'davidblack@cinema.com',
      workingHours: '10:00 AM - 7:00 PM',
    },
    {
      name: 'Emma Clark',
      position: 'Manager',
      contact: '789-012-3456',
      email: 'emmaclark@cinema.com',
      workingHours: '9:00 AM - 5:00 PM',
    },
    {
      name: 'Lucas Gray',
      position: 'Security Guard',
      contact: '890-123-4567',
      email: 'lucasgray@cinema.com',
      workingHours: '11:00 AM - 8:00 PM',
    },
  ];

  // Function to randomly shuffle the staff array and pick a subset
  const getRandomStaff = (staffPool) => {
    const shuffledStaff = [...staffPool].sort(() => 0.5 - Math.random()); // Shuffle array
    return shuffledStaff.slice(0, 3); // Pick first 3 staff after shuffling
  };

  // Store staff data dynamically by cinema hall name
  const staffDataByCinemaHall = {};

  const handleCinemaHallSubmit = () => {
    if (cinemaHall.trim() !== '') {
      // If this cinema hall doesn't have staff details yet, generate new ones
      if (!staffDataByCinemaHall[cinemaHall]) {
        staffDataByCinemaHall[cinemaHall] = getRandomStaff(sampleStaffData);
      }

      // Set the staff details for the selected cinema hall
      setStaffDetails(staffDataByCinemaHall[cinemaHall]);
      setShowStaff(true);
    } else {
      alert('Please enter a valid cinema hall name.');
    }
  };

  return (
    <div className="staff-management-container">
      <h2 className="header-title">Staff Details</h2>

      {/* Input to enter cinema hall name */}
      {!showStaff && (
        <div className="cinema-hall-input">
          <input
            type="text"
            className="cinema-hall-input-field"
            placeholder="Enter Cinema Hall Name"
            value={cinemaHall}
            onChange={(e) => setCinemaHall(e.target.value)}
          />
          <button onClick={handleCinemaHallSubmit} className="btn-submit">
            Search Staff
          </button>
        </div>
      )}

      {/* Display staff details when a cinema hall is selected */}
      {showStaff && (
        <div className="staff-details-section">
          <h3 className="staff-list-title">Staff Members at {cinemaHall}</h3>
          <div className="staff-table-container">
            <table className="staff-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Contact</th>
                  <th>Email</th>
                  <th>Working Hours</th>
                </tr>
              </thead>
              <tbody>
                {staffDetails.map((staff, index) => (
                  <tr key={index}>
                    <td>{staff.name}</td>
                    <td>{staff.position}</td>
                    <td>{staff.contact}</td>
                    <td>{staff.email}</td>
                    <td>{staff.workingHours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default StaffManagement;
