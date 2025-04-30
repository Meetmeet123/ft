// app/admission-report/page.jsx
"use client";

import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';
import React, { useState } from 'react';

// import React, { useState } from 'react';

const AdmissionReport = () => {
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
  const admissionData = [
    {
      admissionNo: '2023001',
      studentName: 'Rahul Sharma',
      className: 'Class 1',
      fatherName: 'Sanjay Sharma',
      dateOfBirth: '09/25/2009',
      admissionDate: '04/01/2023',
      gender: 'Male',
      category: 'General',
      mobileNumber: '9876543210'
    },
    {
      admissionNo: '2023002',
      studentName: 'Priya Patel',
      className: 'Class 1',
      fatherName: 'Vijay Patel',
      dateOfBirth: '10/24/2013',
      admissionDate: '04/02/2023',
      gender: 'Female',
      category: 'OBC',
      mobileNumber: '8765432109'
    },
    {
      admissionNo: '2023003',
      studentName: 'Amit Singh',
      className: 'Class 2',
      fatherName: 'Rajesh Singh',
      dateOfBirth: '05/13/2009',
      admissionDate: '04/03/2023',
      gender: 'Male',
      category: 'SC',
      mobileNumber: '7654321098'
    },
    // Add more recent data for "Today" filter
    {
      admissionNo: '2024001',
      studentName: 'Neha Gupta',
      className: 'Class 3',
      fatherName: 'Anil Gupta',
      dateOfBirth: '08/15/2010',
      admissionDate: new Date().toLocaleDateString('en-US'),
      gender: 'Female',
      category: 'General',
      mobileNumber: '6543210987'
    },
    // Add data from last week
    {
      admissionNo: '2024002',
      studentName: 'Vikram Joshi',
      className: 'Class 4',
      fatherName: 'Prakash Joshi',
      dateOfBirth: '07/05/2010',
      admissionDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US'),
      gender: 'Male',
      category: 'ST',
      mobileNumber: '9432109876'
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
  // Available search types
  const searchTypes = ['Today', 'This Week', 'Last Week', 'This Month', 'Last Month', 'All'];

  const [searchType, setSearchType] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
    setShowResults(false);
  };

  const handleSearch = () => {
    if (searchType) {
      setShowResults(true);
    }
  };

  // Filter admissions based on selected search type
  const filteredAdmissions = admissionData.filter(admission => {
    if (!searchType || searchType === 'All') return true;
    
    const admissionDate = new Date(admission.admissionDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    
    const startOfLastWeek = new Date(startOfWeek);
    startOfLastWeek.setDate(startOfWeek.getDate() - 7);
    
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    
    const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    
    switch(searchType) {
      case 'Today':
        return admissionDate.toDateString() === today.toDateString();
      case 'This Week':
        return admissionDate >= startOfWeek && admissionDate <= today;
      case 'Last Week':
        return admissionDate >= startOfLastWeek && admissionDate < startOfWeek;
      case 'This Month':
        return admissionDate >= startOfMonth && admissionDate <= today;
      case 'Last Month':
        return admissionDate >= startOfLastMonth && admissionDate < startOfMonth;
      default:
        return true;
    }
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
      <h1 style={{ marginBottom: '30px', color: '#333' }}>Admission Report</h1>

      {/* Filter Section */}
      <div style={{ 
        marginBottom: '30px', 
        backgroundColor: '#f5f5f5', 
        padding: '20px', 
        borderRadius: '5px',
        border: '1px solid #ddd'
      }}>
        <h2 style={{ marginBottom: '20px' }}>Search Type</h2>
        
        <div style={{ 
          display: 'flex',
          gap: '20px',
          marginBottom: '20px'
        }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Select</label>
            <select
              value={searchType}
              onChange={handleSearchTypeChange}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: '#fff'
              }}
            >
              <option value="">Select Search Type</option>
              {searchTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
        
        <button
          onClick={handleSearch}
          disabled={!searchType}
          style={{
            padding: '10px 20px',
            backgroundColor: searchType ? '#4CAF50' : '#cccccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: searchType ? 'pointer' : 'not-allowed',
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
          <h2 style={{ marginBottom: '20px' }}>Admission Report</h2>
          
          {filteredAdmissions.length > 0 ? (
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
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Class</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Father Name</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Date of Birth</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Admission Date</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Gender</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Category</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Mobile Number</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAdmissions.map((admission, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #ddd', ':hover': { backgroundColor: '#f9f9f9' } }}>
                      <td style={{ padding: '12px' }}>{admission.admissionNo}</td>
                      <td style={{ padding: '12px' }}>{admission.studentName}</td>
                      <td style={{ padding: '12px' }}>{admission.className}</td>
                      <td style={{ padding: '12px' }}>{admission.fatherName}</td>
                      <td style={{ padding: '12px' }}>{admission.dateOfBirth}</td>
                      <td style={{ padding: '12px' }}>{admission.admissionDate}</td>
                      <td style={{ padding: '12px' }}>{admission.gender}</td>
                      <td style={{ padding: '12px' }}>{admission.category}</td>
                      <td style={{ padding: '12px' }}>{admission.mobileNumber}</td>
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
          <p>Please select search type, then click Search to view results</p>
        </div>
      )}
    </div>
  );
};

export default AdmissionReport;