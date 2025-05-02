// app/student-history/page.jsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';


const StudentHistoryPage = () => {
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
  
  // Dummy JSON data
  const studentHistoryData = [
    {
      admissionNo: '2023001',
      studentName: 'Rahul Sharma',
      admissionDate: '01/04/2023',
      classHistory: ' class1(A) - class12(B)',
      sessionHistory: '2023-2024',
      years: 1,
      mobileNumber: '9876543210',
      guardianName: 'Sanjay Sharma',
      guardianPhone: '9876543211'
    },
    {
      admissionNo: '2022001',
      studentName: 'Priya Patel',
      admissionDate: '01/04/2022',
      classHistory: 'class1(A) -class3(A)',
      sessionHistory: '2022-2024',
      years: 2,
      mobileNumber: '8765432109',
      guardianName: 'Vijay Patel',
      guardianPhone: '8765432110'
    },
    {
      admissionNo: '2021003',
      studentName: 'Amit Singh',
      admissionDate: '01/04/2021',
      classHistory: 'class1(B) - class4(A)',
      sessionHistory: '2021-2024',
      years: 3,
      mobileNumber: '7654321098',
      guardianName: 'Rajesh Singh',
      guardianPhone: '7654321099'
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
  // Available classes and years for dropdowns
  const classes = ['class1(A)', 'class1(B)', 'class2(A)', 'class2(B)', 'class3(A)', 'class3(B)', 'class4(A)'];
  const admissionYears = ['2021', '2022', '2023', '2024'];

  const [filters, setFilters] = useState({
    class: '',
    admissionYear: ''
  });
  const [showResults, setShowResults] = useState(false);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
    setShowResults(false);
  };

  const handleSearch = () => {
    if (filters.class && filters.admissionYear) {
      setShowResults(true);
    }
  };

  // Filter students based on selected criteria
  const filteredStudents = studentHistoryData.filter(student => {
    const classMatch = student.classHistory.includes(filters.class);
    const yearMatch = student.admissionDate.includes(filters.admissionYear);
    return classMatch && yearMatch;
  });
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
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
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
      <h1 style={{ marginBottom: '30px', color: '#333' }}>Student History</h1>

      {/* Filter Section */}
      <div style={{ 
        marginBottom: '30px', 
        backgroundColor: '#f5f5f5', 
        padding: '20px', 
        borderRadius: '5px',
        border: '1px solid #ddd'
      }}>
        <h2 style={{ marginBottom: '20px' }}>Select Criteria</h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
          gap: '20px',
          marginBottom: '20px'
        }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Class *</label>
            <select
              name="class"
              value={filters.class}
              onChange={handleFilterChange}
              style={{
                width: '200%',
               
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: '#fff'
              }}
            >
              <option value="">Select Class</option>
              {classes.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>
          
          <div style={{ position:'relative',right:'70px'}}>
            <label style={{position:'relative',left:'307px', display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Admission Year *</label>
            <select
              name="admissionYear"
              value={filters.admissionYear}
              onChange={handleFilterChange}
              style={{
                width: '200%',
                position:'relative',left:'300px',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: '#fff'
              }}
            >
              <option value="">Select Year</option>
              {admissionYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
        
        <button
          onClick={handleSearch}
          disabled={!filters.class || !filters.admissionYear}
          style={{
            padding: '10px 20px',
            backgroundColor: (filters.class && filters.admissionYear) ? '#4CAF50' : '#cccccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: (filters.class && filters.admissionYear) ? 'pointer' : 'not-allowed',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          Search
        </button>
      </div>

      {/* Results Section */}
      {showResults ? (
        <div>
          <h2 style={{ marginBottom: '20px' }}>Student History</h2>
          
          {filteredStudents.length > 0 ? (
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
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Admission Date</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Class (Start - End)</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Session (Start - End)</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Years</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Mobile Number</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Guardian Name</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Guardian Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #ddd', ':hover': { backgroundColor: '#f9f9f9' } }}>
                      <td style={{ padding: '12px' }}>{student.admissionNo}</td>
                      <td style={{ padding: '12px' }}>{student.studentName}</td>
                      <td style={{ padding: '12px' }}>{student.admissionDate}</td>
                      <td style={{ padding: '12px' }}>{student.classHistory}</td>
                      <td style={{ padding: '12px' }}>{student.sessionHistory}</td>
                      <td style={{ padding: '12px' }}>{student.years}</td>
                      <td style={{ padding: '12px' }}>{student.mobileNumber}</td>
                      <td style={{ padding: '12px' }}>{student.guardianName}</td>
                      <td style={{ padding: '12px' }}>{student.guardianPhone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '40px', 
              backgroundColor: '#f9f9f9', 
              borderRadius: '5px',
              border: '1px dashed #ddd'
            }}>
              <p>No data available in table</p>
            </div>
          )}
        </div>
      ) : (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px', 
          backgroundColor: '#f9f9f9', 
          borderRadius: '5px',
          border: '1px dashed #ddd'
        }}>
          <p>Please select class and admission year, then click Search to view results</p>
        </div>
      )}
    </div>
  );
};

export default StudentHistoryPage;