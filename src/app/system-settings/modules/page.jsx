"use client";
import React, { useState } from 'react';
import { ChevronDown, Printer, FileText, Database, Download, Search } from 'lucide-react';
import System from './System';
import Student from './Student';
import Parents from './Parents';
import systemData from './SystemData';
import studentData from './StudentData';
import parentData from './ParentData';

export default function Modules() {
  const [activeTab, setActiveTab] = useState('System');

  const getActiveData = () => {
    if (activeTab === 'System') return systemData;
    if (activeTab === 'Student') return studentData;
    if (activeTab === 'Parent') return parentData;
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
      <div className="max-w-7xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow">
          {/* Tabs */}
          <div className="flex flex-wrap sm:flex-nowrap justify-between items-center p-4 border-b gap-2">
            <h1 className="text-xl font-medium w-full sm:w-auto text-center sm:text-left">Modules</h1>
            <div className="flex sm:overflow-x-auto space-x-2 w-full sm:w-auto justify-center sm:justify-start mt-4 sm:mt-0">
              {['System', 'Student', 'Parent'].map(tab => (
                <button
                  key={tab}
                  className={`tab-button px-4 py-2 text-sm whitespace-nowrap font-medium rounded-md relative w-full sm:w-auto ${
                    activeTab === tab
                      ? 'text-blue-600 after-active-tab after:bg-blue-600 after:w-full after:h-1 after:absolute after:bottom-0 after:left-0'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tabs Content */}
          <div className="p-4 overflow-x-auto">
            {activeTab === 'System' && <System />}
            {activeTab === 'Student' && <Student />}
            {activeTab === 'Parent' && <Parents />}
          </div>
        </div>
      </div>
    </div>
  );
}
