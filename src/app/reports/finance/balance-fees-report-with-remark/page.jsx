"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const BalanceFeesReportWithRemark = () => {
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
      "A": [
        {
          studentName: "Ashwani Kumar",
          admissionNo: "120020",
          className: "Class 1-A",
          feesDetails: [
            "Class 1 General (April Month Fees : apr-month-fees)",
            "Class 1 Lump Sum (Lumpsum fees : lumpsum-fees)",
            "Class 1-1 Installment (April Month Fees : apr-month-fees)",
            "26b-120020-Ashwani (Ashwani Kumar (120020) - Installment-1 : Ashwani Kumar (120020) - Installment-1)"
          ].join(", "),
          amount: "77,000.00",
          paid: "14,000.00",
          balance: "63,000.00",
          guardianPhone: "789678456",
          remark: ""
        },
        {
          studentName: "Nathan Smith",
          admissionNo: "120039",
          className: "Class 1-A",
          feesDetails: [
            "Class 1 General (Admission Fees : admission-fees)",
            "Class 1 General (Bus-fees : Bus-fees)",
            "Class 1 Lump Sum (Lumpsum fees : lumpsum-fees)",
            "Class 1-1 Installment (April Month Fees : apr-month-fees)"
          ].join(", "),
          amount: "2,13,500.00",
          paid: "0.00",
          balance: "2,13,500.00",
          guardianPhone: "8905754623",
          remark: ""
        }
      ],
      "B": []
    },
    "Class 2": {
      "A": [],
      "B": []
    }
  };

  // State management
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [availableSections, setAvailableSections] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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
      const data = allData[selectedClass][selectedSection];
      setReportData(data);
      setShowResults(true);
    }
  };

  // Handle print
  const handlePrint = () => {
    window.print();
  };

  // Filter data based on search term
  const filteredData = reportData.filter(student => 
    student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.admissionNo.includes(searchTerm) ||
    student.guardianPhone.includes(searchTerm)
  );
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
      <h1 style={{ marginBottom: '30px', color: '#333' }}>Balance Fees Report With Remark</h1>

      {/* Filter Section */}
      <div style={{ 
        marginBottom: '30px', 
        backgroundColor: '#f5f5f5', 
        padding: '20px', 
        borderRadius: '5px',
        border: '1px solid #ddd'
      }}>
      <div style={{ 
          display: 'flex',
          gap: '20px',
          marginBottom: '20px'
        }}>
          <div style={{ flex: 1 }}>
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
          
          <div style={{ flex: 1 }}>
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
        </div>
        
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleSearch}
            disabled={!selectedClass || !selectedSection}
            style={{
              padding: '10px 20px',
              backgroundColor: (selectedClass && selectedSection) ? '#4CAF50' : '#cccccc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: (selectedClass && selectedSection) ? 'pointer' : 'not-allowed',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            Search
          </button>

          {showResults && (
            <button
              onClick={handlePrint}
              style={{
                padding: '10px 20px',
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              Print
            </button>
          )}
        </div>
      </div>

      {/* Search Box */}
      {showResults && (
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search by name, admission no or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          />
        </div>
      )}

      {/* Results Section */}
      {showResults ? (
        <div>
          {filteredData.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Student Name (Admission No)</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Class</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Fees</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Amount (%)</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Paid (%)</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Balance (%)</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Guardian Phone</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Remark</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((student, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                      <td style={{ padding: '12px' }}>{student.studentName} ({student.admissionNo})</td>
                      <td style={{ padding: '12px' }}>{student.className}</td>
                      <td style={{ padding: '12px' }}>{student.feesDetails}</td>
                      <td style={{ padding: '12px' }}>{student.amount}</td>
                      <td style={{ padding: '12px' }}>{student.paid}</td>
                      <td style={{ padding: '12px' }}>{student.balance}</td>
                      <td style={{ padding: '12px' }}>{student.guardianPhone}</td>
                      <td style={{ padding: '12px' }}>
                        <input 
                          type="text" 
                          value={student.remark} 
                          onChange={(e) => {
                            const newData = [...reportData];
                            newData[index].remark = e.target.value;
                            setReportData(newData);
                          }}
                          style={{
                            width: '100%',
                            padding: '5px',
                            border: '1px solid #ddd',
                            borderRadius: '3px'
                          }}
                        />
                      </td>
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
          <p>Please select class and section, then click Search to view results</p>
        </div>
      )}
    </div>
  );
};

export default BalanceFeesReportWithRemark;