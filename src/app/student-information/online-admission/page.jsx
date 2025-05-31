"use client";
import React, { useState } from 'react';
import {
  Search,
  ChevronDown,
  Printer,
  FileText,
  Download,
  Database,
  X,
  Edit,
} from "lucide-react";
import Link from "next/link";
import studentsData from './studentsData';

export default function StudentList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [displayCount, setDisplayCount] = useState(100);
  const [students, setStudents] = useState(studentsData);

  const filteredStudents = students.filter(
    (student) =>
      (student.name && student.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (student.refNo && student.refNo.toString().includes(searchTerm))
  );

  const deleteStudent = (refNo) => {
    const updatedStudents = students.filter(student => student.refNo !== refNo);
    setStudents(updatedStudents);
  };

  // Handle Excel export (CSV download)
  const handleExcelExport = () => {
    const header = ["Ref. No", "Student Name", "Class", "Father's Name", "DOB", "Gender", "Form Status", "Payment Status", "Enrolled"];
    
    const rows = students.map((s) => [
      s.refNo, 
      s.name, 
      s.className, 
      s.fatherName || "N/A", 
      s.dob, 
      s.gender, 
      s.formStatus, 
      s.paymentStatus, 
      s.enrolled ? "Yes" : "No"
    ]);

    const csvContent = [
      header.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "StudentsData.csv";
    link.click();
  };

  // Handle printing functionality
  const handlePrint = () => {
    window.print(); // Open the print dialog
  };

  // Handle file text functionality (maybe for generating a report)
  const handleFileText = () => {
    // You can implement this to generate a PDF or formatted document
    console.log("File Text functionality here (PDF generation, etc.)");
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-6">Student List</h1>

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-md px-3 py-2 pl-10 w-full md:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>

        <div className="flex space-x-2">
          <div className="flex items-center border border-gray-300 rounded-md px-2">
            <select
              className="py-2 outline-none"
              value={displayCount}
              onChange={(e) => setDisplayCount(Number(e.target.value))}
            >
              <option value="10">10</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>

          <button onClick={handleExcelExport} className="p-2 border border-gray-300 rounded-md hover:bg-gray-100">
            <Download className="h-5 w-5 text-gray-600" />
          </button>
          <button onClick={handleFileText} className="p-2 border border-gray-300 rounded-md hover:bg-gray-100">
            <FileText className="h-5 w-5 text-gray-600" />
          </button>
          <button onClick={handlePrint} className="p-2 border border-gray-300 rounded-md hover:bg-gray-100">
            <Printer className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  Ref. No <ChevronDown className="h-4 w-4 ml-1" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  Student Name <ChevronDown className="h-4 w-4 ml-1" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  Class <ChevronDown className="h-4 w-4 ml-1" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  Father's Name <ChevronDown className="h-4 w-4 ml-1" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  DOB <ChevronDown className="h-4 w-4 ml-1" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  Gender <ChevronDown className="h-4 w-4 ml-1" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  Form Status <ChevronDown className="h-4 w-4 ml-1" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  Payment Status <ChevronDown className="h-4 w-4 ml-1" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  Enrolled <ChevronDown className="h-4 w-4 ml-1" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {filteredStudents.slice(0, displayCount).map((student) => (
              <tr key={student.refNo} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-700">{student.refNo}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{student.name}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{student.className}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{student.fatherName || "N/A"}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{student.dob}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{student.gender}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{student.formStatus}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{student.paymentStatus}</td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {student.enrolled ? "Yes" : "No"}
                </td>
                <td className="flex px-4 py-3 text-sm">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-md">
                    <Printer className="h-5 w-5" />
                  </button>
                  {student.paymentStatus !== 'Paid' && (
                    <Link href='/student-information/online-admission/edit-online'>
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-md">
                        <Edit />
                      </button>
                    </Link>
                  )}
                  <button onClick={() => deleteStudent(student.refNo)}
                   className="p-2 text-red-600 hover:bg-red-50 rounded-md">
                    <X className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
