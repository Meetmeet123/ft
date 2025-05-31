"use client";
// pages/certificate-list.js
import React, { useState } from 'react';

export default function CertificateList() {
  // Sample JSON data
  const certificateTypes = [
    "Academic Excellence",
    "Sports Achievement",
    "Participation",
    "Merit Certificate",
    "Character Award"
  ];

  const certificateData = {
    "Academic Excellence": [
      { id: 1, studentName: "John Doe", class: "Class 10(A)", certificateNumber: "CERT-1001" },
      { id: 4, studentName: "Alice Brown", class: "Class 12(A)", certificateNumber: "CERT-1004" }
    ],
    "Sports Achievement": [
      { id: 2, studentName: "Jane Smith", class: "Class 9(B)", certificateNumber: "CERT-1002" }
    ],
    "Participation": [
      { id: 5, studentName: "Michael Wilson", class: "Class 8(C)", certificateNumber: "CERT-1005" }
    ],
    "Merit Certificate": [
      { id: 3, studentName: "Robert Johnson", class: "Class 11(C)", certificateNumber: "CERT-1003" }
    ],
    "Character Award": [
      { id: 6, studentName: "Sarah Davis", class: "Class 7(A)", certificateNumber: "CERT-1006" }
    ]
  };

  const [selectedType, setSelectedType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);

  // Get filtered data based on selection and search
  const getFilteredData = () => {
    if (!selectedType) return [];
    
    let data = certificateData[selectedType] || [];
    
    if (searchTerm) {
      data = data.filter(item => 
        item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return data;
  };

  const filteredData = getFilteredData();

  const handleSearch = () => {
    if (selectedType) {
      setShowResults(true);
    }
  };

  const handleReset = () => {
    setSelectedType("");
    setSearchTerm("");
    setShowResults(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Certificate List</h1>
      
      {/* Certificate Type Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Certificate Type *</label>
        <div className="relative">
          <select
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              setShowResults(false);
            }}
            className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Certificate Type</option>
            {certificateTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>
      </div>
  {/* Action Buttons */}
  <div className="flex space-x-2 mb-6">
        <button
          onClick={handleSearch}
          disabled={!selectedType}
          className={`px-4 py-2 text-black rounded ${
            !selectedType ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          Search
        </button>
       
      </div>
      {/* Search */}
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 border border-gray-300 rounded pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
      
    
      
      {/* Results */}
      {showResults && (
        <div className="bg-white rounded shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#SL</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certificate Number</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.studentName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.class}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.certificateNumber}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                      {searchTerm 
                        ? "No matching records found" 
                        : "No data available for selected certificate type"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 text-sm text-gray-600">
            Records: {filteredData.length > 0 ? 1 : 0} to {filteredData.length} of {filteredData.length}
            {filteredData.length === 0 && (
              <p className="mt-2 text-gray-500">
                Add new record or search with different criteria.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}