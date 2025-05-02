"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const DailyCollectionReport = () => {
  const router = useRouter();

  // Navigation handlers
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

  // Complete dummy data with all dates
  const collectionData = {
    "03/14/2025": { totalTransactions: 0, totalAmount: "₹0.00", transactions: [] },
    "03/15/2025": { totalTransactions: 0, totalAmount: "₹0.00", transactions: [] },
    "03/16/2025": { totalTransactions: 0, totalAmount: "₹0.00", transactions: [] },
    "03/17/2025": { totalTransactions: 0, totalAmount: "₹0.00", transactions: [] },
    "03/18/2025": { totalTransactions: 0, totalAmount: "₹0.00", transactions: [] },
    "03/19/2025": { totalTransactions: 0, totalAmount: "₹0.00", transactions: [] },
    "03/20/2025": { totalTransactions: 0, totalAmount: "₹0.00", transactions: [] },
    "03/21/2025": { totalTransactions: 0, totalAmount: "₹0.00", transactions: [] },
    "03/22/2025": { totalTransactions: 0, totalAmount: "₹0.00", transactions: [] },
    "03/23/2025": { totalTransactions: 0, totalAmount: "₹0.00", transactions: [] },
    "03/24/2025": { totalTransactions: 0, totalAmount: "₹0.00", transactions: [] },
    "03/25/2025": { totalTransactions: 0, totalAmount: "₹0.00", transactions: [] },
    "03/26/2025": { totalTransactions: 0, totalAmount: "₹0.00", transactions: [] },
    "03/27/2025": { totalTransactions: 0, totalAmount: "₹0.00", transactions: [] },
    "03/28/2025": { totalTransactions: 0, totalAmount: "₹0.00", transactions: [] },
    "03/29/2025": { totalTransactions: 0, totalAmount: "₹0.00", transactions: [] },
    "03/30/2025": { totalTransactions: 0, totalAmount: "₹0.00", transactions: [] },
    "03/31/2025": { totalTransactions: 0, totalAmount: "₹0.00", transactions: [] },
    "04/01/2025": {
      totalTransactions: 4,
      totalAmount: "₹3,88,500.00",
      transactions: [
        {
          admissionNo: "120020",
          name: "Ashwani Kumar",
          fatherName: "Arjun Kumar",
          className: "Class 1 (A)",
          paymentMode: "Cash",
          paymentId: "1047/1",
          collectedBy: "Joe Black(9000)",
          fine: "¥0.00",
          amount: "¥14,000.00",
          total: "¥14,000.00"
        },
        {
          admissionNo: "120036",
          name: "Ayan Desai",
          fatherName: "Abhinand",
          className: "Class 2 (A)",
          paymentMode: "Cash",
          paymentId: "1048/1",
          collectedBy: "Joe Black(9000)",
          fine: "¥0.00",
          amount: "¥24,500.00",
          total: "¥24,500.00"
        },
        {
          admissionNo: "120036",
          name: "Ayan Desai",
          fatherName: "Abhinand",
          className: "Class 2 (A)",
          paymentMode: "Card",
          paymentId: "1049/1",
          collectedBy: "Joe Black(9000)",
          fine: "¥0.00",
          amount: "¥1,05,000.00",
          total: "¥1,05,000.00"
        },
        {
          admissionNo: "18001",
          name: "Edward Thomas",
          fatherName: "Olivier Thomas",
          className: "Class 5 (A)",
          paymentMode: "Cheque",
          paymentId: "1056/1",
          collectedBy: "Joe Black(9000)",
          fine: "¥0.00",
          amount: "¥2,45,000.00",
          total: "¥2,45,000.00"
        }
      ]
    }
  };

  // State management
  const [dateFrom, setDateFrom] = useState('03/14/2025');
  const [dateTo, setDateTo] = useState('04/01/2025');
  const [showResults, setShowResults] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [dailyData, setDailyData] = useState([]);
  const [transactionDetails, setTransactionDetails] = useState([]);

  // Common button style
  const commonStyle = () => ({
    padding: '10px',
    backgroundColor: '#f0f0f0',
    color: '#333',
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

  // Handle date from change
  const handleDateFromChange = (e) => {
    setDateFrom(e.target.value);
    setShowResults(false);
  };

  // Handle date to change
  const handleDateToChange = (e) => {
    setDateTo(e.target.value);
    setShowResults(false);
  };

  // Handle search
  const handleSearch = () => {
    if (dateFrom && dateTo) {
      // Generate all dates in range
      const startDate = new Date(dateFrom);
      const endDate = new Date(dateTo);
      const datesInRange = [];
      
      let currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        const formattedDate = `${String(currentDate.getMonth() + 1).padStart(2, '0')}/${String(currentDate.getDate()).padStart(2, '0')}/${currentDate.getFullYear()}`;
        datesInRange.push(formattedDate);
        currentDate.setDate(currentDate.getDate() + 1);
      }

      // Get data for each date
      const data = datesInRange.map(date => ({
        date,
        totalTransactions: collectionData[date]?.totalTransactions || 0,
        totalAmount: collectionData[date]?.totalAmount || "₹0.00"
      }));
      
      setDailyData(data);
      setShowResults(true);
      setShowDetails(false);
    }
  };

  // Handle view details
  const handleViewDetails = (date) => {
    setSelectedDate(date);
    setTransactionDetails(collectionData[date]?.transactions || []);
    setShowDetails(true);
  };

  // Handle print
  const handlePrint = () => {
    const printContent = document.getElementById(showDetails ? 'printable-details' : 'printable-summary').innerHTML;
    const originalContent = document.body.innerHTML;
    
    document.body.innerHTML = `
      <style>
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-summary, #printable-summary *,
          #printable-details, #printable-details * {
            visibility: visible;
          }
          #printable-summary, #printable-details {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid #000;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
            font-weight: bold;
          }
          .total-row {
            font-weight: bold;
          }
          .action-btn {
            display: none;
          }
        }
      </style>
      ${printContent}
    `;
    
    window.print();
    document.body.innerHTML = originalContent;
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* Navigation Buttons */}
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

      <h1 style={{ marginBottom: '30px', color: '#333' }}>Daily Collection Report</h1>

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
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Date From *</label>
            <input
              type="date"
              value={dateFrom}
              onChange={handleDateFromChange}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: '#fff'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Date To *</label>
            <input
              type="date"
              value={dateTo}
              onChange={handleDateToChange}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: '#fff'
              }}
            />
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleSearch}
            disabled={!dateFrom || !dateTo}
            style={{
              padding: '10px 20px',
              backgroundColor: (dateFrom && dateTo) ? '#4CAF50' : '#cccccc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: (dateFrom && dateTo) ? 'pointer' : 'not-allowed',
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

      {/* Results Section */}
      {showResults ? (
        <div>
          {!showDetails ? (
            <div>
              <h2 style={{ marginBottom: '20px' }}>Daily Collection Report</h2>
              <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
                <table id="printable-summary" style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Date</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Total Transactions</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Amount</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dailyData.map((day, index) => (
                      <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                        <td style={{ padding: '12px' }}>{day.date}</td>
                        <td style={{ padding: '12px' }}>{day.totalTransactions}</td>
                        <td style={{ padding: '12px' }}>{day.totalAmount}</td>
                        <td style={{ padding: '12px' }}>
                          {day.totalTransactions > 0 && (
                            <button
                              onClick={() => handleViewDetails(day.date)}
                              style={{
                                padding: '5px 10px',
                                backgroundColor: '#ff9800',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px'
                              }}
                            >
                              <span>View</span>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                              </svg>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div>
              <button
                onClick={() => setShowDetails(false)}
                style={{
                  padding: '8px 15px',
                  backgroundColor: '#607d8b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                Back to Summary
              </button>

              <h2 style={{ marginBottom: '20px' }}>Collection List - {selectedDate}</h2>
              <div style={{ overflowX: 'auto' }}>
                <table id="printable-details" style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Admission No</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Name</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Father Name</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Class</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Payment Mode</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Payment ID</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Collected By</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Fine</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Amount</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactionDetails.map((transaction, index) => (
                      <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                        <td style={{ padding: '12px' }}>{transaction.admissionNo}</td>
                        <td style={{ padding: '12px' }}>{transaction.name}</td>
                        <td style={{ padding: '12px' }}>{transaction.fatherName}</td>
                        <td style={{ padding: '12px' }}>{transaction.className}</td>
                        <td style={{ padding: '12px' }}>{transaction.paymentMode}</td>
                        <td style={{ padding: '12px' }}>{transaction.paymentId}</td>
                        <td style={{ padding: '12px' }}>{transaction.collectedBy}</td>
                        <td style={{ padding: '12px', fontWeight: 'bold' }}>{transaction.fine}</td>
                        <td style={{ padding: '12px' }}>{transaction.amount}</td>
                        <td style={{ padding: '12px' }}>{transaction.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ marginTop: '20px', textAlign: 'right' }}>
                <p style={{ fontWeight: 'bold' }}>Record: 1 to {transactionDetails.length} of {transactionDetails.length}</p>
              </div>
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
          <p>Please select date range, then click Search to view results</p>
        </div>
      )}
    </div>
  );
};

export default DailyCollectionReport;