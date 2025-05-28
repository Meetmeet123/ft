
"use client";
import React, { useState } from 'react';
import { VscFiles } from "react-icons/vsc";
import { FaRegFileExcel } from "react-icons/fa";
import { ImFileText2 } from "react-icons/im";
import { AiOutlineFilePdf } from "react-icons/ai";
import { LuColumns2 } from "react-icons/lu";
import { PiPrinterFill } from "react-icons/pi";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { ImCross } from "react-icons/im";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";

const HolidayType = () => {
    const [nameInput, setNameInput] = useState("");
    const [showIcons, setShowIcons] = useState(false);

    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [isNameAscending, setIsNameAscending] = useState(true);
    const [sessions, setSessions] = useState([
        { name: "Holiday", status: "", isNew: false },
        { name: "Vacation", status: "", isNew: false },
        { name: "Activity", status: "", isNew: false },
    ]);
    const [editingIndex, setEditingIndex] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (nameInput.trim() === "") {
            setError("This field is required");
        } else {
            setError("");

            if (editingIndex !== null) {
                const updated = [...sessions];
                updated[editingIndex].name = nameInput;
                setSessions(updated);
                setEditingIndex(null);
                setSuccessMessage("Record Updated Successfully");
            } else {
                setSessions((prev) => [...prev, { name: nameInput, status: "", isNew: true }]);
                setSuccessMessage("Record Saved Successfully");
            }

            setNameInput("");
            setTimeout(() => setSuccessMessage(""), 3000);
        }
    };
    const toggleNameSort = () => {
        setIsNameAscending((prev) => !prev);
        setShowIcons((prev) => !prev);
        const sorted = [...sessions].sort((a, b) =>
            isNameAscending ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name)
        );
        setSessions(sorted);
    };


    const handleEdit = (index) => {
        setNameInput(sessions[index].name);
        setEditingIndex(index);
    };

    const handleDelete = (index) => {
        setSessions((prev) => prev.filter((_, i) => i !== index));
    };

    const filteredSessions = sessions.filter((s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="pt-4">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-[4] w-full bg-white p-4 rounded shadow">

                    <h1 className="text-xl border-b dark:border-gray-700 pb-2">
                        {editingIndex !== null ? "Edit Holiday Type" : "Add Holiday Type"}
                    </h1>

                    {successMessage && (
                        <div className="text-green-500 text-xs mb-2 mt-2 bg-green-100 border border-green-200 p-2 rounded">
                            {successMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col mt-2">
                            <label htmlFor="name">Name <span className="text-red-500">*</span></label>
                            <input
                                id="name"
                                type="text"
                                value={nameInput}
                                onChange={(e) => setNameInput(e.target.value)}
                                className="py-1 px-2 border border-gray-300  mt-1 text-sm focus:outline-none focus:ring-0 "
                            />
                            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                        </div>

                        <div className="flex justify-end gap-2 mt-8  border-t pt-2">
                            <button
                                type="submit"
                                className="btn btn-primary bg-blue-500 text-white p-1 px-2 rounded focus:ring-0 flex items-center gap-1"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>

                {/* Table Section */}
                <div className="flex-[8] w-full bg-white p-4 rounded shadow">
                    <h1 className="text-xl border-b dark:border-gray-700 pb-2">Holiday Type</h1>

                    <div className="mt-4 flex justify-between">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="form-input mt-1 w-[30%] border-none focus:border-none focus:ring-0 outline-none border-0 border-b focus:outline-none"
                            placeholder="Search..."
                        />
                        <div className="flex items-center border-b">
                            {[VscFiles, FaRegFileExcel, ImFileText2, AiOutlineFilePdf, PiPrinterFill, LuColumns2].map((Icon, i) => (
                                <div key={i} className='hover:bg-gray-200 p-1 cursor-pointer'><Icon /></div>
                            ))}
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto mt-4">
                        <table className="min-w-full text-sm table-auto border">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left px-4 py-2 cursor-pointer" onClick={toggleNameSort}>
                                        <div className="flex items-center gap-1">
                                            Name
                                            {isNameAscending ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                                        </div>
                                    </th>


                                    <th className="text-right px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSessions.length > 0 ? (
                                    filteredSessions.map((session, index) => (
                                        <tr key={index} className="border-b hover:bg-gray-100">
                                            <td className="px-4 py-2 text-left">{session.name}</td>
                                            <td className="px-4 py-2 text-right">
                                                {session.isNew && (
                                                    <div className="flex justify-end gap-2">
                                                        <FiEdit2
                                                            className="cursor-pointer"
                                                            onClick={() => handleEdit(index)}
                                                        />
                                                        <ImCross


                                                            className="text-semibold cursor-pointer"
                                                            onClick={() => handleDelete(index)}
                                                        />
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="2" className="text-center text-red-500 py-4">
                                            No Data Found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>


                        {/* Footer Info */}
                        {filteredSessions.length > 0 && (
                            <div className="flex justify-between mt-4">
                                <p className="text-xs">
                                    Records: 1 to {filteredSessions.length} of {filteredSessions.length}
                                </p>
                                <div className="flex items-center space-x-1">
                                    <button className="text-xs p-1 w-6 h-6 rounded hover:bg-gray-200"><IoIosArrowBack /></button>
                                    <button className="text-xs p-1 w-6 h-6 rounded bg-gray-200">1</button>
                                    <button className="text-xs p-1 w-6 h-6 rounded hover:bg-gray-200"><IoIosArrowForward /></button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HolidayType;
