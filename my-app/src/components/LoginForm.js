import React, {useState} from 'react';
import axios from 'axios'; // Import Axios library
import Landing from './Landing';

const REACT_APP_SERVER = process.env.REACT_APP_SERVER // Backend server URL

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

    const handleLogin = async (e) => { // Pass event parameter
        e.preventDefault(); // Prevent default form submission behavior
        try {
            const token = btoa(`${username}:${password}`);
            const response = await axios.post(
                "http://localhost:3000/api/v2/signin", {}, {
                headers: {
                    Authorization: `Basic ${token}`
                }
            });
            if (response.status === 200) {
                console.log("You're in, touch nothing but the lamp!");
                setIsLoggedIn(true);
                // You can redirect the user to another page after successful login
            } else {
                setError('Invalid username or password');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while logging in');
        }
    };
    // If logged in, render the LandingPage component
    if (isLoggedIn) {
        return <Landing/>;
    }
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

