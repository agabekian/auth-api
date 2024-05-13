import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Get the absolute path to the .env file


const Landing = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const REACT_APP_SERVER = "http://localhost:3000";
    let itemsSize = 0;

    useEffect(() => {
        console.log("what is",process.env.REACT_APP_SERVER)
        const fetchItems = async () => {
            try {
                // const token = "localStorage.getItem('accessToken'); // Retrieve the bearer token from localStorage"
                const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFyYSIsImlhdCI6MTcxNTU2ODQ0MH0.0QR8HkMRsPjPWM2wEuJgQ1Vav_DYZoNKdYcsUC9No4Q"
                const response = await axios.get(`${REACT_APP_SERVER}/api/v1/Bike`, {
                    headers: {
                        Authorization: `Bearer ${token}` // Include the bearer token in the request headers
                    }
                });
                setItems(response.data);
                setIsLoading(false);
                itemsSize = 11;
            } catch (error) {
                console.error('Error fetching items:', error);
                setError('Error fetching items');
                setIsLoading(false);
            }
        };

        fetchItems();

    }, []);

    return (
        <div>
            <h2>Bike Items {itemsSize}</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <ul>
                    {items.map((item) => (
                        <li key={item.id}>
                            <p>Make: {item.make}</p>
                            <p>Model: {item.model}</p>
                            <p>Color: {item.color}</p>
                            <p>Price: ${item.price}</p>
                            <p>Type: {item.type}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Landing;
