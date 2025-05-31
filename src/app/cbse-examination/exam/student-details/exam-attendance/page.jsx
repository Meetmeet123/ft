"use client"
import React, { useState } from 'react';
import { X } from "lucide-react";

function ExamAttendance({ onClose }) {
  const [attendanceData, setAttendanceData] = useState([
    {
      "admissionNo": "07874",
      "rollNo": "30210",
      "studentName": "Scarlett Kennedy",
      "class": "7th Grade(A)",
      "fatherName": "David",
      "gender": "Female",
      "totalPresentDays": 132
    },
    {
      "admissionNo": "18001",
      "rollNo": "101",
      "studentName": "Edward Thomas",
      "class": "7th Grade(A)",
      "fatherName": "Olivier Thomas",
      "gender": "Male",
      "totalPresentDays": 157
    },
    {
      "admissionNo": "18002",
      "rollNo": "102",
      "studentName": "Robin Peterson",
      "class": "7th Grade(A)",
      "fatherName": "Lucas Peterson",
      "gender": "Male",
      "totalPresentDays": 145
    },
    {
      "admissionNo": "18004",
      "rollNo": "109",
      "studentName": "Laura Clinton",
      "class": "7th Grade(A)",
      "fatherName": "Michael Clinton",
      "gender": "Female",
      "totalPresentDays": 166
    },
    {
      "admissionNo": "18005",
      "rollNo": "104",
      "studentName": "Glen Stark",
      "class": "7th Grade(B)",
      "fatherName": "James Stark",
      "gender": "Male",
      "totalPresentDays": 113
    },
    {
      "admissionNo": "18007",
      "rollNo": "107",
      "studentName": "Brian Kohlar",
      "class": "7th Grade(A)",
      "fatherName": "Nick Kohlar",
      "gender": "Male",
      "totalPresentDays": 141
    },
    {
      "admissionNo": "18010",
      "rollNo": "111",
      "studentName": "Kriti Singh",
      "class": "7th Grade(B)",
      "fatherName": "Manish Singh",
      "gender": "Female",
      "totalPresentDays": 170
    },
    {
      "admissionNo": "18013",
      "rollNo": "113",
      "studentName": "Benjamin Gates",
      "class": "7th Grade(A)",
      "fatherName": "Nathan Gates",
      "gender": "Male",
      "totalPresentDays": 127
    },
    {
      "admissionNo": "18014",
      "rollNo": "4785",
      "studentName": "Devin Coinneach",
      "class": "7th Grade(A)",
      "fatherName": "jack Coinneach",
      "gender": "Male",
      "totalPresentDays": 153
    },
    {
      "admissionNo": "18016",
      "rollNo": "1243",
      "studentName": "Apolline",
      "class": "7th Grade(A)",
      "fatherName": "Elanie",
      "gender": "Male",
      "totalPresentDays": 138
    },
    {
      "admissionNo": "18023",
      "rollNo": "6541",
      "studentName": "Karuna Rana",
      "class": "7th Grade(A)",
      "fatherName": "Rajesh Rana",
      "gender": "Female",
      "totalPresentDays": 159
    },
    {
      "admissionNo": "18025",
      "rollNo": "18004",
      "studentName": "Jhonson wood",
      "class": "7th Grade(C)",
      "fatherName": "David",
      "gender": "Male",
      "totalPresentDays": 146
    },
    {
      "admissionNo": "18029",
      "rollNo": "10",
      "studentName": "Rahul Sinha",
      "class": "7th Grade(B)",
      "fatherName": "G S SINHA",
      "gender": "Male",
      "totalPresentDays": 134
    },
    {
      "admissionNo": "18050",
      "rollNo": "",
      "studentName": "Kenal Dezzy",
      "class": "7th Grade(A)",
      "fatherName": "Rey Dezzy",
      "gender": "Male",
      "totalPresentDays": 121
    },
    {
      "admissionNo": "36220",
      "rollNo": "23220",
      "studentName": "Yash Sinha",
      "class": "7th Grade(C)",
      "fatherName": "Arjun",
      "gender": "Male",
      "totalPresentDays": 168
    },
    {
      "admissionNo": "53322",
      "rollNo": "",
      "studentName": "Harry",
      "class": "7th Grade(C)",
      "fatherName": "kalvin",
      "gender": "Male",
      "totalPresentDays": 142
    },
    {
      "admissionNo": "90877",
      "rollNo": "9088887",
      "studentName": "Vikash singh",
      "class": "7th Grade(C)",
      "fatherName": "Gaurav singh",
      "gender": "Male",
      "totalPresentDays": 130
    },
    {
      "admissionNo": "908875",
      "rollNo": "2311",
      "studentName": "Saurabh Shah",
      "class": "7th Grade(A)",
      "fatherName": "Vinay Shah",
      "gender": "Male",
      "totalPresentDays": 119
    },
    {
      "admissionNo": "980879",
      "rollNo": "",
      "studentName": "Markus Stones",
      "class": "7th Grade(B)",
      "fatherName": "Jonson Stones",
      "gender": "Male",
      "totalPresentDays": 136
    }
  ]
  );

  const [totalAttendanceDays,setTotalAttendaceDays] = useState(110);

   return (
    <div className="fixed z-60 left-1/9 top-5 transform -translate-x-1/2 w-[95%] md:w-[90%] lg:w-[85%] max-w-6xl bg-blue-50 p-4 sm:p-6 rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
      {/* Header */}
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Exam Attendance</h3>
        <button onClick={onClose} className="text-gray-600 hover:text-red-500">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Attendance Days Input */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 mb-6">
        <label className="text-gray-700 font-medium">
          Total Attendance Days <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          value={totalAttendanceDays}
          onChange={(e) => setTotalAttendaceDays(e.target.value)}
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
        />
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-xs sm:text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="border p-2">Admission No</th>
              <th className="border p-2">Roll No</th>
              <th className="border p-2">Student Name</th>
              <th className="border p-2">Class</th>
              <th className="border p-2">Father Name</th>
              <th className="border p-2">Gender</th>
              <th className="border p-2">Attendance</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((student, index) => (
              <tr key={index} className="text-center even:bg-gray-50">
                <td className="border p-2">{student.admissionNo}</td>
                <td className="border p-2">{student.rollNo || "-"}</td>
                <td className="border p-2">{student.studentName}</td>
                <td className="border p-2">{student.class}</td>
                <td className="border p-2">{student.fatherName}</td>
                <td className="border p-2">{student.gender}</td>
                <td className="border p-2">
                  <input
                    type="text"
                    value={student.totalPresentDays}
                    onChange={(e) => {
                      const updated = [...attendanceData];
                      updated[index] = {
                        ...updated[index],
                        totalPresentDays: e.target.value,
                      };
                      setAttendanceData(updated);
                    }}
                    className="border rounded-md px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Save Button */}
      <div className="flex justify-end my-4">
        <button
          className="btn btn-primary bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={onClose}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default ExamAttendance;
