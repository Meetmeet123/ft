// components/FeesMaster.jsx
"use client"
import { useState, useEffect } from 'react';
import { PencilIcon, XIcon } from 'lucide-react';
import feesList from './FeesList';
import { Database, Download, Copy, Printer,TagIcon } from 'lucide-react';
import Link from 'next/link';

export default function FeesMaster() {
  // State for form inputs
  const [formData, setFormData] = useState({
    feesGroup: '',
    feesType: '',
    dueDate: '',
    amount: '',
    fineType: 'None',
    percentage: '',
    fixAmount: ''
  });

  const [searchQuery,setSearchQuery]=useState();
  const [displayFees,setDispayFees]=useState(feesList);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Process form data here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      feesGroup: '',
      feesType: '',
      dueDate: '',
      amount: '',
      fineType: 'None',
      percentage: '',
      fixAmount: ''
    });
  };

  const handleExportExcel = () => {
    if (feesList.length === 0) return;
  
    const headers = Object.keys(feesList[0]);
    let table = '<table><tr>';
  
    // Add table headers
    headers.forEach(header => {
      table += `<th>${header}</th>`;
    });
    table += '</tr>';
  
    // Add table rows
    feesList.forEach(row => {
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
    a.download = 'Master_Fees.xls'; // .xls works fine with this method
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };  


  const handlePrint = () => {
    if (!feesList || feesList.length === 0) return;
  
    const headers = Object.keys(feesList[0]);
    let table = '<table border="1" style="border-collapse: collapse; width: 100%"><thead><tr>';
  
    // Headers
    headers.forEach(header => {
      table += `<th style="padding: 8px; text-align: left;">${header}</th>`;
    });
    table += '</tr></thead><tbody>';
  
    // Rows
    feesList.forEach(row => {
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
          <title>Master Fees</title>
        </head>
        <body>
          <h2>Master Fees</h2>
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
    if (!feesList || feesList.length === 0) return;
  
    const jsonText = JSON.stringify(feesList, null, 2);
  
    navigator.clipboard.writeText(jsonText)
      .then(() => {
        alert('JSON data copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy JSON: ', err);
      });
  };
  
  useEffect(() => {
      if(searchQuery===""){
        setDispayFees(feesList)
        return;
      }

        // if (searchQuery.trim()) {
        //     setDispayFees(feesList)
        //   return;
        // }
    
        // const query = searchQuery.toLowerCase();
        // const filteredFees = feesList.filter(fees => 
        //   fees.feesCode?.toLowerCase().includes(query) ||
        //   fees.amount?.toLowerCase().includes(query)
        // );
    
        // setDispayFees(filteredFees)
      }, [searchQuery, feesList]);

  return (
    <div className=" lg:flex md:block w-full bg-gray-100 p-2 gap-4">
      {/* Left Panel - Add Fees Form */}
      <div className="md:w-full lg:w-full bg-white rounded-md shadow p-4">
        <h2 className="text-xl font-medium text-gray-700 mb-4">Add Fees Master : 2025-26</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fees Group <span className="text-red-500">*</span>
            </label>
            <select
              name="feesGroup"
              value={formData.feesGroup}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select</option>
              <option value="Class 1 General">Class 1 General</option>
              <option value="Class 2 General">Class 2 General</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fees Type <span className="text-red-500">*</span>
            </label>
            <select
              name="feesType"
              value={formData.feesType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select</option>
              <option value="Admission Fees">Admission Fees</option>
              <option value="Monthly Fees">Monthly Fees</option>
              <option value="Exam Fees">Exam Fees</option>
              <option value="Bus Fees">Bus Fees</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount (₹) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fine Type
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="none"
                  name="fineType"
                  value="None"
                  checked={formData.fineType === 'None'}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="none" className="text-sm text-gray-700">None</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="percentage"
                  name="fineType"
                  value="Percentage"
                  checked={formData.fineType === 'Percentage'}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="percentage" className="text-sm text-gray-700">Percentage</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="fixAmount"
                  name="fineType"
                  value="Fix Amount"
                  checked={formData.fineType === 'Fix Amount'}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="fixAmount" className="text-sm text-gray-700">Fix Amount</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="cumulative"
                  name="fineType"
                  value="Cumulative"
                  checked={formData.fineType === 'Cumulative'}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="cumulative" className="text-sm text-gray-700">Cumulative</label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Percentage (%) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="percentage"
                value={formData.percentage}
                onChange={handleChange}
                disabled={formData.fineType !== 'Percentage'}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fix Amount (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="fixAmount"
                value={formData.fixAmount}
                onChange={handleChange}
                disabled={formData.fineType !== 'Fix Amount' && formData.fineType !== 'Cumulative'}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="btn btn-primary px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>

      {/* Right Panel - Fees List */}
      <div className="w-full bg-white rounded-md shadow p-4">
        <h2 className="text-xl font-medium text-gray-700 mb-4">Fees Master List : 2025-26</h2>
        
        <div className="mb-4 grid lg:grid-cols-2 justify-between">
          <input
            onChange={(e)=>setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className='flex items-center gap-4 justify-end' >
            <button onClick={handleExportExcel} >
                <Database className='g-5 w-5' />
            </button>
            <button onClick={handleExportExcel} >
                <Download className='g-5 w-5'/>
            </button>
            <button onClick={handleCopy} >
                <Copy className='g-5 w-5'/>
            </button>
            <button onClick={handlePrint} >
                <Printer className='g-5 w-5'/>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full bg-white">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fees Group</th>
                <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fees Code</th>
                <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fine Type</th>
                <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Per Day</th>
                <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days-Fine Amount</th>
                <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {displayFees.map((fee) => (
                <tr key={fee.id} className="hover:bg-gray-50">
                  <td className="py-2 px-3 text-sm text-gray-700">{fee.feesGroup}</td>
                  <td className="py-2 px-3 text-sm text-gray-700">{fee.feesCode}</td>
                  <td className="py-2 px-3 text-sm text-gray-700">{fee.amount}</td>
                  <td className="py-2 px-3 text-sm text-gray-700">{fee.fineType}</td>
                  <td className="py-2 px-3 text-sm text-gray-700">{fee.dueDate}</td>
                  <td className="py-2 px-3 text-sm text-gray-700">{fee.perDay}</td>
                  <td className="py-2 px-3 text-sm text-gray-700">{fee.daysFineAmount}</td>
                  <td className="py-2 px-3 text-sm text-gray-700 flex gap-2">
                    <button className="text-blue-500 hover:text-blue-700 focus:outline-none">
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button className="text-red-500 hover:text-red-700 focus:outline-none">
                      <XIcon className="w-5 h-5" />
                    </button>
                  </td>
                  <td className="py-2 px-3 text-sm text-gray-700" >
                    <Link href='/fees-collection/fees-master/assign-fees' >
                        <TagIcon/>
                    </Link>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}