"use client";
import React, { useState } from 'react';
import { FaSearch, FaUserFriends } from 'react-icons/fa';

export default function LiveClassReport() {
  // Dummy data for classes and sections
  const classOptions = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'];
  const sectionOptions = ['A', 'B', 'C', 'D'];

  // Dummy data for live class reports
  const liveClassData = [
    {
      id: 1,
      classTitle: "Online Course Class",
      description: "English Extra Classes",
      dateTime: "05/12/2025 02:00:00",
      createdBy: "Self",
      createdFor: "Jason Sharlton (Teacher : 90006)",
      totalJoin: 2,
      joinList: [
        { admissionNo: 96302, studentName: "Jacob Bethell", fatherName: "Brydon", lastJoin: "05/01/2025 07:18:20" },
        { admissionNo: 120036, studentName: "Ayan Desai", fatherName: "Abhinand", lastJoin: "05/01/2025 07:18:08" }
      ]
    },
    {
      id: 2,
      classTitle: "Online Course Class",
      description: "English Extra Classes",
      dateTime: "04/08/2025 03:30:00",
      createdBy: "Self",
      createdFor: "Albert Thomas (Teacher : 54545454)",
      totalJoin: 3,
      joinList: [
        { admissionNo: 96302, studentName: "Jacob Bethell", fatherName: "Brydon", lastJoin: "04/08/2025 03:29:45" },
        { admissionNo: 120036, studentName: "Ayan Desai", fatherName: "Abhinand", lastJoin: "04/08/2025 03:30:12" },
        { admissionNo: 120037, studentName: "Rahul Sharma", fatherName: "Vikram", lastJoin: "04/08/2025 03:31:05" }
      ]
    }
  ];

  // State management
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [reports, setReports] = useState([]);
  const [showJoinList, setShowJoinList] = useState(false);
  const [currentJoinList, setCurrentJoinList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Handle search
  const handleSearch = () => {
    if (selectedClass && selectedSection) {
      setReports(liveClassData);
    }
  };

  // Handle show join list
  const handleShowJoinList = (joinList) => {
    setCurrentJoinList(joinList);
    setShowJoinList(true);
  };

  // Filter join list based on search term
  const filteredJoinList = currentJoinList.filter(student =>
    student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.admissionNo.toString().includes(searchTerm) ||
    student.fatherName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Live Class Report</h1>
        
        {/* Select Criteria */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Select Criteria</h2>
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

              <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
              <select
                className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="">Select Class</option>
                {classOptions.map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>
            <div className="flex-1 min-w-[200px]">

              <label className="block text-sm font-medium text-gray-700 mb-1">Section *</label>
              <select
                className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                required
              >
                <option value="">Select Section</option>
                {sectionOptions.map(sec => (
                  <option key={sec} value={sec}>{sec}</option>
                ))}
              </select>
            </div>
            <button
            onClick={handleSearch}
            disabled={!selectedClass || !selectedSection}
            className="mt-4 bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Search
          </button>
          </div>
         
        </div>

        {/* Reports Table - Only shown after search */}
        {reports.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created By</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created For</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Join</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reports.map(report => (
                    <tr key={report.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.classTitle}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{report.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.dateTime}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.createdBy}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{report.createdFor}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.totalJoin}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() => handleShowJoinList(report.joinList)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="View Join List"
                        >
                          <FaUserFriends />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Join List Modal */}
        {showJoinList && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl">
              <h2 className="text-xl font-bold mb-4">Join List</h2>
              
              <div className="flex items-center mb-4">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admission No</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Father Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Join</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredJoinList.length > 0 ? (
                      filteredJoinList.map((student, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.admissionNo}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.studentName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.fatherName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.lastJoin}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                          No students found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  onClick={() => {
                    setShowJoinList(false);
                    setSearchTerm('');
                  }}
                  className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}