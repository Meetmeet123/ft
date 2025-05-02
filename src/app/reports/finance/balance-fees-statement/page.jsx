"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const BalanceFeesStatement = () => {
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
          name: "Ashwani Kumar",
          fatherName: "Arjun Kumar",
          admissionNo: "120020",
          fees: [
            {
              feesGroup: "Class 1 General (April Month Fees)",
              feesCode: "apr-month-fees",
              dueDate: "04/10/2025",
              status: "Failed",
              amount: "24,500.00 + 3,500.00",
              paymentId: "",
              mode: "",
              date: "",
              discount: "0.00",
              fine: "0.00",
              paid: "14,000.00",
              balance: "10,500.00"
            },
            {
              feesGroup: "26b-120020-Ashwani (Ashwani Kumar (120020) - Installment-1)",
              feesCode: "Ashwani Kumar (120020) - Installment-1",
              dueDate: "04/10/2025",
              status: "Failed",
              amount: "35,000.00 + 3,500.00",
              paymentId: "",
              mode: "",
              date: "",
              discount: "0.00",
              fine: "0.00",
              paid: "0.00",
              balance: "35,000.00"
            }
          ],
          grandTotal: "77,000.00 + 28,000.00",
          totalDiscount: "0.00",
          totalFine: "0.00",
          totalPaid: "14,000.00",
          totalBalance: "63,000.00"
        },
        {
          name: "Nathan Smith",
          fatherName: "Jason Smith",
          admissionNo: "120339",
          fees: [
            {
              feesGroup: "Class I General (Admission Fees)",
              feesCode: "admission-fees",
              dueDate: "04/10/2025",
              status: "Unpaid",
              amount: "1,75,000.00 + 17,500.00",
              paymentId: "",
              mode: "",
              date: "",
              discount: "0.00",
              fine: "0.00",
              paid: "0.00",
              balance: "1,75,000.00"
            }
          ],
          grandTotal: "2,13,500.00 + 40,950.00",
          totalDiscount: "0.00",
          totalFine: "0.00",
          totalPaid: "0.00",
          totalBalance: "2,13,500.00"
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
  const [studentData, setStudentData] = useState(null);

  // Get all class options
  const classOptions = Object.keys(allData);

  // Handle class selection
  const handleClassChange = (e) => {
    const selected = e.target.value;
    setSelectedClass(selected);
    setSelectedSection('');
    setShowResults(false);
    setStudentData(null);
    
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
    setStudentData(null);
  };

  // Handle search
  const handleSearch = () => {
    if (selectedClass && selectedSection) {
      const students = allData[selectedClass][selectedSection];
      if (students.length > 0) {
        setStudentData(students);
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
      <h1 style={{ marginBottom: '30px', color: '#333' }}>Balance Fees Statement</h1>

      {/* Filter Section */}
      <div style={{ 
        marginBottom: '30px', 
        backgroundColor: '#f5f5f5', 
        padding: '20px', 
        borderRadius: '5px',
        border: '1px solid #ddd'
      }}>
        <h2 style={{ marginBottom: '20px' }}>Search Criteria</h2>
        
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
        
        <button
          onClick={handleSearch}
          disabled={!selectedClass || !selectedSection}
          style={{
            padding: '10px 20px',
            backgroundColor: selectedClass && selectedSection ? '#4CAF50' : '#cccccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: selectedClass && selectedSection ? 'pointer' : 'not-allowed',
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
          {studentData ? (
            studentData.map((student, index) => (
              <div key={index} style={{ marginBottom: '40px' }}>
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ marginBottom: '10px' }}>Admin: <strong>1.00%</strong></h3>
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '15px' }}>
                    <tbody>
                      <tr>
                      <td style={{ padding: '8px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Admission No:: {student.admissionNo}</td>
                     

                        <td style={{ padding: '8px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Name: {student.name}</td>
                        <td style={{ padding: '8px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Father Name: {student.fatherName}</td>
                        <td style={{ padding: '8px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Class (Section): {selectedClass} ({selectedSection})</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Fees Group</th>
                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Fees Code</th>
                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Due Date</th>
                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Status</th>
                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Amount ($)</th>
                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Payment ID</th>
                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Mode</th>
                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Date</th>
                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Discount ($)</th>
                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Fine ($)</th>
                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Paid ($)</th>
                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Balance ($)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {student.fees.map((fee, feeIndex) => (
                        <tr key={feeIndex} style={{ borderBottom: '1px solid #ddd' }}>
                          <td style={{ padding: '12px' }}>{fee.feesGroup}</td>
                          <td style={{ padding: '12px' }}>{fee.feesCode}</td>
                          <td style={{ padding: '12px' }}>{fee.dueDate}</td>
                          <td style={{ padding: '12px', fontWeight: 'bold' }}>{fee.status}</td>
                          <td style={{ padding: '12px' }}>{fee.amount}</td>
                          <td style={{ padding: '12px' }}>{fee.paymentId}</td>
                          <td style={{ padding: '12px' }}>{fee.mode}</td>
                          <td style={{ padding: '12px' }}>{fee.date}</td>
                          <td style={{ padding: '12px' }}>{fee.discount}</td>
                          <td style={{ padding: '12px' }}>{fee.fine}</td>
                          <td style={{ padding: '12px' }}>{fee.paid}</td>
                          <td style={{ padding: '12px' }}>{fee.balance}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div style={{ marginTop: '20px', textAlign: 'right' }}>
                  <table style={{ display: 'inline-block', borderCollapse: 'collapse' }}>
                    <tbody>
                      <tr>
                        <td style={{ padding: '8px', fontWeight: 'bold' }}>Grand Total</td>
                        <td style={{ padding: '8px' }}>{student.grandTotal}</td>
                        <td style={{ padding: '8px' }}>{student.totalDiscount}</td>
                        <td style={{ padding: '8px' }}>{student.totalFine}</td>
                        <td style={{ padding: '8px' }}>{student.totalPaid}</td>
                        <td style={{ padding: '8px' }}>{student.totalBalance}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div style={{ marginTop: '10px' }}>
                  <p><strong>Admission No:</strong> {student.admissionNo}</p>
                </div>
              </div>
            ))
          ) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '40px', 
              backgroundColor: '#f9f9f9', 
              borderRadius: '5px',
              border: '1px dashed #ddd'
            }}>
              <p>No data available for selected class and section</p>
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

export default BalanceFeesStatement;