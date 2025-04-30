"use client";

import { useState } from 'react';

const AttendanceReport = () => {
  // Dummy data for classes and sections
  const classOptions = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'];
  const sectionOptions = ['A', 'B', 'C', 'D'];
  
  // Dummy student data
  const dummyStudents = [
    {
      admissionNo: 'ADM001',
      studentName: 'Rahul Sharma',
      class: 'Class 1',
      section: 'A',
      fatherName: 'Rajesh Sharma',
      dateOfBirth: '2015-05-10',
      admissionDate: '2020-04-15',
      gender: 'Male',
      mobileNumber: '9876543210',
      attendance: [
        { date: '2023-06-01', status: 'P' },
        { date: '2023-06-02', status: 'P' },
        { date: '2023-06-03', status: 'A' },
        { date: '2023-06-04', status: 'L' },
        { date: '2023-06-05', status: 'P' },
      ]
    },
    {
      admissionNo: 'ADM002',
      studentName: 'Priya Patel',
      class: 'Class 1',
      section: 'A',
      fatherName: 'Sanjay Patel',
      dateOfBirth: '2015-08-22',
      admissionDate: '2020-04-15',
      gender: 'Female',
      mobileNumber: '8765432109',
      attendance: [
        { date: '2023-06-01', status: 'P' },
        { date: '2023-06-02', status: 'A' },
        { date: '2023-06-03', status: 'P' },
        { date: '2023-06-04', status: 'P' },
        { date: '2023-06-05', status: 'H' },
      ]
    },
    {
      admissionNo: 'ADM003',
      studentName: 'Amit Singh',
      class: 'Class 2',
      section: 'B',
      fatherName: 'Vikram Singh',
      dateOfBirth: '2014-11-05',
      admissionDate: '2019-06-10',
      gender: 'Male',
      mobileNumber: '7654321098',
      attendance: [
        { date: '2023-06-01', status: 'L' },
        { date: '2023-06-02', status: 'P' },
        { date: '2023-06-03', status: 'P' },
        { date: '2023-06-04', status: 'A' },
        { date: '2023-06-05', status: 'P' },
      ]
    },
    // Add more dummy data as needed
  ];

  // State for search criteria
  const [searchCriteria, setSearchCriteria] = useState({
    searchType: 'today',
    attendanceType: '',
    class: '',
    section: '',
    searchText: ''
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

  // Filter students based on search criteria
  const filterStudents = () => {
    let results = [...dummyStudents];
    
    // Filter by class if selected
    if (searchCriteria.class) {
      results = results.filter(student => student.class === searchCriteria.class);
    }
    
    // Filter by section if selected
    if (searchCriteria.section) {
      results = results.filter(student => student.section === searchCriteria.section);
    }
    
    // Filter by search text if entered
    if (searchCriteria.searchText) {
      const searchText = searchCriteria.searchText.toLowerCase();
      results = results.filter(student => 
        student.admissionNo.toLowerCase().includes(searchText) ||
        student.studentName.toLowerCase().includes(searchText) ||
        student.fatherName.toLowerCase().includes(searchText) ||
        student.mobileNumber.includes(searchText)
      );
    }
    
    // Filter by attendance type if selected
    if (searchCriteria.attendanceType) {
      const today = new Date().toISOString().split('T')[0];
      
      results = results.map(student => {
        // Filter attendance records based on search type
        let filteredAttendance = [];
        
        if (searchCriteria.searchType === 'today') {
          filteredAttendance = student.attendance.filter(record => record.date === today);
        } else if (searchCriteria.searchType === 'thisWeek') {
          // Get dates for this week (simplified)
          const todayObj = new Date();
          const startOfWeek = new Date(todayObj.setDate(todayObj.getDate() - todayObj.getDay()));
          const endOfWeek = new Date(todayObj.setDate(todayObj.getDate() + 6));
          
          filteredAttendance = student.attendance.filter(record => {
            const recordDate = new Date(record.date);
            return recordDate >= startOfWeek && recordDate <= endOfWeek;
          });
        } else if (searchCriteria.searchType === 'lastWeek') {
          // Get dates for last week (simplified)
          const todayObj = new Date();
          const startOfLastWeek = new Date(todayObj.setDate(todayObj.getDate() - todayObj.getDay() - 7));
          const endOfLastWeek = new Date(todayObj.setDate(todayObj.getDate() + 6));
          
          filteredAttendance = student.attendance.filter(record => {
            const recordDate = new Date(record.date);
            return recordDate >= startOfLastWeek && recordDate <= endOfLastWeek;
          });
        }
        
        // Filter by attendance status
        if (searchCriteria.attendanceType) {
          filteredAttendance = filteredAttendance.filter(record => 
            record.status === searchCriteria.attendanceType
          );
        }
        
        return {
          ...student,
          filteredAttendance
        };
      }).filter(student => student.filteredAttendance.length > 0);
    }
    
    setSearchResults(results);
    setShowResults(true);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    filterStudents();
  };

  // Reset form
  const handleReset = () => {
    setSearchCriteria({
      searchType: 'today',
      attendanceType: '',
      class: '',
      section: '',
      searchText: ''
    });
    setSearchResults([]);
    setShowResults(false);
  };

  // Get attendance status full name
  const getAttendanceStatus = (status) => {
    switch(status) {
      case 'P': return 'Present';
      case 'A': return 'Absent';
      case 'L': return 'Late';
      case 'H': return 'Half Day';
      default: return status;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Student Attendance Report</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Select Criteria</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Search Type</h3>
            <div className="flex flex-wrap gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time Period*</label>
                <select
                  name="searchType"
                  value={searchCriteria.searchType}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="today">Today</option>
                  <option value="thisWeek">This Week</option>
                  <option value="lastWeek">Last Week</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Attendance Type*</label>
                <select
                  name="attendanceType"
                  value={searchCriteria.attendanceType}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">All</option>
                  <option value="P">Present (P)</option>
                  <option value="A">Absent (A)</option>
                  <option value="L">Late (L)</option>
                  <option value="H">Half Day (H)</option>
                </select>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                <select
                  name="class"
                  value={searchCriteria.class}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">All Classes</option>
                  {classOptions.map((cls, index) => (
                    <option key={index} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                <select
                  name="section"
                  value={searchCriteria.section}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">All Sections</option>
                  {sectionOptions.map((sec, index) => (
                    <option key={index} value={sec}>{sec}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Search...</h3>
            <input
              type="text"
              name="searchText"
              value={searchCriteria.searchText}
              onChange={handleInputChange}
              placeholder="Search by Admission No, Name, Father Name, Mobile..."
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="flex gap-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Search
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
      
      {showResults && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Search Results</h2>
          
          {searchResults.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admission No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Section</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Father Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {searchResults.map((student, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">{student.admissionNo}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{student.studentName}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{student.class}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{student.section}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{student.fatherName}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {student.filteredAttendance ? (
                          <ul>
                            {student.filteredAttendance.map((att, idx) => (
                              <li key={idx}>
                                {att.date}: {getAttendanceStatus(att.status)}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span>No attendance records</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No results found matching your criteria.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AttendanceReport;