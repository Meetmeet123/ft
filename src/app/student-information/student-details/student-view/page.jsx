"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import QRCode from './assets/QRCode.png';
import BarCode from './assets/BarCode.png';
import RenderProfile from './RenderProfile';
import LeftBar from './LeftBar';
import FeesSection from './FeesSection/Fees';
import ExamResults from './Exam';
import CBSEExamination from './CBSEExamination';
import AttendanceView from './AttendanceView';
import DocumentsPage from './DocumentsPage';
import TimeLine from './TimeLine';
import StudentBehaviour from './StudentBehaviour';

export default function StudentProfile() {
  const [activeTab, setActiveTab] = useState('Profile');  
  const tabs = ['Profile', 'Fees', 'Exam', 'CBSE Examination', 'Attendance', 'Documents', 'Timeline', 'Student Behaviour'];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-6 px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left sidebar */}
          <LeftBar/>

          {/* Main content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-md shadow-sm overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    className={`relative px-5 py-2 text-sm font-medium transition 
                        ${activeTab === tab
                          ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:h-1 after:w-full after:bg-blue-600"
                          : "text-gray-600"
                        }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div className="p-4">
                {activeTab === 'Profile' && <RenderProfile/>}
                {activeTab === 'Fees' && <FeesSection/>}
                {activeTab === 'Exam' && <ExamResults/>}
                {activeTab === 'CBSE Examination' && <CBSEExamination/>}
                {activeTab === 'Attendance' && <AttendanceView/>}
                {activeTab === 'Documents' && <DocumentsPage/>}
                {activeTab === 'Timeline' && <TimeLine/>}
                {activeTab === 'Student Behaviour' && <StudentBehaviour/>}

                {activeTab !== 'Profile' && (
                  <div className="p-8 text-center text-gray-500">
                    <p>This tab content is not available in the preview.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}