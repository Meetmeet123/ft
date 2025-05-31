"use client";
import React, { useState } from 'react';

export default function TransferCertificateSystem() {
  // Dummy student data
  const dummyStudents = [
    {
      admissionNo: '1205',
      studentName: 'Hazel Mayer',
      className: 'Class 2',
      section: 'B',
      fatherName: 'Lister',
      motherName: 'Mother Name',
      dob: '06/19/2019',
      gender: 'Female',
      category: 'General',
      cast: 'General',
      religion: 'Hindu',
      email: 'hazel@example.com',
      phone: '6595048420',
      rollNo: '0203',
      admissionDate: '04/02/2024',
      currentAddress: '23, Kings Street, CA'
    },
    {
      admissionNo: '5482',
      studentName: 'Vinni Khatri',
      className: 'Class 2',
      section: 'B',
      fatherName: 'Suresh',
      motherName: 'Mother Name',
      dob: '06/13/2019',
      gender: 'Male',
      category: 'OBC',
      cast: 'OBC',
      religion: 'Hindu',
      email: 'vinni@example.com',
      phone: '5350648401',
      rollNo: '0204',
      admissionDate: '04/02/2024',
      currentAddress: '24, Kings Street, CA'
    },
    {
      admissionNo: '980867',
      studentName: 'Medison',
      className: 'Class 2',
      section: 'B',
      fatherName: 'Father Name',
      motherName: 'Mother Name',
      dob: '01/07/2019',
      gender: 'Female',
      category: 'SC',
      cast: 'SC',
      religion: 'Christian',
      email: 'medison@example.com',
      phone: '89089795',
      rollNo: '0205',
      admissionDate: '04/02/2024',
      currentAddress: '25, Kings Street, CA'
    }
  ];

  // Certificate types
  const certificateTypes = [
    'Sample Transfer Certificate',
    'Sample Bonafide Certificate',
    'Sample Character Certificate'
  ];

  // State variables
  const [students] = useState(dummyStudents);
  const [filteredStudents, setFilteredStudents] = useState(dummyStudents);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedCertificate, setSelectedCertificate] = useState(certificateTypes[0]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [showCertificate, setShowCertificate] = useState(false);
  const [columns, setColumns] = useState({
    admissionNo: true,
    studentName: true,
    class: true,
    fatherName: true,
    dob: true,
    gender: true,
    category: true,
    phone: true
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
        student.phone.includes(keyword)
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

  // Generate certificates
  const handleGenerateCertificates = () => {
    if (selectedStudents.length > 0) {
      setShowCertificate(true);
    }
  };

  // Close certificates view
  const handleCloseCertificates = () => {
    setShowCertificate(false);
  };

  // Toggle column visibility
  const toggleColumn = (column) => {
    setColumns(prev => ({
      ...prev,
      [column]: !prev[column]
    }));
  };

  return (
    <div className="container mx-auto p-4">
      {!showCertificate ? (
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

                <label className="block text-sm font-medium text-gray-700">Certificate *</label>
                <select
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={selectedCertificate}
                  onChange={(e) => setSelectedCertificate(e.target.value)}
                >
                  {certificateTypes.map((type, index) => (
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
                    {columns.dob && <th className="py-2 px-4 border">Date of Birth</th>}
                    {columns.gender && <th className="py-2 px-4 border">Gender</th>}
                    {columns.category && <th className="py-2 px-4 border">Category</th>}
                    {columns.phone && <th className="py-2 px-4 border">Phone</th>}
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
                        {columns.dob && <td className="py-2 px-4 border">{student.dob}</td>}
                        {columns.gender && <td className="py-2 px-4 border">{student.gender}</td>}
                        {columns.category && <td className="py-2 px-4 border">{student.category}</td>}
                        {columns.phone && <td className="py-2 px-4 border">{student.phone}</td>}
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
                onClick={handleGenerateCertificates}
                disabled={selectedStudents.length === 0}
              >
                Generate Certificates ({selectedStudents.length})
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">{selectedCertificate}</h2>
            <button
              className="bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => window.print()}
            >
              Print
            </button>
          </div>
          
          {filteredStudents
            .filter(student => selectedStudents.includes(student.admissionNo))
            .map((student, index) => (
              <div key={index} className="mb-8">
                {/* Certificate Design matching your screenshot */}
                <div className="text-center mb-4">
                  <h1 className="text-xl font-bold">Mount Carmel School</h1>
                  <p className="text-sm">23, Kings Street, CA, Phone: 0916-6766-144</p>
                </div>
                
                <div className="text-center mb-6">
                  <h2 className="text-lg font-semibold">To Whomever It May Concern</h2>
                </div>
                
                <div className="mb-6">
                  <p className="mb-4">
                    This is certify that <span className="font-bold">{student.studentName}</span> has born on <span className="font-bold">{student.dob}</span>
                    and have following details:
                  </p>
                  
                  <div className="space-y-2">
                    <p><span className="font-semibold">Present Address:</span> {student.currentAddress}</p>
                    <p><span className="font-semibold">Guardian:</span> {student.fatherName}</p>
                    <p><span className="font-semibold">Admission No:</span> {student.admissionNo}</p>
                    <p><span className="font-semibold">Roll No:</span> {student.rollNo}</p>
                    <p><span className="font-semibold">Class:</span> {student.className} {student.section}</p>
                    <p><span className="font-semibold">Former Admission Date:</span> {student.admissionDate}</p>
                    <p><span className="font-semibold">Category:</span> {student.category}</p>
                    <p><span className="font-semibold">Cast:</span> {student.cast}</p>
                    <p><span className="font-semibold">Father Name:</span> {student.fatherName}</p>
                    <p><span className="font-semibold">Mother Name:</span> {student.motherName}</p>
                    <p><span className="font-semibold">Religion:</span> {student.religion}</p>
                    <p><span className="font-semibold">Email:</span> {student.email}</p>
                    <p><span className="font-semibold">Phone:</span> {student.phone}</p>
                  </div>
                  
                  <p className="mt-4">We wish best of luck for future endeavors.</p>
                </div>
                
                <div className="flex justify-between mt-8">
                  <div className="text-center">
                    <div className="border-t-2 border-gray-400 w-32 mx-auto"></div>
                    <p className="mt-2">Principal</p>
                  </div>
                  <div className="text-center">
                    <div className="border-t-2 border-gray-400 w-32 mx-auto"></div>
                    <p className="mt-2">Date</p>
                  </div>
                </div>
              </div>
            ))}
          
          <div className="mt-6">
            <button
              className="bg-gray-500 text-black px-4 py-2 rounded hover:bg-gray-600"
              onClick={handleCloseCertificates}
            >
              Back to Student List
            </button>
          </div>
        </div>
      )}
    </div>
  );
}