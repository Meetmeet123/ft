"use client";
import React, { useState } from 'react';
import { ChevronDown, Printer, FileText, Database, Download, Search } from 'lucide-react';
import Student from './Student';
import Parents from './Parents';
import Staff from './Staff';
import studentData from './StudentsData';
import parentsData from './ParentsData';
import staffData from './StaffData';

export default function Users() {
  const [activeTab, setActiveTab] = useState('Student');

  const getActiveData = () => {
    if (activeTab === 'Student') return studentData;
    if (activeTab === 'Parent') return parentsData;
    if (activeTab === 'Staff') return staffData;
    return [];
  };

  const handlePrintClick = () => {
    window.print();
  };

  const handleCopyClick = () => {
    const data = getActiveData();
    navigator.clipboard.writeText(JSON.stringify(data, null, 2))
      .then(() => alert("Copied to clipboard!"))
      .catch((err) => alert("Failed to copy!"));
  };

  const handleDownloadClick = () => {
    const data = getActiveData();
    const csvContent = convertToCSV(data);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `${activeTab}_data.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const convertToCSV = (data) => {
    if (!data || data.length === 0) return '';
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).join(',')).join('\n');
    return `${headers}\n${rows}`;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow">
          <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-b gap-4 sm:gap-0">
            <h1 className="text-xl font-medium text-center sm:text-left">Users</h1>
            <div className="flex flex-wrap justify-center sm:justify-start overflow-x-auto gap-2 sm:border-b sm:border-gray-200">
              {['Student', 'Parent', 'Staff'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-6 py-2 text-sm font-medium cursor-pointer transition
                    ${activeTab === tab
                    ? "text-blue-600 font-medium after:absolute after:bottom-0 after:left-0 after:h-1 after:w-full after:bg-blue-600"
                    : "text-gray-600"}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Render active tab content */}
          <div className="p-4">
            {activeTab === 'Student' && <Student />}
            {activeTab === 'Parent' && <Parents />}
            {activeTab === 'Staff' && <Staff />}
          </div>
        </div>
      </div>
    </div>
  );
}
