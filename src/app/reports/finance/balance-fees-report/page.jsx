"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const BalanceFeesReport = () => {
  // Dummy data structure
     const router = useRouter();
  
     const handleClick1 = () => {
      router.push('../finance/balance-fees-statement'); 
      // yahan apne destination ka route likho
    };
    
    const handleClick2 = () => {
      router.push('../finance/balance-fees-report'); 
  
      // yahan apne destination ka route likho
    };
    const handleClick3 = () => {
      router.push('../finance/balance-fees-report-with-remark'); 
  
      // yahan apne destination ka route likho
    };
    const handleClick4 = () => {
      router.push('../finance/payroll-report'); 
  
      // yahan apne destination ka route likho
    };
    
    const handleClick5 = () => {
      router.push('../finance/online-admission-fees-collection-report'); 
  
      // yahan apne destination ka route likho
    };
    const handleClick6 = () => {
      router.push('../finance/daily-collection-report'); 
  
      // yahan apne destination ka route likho
    };
    const handleClick7 = () => {
      router.push('../finance/balance-fees-statement'); 
  
      // yahan apne destination ka route likho
    };
    const handleClick8 = () => {
      router.push('../finance/income-report'); 
  
      // yahan apne destination ka route likho
    };
    const handleClick9 = () => {
      router.push('../finance/income-group-report'); 
  
      // yahan apne destination ka route likho
    };
    const handleClick10 = () => {
      router.push('../finance/income-expense-balance-report'); 
  
      // yahan apne destination ka route likho
    };
    const handleClick11 = () => {
      router.push('../finance/fees-statement'); 
  
      // yahan apne destination ka route likho
    };
    const handleClick12 = () => {
      router.push('../finance/online-fees-collection-report'); 
  
      // yahan apne destination ka route likho
    };
    const handleClick13 = () => {
      router.push('../finance/expense-report'); 
  
      // yahan apne destination ka route likho
    };
    const handleClick14 = () => {
      router.push('../finance/expense-group-report'); 
  
      // yahan apne destination ka route likho
    };
  const allData = {
    "Class 1": {
      "A": {
        "Balance": [
          {
            studentName: "Ashwani Kumar",
            className: "Class 1 (A)",
            mobileNo: "980678463",
            admissionNo: "120020",
            rollNumber: "100020",
            fatherName: "Arjun Kumar",
            totalFees: "7.28,000.7",
            paidFees: "1.71,500.00",
            discount: "35,000.00",
            fine: "1,750.00",
            balance: "5.21,500.7"
          },
          {
            studentName: "Nathan Smith",
            className: "Class 1 (A)",
            mobileNo: "990678567",
            admissionNo: "120039",
            rollNumber: "100035",
            fatherName: "Jason Smith",
            totalFees: "5.88,000.00",
            paidFees: "24,500.00",
            discount: "0.00",
            fine: "0.00",
            balance: "5.63,500.00"
          }
        ],
        "No Balance": [
          {
            studentName: "xavier barlett",
            className: "Class 1 (A)",
            mobileNo: "0890799657",
            admissionNo: "520039",
            rollNumber: "120025",
            fatherName: "David barlett",
            totalFees: "5.39,000.00",
            paidFees: "0.00",
            discount: "0.00",
            fine: "0.00",
            balance: "5.39,000.00"
          }
        ]
      },
      "B": {
        "Balance": [],
        "No Balance": []
      }
    },
    "Class 2": {
      "A": {
        "Balance": [],
        "No Balance": []
      },
      "B": {
        "Balance": [],
        "No Balance": []
      }
    }
  };

  // State management
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedSearchType, setSelectedSearchType] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [availableSections, setAvailableSections] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [totals, setTotals] = useState({});

  // Get all class options
  const classOptions = Object.keys(allData);
  const searchTypeOptions = ["Balance", "No Balance"];

  // Handle class selection
  const handleClassChange = (e) => {
    const selected = e.target.value;
    setSelectedClass(selected);
    setSelectedSection('');
    setSelectedSearchType('');
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

  // Handle search type selection
  const handleSearchTypeChange = (e) => {
    setSelectedSearchType(e.target.value);
    setShowResults(false);
  };

  // Calculate totals
  const calculateTotals = (data) => {
    const totals = {
      totalFees: 0,
      paidFees: 0,
      discount: 0,
      fine: 0,
      balance: 0
    };

    data.forEach(student => {
      totals.totalFees += parseFloat(student.totalFees.replace(/[^0-9.]/g, ''));
      totals.paidFees += parseFloat(student.paidFees.replace(/[^0-9.]/g, ''));
      totals.discount += parseFloat(student.discount.replace(/[^0-9.]/g, ''));
      totals.fine += parseFloat(student.fine.replace(/[^0-9.]/g, ''));
      totals.balance += parseFloat(student.balance.replace(/[^0-9.]/g, ''));
    });

    return totals;
  };

  // Handle search
  const handleSearch = () => {
    if (selectedClass && selectedSection && selectedSearchType) {
      const data = allData[selectedClass][selectedSection][selectedSearchType];
      if (data.length > 0) {
        setReportData(data);
        setTotals(calculateTotals(data));
      } else {
        setReportData([]);
      }
      setShowResults(true);
    }
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
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '10px',
      marginBottom: '30px'
    }}>
      <button style={commonStyle()} onClick={handleClick1}>Balance Fees Statement</button>
      <button style={commonStyle()} onClick={handleClick2}>Balance Fees Report</button>
      <button style={commonStyle()} onClick={handleClick3}>Balance Fees Report With Remark</button>
      <button style={commonStyle()} onClick={handleClick4}>Payroll Report</button>
      <button style={commonStyle()} onClick={handleClick5}>Online Admission Fees Collection Report</button>
      <button style={commonStyle()} onClick={handleClick6}>Daily Collection Report</button>
      <button style={commonStyle()} onClick={handleClick7}>Fees Collection Report</button>
      <button style={commonStyle()} onClick={handleClick8}>Income Report</button>
      <button style={commonStyle()} onClick={handleClick9}>Income Group Report</button>
      <button style={commonStyle()} onClick={handleClick10}>Income Expense Balance Report</button>
      <button style={commonStyle()} onClick={handleClick11}>Fees Statement</button>
      <button style={commonStyle()} onClick={handleClick12}>Online Fees Collection Report</button>
      <button style={commonStyle()} onClick={handleClick13}>Expense Report</button>
      <button style={commonStyle()} onClick={handleClick14}>Expense Group Report</button>
    </div>
      <h1 style={{ marginBottom: '30px', color: '#333' }}>Balance Fees Report</h1>

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
              value={selectedClass}
              onChange={handleClassChange}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: '#fff'
              }}
            >
              <option value="">Select Class</option>
              {classOptions.map(classOpt => (
                <option key={classOpt} value={classOpt}>{classOpt}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Section *</label>
            <select
              value={selectedSection}
              onChange={handleSectionChange}
              disabled={!selectedClass}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: '#fff',
                opacity: selectedClass ? 1 : 0.7
              }}
            >
              <option value="">Select Section</option>
              {availableSections.map(section => (
                <option key={section} value={section}>{section}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Search Type *</label>
            <select
              value={selectedSearchType}
              onChange={handleSearchTypeChange}
              disabled={!selectedSection}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: '#fff',
                opacity: selectedSection ? 1 : 0.7
              }}
            >
              <option value="">Select Type</option>
              {searchTypeOptions.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
        
        <button
          onClick={handleSearch}
          disabled={!selectedClass || !selectedSection || !selectedSearchType}
          style={{
            padding: '10px 20px',
            backgroundColor: (selectedClass && selectedSection && selectedSearchType) ? '#4CAF50' : '#cccccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: (selectedClass && selectedSection && selectedSearchType) ? 'pointer' : 'not-allowed',
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
          {reportData.length > 0 ? (
            <div>
              <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Student Name</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Class</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Mobile No.</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Admission No</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Roll Number</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Father Name</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Total Fees ($)</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Paid Fees ($)</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Discount ($)</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Fine ($)</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Balance ($)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.map((student, index) => (
                      <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                        <td style={{ padding: '12px' }}>{student.studentName}</td>
                        <td style={{ padding: '12px' }}>{student.className}</td>
                        <td style={{ padding: '12px' }}>{student.mobileNo}</td>
                        <td style={{ padding: '12px' }}>{student.admissionNo}</td>
                        <td style={{ padding: '12px' }}>{student.rollNumber}</td>
                        <td style={{ padding: '12px' }}>{student.fatherName}</td>
                        <td style={{ padding: '12px' }}>{student.totalFees}</td>
                        <td style={{ padding: '12px' }}>{student.paidFees}</td>
                        <td style={{ padding: '12px' }}>{student.discount}</td>
                        <td style={{ padding: '12px' }}>{student.fine}</td>
                        <td style={{ padding: '12px' }}>{student.balance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ textAlign: 'right', marginTop: '20px' }}>
                <table style={{ display: 'inline-block', borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr>
                      <td style={{ padding: '8px', fontWeight: 'bold' }}>Total</td>
                      <td style={{ padding: '8px' }}>{totals.totalFees.toLocaleString('en-IN')}</td>
                      <td style={{ padding: '8px' }}>{totals.paidFees.toLocaleString('en-IN')}</td>
                      <td style={{ padding: '8px' }}>{totals.discount.toLocaleString('en-IN')}</td>
                      <td style={{ padding: '8px' }}>{totals.fine.toLocaleString('en-IN')}</td>
                      <td style={{ padding: '8px' }}>{totals.balance.toLocaleString('en-IN')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '40px', 
              backgroundColor: '#f9f9f9', 
              borderRadius: '5px',
              border: '1px dashed #ddd'
            }}>
              <p>No data available for selected criteria</p>
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
          <p>Please select class, section and search type, then click Search to view results</p>
        </div>
      )}
    </div>
  );
};

export default BalanceFeesReport;