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
export default function UserLogReport() {
  // Dummy data
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
  const allLogs = [
    { branch: "Home Branch", user: "superadmin@gmail.com", role: "Super Admin", class: "", ip: "1.22.208.107", dateTime: "05/01/2025 10:02:28", browser: "Chrome 135.0.0.0, Windows 10" },
    { branch: "Home Branch", user: "superadmin@gmail.com", role: "Super Admin", class: "", ip: "1.22.208.107", dateTime: "05/01/2025 10:02:36", browser: "Chrome 135.0.0.0, Windows 10" },
    { branch: "Home Branch", user: "superadmin@gmail.com", role: "Super Admin", class: "", ip: "1.22.208.107", dateTime: "05/01/2025 10:06:46", browser: "Chrome 135.0.0.0, Windows 10" },
    { branch: "Home Branch", user: "std1", role: "Student", class: "Class 1(A)", ip: "1.22.208.107", dateTime: "05/01/2025 10:06:29", browser: "Chrome 135.0.0.0, Windows 10" },
    { branch: "Home Branch", user: "std2", role: "Student", class: "Class 1(A)", ip: "1.22.208.107", dateTime: "05/01/2025 10:12:34", browser: "Chrome 135.0.0.0, Windows 10" },
    { branch: "Home Branch", user: "std3", role: "Student", class: "Class 2(A)", ip: "1.22.208.107", dateTime: "05/01/2025 10:17:06", browser: "Chrome 135.0.0.0, Windows 10" },
    { branch: "Home Branch", user: "std10", role: "Student", class: "Class 1(A)", ip: "1.22.208.107", dateTime: "05/01/2025 10:20:27", browser: "Chrome 135.0.0.0, Windows 10" },
    { branch: "Home Branch", user: "std12", role: "Student", class: "Class 1(A)", ip: "1.22.208.107", dateTime: "05/01/2025 10:22:04", browser: "Chrome 135.0.0.0, Windows 10" },
    { branch: "Home Branch", user: "std15", role: "Student", class: "Class 1(A)", ip: "1.22.208.107", dateTime: "05/01/2025 10:28:50", browser: "Chrome 135.0.0.0, Windows 10" },
    { branch: "Home Branch", user: "std16", role: "Student", class: "Class 3(A)", ip: "1.22.208.107", dateTime: "05/01/2025 10:29:28", browser: "Chrome 135.0.0.0, Windows 10" },
    // Additional data for different dates to demonstrate filtering
    { branch: "Home Branch", user: "std20", role: "Student", class: "Class 2(A)", ip: "1.22.208.107", dateTime: "04/30/2025 09:15:22", browser: "Chrome 135.0.0.0, Windows 10" },
    { branch: "Home Branch", user: "std21", role: "Student", class: "Class 3(A)", ip: "1.22.208.107", dateTime: "04/25/2025 14:30:45", browser: "Chrome 135.0.0.0, Windows 10" },
    { branch: "Home Branch", user: "teacher1", role: "Teacher", class: "", ip: "1.22.208.107", dateTime: "04/15/2025 08:45:12", browser: "Chrome 135.0.0.0, Windows 10" },
  ];

  const [searchType, setSearchType] = useState("Select");
  const [filteredLogs, setFilteredLogs] = useState([]);

  const handleSearch = () => {
    if (searchType === "Select") {
      setFilteredLogs([]);
      return;
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const filtered = allLogs.filter(log => {
      const logDateParts = log.dateTime.split(' ')[0].split('/');
      const logDate = new Date(logDateParts[2], logDateParts[0] - 1, logDateParts[1]);
      
      switch(searchType) {
        case "Today":
          return logDate.getTime() === today.getTime();
        case "This Week":
          const weekStart = new Date(today);
          weekStart.setDate(today.getDate() - today.getDay());
          return logDate >= weekStart && logDate <= today;
        case "Last Week":
          const lastWeekStart = new Date(today);
          lastWeekStart.setDate(today.getDate() - today.getDay() - 7);
          const lastWeekEnd = new Date(today);
          lastWeekEnd.setDate(today.getDate() - today.getDay() - 1);
          return logDate >= lastWeekStart && logDate <= lastWeekEnd;
        case "This Month":
          const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
          return logDate >= monthStart && logDate <= today;
        case "Last Month":
          const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
          const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
          return logDate >= lastMonthStart && logDate <= lastMonthEnd;
        default:
          return true;
      }
    });

    setFilteredLogs(filtered);
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
          <select 
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

      <h2 className="text-2xl font-bold mb-4">User Log Report</h2>
      
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
              <th className="py-2 px-4 border">Users</th>
              <th className="py-2 px-4 border">Role</th>
              <th className="py-2 px-4 border">Class</th>
              <th className="py-2 px-4 border">IP Address</th>
              <th className="py-2 px-4 border">Login Date Time</th>
              <th className="py-2 px-4 border">Browser/OS</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="py-2 px-4 border">{log.branch}</td>
                  <td className="py-2 px-4 border">{log.user}</td>
                  <td className="py-2 px-4 border">{log.role}</td>
                  <td className="py-2 px-4 border">{log.class}</td>
                  <td className="py-2 px-4 border">{log.ip}</td>
                  <td className="py-2 px-4 border">{log.dateTime}</td>
                  <td className="py-2 px-4 border">{log.browser}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-4 px-4 border text-center text-gray-500">
                  {searchType === "Select" ? "Please select a search type and click Search" : "No records found"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}