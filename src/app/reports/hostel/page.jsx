"use client";
import { useState } from 'react';

export default function HostelReport() {
  // Sample JSON data
  const hostelData = {
    classes: ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'],
    sections: ['A', 'B', 'C', 'D'],
    hostels: [
      'Boys Hostel 101',
      'Boys Hostel 102',
      'Girls Hostel 103',
      'Girls Hostel 104'
    ],
    roomTypes: ['One Bed', 'Two Bed', 'Three Bed', 'Four Bed'],
    students: [
      {
        class: 'Class 1 - A',
        admissionNo: '18078',
        studentName: 'Alexander Kayla',
        mobileNumber: '8854114725',
        guardianPhone: '996857412',
        hostelName: 'Boys Hostel 101',
        roomNumber: 'B1',
        roomType: 'One Bed',
        costPerBed: '300.00'
      },
      {
        class: 'Class 1 - A',
        admissionNo: '18088',
        studentName: 'Andrew Donna',
        mobileNumber: '90676778564',
        guardianPhone: '635855245',
        hostelName: 'Boys Hostel 101',
        roomNumber: 'B1',
        roomType: 'One Bed',
        costPerBed: '300.00'
      },
      {
        class: 'Class 1 - A',
        admissionNo: '326260',
        studentName: 'Arpit Patel',
        mobileNumber: '95447744551',
        guardianPhone: '849401561',
        hostelName: 'Boys Hostel 101',
        roomNumber: 'B1',
        roomType: 'One Bed',
        costPerBed: '300.00'
      },
      {
        class: 'Class 1 - A',
        admissionNo: '120020',
        studentName: 'Ashwani Kumar',
        mobileNumber: '980678463',
        guardianPhone: '789678456',
        hostelName: 'Boys Hostel 101',
        roomNumber: 'B1',
        roomType: 'One Bed',
        costPerBed: '300.00'
      },
      {
        class: 'Class 2 - B',
        admissionNo: '120021',
        studentName: 'Rahul Sharma',
        mobileNumber: '980678464',
        guardianPhone: '789678457',
        hostelName: 'Boys Hostel 102',
        roomNumber: 'B2',
        roomType: 'Two Bed',
        costPerBed: '250.00'
      },
      {
        class: 'Class 3 - C',
        admissionNo: '120022',
        studentName: 'Priya Patel',
        mobileNumber: '980678465',
        guardianPhone: '789678458',
        hostelName: 'Girls Hostel 103',
        roomNumber: 'G1',
        roomType: 'One Bed',
        costPerBed: '350.00'
      }
    ]
  };

  // State for filters
  const [filters, setFilters] = useState({
    class: '',
    section: '',
    hostelName: ''
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
    const results = hostelData.students.filter(student => {
      const studentClassSection = student.class.split(' - ');
      const studentClass = studentClassSection[0];
      const studentSection = studentClassSection[1];
      
      return (
        (!filters.class || studentClass === filters.class) &&
        (!filters.section || studentSection === filters.section) &&
        (!filters.hostelName || student.hostelName === filters.hostelName)
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
      hostelName: ''
    });
    setSearchResults([]);
    setSearched(false);
  };

  return (
    <div className="container mx-auto p-4">
      {/* <h1 className="text-2xl font-bold mb-6">Student Hostel Report</h1> */}
      
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
                 <div className="flex-1 min-w-[100px]">

            <label className="block text-sm font-medium text-gray-700 mb-1">Class *</label>
            <select
              name="class"
              value={filters.class}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Select Class</option>
              {hostelData.classes.map((cls, index) => (
                <option key={index} value={cls}>{cls}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1 min-w-[100px]">

            <label className="block text-sm font-medium text-gray-700 mb-1">Section *</label>
            <select
              name="section"
              value={filters.section}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Select Section</option>
              {hostelData.sections.map((sec, index) => (
                <option key={index} value={sec}>{sec}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1 min-w-[100px]">

            <label className="block text-sm font-medium text-gray-700 mb-1">Hostel Name</label>
            <select
              name="hostelName"
              value={filters.hostelName}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select Hostel</option>
              {hostelData.hostels.map((hostel, index) => (
                <option key={index} value={hostel}>{hostel}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex justify-end mt-4 space-x-2">
          
          <button
            onClick={handleSearch}
            disabled={!filters.class || !filters.section}
            className={`px-4 py-2 text-black rounded ${
              !filters.class || !filters.section 
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
            <h2 className="text-xl font-semibold">Student Hostel Report</h2>
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class (Section)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admission No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile Number</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guardian Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hostel Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room Number / Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost Per Bed ($)</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {searchResults.map((student, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.class}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.admissionNo}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.studentName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.mobileNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.guardianPhone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.hostelName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.roomNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.roomType}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.costPerBed}</td>
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