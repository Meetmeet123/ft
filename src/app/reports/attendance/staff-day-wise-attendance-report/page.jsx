"use client";

import React, { useState } from 'react';
import Attendance from '../page';

const StaffAttendanceReport = () => {
  // Dummy JSON data
  const dummyData = {
    roles: ['Admin','Receptionist', 'Teacher', 'Accountant', 'Super Admin'],
    sources: ['Manual', 'Biometric', 'Mobile App'],
    staff: [
      {
        id: 1,
        staffId: 9005,
        role: 'Receptionist',
        name: 'Maria Ford',
        attendance: 'Present',
        date: '04/01/2025',
        source: 'Manual',
        ipAddress: '192.168.1.100',
        agent: 'Chrome/Windows',
        scanLocation: 'Main Gate'
      },
      {
        id: 2,
        staffId: 9006,
        role: 'Admin',
        name: 'John Smith',
        attendance: 'Present',
        date: '04/01/2025',
        source: 'Biometric',
        ipAddress: '192.168.1.101',
        agent: 'Firefox/Windows',
        scanLocation: 'Admin Block'
      },
      {
        id: 3,
        staffId: 9007,
        role: 'Teacher',
        name: 'Sarah Johnson',
        attendance: 'Late',
        date: '04/01/2025',
        source: 'Mobile App',
        ipAddress: '192.168.1.102',
        agent: 'Safari/iOS',
        scanLocation: 'Classroom 5'
      }
    ]
  };

  // State for search criteria
  const [searchCriteria, setSearchCriteria] = useState({
    role: 'Receptionist',
    date: '04/01/2025',
    source: 'Manual'
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
    // Format the date to match dummy data format (MM/DD/YYYY)
    const formattedDate = new Date(searchCriteria.date).toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
    
    const results = dummyData.staff.filter(staff => 
      staff.role === searchCriteria.role &&
      staff.date === formattedDate &&
      staff.source === searchCriteria.source
    );
    setSearchResults(results);
    setShowResults(true);
  };

  // Reset form
  const handleReset = () => {
    setSearchCriteria({
      role: 'Receptionist',
      date: '04/01/2025',
      source: 'Manual'
    });
    setSearchResults([]);
    setShowResults(false);
  };

  return ( <> <Attendance/>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Staff Day Wise Attendance Report</h1>
      
      {/* Search Criteria */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Select Criteria</h2>
        
        <div className="flex flex-wrap gap-4 items-end">
          <div style={{width:'250px'}}>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              name="role"
              value={searchCriteria.role}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              {dummyData.roles.map((role, index) => (
                <option key={index} value={role}>{role}</option>
              ))}
            </select>
          </div>
          
          <div style={{width:'250px'}}>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={searchCriteria.date}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div style={{width:'250px'}}>
            <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
            <select
              name="source"
              value={searchCriteria.source}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              {dummyData.sources.map((source, index) => (
                <option key={index} value={source}>{source}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex gap-4 mt-4">
          <button
            onClick={handleSearch}
            // className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agent</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scan Location</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {searchResults.length > 0 ? (
                  searchResults.map((staff, index) => (
                    <tr key={staff.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{staff.staffId}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{staff.role}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{staff.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{staff.attendance}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{staff.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{staff.source}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{staff.ipAddress}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{staff.agent}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{staff.scanLocation}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="px-6 py-4 text-center text-gray-500">
                      No data available in table
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {searchResults.length > 0 && (
            <div className="mt-4 text-sm text-gray-500">
              Records: 1 to {searchResults.length} of {searchResults.length}
            </div>
          )}
        </div>
      )}
    </div>
    </>
  );
};

export default StaffAttendanceReport;