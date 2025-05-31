"use client";
import React, { useState } from 'react'
// import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation';


const StudentTeacherRatioReport = () => {
      const router = useRouter();
  
    const handleClick = () => {
        router.push('../student-information/class-section-report'); 
        // yahan apne destination ka route likho
      };
      
      const handleClick1 = () => {
        router.push('../student-information/student-history'); 
        // yahan apne destination ka route likho
      };
      
      const handleClick2 = () => {
        router.push('../student-information/class-subject-report'); 
        // yahan apne destination ka route likho
      };
      const handleClick3 = () => {
        router.push('../student-information/student-profile'); 
        // yahan apne destination ka route likho
      };
      const handleClick4 = () => {
        router.push('../student-information/online-admission-report'); 
        // yahan apne destination ka route likho
      };
      
      const handleClick5 = () => {
        router.push('../student-information/student-login-cridential'); 
        // yahan apne destination ka route likho
      };
      const handleClick6 = () => {
        router.push('../student-information/admission-report'); 
        // yahan apne destination ka route likho
      };
      const handleClick7 = () => {
        router.push('../student-information/student-gender-retio-report'); 
        // yahan apne destination ka route likho
      };
      const handleClick8 = () => {
        router.push('../student-information/gardian-report'); 
        // yahan apne destination ka route likho
      };
      const handleClick9 = () => {
        router.push('../student-information/parent-login-credential'); 
        // yahan apne destination ka route likho
      };
      const handleClick10 = () => {
        router.push('../student-information/sibling-report'); 
        // yahan apne destination ka route likho
      };
      const handleClick11 = () => {
        router.push('../student-information/student-teacher-retio-report'); 
        // yahan apne destination ka route likho
      };
      
  // Direct data from the screenshot
  const classData = [
    { className: 'Class 5 (A)', totalStudents: 11, totalTeachers: 2, ratio: '1.0.18' },
    { className: 'Class 5 (B)', totalStudents: 4, totalTeachers: 2, ratio: '1.0.5' },
    { className: 'Class 4 (A)', totalStudents: 7, totalTeachers: 2, ratio: '1.0.29' },
    { className: 'Class 4 (C)', totalStudents: 3, totalTeachers: 2, ratio: '1.0.67' },
    { className: 'Class 5 (C)', totalStudents: 4, totalTeachers: 2, ratio: '1.0.5' },
    { className: 'Class 4 (B)', totalStudents: 4, totalTeachers: 2, ratio: '1.0.5' },
    { className: 'Class 3 (A)', totalStudents: 4, totalTeachers: 2, ratio: '1.0.5' },
    { className: 'Class 3 (B)', totalStudents: 2, totalTeachers: 2, ratio: '1.1' },
    { className: 'Class 4 (D)', totalStudents: 2, totalTeachers: 0, ratio: '1.0' },
    { className: 'Class 3 (C)', totalStudents: 1, totalTeachers: 3, ratio: '1.3' },
    { className: 'Class 3 (D)', totalStudents: 1, totalTeachers: 0, ratio: '1.0' },
  ];
  const handleReportClick = (reportName) => {
    setActiveReport(reportName);
    setFilters({
      class: '',
      section: '',
      category: '',
      gender: '',
      rte: ''
    });
    setShowData(false);
  };
  const commonStyle = (report) => ({
    padding: '10px',
    backgroundColor:  '#f0f0f0',
    color:  '#333',
    border: '1px solid #ddd',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontWeight: '500',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  });
  return (
    <div className="container mx-auto p-4 max-w-5xl">

<div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
      gap: '10px', 
      marginBottom: '30px'
    }}>
      <button style={commonStyle('Student Report')} onClick={() => handleReportClick('Student Report')}>Student Report</button>
      <button style={commonStyle('Student History')} onClick={() => handleClick1('Student History')}>Student History</button>
      <button style={commonStyle('Class Subject Report')} onClick={() => handleClick2('Class Subject Report')}>Class Subject Report</button>
      <button style={commonStyle('Student Profile')} onClick={() => handleClick3('Student Profile')}>Student Profile</button>
      <button style={commonStyle('Online Admission Report')} onClick={() => handleClick4('Online Admission Report')}>Online Admission Report</button>
      <button style={commonStyle('Class & Section Report')} onClick={() => handleClick('Class & Section Report')}>Class & Section Report</button>
      <button style={commonStyle('Student Login Credential')} onClick={() => handleClick5('Student Login Credential')}>Student Login Credential</button>
      <button style={commonStyle('Admission Report')} onClick={() => handleClick6('Admission Report')}>Admission Report</button>
      <button style={commonStyle('Student Gender Ratio Report')} onClick={() => handleClick7('Student Gender Ratio Report')}>Student Gender Ratio Report</button>
      <button style={commonStyle('Guardian Report')} onClick={() => handleClick8('Guardian Report')}>Guardian Report</button>
      <button style={commonStyle('Parent Login Credential')} onClick={() => handleClick9('Parent Login Credential')}>Parent Login Credential</button>
      <button style={commonStyle('Sibling Report')} onClick={() => handleClick10('Sibling Report')}>Sibling Report</button>
      <button style={commonStyle('Student Teacher Ratio Report')} onClick={() => handleClick11('Student Teacher Ratio Report')}>Student Teacher Ratio Report</button>
    </div>
      <h1 className="text-2xl font-bold mb-6">Student Teacher Ratio Report</h1>
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-1">Search...</h2>
       
      </div>
      
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left border-b font-semibold">Class (Section)</th>
              <th className="py-3 px-4 text-center border-b font-semibold">Total Students</th>
              <th className="py-3 px-4 text-center border-b font-semibold">Total Assigned Teachers</th>
              <th className="py-3 px-4 text-center border-b font-semibold">Student - Teacher Ratio</th>
            </tr>
          </thead>
          <tbody>
            {classData.map((classItem, index) => (
              <tr 
                key={index} 
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="py-3 px-4 border-b">{classItem.className}</td>
                <td className="py-3 px-4 border-b text-center">{classItem.totalStudents}</td>
                <td className="py-3 px-4 border-b text-center">{classItem.totalTeachers}</td>
                <td className="py-3 px-4 border-b text-center">{classItem.ratio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTeacherRatioReport;