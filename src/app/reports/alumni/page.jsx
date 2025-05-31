"use client";
import React, { useState } from 'react';

export default function AlumniReport() {
  // Sample JSON data
  const alumniData = {
    passOutSessions: Array.from({length: 14}, (_, i) => `${2016 + i}-${17 + i}`), // 2016-17 to 2029-30
    classes: ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'],
    sections: ['A', 'B', 'C', 'D', 'E'],
    alumni: [
      {
        admissionNo: '7663',
        studentName: 'Paul S. Bealer',
        class: 'Class 1(A)',
        gender: 'Male',
        email: 'paul22@gmail.com',
        dob: '08/13/2005',
        address: 'Mr Road 40, Delhi',
        occupation: 'Student',
        phone: '890879789',
        passOutSession: '2024-25'
      },
      {
        admissionNo: '7664',
        studentName: 'John Doe',
        class: 'Class 2(B)',
        gender: 'Male',
        email: 'john.doe@example.com',
        dob: '05/21/2004',
        address: '123 Main St, Mumbai',
        occupation: 'Software Engineer',
        phone: '9876543210',
        passOutSession: '2023-24'
      },
      {
        admissionNo: '7665',
        studentName: 'Jane Smith',
        class: 'Class 3(C)',
        gender: 'Female',
        email: 'jane.smith@example.com',
        dob: '11/30/2003',
        address: '456 Oak Ave, Bangalore',
        occupation: 'Doctor',
        phone: '8765432109',
        passOutSession: '2022-23'
      },
      {
        admissionNo: '7666',
        studentName: 'Robert Johnson',
        class: 'Class 1(A)',
        gender: 'Male',
        email: 'robert.j@example.com',
        dob: '02/15/2005',
        address: '789 Pine Rd, Kolkata',
        occupation: 'Engineer',
        phone: '7654321098',
        passOutSession: '2024-25'
      }
    ]
  };

  // State for filters
  const [filters, setFilters] = useState({
    passOutSession: '',
    class: '',
    section: ''
  });

  // State for search results
  const [searchResults, setSearchResults] = useState([]);
  const [searched, setSearched] = useState(false);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle search
  const handleSearch = () => {
    const results = alumniData.alumni.filter(alumni => {
      const alumniClassSection = alumni.class.match(/Class (\d+)\(([A-Z])\)/);
      const alumniClass = alumniClassSection ? `Class ${alumniClassSection[1]}` : '';
      const alumniSection = alumniClassSection ? alumniClassSection[2] : '';
      
      return (
        (!filters.passOutSession || alumni.passOutSession === filters.passOutSession) &&
        (!filters.class || alumniClass === filters.class) &&
        (!filters.section || alumniSection === filters.section)
      );
    });
    
    setSearchResults(results);
    setSearched(true);
  };

  // Reset filters
  const handleReset = () => {
    setFilters({
      passOutSession: '',
      class: '',
      section: ''
    });
    setSearchResults([]);
    setSearched(false);
  };

  return (
    <div className="container mx-auto p-4">
      {/* <h1 className="text-2xl font-bold mb-6">Alumni Pass Out Report</h1> */}
      
      {/* Filter Section */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Select Criteria</h2>
        
        <div style={{ 
        backgroundColor: '#f3f4f6', 
        padding: '15px', 
        borderRadius: '8px', 
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        flexWrap: 'wrap'
      }}>
        
          <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Pass Out Session *</label>
            <select
              name="passOutSession"
              value={filters.passOutSession}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Select </option>
              {alumniData.passOutSessions.map((session, index) => (
                <option key={index} value={session}>{session}</option>
              ))}
            </select>
            </div>
            <div className="flex-1 min-w-[200px]">

            <label className="block text-sm font-medium text-gray-700 mb-1">Class *</label>
            <select
              name="class"
              value={filters.class}
              onChange={handleFilterChange}
              className=" w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select Class</option>
              {alumniData.classes.map((cls, index) => (
                <option key={index} value={cls}>{cls}</option>
              ))}
            </select>
            </div>
            <div className="flex-1 min-w-[200px]">

            <label className="block text-sm font-medium text-gray-700 mb-1">Section *</label>
            <select
              name="section"
              value={filters.section}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select Section</option>
              {alumniData.sections.map((sec, index) => (
                <option key={index} value={sec}>{sec}</option>
              ))}
            </select>
            </div>
          </div>
       
        
        <div className="flex justify-end mt-4 space-x-2">
          
          <button
            onClick={handleSearch}
            disabled={!filters.passOutSession}
            className={`px-4 py-2 text-black
                 rounded ${
              !filters.passOutSession
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            Search
          </button>
        </div>
        </div>
      
      {/* Results Section */}
      {searched && (
        <div className="bg-white p-4 rounded shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Alumni Pass Out Report</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="p-2 border border-gray-300 rounded pl-8"
              />
              <svg
                className="absolute left-2 top-3 h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
          </div>
          
          {searchResults.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admission No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Birth</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Address</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Occupation</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Phone</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {searchResults.map((alumni, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{alumni.admissionNo}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{alumni.studentName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{alumni.class}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{alumni.gender}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{alumni.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{alumni.dob}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{alumni.address}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{alumni.occupation}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{alumni.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 text-sm text-gray-600">
                Records: {searchResults.length} of {searchResults.length}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No records found matching your criteria.
            </div>
          )}
        </div>
      )}
    </div>
  );
}