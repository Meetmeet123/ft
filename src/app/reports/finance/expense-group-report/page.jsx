"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ExpenseGroupReport = () => {
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
      expenseHead: "Flower",
      expenseId: "304",
      name: "Stock Flower",
      date: "01/05/2025",
      invoiceNumber: "5433",
      amount: "$150.00"
    },
    {
      expenseHead: "Flower",
      expenseId: "317",
      name: "Stock Flower",
      date: "03/05/2025",
      invoiceNumber: "2342",
      amount: "$100.00"
    },
    {
      expenseHead: "EDUCATIONAL TRIP",
      expenseId: "309",
      name: "EDUCATIONAL TRIP",
      date: "01/30/2025",
      invoiceNumber: "089067",
      amount: "$150.00"
    },
    {
      expenseHead: "Flower",
      expenseId: "310",
      name: "Stocky Flower",
      date: "02/01/2025",
      invoiceNumber: "4352",
      amount: "$150.00"
    },
    {
      expenseHead: "Flower",
      expenseId: "327",
      name: "Stock Flower",
      date: "04/20/2025",
      invoiceNumber: "8444",
      amount: "$150.00"
    },
    {
      expenseHead: "Electricity Bill",
      expenseId: "401",
      name: "Power Company",
      date: new Date().toLocaleDateString('en-US'),
      invoiceNumber: "9876",
      amount: "$200.00"
    },
    {
      expenseHead: "Telephone Bill",
      expenseId: "402",
      name: "Phone Company",
      date: new Date(new Date().setDate(new Date().getDate() - 3)).toLocaleDateString('en-US'),
      invoiceNumber: "5432",
      amount: "$75.00"
    }
  ];

  const [searchType, setSearchType] = useState("Select");
  const [expenseHead, setExpenseHead] = useState("Select");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const expenseHeadOptions = [
    "Select",
    "Flower",
    "EDUCATIONAL TRIP",
    "Electricity Bill",
    "Telephone Bill"
  ];

  const handleSearch = () => {
    // Don't proceed if "Select" is chosen in either dropdown
    if (searchType === "Select" || expenseHead === "Select") {
      setFilteredData([]);
      setHasSearched(true);
      return;
    }

    let results = [...dummyData];

    // Filter by expense head first
    results = results.filter(item => item.expenseHead === expenseHead);

    // Filter by date range based on search type
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);

    const lastMonth = new Date(today);
    lastMonth.setMonth(today.getMonth() - 1);

    const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);

    if (searchType === "Today") {
      results = results.filter(item => {
        const itemDate = new Date(item.date);
        itemDate.setHours(0, 0, 0, 0);
        return itemDate.getTime() === today.getTime();
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

    // Additional search by text query if provided
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.invoiceNumber.toLowerCase().includes(query)
      );
    }

    setFilteredData(results);
    setHasSearched(true);
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

      <div style={{ 
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        marginBottom: '20px'
      }}>
        <div>
          <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>Search Type</h3>
          <select
            style={{
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              width: '100%',
              fontSize: '14px'
            }}
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="Select">Select</option>
            <option value="Today">Today</option>
            <option value="This Week">This Week</option>
            <option value="This Month">This Month</option>
            <option value="Last Week">Last Week</option>
            <option value="Last Month">Last Month</option>
          </select>
        </div>

        <div>
          <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>Search Expense Head</h3>
          <select
            style={{
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              width: '100%',
              fontSize: '14px'
            }}
            value={expenseHead}
            onChange={(e) => setExpenseHead(e.target.value)}
          >
            {expenseHeadOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
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
      <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '20px 0' }} />

      <h2 style={{
        margin: '0 0 15px 0',
        color: '#333',
        paddingBottom: '10px'
      }}>Expense Group Report</h2>

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
                  padding: '12px',
                  textAlign: 'left',
                  borderBottom: '1px solid #ddd',
                  backgroundColor: '#f2f2f2',
                  fontWeight: 'bold',
                  color: '#333'
                }}>Expense Head</th>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  borderBottom: '1px solid #ddd',
                  backgroundColor: '#f2f2f2',
                  fontWeight: 'bold',
                  color: '#333'
                }}>Expense ID</th>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  borderBottom: '1px solid #ddd',
                  backgroundColor: '#f2f2f2',
                  fontWeight: 'bold',
                  color: '#333'
                }}>Name</th>
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
                  textAlign: 'left',
                  borderBottom: '1px solid #ddd',
                  backgroundColor: '#f2f2f2',
                  fontWeight: 'bold',
                  color: '#333'
                }}>Invoice Number</th>
                <th style={{
                  padding: '12px',
                  textAlign: 'right',
                  borderBottom: '1px solid #ddd',
                  backgroundColor: '#f2f2f2',
                  fontWeight: 'bold',
                  color: '#333'
                }}>Amount ($)</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr key={index}>
                    <td style={{
                      padding: '12px',
                      textAlign: 'left',
                      borderBottom: '1px solid #ddd'
                    }}>{item.expenseHead}</td>
                    <td style={{
                      padding: '12px',
                      textAlign: 'left',
                      borderBottom: '1px solid #ddd'
                    }}>{item.expenseId}</td>
                    <td style={{
                      padding: '12px',
                      textAlign: 'left',
                      borderBottom: '1px solid #ddd'
                    }}>{item.name}</td>
                    <td style={{
                      padding: '12px',
                      textAlign: 'left',
                      borderBottom: '1px solid #ddd'
                    }}>{item.date}</td>
                    <td style={{
                      padding: '12px',
                      textAlign: 'left',
                      borderBottom: '1px solid #ddd'
                    }}>{item.invoiceNumber}</td>
                    <td style={{
                      padding: '12px',
                      textAlign: 'right',
                      borderBottom: '1px solid #ddd',
                      fontFamily: "'Courier New', monospace"
                    }}>{item.amount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{
                    textAlign: 'center',
                    padding: '20px',
                    color: '#666'
                  }}>
                    {searchType === "Select" || expenseHead === "Select" 
                      ? "Please select both search type and expense head" 
                      : "No records found for the selected criteria"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExpenseGroupReport;