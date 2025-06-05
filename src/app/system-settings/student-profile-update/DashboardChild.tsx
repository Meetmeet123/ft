import React, { useState, useEffect } from 'react';
import { ChevronDown, Search, Database, Download, FileText, Printer } from 'lucide-react';
import dashboardData from './DashboardData';

function DashboardDataChild() {
  const [dashboardItems, setDashboardItems] = useState(dashboardData);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState(dashboardData);

  // Filter dashboard items based on the search query
  useEffect(() => {
    const filtered = dashboardItems.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchQuery, dashboardItems]);

  interface DashboardItem {
    id: number;
    name: string;
    student: boolean;
    parent: boolean;
  }

  const toggleStudent = (id: number) => {
    const updated = dashboardItems.map((item: DashboardItem) =>
      item.id === id ? { ...item, student: !item.student } : item
    );
    setDashboardItems(updated);
  };

  interface ToggleParent {
    (id: number): void;
  }

  const toggleParent: ToggleParent = (id) => {
    const updated = dashboardItems.map((item: DashboardItem) =>
      item.id === id ? { ...item, parent: !item.parent } : item
    );
    setDashboardItems(updated);
  };

  // Handle Copy to Clipboard
  const handleCopyClick = () => {
    const text = filteredItems.map(item => item.name).join(', ');
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  // Handle Download CSV
  const handleDownloadClick = () => {
    const csvContent = [
      ['Name', 'Student', 'Parent'],
      ...filteredItems.map(item => [item.name, item.student ? 'Active' : 'Inactive', item.parent ? 'Active' : 'Inactive'])
    ];
    const csvString = csvContent.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dashboard_data.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Handle Copy JSON
  const handleCopyJSONClick = () => {
    const json = JSON.stringify(filteredItems, null, 2);
    navigator.clipboard.writeText(json);
    alert('Copied JSON to clipboard!');
  };

  // Handle Print
  const handlePrintClick = () => {
    const tableElement = document.getElementById('dashboard-table');
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
    <div className="w-full p-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 p-4 border-b">
          <div className="relative w-full sm:w-1/3 md:w-64">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded w-full"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
          </div>
          <div className="ml-auto flex flex-wrap items-center gap-4 sm:gap-6">
            <button onClick={handleCopyClick} className="text-gray-500" title="Copy to clipboard">
              <Database size={18} />
            </button>
            <button onClick={handleDownloadClick} className="text-gray-500" title="Download CSV">
              <Download size={18} />
            </button>
            <button onClick={handleCopyJSONClick} className="text-gray-500" title="Copy JSON">
              <FileText size={18} />
            </button>
            <button onClick={handlePrintClick} className="text-gray-500" title="Print">
              <Printer size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden border border-gray-200 rounded-lg shadow-md">
            <table id="dashboard-table" className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => {
                        const sorted = [...filteredItems].sort((a, b) =>
                          a.name.localeCompare(b.name)
                        );
                        setFilteredItems(sorted);
                      }}
                    >
                      Name
                      <ChevronDown size={14} className="ml-1" />
                    </div>
                  </th>
                  <th className="px-2 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-2 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Parent
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredItems.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 text-sm text-gray-700 whitespace-nowrap">
                      {item.name}
                    </td>

                    <td className="px-5 py-3 text-sm text-gray-700 whitespace-nowrap text-right">
                      <label
                        className="inline-flex relative items-center cursor-pointer"
                        onClick={() => toggleStudent(item.id)}
                      >
                        <div
                          className={`w-12 h-6 rounded-full flex items-center p-1 transition-colors duration-300 ${
                            item.student ? 'bg-green-500' : 'bg-gray-300'
                          }`}
                        >
                          <div
                            className={`absolute bg-white w-4 h-4 rounded-full shadow transform ${
                              item.student ? 'left-7' : 'left-1'
                            } transition-transform duration-300 `}
                          ></div>
                        </div>
                      </label>
                    </td>

                    <td className="px-2 py-3 text-sm text-gray-700 whitespace-nowrap text-right">
                      <label
                        className="inline-flex relative items-center cursor-pointer"
                        onClick={() => toggleParent(item.id)}
                      >
                        <div
                          className={`w-12 h-6 rounded-full flex items-center p-1 transition-colors duration-300 ${
                            item.parent ? 'bg-green-500' : 'bg-gray-300'
                          }`}
                        >
                          <div
                            className={`absolute bg-white w-4 h-4 rounded-full shadow transform transition-transform duration-300 ${
                              item.parent ? 'left-7' : 'left-1'
                            }`}></div>
                        </div>
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardDataChild;
