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
import { MdEdit, MdAdd } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoSearch } from "react-icons/io5";

const initialData = [
    {
        id: 1,
        fromDate: "05/10/2025",
        toDate: "05/20/2025",
        type: "Vacation",
        description: "School Vacation Notice. Dear Parents, It's vacation time! Time to refresh yourself and visit new places. At the same time, we want our students to learn and explore more. So here we have fun filled holiday homework. Please take a printout of the homework sheets and follow the instructions. Please take care of the neatness of work.",
        createdBy: "Joe Black (9000)",
        frontSite: true,
    },
    {
        id: 2,
        fromDate: "05/08/2025",
        toDate: "05/08/2025",
        type: "Vacation",
        description: "238",
        createdBy: "Joe Black (9000)",
        frontSite: true,
    },
    {
        id: 3,
        fromDate: "05/15/2025",
        toDate: "05/15/2025",
        type: "Holiday",
        description: "Public holiday on account of Buddha Purnima.",
        createdBy: "Admin (1001)",
        frontSite: true,
    },
    {
        id: 4,
        fromDate: "05/12/2025",
        toDate: "05/14/2025",
        type: "Activity",
        description: "Science Exhibition Week. Students must prepare projects on renewable energy.",
        createdBy: "Joe Black (9000)",
        frontSite: true,
    },
    {
        id: 5,
        fromDate: "05/09/2025",
        toDate: "05/09/2025",
        type: "Holiday",
        description: "School closed due to maintenance.",
        createdBy: "Admin (1001)",
        frontSite: false,
    },
    {
        id: 6,
        fromDate: "05/22/2025",
        toDate: "05/24/2025",
        type: "Vacation",
        description: "Summer break extended due to heatwave alert.",
        createdBy: "Principal Office",
        frontSite: true,
    },
    {
        id: 7,
        fromDate: "05/18/2025",
        toDate: "05/18/2025",
        type: "Activity",
        description: "Inter-house sports day. All students must participate in uniforms.",
        createdBy: "Joe Black (9000)",
        frontSite: true,
    },
    {
        id: 8,
        fromDate: "05/19/2025",
        toDate: "05/21/2025",
        type: "Holiday",
        description: "Festival break for Eid celebrations.",
        createdBy: "Admin (1001)",
        frontSite: true,
    },
    {
        id: 9,
        fromDate: "05/25/2025",
        toDate: "05/27/2025",
        type: "Vacation",
        description: "School-wide summer vacation continues. Stay safe and hydrated.",
        createdBy: "Joe Black (9000)",
        frontSite: true,
    },
    {
        id: 10,
        fromDate: "05/28/2025",
        toDate: "05/28/2025",
        type: "Activity",
        description: "Parent-Teacher Meeting for all grades.",
        createdBy: "Principal Office",
        frontSite: false,
    },
];

