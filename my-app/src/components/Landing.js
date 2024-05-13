import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useLocation} from "react-router-dom";

const Landing = () => {
    const REACT_APP_SERVER = "http://localhost:3000";

    const [items, setItems] = useState([]);
    const [itemSize, setItemSize] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);

    const { state } = useLocation();

    // const { data } = state;

    useEffect(() => {
    const fetchBikes = async () => {
        try {
            console.log("STATE",state)
            setIsLoading(true)
            const token = localStorage.getItem('accessToken');
            console.log("VERIFYING STORED 'BEAR' TOKEN", token)
            setToken(token);
            const response  = await axios.get('http://localhost:3000/api/v1/Bike',
                {
                headers:
                    {
                    Authorization: `Bearer ${token}`
                    }
            });

            setItems(response.data);
            setItemSize(response.data.length);

        } catch (error) {
            console.error('Error fetching bikes:', error);
            setError('Error fetching bikes, probably token', token);
        }
        setIsLoading(false);
    }
        fetchBikes();
    }, []);


    return (
        <div>
            <h2>Bike Items ({itemSize}): </h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <ul>
                    {/*{items.data.Bikes.map((item, index) => ())}*/}
                    {items.map(i => (
                        <li key={i.id}>
                            <p>Name: {i.nameFirst}</p>
                            <p>Last: {i.nameLast}</p>
                            <p>Budget: ${i.budget}</p>
                            <p>Owns: {i.Bikes.length}</p>
                            {/*<p>Price: ${i.price}</p>*/}
                            {/*<p>Type: {i.type}</p>*/}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
export default Landing;

