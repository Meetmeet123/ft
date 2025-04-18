import React, { useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
const BackendThemepage = () => {
    const [activeTheme, setActiveTheme] = useState("default"); // Track the active theme

    const handleClick = (theme) => {
        setActiveTheme(theme); // Update the active theme when a theme is clicked
    };
    const notify = () => {
        toast.success('Record Saved Successfully');;  // Simple toast notification
    };

    return (

        <div className='w-full h-full bg-white p-3'>
            <h1 className='text-xl border-b dark:border-gray-700 pb-2'>Backend Theme</h1>
            <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-4 sm:grid-cols-1 gap-4 border-b dark:border-gray-700">
                {/* White Theme */}
                <div className="max-w-sm bg-white pt-4 pb-6">
                    <div className="flex flex-col items-center justify-center">
                        <img src="https://demo.smart-school.in/backend/images/white.jpg?1743351998" alt="" />
                        <p
                            className={`font-normal text-gray-900 text-center bg-gray-500 p-1 rounded-b-lg w-38.5 ${activeTheme === 'white' ? 'bg-green-500' : ''
                                }`}
                            onClick={() => handleClick('white')}
                        >
                            White
                        </p>
                    </div>
                </div>

                {/* Default Theme */}
                <div className="max-w-sm bg-white pt-4 pb-6">
                    <div className="flex flex-col items-center justify-center">
                        <img src="https://demo.smart-school.in/backend/images/default.jpg?1743351998" alt="" />
                        <p
                            className={`font-normal text-gray-900 text-center bg-gray-500 p-1 rounded-b-lg w-38.5 ${activeTheme === 'default' ? 'bg-green-500' : ''
                                }`}
                            onClick={() => handleClick('default')}
                        >
                            Default
                        </p>
                    </div>
                </div>

                {/* Red Theme */}
                <div className="max-w-sm bg-white pt-4 pb-6">
                    <div className="flex flex-col items-center justify-center">
                        <img src="https://demo.smart-school.in/backend/images/red.jpg?1743351998" alt="" />
                        <p
                            className={`font-normal text-gray-900 text-center bg-gray-500 p-1 rounded-b-lg w-38.5 ${activeTheme === 'red' ? 'bg-green-500' : ''
                                }`}
                            onClick={() => handleClick('red')}
                        >
                            Red
                        </p>
                    </div>
                </div>

                {/* Blue Theme */}
                <div className="max-w-sm bg-white pt-4 pb-6">
                    <div className="flex flex-col items-center justify-center">
                        <img src="https://demo.smart-school.in/backend/images/blue.jpg?1743351998" alt="" />
                        <p
                            className={`font-normal text-gray-900 text-center bg-gray-500 p-1 rounded-b-lg w-38.5 ${activeTheme === 'blue' ? 'bg-green-500' : ''
                                }`}
                            onClick={() => handleClick('blue')}
                        >
                            Blue
                        </p>
                    </div>
                </div>

                {/* Gray Theme */}
                <div className="max-w-sm bg-white pt-4 pb-6">
                    <div className="flex flex-col items-center justify-center">
                        <img src="https://demo.smart-school.in/backend/images/gray.jpg?1743351998" alt="" />
                        <p
                            className={`font-normal text-gray-900 text-center bg-gray-500 p-1 rounded-b-lg w-38.5 ${activeTheme === 'gray' ? 'bg-green-500' : ''
                                }`}
                            onClick={() => handleClick('gray')}
                        >
                            Gray
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex justify-end mt-5">
                <button onClick={notify}
                    type="submit"
                    className="btn btn-primary bg-blue-500 text-white p-1 px-2 rounded focus:ring-0 focus:outline-none"
                >
                    Save
                </button>
                <ToastContainer />
            </div>
        </div>


    );
}

export default BackendThemepage;
