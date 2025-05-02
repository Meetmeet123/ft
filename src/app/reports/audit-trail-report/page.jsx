"use client";
import { useState } from 'react';

export default function AuditTrailReport() {
  // Sample JSON data
  const initialAuditTrailData = [
    {
      message: "Record deleted On student applied discounts id 1047 and subinvoice id2",
      user: "JoeBlack (9000)",
      ipAddress: "137.59.217.83",
      action: "Delete",
      platform: "Windows 10",
      agent: "Chrome 135.0.0.0",
      dateTime: "05/02/2025 15:29:55"
    },
    {
      message: "Record updated On student fees deposits id 1047",
      user: "JoeBlack (9000)",
      ipAddress: "137.59.217.83",
      action: "Update",
      platform: "Windows 10",
      agent: "Chrome 135.0.0.0",
      dateTime: "05/02/2025 15:29:55"
    },
    {
        message: "Record deleted On student applied discounts id 1047 and subinvoice id2",
        user: "JoeBlack (9000)",
        ipAddress: "137.59.217.83",
        action: "Delete",
        platform: "Windows 10",
        agent: "Chrome 135.0.0.0",
        dateTime: "05/02/2025 15:29:55"
      },
      {
        message: "Record updated On student fees deposits id 1047",
        user: "JoeBlack (9000)",
        ipAddress: "137.59.217.83",
        action: "Update",
        platform: "Windows 10",
        agent: "Chrome 135.0.0.0",
        dateTime: "05/02/2025 15:29:55"
      },
      {
        message: "New Record inserted On exam groups id 10",
        user: "JasonShariton (90006)",
        ipAddress: "152.58.80.90",
        action: "Insert",
        platform: "Linux",
        agent: "Chrome 114.0.0.0",
        dateTime: "05/02/2025 15:28:21"
      },
      {
        message: "New Record inserted On cbse exam class sections id 548",
        user: "JasonShariton (90006)",
        ipAddress: "169.149.226.203",
        action: "Insert",
        platform: "Android",
        agent: "Opera 88.0.0.0",
        dateTime: "05/02/2025 15:23:49"
      },
      {
        message: "New Record inserted On cbse exam class sections id 547",
        user: "JasonShariton (90006)",
        ipAddress: "169.149.226.203",
        action: "Insert",
        platform: "Android",
        agent: "Opera 88.0.0.0",
        dateTime: "05/02/2025 15:23:49"
      }
  ];

  const [auditTrailData, setAuditTrailData] = useState(initialAuditTrailData);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter data based on search term
  const filteredData = auditTrailData.filter(item => 
    item.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.ipAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.agent.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.dateTime.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Clear all audit trail records
  const clearAuditTrail = () => {
    if (confirm("Are you sure you want to clear all audit trail records? This action cannot be undone.")) {
      setAuditTrailData([]);
    }
  };

  // Reset to initial data
  const resetAuditTrail = () => {
    setAuditTrailData(initialAuditTrailData);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Audit Trail Report List</h1>
        <div className="flex space-x-2">
          <button
            onClick={clearAuditTrail}
            className="px-4 py-2 bg-red-600 text-black rounded hover:bg-red-700"
          >
            Clear Audit Trail Record
          </button>
          
        </div>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Users</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Platform</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Time</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-900 max-w-xs">{item.message}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.user}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.ipAddress}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.action}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.platform}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.agent}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.dateTime}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                    {auditTrailData.length === 0 ? "Audit trail is empty" : "No matching records found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}