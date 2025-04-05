
import React, { useState } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io"; 

const SessionSettings = () => {
    // State for tracking the session input value
    const [sessionInput, setSessionInput] = useState("");
    // State for handling validation error
    const [error, setError] = useState("");
    // State for tracking the session list
    const [sessions, setSessions] = useState([
        { session: "2017-18", status: "" },
        { session: "2018-19", status: "" },
        { session: "2019-20", status: "" },
        { session: "2020-21", status: "" },
        { session: "2021-22", status: "" },
        { session: "2022-23", status: "" },
        { session: "2023-24", status: "" },
        { session: "2024-25", status: "" },
        { session: "2025-26", status: "" },
        { session: "2026-27", status: "" },
        { session: "2027-28", status: "" },
        { session: "2028-29", status: "" },
        { session: "2029-30", status: "" },
        { session: "2030-31", status: "" }
    ]);
    const [isSessionAscending, setIsSessionAscending] = useState(true); 
    const [isStatusAscending, setIsStatusAscending] = useState(true); 
    const [searchQuery, setSearchQuery] = useState(""); 
    const [successMessage, setSuccessMessage] = useState(""); 

    // Handle adding new session
    const handleSubmit = (e) => {
        e.preventDefault();
        if (sessionInput.trim() === "") {
            setError("This field is required");
        } else {
            setError(""); // Clear error if input is filled
            setSessions((prevSessions) => [
                ...prevSessions,
                { session: sessionInput, status: "" }
            ]);
            setSessionInput(""); // Clear input field
            setSuccessMessage("Record Saved Successfully");
            setTimeout(() => setSuccessMessage(""), 3000); 
        }
    };

    // Sorting function for session column
    const toggleSessionSort = () => {
        setIsSessionAscending((prev) => !prev);
        setSessions((prevSessions) => {
            const sortedSessions = [...prevSessions].sort((a, b) => {
                if (isSessionAscending) {
                    return a.session.localeCompare(b.session); // Ascending order
                } else {
                    return b.session.localeCompare(a.session); // Descending order
                }
            });
            return sortedSessions;
        });
    };

    // Sorting function for status column
    const toggleStatusSort = () => {
        setIsStatusAscending((prev) => !prev);
        setSessions((prevSessions) => {
            const sortedSessions = [...prevSessions].sort((a, b) => {
                if (isStatusAscending) {
                    return a.status.localeCompare(b.status); // Ascending order
                } else {
                    return b.status.localeCompare(a.status); // Descending order
                }
            });
            return sortedSessions;
        });
    };

    // Filter sessions based on the search query
    const filteredSessions = sessions.filter((session) => {
        return (
            session.session.toLowerCase().includes(searchQuery.toLowerCase()) ||
            session.status.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    return (
        <div>
            <div className="flex mb-4">
                <div className="w-1/2 bg-white h-full p-2">
                    <h1 className="text-xl border-b dark:border-gray-700 pb-2">Add Session</h1>
                    {successMessage && (
                        <div className="text-green-500 text-xs mb-2 mt-2 bg-green-100 border border-green-200 p-2 rounded">
                            {successMessage}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col mt-2 p-2">
                            <h1>
                                Session <span className="text-red-500">*</span>
                            </h1>
                            <input
                                type="text"
                                value={sessionInput}
                                onChange={(e) => setSessionInput(e.target.value)}
                                className="py-1 w-70 h-6 text-xs"
                            />
                            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                        </div>
                        <div className="flex justify-end mt-5 border-t dark:border-gray-700">
                            <button className="btn btn-primary bg-blue-500 text-white p-1 px-2 mt-3 rounded focus:ring-0 focus:outline-none">
                                Save
                            </button>
                        </div>
                    </form>
                </div>

                <div className="w-3/4 bg-white ml-2 p-2">
                    <h1 className="text-xl border-b dark:border-gray-700 pb-2">Session List</h1>
                    <div className="container mx-auto p-4">
                        <div className="p-3 m-3" style={{ backgroundColor: '#dae8f2', color: "#3498db", borderColor: "a3c8e3" }}>
                            <h4>Note: After saving General Setting please once logout then relogin so changes will be come in effect.</h4>
                        </div>

                        {/* Search Input */}
                        <input
                            type="text"
                            placeholder="Search....."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="form-input w-[20%] h-[10%] border-none focus:border-none focus:ring-0 outline-none border-0 border-b focus:outline-none"
                        />

                        {/* Table */}
                        <table className="min-w-full table-auto mt-4">
                            <thead className='border-b'>
                                <tr className='flex justify-between '>
                                    {/* Session and Status Headers in the same row */}
                                    <th className="py-2 px-4 text-left flex items-center space-x-2">
                                        <span>Session</span>
                                        {isSessionAscending ? (
                                            <IoMdArrowDropdown
                                                className="text-gray-500 cursor-pointer hover:text-blue-500"
                                                onClick={toggleSessionSort}
                                            />
                                        ) : (
                                            <IoMdArrowDropup
                                                className="text-gray-500 cursor-pointer hover:text-blue-500"
                                                onClick={toggleSessionSort}
                                            />
                                        )}
                                    </th>

                                    <th className="py-2 px-4 text-left flex items-center space-x-2">
                                        <span>Status</span>
                                        {isStatusAscending ? (
                                            <IoMdArrowDropdown
                                                className="text-gray-500 cursor-pointer hover:text-blue-500"
                                                onClick={toggleStatusSort}
                                            />
                                        ) : (
                                            <IoMdArrowDropup
                                                className="text-gray-500 cursor-pointer hover:text-blue-500"
                                                onClick={toggleStatusSort}
                                            />
                                        )}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSessions.length > 0 ? (
                                    filteredSessions.map((session) => (
                                        <tr key={session.session}>
                                            <td className="py-2 px-4 border-b">{session.session}</td>
                                            <td className="py-2 px-4 border-b">{session.status}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="2" className="py-2 px-4 text-center border-b text-red-500">
                                            No Data Found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SessionSettings;

