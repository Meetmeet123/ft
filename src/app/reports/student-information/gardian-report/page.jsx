// GuardianReport.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // if you're using Next.js App Router

// Your component code here

import React, { useState } from 'react';

const GuardianReport = () => {
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
  
  // Dummy data structure
  const allData = {
    "Class 1": {
      "A": [
        {
          admissionNo: '2023001',
          studentName: 'Rahul Sharma',
          mobileNumber: '9876543210',
          guardianName: 'Sanjay Sharma',
          guardianRelation: 'Father',
          guardianPhone: '9876543210',
          fatherName: 'Sanjay Sharma',
          fatherPhone: '9876543210',
          motherName: 'Neeta Sharma',
          motherPhone: '8765432109'
        }
      ],
      "B": []
    },
    "Class 2": {
      "A": [
        {
          admissionNo: '2023002',
          studentName: 'Priya Patel',
          mobileNumber: '8765432109',
          guardianName: 'Vijay Patel',
          guardianRelation: 'Father',
          guardianPhone: '8765432109',
          fatherName: 'Vijay Patel',
          fatherPhone: '8765432109',
          motherName: 'Meena Patel',
          motherPhone: '7654321098'
        }
      ],
      "B": [
        {
          admissionNo: '2023003',
          studentName: 'Amit Singh',
          mobileNumber: '7654321098',
          guardianName: 'Rajesh Singh',
          guardianRelation: 'Father',
          guardianPhone: '7654321098',
          fatherName: 'Rajesh Singh',
          fatherPhone: '7654321098',
          motherName: 'Sunita Singh',
          motherPhone: '6543210987'
        }
      ]
    },
    "Class 3": {
      "A": [],
      "B": [],
      "C": []
    }
  };
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
  // State management
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [availableSections, setAvailableSections] = useState([]);

  // Get all class options
  const classOptions = Object.keys(allData);

  // Handle class selection
  const handleClassChange = (e) => {
    const selected = e.target.value;
    setSelectedClass(selected);
    setSelectedSection('');
    setShowResults(false);
    
    if (selected) {
      setAvailableSections(Object.keys(allData[selected]));
    } else {
      setAvailableSections([]);
    }
  };

  // Handle section selection
  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
    setShowResults(false);
  };

  // Handle search
  const handleSearch = () => {
    if (selectedClass && selectedSection) {
      setShowResults(true);
    }
  };

  // Get data for selected class and section
  const currentData = selectedClass && selectedSection ? allData[selectedClass][selectedSection] : [];
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
    <div className="container mx-auto p-4 max-w-6xl">
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

      <h1 className="text-2xl font-bold mb-6">Guardian Report</h1>
      
      {/* Filter Section */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-6 border border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Select Criteria</h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
          gap: '20px',
          marginBottom: '20px'
        }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Class *</label>
            <select
              value={selectedClass}
              onChange={handleClassChange}
              style={{
                width: '200%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: '#fff'
              }}
            //   className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select</option>
              {classOptions.map((classOpt) => (
                <option key={classOpt} value={classOpt}>{classOpt}</option>
              ))}
            </select>
          </div>
          
          <div style={{ position:'relative',right:'70px'}}>

            <label style={{ position:'relative',left:'307px',display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Section *</label>
            <select
              value={selectedSection}
              onChange={handleSectionChange}
              disabled={!selectedClass}
              style={{
                width: '200%',
                position:'relative',left:'300px',

                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: '#fff'
              }}
            //   className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
              required
            >
              <option value="">Select</option>
              {availableSections.map((section) => (
                <option key={section} value={section}>{section}</option>
              ))}
            </select>
          </div>
        </div>
        
        <button
          onClick={handleSearch}
          disabled={!selectedClass || !selectedSection}
          className={`px-4 py-2 rounded-md text-black font-medium ${selectedClass && selectedSection ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
        >
          Search
        </button>
      </div>
      
      {/* Results Section */}
      {showResults ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-medium">Class ({selectedSection})</h3>
          </div>
          
          {currentData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admission No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile Number</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guardian Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guardian Relation</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guardian Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Father Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Father Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mother Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mother Phone</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentData.map((student, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.admissionNo}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.studentName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.mobileNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.guardianName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.guardianRelation}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.guardianPhone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.fatherName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.fatherPhone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.motherName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.motherPhone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              No data available in table
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white p-8 text-center rounded-lg shadow-sm border border-gray-200 text-gray-500">
          Please select class and section, then click Search to view results
        </div>
      )}
    </div>
  );
};

export default GuardianReport;