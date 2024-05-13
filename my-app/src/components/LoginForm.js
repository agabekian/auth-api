import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


// const REACT_APP_SERVER = process.env.REACT_APP_SERVER;
const REACT_APP_SERVER = "http://localhost:3000";

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const token = btoa(`${username}:${password}`);
            const response = await axios.post(
                `${REACT_APP_SERVER}/api/v2/signin`, {}, {
                    headers: {
                        Authorization: `Basic ${token}`
                    }
                });
            if (response.status === 200) {
                console.log("You're in, touch nothing but the lamp!");
                const token = response.data.token;
                const bear = localStorage.getItem('accessToken', token);
                console.log("BEARer",bear)
                setIsLoggedIn(true);
            } else {
                setError('Invalid username or password');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('error occurred while logging in');
        }
    };

    return (
        <div>
            {isLoggedIn ? (
                <Navigate to="/landing" />
            ) : (
                <div>
                    <h2>Log in</h2>
                    {error && <p>{error}</p>}
                    <form onSubmit={handleLogin}>
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
                        <button type="submit">Login</button>
                    </form>
                </div>
            )}
        </div>
    );
};
export default LoginForm;
