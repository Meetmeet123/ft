import React from 'react';
import { useState } from 'react';

const TimeInput = () => {
    // State to store the time value for each individual input
    const [time, setTime] = useState('');

    // Function to set the current time when the input is focused
    const handleFocus = () => {
        if (!time) { // Only set the time if it's not already set by the user
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            setTime(`${hours}:${minutes}`);
        }
    };

    // Function to handle changes in the time input
    const handleChange = (event) => {
        setTime(event.target.value);
    }
    return (
        <div className="ml-40 flex pt-3">
            <label htmlFor={id} className="block text-lg text-gray-500 mx-6">{label}</label>
            <input
                type="time"
                id={id}
                name={id}
                value={time || ''} // Controlled input, value is linked to the state
                onFocus={handleFocus} // Set current time on focus
                onChange={handleChange} // Handle changes made by the user
                placeholder="Enter time"
                className="mt-1 block w-70 h-7 px-3 py-1 border border-gray-300 shadow-sm focus:outline-none focus:ring-0 focus:ring-gray-500 focus:border-gray-500 text-xs"
                required
            />
        </div>
    );
}

export default TimeInput;
