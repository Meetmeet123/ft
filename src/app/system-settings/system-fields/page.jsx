"use client";
import React, { useState } from 'react';
import { ChevronDown, Printer, FileText, Database, Download, Search } from 'lucide-react';
import studentData from './StudentData';
import Students from './Students';
import staffData from './StaffData';
import Staff from './Staff';

export default function Users() {
  const [activeTab, setActiveTab] = useState('Student');

  const getActiveData = () => {
    if (activeTab === 'Student') return studentData;
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
      .catch(() => alert("Failed to copy!"));
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
      <div className="max-w-7xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-b gap-4">
            <h1 className="text-xl font-medium">System Field</h1>
            <div className="flex flex-wrap border-b sm:border-none gap-2">
              {['Student', 'Staff'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-6 py-2 text-sm font-medium transition 
                    ${activeTab === tab
                      ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:h-1 after:w-full after:bg-blue-600"
                      : "text-gray-600"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          {activeTab === 'Student' && <Students />}
          {activeTab === 'Staff' && <Staff />}
        </div>
      </div>
    </div>
  );
}
