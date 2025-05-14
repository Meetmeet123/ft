"use client";
import { useState } from 'react';

export default function StudentIDCardSystem() {
  // Dummy student data
  const dummyStudents = [
    {
      admissionNo: '0001',
      studentName: 'Shri Krishna Surya',
      className: 'CLASS 10TH',
      section: 'A',
      fatherName: 'Dollar Name',
      motherName: 'Mother Name',
      dob: '01-04-2005',
      gender: 'Male',
      category: 'General',
      mobileNumber: '456850',
      currentAddress: '110 Kings Street, CA',
      bloodGroup: 'A+',
      email: 'info@shririshnasurbanismaratha.com',
      schoolName: 'Mount Carmel School',
      schoolPhone: '(8775)62707',
      schoolWebsite: 'www.shririshnasurbanismaratha.com',
      schoolEmail: 'info@shririshnasurbanismaratha.com'
    },
    {
      admissionNo: '0002',
      studentName: 'John Doe',
      className: 'CLASS 6TH',
      section: 'B',
      fatherName: 'Michael Doe',
      motherName: 'Sarah Doe',
      dob: '15-06-2010',
      gender: 'Male',
      category: 'OBC',
      mobileNumber: '9876543210',
      currentAddress: '221 Baker Street, London',
      bloodGroup: 'B+',
      email: 'john@example.com',
      schoolName: 'Mount',
      schoolPhone: '(8775)62707',
      schoolWebsite: 'www.shririshnasurbanismaratha.com',
      schoolEmail: 'info@shririshnasurbanismaratha.com'
    }
  ];

  // ID card types
  const idCardTypes = [
    'Sample Student Identity Card Horizontal',
    'Sample Student Identity Card Vertical',
    'Mount School ID Card'
  ];

  // State variables
  const [students] = useState(dummyStudents);
  const [filteredStudents, setFilteredStudents] = useState(dummyStudents);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedIdCardType, setSelectedIdCardType] = useState(idCardTypes[2]); // Default to Mount School ID Card
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [showIdCards, setShowIdCards] = useState(false);
  const [columns, setColumns] = useState({
    admissionNo: true,
    studentName: true,
    class: true,
    fatherName: true,
    motherName: false,
    dob: true,
    gender: false,
    category: false,
    mobileNumber: true,
    currentAddress: true
  });

  // Get unique classes and sections for dropdowns
  const classes = [...new Set(dummyStudents.map(student => student.className))];
  const sections = [...new Set(dummyStudents.map(student => student.section))];

  // Filter students based on class, section, and search keyword
  const filterStudents = () => {
    let filtered = [...students];

    if (selectedClass) {
      filtered = filtered.filter(student => student.className === selectedClass);
    }

    if (selectedSection) {
      filtered = filtered.filter(student => student.section === selectedSection);
    }

    if (searchKeyword) {
      const keyword = searchKeyword.toLowerCase();
      filtered = filtered.filter(student =>
        student.studentName.toLowerCase().includes(keyword) ||
        student.admissionNo.includes(keyword) ||
        student.mobileNumber.includes(keyword)
      );
    }

    setFilteredStudents(filtered);
  };

  // Handle search button click
  const handleSearch = () => {
    filterStudents();
  };

  // Toggle student selection
  const toggleStudentSelection = (admissionNo) => {
    setSelectedStudents(prev => {
      if (prev.includes(admissionNo)) {
        return prev.filter(id => id !== admissionNo);
      } else {
        return [...prev, admissionNo];
      }
    });
  };

  // Toggle select all students
  const toggleSelectAll = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map(student => student.admissionNo));
    }
  };

  // Generate ID cards
  const handleGenerateIdCards = () => {
    if (selectedStudents.length > 0) {
      setShowIdCards(true);
    }
  };

  // Close ID cards view
  const handleCloseIdCards = () => {
    setShowIdCards(false);
  };

  // Toggle column visibility
  const toggleColumn = (column) => {
    setColumns(prev => ({
      ...prev,
      [column]: !prev[column]
    }));
  };

  // Format date
  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="container mx-auto p-4">
      {!showIdCards ? (
        <>
          <h1 className="text-2xl font-bold mb-6">Select Criteria</h1>
          
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
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

                <label className="block text-sm font-medium text-gray-700">Class *</label>
                <select
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                >
                  <option value="">Select Class</option>
                  {classes.map((cls, index) => (
                    <option key={index} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex-1 min-w-[200px]">

                <label className="block text-sm font-medium text-gray-700">Section</label>
                <select
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                >
                  <option value="">Select Section</option>
                  {sections.map((sec, index) => (
                    <option key={index} value={sec}>{sec}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex-1 min-w-[200px]">

                <label className="block text-sm font-medium text-gray-700">ID Card Type *</label>
                <select
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={selectedIdCardType}
                  onChange={(e) => setSelectedIdCardType(e.target.value)}
                >
                  {idCardTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <button
                  className="bg-blue-500 text-black px-4 py-2 rounded-md hover:bg-blue-600 w-full"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          
         
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Student List</h2>
            
            <div className="mb-4">
              <input
                type="text"
                className="p-2 border border-gray-300 rounded-md w-full md:w-1/3"
                placeholder="Search..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 border">
                      <input
                        type="checkbox"
                        checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                        onChange={toggleSelectAll}
                        className="h-4 w-4 text-blue-600 rounded"
                      />
                    </th>
                    {columns.admissionNo && <th className="py-2 px-4 border">Admission No</th>}
                    {columns.studentName && <th className="py-2 px-4 border">Student Name</th>}
                    {columns.class && <th className="py-2 px-4 border">Class</th>}
                    {columns.fatherName && <th className="py-2 px-4 border">Father Name</th>}
                    {columns.motherName && <th className="py-2 px-4 border">Mother Name</th>}
                    {columns.dob && <th className="py-2 px-4 border">Date of Birth</th>}
                    {columns.gender && <th className="py-2 px-4 border">Gender</th>}
                    {columns.category && <th className="py-2 px-4 border">Category</th>}
                    {columns.mobileNumber && <th className="py-2 px-4 border">Mobile Number</th>}
                    {columns.currentAddress && <th className="py-2 px-4 border">Current Address</th>}
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="py-2 px-4 border">
                          <input
                            type="checkbox"
                            checked={selectedStudents.includes(student.admissionNo)}
                            onChange={() => toggleStudentSelection(student.admissionNo)}
                            className="h-4 w-4 text-blue-600 rounded"
                          />
                        </td>
                        {columns.admissionNo && <td className="py-2 px-4 border">{student.admissionNo}</td>}
                        {columns.studentName && <td className="py-2 px-4 border">{student.studentName}</td>}
                        {columns.class && <td className="py-2 px-4 border">{student.className}({student.section})</td>}
                        {columns.fatherName && <td className="py-2 px-4 border">{student.fatherName}</td>}
                        {columns.motherName && <td className="py-2 px-4 border">{student.motherName}</td>}
                        {columns.dob && <td className="py-2 px-4 border">{student.dob}</td>}
                        {columns.gender && <td className="py-2 px-4 border">{student.gender}</td>}
                        {columns.category && <td className="py-2 px-4 border">{student.category}</td>}
                        {columns.mobileNumber && <td className="py-2 px-4 border">{student.mobileNumber}</td>}
                        {columns.currentAddress && <td className="py-2 px-4 border">{student.currentAddress}</td>}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={Object.values(columns).filter(Boolean).length + 1} className="py-4 px-4 border text-center">
                        No students found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 text-gray-600">
              Records: {filteredStudents.length > 0 ? 1 : 0} to {filteredStudents.length} of {filteredStudents.length}
            </div>
            
            <div className="mt-6">
              <button
                className={`px-4 py-2 rounded-md ${selectedStudents.length > 0 ? 'bg-green-500 hover:bg-green-600 text-black' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                onClick={handleGenerateIdCards}
                disabled={selectedStudents.length === 0}
              >
                Generate ID Cards ({selectedStudents.length})
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">{selectedIdCardType}</h2>
            <div>
              <button
                className="bg-gray-500 text-black px-4 py-2 rounded hover:bg-gray-600 mr-2"
                onClick={handleCloseIdCards}
              >
                Back
              </button>
              <button
                className="bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => window.print()}
              >
                Print
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredStudents
              .filter(student => selectedStudents.includes(student.admissionNo))
              .map((student, index) => (
                <div key={index} className="border-2 border-gray-300 p-6 rounded-lg">
                  {/* Mount School ID Card Design */}
                  <div className="text-center mb-4">
                   <div className="flex justify-center mt-4">
                    <div className="w-24 h-24 border-2 border-dashed border-gray-400 flex items-center justify-center">
                      <span className="text-gray-500">Photo</span>
                    </div>
                  </div>
                    <h2 className="text-xl mt-1">{student.schoolName}</h2>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                      <p className="font-semibold">Student Name:</p>
                      <p>{student.studentName}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Admission No:</p>
                      <p>{student.admissionNo}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Class:</p>
                      <p>{student.className}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Father Name:</p>
                      <p>{student.fatherName}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Phone:</p>
                      <p>{student.mobileNumber}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Blood Group:</p>
                      <p>{student.bloodGroup}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="font-semibold">Address:</p>
                    <p>{student.currentAddress}</p>
                  </div>
                  
                  <div className="text-sm">
                    <p>Email: {student.email}</p>
                    <p>Fax: {student.schoolPhone}</p>
                    <p>{student.schoolWebsite}</p>
                  </div>
                  
                  {/* Student Photo Placeholder */}
                  
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}