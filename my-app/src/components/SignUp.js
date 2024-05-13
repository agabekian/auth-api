import React, {useState} from 'react';
import axios from 'axios';
import {Navigate} from 'react-router-dom';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const [isSignedUp, setIsSignedUp] = useState(false);

    const REACT_APP_SERVER = "http://localhost:3000";

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            setIsSignedUp(true);
            // console.log(username, role, password)
            const response = await axios.post(
                `${REACT_APP_SERVER}/api/v2/signup`,
                {username, password, role},
                {headers: {'Content-Type': 'application/json'}}
            );
            if (response.status === 201) {
                const token = response.data.token;
                localStorage.setItem('accessToken', token); // Store the generated token in local storage
                let test = localStorage.getItem("accessToken");
                console.log(username, "STORED", test)
            } else
                setError('Sign up failed. Try again.');
        } catch (error) {
            console.error('Error signing up:', error);
            setError('An error occurred while signing up.');
        }
    };

    return (
        <div>
            {isSignedUp ? (
                <Navigate to="/login"/>
            ) : (
                <div>
                    <h2>Log in</h2>
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
                            <label htmlFor="roles">Select Role:</label>
                            <select id="roles"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)
                                    }>
                                <option value="user">User</option>
                                <option value="writer">Writer</option>
                                <option value="editor">Editor</option>
                                <option value="admin">Admin</option>
                            </select>
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
            )}
        </div>
    );
};

export default SignUp;

