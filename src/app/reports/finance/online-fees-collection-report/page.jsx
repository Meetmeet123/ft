"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const FeesReport = () => {
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
  // Dummy data
  const dummyData = [
    {
      paymentId: "1063/1",
      date: "04/15/2025",
      admissionNo: "18020",
      name: "Jhony Taylor (B)",
      class: "Class 4",
      feeType: "Jhony Taylor (18020) - Installment-4",
      mode: "Bank Payment",
      transactionDescription: "Amount credited through offline bank payment Request ID : 196",
      amount: "2.45,000.00",
      discount: "0.00",
      fine: "0.00",
      total: "2.45,000.00"
    },
    {
      paymentId: "1064/1",
      date: "04/16/2025",
      admissionNo: "18021",
      name: "Sarah Smith (A)",
      class: "Class 5",
      feeType: "Sarah Smith (18021) - Installment-2",
      mode: "Credit Card",
      transactionDescription: "Online payment via credit card",
      amount: "1.50,000.00",
      discount: "5,000.00",
      fine: "0.00",
      total: "1.45,000.00"
    },
    {
      paymentId: "1065/1",
      date: "04/10/2025",
      admissionNo: "18022",
      name: "Michael Johnson (C)",
      class: "Class 3",
      feeType: "Michael Johnson (18022) - Annual Fee",
      mode: "Bank Transfer",
      transactionDescription: "Direct bank transfer",
      amount: "3.00,000.00",
      discount: "10,000.00",
      fine: "500.00",
      total: "2.90,500.00"
    }
  ];

  const [searchType, setSearchType] = useState("Last Week");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    let results = [...dummyData];
    
    // Filter by search type (time period)
    const today = new Date();
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);
    const lastMonth = new Date(today);
    lastMonth.setMonth(today.getMonth() - 1);
    const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    
    if (searchType === "Today") {
      results = results.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate.toDateString() === today.toDateString();
      });
    } else if (searchType === "This Week") {
      results = results.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= lastWeek && itemDate <= today;
      });
    } else if (searchType === "This Month") {
      results = results.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= thisMonthStart && itemDate <= today;
      });
    } else if (searchType === "Last Week") {
      const twoWeeksAgo = new Date(lastWeek);
      twoWeeksAgo.setDate(lastWeek.getDate() - 7);
      results = results.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= twoWeeksAgo && itemDate <= lastWeek;
      });
    } else if (searchType === "Last Month") {
      const twoMonthsAgo = new Date(lastMonth);
      twoMonthsAgo.setMonth(lastMonth.getMonth() - 1);
      results = results.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= twoMonthsAgo && itemDate <= lastMonth;
      });
    }
    
    // Filter by search query if provided
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(item => 
        item.paymentId.toLowerCase().includes(query) ||
        item.admissionNo.toLowerCase().includes(query) ||
        item.name.toLowerCase().includes(query) ||
        item.class.toLowerCase().includes(query) ||
        item.feeType.toLowerCase().includes(query)
      );
    }
    
    setFilteredData(results);
    setHasSearched(true);
  };

  const calculateTotals = () => {
    let amountTotal = 0;
    let discountTotal = 0;
    let fineTotal = 0;
    let grandTotal = 0;
    
    filteredData.forEach(item => {
      amountTotal += parseFloat(item.amount.replace(/\./g, '').replace(/,/g, '.'));
      discountTotal += parseFloat(item.discount.replace(/\./g, '').replace(/,/g, '.'));
      fineTotal += parseFloat(item.fine.replace(/\./g, '').replace(/,/g, '.'));
      grandTotal += parseFloat(item.total.replace(/\./g, '').replace(/,/g, '.'));
    });
    
    return {
      amount: amountTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/\./g, ','),
      discount: discountTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/\./g, ','),
      fine: fineTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/\./g, ','),
      grandTotal: grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/\./g, ',')
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
      <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>Select Criteria</h3>
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '15px',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <label style={{ fontWeight: 'bold' }}>Search Type *</label>
        <select 
          style={{
            padding: '6px 10px',
            width:'200px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            backgroundColor: '#f9f9f9',
            fontSize: '14px',
            marginRight: '10px'
          }}
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="Today">Today</option>
          <option value="This Week">This Week</option>
          <option value="This Month">This Month</option>
          <option value="Last Week">Last Week</option>
          <option value="Last Month">Last Month</option>
        </select>
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
      }}>Online Fees Report</h2>
      
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '15px',
        flexWrap: 'wrap'
      }}>
        <input 
          type="text" 
          style={{
            padding: '6px 10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            minWidth: '200px',
            fontSize: '14px'
          }}
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        
        
      </div>
      
      {hasSearched && (
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
                  padding: '10px',
                  textAlign: 'left',
                  borderBottom: '1px solid #ddd',
                  backgroundColor: '#f2f2f2',
                  fontWeight: 'bold',
                  color: '#333'
                }}>Payment ID</th>
                <th style={{
                  padding: '10px',
                  textAlign: 'left',
                  borderBottom: '1px solid #ddd',
                  backgroundColor: '#f2f2f2',
                  fontWeight: 'bold',
                  color: '#333'
                }}>Date</th>
                <th style={{
                  padding: '10px',
                  textAlign: 'left',
                  borderBottom: '1px solid #ddd',
                  backgroundColor: '#f2f2f2',
                  fontWeight: 'bold',
                  color: '#333'
                }}>Admission No</th>
                <th style={{
                  padding: '10px',
                  textAlign: 'left',
                  borderBottom: '1px solid #ddd',
                  backgroundColor: '#f2f2f2',
                  fontWeight: 'bold',
                  color: '#333'
                }}>Name</th>
                <th style={{
                  padding: '10px',
                  textAlign: 'left',
                  borderBottom: '1px solid #ddd',
                  backgroundColor: '#f2f2f2',
                  fontWeight: 'bold',
                  color: '#333'
                }}>Class</th>
                <th style={{
                  padding: '10px',
                  textAlign: 'left',
                  borderBottom: '1px solid #ddd',
                  backgroundColor: '#f2f2f2',
                  fontWeight: 'bold',
                  color: '#333'
                }}>Fee Type</th>
                <th style={{
                  padding: '10px',
                  textAlign: 'left',
                  borderBottom: '1px solid #ddd',
                  backgroundColor: '#f2f2f2',
                  fontWeight: 'bold',
                  color: '#333'
                }}>Mode</th>
                <th style={{
                  padding: '10px',
                  textAlign: 'left',
                  borderBottom: '1px solid #ddd',
                  backgroundColor: '#f2f2f2',
                  fontWeight: 'bold',
                  color: '#333'
                }}>Transaction Description</th>
                <th style={{
                  padding: '10px',
                  textAlign: 'right',
                  borderBottom: '1px solid #ddd',
                  backgroundColor: '#f2f2f2',
                  fontWeight: 'bold',
                  color: '#333'
                }}>Amount ($)</th>
                <th style={{
                  padding: '10px',
                  textAlign: 'right',
                  borderBottom: '1px solid #ddd',
                  backgroundColor: '#f2f2f2',
                  fontWeight: 'bold',
                  color: '#333'
                }}>Discount ($)</th>
                <th style={{
                  padding: '10px',
                  textAlign: 'right',
                  borderBottom: '1px solid #ddd',
                  backgroundColor: '#f2f2f2',
                  fontWeight: 'bold',
                  color: '#333'
                }}>Fine ($)</th>
                <th style={{
                  padding: '10px',
                  textAlign: 'right',
                  borderBottom: '1px solid #ddd',
                  backgroundColor: '#f2f2f2',
                  fontWeight: 'bold',
                  color: '#333'
                }}>Total ($)</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr key={index} style={{
                    ':hover': { backgroundColor: '#f5f5f5' }
                  }}>
                    <td style={{
                      padding: '10px',
                      textAlign: 'left',
                      borderBottom: '1px solid #ddd'
                    }}>{item.paymentId}</td>
                    <td style={{
                      padding: '10px',
                      textAlign: 'left',
                      borderBottom: '1px solid #ddd'
                    }}>{item.date}</td>
                    <td style={{
                      padding: '10px',
                      textAlign: 'left',
                      borderBottom: '1px solid #ddd'
                    }}>{item.admissionNo}</td>
                    <td style={{
                      padding: '10px',
                      textAlign: 'left',
                      borderBottom: '1px solid #ddd'
                    }}>{item.name}</td>
                    <td style={{
                      padding: '10px',
                      textAlign: 'left',
                      borderBottom: '1px solid #ddd'
                    }}>{item.class}</td>
                    <td style={{
                      padding: '10px',
                      textAlign: 'left',
                      borderBottom: '1px solid #ddd'
                    }}>{item.feeType}</td>
                    <td style={{
                      padding: '10px',
                      textAlign: 'left',
                      borderBottom: '1px solid #ddd'
                    }}>{item.mode}</td>
                    <td style={{
                      padding: '10px',
                      textAlign: 'left',
                      borderBottom: '1px solid #ddd'
                    }}>{item.transactionDescription}</td>
                    <td style={{
                      padding: '10px',
                      textAlign: 'right',
                      borderBottom: '1px solid #ddd',
                      fontFamily: "'Courier New', monospace"
                    }}>{item.amount}</td>
                    <td style={{
                      padding: '10px',
                      textAlign: 'right',
                      borderBottom: '1px solid #ddd',
                      fontFamily: "'Courier New', monospace"
                    }}>{item.discount}</td>
                    <td style={{
                      padding: '10px',
                      textAlign: 'right',
                      borderBottom: '1px solid #ddd',
                      fontFamily: "'Courier New', monospace"
                    }}>{item.fine}</td>
                    <td style={{
                      padding: '10px',
                      textAlign: 'right',
                      borderBottom: '1px solid #ddd',
                      fontFamily: "'Courier New', monospace"
                    }}>{item.total}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" style={{
                    textAlign: 'center',
                    padding: '20px',
                    color: '#666'
                  }}>No records found</td>
                </tr>
              )}
              {filteredData.length > 0 && (
                <tr style={{
                  fontWeight: 'bold',
                  backgroundColor: '#f2f2f2'
                }}>
                  <td colSpan="7" style={{
                    padding: '10px',
                    textAlign: 'left',
                    borderBottom: '1px solid #ddd'
                  }}>Total</td>
                  <td style={{
                    padding: '10px',
                    textAlign: 'right',
                    borderBottom: '1px solid #ddd',
                    fontFamily: "'Courier New', monospace"
                  }}>{totals.amount}</td>
                  <td style={{
                    padding: '10px',
                    textAlign: 'right',
                    borderBottom: '1px solid #ddd',
                    fontFamily: "'Courier New', monospace"
                  }}>{totals.discount}</td>
                  <td style={{
                    padding: '10px',
                    textAlign: 'right',
                    borderBottom: '1px solid #ddd',
                    fontFamily: "'Courier New', monospace"
                  }}>{totals.fine}</td>
                  <td style={{
                    padding: '10px',
                    textAlign: 'right',
                    borderBottom: '1px solid #ddd',
                    fontFamily: "'Courier New', monospace"
                  }}>{totals.grandTotal}</td>
                </tr>
              )}
            </tbody>
          </table>
          
          <div style={{
            fontSize: '14px',
            color: '#666',
            textAlign: 'right',
            marginTop: '10px'
          }}>
            Records: {filteredData.length > 0 ? `1 to ${filteredData.length}` : '0'} of {filteredData.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default FeesReport;