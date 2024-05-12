import React, { useState } from 'react';
import axios from 'axios'; // Import Axios library

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        console.log("button pushed");
        alert("dddd")
        try {
            const response = await axios.post('/api/v2/signin', { username, password });
            if (response.status === 200) {
                alert('Logged in successfully!');
                // You can redirect the user to another page after successful login
            } else {
                setError('Invalid username or password');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while logging in');
        }
    };

    return (
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
    );
};

export default LoginForm;
