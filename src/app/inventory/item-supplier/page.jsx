'use client';

import { useState, useRef } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

const ItemSupplier = () => {
  // Sample JSON data
  const initialSuppliers = [
    {
      id: 1,
      name: 'Camlin Stationers',
      phone: '8458436583',
      email: 'camlin@gmail.com',
      address: '22 Cristal Way, CA',
      contactPerson: 'Bruce Stark',
      contactPhone: '847497932',
      contactEmail: 'bruce@gmail.com'
    },
    {
      id: 2,
      name: 'Jhonson Uniform Dress',
      phone: '8795787856',
      email: 'Jhon@gmail.com',
      address: '',
      contactPerson: '',
      contactPhone: '',
      contactEmail: ''
    },
    {
      id: 3,
      name: 'David Furniture',
      phone: '678678678',
      email: 'da@gmail.com',
      address: '22 Cristal Way, CA',
      contactPerson: 'Peter',
      contactPhone: '685676578',
      contactEmail: 'per@gmail.com'
    },
    {
      id: 4,
      name: 'Jhon smith Supplier',
      phone: '8908099878',
      email: 'jhon@gmail.com',
      address: 'Delhi Road, DR',
      contactPerson: 'David',
      contactPhone: '9997978678',
      contactEmail: 'david@gmail.com'
    }
  ];

  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [searchTerm, setSearchTerm] = useState('');
  const [newSupplier, setNewSupplier] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    contactPerson: '',
    contactPhone: '',
    contactEmail: ''
  });
  const [editingId, setEditingId] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSupplier(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add new supplier or update existing
  const handleSubmitSupplier = (e) => {
    e.preventDefault();
    if (!newSupplier.name) return;
    
    if (editingId) {
      // Update existing supplier
      setSuppliers(suppliers.map(supplier => 
        supplier.id === editingId ? { ...newSupplier, id: editingId } : supplier
      ));
      setEditingId(null);
    } else {
      // Add new supplier
      const supplier = {
        id: suppliers.length + 1,
        ...newSupplier
      };
      setSuppliers([...suppliers, supplier]);
    }
    
    setNewSupplier({
      name: '',
      phone: '',
      email: '',
      address: '',
      contactPerson: '',
      contactPhone: '',
      contactEmail: ''
    });
  };

  // Edit supplier
  const handleEditSupplier = (id) => {
    const supplierToEdit = suppliers.find(supplier => supplier.id === id);
    if (supplierToEdit) {
      setNewSupplier({
        name: supplierToEdit.name,
        phone: supplierToEdit.phone,
        email: supplierToEdit.email,
        address: supplierToEdit.address,
        contactPerson: supplierToEdit.contactPerson,
        contactPhone: supplierToEdit.contactPhone,
        contactEmail: supplierToEdit.contactEmail
      });
      setEditingId(id);
    }
  };

  // Delete supplier
  const handleDeleteSupplier = (id) => {
    setSuppliers(suppliers.filter(supplier => supplier.id !== id));
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setNewSupplier({
      name: '',
      phone: '',
      email: '',
      address: '',
      contactPerson: '',
      contactPhone: '',
      contactEmail: ''
    });
    setEditingId(null);
  };

  // Filter suppliers based on search term
  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contactPhone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contactEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Name', 'Phone', 'Email', 'Address', 'Contact Person', 'Contact Phone', 'Contact Email'];
    const csvData = [
      headers,
      ...filteredSuppliers.map(supplier => [
        supplier.name,
        supplier.phone,
        supplier.email,
        supplier.address,
        supplier.contactPerson,
        supplier.contactPhone,
        supplier.contactEmail
      ])
    ];
    
    let csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'item_suppliers.csv');
    link.click();
  };

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredSuppliers.map(supplier => ({
      'Item Supplier': supplier.name,
      'Contact Person': supplier.contactPerson,
      'Address': supplier.address,
      'Phone': supplier.phone,
      'Email': supplier.email,
      'Contact Phone': supplier.contactPhone,
      'Contact Email': supplier.contactEmail
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Item Suppliers');
    XLSX.writeFile(workbook, 'item_suppliers.xlsx');
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    
    doc.text('Item Suppliers List', 14, 15);
    
    const tableData = filteredSuppliers.map(supplier => [
      supplier.name,
      supplier.contactPerson,
      supplier.address,
      supplier.phone,
      supplier.email,
      supplier.contactPhone,
      supplier.contactEmail
    ]);
    
    autoTable(doc, {
      head: [['Item Supplier', 'Contact Person', 'Address', 'Phone', 'Email', 'Contact Phone', 'Contact Email']],
      body: tableData,
      startY: 20,
      theme: 'grid',
      headStyles: {
        fillColor: [241, 241, 241],
        textColor: [0, 0, 0]
      },
      margin: { horizontal: 5 },
      styles: { fontSize: 8 }
    });
    
    doc.save('item_suppliers.pdf');
  };

  // Print function
  const printTable = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Item Suppliers List</title>');
    printWindow.document.write('<style>');
    printWindow.document.write(`
      body { font-family: Arial; }
      table { border-collapse: collapse; width: 100%; }
      th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
      th { background-color: #f2f2f2; }
      tr:nth-child(even) { background-color: #f9f9f9; }
      .print-title { margin-bottom: 20px; font-size: 24px; text-align: center; }
      .print-footer { margin-top: 20px; font-size: 12px; text-align: center; }
    `);
    printWindow.document.write('</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write('<div class="print-title">Item Suppliers List</div>');
    printWindow.document.write('<table>');
    
    // Table headers
    printWindow.document.write('<thead><tr>');
    const headers = ['Item Supplier', 'Contact Person', 'Address', 'Phone', 'Email', 'Contact Phone', 'Contact Email'];
    headers.forEach(header => {
      printWindow.document.write(`<th>${header}</th>`);
    });
    printWindow.document.write('</tr></thead>');
    
    // Table body
    printWindow.document.write('<tbody>');
    filteredSuppliers.forEach(supplier => {
      printWindow.document.write('<tr>');
      printWindow.document.write(`<td>${supplier.name}</td>`);
      printWindow.document.write(`<td>${supplier.contactPerson || '-'}</td>`);
      printWindow.document.write(`<td>${supplier.address || '-'}</td>`);
      printWindow.document.write(`<td>${supplier.phone || '-'}</td>`);
      printWindow.document.write(`<td>${supplier.email || '-'}</td>`);
      printWindow.document.write(`<td>${supplier.contactPhone || '-'}</td>`);
      printWindow.document.write(`<td>${supplier.contactEmail || '-'}</td>`);
      printWindow.document.write('</tr>');
    });
    printWindow.document.write('</tbody>');
    
    printWindow.document.write('</table>');
    printWindow.document.write(`<div class="print-footer">Total Records: ${filteredSuppliers.length}</div>`);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4" style={{width:'1080px', position:'relative', right:"30px"}}>
      <div className="flex flex-col lg:flex-row gap-6" style={{width:"1200px"}}>
        {/* Left side - Form */}
        <div className="lg:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
            <h2 className="text-xl font-semibold mb-4">
              {editingId ? 'Edit Item Supplier' : 'Add Item Supplier'}
            </h2>
            <form onSubmit={handleSubmitSupplier}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name*</label>
                  <input
                    type="text"
                    name="name"
                    value={newSupplier.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={newSupplier.phone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={newSupplier.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={newSupplier.address}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Contact Person Name</label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={newSupplier.contactPerson}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Contact Person Phone</label>
                  <input
                    type="text"
                    name="contactPhone"
                    value={newSupplier.contactPhone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Contact Person Email</label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={newSupplier.contactEmail}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
              </div>
              <div className="mt-4 flex space-x-2">
                <button
                  type="submit"
                //   className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex-1"
                >
                  {editingId ? 'Update' : 'Save'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    // className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        
        {/* Right side - Table */}
        <div className="lg:w-2/3">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64 pl-8 pr-4 py-2 border rounded-md"
                  />
                  <svg
                    className="absolute left-2 top-2.5 h-4 w-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={exportToCSV}
                    className="bg-green-600 text-black px-3 py-2 rounded-md hover:bg-green-700 text-sm"
                    title="Export to CSV"
                  >
                    CSV
                  </button>
                  <button
                    onClick={exportToExcel}
                    className="bg-green-700 text-black px-3 py-2 rounded-md hover:bg-green-800 text-sm"
                    title="Export to Excel"
                  >
                    Excel
                  </button>
                  <button
                    onClick={exportToPDF}
                    className="bg-red-600 text-black px-3 py-2 rounded-md hover:bg-red-700 text-sm"
                    title="Export to PDF"
                  >
                    PDF
                  </button>
                  <button
                    onClick={printTable}
                    className="bg-blue-600 text-black px-3 py-2 rounded-md hover:bg-blue-700 text-sm"
                    title="Print"
                  >
                    Print
                  </button>
                </div>
              </div>
            </div>
            
            <div style={{width:'600px', position:'relative',right:'20px'}}>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Supplier</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Person</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider no-print">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSuppliers.length > 0 ? (
                    filteredSuppliers.map((supplier) => (
                      <tr key={supplier.id}>
                        <td className="px-6 py-4">
                          <div className="font-medium">{supplier.name}</div>
                          <div className="text-sm text-gray-500">{supplier.phone}</div>
                          <div className="text-sm text-gray-500">{supplier.email}</div>
                        </td>
                        <td className="px-6 py-4">
                          {supplier.contactPerson && (
                            <>
                              <div className="font-medium">{supplier.contactPerson}</div>
                              <div className="text-sm text-gray-500">{supplier.contactPhone}</div>
                              <div className="text-sm text-gray-500">{supplier.contactEmail}</div>
                            </>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {supplier.address}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap no-print">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditSupplier(supplier.id)}
                              className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                              title="Edit"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteSupplier(supplier.id)}
                              className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-center">No suppliers found</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="px-6 py-3 text-sm text-gray-500">
                Record: 1 to {filteredSuppliers.length} of {filteredSuppliers.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemSupplier;