import React, { useState, useEffect } from 'react';
import {
  ChevronDown,
  Printer,
  FileText,
  Database,
  Download,
} from 'lucide-react';
import staffData from './StaffData';

interface StaffMember {
  'Staff ID': string;
  Name: string;
  Email: string;
  Role: string;
  Designation: string;
  Department: string;
  Phone: string;
  Action: boolean;
}

function Staff() {
  const [staff, setStaff] = useState<StaffMember[]>(staffData);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredStaff, setFilteredStaff] = useState<StaffMember[]>(staffData);

  useEffect(() => {
    const filtered = staff.filter((member) =>
      Object.values(member).some((val) =>
        String(val).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredStaff(filtered);
  }, [searchQuery, staff]);

  const toggleActive = (staffId: string) => {
    const updated = staff.map((member) =>
      member['Staff ID'] === staffId
        ? { ...member, Action: !member.Action }
        : member
    );
    setStaff(updated);
  };

  const handleCopyClick = () => {
    const text = JSON.stringify(filteredStaff, null, 2);
    navigator.clipboard.writeText(text).then(() => {
      alert('Data copied to clipboard!');
    });
  };

  const handleDownloadClick = () => {
    const csv = [
      [
        'Staff ID',
        'Name',
        'Email',
        'Role',
        'Designation',
        'Department',
        'Phone',
        'Action',
      ],
      ...filteredStaff.map((m) => [
        m['Staff ID'],
        m.Name,
        m.Email,
        m.Role,
        m.Designation,
        m.Department,
        m.Phone,
        m.Action ? 'Active' : 'Inactive',
      ]),
    ]
      .map((row) => row.map((val) => `"${val}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'staff_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintClick = () => {
    const printContent = document.getElementById('print-section')?.innerHTML;
    const printWindow = window.open('', '', 'width=800,height=600');
    if (printWindow && printContent) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print</title>
            <style>
              table { width: 100%; border-collapse: collapse; }
              th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
              th { background-color: #f9f9f9; }
            </style>
          </head>
          <body>${printContent}</body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const columns: string[] = [
    'Staff ID',
    'Name',
    'Email',
    'Role',
    'Designation',
    'Department',
    'Phone',
    'Action',
  ];

  return (
    <div className="w-full px-2 sm:px-4 lg:px-6">
      {/* Search and Actions */}
      <div className="relative flex flex-col sm:flex-row w-full sm:w-1/3 mb-4">
        <input
          type="text"
          placeholder="Search Staff..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-4 py-2 border rounded w-full sm:w-2/3"
        />
        <div className="ml-auto flex items-center gap-4 mt-2 sm:mt-0 sm:pl-4">
          <button
            onClick={handleCopyClick}
            className="text-gray-500"
            title="Copy JSON"
          >
            <Database size={18} />
          </button>
          <button
            onClick={handleDownloadClick}
            className="text-gray-500"
            title="Download CSV"
          >
            <Download size={18} />
          </button>
          <button
            onClick={handleCopyClick}
            className="text-gray-500"
            title="Copy JSON"
          >
            <FileText size={18} />
          </button>
          <button
            onClick={handlePrintClick}
            className="text-gray-500"
            title="Print"
          >
            <Printer size={18} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto" id="print-section">
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden border border-gray-200 rounded-lg shadow-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map((title, idx) => (
                    <th
                      key={idx}
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                    >
                      <div className="flex items-center">
                        {title}
                        {title !== 'Action' && (
                          <ChevronDown size={14} className="ml-1" />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredStaff.map((member) => (
                  <tr key={member['Staff ID']}>
                    <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                      {member['Staff ID']}
                    </td>
                    <td className="px-4 py-3 text-sm text-blue-500 whitespace-nowrap">
                      {member.Name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                      {member.Email}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                      {member.Role}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                      {member.Designation}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                      {member.Department}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                      {member.Phone}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <label
                        className="inline-flex relative items-center cursor-pointer"
                        onClick={() => toggleActive(member['Staff ID'])}
                      >
                        <div
                          className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                            member.Action ? 'bg-green-500' : 'bg-gray-300'
                          }`}
                        >
                          <div
                            className={`absolute top-1 bg-white w-4 h-4 rounded-full shadow transition-all duration-300 ${
                              member.Action ? 'left-7' : 'left-1'
                            }`}
                          ></div>
                        </div>
                      </label>
                    </td>
                  </tr>
                ))}
                {filteredStaff.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="text-center px-4 py-3 text-sm text-gray-500"
                    >
                      No matching records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Staff;
