import React, { useState, useEffect, ChangeEvent } from 'react';
import { ChevronDown, Search, Database, Download, FileText, Printer } from 'lucide-react';
import staffData from './StaffData'; // Make sure staffData is typed

interface StaffItem {
  name: string;
  action: boolean;
}

function Staff() {
  const [staff, setStaff] = useState<StaffItem[]>(staffData);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStaff, setFilteredStaff] = useState<StaffItem[]>(staffData);

  // Update filtered staff list when search query changes
  useEffect(() => {
    const filtered = staff.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredStaff(filtered);
  }, [searchQuery, staff]);

  const toggleAction = (name: string) => {
    const updated = staff.map((item) =>
      item.name === name ? { ...item, action: !item.action } : item
    );
    setStaff(updated);
  };

  // Handle Copy to Clipboard
  const handleCopyClick = () => {
    const text = filteredStaff.map(item => item.name).join(', ');
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  // Handle Download CSV
  const handleDownloadClick = () => {
    const csvContent = [
      ['Field Name', 'Action'],
      ...filteredStaff.map(item => [item.name, item.action ? 'Active' : 'Inactive'])
    ];
    const csvString = csvContent.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'staff_data.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Handle Copy JSON
  const handleCopyJSONClick = () => {
    const json = JSON.stringify(filteredStaff, null, 2);
    navigator.clipboard.writeText(json);
    alert('Copied JSON to clipboard!');
  };

  // Handle Print
  const handlePrintClick = () => {
    const tableElement = document.getElementById('staff-table');
    if (!tableElement) {
      alert('Table not found!');
      return;
    }
    const content = tableElement.innerHTML;
    const printWindow = window.open('', '', 'height=600,width=800');
    if (printWindow) {
      printWindow.document.write('<html><head><title>Print</title></head><body>');
      printWindow.document.write(content);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    } else {
      alert('Unable to open print window.');
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4">
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded w-full"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
        </div>

        <div className="flex flex-wrap gap-4 sm:ml-auto">
          <button onClick={handleCopyClick} className="text-gray-500" title="Copy to clipboard" type="button">
            <Database size={18} />
          </button>
          <button onClick={handleDownloadClick} className="text-gray-500" title="Download CSV" type="button">
            <Download size={18} />
          </button>
          <button onClick={handleCopyJSONClick} className="text-gray-500" title="Copy JSON" type="button">
            <FileText size={18} />
          </button>
          <button onClick={handlePrintClick} className="text-gray-500" title="Print" type="button">
            <Printer size={18} />
          </button>
        </div>
      </div>

      <table id="staff-table" className="min-w-full table-auto divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center">
                Field Name
                <ChevronDown size={14} className="ml-1" />
              </div>
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {filteredStaff.map((item) => (
            <tr key={item.name} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm text-blue-600 max-w-xs break-words">
                {item.name}
              </td>
              <td className="px-4 py-3 text-right">
                <button
                  type="button"
                  className="focus:outline-none"
                  onClick={() => toggleAction(item.name)}
                >
                  <div className="relative w-12 h-6">
                    {/* Background track */}
                    <div
                      className={`absolute inset-0 rounded-full transition-colors duration-300 ${
                        item.action ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    />
                    {/* Toggle circle */}
                    <div
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${
                        item.action ? 'left-7' : 'left-1'
                      }`}
                    />
                  </div>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Staff;
