
"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { MdOutlineEmail, MdEdit, MdDelete } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

import { IoMdAdd } from "react-icons/io";
import NoticeModal from "./NoticeModal/NoticeModal";

const defaultNotices = [
    {
        id: 1,
        title: "Summer Vacation",
        noticeDate: "2024-04-10",
        publishDate: "2024-04-10",
        message: "This is a default notice. You can edit or delete it.",
    },
    {
        id: 2,
        title: "Staff Meeting",
        noticeDate: "2024-04-08",
        publishDate: "2024-04-09",
        message: "Check your email for the exam time table.",
    },
    {
        id: 3,
        title: "Parent Teacher Meeting",
        noticeDate: "2024-04-08",
        publishDate: "2024-04-09",
        message: "Check your email for the exam time table.",
    },
];

const NoticeBoard = () => {
    const [hoveredId, setHoveredId] = useState(null);
    const router = useRouter();
    const [notices, setNotices] = useState([]);
    const [selectedNotice, setSelectedNotice] = useState(null);

    useEffect(() => {
        const fetchNotices = () => {
            const stored = JSON.parse(localStorage.getItem("notices"));
            if (stored && stored.length > 0) {
                setNotices(stored);
            } else {
                setNotices(defaultNotices);
            }
        };

        fetchNotices();
        window.addEventListener("focus", fetchNotices);

        return () => window.removeEventListener("focus", fetchNotices);
    }, []);

    const handleDelete = (id) => {
        const filtered = notices.filter((n) => n.id !== id);
        setNotices(filtered);
        localStorage.setItem("notices", JSON.stringify(filtered));
    };

    const handleEdit = (notice) => {
        localStorage.setItem("editNotice", JSON.stringify(notice));
        router.push("/notice/add");
    };

    return (
        <div className="p-6 bg-white mt-6 intro-y col-span-12 lg:col-span-6 ">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl text-slate-700">Notice Board</h2>
                <button
                    onClick={() => {
                        localStorage.removeItem("editNotice");
                        router.push("/notice/add");
                    }}
                    className="btn btn-primary bg-blue-500 text-white p-1 px-2 mt-3 rounded focus:ring-0 focus:outline-none"
                >
                    <IoMdAdd /> Post New Message
                </button>
            </div>

            <div className="bg-white border-t border-slate-200/60 dark:border-darkmode-400">
                {notices.map((item) => (
                    <div
                        key={item.id}
                        className="flex justify-between items-center border-b px-3 py-2 hover:bg-slate-100 cursor-pointer"
                        onClick={() => setSelectedNotice(item)}
                        onMouseEnter={() => setHoveredId(item.id)}
                        onMouseLeave={() => setHoveredId(null)}
                    >
                        <div className="flex items-center gap-2 text-green-700 text-lg">
                            <MdOutlineEmail /> {item.title}
                        </div>

                        {hoveredId === item.id && (
                            <div
                                className="flex gap-3 text-green-600"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <MdEdit
                                    onClick={() => handleEdit(item)}
                                    className="hover:text-green-800 cursor-pointer text-lg"
                                />
                                <RxCross2
                                    onClick={() => handleDelete(item.id)}
                                    className="hover:text-green-800 cursor-pointer text-lg"
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Modal to view full details */}
            {selectedNotice && (
                <NoticeModal
                    notice={selectedNotice}
                    onClose={() => setSelectedNotice(null)}
                />
            )}
        </div>
    );
};

export default NoticeBoard;
