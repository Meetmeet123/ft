
"use client";
import React, { useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { FiCheckSquare } from 'react-icons/fi';
import { VscFiles } from "react-icons/vsc";
import { FaRegFileExcel } from "react-icons/fa";
import { ImFileText2 } from "react-icons/im";
import { AiOutlineFilePdf } from "react-icons/ai";
import { LuColumns2 } from "react-icons/lu";
import { PiPrinterFill } from "react-icons/pi";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { IoMdArrowDropup } from 'react-icons/io';

import { IoSearch } from "react-icons/io5";
import { FaDownload } from "react-icons/fa6";

export default function DownloadCV() {
    const options = ["Present", "Late", "Absent", "Half Day", "Holiday"];
    // const [selected, setSelected] = useState("");
    const students = [
        { id: 1, admissionNo: "1001", studentName: "Ravi Kumar", dateOfBirth: "08/05/2009", class: "Class 1", section: "A", gender: "Male", category: "Manual Entry", mobileNumber: "879362547" },
        { id: 2, admissionNo: "1002", studentName: "Anjali Sharma", dateOfBirth: "12/03/2010", class: "Class 1", section: "B", gender: "Female", category: "Manual Entry", mobileNumber: "9876543210" },
        { id: 3, admissionNo: "1003", studentName: "Vikram Singh", dateOfBirth: "25/07/2009", class: "Class 2", section: "A", gender: "Male", category: "Manual Entry", mobileNumber: "9123456789" },
        { id: 4, admissionNo: "1004", studentName: "Priya Patel", dateOfBirth: "30/09/2010", class: "Class 2", section: "B", gender: "Female", category: "Manual Entry", mobileNumber: "9988776655" },
        { id: 5, admissionNo: "1005", studentName: "Amit Joshi", dateOfBirth: "15/01/2011", class: "Class 3", section: "A", gender: "Male", category: "Manual Entry", mobileNumber: "8877665544" },
        { id: 6, admissionNo: "1006", studentName: "Sneha Verma", dateOfBirth: "22/05/2011", class: "Class 3", section: "B", gender: "Female", category: "Manual Entry", mobileNumber: "7766554433" },
        { id: 7, admissionNo: "1007", studentName: "Rahul Mehta", dateOfBirth: "10/11/2009", class: "Class 4", section: "A", gender: "Male", category: "Manual Entry", mobileNumber: "6655443322" },
        { id: 8, admissionNo: "1008", studentName: "Kavita Desai", dateOfBirth: "05/02/2010", class: "Class 4", section: "B", gender: "Female", category: "Manual Entry", mobileNumber: "5544332211" },
        { id: 9, admissionNo: "1009", studentName: "Suresh Raina", dateOfBirth: "18/08/2011", class: "Class 5", section: "A", gender: "Male", category: "Manual Entry", mobileNumber: "4433221100" },
        { id: 10, admissionNo: "1010", studentName: "Neha Kapoor", dateOfBirth: "28/12/2011", class: "Class 5", section: "B", gender: "Female", category: "Manual Entry", mobileNumber: "3322110099" },
    ];
    const [data, setData] = useState(students);
    const [attendanceStatus, setAttendanceStatus] = useState(() => {
        const initialStatus = {};
        students.forEach(student => {
            initialStatus[student.id] = student.attendance || "";
        });
        return initialStatus;
    });
    const handleSetAllAttendance = (value) => {
        const updatedStatus = {};
        students.forEach(student => {
            updatedStatus[student.id] = value;
        });
        setAttendanceStatus(updatedStatus);
    };
    const handleIndividualAttendanceChange = (studentId, value) => {
        setAttendanceStatus(prevStatus => ({
            ...prevStatus,
            [studentId]: value,
        }));
    };


    const [selectedClass, setSelectedClass] = useState("");
    const [selectedSection, setSelectedSection] = useState("");
    const [searchClicked, setSearchClicked] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: "studentName", direction: "asc" });

    const handleSearch = (e) => {
        e.preventDefault();
        if (selectedClass && selectedSection) {
            setSearchClicked(true);
        } else {
            alert("Please select both Class and Section.");
        }
    };

    const renderSortIcon = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === "asc" ? <IoMdArrowDropup /> : <IoMdArrowDropdown />;
        }
        return <IoMdArrowDropdown className="text-gray-400" />;
    };
    const requestSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };
    let filteredData = [];
    let sortedData = [];
    if (searchClicked && selectedClass && selectedSection) {
        filteredData = [...students]
            .filter((student) => student.class === selectedClass && student.section === selectedSection)
            .filter((student) =>
                student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.admissionNo.includes(searchTerm)
            );
        sortedData = [...filteredData].sort((a, b) => {
            if (!sortConfig.key) return 0;
            const aVal = a[sortConfig.key];
            const bVal = b[sortConfig.key];
            if (typeof aVal === "string") {
                return sortConfig.direction === "asc"
                    ? aVal.localeCompare(bVal)
                    : bVal.localeCompare(aVal);
            }
            return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
        });
    }

    return (
        <div className="p-4 bg-white mt-6">
            <h1 className="text-xl border-b pb-2">Select Criteria</h1>
            <form onSubmit={handleSearch} className="mt-4">
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block mb-1 py-2">
                            Class <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={selectedClass}
                            onChange={(e) => {
                                setSelectedClass(e.target.value);
                                setSelectedSection(""); // Reset section when class changes
                                setSearchClicked(false); // Require re-click on Search
                            }}
                            className="bg-gray-50 border py-1 border-gray-300 text-gray-900 text-sm block w-full p-2.5 rounded-none focus:outline-none focus:ring-0 focus:border-none"
                        >
                            <option value="">Select</option>
                            <option value="Class 1">Class 1</option>
                            <option value="Class 2">Class 2</option>
                            <option value="Class 3">Class 3</option>
                            <option value="Class 4">Class 4</option>
                            <option value="Class 5">Class 5</option>
                        </select>
                    </div>

                    <div className="flex-1">
                        <label className="block mb-1 py-2">
                            Section <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={selectedSection}
                            onChange={(e) => {
                                setSelectedSection(e.target.value);
                                setSearchClicked(false); // Require re-click on Search
                            }}
                            disabled={!selectedClass}
                            className="bg-gray-50 border py-1 border-gray-300 text-gray-900 text-sm block w-full p-2.5 mb-4 rounded-none focus:outline-none focus:ring-0 focus:border-none"
                        >
                            <option value="">Select</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                        </select>
                    </div>

                </div>
                <div className="flex justify-end items-end border-b pb-2">
                    <button type="submit" className="btn btn-primary bg-blue-500 text-white p-1 px-2 rounded focus:ring-0 focus:outline-none flex items-center gap-1">
                        <IoSearch />Search
                    </button>
                </div>
            </form>
            {searchClicked && selectedClass && selectedSection && (
                <div className="bg-white mt-2 ">

                    <div className="text-xl border-b pb-2">
                        <h1>Student List</h1>
                    </div>
                    <div className='flex justify-between mt-2'>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="form-input mt-1 w-[30%] border-none focus:border-none focus:ring-0 outline-none border-0 border-b focus:outline-none"
                            placeholder="Search..."
                        />

                        <div className="flex items-center border-b">
                            {[VscFiles, FaRegFileExcel, ImFileText2, AiOutlineFilePdf, PiPrinterFill, LuColumns2].map((Icon, i) => (
                                <div key={i} className='hover:bg-gray-200 p-1 cursor-pointer'><Icon /></div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-2 ">
                        <div className="flex flex-col gap-2">
                        </div>
                    </div>
                    <table className="w-full mt-4 border-t text-sm text-left">
                        <thead>
                            <tr>
                                {["Admission No", "StudentName", "DateOfBirth", "Gender", "Category", "MobileNumber"].map((key) => (
                                    <th key={key} onClick={() => requestSort(key)} className="p-2 cursor-pointer">
                                        <div className="flex items-center gap-1 capitalize">
                                            {key} {renderSortIcon(key)}
                                        </div>
                                    </th>
                                ))}
                                <th className="font-medium text-right pr-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((student) => (
                                <tr key={student.admissionNo} className="border-t hover:bg-gray-200 mx-2">
                                    <td className="p-2">{student.admissionNo}</td>
                                    <td className="p-2 text-blue-400">{student.studentName}</td>
                                    <td className="p-2">{student.dateOfBirth}</td>
                                    <td className="p-2">{student.gender}</td>
                                    <td className="p-2">{student.category}</td>
                                    <td className="p-2">{student.mobileNumber}</td>
                                    <td className='p-2 ml-2'>

                                        <button className="text-blue-500"> <FaDownload /></button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>


                    </table>
                    {sortedData.length > 0 && (
                        <div className="flex justify-between mt-4">
                            <p className="text-xs">Records: 1 to {sortedData.length} of {sortedData.length}</p>
                            <div className="flex items-center space-x-1">
                                <button className="text-xs p-1 w-6 h-6 rounded hover:bg-gray-200"><IoIosArrowBack /></button>
                                <button className="text-xs p-1 w-6 h-6 rounded bg-gray-200">1</button>
                                <button className="text-xs p-1 w-6 h-6 rounded hover:bg-gray-200"><IoIosArrowForward /></button>
                            </div>
                        </div>
                    )}

                </div>
            )}


        </div>
    );
}
