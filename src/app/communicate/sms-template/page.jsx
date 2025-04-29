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
import { RxCross2 } from "react-icons/rx";

const initialData = [
    {
        id: 1,
        title: 'Republic Day Celebration',
        message: 'Republic Day is the day when the Republic of India marks and celebrates the date...',

    },
    {
        id: 2,
        title: 'Dussehra Celebration',
        message: 'The fee notification Dasara, also known as Dussehra or Vijayadashami, is a Hindu festival that celebrates the victory of good over evil.',

    },
    {
        id: 3,
        title: 'Children’s day Celebration',
        message: 'Children’s day on the 14th November, 2024, with great festive fervour, to commemorate the 131st birth anniversary of Pandit Jawaharlal Nehru...',

    },
    {
        id: 4,
        title: 'Christmas Celebration',
        message: 'Wishing you a merry little Christmas and a happy New Year! We love you more than all the presents on Santa’s sleigh.',

    },
    {
        id: 5,
        title: 'Online Classes',
        message: 'Be very punctual in log in time, screen off time, activity time table etc...',

    },
    {
        id: 6,
        title: 'Holi Celebration Notice',
        message: 'The colors and special Holi food items will be organized by the school itself...',

    },
    {
        id: 7,
        title: "New Academic admission start (2025-26)",
        message: 'NEW ADMISSIONS FOR THE NEXT SESSION 2025-26 ARE OPEN FROM CLASSES NURSERY TO CLASS- VIII FROM 1ST APRIL 2025.',

    }
];

export default function SMSTemplate() {
    const [data, setData] = useState(initialData);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'asc' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ title: '', message: '' });
    const [editIndex, setEditIndex] = useState(null);
    const now = new Date().toLocaleString();

    const handleSubmit = (e) => {
        e.preventDefault();
        const now = new Date().toLocaleString();

        const newEntry = {
            id: editIndex !== null ? editIndex : Date.now(), // Preserve ID if editing
            ...formData,
            date: now,

        };

        if (editIndex !== null) {
            // ✅ Editing: find item by `id` and update it
            const updatedData = data.map(item =>
                item.id === editIndex ? { ...item, ...newEntry } : item
            );
            setData(updatedData);
        } else {
            // ✅ Adding: Add new data at top
            setData([newEntry, ...data]);
        }

        // Reset form
        setIsModalOpen(false);
        setFormData({ title: '', message: '' });
        setEditIndex(null);
    };

    const handleEdit = (id) => {
        const item = data.find((item) => item.id === id); // Find item by `id`
        if (item) {
            setFormData({ title: item.title, message: item.message });
            setEditIndex(id); // Store the `id` of the item being edited
            setIsModalOpen(true);
        }
    };



    const handleDelete = (id) => {
        const newData = data.filter((item) => item.id !== id);
        setData(newData);
    };

    const sortedData = [...data]
        .filter(item =>
            item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.message?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            const aVal = a[sortConfig.key];
            const bVal = b[sortConfig.key];

            if (sortConfig.key === 'date') {
                return sortConfig.direction === 'asc'
                    ? new Date(aVal) - new Date(bVal)
                    : new Date(bVal) - new Date(aVal);
            }

            return sortConfig.direction === 'asc'
                ? aVal.localeCompare(bVal)
                : bVal.localeCompare(aVal);
        });

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
        setSortConfig({ key, direction });
    };

    const renderSortIcon = () => <IoMdArrowDropdown className="text-gray-600" />;
    const renderCheckIcon = (value) => value ? <FiCheckSquare className="text-black-600" /> : null;

    return (
        <div className="p-2 bg-white mt-2 shadow-lg ">
            <div className='flex justify-between border-b pb-2'>
                <h2 className="text-xl mb-2"> SMS Template List</h2>
                <button
                    onClick={() => {
                        setIsModalOpen(true);
                        setEditIndex(null);
                        setFormData({ title: '', message: '' });
                    }}
                    className="btn btn-primary bg-blue-500 text-white p-1 px-2 rounded focus:ring-0 flex items-center gap-1"
                >
                    <MdAdd className="text-white text-sm" /> Add
                </button>
            </div>
            {isModalOpen && (
                <form onSubmit={handleSubmit}>
                    <div className="fixed inset-0 z-50 flex justify-center items-center bg-[rgba(0,0,0,0.4)]">
                        <div className="relative w-[900px] max-h-screen overflow-auto p-4 mt-14">
                            <div className="bg-white shadow-sm">
                                {/* Modal Header */}
                                <div className="flex items-center justify-between p-4 border-b">
                                    <h3 className="text-xl text-gray-900">
                                        {editIndex !== null ? 'Edit Email Template' : 'Add SMS Template'}
                                    </h3>
                                    <button
                                        onClick={() => {
                                            setIsModalOpen(false);
                                            setFormData({ title: '', message: '' });
                                            setEditIndex(null);
                                        }}
                                        className="text-gray-400 hover:bg-gray-200 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
                                        type="button"
                                    >
                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Modal Body */}
                                <div className="p-4 space-y-2 overflow-auto">
                                    <div>
                                        <label className="block py-1">Title <span className='text-red-500'>*</span></label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="border w-full text-xs py-1 focus:outline-none focus:ring-0 focus:border-none"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block py-2">Message <span className='text-red-500'>*</span></label>
                                        <textarea
                                            rows={6}
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="block w-full text-sm text-gray-800 border focus:ring-0"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Modal Footer */}
                                <div className="flex items-center p-4 border-t justify-end">
                                    <button type="submit" className="btn btn-primary bg-blue-500 text-white p-1 px-2 rounded focus:ring-0 focus:outline-none flex items-center gap-1">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
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

            <table className="w-full text-sm text-left border-b mt-2">
                <thead>
                    <tr>
                        {['title', 'message'].map((key) => (
                            <th
                                key={key}
                                className="font-medium cursor-pointer"
                                onClick={() => requestSort(key)}
                            >
                                <div className="gap-1 capitalize flex pb-2">
                                    {key}
                                    {renderSortIcon()}
                                </div>
                            </th>
                        ))}
                        <th className="font-medium text-right pr-4">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((item) => (
                        <tr key={item.id} className="border-t hover:bg-gray-200">
                            <td className="py-2 font-medium text-gray-900 w-[200px]">{item.title}</td>
                            <td className="py-2 text-gray-700 w-[900px] whitespace-pre-wrap break-words">{item.message}</td>
                            <td className="py-2 text-right w-[100px]">
                                <div className="flex justify-end gap-1">
                                    <div className="cursor-pointer p-1 bg-white text-sm font-bold" onClick={() => handleEdit(item.id)}><MdEdit /></div>
                                    <div className="cursor-pointer p-1 bg-white text-sm font-bold mr-2" onClick={() => handleDelete(item.id)}><RxCross2 /></div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>


            </table>

            {data.length > 0 && (
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
    );
}
