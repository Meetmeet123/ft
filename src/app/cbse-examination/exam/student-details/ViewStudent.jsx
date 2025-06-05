"use client";

import { useState } from "react";
import { X } from "lucide-react";
import studentData from "./StudentData";

function ViewStudent({ onClose }) {
  const [students, setStudents] = useState(studentData);
  const [selsectAll, setSelectAll] = useState(false);

  return (
    <div className="p-4 fixed z-60 top-20 height-4/5 left-0 right-0 bg-white shadow-lg rounded-lg overflow-y-auto max-h-[90vh]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Assign / View Student</h3>
        <button onClick={onClose}>
          <X 
          onClick={onClose}
          className="w-5 h-5" 
          />
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm text-left border">
          <thead className="bg-gray-100 text-xs uppercase">
            <tr>
              <th className="px-4 py-2 whitespace-nowrap">
                <input 
                onChange={() => setSelectAll(!selsectAll)}
                type="checkbox" 
                className="mr-2" />
                All
              </th>
              <th className="px-4 py-2 whitespace-nowrap">Student</th>
              <th className="px-4 py-2 whitespace-nowrap">Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Admission No</th>
              <th className="px-4 py-2 whitespace-nowrap">Class (Section)</th>
              <th className="px-4 py-2 whitespace-nowrap">Father Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Category</th>
              <th className="px-4 py-2 whitespace-nowrap">Gender</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr
                key={index}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-2">
                  <input 
                  type="checkbox"
                  checked={student.isSelected || selsectAll}
                  onChange={() => {
                    const updatedStudents = [...students];
                    updatedStudents[index].isSelected = !updatedStudents[index].isSelected;
                    setStudents(updatedStudents);
                  }}
                   />
                </td>
                <td className="px-4 py-2">{student.studentName || "-"}</td>
                <td className="px-4 py-2">{student.studentName}</td>
                <td className="px-4 py-2">{student.admissionNo}</td>
                <td className="px-4 py-2">{student.classSection}</td>
                <td className="px-4 py-2">{student.fatherName}</td>
                <td className="px-4 py-2">{student.category || "-"}</td>
                <td className="px-4 py-2">{student.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-4">
        <button 
        onClick={onClose}
        className="btn btn-primary bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Save
        </button>
      </div>
    </div>
  );
}

export default ViewStudent;
