"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const IncomeExpenseBalanceReport = () => {
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
      date: "04/25/2025",
      name: "Health seminars",
      head: "Miscellaneous",
      description: "Community health seminars present the latest and best information on health topics.",
      income: "150.00",
      expense: "200.00",
      balance: "-50.00"
    },
    {
      date: "04/20/2025",
      name: "School Bus Rent",
      head: "Transportation",
      description: "Monthly school bus rental fees",
      income: "0.00",
      expense: "7,000.00",
      balance: "-7,000.00"
    },
    {
      date: "04/15/2025",
      name: "Online Classes",
      head: "Education",
      description: "Revenue from online classes",
      income: "14,000.00",
      expense: "0.00",
      balance: "14,000.00"
    },
    {
      date: "04/10/2025",
      name: "Book Sale",
      head: "Sales",
      description: "Revenue from textbook sales",
      income: "12,600.00",
      expense: "0.00",
      balance: "12,600.00"
    }
  ];

  const [searchType, setSearchType] = useState("This Week");
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
        item.name.toLowerCase().includes(query) ||
        item.head.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredData(results);
    setHasSearched(true);
  };

  const calculateTotals = () => {
    let incomeTotal = 0;
    let expenseTotal = 0;
    let balanceTotal = 0;
    
    filteredData.forEach(item => {
      incomeTotal += parseFloat(item.income.replace(/,/g, ''));
      expenseTotal += parseFloat(item.expense.replace(/,/g, ''));
      balanceTotal += parseFloat(item.balance.replace(/,/g, ''));
    });
    
    return {
      income: `¥${incomeTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      expense: `¥${expenseTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      balance: `¥${balanceTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
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
        <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>Search Type</h3>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
         

          gap: '10px',
          marginBottom: '15px'
        }}>
          
          
          <select
            style={{
              padding: '6px 10px',
              border: '1px solid #ddd',
              width:'200px',
              borderRadius: '4px',
              backgroundColor: '#f9f9f9',
              fontSize: '14px'
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
      }}>Income Expense Balance Report</h2>
      
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
                }}>Date</th>
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
                }}>Income Expense Head</th>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  borderBottom: '1px solid #ddd',
                  backgroundColor: '#f2f2f2',
                  fontWeight: 'bold',
                  color: '#333'
                }}>Description</th>
                <th style={{
                  padding: '12px',
                  textAlign: 'right',
                  borderBottom: '1px solid #ddd',
                  backgroundColor: '#f2f2f2',
                  fontWeight: 'bold',
                  color: '#333'
                }}>Income Money in (¥)</th>
                <th style={{
                  padding: '12px',
                  textAlign: 'right',
                  borderBottom: '1px solid #ddd',
                  backgroundColor: '#f2f2f2',
                  fontWeight: 'bold',
                  color: '#333'
                }}>Expense Money Out (¥)</th>
                <th style={{
                  padding: '12px',
                  textAlign: 'right',
                  borderBottom: '1px solid #ddd',
                  backgroundColor: '#f2f2f2',
                  fontWeight: 'bold',
                  color: '#333'
                }}>Overall Balance (¥)</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                <>
                  {filteredData.map((item, index) => (
                    <tr key={index} style={{
                      ':hover': { backgroundColor: '#f5f5f5' }
                    }}>
                      <td style={{
                        padding: '12px',
                        textAlign: 'left',
                        borderBottom: '1px solid #ddd'
                      }}>{item.date}</td>
                      <td style={{
                        padding: '12px',
                        textAlign: 'left',
                        borderBottom: '1px solid #ddd'
                      }}>{item.name}</td>
                      <td style={{
                        padding: '12px',
                        textAlign: 'left',
                        borderBottom: '1px solid #ddd'
                      }}>{item.head}</td>
                      <td style={{
                        padding: '12px',
                        textAlign: 'left',
                        borderBottom: '1px solid #ddd'
                      }}>{item.description}</td>
                      <td style={{
                        padding: '12px',
                        textAlign: 'right',
                        borderBottom: '1px solid #ddd',
                        fontFamily: "'Courier New', monospace",
                        color: '#4CAF50'
                      }}>¥{item.income}</td>
                      <td style={{
                        padding: '12px',
                        textAlign: 'right',
                        borderBottom: '1px solid #ddd',
                        fontFamily: "'Courier New', monospace",
                        color: '#F44336'
                      }}>¥{item.expense}</td>
                      <td style={{
                        padding: '12px',
                        textAlign: 'right',
                        borderBottom: '1px solid #ddd',
                        fontFamily: "'Courier New', monospace",
                        color: parseFloat(item.balance) < 0 ? '#F44336' : '#4CAF50'
                      }}>¥{item.balance}</td>
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
                      fontFamily: "'Courier New', monospace",
                      color: '#4CAF50'
                    }}>{totals.income}</td>
                    <td style={{
                      padding: '12px',
                      textAlign: 'right',
                      borderBottom: '1px solid #ddd',
                      fontFamily: "'Courier New', monospace",
                      color: '#F44336'
                    }}>{totals.expense}</td>
                    <td style={{
                      padding: '12px',
                      textAlign: 'right',
                      borderBottom: '1px solid #ddd',
                      fontFamily: "'Courier New', monospace",
                      color: parseFloat(totals.balance.replace(/¥|,/g, '')) < 0 ? '#F44336' : '#4CAF50'
                    }}>{totals.balance}</td>
                  </tr>
                </>
              ) : (
                <tr>
                  <td colSpan="7" style={{
                    textAlign: 'center',
                    padding: '20px',
                    color: '#666'
                  }}>No records found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default IncomeExpenseBalanceReport;