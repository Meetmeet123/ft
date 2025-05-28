"use client";
import { useState, useEffect } from 'react';
import { ChevronUpIcon, ChevronDownIcon, MenuIcon, SearchIcon, Database, Download, Copy, Printer } from 'lucide-react';
import mockDataInfo from './mockData';
import PaymentDetailsModal from './PaymentDetails';

export default function OfflineBankPayments() {
  const [payments, setPayments] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'requestId', direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentDetailsVisible, setPaymentDetailsVisible] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null); // Store selected payment details
  const [filterBy, setFilterBy] = useState('All');
//   const [mockData,setMockData] = useState()

  useEffect(() => {
    const mockData = mockDataInfo; // Mock data
    setPayments(mockData);
  }, []);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = () => {
    const sortableData = [...payments];
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  };

  const getFilteredData = () => {
    return getSortedData().filter(item => {
      const searchMatch = Object.values(item).some(val =>
        val.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      const statusMatch = filterBy === 'All' || item.status === filterBy;
      
      return searchMatch && statusMatch;
    });
  };

  const StatusBadge = ({ status }) => {
    let badgeClasses = "px-2 py-1 rounded text-xs font-medium";
    
    switch(status) {
      case 'Approved':
        badgeClasses += " bg-green-100 text-green-800";
        break;
      case 'Rejected':
        badgeClasses += " bg-red-100 text-red-800";
        break;
      case 'Pending':
      default:
        badgeClasses += " bg-yellow-100 text-yellow-800";
    }
    
    return <span className={badgeClasses}>{status}</span>;
  };

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) {
      return (
        <div className="inline-flex flex-col ml-1 opacity-30">
          <ChevronUpIcon size={12} />
          <ChevronDownIcon size={12} className="-mt-1" />
        </div>
      );
    }
    
    return sortConfig.direction === 'asc' ? (
      <ChevronUpIcon size={16} className="ml-1 text-blue-600" />
    ) : (
      <ChevronDownIcon size={16} className="ml-1 text-blue-600" />
    );
  };

  const handleExportExcel = () => {
    if (mockDataInfo.length === 0) return;
  
    const headers = Object.keys(mockDataInfo[0]);
    let table = '<table><tr>';
  
    // Add table headers
    headers.forEach(header => {
      table += `<th>${header}</th>`;
    });
    table += '</tr>';
  
    // Add table rows
    mockDataInfo.forEach(row => {
      table += '<tr>';
      headers.forEach(header => {
        table += `<td>${row[header] ?? ''}</td>`;
      });
      table += '</tr>';
    });
  
    table += '</table>';
  
    const blob = new Blob([`
      <html xmlns:o="urn:schemas-microsoft-com:office:office" 
            xmlns:x="urn:schemas-microsoft-com:office:excel" 
            xmlns="http://www.w3.org/TR/REC-html40">
      <head><meta charset="UTF-8"></head>
      <body>${table}</body></html>
    `], {
      type: 'application/vnd.ms-excel'
    });
  
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Offline Bank Payment.xls'; // .xls works fine with this method
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };  

  const handlePrint = () => {
    if (!mockDataInfo || mockDataInfo.length === 0) return;
  
    const headers = Object.keys(mockDataInfo[0]);
    let table = '<table border="1" style="border-collapse: collapse; width: 100%"><thead><tr>';
  
    // Headers
    headers.forEach(header => {
      table += `<th style="padding: 8px; text-align: left;">${header}</th>`;
    });
    table += '</tr></thead><tbody>';
  
    // Rows
    mockDataInfo.forEach(row => {
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
          <title>Offline Bank Payment</title>
        </head>
        <body>
          <h2>Payment Requests</h2>
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

  const handleCopy = () => {
    if (!mockDataInfo || mockDataInfo.length === 0) return;
  
    const jsonText = JSON.stringify(mockDataInfo, null, 2);
  
    navigator.clipboard.writeText(jsonText)
      .then(() => {
        alert('JSON data copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy JSON: ', err);
      });
  };
  

  return (
    <div className="container w-full px-4 py-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Offline Bank Payments</h1>

      {!paymentDetailsVisible ?
        <>
          {/* Search and filter section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="relative w-full md:w-1/3">
              <SearchIcon className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-md border-gray-300"
              />
            </div>
            <div className="flex gap-2">
              <select
                className="border border-gray-300 rounded-md px-4 py-2"
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Pending">100</option>
              </select>
              <button 
              onClick={handleExportExcel}
              className="border px-3 py-2 rounded-md text-sm hover:bg-gray-100"><Database/></button>
              <button 
              onClick={handleCopy}
              className="border px-3 py-2 rounded-md text-sm hover:bg-gray-100"><Copy/></button>
              <button 
              onClick={handleExportExcel}
              className="border px-3 py-2 rounded-md text-sm hover:bg-gray-100"><Download/></button>
              <button 
              onClick={handlePrint}
              className="border px-3 py-2 rounded-md text-sm hover:bg-gray-100"><Printer/></button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-gray-200 rounded-md">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50 text-left">
                <tr>
                  {['requestId', 'admissionNo', 'name', 'class', 'paymentDate', 'submitDate', 'amount', 'status', 'statusDate', 'paymentId'].map((col) => (
                    <th
                      key={col}
                      onClick={() => requestSort(col)}
                      className="px-2 py-2 cursor-pointer whitespace-nowrap"
                    >
                      <div className="flex items-center capitalize">
                        {col === 'paymentId' ? 'Payment ID' :
                         col === 'submitDate' ? 'Submitted Date' :
                         col === 'paymentDate' ? 'Payment Date' :
                         col === 'requestId' ? 'Request ID' :
                         col === 'admissionNo' ? 'Admission No' :
                         col === 'statusDate' ? 'Status Date' :
                         col}
                        <SortIcon columnKey={col} />
                      </div>
                    </th>
                  ))}
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {getFilteredData().map((item) => (
                  <tr key={item.requestId}>
                    <td className="px-4 py-2">{item.requestId}</td>
                    <td className="px-4 py-2">{item.admissionNo}</td>
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2">{item.class}</td>
                    <td className="px-4 py-2">{item.paymentDate}</td>
                    <td className="px-4 py-2">{item.submitDate}</td>
                    <td className="px-4 py-2">${item.amount.toFixed(2)}</td>
                    <td className="px-4 py-2"><StatusBadge status={item.status} /></td>
                    <td className="px-4 py-2">{item.statusDate || '-'}</td>
                    <td className="px-4 py-2">{item.paymentId || '-'}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => {
                          setSelectedPayment(item);
                          setPaymentDetailsVisible(true);
                        }}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <MenuIcon size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
                {getFilteredData().length === 0 && (
                  <tr>
                    <td colSpan="11" className="text-center text-gray-500 py-6">
                      No results found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      :
        <PaymentDetailsModal
          payment={selectedPayment}
          onClose={() => setPaymentDetailsVisible(false)}
        />
      }

      {/* Pagination section */}
      <div className="flex items-center justify-between mt-6">
        {/* Pagination buttons here */}
      </div>
    </div>
  );
}
