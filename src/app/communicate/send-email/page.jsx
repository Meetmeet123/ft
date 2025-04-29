
"use client";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";
import React, { useState } from 'react';
import { AiTwotoneDelete } from "react-icons/ai";
import { IoSearchSharp } from "react-icons/io5";

const templates = {
    "Sports Day Event": {
        title: "Sports Day Event",
        message: "We are excited to invite you to our annual Sports Day event. Join us for a day filled with fun, games, and celebration!",
    },
    "National Republic Day": {
        title: "National Republic Day",
        message: "Let’s honor our nation and celebrate Republic Day together with pride and enthusiasm.",
    },
    "Annual Day Celebration": {
        title: "Annual Day Celebration",
        message: "You are cordially invited to the Annual Day Celebration filled with performances and awards.",
    },
    "Summer Vacation": {
        title: "Summer Vacation Announcement",
        message: "The school will remain closed from May 10 to June 20 for summer vacation. Have a great summer!",
    },
    "International Day of Yoga": {
        title: "International Day of Yoga",
        message: "Celebrate wellness with us on International Yoga Day. Let's stretch, breathe, and meditate together.",
    },
    "Idependence Day Celebration Notification": {
        title: "Independence Day Celebration",
        message: "Join us as we celebrate the spirit of freedom and patriotism this Independence Day.",
    },
    "Teachers Day Celebration": {
        title: "Teachers Day Celebration",
        message: "We express gratitude to our teachers on this special day. You are invited to the celebration.",
    },
    "Dussehra Celebration": {
        title: "Dussehra Celebration",
        message: "Celebrate the victory of good over evil with us this Dussehra. Join the festivities!",
    },
    "Children's Day": {
        title: "Children's Day Celebration",
        message: "A day full of joy, fun, and learning activities for our beloved students. Happy Children's Day!",
    },
};

