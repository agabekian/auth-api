import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Landing = () => {
    const REACT_APP_SERVER = "http://localhost:3000";

    const [items, setItems] = useState([]);
    const [itemSize, setItemSize] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);



    useEffect(() => {
    const fetchBikes = async () => {
        try {
            setIsLoading(true)
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFyYSIsImlhdCI6MTcxNTU2ODQ0MH0.0QR8HkMRsPjPWM2wEuJgQ1Vav_DYZoNKdYcsUC9No4Q"
            // const response = await axios.get('http://localhost:3000/api/v1/Bike');
            const response  = await axios.get('http://localhost:3000/api/v1/Bike',
                {
                headers:
                    {
                    Authorization: `Bearer ${token}`
                    }
            });
            console.log("STATE",items)
            setItems(response.data);
            setItemSize(response.data.length);

        } catch (error) {
            console.error('Error fetching bikes:', error);
            setError('Error fetching bikes');
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
                            <p>Owns: {i.Bikes.lengthgit add}</p>
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

