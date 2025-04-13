import React, { useState, useEffect } from 'react';
import { ChevronDown, Printer, FileText, Database, Download, Search } from 'lucide-react';
import systemData from './SystemData';

function System() {
  const [system, setSystem] = useState(systemData);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSystem, setFilteredSystem] = useState(systemData);

  useEffect(() => {
    const filtered = system.filter((item) =>
      item.Name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSystem(filtered);
  }, [searchQuery, system]);

  const toggleAction = (name) => {
    const updated = system.map((item) =>
      item.Name === name ? { ...item, Action: !item.Action } : item
    );
    setSystem(updated);
  };

  const handleCopyClick = () => {
    const text = JSON.stringify(filteredSystem, null, 2);
    navigator.clipboard.writeText(text).then(() => {
      alert('Data copied to clipboard!');
    });
  };

  const handleDownloadClick = () => {
    const csv = [
      ['Module Name', 'Action'],
      ...filteredSystem.map((s) => [s.Name, s.Action ? 'Active' : 'Inactive']),
    ]
      .map((row) => row.map((value) => `"${value}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'system_modules.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintClick = () => {
    const content = document.getElementById('print-section').innerHTML;
    const printWindow = window.open('', '', 'width=800,height=600');
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
        <body>${content}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b p-4">
        <div className="flex-1 min-w-[200px] max-w-xs relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button onClick={handleCopyClick} className="text-gray-500" title="Copy to clipboard">
            <Database size={18} />
          </button>
          <button onClick={handleDownloadClick} className="text-gray-500" title="Download CSV">
            <Download size={18} />
          </button>
          <button onClick={handleCopyClick} className="text-gray-500" title="Copy JSON">
            <FileText size={18} />
          </button>
          <button onClick={handlePrintClick} className="text-gray-500" title="Print">
            <Printer size={18} />
          </button>
        </div>
      </div>

      <div id="print-section">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Module Name', 'Action'].map((title, idx) => (
                <th
                  key={idx}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <div className="flex items-center">
                    {title}
                    {title !== 'Action' && <ChevronDown size={14} className="ml-1" />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredSystem.map((item) => (
              <tr key={item.Name}>
                <td className="px-4 py-3 text-sm text-blue-600 w-full">{item.Name}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    className="focus:outline-none"
                    onClick={() => toggleAction(item.Name)}
                  >
                    <div className="relative w-12 h-6">
                      <div
                        className={`absolute inset-0 rounded-full transition-colors duration-300 ${
                          item.Action ? 'bg-green-500' : 'bg-gray-200'
                        }`}
                      />
                      <div
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${
                          item.Action ? 'left-7' : 'left-1'
                        }`}
                      />
                    </div>
                  </button>
                </td>
              </tr>
            ))}
            {filteredSystem.length === 0 && (
              <tr>
                <td
                  colSpan={2}
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
  );
}

export default System;
