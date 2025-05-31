"use client";
import React, { useState } from 'react';
import { FaBook } from 'react-icons/fa';
import { VscFiles } from 'react-icons/vsc';
import { FaRegFileExcel } from 'react-icons/fa6';
import { ImFileText2 } from 'react-icons/im';
import { AiOutlineFilePdf } from 'react-icons/ai';
import { PiPrinterFill } from 'react-icons/pi';
import { LuColumns2 } from 'react-icons/lu';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { IoSearch } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function ExpenseReport() {
  const pathname = usePathname();

  // Dummy expense data
  const attendanceMenuItems = [
    { 
      title: "Daily collection report",
      path: "../report/daily-collection-report" 
    },
    { 
      title: "Payroll Report", 
      path: "../report/payrol-report" 
    },
    { 
      title: "Income Report",
      path: "../report/income-report" 
    },
    { 
      title: "Expense Report",
      path: "../report/expence-report" 
    },
    { 
      title: "User Log Report",
      path: "../report/user-log-report" 
    },
     
  ];
  const allExpenses = [
    { branch: "Home Branch", name: "NCERT New Books Publication", invoiceNo: "67855", expenseHead: "Stationery Purchase", date: "01/01/2025", amount: "$150.00" },
    { branch: "Home Branch", name: "Stock Flower", invoiceNo: "5433", expenseHead: "Flower", date: "01/05/2025", amount: "$150.00" },
    { branch: "Home Branch", name: "Power Centre Bill House", invoiceNo: "5675", expenseHead: "Electricity Bill", date: "01/10/2025", amount: "$120.00" },
    { branch: "Home Branch", name: "BSNL Broad Band Center", invoiceNo: "56544", expenseHead: "Telephone Bill", date: "01/15/2025", amount: "$150.00" },
    { branch: "Home Branch", name: "Online Exam Preparation", invoiceNo: "675", expenseHead: "Miscellaneous", date: "01/20/2025", amount: "$120.00" },
    { branch: "Home Branch", name: "Vidya Books Publication", invoiceNo: "2342", expenseHead: "Stationery Purchase", date: "01/25/2025", amount: "$100.00" },
    { branch: "Home Branch", name: "EDUCATIONAL TRIP", invoiceNo: "089067", expenseHead: "Flower", date: "01/30/2025", amount: "$150.00" },
    { branch: "Home Branch", name: "Stocky Flower", invoiceNo: "4352", expenseHead: "Flower", date: "02/01/2025", amount: "$150.00" },
    { branch: "Home Branch", name: "Power Center House", invoiceNo: "4532", expenseHead: "Electricity Bill", date: "02/05/2025", amount: "$200.00" },
    { branch: "Home Branch", name: "Airtel Postpaid Bill", invoiceNo: "244", expenseHead: "Telephone Bill", date: "02/10/2025", amount: "$150.00" },
    // Additional data for different dates to demonstrate filtering
    { branch: "Home Branch", name: "Water Bill Payment", invoiceNo: "7890", expenseHead: "Utility Bill", date: "04/30/2025", amount: "$75.00" },
    { branch: "Home Branch", name: "Printer Ink Cartridge", invoiceNo: "1234", expenseHead: "Stationery Purchase", date: "04/25/2025", amount: "$90.00" },
    { branch: "Home Branch", name: "Cleaning Supplies", invoiceNo: "5678", expenseHead: "Maintenance", date: "04/15/2025", amount: "$60.00" },
  ];

  const [searchType, setSearchType] = useState("Select");
  const [filteredExpenses, setFilteredExpenses] = useState([]);

  const handleSearch = () => {
    if (searchType === "Select") {
      setFilteredExpenses([]);
      return;
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const filtered = allExpenses.filter(expense => {
      const expenseDateParts = expense.date.split('/');
      const expenseDate = new Date(expenseDateParts[2], expenseDateParts[0] - 1, expenseDateParts[1]);
      
      switch(searchType) {
        case "Today":
          return expenseDate.getTime() === today.getTime();
        case "This Week":
          const weekStart = new Date(today);
          weekStart.setDate(today.getDate() - today.getDay());
          return expenseDate >= weekStart && expenseDate <= today;
        case "Last Week":
          const lastWeekStart = new Date(today);
          lastWeekStart.setDate(today.getDate() - today.getDay() - 7);
          const lastWeekEnd = new Date(today);
          lastWeekEnd.setDate(today.getDate() - today.getDay() - 1);
          return expenseDate >= lastWeekStart && expenseDate <= lastWeekEnd;
        case "This Month":
          const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
          return expenseDate >= monthStart && expenseDate <= today;
        case "Last Month":
          const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
          const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
          return expenseDate >= lastMonthStart && expenseDate <= lastMonthEnd;
        default:
          return true;
      }
    });

    setFilteredExpenses(filtered);
  };
   const buttonGroups = [
    [0, 1, 2],  // First column - 3 buttons
    [3, 4],     // Second column - 2 buttons
    
  ];

  return (
    <div className="container mx-auto p-4">
        <div style={{
    
      backgroundColor: '#f9fafb',
      padding: '24px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#1f2937',
          marginBottom: '32px'
        }}> Report</h1>
        
        <div style={{
          display: 'flex',
          gap: '16px'
        }}>
          {/* Render button groups as columns */}
          {buttonGroups.map((group, groupIndex) => (
            <div 
              key={groupIndex}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                flex: groupIndex === 0 ? '1.5' : '1' // First column wider for long text
              }}
            >
              {group.map((itemIndex) => {
                const item = attendanceMenuItems[itemIndex];
                const isActive = pathname === item.path;
                
                return (
                  <Link href={item.path} key={itemIndex} passHref legacyBehavior>
                    <button
                      style={{
                        padding: '16px 24px',
                        borderRadius: '8px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                        border: '1px solid #e5e7eb',
                        transition: 'all 0.3s ease',
                        backgroundColor: isActive ? '#f0f9ff' : '#ffffff',
                        borderColor: isActive ? '#bfdbfe' : '#e5e7eb',
                        color: isActive ? '#1d4ed8' : '#1f2937',
                        textAlign: 'left',
                        cursor: 'pointer',
                        width: '100%',
                        ':hover': {
                          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                          borderColor: '#d1d5db'
                        }
                      }}
                    >
                      <span style={{
                        fontWeight: '500',
                        fontSize: '16px',
                        margin: '0'
                      }}>                            
                      {item.title}</span>
                    </button>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
      <h1 className="text-2xl font-bold mb-6">Select Criteria</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Search Type *</h2>
        <div className="flex space-x-4">
          <select  style={{width:"300px"}}
            className="border rounded px-4 py-2"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="Select">Select</option>
            <option value="Today">Today</option>
            <option value="This Week">This Week</option>
            <option value="Last Week">Last Week</option>
            <option value="This Month">This Month</option>
            <option value="Last Month">Last Month</option>
          </select>
          <button 
            className="bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      <hr className="my-6 border-t border-gray-300" />

      <h2 className="text-2xl font-bold mb-4">Expense Report</h2>
      <div className="flex justify-between mt-2">
                    <input
                        type="text"
                        // value={searchTerm}
                        // onChange={(e) => setSearchTerm(e.target.value)}
                        className="form-input mt-1 w-[30%] border-none focus:border-none focus:ring-0 outline-none border-0 border-b focus:outline-none"
                        placeholder="Search..."
                    />

                    <div className="flex items-center border-b">
                        {[VscFiles, FaRegFileExcel, ImFileText2, AiOutlineFilePdf, PiPrinterFill, LuColumns2].map((Icon, i) => (
                            <div key={i} className="hover:bg-gray-200 p-1 cursor-pointer">
                                <Icon />
                            </div>
                        ))}
                    </div>
                </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">Branch</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Invoice No</th>
              <th className="py-2 px-4 border">Expense Head</th>
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">Amount ($)</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map((expense, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="py-2 px-4 border">{expense.branch}</td>
                  <td className="py-2 px-4 border">{expense.name}</td>
                  <td className="py-2 px-4 border">{expense.invoiceNo}</td>
                  <td className="py-2 px-4 border">{expense.expenseHead}</td>
                  <td className="py-2 px-4 border">{expense.date}</td>
                  <td className="py-2 px-4 border">{expense.amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 px-4 border text-center text-gray-500">
                  {searchType === "Select" ? "Please select a search type and click Search" : "No expenses found for the selected period"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}