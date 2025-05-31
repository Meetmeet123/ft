"use client";
import React, { useState } from 'react';

export default function TransportReport() {
  // Sample JSON data
  const transportData = {
    classes: ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'],
    sections: ['A', 'B', 'C', 'D'],
    routes: [
      'Brooklyn Central',
      'Brooklyn East',
      'Brooklyn West',
      'Brooklyn South',
      'Brooklyn North',
      'Civil Line',
      'Dindayal Chouk',
      'High Court',
      'Railway Station Ranital',
      'Vijay Nagar'
    ],
    pickupPoints: [
      'Brooklyn East',
      'Brooklyn West',
      'Brooklyn South',
      'Brooklyn North'
    ],
    vehicles: ['VH1001', 'VH1002'],
    students: [
      {
        class: 'Class 1 - A',
        admissionNo: '120020',
        studentName: 'Ashwani Kumar',
        mobileNumber: '980678463',
        fatherName: 'Arjun Kumar',
        routeTitle: 'Brooklyn Central',
        vehicleNumber: 'VH1001',
        pickupPoint: 'Brooklyn North',
        driverName: 'Michel',
        driverContact: '8667777699',
        fare: '50.00'
      },
      {
        class: 'Class 1 - A',
        admissionNo: '120021',
        studentName: 'Rahul Sharma',
        mobileNumber: '980678464',
        fatherName: 'Ramesh Sharma',
        routeTitle: 'Brooklyn Central',
        vehicleNumber: 'VH1001',
        pickupPoint: 'Brooklyn North',
        driverName: 'Michel',
        driverContact: '8667777699',
        fare: '50.00'
      },
      {
        class: 'Class 2 - B',
        admissionNo: '120022',
        studentName: 'Priya Patel',
        mobileNumber: '980678465',
        fatherName: 'Vijay Patel',
        routeTitle: 'Brooklyn East',
        vehicleNumber: 'VH1002',
        pickupPoint: 'Brooklyn East',
        driverName: 'John',
        driverContact: '8667777700',
        fare: '45.00'
      }
    ]
  };

  // State for filters
  const [filters, setFilters] = useState({
    class: '',
    section: '',
    route: '',
    pickupPoint: '',
    vehicle: ''
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
    const results = transportData.students.filter(student => {
      const studentClassSection = student.class.split(' - ');
      const studentClass = studentClassSection[0];
      const studentSection = studentClassSection[1];
      
      return (
        (!filters.class || studentClass === filters.class) &&
        (!filters.section || studentSection === filters.section) &&
        (!filters.route || student.routeTitle === filters.route) &&
        (!filters.pickupPoint || student.pickupPoint === filters.pickupPoint) &&
        (!filters.vehicle || student.vehicleNumber === filters.vehicle)
      );
    });
    
    setSearchResults(results);
    setSearched(true);
  };

  // Reset filters
  const handleReset = () => {
    setFilters({
      class: '',
      section: '',
      route: '',
      pickupPoint: '',
      vehicle: ''
    });
    setSearchResults([]);
    setSearched(false);
  };

  return (
    <div className="container mx-auto p-4">
  
      
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
        <div className="flex-1 min-w-[50px]">

            <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
            <select
              name="class"
              value={filters.class}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select </option>
              {transportData.classes.map((cls, index) => (
                <option key={index} value={cls}>{cls}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1 min-w-[50px]">

            <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
            <select
              name="section"
              value={filters.section}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select </option>
              {transportData.sections.map((sec, index) => (
                <option key={index} value={sec}>{sec}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1 min-w-[50px]">

            <label className="block text-sm font-medium text-gray-700 mb-1">Route List</label>
            <select
              name="route"
              value={filters.route}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select </option>
              {transportData.routes.map((route, index) => (
                <option key={index} value={route}>{route}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1 min-w-[50px]">

            <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Point</label>
            <select
              name="pickupPoint"
              value={filters.pickupPoint}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select </option>
              {transportData.pickupPoints.map((point, index) => (
                <option key={index} value={point}>{point}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1 min-w-[50px]">

            <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle</label>
            <select
              name="vehicle"
              value={filters.vehicle}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select </option>
              {transportData.vehicles.map((vehicle, index) => (
                <option key={index} value={vehicle}>{vehicle}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex justify-end mt-4 space-x-2">
        
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-600 text-black rounded hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </div>
      
      {/* Results Section */}
      {searched && (
        <div className="bg-white p-4 rounded shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Student Transport Report</h2>
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admission No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile Number</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Father Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle Number</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pickup Point</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fare ($)</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {searchResults.map((student, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.class}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.admissionNo}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.studentName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.mobileNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.fatherName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.routeTitle}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.vehicleNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.pickupPoint}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.driverName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.driverContact}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.fare}</td>
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