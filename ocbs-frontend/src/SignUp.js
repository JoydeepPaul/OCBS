import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles/SignUp.css'; // Import the CSS Module
//require('dotenv').config({ path: './dead.env' });

function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // Password strength validation function
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        
        if (!username || !email || !password) {
            setErrorMessage('All fields are required');
            return;
        }

        if (!validatePassword(password)) {
            setErrorMessage('Password must be at least 8 characters long and contain an uppercase letter, a lowercase letter, a number, and a special character.');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Sign Up Successful');
                navigate('/'); // Redirect to home page after successful sign-up
            } else {
                setErrorMessage(data.message || 'Sign up failed');
            }
        } catch (error) {
            setErrorMessage('An error occurred while signing up. Please try again later.');
            console.error('Error:', error);
        }
    };

    return (
        <div className={styles.container}>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp}>
                <div className={styles['form-group']}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className={styles['form-group']}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className={styles['form-group']}>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {errorMessage && <div className={styles['error-message']}>{errorMessage}</div>}
                <button type="submit" className={styles['submit-button']}>Sign Up</button>
            </form>
            <div>
                <a className={styles['go-back-btn']} href="/">Go Back</a>
            </div>
        </div>
    );
}

export default SignUp;
