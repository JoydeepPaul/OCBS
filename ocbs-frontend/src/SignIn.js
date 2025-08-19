import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles/SignIn.css'; // Import the CSS module

function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setErrorMessage('All fields are required');
            return;
        }

        try {
            // Update this URL to match the backend endpoint for sign-in
            const response = await fetch(`${process.env.REACT_APP_API_URL}/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Sign In Successful');
                // Save the token (if using JWT) and navigate
                localStorage.setItem('token', data.token); // Store token in localStorage
                navigate('/dashboard'); // Redirect to the dashboard after successful sign-in
            } else {
                setErrorMessage(data.message || 'Sign In failed');
            }
        } catch (error) {
            setErrorMessage('Error: Unable to sign in. Please try again later.');
        }
    };

    const handleForgotPassword = () => {
        navigate('/forgot-password'); // Redirect to Forgot Password page
    };

    return (
        <div className={styles.container}>
            <h2>Sign In</h2>
            <form onSubmit={handleSignIn}>
                <div className={styles.formGroup}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
                <button type="submit">Sign In</button>
            </form>
            <div>
                <a className={styles.goBackBtn} href="/">Go Back</a>
            </div>
            <div>
                <button onClick={handleForgotPassword}>Forgot Password?</button>
            </div>
        </div>
    );
}

export default SignIn;
