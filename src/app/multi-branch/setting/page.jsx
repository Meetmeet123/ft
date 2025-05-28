

"use client";
import React, { useState } from 'react';

import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { VscFiles } from "react-icons/vsc";
import { FaRegFileExcel } from "react-icons/fa";
import { ImFileText2 } from "react-icons/im";
import { AiOutlineFilePdf } from "react-icons/ai";
import { LuColumns2 } from "react-icons/lu";
import { PiPrinterFill } from "react-icons/pi";
import { IoIosArrowForward, IoIosArrowBack, IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { MdEdit, MdAdd, MdDelete } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { GiTireIronCross } from "react-icons/gi";

export default function BranchSettings() {
    const initialBranches = [
        { id: 1, name: "Mount Carmel School 1", url: "https://demo.smart-school.in/branch1/" },
        { id: 2, name: "Mount Carmel School 2", url: "https://demo.smart-school.in/branch2/" },
        { id: 3, name: "Mount Carmel School 3", url: "https://demo.smart-school.in/branch3/" }
    ];

    const [branches, setBranches] = useState(initialBranches);
    const [searchTerm, setSearchTerm] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);
    const [formData, setFormData] = useState({
        id: null,
        name: "",
        url: "",
        purchaseCode: "",
        hostname: 'localhost',
        databaseName: "",
        username: "qddemoss",
        password: "admin123"
    });
    const [editingId, setEditingId] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const filteredBranches = branches.filter(branch =>
        branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        branch.url.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedBranches = [...filteredBranches].sort((a, b) => {
        if (!sortConfig.key) return 0;
        const aVal = a[sortConfig.key].toLowerCase();
        const bVal = b[sortConfig.key].toLowerCase();
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });

    const handleSort = (key) => {
        setSortConfig(prev => {
            const direction = prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc';
            return { key, direction };
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddBranch = () => {
        setFormData({
            id: null,
            name: "",
            url: "",
            purchaseCode: "",
            hostname: "",
            databaseName: "",
            username: "",
            password: ""
        });
        setEditingId(null);
        setShowAddForm(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            setBranches(branches.map(branch =>
                branch.id === editingId ? { ...formData, id: editingId } : branch
            ));
        } else {
            const newBranch = {
                ...formData,
                id: Math.max(...branches.map(b => b.id), 0) + 1
            };
            setBranches([...branches, newBranch]);
        }
        setShowAddForm(false);
    };


    const handleEdit = (branch) => {
        // Extract number from branch name (e.g., 'Branch 2' → 2)
        const branchNumber = branch.name.match(/\d+$/)?.[0] || "";

        setFormData({
            purchaseCode: branch.purchaseCode || '',
            name: branch.name || '',
            hostname: 'localhost',
            username: 'qddemoss',
            databaseName: `qddemo1ssmb${branchNumber}`,
            password: branch.password || 'admin123',
            url: branch.url || ''
        });

        setEditingId(branch.id);
        setShowAddForm(true);
    };

    const handleDelete = (id) => {
        setBranches(branches.filter(branch => branch.id !== id));
    };

    return (
        <div className="p-2 mt-2 mx-auto bg-white">
            <div className='flex justify-between border-b'>
                <h1 className="text-2xl mb-2 ">Setting</h1>
            </div>

            <div className="flex justify-end items-end gap-2 mt-2">
                <button
                    type="submit"
                    onClick={handleAddBranch}
                    className="btn btn-primary bg-blue-500 text-white p-1 px-2 rounded focus:ring-0 focus:outline-none flex items-center gap-1"
                >
                    <MdAdd />Add New
                </button>

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

            {showAddForm ? (
                <div className="bg-white p-6 rounded-lg shadow mb-6 mt-0 ">
                    <div className='flex justify-between'>
                        <h2 className="text-xl mb-4">
                            {editingId ? "Edit Branch" : "Add New Branch"}
                        </h2>
                        <button
                            type="button"
                            onClick={() => setShowAddForm(false)}
                            className="px-4 py-2 border  rounded-lg hover:bg-gray-100"
                        >
                            <GiTireIronCross />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block font-medium mb-2">Erivato Purchase Code <span className='text-red-600'>*</span></label>
                            <input
                                type="text"
                                name="purchaseCode"
                                value={formData.purchaseCode}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded"
                                required
                            />
                        </div>

                        <h3 className="font-medium mb-2">Branch Database Detail</h3>
                        <div className="flex gap-2 pt-2">
                            <div className='w-32 flex-1'>
                                <label className="block font-medium mb-2">Branch Name  <span className='text-red-600'>*</span></label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded"
                                    required
                                />
                            </div>
                            <div className='w-32 flex-1'>
                                <label className="block font-medium mb-2">Hostname  <span className='text-red-600'>*</span></label>
                                <input
                                    type="text"
                                    name="hostname"
                                    value={formData.hostname}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded"
                                    required

                                />
                            </div>

                        </div>

                        <div className="flex gap-2 pt-2">
                            <div className='w-32 flex-1 '>
                                <label className="block font-medium mb-2">Database Name  <span className='text-red-600'>*</span></label>
                                <input
                                    type="text"
                                    name="databaseName"
                                    value={formData.databaseName}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded"
                                    required
                                />
                            </div>
                            <div className='w-32 flex-1'>
                                <label className="block font-medium mb-2">Username <span className='text-red-600'>*</span></label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded"
                                    required
                                />
                            </div>

                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-2">

                            <div className=''>
                                <label className="block font-medium mb-2">Password <span className='text-red-600'>*</span></label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 mt-2">

                            <button
                                type="submit"
                                className="!bg-black text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                            >
                                {editingId ? "Verify & Save" : " Verify & Save"}
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <>
                    <div className="bg-white rounded-lg shadow overflow-hidden mt-2">
                        <div className="grid grid-cols-12 bg-gray-100 p-4 font-medium">
                            <div
                                className="col-span-4 cursor-pointer flex items-center gap-1"
                                onClick={() => handleSort('name')}
                            >
                                Branch
                                {sortConfig.key === 'name' ? (
                                    sortConfig.direction === 'asc' ? (
                                        <IoMdArrowDropup className="text-gray-300 text-xl" />
                                    ) : (
                                        <IoMdArrowDropdown className="text-gray-300 text-xl" />
                                    )
                                ) : (
                                    <IoMdArrowDropup className="text-gray-300 text-xl" />
                                )}
                            </div>

                            <div
                                className="col-span-5 cursor-pointer flex items-center gap-1"
                                onClick={() => handleSort('url')}
                            >
                                URL
                                {sortConfig.key === 'url' ? (
                                    sortConfig.direction === 'asc' ? (
                                        <IoMdArrowDropup className="text-gray-300 text-xl" />
                                    ) : (
                                        <IoMdArrowDropdown className="text-gray-300 text-xl" />
                                    )
                                ) : (
                                    <IoMdArrowDropup className="text-gray-300 text-xl" />
                                )}
                            </div>

                            <div className="col-span-3 text-right">Actions</div>
                        </div>


                        {sortedBranches.length > 0 ? (
                            sortedBranches.map((branch, index) => (
                                <div key={branch.id} className="grid grid-cols-12 p-4 border-t hover:bg-gray-50">
                                    <div className="col-span-4">{branch.name}</div>
                                    <div className="col-span-5">
                                        <a
                                            href={branch.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline"
                                        >
                                            {branch.url}
                                        </a>
                                    </div>
                                    <div className="col-span-3 flex justify-end space-x-2">
                                        <button
                                            onClick={() => handleEdit(branch)}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <MdEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(branch.id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <MdDelete />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-4 text-center text-gray-500 hover:bg-gray-300">
                                <h3 className="text-red-400">No data available in table</h3>
                                <img
                                    className="w-[20%] mx-auto"
                                    src="https://smart-school.in/ssappresource/images/addnewitem.svg"
                                    alt="No Data"
                                />
                                <h3 className="font-semibold">Add new record or search with different criteria.</h3>
                            </div>
                        )}
                    </div>

                    <div className="mt-4 text-sm text-gray-600">
                        Records: {sortedBranches.length > 0 ? 1 : 0} to {sortedBranches.length} of {sortedBranches.length}
                    </div>

                </>
            )}
        </div>
    );
}
