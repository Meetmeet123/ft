"use client";
import React, { useState } from 'react';

export default function UserLog() {
  // Sample JSON data
  const userLogData = {
    allUsers: [
      {
        user: 'jason@gmail.com',
        role: 'Teacher',
        class: '',
        ipAddress: '117.237.13.26',
        loginDateTime: '05/02/2025 15:17:19',
        userAgent: 'Safari 604.1, iOS'
      },
      {
        user: 'superadmin@gmail.com',
        role: 'Super Admin',
        class: '',
        ipAddress: '220.158.156.66',
        loginDateTime: '05/02/2025 15:15:36',
        userAgent: 'Chrome 135.0.0.0, Windows 10'
      },
      {
        user: 'william@gmail.com',
        role: 'Admin',
        class: '',
        ipAddress: '103.36.83.30',
        loginDateTime: '05/02/2025 15:07:30',
        userAgent: 'Firefox 138.0, Windows 10'
      },
      {
        user: 'std1',
        role: 'Student',
        class: 'Class 1(A)',
        ipAddress: '223.185.162.10',
        loginDateTime: '05/02/2025 15:06:19',
        userAgent: 'Chrome 136.0.0.0, Windows 10'
      },
      {
        user: 'parent9',
        role: 'Parent',
        class: '',
        ipAddress: '152.58.27.110',
        loginDateTime: '03/04/2025 09:39:08',
        userAgent: 'Chrome 133.0.0.0, Windows 10'
      }
    ],
    staff: [
      {
        user: 'jason@gmail.com',
        role: 'Teacher',
        class: '',
        ipAddress: '117.237.13.26',
        loginDateTime: '05/02/2025 15:17:19',
        userAgent: 'Safari 604.1, iOS'
      },
      {
        user: 'superadmin@gmail.com',
        role: 'Super Admin',
        class: '',
        ipAddress: '220.158.156.66',
        loginDateTime: '05/02/2025 15:15:36',
        userAgent: 'Chrome 135.0.0.0, Windows 10'
      },
      {
        user: 'william@gmail.com',
        role: 'Admin',
        class: '',
        ipAddress: '103.36.83.30',
        loginDateTime: '05/02/2025 15:07:30',
        userAgent: 'Firefox 138.0, Windows 10'
      }
    ],
    students: [
      {
        user: 'std1',
        role: 'Student',
        class: 'Class 1(A)',
        ipAddress: '223.185.162.10',
        loginDateTime: '05/02/2025 15:06:19',
        userAgent: 'Chrome 136.0.0.0, Windows 10'
      },
      {
        user: 'std90',
        role: 'Student',
        class: 'Class 1(A)',
        ipAddress: '152.58.27.152',
        loginDateTime: '04/03/2025 18:13:41',
        userAgent: 'Chrome 134.0.0.0, Windows 10'
      },
      {
        user: 'std42',
        role: 'Student',
        class: 'Class 1(A)',
        ipAddress: '152.58.27.152',
        loginDateTime: '04/03/2025 18:00:18',
        userAgent: 'Chrome 134.0.0.0, Windows 10'
      },
      {
        user: 'std96',
        role: 'Student',
        class: 'Class 1(A)',
        ipAddress: '152.58.27.152',
        loginDateTime: '04/03/2025 17:56:59',
        userAgent: 'Chrome 134.0.0.0, Windows 10'
      }
    ],
    parents: [
      {
        user: 'parent9',
        role: 'Parent',
        class: '',
        ipAddress: '152.58.27.110',
        loginDateTime: '03/04/2025 09:39:08',
        userAgent: 'Chrome 133.0.0.0, Windows 10'
      }
    ]
  };

  // State for active tab
  const [activeTab, setActiveTab] = useState('allUsers');
  const [searchTerm, setSearchTerm] = useState('');

  // Get current data based on active tab
  const getCurrentData = () => {
    let data = [];
    switch(activeTab) {
      case 'staff':
        data = userLogData.staff;
        break;
      case 'students':
        data = userLogData.students;
        break;
      case 'parents':
        data = userLogData.parents;
        break;
      default:
        data = userLogData.allUsers;
    }
    
    // Apply search filter
    if (searchTerm) {
      return data.filter(item => 
        item.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.class && item.class.toLowerCase().includes(searchTerm.toLowerCase())) ||
        item.ipAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.userAgent.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return data;
  };

  const currentData = getCurrentData();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">User Log</h1>
      
      {/* Tabs */}
      <div className="flex border-b mb-4">
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'allUsers' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('allUsers')}
        >
          All Users
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'staff' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('staff')}
        >
          Staff
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'students' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('students')}
        >
          Students
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'parents' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('parents')}
        >
          Parents
        </button>
      </div>
      
      {/* Search */}
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 border border-gray-300 rounded pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <svg
          className="absolute left-2 top-3 h-4 w-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>
      
      {/* Results */}
      <div className="bg-white rounded shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Users</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                {activeTab === 'students' && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                )}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Login Date Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Agent</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentData.length > 0 ? (
                currentData.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.user}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.role}</td>
                    {activeTab === 'students' && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.class}</td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.ipAddress}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.loginDateTime}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.userAgent}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td 
                    colSpan={activeTab === 'students' ? 6 : 5} 
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 text-sm text-gray-600">
          Records: {currentData.length} of {currentData.length}
        </div>
      </div>
    </div>
  );
}