export default function SendEmail() {

    const [activeTab, setActiveTab] = useState("Group");
    const tabs = ["Group", "Individual", "Class", "Today's Birthday"];
    const [selectedClass, setSelectedClass] = useState("");
    const [sendOption, setSendOption] = useState("now");
    const [scheduledDateTime, setScheduledDateTime] = useState("");
    const [attachment, setAttachment] = useState(null);
    const [selectedTemplate, setSelectedTemplate] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        message: "",
    });
    const [messageToRole, setMessageToRole] = useState("");
    const handleTemplateChange = (e) => {
        const value = e.target.value;
        setSelectedTemplate(value);
        if (templates[value]) {
            setFormData({
                title: templates[value].title,
                message: templates[value].message,
            });
        } else {
            setFormData({ title: "", message: "" });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };

    return (
        <div className="mt-6 p-6 bg-white border-t">
            <div className="border-b  flex">
                <h1 className="text-xl">Send Email</h1>
                {/* Tabs */}
                <div className="flex ml-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 text-sm font-medium focus:outline-none ${activeTab === tab
                                ? "border-b-2 border-yellow-400 bg-yellow-100 text-yellow-700"
                                : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-4 pt-2">
                    <div className="flex flex-col w-2/3">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                            Email Template
                        </label>
                        <select
                            value={selectedTemplate}
                            onChange={handleTemplateChange}
                            className="bg-gray-50 border py-1 border-gray-300 text-gray-900 text-sm focus:ring-0 focus:border-0 block w-full p-2.5"
                        >
                            <option value="">Select</option>
                            {Object.keys(templates).map((templateName) => (
                                <option key={templateName} value={templateName}>
                                    {templateName}
                                </option>
                            ))}
                        </select>

                        <div className="pt-4">
                            <label className="block mb-1">
                                Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) =>
                                    setFormData({ ...formData, title: e.target.value })
                                }
                                className="border w-full py-1 text-sm focus:ring-0 focus:border-0"

                            />
                        </div>
                        {selectedTemplate && (
                            <div className="mt-2 inline-flex items-center py-1  text-sm">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSelectedTemplate("");
                                        setFormData({ title: "", message: "" });
                                    }}
                                    className="text-gray-500 hover:text-red-500"
                                >
                                    <AiTwotoneDelete />
                                </button>
                                <span className="ml-1">
                                    {selectedTemplate.length > 8
                                        ? selectedTemplate.slice(0, 6) + "..."
                                        : selectedTemplate}
                                </span>
                            </div>
                        )}

                        {/* File Attachment Preview */}
                        {attachment && (
                            <div className="mt-2 flex items-center text-sm">

                                <button
                                    type="button"
                                    onClick={() => setAttachment(null)}
                                    className="text-gray-500 hover:text-red-500"
                                >
                                    <AiTwotoneDelete />
                                </button>
                                <span className="ml-1">
                                    {attachment.type.startsWith("image/")
                                        ? attachment.name
                                        : attachment.name.length > 10
                                            ? attachment.name.slice(0, 10) + "..."
                                            : attachment.name}
                                </span>
                            </div>
                        )}

                        <div className="pt-2">
                            <label className="block mb-1">Attachment</label>
                            <input
                                type="file"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        setAttachment(file);
                                    }
                                }}
                                className="h-8 w-full py-1 p-2 text-sm border cursor-pointer focus:border-0 focus:ring-0 focus:outline-none"
                            />
                        </div>

                        <div className="pt-4 w-full">
                            <label className="block mb-1">
                                Message <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                rows={6}
                                value={formData.message}
                                onChange={(e) =>
                                    setFormData({ ...formData, message: e.target.value })
                                }
                                className="block w-full h-100 p-2 text-sm border border-gray-300 focus:ring-0 focus:outline-none"
                                placeholder="Write a message..."

                            />
                        </div>

                    </div>

                    <div className="w-1/3">
                        <label htmlFor="text-bold">Message To <span className="text-red-500">*</span></label>

                        {activeTab === "Individual" && (
                            <div className="flex items-center gap-2 mt-2">
                                <div className="flex items-center pt-4">
                                    <div className="inline-flex items-center">
                                        <div className="w-45 bg-gray-800">
                                            <select
                                                id="countries"
                                                className="bg-gray-50 border border-r-0 border-gray-300 text-gray-900 text-sm py-1 focus:ring-0 focus:border-blue-0 block w-full h-7 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-0"
                                            >
                                                <option value="">Select</option>
                                                <option value="students">Students</option>
                                                <option value="guardians">Guardians</option>
                                                <option value="students-guardians">Students - Guardians</option>
                                                <option value="admin">Admin</option>
                                                <option value="teacher">Teacher</option>
                                                <option value="accountant">Accountant</option>
                                                <option value="librarian">Librarian</option>
                                                <option value="receptionist">Receptionist</option>
                                                <option value="super-admin">Super Admin</option>
                                            </select>
                                        </div>
                                        <input
                                            type="text"
                                            className="py-1 w-full h-7 text-xs pr-2 pl-2 border-t border-b border-r border-black focus:outline-black dark:focus:ring-0 focus:ring-0 focus:outline-none "
                                        />
                                        <button className="btn btn-primary bg-blue-500 text-white px-2 py-1 rounded focus:ring-0 focus:outline-none flex items-center gap-1">
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "Class" && (
                            <>
                                {/* CLASS SELECT DROPDOWN */}
                                <select
                                    id="class-select"
                                    value={selectedClass}
                                    onChange={(e) => setSelectedClass(e.target.value)}
                                    className="bg-gray-50 border py-1 mt-2 border-gray-300 text-gray-900 text-sm focus:border-0 block w-full p-2.5 mb-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white bg-gray-100 border-gray-300 rounded  focus:ring-0 dark:bg-gray-700 dark:border-gray-600 outline-none"
                                >
                                    <option value="">Select</option>
                                    <option value="class1">Class 1</option>
                                    <option value="class2">Class 2</option>
                                    <option value="class3">Class 3</option>
                                    <option value="class4">Class 4</option>
                                    <option value="class5">Class 5</option>
                                </select>
                            </>
                        )}

                        <div className="mt-4 bg-gray-200 p-4 shadow-md w-full h-60">
                            {activeTab === "Class" && (
                                <>
                                    {/* ALWAYS SHOW "Section Send To:" */}
                                    <p className="font-semibold mb-4">Section Send To:</p>

                                    {/* SHOW CHECKBOXES ONLY IF CLASS IS SELECTED */}
                                    {selectedClass && (
                                        <div className="p-4 border rounded-l dark:bg-gray-800 dark:text-white">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="flex flex-col gap-2">
                                                    {["A", "B", "C", "D"].map((label) => (
                                                        <label key={label} className="inline-flex items-center">
                                                            <input
                                                                type="checkbox"
                                                                className="form-checkbox mr-2 focus:outline-none focus:ring-0 focus:border-0"
                                                            />
                                                            {label}
                                                        </label>
                                                    ))}
                                                </div>

                                                <div className="flex flex-col gap-2">
                                                    {["Students", "Guardians"].map((label) => (
                                                        <label key={label} className="inline-flex items-center">
                                                            <input
                                                                type="checkbox"
                                                                className="form-checkbox mr-2 focus:outline-none focus:ring-0 focus:border-0"
                                                            />
                                                            {label}
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                            {/* Group Tab */}
                            {activeTab === "Group" && (
                                <div className="grid grid-cols-1 gap-2 text-sm">
                                    {[
                                        "Students",
                                        "Guardians",
                                        "Admin",
                                        "Teacher",
                                        "Accountant",
                                        "Librarian",
                                        "Receptionist",
                                        "Super Admin",
                                    ].map((role) => (
                                        <label key={role} className="inline-flex items-center">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 mr-2 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600 outline-none"
                                            />
                                            {role}
                                        </label>
                                    ))}
                                </div>
                            )}

                            {/* Individual Tab */}
                            {activeTab === "Individual" && (
                                <div className="mt-2 inline-flex w-full">
                                    <input
                                        type="search"
                                        placeholder="Search..."
                                        className="w-full py-1 px-3 text-sm border border-black border-r-0 focus:outline-none focus:ring-0 "
                                    />
                                    <div className="flex items-center justify-center py-1 px-3 border-t border-b border-r border-black cursor-pointer bg-white text-black hover:bg-gray-200 transition-colors duration-150">
                                        <IoSearchSharp size={16} />
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
                {/* Submit Section */}
                <div className="flex justify-end mt-5 border-t pt-4 items-center gap-4">
                    {(activeTab === "Group" ||
                        activeTab === "Individual" ||
                        activeTab === "Class") && (
                            <div className="flex items-center gap-4">
                                <label className="inline-flex items-center gap-1 text-sm">
                                    <input
                                        type="radio"
                                        name="sendOption"
                                        value="now"
                                        checked={sendOption === "now"}
                                        onChange={() => setSendOption("now")}
                                        className="focus:outline-none focus:ring-0 focus:ring-offset-0"
                                    />
                                    Send Now
                                </label>

                                <label className="inline-flex items-center gap-1 text-sm">
                                    <input
                                        type="radio"
                                        name="sendOption"
                                        value="schedule"
                                        checked={sendOption === "schedule"}
                                        onChange={() => setSendOption("schedule")}
                                        className="focus:outline-none focus:ring-0 focus:ring-offset-0"
                                    />
                                    Schedule
                                </label>

                                {sendOption === "schedule" && (
                                    <input
                                        type="datetime-local"
                                        className="border border-gray-300 p-1 text-sm rounded"
                                        value={scheduledDateTime}
                                        onChange={(e) => setScheduledDateTime(e.target.value)}
                                        required
                                    />
                                )}
                            </div>
                        )}

                    <button className="btn btn-primary bg-blue-500 text-white p-1 px-2 rounded focus:ring-0 focus:outline-none flex items-center gap-1">
                        <MdOutlineEmail /> Submit
                    </button>

                </div>




            </form>
        </div>
    );
}
