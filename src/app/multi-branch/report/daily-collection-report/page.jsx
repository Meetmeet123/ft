'use client';
import React, { useState } from 'react';
import { IoSearch } from "react-icons/io5";
import { FaBook } from 'react-icons/fa';
import { VscFiles } from 'react-icons/vsc';
import { FaRegFileExcel } from 'react-icons/fa6';
import { ImFileText2 } from 'react-icons/im';
import { AiOutlineFilePdf } from 'react-icons/ai';
import { PiPrinterFill } from 'react-icons/pi';
import { LuColumns2 } from 'react-icons/lu';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Link from "next/link";
import { usePathname } from "next/navigation";
 

const DailyCollectionReport = () => {
      const pathname = usePathname();
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
  // Dummy data for the report
  const dummyData = [
    {
      branch: "Home Branch",
      admissionNo: "18002",
      name: "Robin Peterson",
      fatherName: "Lucas Peterson",
      class: "Class 5 (A)",
      paymentMode: "Paystack",
      paymentId: "1070/1",
      collectedBy: "",
      fine: "¥10.00",
      amount: "¥124,500.00",
      total: "¥124,500.00"
    },
    {
      branch: "Home Branch",
      admissionNo: "11025",
      name: "Surya Laiwani",
      fatherName: "James Stark",
      class: "Class 4 (A)",
      paymentMode: "Paystack",
      paymentId: "1071/1",
      collectedBy: "",
      fine: "¥10.00",
      amount: "¥124,500.00",
      total: "¥124,500.00"
    },
    {
      branch: "Home Branch",
      admissionNo: "120020",
      name: "Ashwani Kumar",
      fatherName: "Arjun Kumar",
      class: "Class 1 (A)",
      paymentMode: "Cash",
      paymentId: "1072/1",
      collectedBy: "William Abbot(0003)",
      fine: "¥11,750.00",
      amount: "¥17,000.00",
      total: "¥28,750.00"
    },
    // Add more dummy data entries as needed
  ];

  // State for the main report
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [showReport, setShowReport] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // State for the detailed view
  const [showDetails, setShowDetails] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleSearch = () => {
    if (dateFrom && dateTo) {
      setShowReport(true);
    }
  };

  const handleViewDetails = (transaction) => {
    setSelectedTransaction(transaction);
    setShowDetails(true);
  };

  const filteredData = dummyData.filter(item => 
    Object.values(item).some(val => 
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
  ));

  const totalAmount = filteredData.reduce((sum, item) => {
    const amount = parseFloat(item.total.replace(/[^0-9.]/g, ''));
    return sum + amount;
  }, 0);
 const buttonGroups = [
    [0, 1, 2],  // First column - 3 buttons
    [3, 4],     // Second column - 2 buttons
    
  ];
  return (
    <div className="p-6 bg-white rounded-lg shadow">
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
    <br />
      <h2 className="text-xl font-semibold mb-4">Select Criteria</h2>
       
      
      {/* Date Selection */}
      <div className="mb-6">
     <h1 className="text-2xl font-bold mb-6">Daily Collection Report</h1>
        <div className="flex flex-wrap gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Date From <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="border rounded px-3 py-2 w-48"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Date To <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="border rounded px-3 py-2 w-48"
            />
          </div>
        </div>
      </div>

      {/* Search Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 text-black px-4 py-2 rounded flex items-center gap-2"
        >
          <IoSearch /> Search
        </button>
      </div>

      {/* Main Report Table (only shown after search) */}
      {showReport && (
        <div className="mt-6">
          <div className="flex justify-between mt-2">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
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
            <table className="min-w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2">Date</th>
                  <th className="border px-4 py-2">Total Transactions</th>
                  <th className="border px-4 py-2">Amount (¥)</th>
                  <th className="border px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{dateFrom}</td>
                  <td className="border px-4 py-2">{filteredData.length}</td>
                  <td className="border px-4 py-2">¥{totalAmount.toLocaleString('en-IN')}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleViewDetails(filteredData[0])} // Using first item as example
                      className="text-blue-500 hover:text-blue-700"
                    >
                    👁️
                    </button>
                  </td>
                </tr>
                <tr className="bg-gray-50 font-semibold">
                  <td className="border px-4 py-2">Total Amount</td>
                  <td className="border px-4 py-2"></td>
                  <td className="border px-4 py-2">¥{totalAmount.toLocaleString('en-IN')}</td>
                  <td className="border px-4 py-2"></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
            <div>Records: 1 to 1 of 1</div>
          </div>
        </div>
      )}

      {/* Detailed View Modal */}
      {showDetails && selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-6xl max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Transaction Details</h2>
              <button 
                onClick={() => setShowDetails(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Search by name, admission no, class..."
                className="border rounded px-3 py-2 w-full"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-4 py-2">Branch</th>
                    <th className="border px-4 py-2">Admission No</th>
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Father Name</th>
                    <th className="border px-4 py-2">Class</th>
                    <th className="border px-4 py-2">Payment Mode</th>
                    <th className="border px-4 py-2">Payment ID</th>
                    <th className="border px-4 py-2">Collected By</th>
                    <th className="border px-4 py-2">Fine</th>
                    <th className="border px-4 py-2">Amount</th>
                    <th className="border px-4 py-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyData.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">{item.branch}</td>
                      <td className="border px-4 py-2">{item.admissionNo}</td>
                      <td className="border px-4 py-2">{item.name}</td>
                      <td className="border px-4 py-2">{item.fatherName}</td>
                      <td className="border px-4 py-2">{item.class}</td>
                      <td className="border px-4 py-2">{item.paymentMode}</td>
                      <td className="border px-4 py-2">{item.paymentId}</td>
                      <td className="border px-4 py-2">{item.collectedBy}</td>
                      <td className="border px-4 py-2">{item.fine}</td>
                      <td className="border px-4 py-2">{item.amount}</td>
                      <td className="border px-4 py-2">{item.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyCollectionReport;