import React, { useState, useEffect } from 'react';
import { Search, Database, Download, FileText, Printer } from 'lucide-react';
import { getCaptchaDetails, updateCaptcha } from './CaptchaDetails';
import * as XLSX from 'xlsx';

function Captcha() {
  const [captcha, setCaptcha] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCaptcha, setFilteredCaptcha] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDownloadClick = () => {
    const worksheet = XLSX.utils.json_to_sheet(captcha);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Incomes');
    XLSX.writeFile(workbook, 'Captcha.xlsx');
  };

  const handleCopyJSONClick = () => {
    const json = JSON.stringify(filteredCaptcha, null, 2);
    navigator.clipboard.writeText(json);
    alert('Copied JSON to clipboard!');
  };

  const handlePrintClick = () => {
    if (!Array.isArray(captcha) || captcha.length === 0) return;

    const headers = Object.keys(captcha[0]);
    let table = '<table border="1" style="border-collapse: collapse; width: 100%"><thead><tr>';

    headers.forEach(header => {
      table += `<th style="padding: 8px; text-align: left;">${header}</th>`;
    });
    table += '</tr></thead><tbody>';

    captcha.forEach(row => {
      table += '<tr>';
      headers.forEach(header => {
        table += `<td style="padding: 8px;">${row[header] ?? ''}</td>`;
      });
      table += '</tr>';
    });

    table += '</tbody></table>';

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Captcha</title>
        </head>
        <body>
          <h2>Captcha</h2>
          ${table}
          <script>
            window.onload = function () {
              window.print();
              window.onafterprint = function () {
                window.close();
              };
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getCaptchaDetails();
        // Defensive check: ensure data.data is array
        setCaptcha(Array.isArray(data.data) ? data.data : []);
        console.log('API data:', data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    if (!Array.isArray(captcha)) {
      setFilteredCaptcha([]);
      return;
    }
    const filtered = captcha.filter((item) =>
      item.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCaptcha(filtered);
  }, [searchQuery, captcha]);

  const handleUpdate = async () => {
    const modifiedItems = captcha.filter(item => item.modified);

    const updatePromises = modifiedItems.map(item => {
      const payload = { name: item.name, status: item.status === 1 };
      return updateCaptcha(payload);
    });

    try {
      const results = await Promise.all(updatePromises);
      console.log('Update results:', results);
      alert('Updated successfully!');
    } catch (err) {
      console.error('Error updating captchas:', err);
      alert('Failed to update.');
    }
  };

  return (
    captcha.length === 0 ? 
    <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-600">{loading ? "Loading..." : "No Data Found"}</h3>
    </div> : 
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
          <button onClick={handleDownloadClick} className="text-gray-500" title="Download Excel">
            <Database size={18} />
          </button>
          <button onClick={handleDownloadClick} className="text-gray-500" title="Download Excel">
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
        {Array.isArray(captcha) && captcha.length > 0 && (
          <thead className="bg-gray-50">
            <tr>
              {["Id", "Name", "Status"].map((key, index) => (
                <th
                  key={index}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-full"
                >
                  {key}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody className="bg-white divide-gray-200">
          {filteredCaptcha.map((item) => (
            <tr key={item.id}>
              <td className="px-4 py-3 text-sm text-blue-600 w-full">{item.id}</td>
              <td className="px-4 py-3 text-sm text-blue-600 w-full">{item.name}</td>
              <td className="px-4 py-3 text-sm text-blue-600 w-full">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    setCaptcha(prev =>
                      prev.map(items =>
                        items.id === item.id
                          ? { ...items, status: isChecked ? 1 : 0, modified: true }
                          : items
                      )
                    );
                  }}
                  checked={item.status === 1}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex w-full justify-end my-4">
        <button onClick={handleUpdate} className="btn btn-primary">
          Save
        </button>
      </div>
    </div>
  );
}

export default Captcha;
