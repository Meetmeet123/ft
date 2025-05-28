
"use client";
import { MdOutlineEmail } from "react-icons/md";
import React, { useState, useEffect } from 'react';
import { AiTwotoneDelete } from "react-icons/ai";
import { useRouter } from "next/navigation";
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

export default function EditTemplate() {
    const [activeTab, setActiveTab] = useState("Group");
    const tabs = [""];
    const [selectedTemplate, setSelectedTemplate] = useState("");
    const [attachment, setAttachment] = useState(null);
    const [scheduledDateTime, setScheduledDateTime] = useState("");
    const router = useRouter();

    const [formData, setFormData] = useState({
        title: '',
        message: ''
    });
    const [originalData, setOriginalData] = useState(null);
    useEffect(() => {
        const savedData = localStorage.getItem("editNotice");
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            setFormData({
                title: parsedData.title || '',
                message: parsedData.message || '',
            });
            setOriginalData(parsedData);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const oldData = JSON.parse(localStorage.getItem("scheduleEmailSMSData")) || [];

        const updatedData = oldData.map(item => {
            if (item.title === originalData.title && item.message === originalData.message) {
                return {
                    ...item,
                    title: formData.title,
                    message: formData.message,
                    scheduledate: scheduledDateTime || item.scheduledate, 
                };
            }
            return item;
        });

        localStorage.setItem("scheduleEmailSMSData", JSON.stringify(updatedData));
        router.push("/communicate/schedule-email-sms-log");
    };

    const [selectedRoles, setSelectedRoles] = useState([]);

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

    const handleRoleChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedRoles((prev) => [...prev, value]);
        } else {
            setSelectedRoles((prev) => prev.filter((role) => role !== value));
        }
    };
    return (
        <div className="mt-6 p-6 bg-white border-t">
            <div className="border-b flex">
                <h1 className="text-xl">Send Email Group</h1>
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
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="border w-full py-1 text-sm focus:ring-0 focus:border-0"
                            />
                        </div>

                        {selectedTemplate && (
                            <div className="mt-2 inline-flex items-center py-1 text-sm">
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
                                // onChange={handleChange}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="block w-full h-100 p-2 text-sm border border-gray-300 focus:ring-0 focus:outline-none"
                                placeholder="Write a message..."
                            />
                        </div>
                    </div>

                    <div className="w-1/3">
                        <label htmlFor="text-bold">
                            Message To <span className="text-red-500">*</span>
                        </label>

                        <div className="mt-4 bg-gray-200 p-4 shadow-md w-full h-60 overflow-auto">
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
                                                value={role}
                                                onChange={handleRoleChange}
                                                checked={selectedRoles.includes(role)}
                                                className="w-4 h-4 mr-2 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600 outline-none"
                                            />
                                            {role}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-5 border-t pt-4 items-center gap-4">
                    <label className="block mb-1">
                        Schedule Date Time
                        <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="datetime-local"
                        className="border border-gray-300 p-1 text-sm rounded"
                        value={scheduledDateTime}
                        onChange={(e) => setScheduledDateTime(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="btn btn-primary bg-blue-500 text-white p-1 px-2 rounded focus:ring-0 focus:outline-none flex items-center gap-1"
                    >
                        <MdOutlineEmail /> Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

