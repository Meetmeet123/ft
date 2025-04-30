// app/class-section-report/page.jsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';
const ClassSectionReport = () => {
      const router = useRouter();
  
  const handleClick = () => {
    router.push('../student-information/class-section-report'); 
    // yahan apne destination ka route likho
  };
  
  const handleClick1 = () => {
    router.push('../student-information/student-history'); 
    // yahan apne destination ka route likho
  };
  
  const handleClick2 = () => {
    router.push('../student-information/class-subject-report'); 
    // yahan apne destination ka route likho
  };
  const handleClick3 = () => {
    router.push('../student-information/student-profile'); 
    // yahan apne destination ka route likho
  };
  const handleClick4 = () => {
    router.push('../student-information/online-admission-report'); 
    // yahan apne destination ka route likho
  };
  
  const handleClick5 = () => {
    router.push('../student-information/student-login-cridential'); 
    // yahan apne destination ka route likho
  };
  const handleClick6 = () => {
    router.push('../student-information/admission-report'); 
    // yahan apne destination ka route likho
  };
  const handleClick7 = () => {
    router.push('../student-information/student-gender-retio-report'); 
    // yahan apne destination ka route likho
  };
  const handleClick8 = () => {
    router.push('../student-information/gardian-report'); 
    // yahan apne destination ka route likho
  };
  const handleClick9 = () => {
    router.push('../student-information/parent-login-credential'); 
    // yahan apne destination ka route likho
  };
  const handleClick10 = () => {
    router.push('../student-information/sibling-report'); 
    // yahan apne destination ka route likho
  };
  const handleClick11 = () => {
    router.push('../student-information/student-teacher-retio-report'); 
    // yahan apne destination ka route likho
  };
  
  // Dummy JSON data for classes
  const classData = [
    { id: 1, className: "Class 1(A)", students: 3 },
    { id: 2, className: "Class 1(B)", students: 2 },
    { id: 3, className: "Class 1(C)", students: 0 },
    { id: 4, className: "Class 1(D)", students: 0 },
    { id: 5, className: "Class 2(A)", students: 3 },
    { id: 6, className: "Class 2(B)", students: 3 },
    { id: 7, className: "Class 2(C)", students: 0 },
    { id: 8, className: "Class 2(D)", students: 0 },
    { id: 9, className: "Class 3(A)", students: 4 },
    { id: 10, className: "Class 3(B)", students: 2 },
    { id: 11, className: "Class 3(C)", students: 1 }
  ];

  // Dummy JSON data for students
  const studentData = [
    {
      admissionNo: '120020',
      studentName: 'Ashwani Kumar',
      className: 'Class 1(A)',
      fatherName: 'Aljun Kumar',
      dateOfBirth: '09/25/2009',
      gender: 'Male',
      category: 'General',
      mobileNumber: '990678463'
    },
    {
      admissionNo: '120039',
      studentName: 'Nathan Smith',
      className: 'Class 1(A)',
      fatherName: 'Jason Smith',
      dateOfBirth: '10/24/2013',
      gender: 'Male',
      category: 'General',
      mobileNumber: '8906785675'
    },
    {
      admissionNo: '520039',
      studentName: 'Xavier Barriett',
      className: 'Class 1(A)',
      fatherName: 'David Barriett',
      dateOfBirth: '05/13/2009',
      gender: 'Male',
      category: '',
      mobileNumber: '0890789657'
    },
    // Add more students for other classes as needed
  ];
  const handleReportClick = (reportName) => {
    setActiveReport(reportName);
    setFilters({
      class: '',
      section: '',
      category: '',
      gender: '',
      rte: ''
    });
    setShowData(false);
  };
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState(null);
  const [showStudents, setShowStudents] = useState(false);

  // Filter classes based on search term
  const filteredClasses = classData.filter(cls =>
    cls.className.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get students for selected class
  const classStudents = studentData.filter(student => 
    student.className === selectedClass?.className
  );

  const handleActionClick = (cls) => {
    setSelectedClass(cls);
    setShowStudents(true);
  };

  const commonStyle = (report) => ({
    padding: '10px',
    backgroundColor:  '#f0f0f0',
    color:  '#333',
    border: '1px solid #ddd',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontWeight: '500',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  });
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
         <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
      gap: '10px', 
      marginBottom: '30px'
    }}>
      <button style={commonStyle('Student Report')} onClick={() => handleReportClick('Student Report')}>Student Report</button>
      <button style={commonStyle('Student History')} onClick={() => handleClick1('Student History')}>Student History</button>
      <button style={commonStyle('Class Subject Report')} onClick={() => handleClick2('Class Subject Report')}>Class Subject Report</button>
      <button style={commonStyle('Student Profile')} onClick={() => handleClick3('Student Profile')}>Student Profile</button>
      <button style={commonStyle('Online Admission Report')} onClick={() => handleClick4('Online Admission Report')}>Online Admission Report</button>
      <button style={commonStyle('Class & Section Report')} onClick={() => handleClick('Class & Section Report')}>Class & Section Report</button>
      <button style={commonStyle('Student Login Credential')} onClick={() => handleClick5('Student Login Credential')}>Student Login Credential</button>
      <button style={commonStyle('Admission Report')} onClick={() => handleClick6('Admission Report')}>Admission Report</button>
      <button style={commonStyle('Student Gender Ratio Report')} onClick={() => handleClick7('Student Gender Ratio Report')}>Student Gender Ratio Report</button>
      <button style={commonStyle('Guardian Report')} onClick={() => handleClick8('Guardian Report')}>Guardian Report</button>
      <button style={commonStyle('Parent Login Credential')} onClick={() => handleClick9('Parent Login Credential')}>Parent Login Credential</button>
      <button style={commonStyle('Sibling Report')} onClick={() => handleClick10('Sibling Report')}>Sibling Report</button>
      <button style={commonStyle('Student Teacher Ratio Report')} onClick={() => handleClick11('Student Teacher Ratio Report')}>Student Teacher Ratio Report</button>
    </div>
      <h1 style={{ marginBottom: '20px', color: '#333' }}>Class & Section Report</h1>
      
      {/* Search Input */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '8px 12px',
            width: '100%',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '16px'
          }}
        />
      </div>
      
      {/* Class Table */}
      <div style={{ overflowX: 'auto', marginBottom: '30px' }}>
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse',
          border: '1px solid #ddd'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>S.No.</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Class</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Students</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredClasses.map((cls, index) => (
              <tr key={cls.id} style={{ borderBottom: '1px solid #ddd', ':hover': { backgroundColor: '#f9f9f9' } }}>
                <td style={{ padding: '12px' }}>{index + 1}</td>
                <td style={{ padding: '12px' }}>{cls.className}</td>
                <td style={{ padding: '12px' }}>{cls.students}</td>
                <td style={{ padding: '12px' }}>
                  <button 
                    onClick={() => handleActionClick(cls)}
                    style={{
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '6px 12px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      ':hover': { backgroundColor: '#45a049' }
                    }}
                    disabled={cls.students === 0}
                  >
                    {cls.students === 0 ? 'No Students' : 'View Students'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Student List Section */}
      {showStudents && selectedClass && (
        <div>
          <h2 style={{ marginBottom: '20px' }}>Student List - {selectedClass.className}</h2>
          
          {/* Student Search Input */}
          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Search students..."
              style={{
                padding: '8px 12px',
                width: '100%',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px'
              }}
            />
          </div>

          {/* Student Details Header */}
          <div style={{ marginBottom: '15px' }}>
            <h3 style={{ marginBottom: '10px' }}>Admission No</h3>
            <h3 style={{ marginBottom: '5px', fontSize: '16px', fontWeight: 'bold' }}>Student Name</h3>
            <p style={{ marginBottom: '5px', color: '#666' }}>{selectedClass.className}</p>
          </div>

          {/* Student Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse',
              border: '1px solid #ddd'
            }}>
              <thead>
                <tr style={{ backgroundColor: '#f2f2f2' }}>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Admission No</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Student Name</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Father Name</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Date of Birth</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Gender</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Category</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Mobile Number</th>
                </tr>
              </thead>
              <tbody>
                {classStudents.map((student, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #ddd', ':hover': { backgroundColor: '#f9f9f9' } }}>
                    <td style={{ padding: '12px' }}>{student.admissionNo}</td>
                    <td style={{ padding: '12px' }}>{student.studentName}</td>
                    <td style={{ padding: '12px' }}>{student.fatherName}</td>
                    <td style={{ padding: '12px' }}>{student.dateOfBirth}</td>
                    <td style={{ padding: '12px' }}>{student.gender}</td>
                    <td style={{ padding: '12px' }}>{student.category || '-'}</td>
                    <td style={{ padding: '12px' }}>{student.mobileNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Record Count */}
          <div style={{ marginTop: '20px', textAlign: 'right', color: '#666' }}>
            <p>Records: 1 to {classStudents.length} of {classStudents.length}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassSectionReport;