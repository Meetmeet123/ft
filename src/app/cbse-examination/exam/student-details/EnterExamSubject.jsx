"use client";
import React, { useState } from "react";
import { X, ClipboardList } from "lucide-react";
import EnterMarks from "./EnterMarks";

function AddExam({ onClose }) {
    const [subjectData, setSubjectData] = useState([
        {
            subject: "English",
            subjectCode: "210",
            date: "2025-05-01",
            startTime: "10:00:00",
            roomNo: "12"
        },
        {
            subject: "Science",
            subjectCode: "111",
            date: "2025-05-05",
            startTime: "10:00:00",
            roomNo: "11"
        },
        {
            subject: "Mathematics",
            subjectCode: "110",
            date: "2025-05-08",
            startTime: "10:00:00",
            roomNo: "12"
        },
        {
            subject: "Hindi",
            subjectCode: "230",
            date: "2025-05-12",
            startTime: "10:00:00",
            roomNo: "11"
        }
    ]);

    const [displayMrks,setDiplayMarks] = useState(false);

    return (
        <div className="fixed top-30 -left-1 z-60 -translate-x-1/2 p-6 bg-white shadow-lg rounded-xl w-[100%] overflow-x-auto">
            <div className="flex w-full justify-end cursor-pointer">
                <X onClick={onClose} />
            </div>

            <div className="mb-6 border-b pb-4">
                <h2 className="text-2xl font-semibold mb-2">Exam Subject</h2>
                <div className="flex justify-between text-sm text-gray-600">
                    <div>
                        <h4 className="font-medium">Exam</h4>
                        <p>Subject Wise Test (May-2025)</p>
                    </div>
                    <div>
                        <h4 className="font-medium">Class (Section)</h4>
                        <p>7th Grade: A, B, C, D</p>
                    </div>
                </div>
            </div>

            <div className="max-h-[40vh] overflow-y-auto border border-gray-300">
                <table className="min-w-full table-auto text-sm">
                    <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="px-4 py-2 border">Subject</th>
                            <th className="px-4 py-2 border">Date</th>
                            <th className="px-4 py-2 border">Start Time</th>
                            <th className="px-4 py-2 border">Room No.</th>
                            <th className="px-4 py-2 border">Enter Marks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjectData.map((subject, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border">
                                    <p>{subject.subject || "—"}</p>
                                </td>
                                <td className="px-4 py-2 border">
                                    <p>{subject.date || "—"}</p>
                                </td>
                                <td className="px-4 py-2 border">
                                    <p>{subject.startTime || "—"}</p>
                                </td>
                                <td className="px-4 py-2 border">
                                    <p>{subject.roomNo || "—"}</p>
                                </td>
                                <td className="px-4 py-2 border text-center">
                                    <button className=" hover:text-red-700 transition">
                                        <ClipboardList
                                        onClick={()=>setDiplayMarks(true)}
                                            size={18}
                                        />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {displayMrks && <EnterMarks onClose={()=>setDiplayMarks(false)} />} 
        </div>
    );
}

export default AddExam;
