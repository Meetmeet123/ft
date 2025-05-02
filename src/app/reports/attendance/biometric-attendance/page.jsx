"use client";
import { useState } from 'react';
import Attendance from '../page';

const BiometricAttendance = () => {
  // Dummy JSON data
  const dummyData = [
    {
      id: 1,
      admissionNo: 'ADM2023001',
      studentName: 'Rahul Sharma',
      ipAddress: '192.168.1.101',
      lastAttendance: '2023-06-15 08:45:23'
    },
    {
      id: 2,
      admissionNo: 'ADM2023002',
      studentName: 'Priya Patel',
      ipAddress: '192.168.1.102',
      lastAttendance: '2023-06-15 08:42:10'
    },
    {
      id: 3,
      admissionNo: 'ADM2023003',
      studentName: 'Amit Singh',
      ipAddress: '192.168.1.103',
      lastAttendance: '2023-06-15 08:50:45'
    },
    {
      id: 4,
      admissionNo: 'ADM2023004',
      studentName: 'Neha Gupta',
      ipAddress: '192.168.1.104',
      lastAttendance: '2023-06-15 08:39:12'
    },
    {
      id: 5,
      admissionNo: 'ADM2023005',
      studentName: 'Vikram Joshi',
      ipAddress: '192.168.1.105',
      lastAttendance: '2023-06-15 08:47:33'
    }
  ];

  // State for search term and filtered data
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(dummyData);

  // Handle search
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term === '') {
      setFilteredData(dummyData);
    } else {
      const filtered = dummyData.filter(
        student =>
          student.admissionNo.toLowerCase().includes(term) ||
          student.studentName.toLowerCase().includes(term) ||
          student.ipAddress.toLowerCase().includes(term)
      );
      setFilteredData(filtered);
    }
  };

  return (
    <> <Attendance/>
    <div className="container mx-auto p-4" style={{width:'100%'}}>
      <h1 className="text-2xl font-bold mb-6">Biometric Attendance</h1>
      
      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      
      {/* Attendance Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admission No</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Attendance</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.length > 0 ? (
              filteredData.map((student) => (
                <tr key={student.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{student.admissionNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.studentName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.ipAddress}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.lastAttendance}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  No data available in table
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default BiometricAttendance;