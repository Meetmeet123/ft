
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineEmail } from "react-icons/md";

export default function PostNewMessage() {
    const [showInput, setShowInput] = useState(false);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const roles = [
        "Parent",
        "Admin",
        "Teacher",
        "Accountant",
        "Librarian",
        "Receptionist",
        "Super Admin",
    ];

    const handleCheckboxChange = (role) => {
        if (selectedRoles.includes(role)) {
            setSelectedRoles(selectedRoles.filter((r) => r !== role));
        } else {
            setSelectedRoles([...selectedRoles, role]);
        }
    };

    const [isStudent, setIsStudent] = useState(false);
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: "",
        noticeDate: "",
        publishDate: "",
        attachment: "",
        message: "",
        parent: "",
        admin: "",
        superadmin: "",
        teacher: "",
        accountant: "",
        librarian: "",
        receptionist: "",



    });

    useEffect(() => {
        const editNotice = JSON.parse(localStorage.getItem("editNotice"));
        if (editNotice) setFormData(editNotice);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const existing = JSON.parse(localStorage.getItem("notices")) || [];

        if (formData.id) {
            const updated = existing.map((n) =>
                n.id === formData.id ? formData : n
            );
            localStorage.setItem("notices", JSON.stringify(updated));
            localStorage.removeItem("editNotice");
        } else {
            const newNotice = { ...formData, id: Date.now() };
            localStorage.setItem("notices", JSON.stringify([...existing, newNotice]));
        }

        router.push("/communicate/notice-board");
    };

    return (
        <div className=" mt-6 p-6 bg-white">
            <h1 className="text-xl font-bold mb-4"> Compose New Message</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-4">
                    <div className="flex flex-col w-2/3">
                        {/* Conditionally rendered input */}
                        {showInput && (
                            <div className="">
                                <label className="text-sm text-gray-600 py-2 pb-3  ">SMS Template<span className='text-red-500'>*</span> </label>
                                <input
                                    type="text"
                                    className="border w-full text-xs py-1"
                                />
                            </div>
                        )}

                        <div>
                            <label className="block mb-1 py-2">
                                Title <span className='text-red-500'>*</span>
                            </label>
                            <input
                                name="title"
                                type="text"
                                value={formData.title}
                                onChange={handleChange}
                                className="border w-full text-xs py-1"
                                required
                            />
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block mb-1 py-2">
                                    Notice Date <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    name="noticeDate"
                                    type="date"
                                    value={formData.noticeDate}
                                    onChange={handleChange}
                                    className="border p-2 text-xs py-1 w-full"
                                    required
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block mb-1 py-2">
                                    Publish Date <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    name="publishDate"
                                    type="date"
                                    value={formData.publishDate}
                                    onChange={handleChange}
                                    className="border p-2 text-xs py-1 w-full"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <div className="py-2">
                                <label htmlFor="">Attachment <span className='text-red-500'>*</span></label>
                            </div>
                            <div>
                                <input
                                    type="file"
                                    onChange={(e) => setFormData({ ...formData, attachment: e.target.files[0] })}
                                    className="h-6 w-full text-xs border p-2 py-1 cursor-pointer"
                                />


                            </div>
                        </div>

                        <div>
                            <label className="block mb-1 py-2">
                                Message <span className='text-red-500'>*</span>
                            </label>
                            <div className="w-full mb-4 border border-gray-200  bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
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
                                <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
                                    <label htmlFor="editor" className="sr-only">
                                        Publish post
                                    </label>
                                    <textarea
                                        id="editor"
                                        rows={8}
                                        className="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                                        placeholder="Write an message..."
                                        required=""
                                        value={formData.message}
                                        onChange={handleChange}
                                        name="message"
                                    />
                                </div>
                            </div>

                        </div>


                    </div>

                    <div className="w-1/3">
                        <label htmlFor="text-bold">Message To</label>
                        <div className="max-w-md mx-auto">
                            {/* Student Checkbox */}
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600 outline-none"
                                    checked={isStudent}
                                    onChange={() => setIsStudent(!isStudent)}
                                />

                                <span className="text-gray-700 cursor-default select-none px-2 ">Student</span>
                            </div>


                        </div>

                        <div className="space-y-2 pt-2">
                            {roles.map((role) => (
                                <div key={role} className="flex items-center space-x-2">

                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600 outline-none"
                                        checked={selectedRoles.includes(role)}
                                        onChange={() => handleCheckboxChange(role)}
                                    />

                                    <span className="text-gray-700 cursor-default select-none px-2">{role}</span>
                                </div>
                            ))}

                        </div>
                        <div className="mt-4">
                            <div className="mb-2">send by</div>
                            <div className="flex">
                                <div className="flex items-center h-5">
                                    <input
                                        id="helper-checkbox"
                                        aria-describedby="helper-checkbox-text"
                                        type="checkbox"
                                        value=""
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600 outline-none"
                                    />
                                </div>
                                <div className="ms-2 text-sm">
                                    <label htmlFor="helper-checkbox" className=" text-gray-900 dark:text-gray-300">
                                        Email
                                    </label>
                                </div>
                            </div>
                            <div className="mt-2">
                                {/* Checkbox */}
                                <label className="flex items-center space-x-2 mb-2">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600 outline-none"

                                        checked={showInput}
                                        onChange={() => setShowInput(!showInput)}
                                    />
                                    <span className="text-gray-700 px-2">SMS</span>
                                </label>


                            </div>
                            {/* Conditional Sub-checkbox */}
                            {isStudent && (
                                <div className="mt-2">
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600 outline-none"
                                        />
                                        <span className="text-gray-700 cursor-default select-none px-2">Mobile App</span>
                                    </div>
                                </div>
                            )}


                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-5 border-t dark:border-gray-700">
                    <button className="btn btn-primary bg-blue-500 text-white p-1 px-2 mt-3 rounded focus:ring-0 focus:outline-none">
                        <MdOutlineEmail className="mr-1" /> Send
                    </button>
                </div>
            </form>
        </div>
    );
}
