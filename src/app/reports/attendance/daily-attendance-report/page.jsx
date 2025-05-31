"use client";

import React, { useState } from 'react';
import Attendance from '../page';

const DailyAttendanceReport = () => {
  // Dummy data for attendance reports
  const dummyAttendanceData = [
    {
      date: "04/29/2025",
      reports: [
        {
          classSection: "Class 5 (A)",
          totalPresent: 9,
          malePresent: 7,
          femalePresent: 2,
          totalAbsent: 2,
          maleAbsent: 1,
          femaleAbsent: 1,
          presentPercentage: 82,
          absentPercentage: 18
        },
        {
          classSection: "Class 4 (B)",
          totalPresent: 12,
          malePresent: 6,
          femalePresent: 6,
          totalAbsent: 1,
          maleAbsent: 0,
          femaleAbsent: 1,
          presentPercentage: 92,
          absentPercentage: 8
        },
        {
          classSection: "Class 3 (C)",
          totalPresent: 15,
          malePresent: 8,
          femalePresent: 7,
          totalAbsent: 0,
          maleAbsent: 0,
          femaleAbsent: 0,
          presentPercentage: 100,
          absentPercentage: 0
        }
      ]
    },
    {
      date: "04/28/2025",
      reports: [
        {
          classSection: "Class 5 (A)",
          totalPresent: 8,
          malePresent: 6,
          femalePresent: 2,
          totalAbsent: 3,
          maleAbsent: 2,
          femaleAbsent: 1,
          presentPercentage: 73,
          absentPercentage: 27
        }
      ]
    }
  ];

  // State for selected date and search results
  const [selectedDate, setSelectedDate] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // Handle date change
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  // Handle search
  const handleSearch = () => {
    if (!selectedDate) return;
    
    // Format the date to match our dummy data format (MM/DD/YYYY)
    const formattedDate = new Date(selectedDate).toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
    
    // Find reports for the selected date
    const foundData = dummyAttendanceData.find(item => item.date === formattedDate);
    
    if (foundData) {
      setSearchResults(foundData.reports);
    } else {
      setSearchResults([]);
    }
    
    setShowResults(true);
  };

  // Handle reset
  const handleReset = () => {
    setSelectedDate("");
    setSearchResults([]);
    setShowResults(false);
  };

  return ( 
     <> 
     <Attendance/>    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Daily Attendance Report</h1>
      
      {/* Search Criteria */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Select Criteria</h2>
        
        <div className="flex flex-wrap items-end gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Date*</label>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={handleSearch}
              disabled={!selectedDate}
              className={`px-4 py-2 rounded-md ${selectedDate ? 'bg-blue-600 text-black hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            >
              Search
            </button>
           
          </div>
        </div>
      </div>
      
      {/* Search Results */}
      {showResults && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Daily Attendance Report</h2>
            <div className="text-sm text-gray-500">
              {selectedDate && `Date: ${new Date(selectedDate).toLocaleDateString('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric'
              })}`}
            </div>
          </div>
          
          {searchResults.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class (Section)</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Present</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Male Present</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Female Present</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Absent</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Male Absent</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Female Absent</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Present %</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Absent %</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {searchResults.map((report, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">{report.classSection}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{report.totalPresent}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{report.malePresent}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{report.femalePresent}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{report.totalAbsent}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{report.maleAbsent}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{report.femaleAbsent}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-green-600 font-medium">{report.presentPercentage}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-red-600 font-medium">{report.absentPercentage}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 text-sm text-gray-500">
                Records: 1 to {searchResults.length} of {searchResults.length}
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No attendance records found for the selected date.</p>
            </div>
          )}
        </div>
      )}
    </div> 
    </>

  );
};

export default DailyAttendanceReport;