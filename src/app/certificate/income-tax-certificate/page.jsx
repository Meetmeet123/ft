"use client";
import React, { useState } from 'react';

export default function StudentCertificateSystem() {
  // Dummy student data
  const dummyStudents = [
    {
      admissionNo: '0001',
      grNumber: '0001',
      studentName: 'TEST',
      fatherName: 'Father Test',
      className: 'CLASS 5TH',
      section: 'A',
      dob: '01-04-2025',
      dobInWords: 'One April Two Thousand Twenty Five',
      phone: '342543536456',
      caste: 'General',
      feePaid: '0',
      academicYear: '2023-24'
    },
    {
      admissionNo: '0002',
      grNumber: '0002',
      studentName: 'John Doe',
      fatherName: 'Michael Doe',
      className: 'CLASS 5TH',
      section: 'B',
      dob: '15-06-2024',
      dobInWords: 'Fifteen June Two Thousand Twenty Four',
      phone: '9876543210',
      caste: 'OBC',
      feePaid: '500',
      academicYear: '2023-24'
    },
    {
      admissionNo: '0003',
      grNumber: '0003',
      studentName: 'Jane Smith',
      fatherName: 'Robert Smith',
      className: 'CLASS 6TH',
      section: 'A',
      dob: '22-09-2023',
      dobInWords: 'Twenty Two September Two Thousand Twenty Three',
      phone: '8765432109',
      caste: 'SC',
      feePaid: '750',
      academicYear: '2023-24'
    }
  ];

  // State variables
  const [students, setStudents] = useState(dummyStudents);
  const [filteredStudents, setFilteredStudents] = useState(dummyStudents);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [certificateData, setCertificateData] = useState(null);
  const [showCertificate, setShowCertificate] = useState(false);

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
        student.grNumber.includes(keyword) ||
        student.phone.includes(keyword) ||
        student.admissionNo.includes(keyword)
      );
    }

    setFilteredStudents(filtered);
  };

  // Handle search button click
  const handleSearch = () => {
    filterStudents();
  };

  // Handle certificate button click
  const handleCertificateClick = (student) => {
    setCertificateData(student);
    setShowCertificate(true);
  };

  // Handle certificate close
  const handleCloseCertificate = () => {
    setShowCertificate(false);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
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

                <label className="block text-sm font-medium text-gray-700">Search By Keyword</label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Search By Student Name, GR Number, Mobile Number, Email.."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
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
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 border">Admission No</th>
                    <th className="py-2 px-4 border">Student Name</th>
                    <th className="py-2 px-4 border">Father Name</th>
                    <th className="py-2 px-4 border">Class</th>
                    <th className="py-2 px-4 border">Section</th>
                    <th className="py-2 px-4 border">Date of Birth</th>
                    <th className="py-2 px-4 border">Phone</th>
                    <th className="py-2 px-4 border">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="py-2 px-4 border">{student.admissionNo}</td>
                        <td className="py-2 px-4 border">{student.studentName}</td>
                        <td className="py-2 px-4 border">{student.fatherName}</td>
                        <td className="py-2 px-4 border">{student.className}</td>
                        <td className="py-2 px-4 border">{student.section}</td>
                        <td className="py-2 px-4 border">{student.dob}</td>
                        <td className="py-2 px-4 border">{student.phone}</td>
                        <td className="py-2 px-4 border">
                          <button
                            className="bg-green-500 text-black px-3 py-1 rounded hover:bg-green-600"
                            onClick={() => handleCertificateClick(student)}
                          >
                            Certificate
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="py-4 px-4 border text-center">No students found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-center mb-4">INCOME TAX CERTIFICATE</h1>
          
          <div className="mb-4">
            <p>General Register No.: {certificateData.grNumber}</p>
            <p>Date : {formatDate(new Date())}</p>
          </div>
          
          <hr className="my-4 border-t-2 border-gray-300" />
          
          <div className="mb-6">
            <p className="text-justify">
              This is to certify that master/ miss <span className="font-bold underline">{certificateData.studentName}</span> 
              Father <span className="font-bold underline">{certificateData.fatherName}</span> is / was a bonafide student of this school 
              studying in the <span className="font-bold underline">{certificateData.className}</span> class during the academic year 
              <span className="font-bold underline"> {certificateData.academicYear}</span> his / her date of birth according to the school 
              record is <span className="font-bold underline">{certificateData.dob}</span> in words 
              <span className="font-bold underline"> {certificateData.dobInWords}</span> and his / her caste is 
              <span className="font-bold underline"> {certificateData.caste}</span>.
            </p>
          </div>
          
          <div className="mb-6">
            <p>He/she has paid his/her Tuition fee Rs. <span className="font-bold underline">{certificateData.feePaid}</span></p>
          </div>
          
          <hr className="my-4 border-t-2 border-gray-300" />
          
          <div className="flex justify-between mt-8">
            <div className="text-center">
              <p className="font-bold border-t-2 border-gray-400 pt-2 inline-block">Clerk</p>
            </div>
            <div className="text-center">
              <p className="font-bold border-t-2 border-gray-400 pt-2 inline-block">Principal</p>
            </div>
          </div>
          
          <div className="flex justify-between mt-8">
            <button
              className="bg-red-500 text-black px-4 py-2 rounded hover:bg-red-600"
              onClick={handleCloseCertificate}
            >
              Cancel
            </button>
            <div>
              <button className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 mr-2">
                Edit Details
              </button>
              <button className="bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-600">
                Confirm & Print
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}