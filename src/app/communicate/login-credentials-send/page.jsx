
"use client";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { VscFiles } from "react-icons/vsc";
import { FaRegFileExcel } from "react-icons/fa";
import { ImFileText2 } from "react-icons/im";
import { AiOutlineFilePdf } from "react-icons/ai";
import { PiPrinterFill } from "react-icons/pi";
import { LuColumns2 } from "react-icons/lu";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

export default function LoginCredentialsSend() {
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedSection, setSelectedSection] = useState("");
    const [searchClicked, setSearchClicked] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

    const students = [
        { id: 1, admissionNo: "1001", name: "Ravi Kumar", class: "Class 1", dob: "01/05/2016", gender: "Male", mobile: "9876543210" },
        { id: 2, admissionNo: "1002", name: "Anita Singh", class: "Class 1", dob: "02/08/2015", gender: "Female", mobile: "8765432109" },
        { id: 3, admissionNo: "2001", name: "Mohan Das", class: "Class 2", dob: "03/11/2014", gender: "Male", mobile: "7654321098" },
        { id: 4, admissionNo: "2002", name: "Ritu Sharma", class: "Class 2", dob: "04/03/2015", gender: "Female", mobile: "6543210987" },
        { id: 5, admissionNo: "3001", name: "Emma Thomas", class: "Class 3", dob: "07/14/2016", gender: "Female", mobile: "6881016512" },
        { id: 6, admissionNo: "3002", name: "John M. Pinto", class: "Class 3", dob: "01/12/2009", gender: "Male", mobile: "8906786784" },
        { id: 7, admissionNo: "4001", name: "Ajay Patel", class: "Class 4", dob: "06/22/2013", gender: "Male", mobile: "9988776655" },
        { id: 8, admissionNo: "4002", name: "Pooja Mehra", class: "Class 4", dob: "09/15/2012", gender: "Female", mobile: "8877665544" },
        { id: 9, admissionNo: "5001", name: "Rahul Chauhan", class: "Class 5", dob: "11/25/2011", gender: "Male", mobile: "7766554433" },
        { id: 10, admissionNo: "5002", name: "Simran Kaur", class: "Class 5", dob: "12/30/2010", gender: "Female", mobile: "6655443345" },
        { id: 10, admissionNo: "5003", name: "Atul", class: "Class 5", dob: "12/01/2000", gender: "Female", mobile: "6655440342" },
        { id: 10, admissionNo: "5005", name: "Simra", class: "Class 5", dob: "11/30/2011", gender: "Female", mobile: "6655442322" },
    ];

    const handleSearch = (e) => {
        e.preventDefault();
        if (selectedClass && selectedSection) {
            setSearchClicked(true);
        } else {
            alert("Please select both Class and Section.");
        }
    };

    const requestSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const renderSortIcon = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === "asc" ? <IoMdArrowDropup /> : <IoMdArrowDropdown />;
        }
        return <IoMdArrowDropdown className="text-gray-400" />;
    };

    let filteredData = [];
    if (searchClicked && selectedClass && selectedSection) {
        filteredData = students
            .filter((student) => student.class === selectedClass)
            .filter((student) =>
                student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.admissionNo.includes(searchTerm)
            )
            .sort((a, b) => {
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
                            Section
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
                <div className="flex gap-2 w-180">
                    <div className="flex-1">
                        <label className="block mb-1 py-2">
                            Select All
                        </label>
                        <input
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 focus:outline-none"
                        />

                    </div>
                    <div className="flex-1">
                        <label className="block mb-1 py-2">
                            Message To <span className="text-red-500">*</span>
                        </label>
                        <select

                            className="bg-gray-50 border py-1 border-gray-300 text-gray-900 text-sm block w-full p-2.5 rounded-none focus:outline-none focus:ring-0 focus:border-none"
                        >
                            <option value="">Select</option>
                            <option value="Student">Student</option>
                            <option value="Parent">Parent</option>
                            <option value="Both">Both</option>

                        </select>
                    </div>

                    <div className="flex-1">
                        <label className="block mb-1 py-2">
                            Notification Type <span className="text-red-500">*</span>
                        </label>
                        <select
                            disabled={!selectedClass}
                            className="bg-gray-50 border py-1 border-gray-300 text-gray-900 text-sm block w-full p-2.5 mb-4 rounded-none focus:outline-none focus:ring-0 focus:border-none"
                        >
                            <option value="">Select</option>
                            <option value="Student Admition">Student Admition</option>
                            <option value="Login Credential">Login Credential</option>
                            <option value="Both">Both</option>

                        </select>
                    </div>
                </div>
            )}

            {searchClicked && selectedClass && selectedSection && (
                <div className="mt-6 bg-white p-3">
                    <div className="flex justify-between items-center">
                        <div>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="form-input mt-1 w-[50%] border-none focus:border-none focus:ring-0 outline-none border-0 border-b focus:outline-none"
                                placeholder="Search..."
                            />
                        </div>
                        <div className="flex items-center border-b pb-2 ">
                            <div className='hover:bg-gray-200 p-1'>  <VscFiles className='' /></div>
                            <div className='hover:bg-gray-200 p-1 ' ><FaRegFileExcel /></div>
                            <div className='hover:bg-gray-200 p-1' > <ImFileText2 /></div>
                            <div className='hover:bg-gray-200 p-1' > <AiOutlineFilePdf /></div>
                            <div className='hover:bg-gray-200 p-1 ' > <PiPrinterFill /></div>
                            <div className='hover:bg-gray-200 p-1' >  <LuColumns2 /></div>

                        </div>
                    </div>
                    <table className="w-full mt-4 border-t text-sm text-left">
                        <thead>
                            <tr>
                                {["#", "admissionNo", " Student name", "class", "dob", "gender", "mobile"].map((key) => (
                                    <th key={key} onClick={() => requestSort(key)} className="p-2 cursor-pointer">
                                        <div className="flex items-center gap-1 capitalize">
                                            {key} {renderSortIcon(key)}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="">
                            {filteredData.map((student) => (
                                <tr key={student.admissionNo} className="border-t hover:bg-gray-200 mx-2 ">


                                    <td>  <input
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 focus:outline-none"
                                    /></td>
                                    <td className="p-2 ">{student.admissionNo}</td>
                                    <td className="p-2 text-blue-300">{student.name}</td>
                                    <td className="p-2">{`${student.class} ( ${selectedSection})`}</td>
                                    <td className="p-2">{student.dob}</td>
                                    <td className="p-2">{student.gender}</td>
                                    <td className="p-2">{student.mobile}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {searchClicked && selectedClass && selectedSection && filteredData.length > 0 && (
                <div>
                    <div className="flex items-center justify-between mt-4">
                        <p className="text-xs">
                            Records: {filteredData.length > 0 ? `1 to ${filteredData.length} of ${filteredData.length}` : '0'}
                        </p>

                        <div className="flex items-center space-x-1">
                            <button className="text-xs p-1 w-6 h-6 flex items-center justify-center rounded hover:bg-gray-200">
                                <IoIosArrowBack />
                            </button>

                            <div className='hover:bg-gray-200'>
                                <button className="text-xs p-1 w-6 h-6 flex items-center justify-center rounded bg-gray-200 text-black">
                                    1
                                </button>
                            </div>

                            <button className="text-xs p-1 w-6 h-6 flex items-center justify-center rounded hover:bg-gray-200">
                                <IoIosArrowForward />
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-end items-end border-b pb-4">
                        <button type="submit" className="btn btn-primary bg-blue-500 text-white p-1 px-2 rounded focus:ring-0 focus:outline-none flex items-center gap-1">
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
