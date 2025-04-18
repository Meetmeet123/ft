import React, { useState, useEffect } from 'react';
import { ChevronDown, Search, Database, Download, FileText, Printer } from 'lucide-react';
import captchaData from './CaptchaDetails';

function Captcha() {
  const [captcha, setCaptcha] = useState(captchaData);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCaptcha, setFilteredCaptcha] = useState(captchaData);

  useEffect(() => {
    const filtered = captcha.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCaptcha(filtered);
  }, [searchQuery, captcha]);

  const toggleAction = (name) => {
    const updated = captcha.map((item) =>
      item.name === name ? { ...item, action: !item.action } : item
    );
    setCaptcha(updated);
  };

  // Function to handle copy to clipboard
  const handleCopyClick = () => {
    const text = filteredCaptcha.map(item => item.name).join(', ');
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  // Function to handle download as CSV
  const handleDownloadClick = () => {
    const csvContent = [
      ['Module Name', 'Action'],
      ...filteredCaptcha.map(item => [item.name, item.action ? 'Active' : 'Inactive'])
    ];
    const csvString = csvContent.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'captcha_data.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Function to handle copy JSON
  const handleCopyJSONClick = () => {
    const json = JSON.stringify(filteredCaptcha, null, 2);
    navigator.clipboard.writeText(json);
    alert('Copied JSON to clipboard!');
  };

  // Function to handle print
  const handlePrintClick = () => {
    const content = document.getElementById('captcha-table').innerHTML;
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Print</title></head><body>');
    printWindow.document.write(content);
    printWindow.document.write('</body></html>');
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
        <div className="ml-auto flex items-center gap-4 pr-3">
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

      <table id="captcha-table" className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-full">
              <div className="flex items-center">
                Module Name
                <ChevronDown size={14} className="ml-1" />
              </div>
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredCaptcha.map((item) => (
            <tr key={item.name}>
              <td className="px-4 py-3 text-sm text-blue-600 w-full">{item.name}</td>
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
                      }`}/>
                    {/* Toggle circle */}
                    <div 
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${
                        item.action ? 'left-7' : 'left-1'
                      }`}/>
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

export default Captcha;
