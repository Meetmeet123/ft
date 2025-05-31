"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PayrollReport() {
     const router = useRouter();
      const handleClick1 = () => {
        router.push('../human-resource/staff-report'); 
        // yahan apne destination ka route likho
      };
      
      const handleClick2 = () => {
        router.push('../human-resource/payroll-report'); 
    
        // yahan apne destination ka route likho
      };
  // Dummy data for dropdowns
  const roleOptions = ["Admin", "Faculty", "Accountant", "Technical Staff", "Principal"];
  const monthOptions = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const yearOptions = ["2021", "2022", "2023", "2024", "2025"];

  // Dummy payroll data
  const payrollData = [
    {
      id: 1,
      name: "William Abbot",
      role: "Admin",
      designation: "Principal",
      monthYear: "February - 2021",
      payslipNumber: 4,
      basicSalary: 38000.00,
      earning: 0.00,
      deduction: 0.00,
      grossSalary: 38000.00,
      tax: 0.00,
      netSalary: 38000.00
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Faculty",
      designation: "Professor",
      monthYear: "February - 2021",
      payslipNumber: 5,
      basicSalary: 25000.00,
      earning: 2000.00,
      deduction: 500.00,
      grossSalary: 27000.00,
      tax: 1500.00,
      netSalary: 25500.00
    },
    {
      id: 3,
      name: "Robert Chen",
      role: "Technical Staff",
      designation: "IT Manager",
      monthYear: "February - 2021",
      payslipNumber: 6,
      basicSalary: 30000.00,
      earning: 1000.00,
      deduction: 300.00,
      grossSalary: 31000.00,
      tax: 2000.00,
      netSalary: 29000.00
    },
    {
      id: 4,
      name: "Priya Sharma",
      role: "Accountant",
      designation: "Finance Head",
      monthYear: "February - 2021",
      payslipNumber: 7,
      basicSalary: 32000.00,
      earning: 1500.00,
      deduction: 400.00,
      grossSalary: 33500.00,
      tax: 1800.00,
      netSalary: 31700.00
    }
  ];

  // State for search criteria
  const [searchCriteria, setSearchCriteria] = useState({
    role: '',
    month: '',
    year: ''
  });

  // State for filtered data
  const [filteredPayroll, setFilteredPayroll] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Calculate grand totals
  const calculateTotals = (data) => {
    return data.reduce((acc, curr) => {
      acc.basicSalary += curr.basicSalary;
      acc.earning += curr.earning;
      acc.deduction += curr.deduction;
      acc.grossSalary += curr.grossSalary;
      acc.tax += curr.tax;
      acc.netSalary += curr.netSalary;
      return acc;
    }, {
      basicSalary: 0,
      earning: 0,
      deduction: 0,
      grossSalary: 0,
      tax: 0,
      netSalary: 0
    });
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle search
  const handleSearch = () => {
    if (!searchCriteria.year) {
      alert('Please select at least Year');
      return;
    }

    setHasSearched(true);
    
    // Filter payroll based on selected criteria
    let filtered = [...payrollData];
    
    if (searchCriteria.role) {
      filtered = filtered.filter(payroll => payroll.role === searchCriteria.role);
    }
    
    if (searchCriteria.month) {
      filtered = filtered.filter(payroll => payroll.monthYear.includes(searchCriteria.month));
    }
    
    if (searchCriteria.year) {
      filtered = filtered.filter(payroll => payroll.monthYear.includes(searchCriteria.year));
    }
    
    setFilteredPayroll(filtered);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };
  const commonStyle = (report) => ({
    padding: '10px',
    backgroundColor:  '#f0f0f0',
    color:  '#333',
    border: '1px solid #ddd',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontWeight: '500',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  });
  return (
    <div className="container mx-auto p-4">
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
    <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Online Examinations Report</h1>
    
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '10px',
      marginBottom: '30px'
    }}>
      <button style={commonStyle()} onClick={handleClick1}>Staff Report</button>
      <button style={commonStyle()} onClick={handleClick2}>Payroll Report</button>
  
      
    </div>
  </div>
      <h1 className="text-2xl font-bold mb-6">Payroll Report</h1>
      
      {/* Search Criteria - All in one row */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Select Criteria</h2>
        
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[150px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              name="role"
              value={searchCriteria.role}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Role</option>
              {roleOptions.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1 min-w-[150px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
            <select
              name="month"
              value={searchCriteria.month}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Month</option>
              {monthOptions.map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1 min-w-[150px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Year *</label>
            <select
              name="year"
              value={searchCriteria.year}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Year</option>
              {yearOptions.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="mt-4">
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-black px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </div>
      </div>
      
      {/* Results Section */}
      {hasSearched && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">Payroll Report</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month - Year</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payslip #</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Basic Salary ($)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Earning ($)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deduction ($)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gross Salary ($)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tax ($)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Salary ($)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPayroll.length > 0 ? (
                  <>
                    {filteredPayroll.map((payroll) => (
                      <tr key={payroll.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payroll.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payroll.role}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payroll.designation}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payroll.monthYear}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payroll.payslipNumber}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(payroll.basicSalary)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(payroll.earning)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(payroll.deduction)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(payroll.grossSalary)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(payroll.tax)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(payroll.netSalary)}</td>
                      </tr>
                    ))}
                    {/* Grand Total Row */}
                    <tr className="bg-gray-50 font-medium">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900" colSpan="5">Grand Total</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${formatCurrency(calculateTotals(filteredPayroll).basicSalary)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${formatCurrency(calculateTotals(filteredPayroll).earning)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${formatCurrency(calculateTotals(filteredPayroll).deduction)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${formatCurrency(calculateTotals(filteredPayroll).grossSalary)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${formatCurrency(calculateTotals(filteredPayroll).tax)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${formatCurrency(calculateTotals(filteredPayroll).netSalary)}</td>
                    </tr>
                  </>
                ) : (
                  <tr>
                    <td colSpan="11" className="px-6 py-4 text-center text-sm text-gray-500">
                      No payroll records found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}