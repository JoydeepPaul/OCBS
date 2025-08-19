import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditProfile.css'; // Import a custom CSS file for styling

function EditProfile() {
    const [newUsername, setNewUsername] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false); // Loading state for button
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        if (!newUsername || !email || !newPassword) {
            setErrorMessage('All fields are required.');
            return;
        }

        if (!validatePassword(newPassword)) {
            setErrorMessage(
                'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.'
            );
            return;
        }

        setErrorMessage('');
        setSuccessMessage('');
        setLoading(true);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/edit-profile`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, newUsername, newPassword }),
            });

            const data = await response.json();

            setLoading(false);

            if (response.ok) {
                setSuccessMessage(data.message);
                setTimeout(() => navigate('/dashboard'), 1500); // Navigate after a delay for better UX
            } else {
                setErrorMessage(data.message);
            }
        } catch (error) {
            setLoading(false);
            setErrorMessage('Error updating profile. Please try again.');
        }
    };

    return (
        <div className="edit-profile-container">
            <h2 className="edit-profile-title">Edit Your Profile</h2>
            <form className="edit-profile-form" onSubmit={handleUpdateProfile}>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email"
                        className="form-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="New Username"
                        className="form-input"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="New Password"
                        className="form-input"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                {successMessage && <div className="success-message">{successMessage}</div>}
                <button type="submit" className="update-button" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Profile'}
                </button>
            </form>
            <button className="go-back-btn" onClick={() => navigate('/dashboard')}>
                Go Back
            </button>
        </div>
    );
}

export default EditProfile;
