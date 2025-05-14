"use client";
import React, { useState } from "react";
import { X } from "lucide-react";

function AddExam({ onClose }) {
  const [subjectData, setSubjectData] = useState([
    {
      subject: "English",
      subjectCode: "210",
      assessment: { theory: "TH02", practical: "PC03" },
      date: "2025-05-01",
      startTime: "10:00:00",
      durationMinutes: 90,
      roomNo: "12"
    },
    {
      subject: "Science",
      subjectCode: "111",
      assessment: { theory: "TH02", practical: "PC03" },
      date: "2025-05-05",
      startTime: "10:00:00",
      durationMinutes: 90,
      roomNo: "11"
    },
    {
      subject: "Mathematics",
      subjectCode: "110",
      assessment: { theory: "TH02", practical: "PC03" },
      date: "2025-05-08",
      startTime: "10:00:00",
      durationMinutes: 90,
      roomNo: "12"
    },
    {
      subject: "Hindi",
      subjectCode: "230",
      assessment: { theory: "TH02", practical: "PC03" },
      date: "2025-05-12",
      startTime: "10:00:00",
      durationMinutes: 90,
      roomNo: "11"
    }
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...subjectData];
    updated[index][field] = value;
    setSubjectData(updated);
  };

  const handleAdd = () => {
    const newData = {
      subject: "",
      subjectCode: "",
      assessment: { theory: "", practical: "" },
      date: "",
      startTime: "",
      durationMinutes: 0,
      roomNo: ""
    };
    setSubjectData([...subjectData, newData]);
  };

  return (
    <div className="fixed z-50 top-20 left-0 right-0 p-4 sm:p-6 bg-white shadow-lg rounded-xl w-full max-w-[95%] md:max-w-6xl mx-auto mt-10 overflow-x-auto">
      {/* Close Button */}
      <div className="flex w-full justify-end mb-2">
        <X onClick={onClose} className="cursor-pointer text-gray-600 hover:text-black" />
      </div>

      {/* Header */}
      <div className="mb-6 border-b pb-4">
        <h2 className="text-xl sm:text-2xl font-semibold mb-2">Add Exam Subject</h2>
        <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-600 gap-2 sm:gap-0">
          <div>
            <h4 className="font-medium">Exam</h4>
            <p>Subject Wise Test (May-2025)</p>
          </div>
          <div>
            <h4 className="font-medium">Class (Section)</h4>
            <p>Class: A, B, C, D</p>
          </div>
        </div>
      </div>

      {/* Add Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-3 py-2 text-sm sm:text-base rounded hover:bg-blue-700 transition"
        >
          + Add Exam Subject
        </button>
      </div>

      {/* Table */}
      <div className="max-h-[45vh] overflow-y-auto border border-gray-300 rounded">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-xs sm:text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-3 py-2 border">Subject</th>
                <th className="px-3 py-2 border">Assessment</th>
                <th className="px-3 py-2 border">Date</th>
                <th className="px-3 py-2 border">Start Time</th>
                <th className="px-3 py-2 border">Duration (min)</th>
                <th className="px-3 py-2 border">Room No.</th>
                <th className="px-3 py-2 border text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {subjectData.map((subject, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-3 py-2 border">
                    <select
                      value={subject.subject}
                      onChange={(e) => handleChange(index, "subject", e.target.value)}
                      className="border px-2 py-1 rounded w-full"
                    >
                      <option value="">Select</option>
                      <option>English</option>
                      <option>Hindi</option>
                      <option>Mathematics</option>
                      <option>Science</option>
                      <option>Social Science</option>
                      <option>French</option>
                      <option>Drawing</option>
                      <option>Computer</option>
                      <option>Physical Education</option>
                      <option>Elevate 1</option>
                      <option>Elevate 2</option>
                      <option>Elevate 3</option>
                    </select>
                  </td>
                  <td className="px-3 py-2 border">
                    <div className="flex gap-2 items-center">
                      <label>
                        <input type="checkbox" readOnly className="mr-1" />
                        Theory
                      </label>
                      <label>
                        <input type="checkbox" readOnly className="mr-1" />
                        Practical
                      </label>
                    </div>
                  </td>
                  <td className="px-3 py-2 border">
                    <input
                      type="date"
                      value={subject.date}
                      onChange={(e) => handleChange(index, "date", e.target.value)}
                      className="border px-2 py-1 rounded w-full"
                    />
                  </td>
                  <td className="px-3 py-2 border">
                    <input
                      type="time"
                      value={subject.startTime}
                      onChange={(e) => handleChange(index, "startTime", e.target.value)}
                      className="border px-2 py-1 rounded w-full"
                    />
                  </td>
                  <td className="px-3 py-2 border">
                    <input
                      type="number"
                      value={subject.durationMinutes}
                      onChange={(e) =>
                        handleChange(index, "durationMinutes", parseInt(e.target.value))
                      }
                      className="border px-2 py-1 rounded w-full"
                    />
                  </td>
                  <td className="px-3 py-2 border">
                    <input
                      type="number"
                      value={subject.roomNo}
                      onChange={(e) => handleChange(index, "roomNo", e.target.value)}
                      className="border px-2 py-1 rounded w-full"
                    />
                  </td>
                  <td className="px-3 py-2 border text-center">
                    <button
                      className="text-red-500 hover:text-red-700 transition"
                      onClick={() =>
                        setSubjectData(subjectData.filter((_, idx) => idx !== index))
                      }
                    >
                      <X size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex w-full justify-end my-4" >
          <button className="btn btn-primary" onClick={onClose}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default AddExam;
