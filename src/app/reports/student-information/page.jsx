// app/student-reports/page.jsx
"use client";
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';
import React, { useState } from 'react';

const StudentReportsPage = () => {

    const router = useRouter();

const handleClick = () => {
  router.push('student-information/class-section-report'); 
  // yahan apne destination ka route likho
};

const handleClick1 = () => {
  router.push('student-information/student-history'); 
  // yahan apne destination ka route likho
};

const handleClick2 = () => {
  router.push('student-information/class-subject-report'); 
  // yahan apne destination ka route likho
};
const handleClick3 = () => {
  router.push('student-information/student-profile'); 
  // yahan apne destination ka route likho
};
const handleClick4 = () => {
  router.push('student-information/online-admission-report'); 
  // yahan apne destination ka route likho
};

const handleClick5 = () => {
  router.push('student-information/student-login-cridential'); 
  // yahan apne destination ka route likho
};
const handleClick6 = () => {
  router.push('student-information/admission-report'); 
  // yahan apne destination ka route likho
};
const handleClick7 = () => {
  router.push('student-information/student-gender-retio-report'); 
  // yahan apne destination ka route likho
};
const handleClick8 = () => {
  router.push('student-information/gardian-report'); 
  // yahan apne destination ka route likho
};
const handleClick9 = () => {
  router.push('student-information/parent-login-credential'); 
  // yahan apne destination ka route likho
};
const handleClick10 = () => {
  router.push('student-information/sibling-report'); 
  // yahan apne destination ka route likho
};
const handleClick11 = () => {
  router.push('student-information/student-teacher-retio-report'); 
  // yahan apne destination ka route likho
};
  const [activeReport, setActiveReport] = useState(null);
  const [filters, setFilters] = useState({
    class: '',
    section: '',
    category: '',
    gender: '',
    rte: ''
  });
  const [showData, setShowData] = useState(false);

  // Complete dummy student data
   const allStudents = [
    {
      admissionNo: '2023001',
      studentName: 'Rahul Sharma',
      fatherName: 'Sanjay Sharma',
      dateOfBirth: '12/05/2010',
      gender: 'Male',
      category: 'General',
      mobileNumber: '9876543210',
      localId: 'LOC001',
      nationalId: 'AADHAR001',
      rte: 'No',
      class: '1',
      section: 'A'
    },
    {
      admissionNo: '2023002',
      studentName: 'Priya Patel',
      fatherName: 'Vijay Patel',
      dateOfBirth: '23/08/2011',
      gender: 'Female',
      category: 'OBC',
      mobileNumber: '8765432109',
      localId: 'LOC002',
      nationalId: 'AADHAR002',
      rte: 'Yes',
      class: '2',
      section: 'B'
    },
    {
      admissionNo: '2023003',
      studentName: 'Amit Singh',
      fatherName: 'Rajesh Singh',
      dateOfBirth: '15/03/2010',
      gender: 'Male',
      category: 'SC',
      mobileNumber: '7654321098',
      localId: 'LOC003',
      nationalId: 'AADHAR003',
      rte: 'No',
      class: '3',
      section: 'A'
    },
    {
      admissionNo: '2023004',
      studentName: 'Neha Gupta',
      fatherName: 'Anil Gupta',
      dateOfBirth: '20/11/2011',
      gender: 'Female',
      category: 'General',
      mobileNumber: '6543210987',
      localId: 'LOC004',
      nationalId: 'AADHAR004',
      rte: 'No',
      class: '1',
      section: 'B'
    },
    {
      admissionNo: '2023005',
      studentName: 'Vikram Joshi',
      fatherName: 'Prakash Joshi',
      dateOfBirth: '05/07/2010',
      gender: 'Male',
      category: 'ST',
      mobileNumber: '9432109876',
      localId: 'LOC005',
      nationalId: 'AADHAR005',
      rte: 'Yes',
      class: '2',
      section: 'A'
    }
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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setShowData(false);
  };

  const handleSearch = () => {
    if (Object.values(filters).every(val => val !== '')) {
      setShowData(true);
    }
  };

  // Filter students based on selected filters
  const filteredStudents = allStudents.filter(student => {
    return (
      student.class === filters.class &&
      student.section === filters.section &&
      student.category === filters.category &&
      student.gender === filters.gender &&
      student.rte === filters.rte
    );
  });

  // Check if all filters are selected
  const allFiltersSelected = Object.values(filters).every(val => val !== '');

  const commonStyle = (report) => ({
    padding: '10px',
    backgroundColor: activeReport === report ? '#4CAF50' : '#f0f0f0',
    color: activeReport === report ? 'white' : '#333',
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
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Student Information Report</h1>

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

      {/* Student Report Display */}
      {activeReport === 'Student Report' && (
        <div>
          <h2 style={{ marginBottom: '15px' }}>Student Report</h2>
          
          {/* Filter Section */}
          <div style={{ 
            marginBottom: '20px', 
            backgroundColor: '#f5f5f5', 
            padding: '15px', 
            borderRadius: '5px',
            border: '1px solid #ddd'
          }}>
            <h3 style={{ marginBottom: '15px' }}>Select Criteria</h3>
            <div style={{ 
            marginBottom: '20px', 
            backgroundColor: '#f5f5f5', 
            padding: '15px', 
            borderRadius: '5px',
            border: '1px solid #ddd'
          }}>
            <h3 style={{ marginBottom: '15px' }}>Select Criteria</h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', 
              gap: '105px'
            }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Class *</label>
                <select 
                  name="class"
                  value={filters.class}
                  onChange={handleFilterChange}
                  required
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    borderRadius: '4px', 
                    border: '1px solid #ddd',
                    backgroundColor: '#fff'
                  }}
                >
                  <option value="">Select Class</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Section *</label>
                <select 
                  name="section"
                  value={filters.section}
                  onChange={handleFilterChange}
                  required
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    borderRadius: '4px', 
                    border: '1px solid #ddd',
                    backgroundColor: '#fff'
                  }}
                >
                  <option value="">Select Section</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Category *</label>
                <select 
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  required
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    borderRadius: '4px', 
                    border: '1px solid #ddd',
                    backgroundColor: '#fff'
                  }}
                >
                  <option value="">Select Category</option>
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Gender *</label>
                <select 
                  name="gender"
                  value={filters.gender}
                  onChange={handleFilterChange}
                  required
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    borderRadius: '4px', 
                    border: '1px solid #ddd',
                    backgroundColor: '#fff'
                  }}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>RTE *</label>
                <select 
                  name="rte"
                  value={filters.rte}
                  onChange={handleFilterChange}
                  required
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    borderRadius: '4px', 
                    border: '1px solid #ddd',
                    backgroundColor: '#fff'
                  }}
                >
                  <option value="">Select RTE</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
          </div>
            {/* Search Button */}
            <button
              onClick={handleSearch}
              disabled={!allFiltersSelected}
              style={{
                padding: '10px 20px',
                backgroundColor: allFiltersSelected ? '#4CAF50' : '#cccccc',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: allFiltersSelected ? 'pointer' : 'not-allowed',
                fontSize: '16px',
                fontWeight: 'bold',
                transition: 'background-color 0.3s'
              }}
            >
              Search
            </button>
          </div>
          
          {/* Student Table - Only shows after search button click */}
          {showData && (
            <div style={{ overflowX: 'auto', border: '1px solid #ddd', borderRadius: '5px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Admission No</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Student Name</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Father Name</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Date of Birth</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Gender</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Category</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Mobile Number</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Local ID</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>National ID</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>RTE</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student, index) => (
                      <tr 
                        key={index} 
                        style={{ 
                          borderBottom: '1px solid #ddd',
                          ':hover': { backgroundColor: '#f9f9f9' }
                        }}
                      >
                        <td style={{ padding: '12px' }}>{student.admissionNo}</td>
                        <td style={{ padding: '12px' }}>{student.studentName}</td>
                        <td style={{ padding: '12px' }}>{student.fatherName}</td>
                        <td style={{ padding: '12px' }}>{student.dateOfBirth}</td>
                        <td style={{ padding: '12px' }}>{student.gender}</td>
                        <td style={{ padding: '12px' }}>{student.category}</td>
                        <td style={{ padding: '12px' }}>{student.mobileNumber}</td>
                        <td style={{ padding: '12px' }}>{student.localId}</td>
                        <td style={{ padding: '12px' }}>{student.nationalId}</td>
                        <td style={{ padding: '12px' }}>{student.rte}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" style={{ textAlign: 'center', padding: '20px' }}>
                        No students found matching the selected criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          
          {/* Show message when not searched yet */}
          {!showData && allFiltersSelected && (
            <div style={{ 
              textAlign: 'center', 
              padding: '40px', 
              backgroundColor: '#f9f9f9', 
              borderRadius: '5px',
              border: '1px dashed #ddd'
            }}>
              <p style={{ color: '#666' }}>Click the Search button to view student data</p>
            </div>
          )}
          
          {/* Show message when filters not complete */}
          {!allFiltersSelected && (
            <div style={{ 
              textAlign: 'center', 
              padding: '40px', 
              backgroundColor: '#f9f9f9', 
              borderRadius: '5px',
              border: '1px dashed #ddd'
            }}>
              <p style={{ color: '#666' }}>Please fill all filters to enable search</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentReportsPage;