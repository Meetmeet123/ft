"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const FeesStatement = () => {

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
  // Dummy data for dropdowns
  const classOptions = ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5"];
  const sectionOptions = ["A", "B", "C", "D"];
  const studentOptions = [
    { id: "120036", name: "Avan Desai (120036)" },
    { id: "120037", name: "Rohan Sharma (120037)" },
    { id: "120038", name: "Priya Patel (120038)" }
  ];

  // Dummy data for fees records
  const feesData = [
    {
      feesGroup: "211-120036-Ayan (Ayan Desai (120036)) -",
      feesCode: "Avan Desai (120036) -",
      dueDate: "04/10/2025",
      status: "Fres.",
      amount: "24,500.00 + 2,450.00",
      paymentId: "",
      mode: "",
      date: "",
      discount: "0.00",
      fine: "0.00",
      paid: "24,500.00",
      balance: "24,500.00"
    },
    {
      feesGroup: "211-1:20036-Ayan (Ayan Desai (1:20036)-Installment-2",
      feesCode: "Ayan Desai (1:20036)-Installment-2",
      dueDate: "05/10/2025",
      status: "Unpaid",
      amount: "46,375.00",
      paymentId: "",
      mode: "",
      date: "",
      discount: "0.00",
      fine: "0.00",
      paid: "0.00",
      balance: "46,375.00"
    },
    {
      feesGroup: "211-1:20036-Ayan (Ayan Desai (1:20036)-Installment-3",
      feesCode: "Ayan Desai (1:20036)-Installment-3",
      dueDate: "06/10/2025",
      status: "Unpaid",
      amount: "46,375.00",
      paymentId: "",
      mode: "",
      date: "",
      discount: "0.00",
      fine: "0.00",
      paid: "0.00",
      balance: "46,375.00"
    },
    {
      feesGroup: "Class 2 General (Admission Fees)",
      feesCode: "admission-fees",
      dueDate: "04/10/2025",
      status: "Partial",
      amount: "1,75,000.00 + 3,500.00",
      paymentId: "",
      mode: "",
      date: "",
      discount: "35,000.00",
      fine: "0.00",
      paid: "1,05,000.00",
      balance: "35,000.00"
    },
    {
      feesGroup: "Class 2 General (April Month Fees)",
      feesCode: "apr-month-fees",
      dueDate: "04/10/2025",
      status: "Unpaid",
      amount: "24,500.00 + 2,450.00",
      paymentId: "",
      mode: "Card",
      date: "04/01/2025",
      discount: "35,000.00",
      fine: "0.00",
      paid: "1,05,000.00",
      balance: "24,500.00"
    }
  ];

  // Student details
  const studentDetails = {
    name: "Avan Desai",
    fatherName: "Abhinand",
    classSection: "Class 2 (A)",
    admissionNo: "120036",
    mobile: "9067875674",
    rollNo: "23620",
    category: "General",
    rte: "No"
  };

  const [selectedClass, setSelectedClass] = useState("Class 2");
  const [selectedSection, setSelectedSection] = useState("A");
  const [selectedStudent, setSelectedStudent] = useState("120036");
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    setShowResults(true);
  };

  const calculateTotals = () => {
    let amountTotal = 0;
    let paidTotal = 0;
    let balanceTotal = 0;
    
    feesData.forEach(item => {
      amountTotal += parseFloat(item.amount.split('+')[0].replace(/,/g, ''));
      paidTotal += parseFloat(item.paid.replace(/,/g, ''));
      balanceTotal += parseFloat(item.balance.replace(/,/g, ''));
    });
    
    return {
      amount: amountTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      paid: paidTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      balance: balanceTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    };
  };

  const totals = calculateTotals();
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
    <div style={{
      fontFamily: 'Arial, sans-serif',
      margin: '20px',
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '4px',
      boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)'
    }}>
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
      <h2 style={{ margin: '0 0 15px 0', color: '#333' }}>Select Criteria</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ position:'relative',top:'25px', margin: '0 0 10px 0', color: '#333' }}>Class</h3>
        
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '15px',
        //   marginBottom: '15px'
        }}>
          <div style={{  position:'relative',top:'25px', flex: 1, minWidth: '150px' }}>
            <select
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              {classOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          
          <div style={{ flex: 1, minWidth: '100px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Section</label>
            <select
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
            >
              {sectionOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          
          <div style={{ flex: 2, minWidth: '200px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Student</label>
            <select
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
            >
              {studentOptions.map((option) => (
                <option key={option.id} value={option.id}>{option.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div style={{margin:'20px'}}>
      <button style={{
          padding: '6px 12px',
          position:"relative",left:'780px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px'
        }} onClick={handleSearch}>
          Search
        </button>
        </div>
      <h2 style={{ 
        margin: '0 0 15px 0', 
        color: '#333',
        borderBottom: '1px solid #eee',
        paddingBottom: '10px'
      }}>Fees Statement</h2>
      
      {showResults && (
        <>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '15px',
            marginBottom: '20px'
          }}>
            <div>
              <p style={{ margin: '5px 0' }}><strong>Name:</strong> {studentDetails.name}</p>
              <p style={{ margin: '5px 0' }}><strong>Father Name:</strong> {studentDetails.fatherName}</p>
              <p style={{ margin: '5px 0' }}><strong>Mobile Number:</strong> {studentDetails.mobile}</p>
              <p style={{ margin: '5px 0' }}><strong>Category:</strong> {studentDetails.category}</p>
            </div>
            <div>
              <p style={{ margin: '5px 0' }}><strong>Class (Section):</strong> {studentDetails.classSection}</p>
              <p style={{ margin: '5px 0' }}><strong>Admission No:</strong> {studentDetails.admissionNo}</p>
              <p style={{ margin: '5px 0' }}><strong>Roll Number:</strong> {studentDetails.rollNo}</p>
              <p style={{ margin: '5px 0' }}><strong>RTE:</strong> {studentDetails.rte}</p>
            </div>
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <input 
              type="text" 
              style={{
                padding: '8px 12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                minWidth: '300px',
                fontSize: '14px'
              }}
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>Fees Group</h3>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginBottom: '10px',
              fontSize: '14px'
            }}>
              <thead>
                <tr>
                  <th style={{
                    padding: '12px',
                    textAlign: 'left',
                    borderBottom: '1px solid #ddd',
                    backgroundColor: '#f2f2f2',
                    fontWeight: 'bold',
                    color: '#333'
                  }}>Fees Group</th>
                  <th style={{
                    padding: '12px',
                    textAlign: 'left',
                    borderBottom: '1px solid #ddd',
                    backgroundColor: '#f2f2f2',
                    fontWeight: 'bold',
                    color: '#333'
                  }}>Fees Code</th>
                  <th style={{
                    padding: '12px',
                    textAlign: 'left',
                    borderBottom: '1px solid #ddd',
                    backgroundColor: '#f2f2f2',
                    fontWeight: 'bold',
                    color: '#333'
                  }}>Due Date</th>
                  <th style={{
                    padding: '12px',
                    textAlign: 'left',
                    borderBottom: '1px solid #ddd',
                    backgroundColor: '#f2f2f2',
                    fontWeight: 'bold',
                    color: '#333'
                  }}>Status</th>
                  <th style={{
                    padding: '12px',
                    textAlign: 'right',
                    borderBottom: '1px solid #ddd',
                    backgroundColor: '#f2f2f2',
                    fontWeight: 'bold',
                    color: '#333'
                  }}>Amount ($)</th>
                  <th style={{
                    padding: '12px',
                    textAlign: 'left',
                    borderBottom: '1px solid #ddd',
                    backgroundColor: '#f2f2f2',
                    fontWeight: 'bold',
                    color: '#333'
                  }}>Payment ID</th>
                  <th style={{
                    padding: '12px',
                    textAlign: 'left',
                    borderBottom: '1px solid #ddd',
                    backgroundColor: '#f2f2f2',
                    fontWeight: 'bold',
                    color: '#333'
                  }}>Mode</th>
                  <th style={{
                    padding: '12px',
                    textAlign: 'left',
                    borderBottom: '1px solid #ddd',
                    backgroundColor: '#f2f2f2',
                    fontWeight: 'bold',
                    color: '#333'
                  }}>Date</th>
                  <th style={{
                    padding: '12px',
                    textAlign: 'right',
                    borderBottom: '1px solid #ddd',
                    backgroundColor: '#f2f2f2',
                    fontWeight: 'bold',
                    color: '#333'
                  }}>Discount ($)</th>
                  <th style={{
                    padding: '12px',
                    textAlign: 'right',
                    borderBottom: '1px solid #ddd',
                    backgroundColor: '#f2f2f2',
                    fontWeight: 'bold',
                    color: '#333'
                  }}>Fine ($)</th>
                  <th style={{
                    padding: '12px',
                    textAlign: 'right',
                    borderBottom: '1px solid #ddd',
                    backgroundColor: '#f2f2f2',
                    fontWeight: 'bold',
                    color: '#333'
                  }}>Paid ($)</th>
                  <th style={{
                    padding: '12px',
                    textAlign: 'right',
                    borderBottom: '1px solid #ddd',
                    backgroundColor: '#f2f2f2',
                    fontWeight: 'bold',
                    color: '#333'
                  }}>Balance ($)</th>
                </tr>
              </thead>
              <tbody>
                {feesData.map((item, index) => (
                  <tr key={index} style={{
                    ':hover': { backgroundColor: '#f5f5f5' }
                  }}>
                    <td style={{
                      padding: '12px',
                      textAlign: 'left',
                      borderBottom: '1px solid #ddd'
                    }}>{item.feesGroup}</td>
                    <td style={{
                      padding: '12px',
                      textAlign: 'left',
                      borderBottom: '1px solid #ddd'
                    }}>{item.feesCode}</td>
                    <td style={{
                      padding: '12px',
                      textAlign: 'left',
                      borderBottom: '1px solid #ddd'
                    }}>{item.dueDate}</td>
                    <td style={{
                      padding: '12px',
                      textAlign: 'left',
                      borderBottom: '1px solid #ddd',
                      color: item.status === 'Unpaid' ? '#F44336' : 
                            item.status === 'Partial' ? '#FF9800' : '#4CAF50'
                    }}>{item.status}</td>
                    <td style={{
                      padding: '12px',
                      textAlign: 'right',
                      borderBottom: '1px solid #ddd',
                      fontFamily: "'Courier New', monospace"
                    }}>{item.amount}</td>
                    <td style={{
                      padding: '12px',
                      textAlign: 'left',
                      borderBottom: '1px solid #ddd'
                    }}>{item.paymentId}</td>
                    <td style={{
                      padding: '12px',
                      textAlign: 'left',
                      borderBottom: '1px solid #ddd'
                    }}>{item.mode}</td>
                    <td style={{
                      padding: '12px',
                      textAlign: 'left',
                      borderBottom: '1px solid #ddd'
                    }}>{item.date}</td>
                    <td style={{
                      padding: '12px',
                      textAlign: 'right',
                      borderBottom: '1px solid #ddd',
                      fontFamily: "'Courier New', monospace"
                    }}>{item.discount}</td>
                    <td style={{
                      padding: '12px',
                      textAlign: 'right',
                      borderBottom: '1px solid #ddd',
                      fontFamily: "'Courier New', monospace"
                    }}>{item.fine}</td>
                    <td style={{
                      padding: '12px',
                      textAlign: 'right',
                      borderBottom: '1px solid #ddd',
                      fontFamily: "'Courier New', monospace"
                    }}>{item.paid}</td>
                    <td style={{
                      padding: '12px',
                      textAlign: 'right',
                      borderBottom: '1px solid #ddd',
                      fontFamily: "'Courier New', monospace"
                    }}>{item.balance}</td>
                  </tr>
                ))}
                <tr style={{ fontWeight: 'bold', backgroundColor: '#f2f2f2' }}>
                  <td colSpan="4" style={{
                    padding: '12px',
                    textAlign: 'left',
                    borderBottom: '1px solid #ddd'
                  }}>Total</td>
                  <td style={{
                    padding: '12px',
                    textAlign: 'right',
                    borderBottom: '1px solid #ddd',
                    fontFamily: "'Courier New', monospace"
                  }}>{totals.amount}</td>
                  <td colSpan="3"></td>
                  <td style={{
                    padding: '12px',
                    textAlign: 'right',
                    borderBottom: '1px solid #ddd',
                    fontFamily: "'Courier New', monospace"
                  }}></td>
                  <td style={{
                    padding: '12px',
                    textAlign: 'right',
                    borderBottom: '1px solid #ddd',
                    fontFamily: "'Courier New', monospace"
                  }}></td>
                  <td style={{
                    padding: '12px',
                    textAlign: 'right',
                    borderBottom: '1px solid #ddd',
                    fontFamily: "'Courier New', monospace"
                  }}>{totals.paid}</td>
                  <td style={{
                    padding: '12px',
                    textAlign: 'right',
                    borderBottom: '1px solid #ddd',
                    fontFamily: "'Courier New', monospace"
                  }}>{totals.balance}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
      
     
    </div>
  );
};

export default FeesStatement;