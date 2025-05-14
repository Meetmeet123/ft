

"use client";
import { useState, useMemo } from "react";
import { VscFiles } from "react-icons/vsc";
import { FaRegFileExcel } from "react-icons/fa";
import { ImFileText2 } from "react-icons/im";
import { AiOutlineFilePdf } from "react-icons/ai";
import { PiPrinterFill } from "react-icons/pi";
import { LuColumns2 } from "react-icons/lu";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { FaSortUp, FaSortDown } from "react-icons/fa";

const cvFields = [
    "Name", "Last Name", "Gender", "Date of Birth", "Category", "Religion", "Caste", "Mobile Number", "Email",
    "Student Photo", "Blood Group", "Height", "Weight", "Father Name", "Father Phone", "Father Occupation", "Father Photo",
    "Mother Name", "Mother Phone", "Mother Occupation", "Mother Photo", "If Guardian Is", "Guardian Name",
    "Guardian Relation", "Guardian Email", "Guardian Photo", "Guardian Phone", "Guardian Occupation", "Guardian Address",
    "If Guardian Address Is Current Address", "If Permanent Address Is Current Address",
    "National Identification Number", "Local Identification Number", "Personal Details", "Parent Guardian Detail", "Medical History"
];

const cvOtherFields = [
    "Work Experience", "Education/Qalification", "Technical Skills", "Reference", "Other Details"
];

const tabs = ['CV Fields', 'CV Other Fields', 'Student Panel CV Setting'];

export default function CVSettingPage() {
    const [activeTab, setActiveTab] = useState('CV Fields');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [toggles, setToggles] = useState(() => ({
        ...Object.fromEntries(cvFields.map(field => [field, true])),
        ...Object.fromEntries(cvOtherFields.map(field => [field, true]))
    }));
    const [downloadEnabled, setDownloadEnabled] = useState('disabled');

    const handleToggle = (field) => {
        setToggles(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const handleSortToggle = () => {
        setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    };

    const filteredData = useMemo(() => {
        const sourceData = activeTab === 'CV Other Fields' ? cvOtherFields : cvFields;

        let result = sourceData.filter(field =>
            field.toLowerCase().includes(searchTerm.toLowerCase())
        );

        result.sort((a, b) => {
            if (sortOrder === 'asc') return a.localeCompare(b);
            else return b.localeCompare(a);
        });

        return result;
    }, [searchTerm, sortOrder, activeTab]);

    return (
        <div className="p-6 bg-white">
            <h1 className="text-2xl font-bold mb-4">CV Setting</h1>

            {/* Tabs */}
            <div className="flex border-b mb-4">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-3 py-2 text-sm border-b-2 transition-all duration-200 ${activeTab === tab
                            ? 'border-orange-500 text-orange-600 font-medium'
                            : 'border-transparent text-gray-600 hover:text-orange-600'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Student Panel CV Setting */}
            {activeTab === 'Student Panel CV Setting' ? (
                <div>
                    <div className="mt-6 flex gap-4 border-b pb-2">
                        <label className="block font-medium mb-2">Enable Download</label>
                        <div className="flex items-center gap-6 mb-4 ">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="download"
                                    value="disabled"
                                    checked={downloadEnabled === 'disabled'}
                                    onChange={() => setDownloadEnabled('disabled')}
                                    className="form-radio text-orange-500 focus:outline-none focus:ring-0
"
                                />
                                <span className="ml-2 text-sm">Disabled</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="download"
                                    value="enabled"
                                    checked={downloadEnabled === 'enabled'}
                                    onChange={() => setDownloadEnabled('enabled')}
                                    className="form-radio text-orange-500 focus:outline-none focus:ring-0
"
                                />
                                <span className="ml-2 text-sm">Enabled</span>
                            </label>
                        </div>
                    </div>
                    <div className="flex justify-end items-end mt-2 ">
                        <button type="submit" className="btn btn-primary bg-blue-500 text-white p-1 px-2 rounded focus:ring-0 focus:outline-none flex items-center gap-1">
                            Save
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    {/* Search & Icons */}
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

                    {/* Table */}
                    <table className="min-w-full table-auto mt-4">
                        <thead>
                            <tr className="bg-gray-100 border-b">
                                <th
                                    onClick={handleSortToggle}
                                    className="px-4 py-2 text-left cursor-pointer select-none flex items-center gap-1"
                                >
                                    Name
                                    {sortOrder === 'asc' ? <FaSortUp className="text-xs" /> : <FaSortDown className="text-xs" />}
                                </th>
                                <th className="px-4 py-2 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((field, index) => (
                                <tr key={index} className="hover:bg-gray-50 border-b">
                                    <td className="px-4 py-2">{field}</td>
                                    <td className="px-4 py-2 text-right">
                                        <div className="flex justify-end">
                                            <label className="inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={toggles[field]}
                                                    onChange={() => handleToggle(field)}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-9 h-5 bg-gray-300 peer-checked:bg-green-500 rounded-full relative transition-all">
                                                    <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full peer-checked:translate-x-4 transition-all"></div>
                                                </div>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredData.length === 0 && (
                                <tr className="border-b">
                                    <td colSpan={2} className="text-center py-4 text-gray-500">No results found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Records Info */}
                    <div className="flex justify-between mt-4">
                        <p className="text-xs">
                            Records: 1 to {filteredData.length} of {filteredData.length}
                        </p>
                        <div className="flex items-center space-x-1">
                            <button className="text-xs p-1 w-6 h-6 rounded hover:bg-gray-200"><IoIosArrowBack /></button>
                            <button className="text-xs p-1 w-6 h-6 rounded bg-gray-200">1</button>
                            <button className="text-xs p-1 w-6 h-6 rounded hover:bg-gray-200"><IoIosArrowForward /></button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