export default function AnnualCalendar() {
    const [data, setData] = useState(initialData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        frontSite: false,
        type: '',
        description: '',
        fromDate: '',
        toDate: '',
        createdBy: '',

    });

    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
    const [editId, setEditId] = useState(null);
    const [selectedType, setSelectedType] = useState("");
    const [searchClicked, setSearchClicked] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if (selectedType) {
            setSearchClicked(true);
            setSearchTerm('');
        } else {
            alert("Please select Type.");
        }
    };

    const handleReset = () => {
        setSelectedType("");
        setSearchClicked(false);
        setSearchTerm("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editId !== null) {
            const updatedData = data.map(item =>
                item.id === editId ? { ...formData, id: editId } : item
            );
            setData(updatedData);
        } else {
            const newEntry = {
                ...formData,
                id: Date.now()
            };
            setData([newEntry, ...data]);
        }
        setIsModalOpen(false);
        setFormData({
            type: '',
            description: '',
            fromDate: '',
            toDate: '',
            createdBy: '',
            frontSite: false
        });
        setEditId(null);
    };

    const handleEdit = (id) => {
        const item = data.find(entry => entry.id === id);

        // Convert MM/DD/YYYY to YYYY-MM-DD format for date inputs
        const convertToInputFormat = (dateStr) => {
            if (!dateStr) return '';
            const [month, day, year] = dateStr.split('/');
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        };

        setFormData({
            type: item.type || '',
            description: item.description || '',
            fromDate: convertToInputFormat(item.fromDate),
            toDate: convertToInputFormat(item.toDate),
            createdBy: item.createdBy || '',
            frontSite: item.frontSite || false
        });
        setEditId(id);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        const newData = data.filter(item => item.id !== id);
        setData(newData);
    };

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedData = [...data].sort((a, b) => {
        if (sortConfig.key === 'Date') {
            const aDate = new Date(a.fromDate);
            const bDate = new Date(b.fromDate);
            return sortConfig.direction === 'asc' ? aDate - bDate : bDate - aDate;
        }
        return 0;
    });

    const filteredData = searchClicked
        ? sortedData.filter(item => item.type === selectedType)
        : sortedData.filter(item =>
            item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.createdBy.toLowerCase().includes(searchTerm.toLowerCase())
        );


    const renderSortIcon = () => <IoMdArrowDropdown className="text-gray-600" />;
    const renderCheckIcon = (value) => value ? <FiCheckSquare className="text-black-600" /> : null;

    return (
        <div className="p-2 bg-white mt-2 shadow-lg">
            <div className="justify-between items-center border-b pb-2 mb-4">
                <div className='flex justify-between border-b pb-2'>
                    <h1 className="text-xl">Annual Calendar</h1>
                    <div>
                        <button
                            onClick={() => {
                                setIsModalOpen(true);
                                setEditId(null);
                                setFormData({
                                    type: '',
                                    description: '',
                                    fromDate: '',
                                    toDate: '',
                                    createdBy: '',
                                    frontSite: false
                                });
                            }}
                            className="btn btn-primary bg-blue-500 text-white p-1 px-2 rounded focus:ring-0 flex items-center gap-1"
                        >
                            <MdAdd className="text-white text-sm" /> Add
                        </button>
                    </div>
                </div>
                <form onSubmit={handleSearch} className="mt-4">
                    <div className="flex gap-4 w-1/2">
                        <div className="flex-1">
                            <label className="block mb-1 py-2">
                                Type <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={selectedType}
                                onChange={(e) => {
                                    setSelectedType(e.target.value);
                                    setSearchClicked(false);
                                }}
                                className="bg-gray-50 border py-1 border-gray-300 text-gray-900 text-sm block w-full p-2.5 rounded-none focus:outline-none focus:ring-0 focus:border-none"
                            >
                                <option value="">Select</option>
                                <option value="Holiday">Holiday</option>
                                <option value="Activity">Activity</option>
                                <option value="Vacation">Vacation</option>
                            </select>
                        </div>
                        <div className="flex justify-end items-end gap-2">
                            <button
                                type="submit"
                                className="btn btn-primary bg-blue-500 text-white p-1 px-2 rounded focus:ring-0 focus:outline-none flex items-center gap-1"
                            >
                                <IoSearch />Search
                            </button>
                        </div>
                    </div>
                </form>
                <div className='flex justify-between items-end gap-2 pt-2'>
                    <div>
                        <h2 className="text-xl">Calendar List</h2>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-sm">

                    <form

                        onSubmit={handleSubmit}
                        className="bg-white p-6 rounded shadow-lg w-full max-w-xl"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl text-gray-900">
                                {editId !== null ? 'Edit Holiday' : 'Add Holiday'}
                            </h3>
                            <button
                                onClick={() => {
                                    setIsModalOpen(false);
                                    setFormData({
                                        type: '',
                                        description: '',
                                        fromDate: '',
                                        toDate: '',
                                        createdBy: '',
                                        frontSite: false
                                    });
                                    setEditId(null);
                                }}
                                className="text-gray-400 hover:bg-gray-200 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
                                type="button"
                            >
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 14 14">
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                            </button>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Type <span className="text-red-500">*</span></label>
                            <div className="flex gap-2">
                                {['Holiday', 'Vacation', 'Activity'].map((t) => (
                                    <button
                                        key={t}
                                        type="button"
                                        className={`py-1 px-4 border rounded text-sm ${formData.type === t ? '!bg-red-100 text-red-500' : 'bg-white'}`}
                                        onClick={() => setFormData({ ...formData, type: t })}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">From Date<span className="text-red-500">*</span></label>
                                <input
                                    type="date"
                                    value={formData.fromDate}
                                    onChange={(e) => setFormData({ ...formData, fromDate: e.target.value })}
                                    className="w-full text-xs border py-1 px-2 focus:outline-none focus:ring-0"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">To Date<span className="text-red-500">*</span></label>
                                <input
                                    type="date"
                                    value={formData.toDate}
                                    onChange={(e) => setFormData({ ...formData, toDate: e.target.value })}
                                    className="w-full text-xs border py-1 px-2 focus:outline-none focus:ring-0"
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Description <span className="text-red-500">*</span></label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full text-xs border py-1 px-2 focus:outline-none focus:ring-0"
                                rows={4}
                                required
                            />
                        </div>


                        <div className="flex items-center justify-between mt-6">
                            <div className="flex items-center gap-2">
                                <label htmlFor="frontSiteToggle" className="text-sm">Front Site</label>

                                <div
                                    onClick={() => setFormData(prev => ({ ...prev, frontSite: !prev.frontSite }))}
                                    className={`relative w-11 h-6 cursor-pointer rounded-full transition-colors duration-300 
      ${formData.frontSite ? 'bg-green-500' : 'bg-gray-300'}`}
                                >
                                    <div
                                        className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform duration-300
        ${formData.frontSite ? 'translate-x-5' : 'translate-x-0'}`}
                                    ></div>
                                </div>
                            </div>




                            <button
                                type="submit"
                                className="btn btn-primary bg-blue-500 text-white p-1 px-2 rounded focus:ring-0 focus:outline-none flex items-center gap-1"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            )}

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
            <table className="w-full table-auto text-sm text-left">
                <thead className="">
                    <tr>
                        {['Date', 'Type', 'Description', 'Created By', 'Front Site'].map((key) => (
                            <th
                                key={key}
                                className="font-medium cursor-pointer px-4 py-2"
                                onClick={() => requestSort(key)}
                            >
                                <div className="gap-1 capitalize flex items-center">
                                    {key}
                                    {renderSortIcon()}
                                </div>
                            </th>
                        ))}
                        <th className="font-medium text-right pr-4">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center px-4 py-3 hover:bg-gray-200 w-full">
                                <h3 className="text-red-400">No data available in table</h3>
                                <img
                                    className="w-[20%] mx-auto"
                                    src="https://smart-school.in/ssappresource/images/addnewitem.svg"
                                    alt="No Data"
                                />
                                <h3 className="font-semibold">Add new record or search with different criteria.</h3>
                            </td>
                        </tr>
                    ) : (
                        filteredData.map((item) => (
                            <tr key={item.id} className="border-t hover:bg-gray-100">
                                <td className="px-2 py-2">{`${item.fromDate} To ${item.toDate}`}</td>
                                <td className="px-2 py-2">{item.type}</td>
                                <td className="px-2 py-2">{item.description}</td>
                                <td className="px-2 py-2">Joe Black (9000)</td>
                                <td className="px-2 py-2">{item.frontSite ? 'Yes' : 'No'}</td>
                                <td className="px-2 py-2 flex gap-1 justify-end pr-4">
                                    <button onClick={() => handleEdit(item.id)} className="text-blue-500"><MdEdit /></button>
                                    <button onClick={() => handleDelete(item.id)}><MdDelete /></button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {filteredData.length > 0 && (
                <div className="flex justify-between mt-4">
                    <p className="text-xs">Records: 1 to {filteredData.length} of {filteredData.length}</p>
                    <div className="flex items-center space-x-1">
                        <button className="text-xs p-1 w-6 h-6 rounded hover:bg-gray-200"><IoIosArrowBack /></button>
                        <button className="text-xs p-1 w-6 h-6 rounded bg-gray-200">1</button>
                        <button className="text-xs p-1 w-6 h-6 rounded hover:bg-gray-200"><IoIosArrowForward /></button>
                    </div>
                </div>
            )}
        </div>
    );
}