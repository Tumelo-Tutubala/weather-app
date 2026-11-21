import { useState } from "react";

export default function SearchBar({ onSearch }) {
    const [city, setCity] = useState('');

    return (
        <div>
            <input

                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter name of your city"
            />

            <button onClick={() => onSearch(city)}>search</button> 
        </div>
    );
}