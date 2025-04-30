"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const PayrollReport = () => {
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
  // Dummy data structure
  const payrollData = {
    "Today": [
      {
        name: "Shivam Verma (9002)",
        role: "Teacher",
        designation: "Faculty",
        monthYear: "March - 2025",
        payslipNo: "348",
        basicSalary: "14.70,000.00",
        earning: "35,000.00",
        deduction: "1.54,000.00",
        grossSalary: "13.51,000.00",
        tax: "700.00",
        netSalary: "13.50,300.00"
      }
    ],
    "This Week": [
      {
        name: "Shivam Verma (9002)",
        role: "Teacher",
        designation: "Faculty",
        monthYear: "February - 2025",
        payslipNo: "341",
        basicSalary: "14.70,000.00",
        earning: "",
        deduction: "1.47,000.00",
        grossSalary: "13.23,000.00",
        tax: "700.00",
        netSalary: "13.22,300.00"
      },
      {
        name: "Shivam Verma (9002)",
        role: "Teacher",
        designation: "Faculty",
        monthYear: "March - 2025",
        payslipNo: "348",
        basicSalary: "14.70,000.00",
        earning: "35,000.00",
        deduction: "1.54,000.00",
        grossSalary: "13.51,000.00",
        tax: "700.00",
        netSalary: "13.50,300.00"
      }
    ],
    "This Month": [
      {
        name: "Shivam Verma (9002)",
        role: "Teacher",
        designation: "Faculty",
        monthYear: "January - 2025",
        payslipNo: "334",
        basicSalary: "14.70,000.00",
        earning: "",
        deduction: "1.09,200.00",
        grossSalary: "13.60,800.00",
        tax: "700.00",
        netSalary: "13.60,100.00"
      },
      {
        name: "Shivam Verma (9002)",
        role: "Teacher",
        designation: "Faculty",
        monthYear: "February - 2025",
        payslipNo: "341",
        basicSalary: "14.70,000.00",
        earning: "",
        deduction: "1.47,000.00",
        grossSalary: "13.23,000.00",
        tax: "700.00",
        netSalary: "13.22,300.00"
      },
      {
        name: "Shivam Verma (9002)",
        role: "Teacher",
        designation: "Faculty",
        monthYear: "March - 2025",
        payslipNo: "348",
        basicSalary: "14.70,000.00",
        earning: "35,000.00",
        deduction: "1.54,000.00",
        grossSalary: "13.51,000.00",
        tax: "700.00",
        netSalary: "13.50,300.00"
      }
    ],
    "Last Month": [
      {
        name: "Brandon Heart",
        role: "Librarian",
        designation: "Librarian",
        monthYear: "December - 2025",
        payslipNo: "",
        basicSalary: "8.40,000.00",
        earning: "",
        deduction: "",
        grossSalary: "8.40,000.00",
        tax: "700.00",
        netSalary: "8.30,300.00"
      }
    ]
  };

  // State management
  const [selectedSearchType, setSelectedSearchType] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [reportData, setReportData] = useState([]);

  // Search type options
  const searchTypeOptions = ["Today", "This Week", "This Month", "Last Month"];

  // Handle search type selection
  const handleSearchTypeChange = (e) => {
    setSelectedSearchType(e.target.value);
    setShowResults(false);
  };

  // Handle search
  const handleSearch = () => {
    if (selectedSearchType) {
      const data = payrollData[selectedSearchType];
      setReportData(data);
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
      <h1 style={{ marginBottom: '30px', color: '#333' }}>Payroll Report</h1>

      {/* Filter Section */}
      <div style={{ 
        marginBottom: '30px', 
        backgroundColor: '#f5f5f5', 
        padding: '20px', 
        borderRadius: '5px',
        border: '1px solid #ddd'
      }}>
        <h2 style={{ marginBottom: '20px' }}>Search...</h2>
        
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
              <option value="">Select Search Type</option>
              {searchTypeOptions.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleSearch}
            disabled={!selectedSearchType}
            style={{
              padding: '10px 20px',
              backgroundColor: selectedSearchType ? '#4CAF50' : '#cccccc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: selectedSearchType ? 'pointer' : 'not-allowed',
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
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Name</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Role</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Designation</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Month - Year</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Payslip #</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Basic Salary ($)</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Earning ($)</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Deduction ($)</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Gross Salary ($)</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Tax ($)</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Net Salary ($)</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((employee, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                      <td style={{ padding: '12px' }}>{employee.name}</td>
                      <td style={{ padding: '12px' }}>{employee.role}</td>
                      <td style={{ padding: '12px' }}>{employee.designation}</td>
                      <td style={{ padding: '12px' }}>{employee.monthYear}</td>
                      <td style={{ padding: '12px' }}>{employee.payslipNo}</td>
                      <td style={{ padding: '12px' }}>{employee.basicSalary}</td>
                      <td style={{ padding: '12px' }}>{employee.earning}</td>
                      <td style={{ padding: '12px' }}>{employee.deduction}</td>
                      <td style={{ padding: '12px' }}>{employee.grossSalary}</td>
                      <td style={{ padding: '12px' }}>{employee.tax}</td>
                      <td style={{ padding: '12px' }}>{employee.netSalary}</td>
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
          <p>Please select search type, then click Search to view results</p>
        </div>
      )}
    </div>
  );
};

export default PayrollReport;''