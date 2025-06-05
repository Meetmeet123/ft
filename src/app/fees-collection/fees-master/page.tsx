// components/FeesMaster.tsx
"use client"
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { PencilIcon, XIcon, Database, Download, Copy, Printer, TagIcon } from 'lucide-react';
import feesList from './FeesList';
import Link from 'next/link';

// Type definitions
interface FormData {
  feesGroup: string;
  feesType: string;
  dueDate: string;
  amount: string;
  fineType: 'None' | 'Percentage' | 'Fix Amount' | 'Cumulative';
  percentage: string;
  fixAmount: string;
}

interface Fee {
  id: string | number;
  feesGroup: string;
  feesCode: string;
  amount: string;
  fineType: string;
  dueDate: string;
  perDay: string;
  daysFineAmount: string;
  [key: string]: string | number; // Index signature for dynamic properties
}

export default function FeesMaster() {
  // State for form inputs
  const [formData, setFormData] = useState<FormData>({
    feesGroup: '',
    feesType: '',
    dueDate: '',
    amount: '',
    fineType: 'None',
    percentage: '',
    fixAmount: ''
  });

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [displayFees, setDisplayFees] = useState<Fee[]>(feesList);

  // Handle form input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
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

  const handleExportExcel = (): void => {
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
        table += `<td>${(row as Record<string, unknown>)[header] ?? ''}</td>`;
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
    a.download = 'Master_Fees.xls';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };  

  const handlePrint = (): void => {
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
        table += `<td style="padding: 8px;">${(row as Record<string, unknown>)[header] ?? ''}</td>`;
      });
      table += '</tr>';
    });
  
    table += '</tbody></table>';
  
    const printWindow = window.open('', '_blank');
    if (printWindow) {
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
    }
  };

  const handleCopy = async (): Promise<void> => {
    if (!feesList || feesList.length === 0) return;
  
    const jsonText = JSON.stringify(feesList, null, 2);
  
    try {
      await navigator.clipboard.writeText(jsonText);
      alert('JSON data copied to clipboard');
    } catch (err) {
      console.error('Failed to copy JSON: ', err);
    }
  };

  const handleDelete = (index: number): void => {
    setDisplayFees(displayFees.filter((_, i) => i !== index));
  };
  
  useEffect(() => {
    if (searchQuery === "") {
      setDisplayFees(feesList);
      return;
    }

    // Uncomment and modify this section when you want to implement search functionality
    // const query = searchQuery.toLowerCase();
    // const filteredFees = feesList.filter(fees => 
    //   fees.feesCode?.toLowerCase().includes(query) ||
    //   fees.amount?.toLowerCase().includes(query)
    // );
    // setDisplayFees(filteredFees);
  }, [searchQuery]);

  return (
    <div className="lg:flex md:block w-full bg-gray-100 p-2 gap-4">
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="btn btn-primary px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
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
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className='flex items-center gap-4 justify-end'>
            <button 
              onClick={handleExportExcel}
              className="p-2 hover:bg-gray-100 rounded-md transition-colors"
              title="Export to Database"
            >
              <Database className='w-5 h-5' />
            </button>
            <button 
              onClick={handleExportExcel}
              className="p-2 hover:bg-gray-100 rounded-md transition-colors"
              title="Download"
            >
              <Download className='w-5 h-5'/>
            </button>
            <button 
              onClick={handleCopy}
              className="p-2 hover:bg-gray-100 rounded-md transition-colors"
              title="Copy"
            >
              <Copy className='w-5 h-5'/>
            </button>
            <button 
              onClick={handlePrint}
              className="p-2 hover:bg-gray-100 rounded-md transition-colors"
              title="Print"
            >
              <Printer className='w-5 h-5'/>
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
                <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assign</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {displayFees.map((fee: Fee, index: number) => (
                <tr key={fee.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-2 px-3 text-sm text-gray-700">{fee.feesGroup}</td>
                  <td className="py-2 px-3 text-sm text-gray-700">{fee.feesCode}</td>
                  <td className="py-2 px-3 text-sm text-gray-700">{fee.amount}</td>
                  <td className="py-2 px-3 text-sm text-gray-700">{fee.fineType}</td>
                  <td className="py-2 px-3 text-sm text-gray-700">{fee.dueDate}</td>
                  <td className="py-2 px-3 text-sm text-gray-700">{fee.perDay}</td>
                  <td className="py-2 px-3 text-sm text-gray-700">{fee.daysFineAmount}</td>
                  <td className="py-2 px-3 text-sm text-gray-700">
                    <div className="flex gap-2">
                      <button 
                        className="text-blue-500 hover:text-blue-700 focus:outline-none p-1 hover:bg-blue-50 rounded transition-colors"
                        title="Edit"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(index)}
                        className="text-red-500 hover:text-red-700 focus:outline-none p-1 hover:bg-red-50 rounded transition-colors"
                        title="Delete"
                      >
                        <XIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                  <td className="py-2 px-3 text-sm text-gray-700">
                    <Link 
                      href='/fees-collection/fees-master/assign-fees'
                      className="text-gray-600 hover:text-gray-800 transition-colors"
                      title="Assign Fees"
                    >
                      <TagIcon className="w-5 h-5" />
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