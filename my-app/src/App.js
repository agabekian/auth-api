import './App.css';
import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Landing from './components/Landing';
import SignUp from "./components/SignUp";


const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    return (
        <div className="App">
            <header className="App-header">
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/landing" element={<Landing />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="*" element={<LoginForm />} />

                </Routes>
            </Router>
            </header>
        </div>
    );
}

export default App;