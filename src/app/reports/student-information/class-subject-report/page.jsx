// app/class-subject-report/page.jsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';
const ClassSubjectReport = () => {
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
  const classSubjectData = [
    {
      class: "Class 1",
      section: "A",
      subject: "English (210)",
      teacher: "Shivam Verma (9002)",
      time: "Monday 9:00 AM To 09:45 AM",
      roomNo: "12"
    },
    {
      class: "Class 1",
      section: "A",
      subject: "English (210)",
      teacher: "Shivam Verma (9002)",
      time: "Monday 9:00 AM To 09:45 AM",
      roomNo: "12"
    },
    {
      class: "Class 1",
      section: "A",
      subject: "English (210)",
      teacher: "Shivam Verma (9002)",
      time: "Wednesday 9:00 AM To 09:45 AM",
      roomNo: "12"
    },
    {
      class: "Class 1",
      section: "A",
      subject: "English (210)",
      teacher: "Albert Thomas (F4F4F4F4)",
      time: "Thursday 9:00 AM To 09:45 AM",
      roomNo: "17"
    },
    {
      class: "Class 2",
      section: "B",
      subject: "Mathematics (310)",
      teacher: "Priya Sharma (8001)",
      time: "Tuesday 10:00 AM To 10:45 AM",
      roomNo: "15"
    }
  ];
  const handleReportClick = (reportName) => {
    // setActiveReport(reportName);
    setFilters({
      class: '',
      section: '',
      category: '',
      gender: '',
      rte: ''
    });
    setShowData(false);
  };
  // Available classes and sections for dropdowns
  const classes = ['Class 1', 'Class 2', 'Class 3', 'Class 4'];
  const sections = ['A', 'B', 'C', 'D'];

  const [filters, setFilters] = useState({
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

  // Filter subjects based on selected criteria and search term
  const filteredSubjects = classSubjectData.filter(subject => {
    const classMatch = subject.class === filters.class;
    const sectionMatch = subject.section === filters.section;
    const searchMatch = 
      subject.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.time.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.roomNo.toLowerCase().includes(searchTerm.toLowerCase());
    
    return classMatch && sectionMatch && (searchTerm === '' || searchMatch);
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
      <h1 style={{ marginBottom: '30px', color: '#333' }}>Class Subject Report</h1>

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

            <label style={{ position:'relative',left:'307px',display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Section *</label>
            <select
              name="section"
              value={filters.section}
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
          <h2 style={{ marginBottom: '20px' }}>Class Subject Report</h2>
          
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
          
       

          {filteredSubjects.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ 
                width: '100%', 
                borderCollapse: 'collapse',
                border: '1px solid #ddd'
              }}>
                <thead>
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Class</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Section</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Subject</th>
                  
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Teacher</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Time</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Room No.</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubjects.map((subject, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #ddd', ':hover': { backgroundColor: '#f9f9f9' } }}>
                         <td style={{ padding: '12px' }}>{subject.class}</td>
                      <td style={{ padding: '12px' }}>{subject.section}</td>
                      <td style={{ padding: '12px' }}>{subject.subject}</td>
                      <td style={{ padding: '12px' }}>{subject.teacher}</td>
                      <td style={{ padding: '12px' }}>{subject.time}</td>
                      <td style={{ padding: '12px' }}>{subject.roomNo}</td>
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
          <p>Please select class and section, then click Search to view results</p>
        </div>
      )}
    </div>
  );
};

export default ClassSubjectReport;