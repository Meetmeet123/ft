

"use client";
import React, { useState } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { useSearchParams, useRouter } from 'next/navigation';
import { VscFiles } from "react-icons/vsc";
import { FaRegFileExcel } from "react-icons/fa";
import { ImFileText2 } from "react-icons/im";
import { AiOutlineFilePdf } from "react-icons/ai";
import { LuColumns2 } from "react-icons/lu";
import { PiPrinterFill } from "react-icons/pi";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { IoReorderThreeSharp } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";

export default function BuildCV() {
    const students = [
        {
            id: 1,
            admissionNo: "1001",
            rollNo: "2020",
            studentName: "Ravi Kumar",
            dateOfBirth: "08/05/2009",
            class: "Class 1",
            section: "C",
            gender: "Male",
            category: "General",
            mobileNumber: "879362547",
            email: "ravi.kumar@example.com",
            bloodGroup: "A+",
            height: "4'6\"",
            weight: "40",
            fatherName: "Raj Kumar",
            fatherPhone: "9876543211",
            fatherOccupation: "Engineer",
            motherName: "Sunita Kumar",
            motherPhone: "9876543212",
            motherOccupation: "Homemaker",
            guardianName: "Raj Kumar",
            guardianRelation: "Father",
            guardianEmail: "raj.kumar@example.com",
            guardianPhone: "9876543211",
            guardianOccupation: "Engineer",
            guardianAddress: "123 Street, Delhi",
            currentAddress: "123 Street, Delhi",
            permanentAddress: "123 Street, Delhi",
            nationalIdNumber: "ID1001",
            localIdNumber: "LID1001"
        },
        {
            id: 2,
            admissionNo: "1002",
            rollNo: "2021",
            studentName: "Anjali Sharma",
            dateOfBirth: "12/03/2010",
            class: "Class 1",
            section: "B",
            gender: "Female",
            category: "OBC",
            mobileNumber: "9876543210",
            email: "anjali.sharma@example.com",
            bloodGroup: "B+",
            height: "4'3\"",
            weight: "35",
            fatherName: "Mahesh Sharma",
            fatherPhone: "9888888881",
            fatherOccupation: "Banker",
            motherName: "Kavita Sharma",
            motherPhone: "9888888882",
            motherOccupation: "Teacher",
            guardianName: "Mahesh Sharma",
            guardianRelation: "Father",
            guardianEmail: "mahesh.sharma@example.com",
            guardianPhone: "9888888881",
            guardianOccupation: "Banker",
            guardianAddress: "456 Avenue, Mumbai",
            currentAddress: "456 Avenue, Mumbai",
            permanentAddress: "456 Avenue, Mumbai",
            nationalIdNumber: "ID1002",
            localIdNumber: "LID1002"
        },
        {
            id: 3,
            admissionNo: "1003",
            rollNo: "2022",
            studentName: "Vikram Singh",
            dateOfBirth: "25/07/2009",
            class: "Class 2 ",
            section: "A",
            gender: "Male",
            category: "SC",
            mobileNumber: "9123456789",
            email: "vikram.singh@example.com",
            bloodGroup: "O+",
            height: "4'8\"",
            weight: "42",
            fatherName: "Surya Singh",
            fatherPhone: "9876543200",
            fatherOccupation: "Farmer",
            motherName: "Sarla Singh",
            motherPhone: "9876543201",
            motherOccupation: "Tailor",
            guardianName: "Surya Singh",
            guardianRelation: "Father",
            guardianEmail: "surya.singh@example.com",
            guardianPhone: "9876543200",
            guardianOccupation: "Farmer",
            guardianAddress: "789 Village, Rajasthan",
            currentAddress: "789 Village, Rajasthan",
            permanentAddress: "789 Village, Rajasthan",
            nationalIdNumber: "ID1003",
            localIdNumber: "LID1003"
        },
        {
            id: 4,
            admissionNo: "1004",
            rollNo: "2023",
            studentName: "Priya Patel",
            dateOfBirth: "30/09/2010",
            class: "Class 2 ",
            section: "B",
            gender: "Female",
            category: "ST",
            mobileNumber: "9988776655",
            email: "priya.patel@example.com",
            bloodGroup: "AB+",
            height: "4'5\"",
            weight: "38",
            fatherName: "Ramesh Patel",
            fatherPhone: "8765432101",
            fatherOccupation: "Shopkeeper",
            motherName: "Meena Patel",
            motherPhone: "8765432102",
            motherOccupation: "Homemaker",
            guardianName: "Ramesh Patel",
            guardianRelation: "Father",
            guardianEmail: "ramesh.patel@example.com",
            guardianPhone: "8765432101",
            guardianOccupation: "Shopkeeper",
            guardianAddress: "100 Market Rd, Gujarat",
            currentAddress: "100 Market Rd, Gujarat",
            permanentAddress: "100 Market Rd, Gujarat",
            nationalIdNumber: "ID1004",
            localIdNumber: "LID1004"
        },
        {
            id: 5,
            admissionNo: "1005",
            rollNo: "2024",
            studentName: "Amit Joshi",
            dateOfBirth: "15/01/2011",
            class: "Class 3 ",
            section: "A",
            gender: "Male",
            category: "General",
            mobileNumber: "8877665544",
            email: "amit.joshi@example.com",
            bloodGroup: "A-",
            height: "4'4\"",
            weight: "37",
            fatherName: "Vijay Joshi",
            fatherPhone: "7654321090",
            fatherOccupation: "Driver",
            motherName: "Sita Joshi",
            motherPhone: "7654321091",
            motherOccupation: "Nurse",
            guardianName: "Vijay Joshi",
            guardianRelation: "Father",
            guardianEmail: "vijay.joshi@example.com",
            guardianPhone: "7654321090",
            guardianOccupation: "Driver",
            guardianAddress: "21 Main St, Pune",
            currentAddress: "21 Main St, Pune",
            permanentAddress: "21 Main St, Pune",
            nationalIdNumber: "ID1005",
            localIdNumber: "LID1005"
        },
        {
            id: 6,
            admissionNo: "1006",
            rollNo: "2025",
            studentName: "Sneha Verma",
            dateOfBirth: "22/05/2011",
            class: "Class 3 ",
            section: "B",
            gender: "Female",
            category: "General",
            mobileNumber: "7766554433",
            email: "sneha.verma@example.com",
            bloodGroup: "B-",
            height: "4'2\"",
            weight: "34",
            fatherName: "Anil Verma",
            fatherPhone: "7543210987",
            fatherOccupation: "Electrician",
            motherName: "Lata Verma",
            motherPhone: "7543210988",
            motherOccupation: "Housewife",
            guardianName: "Anil Verma",
            guardianRelation: "Father",
            guardianEmail: "anil.verma@example.com",
            guardianPhone: "7543210987",
            guardianOccupation: "Electrician",
            guardianAddress: "89 Sector 5, Bhopal",
            currentAddress: "89 Sector 5, Bhopal",
            permanentAddress: "89 Sector 5, Bhopal",
            nationalIdNumber: "ID1006",
            localIdNumber: "LID1006"
        },
        {
            id: 7,
            admissionNo: "1007",
            rollNo: "2026",
            studentName: "Rahul Mehta",
            dateOfBirth: "10/11/2009",
            class: "Class 4 )",
            section: "D",
            gender: "Male",
            category: "General",
            mobileNumber: "6655443322",
            email: "rahul.mehta@example.com",
            bloodGroup: "O-",
            height: "4'7\"",
            weight: "43",
            fatherName: "Ravi Mehta",
            fatherPhone: "7432109876",
            fatherOccupation: "Plumber",
            motherName: "Rekha Mehta",
            motherPhone: "7432109877",
            motherOccupation: "Retail Worker",
            guardianName: "Ravi Mehta",
            guardianRelation: "Father",
            guardianEmail: "ravi.mehta@example.com",
            guardianPhone: "7432109876",
            guardianOccupation: "Plumber",
            guardianAddress: "Plot 12, Chandigarh",
            currentAddress: "Plot 12, Chandigarh",
            permanentAddress: "Plot 12, Chandigarh",
            nationalIdNumber: "ID1007",
            localIdNumber: "LID1007"
        },
        {
            id: 11,
            admissionNo: "1007",
            rollNo: "2026",
            studentName: "Rahul Mehta",
            dateOfBirth: "10/11/2009",
            class: "Class 5 )",
            section: "D",
            gender: "Male",
            category: "General",
            mobileNumber: "6655443322",
            email: "rahul.mehta@example.com",
            bloodGroup: "O-",
            height: "4'7\"",
            weight: "43",
            fatherName: "Ravi Mehta",
            fatherPhone: "7432109876",
            fatherOccupation: "Plumber",
            motherName: "Rekha Mehta",
            motherPhone: "7432109877",
            motherOccupation: "Retail Worker",
            guardianName: "Ravi Mehta",
            guardianRelation: "Father",
            guardianEmail: "ravi.mehta@example.com",
            guardianPhone: "7432109876",
            guardianOccupation: "Plumber",
            guardianAddress: "Plot 12, Chandigarh",
            currentAddress: "Plot 12, Chandigarh",
            permanentAddress: "Plot 12, Chandigarh",
            nationalIdNumber: "ID1007",
            localIdNumber: "LID1007"
        },

        { id: 8, admissionNo: "1008", rollNo: "2027", studentName: "Kavita Desai", dateOfBirth: "05/02/2010", class: "Class 4", section: "B", gender: "Female", category: "Manual Entry", mobileNumber: "5544332211" },
        { id: 9, admissionNo: "1009", rollNo: "2028", studentName: "Suresh Raina", dateOfBirth: "18/08/2011", class: "Class 5", section: "A", gender: "Male", category: "Manual Entry", mobileNumber: "4433221100" },
        { id: 10, admissionNo: "1010", rollNo: "2029", studentName: "Neha Kapoor", dateOfBirth: "28/12/2011", class: "Class 5", section: "B", gender: "Female", category: "Manual Entry", mobileNumber: "3322110099" },
    ];

    const router = useRouter();

    const handleClick = (student) => {
        localStorage.setItem('selectedStudent', JSON.stringify(student));
        router.push(`/student-cv/details/${student.admissionNo}`);
    };
    const handleNavigate = () => {
        router.push('/student-cv/cv-setting'); // ✅ updated path
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
        const trimmedClass = selectedClass.trim();
        const trimmedSection = selectedSection.trim();
        const trimmedSearch = searchTerm.trim().toLowerCase();

        // Filter students by class and section
        filteredData = students.filter((student) => {
            return (
                student.class.trim() === trimmedClass &&
                student.section.trim() === trimmedSection &&
                (
                    trimmedSearch === "" ||
                    student.studentName.toLowerCase().includes(trimmedSearch) ||
                    student.admissionNo.includes(trimmedSearch)
                )
            );
        });

        // Sort if sortConfig.key is present
        if (sortConfig.key) {
            sortedData = [...filteredData].sort((a, b) => {
                const aVal = a[sortConfig.key];
                const bVal = b[sortConfig.key];

                if (typeof aVal === "string") {
                    return sortConfig.direction === "asc"
                        ? aVal.localeCompare(bVal)
                        : bVal.localeCompare(aVal);
                }

                if (typeof aVal === "number") {
                    return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
                }

                return 0;
            });
        } else {
            sortedData = filteredData;
        }
    }


    return (
        <div className="p-4 bg-white mt-6">
            <div className='flex justify-between border-b pb-2'>
                <div><h1 className="text-xl">Select Criteria</h1></div>
                <div className="flex justify-end items-end ">
                    <button type="button"
                        onClick={handleNavigate} className="btn btn-primary bg-blue-500 text-white p-1 px-2 rounded focus:ring-0 focus:outline-none flex items-center gap-1"

                    >
                        Setting
                    </button>
                </div>
            </div>

            <form onSubmit={handleSearch} className="mt-4">
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block mb-1 py-2">Class <span className="text-red-500">*</span></label>
                        <select
                            value={selectedClass}
                            onChange={(e) => {
                                setSelectedClass(e.target.value);
                                setSelectedSection("");
                                setSearchClicked(false);
                            }}
                            className="bg-gray-50 border py-1 border-gray-300 text-gray-900 text-sm block w-full p-2.5 rounded-none focus:outline-none focus:ring-0"
                        >
                            <option value="">Select</option>
                            {[1, 2, 3, 4, 5].map(n => (
                                <option key={n} value={`Class ${n}`}>{`Class ${n}`}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-1">
                        <label className="block mb-1 py-2">Section <span className="text-red-500">*</span></label>
                        <select
                            value={selectedSection}
                            onChange={(e) => {
                                setSelectedSection(e.target.value);
                                setSearchClicked(false);
                            }}
                            disabled={!selectedClass}
                            className="bg-gray-50 border py-1 border-gray-300 text-gray-900 text-sm block w-full p-2.5 mb-4 rounded-none focus:outline-none focus:ring-0"
                        >
                            <option value="">Select</option>
                            {["A", "B", "C", "D"].map(sec => <option key={sec} value={sec}>{sec}</option>)}
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
                <div className="bg-white mt-2">
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

                    <table className="w-full mt-4 border-t text-sm text-left">
                        <thead>
                            <tr>
                                {["admissionNo", "studentName", "dateOfBirth", "gender", "category", "mobileNumber"].map((key) => (
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
                            {sortedData.map((student) => (
                                <tr key={student.admissionNo} className="border-t hover:bg-gray-200 mx-2">
                                    <td className="p-2">{student.admissionNo}</td>
                                    <td className="p-2 text-blue-400">{student.studentName}</td>
                                    <td className="p-2">{student.dateOfBirth}</td>
                                    <td className="p-2">{student.gender}</td>
                                    <td className="p-2">{student.category}</td>
                                    <td className="p-2">{student.mobileNumber}</td>
                                    <td className="p-2 text-right">
                                        <button
                                            className="text-blue-500"
                                            onClick={() => handleClick(student)}
                                        >
                                            <IoReorderThreeSharp />
                                        </button>
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


