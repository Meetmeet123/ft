"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const OnlineAdmissionFeesCollectionReport = () => {
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
  const feesData = {
    "Today": [ {
        referenceNo: "587654",
        name: "John Doe",
        admissionNo: "520040",
        email: "john.doe@example.com",
        mobileNumber: "0890793658",
        className: "Class 2 (B)",
        paymentMethod: "Stripe",
        transactionId: "174358193403",
        date: "03/15/2025",
        amount: "10,500.00"
      }
    ],
    "Last 3 Months": [
      {
        referenceNo: "588866",
        name: "xavier barilett",
        admissionNo: "520039",
        email: "barilet132@gmail.com",
        mobileNumber: "0890793657",
        className: "Class 1 (A)",
        paymentMethod: "Paystack",
        transactionId: "174358193402",
        date: "04/02/2025",
        amount: "8,400.00"
      },
      {
        referenceNo: "587654",
        name: "John Doe",
        admissionNo: "520040",
        email: "john.doe@example.com",
        mobileNumber: "0890793658",
        className: "Class 2 (B)",
        paymentMethod: "Stripe",
        transactionId: "174358193403",
        date: "03/15/2025",
        amount: "10,500.00"
      },
      {
        referenceNo: "586543",
        name: "Jane Smith",
        admissionNo: "520041",
        email: "jane.smith@example.com",
        mobileNumber: "0890793659",
        className: "Class 3 (C)",
        paymentMethod: "PayPal",
        transactionId: "174358193404",
        date: "02/20/2025",
        amount: "12,600.00"
      }],
    "This Week": [],
    "This Month": [
      {
        referenceNo: "588866",
        name: "xavier barilett",
        admissionNo: "520039",
        email: "barilet132@gmail.com",
        mobileNumber: "0890793657",
        className: "Class 1 (A)",
        paymentMethod: "Paystack",
        transactionId: "174358193402",
        date: "04/02/2025",
        amount: "8,400.00"
      }
    ],
    "Last Month": [
      {
        referenceNo: "587654",
        name: "John Doe",
        admissionNo: "520040",
        email: "john.doe@example.com",
        mobileNumber: "0890793658",
        className: "Class 2 (B)",
        paymentMethod: "Stripe",
        transactionId: "174358193403",
        date: "03/15/2025",
        amount: "10,500.00"
      }
    ],
    "Last 3 Months": [
      {
        referenceNo: "588866",
        name: "xavier barilett",
        admissionNo: "520039",
        email: "barilet132@gmail.com",
        mobileNumber: "0890793657",
        className: "Class 1 (A)",
        paymentMethod: "Paystack",
        transactionId: "174358193402",
        date: "04/02/2025",
        amount: "8,400.00"
      },
      {
        referenceNo: "587654",
        name: "John Doe",
        admissionNo: "520040",
        email: "john.doe@example.com",
        mobileNumber: "0890793658",
        className: "Class 2 (B)",
        paymentMethod: "Stripe",
        transactionId: "174358193403",
        date: "03/15/2025",
        amount: "10,500.00"
      },
      {
        referenceNo: "586543",
        name: "Jane Smith",
        admissionNo: "520041",
        email: "jane.smith@example.com",
        mobileNumber: "0890793659",
        className: "Class 3 (C)",
        paymentMethod: "PayPal",
        transactionId: "174358193404",
        date: "02/20/2025",
        amount: "12,600.00"
      }
    ]
  };

  // State management
  const [selectedSearchType, setSelectedSearchType] = useState('This Month');
  const [showResults, setShowResults] = useState(false);
  const [reportData, setReportData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Search type options
  const searchTypeOptions = ["Today", "This Week", "This Month", "Last Month", "Last 3 Months"];

  // Handle search type selection
  const handleSearchTypeChange = (e) => {
    setSelectedSearchType(e.target.value);
    setShowResults(false);
  };

  // Calculate total amount
  const calculateTotal = (data) => {
    return data.reduce((sum, item) => {
      return sum + parseFloat(item.amount.replace(/,/g, ''));
    }, 0);
  };

  // Handle search
  const handleSearch = () => {
    if (selectedSearchType) {
      const data = feesData[selectedSearchType];
      setReportData(data);
      setTotalAmount(calculateTotal(data));
      setShowResults(true);
    }
  };

  // Handle print
  const handlePrint = () => {
    const printContent = document.getElementById('printable-table').innerHTML;
    const originalContent = document.body.innerHTML;
    
    document.body.innerHTML = `
      <style>
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-table, #printable-table * {
            visibility: visible;
          }
          #printable-table {
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
        }
      </style>
      ${printContent}
    `;
    
    window.print();
    document.body.innerHTML = originalContent;
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
      <h1 style={{ marginBottom: '30px', color: '#333' }}>Online Admission Fees Collection Report</h1>

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
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Search Type *</label>
            <select
              value={selectedSearchType}
              onChange={handleSearchTypeChange}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: '#fff'
              }}
            >
              {searchTypeOptions.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleSearch}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            Search
          </button>

         
        </div>
      </div>

      {/* Results Section */}
      {showResults ? (
        <div>
          {reportData.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table id="printable-table" style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Reference No</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Name</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Admission No</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Email</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Mobile Number</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Class</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Payment Methods</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Transaction ID</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Date</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Amount (¥)</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((item, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                      <td style={{ padding: '12px' }}>{item.referenceNo}</td>
                      <td style={{ padding: '12px' }}>{item.name}</td>
                      <td style={{ padding: '12px' }}>{item.admissionNo}</td>
                      <td style={{ padding: '12px' }}>{item.email}</td>
                      <td style={{ padding: '12px' }}>{item.mobileNumber}</td>
                      <td style={{ padding: '12px' }}>{item.className}</td>
                      <td style={{ padding: '12px' }}>{item.paymentMethod}</td>
                      <td style={{ padding: '12px' }}>{item.transactionId}</td>
                      <td style={{ padding: '12px' }}>{item.date}</td>
                      <td style={{ padding: '12px' }}>{item.amount}</td>
                    </tr>
                  ))}
                  <tr className="total-row" style={{ borderTop: '2px solid #000' }}>
                    <td colSpan="9" style={{ padding: '12px', textAlign: 'right', fontWeight: 'bold' }}>Total</td>
                    <td style={{ padding: '12px', fontWeight: 'bold' }}>{totalAmount.toLocaleString('en-IN')}</td>
                  </tr>
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
          <p>Please select search type, then click Search to view results</p>
        </div>
      )}
    </div>
  );
};

export default OnlineAdmissionFeesCollectionReport;