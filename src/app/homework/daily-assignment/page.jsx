
'use client';
import dynamic from 'next/dynamic';
import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
const DailyAssignment = () => {
    const [errors, setErrors] = useState({
        class: "",
        section: "",
        subjectGroup: "",
        subject: "",
        date: ""
    });

    const [formData, setFormData] = useState({
        class: "",
        section: "",
        subjectGroup: "",
        subject: "",
        date: "",
    });

    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [isDataFound, setIsDataFound] = useState(false);  
    const [isSubmitted, setIsSubmitted] = useState(false);  

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        // Automatically update subjectGroup when class changes
        if (name === 'class') {
            setFormData((prevState) => ({
                ...prevState,
                subjectGroup: value ? `${value} Subject Group` : "",
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let formErrors = { ...errors };

        // Validate form fields
        formErrors.class = formData.class ? "" : "The class field is required.";
        formErrors.section = formData.section ? "" : "The section field is required.";
        formErrors.subjectGroup = formData.subjectGroup ? "" : "The subject group field is required.";
        formErrors.subject = formData.subject ? "" : "The subject field is required.";
        formErrors.date = formData.date ? "" : "The date field is required.";

        setErrors(formErrors);

        if (Object.values(formErrors).every((error) => !error)) {
            setIsSearchVisible(true);
            setIsSubmitted(true);  // Set the form as submitted

            // Show "No data available" message if no data matches (since we aren't using sample data)
            setIsDataFound(false);
        }
    };

    return (
        <div className="mt-8 intro-y col-span-12 lg:col-span-6">
            <div className="intro-y box p-5 pb-20">
                <div className="flex flex-col sm:flex-row items-center p-2 border-t border-slate-200/60 dark:border-darkmode-400 border-b border-slate-200/60 dark:border-darkmode-400">
                    <h2 className="font-medium text-base mr-auto">Select Criteria</h2>
                </div>
                <div>
                    <form onSubmit={handleSubmit} className="pt-2">
                        <div className="relative">
                            <div className="grid grid-cols-5 gap-3">
                                <div>
                                    <label className="font-medium">
                                        Class <span className="text-red-600">*</span>
                                    </label>
                                    <select
                                        name="class"
                                        className="form-select mt-3 rounded-none"
                                        value={formData.class}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select</option>
                                        <option value="class 1">Class 1</option>
                                        <option value="class 2">Class 2</option>
                                        <option value="class 3">Class 3</option>
                                    </select>
                                    {errors.class && <p className="text-red-500 text-xs mt-1">{errors.class}</p>}
                                </div>

                                <div>
                                    <label className="font-medium">
                                        Section <span className="text-red-600">*</span>
                                    </label>
                                    <select
                                        name="section"
                                        className="form-select mt-3 rounded-none"
                                        value={formData.section}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select</option>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="C">C</option>
                                    </select>
                                    {errors.section && <p className="text-red-500 text-xs mt-1">{errors.section}</p>}
                                </div>

                                <div>
                                    <label className="font-medium">
                                        Subject Group <span className="text-red-600">*</span>
                                    </label>
                                    <select
                                        name="subjectGroup"
                                        className="form-select mt-3 rounded-none"
                                        value={formData.subjectGroup}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select</option>
                                        <option value={`${formData.class} Subject Group`}>{formData.class} Subject Group</option>
                                    </select>
                                    {errors.subjectGroup && <p className="text-red-500 text-xs mt-1">{errors.subjectGroup}</p>}
                                </div>

                                <div>
                                    <label className="font-medium">
                                        Subject <span className="text-red-600">*</span>
                                    </label>
                                    <select
                                        name="subject"
                                        className="form-select mt-3 rounded-none"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select</option>
                                        <option value="Math">Math</option>
                                        <option value="Science">Science</option>
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
                                        className="form-input mt-3 rounded h-9.5"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                    />
                                    {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                                </div>

                            </div>
                            <div className="absolute right-4 bottom-0 size-16 top-16">
                                <button type="submit" className="btn btn-primary mt-5 bg-blue-500 text-white p-1 px-2 rounded">
                                    <IoSearch className="h-4 w-5" /> Search
                                </button>
                            </div>
                        </div>
                    </form>

                    <div className="class pt-16">
                        <div className="flex flex-col sm:flex-row items-center pt-2 pb-2 border-b border-slate-200/60 dark:border-darkmode-400 border-t border-slate-200/60 dark:border-darkmode-400">
                            <h3 className="font-medium text-base mr-auto">Daily Assignment List</h3>
                        </div>

                        {isSearchVisible && (
                            <div className="mt-2">
                                <label className="inline-flex w-full">
                                    <input
                                        type="text"
                                        className="form-input mt-1 w-[20%] border-none focus:border-none focus:ring-0 outline-none border-0 border-b focus:outline-none"
                                        placeholder="Search..."
                                    />
                                </label>
                            </div>
                        )}

                        <div className="relative overflow-x-auto sm:rounded-lg dark:border-darkmode-400">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                <thead className="text-xs text-gray-700 border-b border-slate-200/60">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">Student Name</th>
                                        <th scope="col" className="px-4 py-3">Class</th>
                                        <th scope="col" className="px-4 py-3">Section</th>
                                        <th scope="col" className="px-4 py-3">Subject</th>
                                        <th scope="col" className="px-4 py-3">Title</th>
                                        <th scope="col" className="px-4 py-3">Submission Date</th>
                                        <th scope="col" className="px-4 py-3">Evaluation Date</th>
                                        <th scope="col" className="px-4 py-3">Evaluated By</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isSubmitted && !isDataFound && (
                                        <tr>
                                            <td colSpan="8" className="text-center px-4 py-3 hover:bg-gray-300 ">
                                                <h3 className=' text-red-400'>  No data available in table</h3>
                                                <img className="w-[20%] mx-auto" src="https://smart-school.in/ssappresource/images/addnewitem.svg" alt="" />
                                                <h3 className='font-semibold'> <IoMdArrowRoundBack />Add new record or search with different criteria.</h3>
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
export default dynamic(() => Promise.resolve(DailyAssignment), {
    ssr: false,
    loading: () => (
        <div className="mt-16 intro-y col-span-12 lg:col-span-6">
            <div className="intro-y box p-5">
                <p>Loading form...</p>
            </div>
        </div>
    ),
});
