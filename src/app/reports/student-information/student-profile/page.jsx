// app/student-profile/page.jsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';
const StudentProfilePage = () => {
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
  const studentProfileData = [
    {
      admissionNo: "2023001",
      rollNumber: "1",
      className: "Class 1",
      sectionName: "A",
      firstName: "Rahul",
      lastName: "Sharma",
      gender: "Male",
      dateOfBirth: "09/25/2009",
      category: "General",
      religion: "Hindu",
      caste: "Brahmin",
      mobileNumber: "9876543210",
      email: "rahul@example.com",
      admissionDate: "04/01/2023",
      bloodGroup: "B+",
      height: "150 cm",
      weight: "45 kg",
      measurementDate: "01/15/2024",
      feesDiscount: "10%",
      fatherName: "Sanjay Sharma",
      fatherPhone: "9876543211",
      fatherOccupation: "Engineer",
      motherName: "Priya Sharma",
      motherPhone: "9876543212",
      motherOccupation: "Teacher",
      guardianName: "",
      guardianRelation: "",
      guardianPhone: "",
      guardianOccupation: "",
      guardianEmail: "",
      currentAddress: "123 Main St, Delhi",
      permanentAddress: "123 Main St, Delhi",
      routeList: "Bus Route 1",
      hostelDetails: "Not Applicable",
      roomNo: "",
      bankAccountNumber: "123456789012",
      bankName: "State Bank of India",
      ifscCode: "SBIN0001234",
      nationalId: "AADHAR12345678",
      localId: "DL12345678",
      rteDetails: "Not Applicable"
    },
    // Add more student data as needed
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
  // Available filters
  const dateFilters = ['Today', 'This Week', 'Last Week', 'This Month', 'Last Month', 'Custom Range'];
  const classes = ['Class 1', 'Class 2', 'Class 3', 'Class 4'];
  const sections = ['A', 'B', 'C', 'D'];

  const [filters, setFilters] = useState({
    dateFilter: 'Today',
    class: '',
    section: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
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
    if (filters.class && filters.section) {
      setShowResults(true);
    }
  };

  // Filter students based on selected criteria
  const filteredStudents = studentProfileData.filter(student => {
    const classMatch = student.className === filters.class;
    const sectionMatch = student.sectionName === filters.section;
    const searchMatch = 
      Object.values(student).some(value => 
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return classMatch && sectionMatch && (searchTerm === '' || searchMatch);
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
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
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
      <button style={commonStyle('Online Admission Report')} onClick={() => handleReportClick('Online Admission Report')}>Online Admission Report</button>
      <button style={commonStyle('Class & Section Report')} onClick={() => handleClick('Class & Section Report')}>Class & Section Report</button>
      <button style={commonStyle('Student Login Credential')} onClick={() => handleReportClick('Student Login Credential')}>Student Login Credential</button>
      <button style={commonStyle('Admission Report')} onClick={() => handleReportClick('Admission Report')}>Admission Report</button>
      <button style={commonStyle('Student Gender Ratio Report')} onClick={() => handleReportClick('Student Gender Ratio Report')}>Student Gender Ratio Report</button>
      <button style={commonStyle('Guardian Report')} onClick={() => handleReportClick('Guardian Report')}>Guardian Report</button>
      <button style={commonStyle('Parent Login Credential')} onClick={() => handleReportClick('Parent Login Credential')}>Parent Login Credential</button>
      <button style={commonStyle('Sibling Report')} onClick={() => handleReportClick('Sibling Report')}>Sibling Report</button>
      <button style={commonStyle('Student Teacher Ratio Report')} onClick={() => handleReportClick('Student Teacher Ratio Report')}>Student Teacher Ratio Report</button>
    </div>
      <h1 style={{ marginBottom: '30px', color: '#333' }}>Student Profile</h1>

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
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
          gap: '20px',
          marginBottom: '20px'
        }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Search by Admission Date</label>
            <select
              name="dateFilter"
              value={filters.dateFilter}
              onChange={handleFilterChange}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: '#fff'
              }}
            >
              {dateFilters.map(filter => (
                <option key={filter} value={filter}>{filter}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Class *</label>
            <select
              name="class"
              value={filters.class}
              onChange={handleFilterChange}
              style={{
                width: '100%',
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
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Section *</label>
            <select
              name="section"
              value={filters.section}
              onChange={handleFilterChange}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: '#fff'
              }}
            >
              <option value="">Select Section</option>
              {sections.map(sec => (
                <option key={sec} value={sec}>{sec}</option>
              ))}
            </select>
          </div>
        </div>
        
        <button
          onClick={handleSearch}
          disabled={!filters.class || !filters.section}
          style={{
            padding: '10px 20px',
            backgroundColor: (filters.class && filters.section) ? '#4CAF50' : '#cccccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: (filters.class && filters.section) ? 'pointer' : 'not-allowed',
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
          <h2 style={{ marginBottom: '20px' }}>Student Profile</h2>
          
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
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Roll Number</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Class</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Section</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>First Name</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Last Name</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Gender</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Date of Birth</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Category</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Religion</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Caste</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Mobile</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Email</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Admission Date</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Blood Group</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Height</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Weight</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Measurement Date</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Fees Discount</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Father Name</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Father Phone</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Father Occupation</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Mother Name</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Mother Phone</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Mother Occupation</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Guardian Name</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Guardian Relation</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Guardian Phone</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Guardian Occupation</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Guardian Email</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Current Address</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Permanent Address</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Route List</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Hostel Details</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Room No</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Bank Account</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Bank Name</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>IFSC Code</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>National ID</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Local ID</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>RTE Details</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #ddd', ':hover': { backgroundColor: '#f9f9f9' } }}>
                      <td style={{ padding: '12px' }}>{student.admissionNo}</td>
                      <td style={{ padding: '12px' }}>{student.rollNumber}</td>
                      <td style={{ padding: '12px' }}>{student.className}</td>
                      <td style={{ padding: '12px' }}>{student.sectionName}</td>
                      <td style={{ padding: '12px' }}>{student.firstName}</td>
                      <td style={{ padding: '12px' }}>{student.lastName}</td>
                      <td style={{ padding: '12px' }}>{student.gender}</td>
                      <td style={{ padding: '12px' }}>{student.dateOfBirth}</td>
                      <td style={{ padding: '12px' }}>{student.category}</td>
                      <td style={{ padding: '12px' }}>{student.religion}</td>
                      <td style={{ padding: '12px' }}>{student.caste}</td>
                      <td style={{ padding: '12px' }}>{student.mobileNumber}</td>
                      <td style={{ padding: '12px' }}>{student.email}</td>
                      <td style={{ padding: '12px' }}>{student.admissionDate}</td>
                      <td style={{ padding: '12px' }}>{student.bloodGroup}</td>
                      <td style={{ padding: '12px' }}>{student.height}</td>
                      <td style={{ padding: '12px' }}>{student.weight}</td>
                      <td style={{ padding: '12px' }}>{student.measurementDate}</td>
                      <td style={{ padding: '12px' }}>{student.feesDiscount}</td>
                      <td style={{ padding: '12px' }}>{student.fatherName}</td>
                      <td style={{ padding: '12px' }}>{student.fatherPhone}</td>
                      <td style={{ padding: '12px' }}>{student.fatherOccupation}</td>
                      <td style={{ padding: '12px' }}>{student.motherName}</td>
                      <td style={{ padding: '12px' }}>{student.motherPhone}</td>
                      <td style={{ padding: '12px' }}>{student.motherOccupation}</td>
                      <td style={{ padding: '12px' }}>{student.guardianName || '-'}</td>
                      <td style={{ padding: '12px' }}>{student.guardianRelation || '-'}</td>
                      <td style={{ padding: '12px' }}>{student.guardianPhone || '-'}</td>
                      <td style={{ padding: '12px' }}>{student.guardianOccupation || '-'}</td>
                      <td style={{ padding: '12px' }}>{student.guardianEmail || '-'}</td>
                      <td style={{ padding: '12px' }}>{student.currentAddress}</td>
                      <td style={{ padding: '12px' }}>{student.permanentAddress}</td>
                      <td style={{ padding: '12px' }}>{student.routeList}</td>
                      <td style={{ padding: '12px' }}>{student.hostelDetails}</td>
                      <td style={{ padding: '12px' }}>{student.roomNo || '-'}</td>
                      <td style={{ padding: '12px' }}>{student.bankAccountNumber}</td>
                      <td style={{ padding: '12px' }}>{student.bankName}</td>
                      <td style={{ padding: '12px' }}>{student.ifscCode}</td>
                      <td style={{ padding: '12px' }}>{student.nationalId}</td>
                      <td style={{ padding: '12px' }}>{student.localId}</td>
                      <td style={{ padding: '12px' }}>{student.rteDetails}</td>
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
              <p>No data available</p>
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
          <p>Please select class and section, then click Search to view results</p>
        </div>
      )}
    </div>
  );
};

export default StudentProfilePage;