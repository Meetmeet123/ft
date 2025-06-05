"use client";
import React, { useState } from 'react';
import { ChevronDown, Printer, FileText, Database, Download, Search } from 'lucide-react';
import ProfileUpdate from './ProfileUpdate'; // Fix import (PascalCase)
import DashBoard from './Dashboard';

export default function StudentProfileSetting() {
  const [activeTab, setActiveTab] = useState('Student Profile Update');

  return (
    <div className="bg-white border border-gray-200 rounded-md">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <h1 className="text-xl font-medium text-gray-700">Student Profile Setting</h1>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap sm:flex-nowrap border-b border-gray-200">
        <button
          className={`relative px-4 py-3 font-medium focus:outline-none ${
            activeTab === 'Student Profile Update'
              ? 'text-blue-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          } w-full sm:w-auto`}
          onClick={() => setActiveTab('Student Profile Update')}
        >
          Student Profile Update
        </button>
        <button
          className={`relative px-4 py-3 font-medium focus:outline-none ${
            activeTab === 'Dashboard Setting'
              ? 'text-blue-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          } w-full sm:w-auto`}
          onClick={() => setActiveTab('Dashboard Setting')}
        >
          Dashboard Setting
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === 'Student Profile Update' && <ProfileUpdate />}
        {activeTab === 'Dashboard Setting' && <DashBoard />}
      </div>
    </div>
  );
}
