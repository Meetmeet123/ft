
import React, { useState } from 'react';
const Maintenance = () => {
    // Initialize the buttonStates array to [false, false] to make both radio buttons disabled by default
    const [buttonStates, setButtonStates] = useState([false]);

    // Function to handle radio button changes
    const handleRadioChange = (index, value) => {
        const updatedButtonStates = [...buttonStates];
        updatedButtonStates[index] = value;
        setButtonStates(updatedButtonStates);
    };

    return (
        <div className="w-full h-full bg-white p-3 relative">
            {/* Background content wrapper */}
            <div>
                <h1 className="text-xl border-b dark:border-gray-700 pb-2">Maintenance</h1>
                <form className=''>
                    <div className="flex flex-col">
                        {/* Group 1 */}
                        <div className="flex pt-3">
                            <label htmlFor="">Maintenance Mode</label>
                            <div className="flex items-center ml-15">
                                <input
                                    id="default-radio-1"
                                    type="radio"
                                    checked={!buttonStates[0]} // If 'buttonStates[0]' is false, 'Disabled' will be checked
                                    onChange={() => handleRadioChange(0, false)} // Set to false when 'Disabled' is selected
                                    name="default-radio-1"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-0"
                                />
                                <label htmlFor="default-radio-1" className="ms-2 text-gray-900 dark:text-gray-300">
                                    Disabled
                                </label>
                            </div>
                            <div className="flex items-center ml-2">
                                <input
                                    id="default-radio-2"
                                    type="radio"
                                    checked={buttonStates[0]}
                                    onChange={() => handleRadioChange(0, true)}
                                    name="default-radio-1"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-0"
                                />
                                <label htmlFor="default-radio-2" className="ms-2 text-gray-900 dark:text-gray-300">
                                    Enabled
                                </label>
                            </div>
                        </div>

                    </div>
                    {/* Save Button */}
                    <div className="flex justify-end mt-5 border-t dark:border-gray-700">
                        <button className="btn btn-primary bg-blue-500 text-white p-1 px-2 mt-3 rounded focus:ring-0 focus:outline-none">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Maintenance;




