import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const REACT_APP_SERVER = process.env.REACT_APP_SERVER | "http://localhost:3000";
    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${REACT_APP_SERVER}/api/v2/signup`,
                { username, password },
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.status === 200) {
                const token = response.data.token;
                localStorage.setItem('accessToken', token); // Store token in local storage
                // Optionally, redirect to another page
            } else {
                setError('Sign up failed. Please try again.');
            }
        } catch (error) {
            console.error('Error signing up:', error);
            setError('An error occurred while signing up.');
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSignUp}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;
