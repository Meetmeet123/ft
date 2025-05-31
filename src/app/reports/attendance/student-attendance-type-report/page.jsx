"use client";

import React, { useState } from 'react';
import Attendance from '../page';

const StudentAttendanceReport = () => {
  // Dummy JSON data
  const dummyData = {
    students: [
      {
        admissionNo: 'ADM2023001',
        studentName: 'Rahul Sharma',
        class: 'Class 5',
        section: 'A',
        fatherName: 'Rajesh Sharma',
        dateOfBirth: '2010-05-15',
        admissionDate: '2020-04-10',
        gender: 'Male',
        mobileNumber: '9876543210',
        attendanceCount: {
          present: 18,
          late: 2,
          absent: 1,
          holiday: 0,
          halfDay: 1
        }
      },
      {
        admissionNo: 'ADM2023002',
        studentName: 'Priya Patel',
        class: 'Class 5',
        section: 'A',
        fatherName: 'Sanjay Patel',
        dateOfBirth: '2010-08-22',
        admissionDate: '2020-04-10',
        gender: 'Female',
        mobileNumber: '8765432109',
        attendanceCount: {
          present: 20,
          late: 0,
          absent: 0,
          holiday: 0,
          halfDay: 0
        }
      },
      {
        admissionNo: 'ADM2023003',
        studentName: 'Amit Singh',
        class: 'Class 4',
        section: 'B',
        fatherName: 'Vikram Singh',
        dateOfBirth: '2011-03-10',
        admissionDate: '2021-04-05',
        gender: 'Male',
        mobileNumber: '7654321098',
        attendanceCount: {
          present: 15,
          late: 3,
          absent: 2,
          holiday: 1,
          halfDay: 1
        }
      }
    ],
    searchTypes: ['Today', ' This Weekly', 'Last Week', 'This Month'],
    attendanceTypes: ['Present', 'Late', 'Absent', 'Holiday', 'Half Day'],
    classes: ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'],
    sections: ['A', 'B', 'C', 'D']
  };

  // State for search criteria
  const [searchCriteria, setSearchCriteria] = useState({
    searchType: '',
    attendanceType: '',
    class: '',
    section: ''
  });

  // State for search results
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle search
  const handleSearch = () => {
    // Filter students based on selected criteria
    let results = dummyData.students.filter(student => {
      let matches = true;
      
      if (searchCriteria.class && student.class !== searchCriteria.class) {
        matches = false;
      }
      
      if (searchCriteria.section && student.section !== searchCriteria.section) {
        matches = false;
      }
      
      return matches;
    });

    // Further filter by attendance type if selected
    if (searchCriteria.attendanceType) {
      results = results.map(student => {
        const count = student.attendanceCount[searchCriteria.attendanceType.toLowerCase()];
        return {
          ...student,
          count: count || 0
        };
      }).filter(student => student.count > 0);
    }

    setSearchResults(results);
    setShowResults(true);
  };

  // Reset form
  const handleReset = () => {
    setSearchCriteria({
      searchType: '',
      attendanceType: '',
      class: '',
      section: ''
    });
    setSearchResults([]);
    setShowResults(false);
  };

  return (
    <> <Attendance/>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Student Attendance Type Report</h1>
      
      {/* Search Criteria */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Select Criteria</h2>
        
        <div className="flex flex-wrap gap-4 items-end" >
          <div style={{width:'200px'}}>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search Type</label>
            <select
              name="searchType"
              value={searchCriteria.searchType}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select</option>
              {dummyData.searchTypes.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div style={{width:'200px'}}>

            <label className="block text-sm font-medium text-gray-700 mb-1">Attendance Type*</label>
            <select
              name="attendanceType"
              value={searchCriteria.attendanceType}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select</option>
              {dummyData.attendanceTypes.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div style={{width:'200px'}}>

            <label className="block text-sm font-medium text-gray-700 mb-1">Class*</label>
            <select
              name="class"
              value={searchCriteria.class}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select</option>
              {dummyData.classes.map((cls, index) => (
                <option key={index} value={cls}>{cls}</option>
              ))}
            </select>
          </div>
          
          <div style={{width:'200px'}}>

            <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
            <select
              name="section"
              value={searchCriteria.section}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select</option>
              {dummyData.sections.map((sec, index) => (
                <option key={index} value={sec}>{sec}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={handleSearch}
            disabled={!searchCriteria.attendanceType || !searchCriteria.class}
            className={`px-4 py-2 rounded-md ${
              searchCriteria.attendanceType && searchCriteria.class 
                ? 'bg-blue-600 text-black hover:bg-blue-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Search
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Reset
          </button>
        </div>
      </div>
      
      {/* Search Results */}
      {showResults && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admission No</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Father Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Birth</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admission Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Count</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {searchResults.length > 0 ? (
                  searchResults.map((student, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">{student.admissionNo}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{student.studentName}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{student.class} - {student.section}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{student.fatherName}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{student.dateOfBirth}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{student.admissionDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{student.gender}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{student.mobileNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {searchCriteria.attendanceType === 'Present' && student.attendanceCount.present}
                        {searchCriteria.attendanceType === 'Late' && student.attendanceCount.late}
                        {searchCriteria.attendanceType === 'Absent' && student.attendanceCount.absent}
                        {searchCriteria.attendanceType === 'Holiday' && student.attendanceCount.holiday}
                        {searchCriteria.attendanceType === 'Half Day' && student.attendanceCount.halfDay}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="px-6 py-4 text-center text-gray-500">
                      No data available in table
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default StudentAttendanceReport;