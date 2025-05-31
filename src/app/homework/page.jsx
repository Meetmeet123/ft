'use client';
import React, { useEffect,useState }  from "react";
import dynamic from 'next/dynamic';
import { IoSearch } from "react-icons/io5";
import { MdOutlineAdd } from "react-icons/md";
import { HiBars3 } from "react-icons/hi2";
import { MdModeEdit } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
const Addhomework = () => {
    const [submittedData, setSubmittedData] = useState([]);
    const [selectedHomework, setSelectedHomework] = useState('upcoming'); // Active tab (initially set to 'upcoming')
    const [formData, setFormData] = useState({
        class: "",
        section: "",
        subjectGroup: "",
        subject: "",
        date: "",
        submissionDate: "",
    });
    const handleClick = (type) => {
        setSelectedHomework(type); // Updates the active tab to "upcoming" or "closed"
    };

    const [open, setOpen] = React.useState(false);
    const toggleModal = () => setOpen(!open);
    // State to track the selected fields and errors
    // const [activeTab, setActiveTab] = useState("about");
    const [errors, setErrors] = useState({
        class: "",
        section: "",
        subjectGroup: "",
        subject: "",
        date: "",
        submissionDate: "   "
    });
    const [searchQuery, setSearchQuery] = useState('');
    // Available subject groups based on class
    const subjectGroups = {
        "class 1": ["Class 1nd Subject Group"],
        "class 2": ["Class 2nd Subject Group"],
        "class 3": ["Class 3nd Subject Group"],
        "class 4": ["Class 4nd Subject Group"],
        "class 5": ["Class 5nd Subject Group"]
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate form
        let formErrors = {};
        let valid = true;

        if (!formData.class) {
            formErrors.class = "The Class field is required.";
            valid = false;
        }
        if (!formData.section) {
            formErrors.section = "The Section field is required.";
            valid = false;
        }
        if (!formData.subjectGroup) {
            formErrors.subjectGroup = "The Subject Group field is required.";
            valid = false;
        }
        if (!formData.subject) {
            formErrors.subject = "The Subject field is required.";
            valid = false;
        }

        if (valid) {
            // Always add the submitted data to 'closed' regardless of the active tab
            setSubmittedData([...submittedData, formData]);

            // Reset form fields after successful submission
            setFormData({
                class: "",
                section: "",
                subjectGroup: "",
                subject: "",
                date: "",
                submissionDate: ""
            });
            setErrors({});
        } else {
            // Set form errors if validation fails
            setErrors(formErrors);
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Clear the error when the user modifies the input
        setErrors({
            ...errors,
            [name]: ""
        });

        // Update form data
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const filteredData = submittedData.filter((data) =>
        data.class.toLowerCase().includes(searchQuery.toLowerCase()) ||
        data.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
        data.subjectGroup.toLowerCase().includes(searchQuery.toLowerCase()) ||
        data.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <div className="mt-2 intro-y col-span-12 lg:col-span-6">
            <div className="intro-y box p-5 pb-20">
                <div className="flex flex-col sm:flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                    <h2 className="font-medium text-base mr-auto">Select Criteria</h2>
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="relative">
                            <div className="grid grid-cols-4 gap-4">
                                <div>
                                    <label className="font-medium">Class *</label>
                                    <select
                                        name="class"
                                        className={`form-select mt-3 rounded-none ${errors.class ? 'border-red-500' : ''}`}
                                        value={formData.class}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select</option>
                                        <option value="class 1">Class 1</option>
                                        <option value="class 2">Class 2</option>
                                        <option value="class 3">Class 3</option>
                                        <option value="class 4">Class 4</option>
                                        <option value="class 5">Class 5</option>
                                    </select>
                                    {errors.class && <p className="text-red-500 text-xs mt-1">{errors.class}</p>}
                                </div>

                                <div>
                                    <label className="font-medium">Section *</label>
                                    <select
                                        name="section"
                                        className={`form-select mt-3 rounded-none ${errors.section ? 'border-red-500' : ''}`}
                                        value={formData.section}
                                        onChange={handleChange}
                                        disabled={!formData.class} // Disable until class is selected
                                    >
                                        <option value="">Select</option>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="C">C</option>
                                        <option value="D">D</option>
                                    </select>
                                    {errors.section && <p className="text-red-500 text-xs mt-1">{errors.section}</p>}
                                </div>

                                <div>
                                    <label className="font-medium">Subject Group *</label>
                                    <select
                                        name="subjectGroup"
                                        className={`form-select mt-3 rounded-none ${errors.subjectGroup ? 'border-red-500' : ''}`}
                                        value={formData.subjectGroup}
                                        onChange={handleChange}
                                        disabled={!formData.section} // Disable until section is selected
                                    >
                                        <option value="">Select</option>
                                        {formData.class && subjectGroups[formData.class].map((group, idx) => (
                                            <option key={idx} value={group}>{group}</option>
                                        ))}
                                    </select>
                                    {errors.subjectGroup && <p className="text-red-500 text-xs mt-1">{errors.subjectGroup}</p>}
                                </div>

                                <div>
                                    <label className="font-medium">Subject *</label>
                                    <select
                                        name="subject"
                                        className={`form-select mt-3 rounded-none ${errors.subject ? 'border-red-500' : ''}`}
                                        value={formData.subject}
                                        onChange={handleChange}
                                        disabled={!formData.subjectGroup} // Disable until subject group is selected
                                    >
                                        <option value="">Select</option>
                                        <option value="Hindi">Hindi</option>
                                        <option value="English">English</option>
                                        <option value="Computer">Computer</option>
                                    </select>
                                    {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                                </div>
                            </div>
                            <div className="absolute right-4 bottom-0 size-16 top-16">
                                <button type="submit" className="btn btn-primary mt-5 bg-blue-500 text-white p-1 px-2 rounded">
                                    <IoSearch className="h-4 w-5" /> Search
                                </button>
                            </div>
                        </div>
                    </form>

                    <div className="pt-16">
                        <div>
                            <div className="flex flex-col sm:flex-row items-center pt-2 pb-2 border-b border-slate-200/60 dark:border-darkmode-400 border-t border-slate-200/60 dark:border-darkmode-400">
                                <h3 className="font-medium text-base mr-auto">Homework List</h3>

                                <div>
                                    <button type="submit" onClick={toggleModal} className="btn btn-primary bg-blue-500 text-white p-1 px-2 rounded">
                                        <MdOutlineAdd className="h-4 w-5" /> Add
                                    </button>
                                </div>
                            </div>
                            <div>

                                <nav className="flex flex-row border-b border-slate-200/60 dark:border-darkmode-400 items-center m-2">
                                    <ul className="flex flex-row gap-1">
                                        <li
                                            style={{ borderRight: 'none', contain: 'none' }}
                                            onClick={() => handleClick("upcoming")}
                                            className={`cursor-pointer ${selectedHomework === "upcoming" ? "font-bold bg-gray-300 rounded p-2 border-none" : "p-2"}`}
                                        >
                                            <a href="#" className="hover:border-r-0 active:border-r-0">Upcoming Homework</a>
                                        </li>
                                        <li
                                            style={{ borderRight: 'none', contain: 'none' }}
                                            onClick={() => handleClick("closed")}
                                            className={`cursor-pointer ${selectedHomework === "closed" ? "font-bold bg-gray-300 rounded p-2 border-b-amber-500" : "p-2"}`}
                                        >
                                            <a href="#"> Closed Homework</a>
                                        </li>
                                    </ul>
                                </nav>
                                {/* Conditionally render the checkbox and modify table header */}
                                {selectedHomework === "closed" && (
                                    <div className="mt-4">
                                        <input className="w-3 h-3 rounded-sm focus:ring-0" type="checkbox" id="homeworkCheckbox" />
                                        <label htmlFor="homeworkCheckbox" className="ml-2">
                                            Select All
                                        </label>

                                    </div>

                                )}
                                {/* Modal structure */}
                                {open && (
                                    <div className="fixed inset-0 flex justify-center bg-opacity-50 z-40">
                                        <div className="bg-white max-w-2xl p-4 rounded-lg shadow-lg">
                                            {/* Modal Header */}
                                            <div className="flex justify-between items-center">
                                                <h2 className="text-xl font-normal">Add Homework</h2>
                                                <button onClick={toggleModal} className="text-gray-500 hover:text-gray-700">
                                                    ✕
                                                </button>
                                            </div>

                                            {/* Modal Form */}
                                            <form>
                                                <div className="relative">
                                                    <div className="grid grid-cols-3 gap-4">
                                                        <div>
                                                            <label className="font-medium">Class <span className="text-red-600">*</span></label>
                                                            <select
                                                                name="class"
                                                                className={`form-select mt-1 rounded-none ${errors.class ? 'border-red-500' : ''}`}
                                                                value={formData.class}
                                                                onChange={handleChange}
                                                            >
                                                                <option value="">Select</option>
                                                                <option value="class 1">Class 1</option>
                                                                <option value="class 2">Class 2</option>
                                                                <option value="class 3">Class 3</option>
                                                                <option value="class 4">Class 4</option>
                                                                <option value="class 5">Class 5</option>
                                                            </select>
                                                            {errors.class && <p className="text-red-500 text-xs mt-1">{errors.class}</p>}
                                                        </div>

                                                        <div>
                                                            <label className="font-medium">Section <span className="text-red-600">*</span></label>
                                                            <select
                                                                name="section"
                                                                className={`form-select mt-1 rounded-none ${errors.section ? 'border-red-500' : ''}`}
                                                                value={formData.section}
                                                                onChange={handleChange}
                                                                disabled={!formData.class} // Disable until class is selected
                                                            >
                                                                <option value="">Select</option>
                                                                <option value="A">A</option>
                                                                <option value="B">B</option>
                                                                <option value="C">C</option>
                                                                <option value="D">D</option>
                                                            </select>
                                                            {errors.section && <p className="text-red-500 text-xs mt-1">{errors.section}</p>}
                                                        </div>

                                                        <div>
                                                            <label className="font-medium">Subject Group <span className="text-red-600">*</span></label>
                                                            <select
                                                                name="subjectGroup"
                                                                className={`form-select mt-1 rounded-none ${errors.subjectGroup ? 'border-red-500' : ''}`}
                                                                value={formData.subjectGroup}
                                                                onChange={handleChange}
                                                                disabled={!formData.section} // Disable until section is selected
                                                            >
                                                                <option value="">Select</option>
                                                                {formData.class && subjectGroups[formData.class].map((group, idx) => (
                                                                    <option key={idx} value={group}>{group}</option>
                                                                ))}
                                                            </select>
                                                            {errors.subjectGroup && <p className="text-red-500 text-xs mt-1">{errors.subjectGroup}</p>}
                                                        </div>

                                                        <div>
                                                            <label className="font-medium">Subject <span className="text-red-600">*</span></label>
                                                            <select
                                                                name="subject"
                                                                className={`form-select mt-1 rounded-none ${errors.subject ? 'border-red-500' : ''}`}
                                                                value={formData.subject}
                                                                onChange={handleChange}
                                                                disabled={!formData.subjectGroup} // Disable until subject group is selected
                                                            >
                                                                <option value="">Select</option>
                                                                <option value="Hindi">Hindi</option>
                                                                <option value="English">English</option>
                                                                <option value="Computer">Computer</option>
                                                            </select>
                                                            {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                                                        </div>
                                                        <div>
                                                            <label className="font-medium">
                                                                Date <span className="text-red-600">*</span>
                                                            </label>
                                                            <input
                                                                type="date"
                                                                name="date"
                                                                className="form-input mt-1 rounded h-9.5 w-50"
                                                                value={formData.date}
                                                                onChange={handleChange}
                                                            />
                                                            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                                                        </div>
                                                        <div>
                                                            <label className="font-medium">
                                                                Submission Date  <span className="text-red-600">*</span>
                                                            </label>
                                                            <input
                                                                type="date"
                                                                name="date"
                                                                className="form-input mt-1 rounded h-9.5 w-50 "
                                                                value={formData.date}
                                                                onChange={handleChange}
                                                            />
                                                            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                                                        </div>
                                                        <div>
                                                            <label htmlFor="" className="font-medium">
                                                                Max Marks <span className="text-red-600">*</span>
                                                            </label>
                                                            <input type="text" className="form-input mt-1 rounded h-9 w-50" />

                                                        </div>
                                                        <div>
                                                            <label htmlFor="" className="font-medium">

                                                                Attach Document
                                                                <span className="text-red-600"> *</span>
                                                            </label>
                                                            <input type="file" className="form-input mt-1 rounded h-9 w-50" />

                                                        </div>
                                                    </div>
                                                    <div className="mt-2">
                                                        <label htmlFor="" className="font-medium ">Description <span className="text-red-600"> *</span> </label>
                                                    </div>
                                                    <div className="w-full border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600">

                                                        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 dark:border-gray-600 border-gray-200">
                                                            <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse dark:divide-gray-600">
                                                                <div className="flex items-center space-x-1 rtl:space-x-reverse sm:pe-4">
                                                                    <button
                                                                        type="button"
                                                                        className="p-2 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                                                                    >
                                                                        <svg
                                                                            className="w-4 h-4"
                                                                            aria-hidden="true"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            fill="none"
                                                                            viewBox="0 0 12 20"
                                                                        >
                                                                            <path
                                                                                stroke="currentColor"
                                                                                strokeLinejoin="round"
                                                                                strokeWidth={2}
                                                                                d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"
                                                                            />
                                                                        </svg>
                                                                        <span className="sr-only">Attach file</span>
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className="p-2 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                                                                    >
                                                                        <svg
                                                                            className="w-4 h-4"
                                                                            aria-hidden="true"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            fill="currentColor"
                                                                            viewBox="0 0 16 20"
                                                                        >
                                                                            <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                                                                        </svg>
                                                                        <span className="sr-only">Embed map</span>
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className="p-2 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                                                                    >
                                                                        <svg
                                                                            className="w-4 h-4"
                                                                            aria-hidden="true"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            fill="currentColor"
                                                                            viewBox="0 0 16 20"
                                                                        >
                                                                            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                                                                            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                                                                        </svg>
                                                                        <span className="sr-only">Upload image</span>
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className="p-2 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                                                                    >
                                                                        <svg
                                                                            className="w-4 h-4"
                                                                            aria-hidden="true"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            fill="currentColor"
                                                                            viewBox="0 0 16 20"
                                                                        >
                                                                            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                                                                            <path d="M14.067 0H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.933-2ZM6.709 13.809a1 1 0 1 1-1.418 1.409l-2-2.013a1 1 0 0 1 0-1.412l2-2a1 1 0 0 1 1.414 1.414L5.412 12.5l1.297 1.309Zm6-.6-2 2.013a1 1 0 1 1-1.418-1.409l1.3-1.307-1.295-1.295a1 1 0 0 1 1.414-1.414l2 2a1 1 0 0 1-.001 1.408v.004Z" />
                                                                        </svg>
                                                                        <span className="sr-only">Format code</span>
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className="p-2 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                                                                    >
                                                                        <svg
                                                                            className="w-4 h-4"
                                                                            aria-hidden="true"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            fill="currentColor"
                                                                            viewBox="0 0 20 20"
                                                                        >
                                                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM13.5 6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm-7 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm3.5 9.5A5.5 5.5 0 0 1 4.6 11h10.81A5.5 5.5 0 0 1 10 15.5Z" />
                                                                        </svg>
                                                                        <span className="sr-only">Add emoji</span>
                                                                    </button>
                                                                </div>
                                                                <div className="flex flex-wrap items-center space-x-1 rtl:space-x-reverse sm:ps-4">
                                                                    <button
                                                                        type="button"
                                                                        className="p-2 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                                                                    >
                                                                        <svg
                                                                            className="w-4 h-4"
                                                                            aria-hidden="true"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            fill="none"
                                                                            viewBox="0 0 21 18"
                                                                        >
                                                                            <path
                                                                                stroke="currentColor"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                strokeWidth={2}
                                                                                d="M9.5 3h9.563M9.5 9h9.563M9.5 15h9.563M1.5 13a2 2 0 1 1 3.321 1.5L1.5 17h5m-5-15 2-1v6m-2 0h4"
                                                                            />
                                                                        </svg>
                                                                        <span className="sr-only">Add list</span>
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className="p-2 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                                                                    >
                                                                        <svg
                                                                            className="w-4 h-4"
                                                                            aria-hidden="true"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            fill="currentColor"
                                                                            viewBox="0 0 20 20"
                                                                        >
                                                                            <path d="M18 7.5h-.423l-.452-1.09.3-.3a1.5 1.5 0 0 0 0-2.121L16.01 2.575a1.5 1.5 0 0 0-2.121 0l-.3.3-1.089-.452V2A1.5 1.5 0 0 0 11 .5H9A1.5 1.5 0 0 0 7.5 2v.423l-1.09.452-.3-.3a1.5 1.5 0 0 0-2.121 0L2.576 3.99a1.5 1.5 0 0 0 0 2.121l.3.3L2.423 7.5H2A1.5 1.5 0 0 0 .5 9v2A1.5 1.5 0 0 0 2 12.5h.423l.452 1.09-.3.3a1.5 1.5 0 0 0 0 2.121l1.415 1.413a1.5 1.5 0 0 0 2.121 0l.3-.3 1.09.452V18A1.5 1.5 0 0 0 9 19.5h2a1.5 1.5 0 0 0 1.5-1.5v-.423l1.09-.452.3.3a1.5 1.5 0 0 0 2.121 0l1.415-1.414a1.5 1.5 0 0 0 0-2.121l-.3-.3.452-1.09H18a1.5 1.5 0 0 0 1.5-1.5V9A1.5 1.5 0 0 0 18 7.5Zm-8 6a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z" />
                                                                        </svg>
                                                                        <span className="sr-only">Settings</span>
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className="p-2 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                                                                    >
                                                                        <svg
                                                                            className="w-4 h-4"
                                                                            aria-hidden="true"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            fill="currentColor"
                                                                            viewBox="0 0 20 20"
                                                                        >
                                                                            <path d="M18 2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2ZM2 18V7h6.7l.4-.409A4.309 4.309 0 0 1 15.753 7H18v11H2Z" />
                                                                            <path d="M8.139 10.411 5.289 13.3A1 1 0 0 0 5 14v2a1 1 0 0 0 1 1h2a1 1 0 0 0 .7-.288l2.886-2.851-3.447-3.45ZM14 8a2.463 2.463 0 0 0-3.484 0l-.971.983 3.468 3.468.987-.971A2.463 2.463 0 0 0 14 8Z" />
                                                                        </svg>
                                                                        <span className="sr-only">Timeline</span>
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className="p-2 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                                                                    >
                                                                        <svg
                                                                            className="w-4 h-4"
                                                                            aria-hidden="true"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            fill="currentColor"
                                                                            viewBox="0 0 20 20"
                                                                        >
                                                                            <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
                                                                            <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                                                                        </svg>
                                                                        <span className="sr-only">Download</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                data-tooltip-target="tooltip-fullscreen"
                                                                className="p-2 text-gray-500 rounded-sm cursor-pointer sm:ms-auto hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                                                            >
                                                                <svg
                                                                    className="w-4 h-4"
                                                                    aria-hidden="true"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 19 19"
                                                                >
                                                                    <path
                                                                        stroke="currentColor"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={2}
                                                                        d="M13 1h5m0 0v5m0-5-5 5M1.979 6V1H7m0 16.042H1.979V12M18 12v5.042h-5M13 12l5 5M2 1l5 5m0 6-5 5"
                                                                    />
                                                                </svg>
                                                                <span className="sr-only">Full screen</span>
                                                            </button>
                                                            <div
                                                                id="tooltip-fullscreen"
                                                                role="tooltip"
                                                                className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700"
                                                            >
                                                                Show full screen
                                                                <div className="tooltip-arrow" data-popper-arrow="" />
                                                            </div>
                                                        </div>

                                                        <div className="px-4 bg-white rounded-b-lg dark:bg-gray-800">
                                                            <label htmlFor="editor" className="sr-only">
                                                                Publish post
                                                            </label>
                                                            <textarea
                                                                id="editor"
                                                                rows={8}
                                                                className="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                                                                placeholder=""
                                                                required=""
                                                                defaultValue={""}
                                                            />
                                                        </div>
                                                    </div>
                                                    <button
                                                        type="submit"
                                                        className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                                                    >
                                                        Publish post
                                                    </button>
                                                    <div className="absolute right-0 bottom-[-40] size-16">
                                                        <button type="button" className="btn btn-primary mt-2 bg-blue-500 text-white p-1 px-2 rounded text-end">
                                                            Save
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Search Bar Above the Table */}
                            {submittedData.length > 0 && (
                                <div className=" mt-1 flex justify-between">
                                    <input
                                        type="text"
                                        placeholder="Search....."
                                        className="form-input w-[20%] h-[10%] border-none focus:border-none focus:ring-0 outline-none border-0 border-b focus:outline-none"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <button type="submit" className="btn btn-primary mt-5 bg-blue-500 text-white p-1 px-2 rounded flex justify-end">
                                        delete
                                    </button>

                                </div>
                            )}

                        </div>
                        <div className='relative overflow-x-auto sm:rounded-lg'>
                            {/* Table */}
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 mt-2 border-b border-slate-200/60 dark:border-darkmode-400">
                                <thead className='text-xs text-gray-700 border-b border-slate-200/60 dark:border-darkmode-400'>
                                    <tr>
                                        {/* <th>{activeTab === "about" ? "#" : ""}</th> */}
                                        {selectedHomework === "closed" && (
                                            <th scope="col" className="px-4 py-3">#</th>
                                        )}
                                        <th scope="col" className="px-4 py-3">Class</th>
                                        <th scope="col" className="px-4 py-3">Section</th>
                                        <th scope="col" className="px-4 py-3">Subject Group</th>
                                        <th scope="col" className="px-4 py-3">Subject</th>
                                        <th scope="col" className="px-4 py-3">Homework Date</th>
                                        <th scope="col" className="px-4 py-3">Submission Date</th>
                                        <th scope="col" className="px-4 py-3">Evaluation Date</th>
                                        <th scope="col" className="px-4 py-3">Created By</th>
                                        <th scope="col" className="px-4 py-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedHomework === "upcoming" ? (
                                        <tr>
                                            <td colSpan="10" className="text-center px-4 py-3 hover:bg-gray-300 w-full">
                                                <h3 className="text-red-400">No data available in table</h3>
                                                <img
                                                    className="w-[20%] mx-auto"
                                                    src="https://smart-school.in/ssappresource/images/addnewitem.svg"
                                                    alt="No Data"
                                                />
                                                <h3 className="font-semibold">Add new record or search with different criteria.</h3>
                                            </td>
                                        </tr>
                                    ) : submittedData.length > 0 ? (
                                        submittedData.map((data, index) => (
                                            <tr key={index}>
                                                {/* <td>{index + 1}</td> */}
                                                <td className="px-4 py-2"><input className="w-3 h-3 border-none focus:ring-0" type="checkbox" id="homeworkCheckbox" /></td>
                                                <td className="px-4 py-2">{data.class}</td>
                                                <td className="px-4 py-2">{data.section}</td>
                                                <td className="px-4 py-2">{data.subjectGroup}</td>
                                                <td className="px-4 py-2">{data.subject}</td>
                                                <td className="px-4 py-2">2025-03-01</td>
                                                <td className="px-4 py-2">2025-03-10</td>
                                                <td className="px-4 py-2">2025-03-15</td>
                                                <td className="px-4 py-2">Admin</td>
                                                <td className="px-4 py-2 flex">
                                                    <a href="#" className="font-medium hover:underline">
                                                        <HiBars3 />
                                                    </a>
                                                    <a href="#" className="font-medium">
                                                        <MdModeEdit />
                                                    </a>
                                                    <a href="#" className="font-medium">
                                                        <RxCross2 />
                                                    </a>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="10" className="text-center px-4 py-3 hover:bg-gray-300 w-full">
                                                <h3 className="text-red-400">No data available in table</h3>
                                                <img
                                                    className="w-[20%] mx-auto"
                                                    src="https://smart-school.in/ssappresource/images/addnewitem.svg"
                                                    alt="No Data"
                                                />
                                                <h3 className="font-semibold">Add new record or search with different criteria.</h3>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Export with dynamic import to prevent SSR
export default dynamic(() => Promise.resolve(Addhomework), {
    ssr: false,
    loading: () => (
        <div className="mt-16 intro-y col-span-12 lg:col-span-6">
            <div className="intro-y box p-5">
                <p>Loading form...</p>
            </div>
        </div>
    ),
});


