"use client";
import { useState } from 'react';
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
const PayrollReport = () => {
  // Dummy JSON data
   const pathname = usePathname();

  // Attendance menu items with exact names from screenshot
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

  const payrollData = [
    {
      branch: "Home Branch",
      name: "Shivam Verma (9002)",
      role: "Teacher",
      designation: "Faculty",
      monthYear: "December - 2025",
      payslip: 327,
      basicSalary: "14,70,000.00",
      earning: "0.00",
      deduction: "1,75,000.00",
      grossSalary: "12,95,000.00",
      tax: "700.00",
      netSalary: "12,94,300.00"
    },
    {
      branch: "Home Branch",
      name: "Shivam Verma (9002)",
      role: "Teacher",
      designation: "Faculty",
      monthYear: "January - 2025",
      payslip: 334,
      basicSalary: "14,70,000.00",
      earning: "0.00",
      deduction: "1,09,200.00",
      grossSalary: "13,60,800.00",
      tax: "700.00",
      netSalary: "13,60,100.00"
    },
    {
      branch: "Home Branch",
      name: "Shivam Verma (9002)",
      role: "Teacher",
      designation: "Faculty",
      monthYear: "February - 2025",
      payslip: 341,
      basicSalary: "14,70,000.00",
      earning: "0.00",
      deduction: "1,47,000.00",
      grossSalary: "13,23,000.00",
      tax: "700.00",
      netSalary: "13,22,300.00"
    },
    {
      branch: "Home Branch",
      name: "Shivam Verma (9002)",
      role: "Teacher",
      designation: "Faculty",
      monthYear: "March - 2025",
      payslip: 348,
      basicSalary: "14,70,000.00",
      earning: "35,000.00",
      deduction: "1,54,000.00",
      grossSalary: "13,51,000.00",
      tax: "700.00",
      netSalary: "13,50,300.00"
    },
    {
      branch: "Home Branch",
      name: "Shivam Verma (9002)",
      role: "Teacher",
      designation: "Faculty",
      monthYear: "April - 2025",
      payslip: 355,
      basicSalary: "14,70,000.00",
      earning: "38,500.00",
      deduction: "87,500.00",
      grossSalary: "14,21,000.00",
      tax: "700.00",
      netSalary: "14,20,300.00"
    },
    {
      branch: "Home Branch",
      name: "Brandon Heart (9006)",
      role: "Librarian",
      designation: "Librarian",
      monthYear: "December - 2025",
      payslip: 328,
      basicSalary: "8,40,000.00",
      earning: "0.00",
      deduction: "0.00",
      grossSalary: "8,40,000.00",
      tax: "700.00",
      netSalary: "8,39,300.00"
    },
    {
      branch: "Home Branch",
      name: "Brandon Heart (9006)",
      role: "Librarian",
      designation: "Librarian",
      monthYear: "January - 2025",
      payslip: 335,
      basicSalary: "8,40,000.00",
      earning: "0.00",
      deduction: "0.00",
      grossSalary: "8,40,000.00",
      tax: "700.00",
      netSalary: "8,39,300.00"
    },
    {
      branch: "Home Branch",
      name: "Brandon Heart (9006)",
      role: "Librarian",
      designation: "Librarian",
      monthYear: "February - 2025",
      payslip: 342,
      basicSalary: "8,40,000.00",
      earning: "0.00",
      deduction: "0.00",
      grossSalary: "8,40,000.00",
      tax: "700.00",
      netSalary: "8,39,300.00"
    }
  ];

  const [searchType, setSearchType] = useState("");
  const [showTable, setShowTable] = useState(false);

  const handleSearch = () => {
    if (searchType) {
      setShowTable(true);
    } else {
      setShowTable(false);
    }
  };
 const buttonGroups = [
    [0, 1, 2],  // First column - 3 buttons
    [3, 4],     // Second column - 2 buttons
    
  ];
  return (
    <div className="p-4 max-w-7xl mx-auto">
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
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
        >
          Search
        </button>
        </div>
       
      </div>

      <div className="mb-6">
       
      </div>

      <hr className="my-6 border-t border-gray-300" />

      {showTable && (
        <div className="overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4">Payroll Report</h2>
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


          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border">Branch</th>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Role</th>
                <th className="py-2 px-4 border">Designation</th>
                <th className="py-2 px-4 border">Month - Year</th>
                <th className="py-2 px-4 border">Payslip</th>
                <th className="py-2 px-4 border">Basic Salary (£)</th>
                <th className="py-2 px-4 border">Earning (£)</th>
                <th className="py-2 px-4 border">Deduction (£)</th>
                <th className="py-2 px-4 border">Gross Salary (£)</th>
                <th className="py-2 px-4 border">Tax (£)</th>
                <th className="py-2 px-4 border">Net Salary (£)</th>
              </tr>
            </thead>
            <tbody>
              {payrollData.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="py-2 px-4 border">{item.branch}</td>
                  <td className="py-2 px-4 border">{item.name}</td>
                  <td className="py-2 px-4 border">{item.role}</td>
                  <td className="py-2 px-4 border">{item.designation}</td>
                  <td className="py-2 px-4 border">{item.monthYear}</td>
                  <td className="py-2 px-4 border">{item.payslip}</td>
                  <td className="py-2 px-4 border">{item.basicSalary}</td>
                  <td className="py-2 px-4 border">{item.earning}</td>
                  <td className="py-2 px-4 border">{item.deduction}</td>
                  <td className="py-2 px-4 border">{item.grossSalary}</td>
                  <td className="py-2 px-4 border">{item.tax}</td>
                  <td className="py-2 px-4 border">{item.netSalary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PayrollReport;