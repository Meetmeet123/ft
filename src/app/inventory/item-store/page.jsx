'use client';

import { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Pencil, Trash2 } from 'lucide-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

const ItemStore = () => {
  // Sample JSON data
  const initialStores = [
    { id: 1, name: 'Library Store', code: 'LB2', description: '' },
    { id: 2, name: 'Science Store', code: 'SC2', description: '' },
    { id: 3, name: 'Uniform Dress Store', code: 'UND23', description: '' },
    { id: 4, name: 'Furniture Store', code: 'FS342', description: '' },
    { id: 5, name: 'Chemistry Equipment', code: 'Ch201', description: 'The basic idea about the proper and necessary chemistry lab apparatus should be cleared among the students.' },
    { id: 6, name: 'Sports Store', code: 'sp55', description: '' },
  ];

  const [stores, setStores] = useState(initialStores);
  const [searchTerm, setSearchTerm] = useState('');
  const [newStore, setNewStore] = useState({
    name: '',
    code: '',
    description: ''
  });
  const [editingId, setEditingId] = useState(null);
  const tableRef = useRef();

  // Handle input changes for new store
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStore(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add new store or update existing
  const handleSubmitStore = (e) => {
    e.preventDefault();
    if (!newStore.name || !newStore.code) return;
    
    if (editingId) {
      // Update existing store
      setStores(stores.map(store => 
        store.id === editingId ? { ...newStore, id: editingId } : store
      ));
      setEditingId(null);
    } else {
      // Add new store
      const store = {
        id: stores.length + 1,
        ...newStore
      };
      setStores([...stores, store]);
    }
    
    setNewStore({ name: '', code: '', description: '' });
  };

  // Edit store
  const handleEditStore = (id) => {
    const storeToEdit = stores.find(store => store.id === id);
    if (storeToEdit) {
      setNewStore({
        name: storeToEdit.name,
        code: storeToEdit.code,
        description: storeToEdit.description
      });
      setEditingId(id);
    }
  };

  // Delete store
  const handleDeleteStore = (id) => {
    setStores(stores.filter(store => store.id !== id));
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setNewStore({ name: '', code: '', description: '' });
    setEditingId(null);
  };

  // Filter stores based on search term
  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Item Store Name', 'Item Store Code', 'Description'];
    const csvData = [
      headers,
      ...filteredStores.map(store => [
        store.name,
        store.code,
        store.description
      ])
    ];
    
    let csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'item_stores.csv');
    link.click();
  };

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredStores.map(store => ({
      'Item Store Name': store.name,
      'Item Store Code': store.code,
      'Description': store.description
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Item Stores');
    XLSX.writeFile(workbook, 'item_stores.xlsx');
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.text('Item Stores List', 14, 15);
    
    // Prepare data for the table
    const tableData = filteredStores.map(store => [
      store.name,
      store.code,
      store.description || 'N/A'
    ]);
    
    // Add table
    autoTable(doc, {
      head: [['Name', 'Code', 'Description']],
      body: tableData,
      startY: 20,
      theme: 'grid',
      headStyles: {
        fillColor: [241, 241, 241],
        textColor: [0, 0, 0]
      }
    });
    
    doc.save('item_stores.pdf');
  };

  // Print
  const printTable = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Item Stores List</title>');
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
    printWindow.document.write('<div class="print-title">Item Stores List</div>');
    printWindow.document.write('<table>');
    
    // Table headers
    printWindow.document.write('<thead><tr>');
    const headers = ['Item Store Name', 'Item Store Code', 'Description'];
    headers.forEach(header => {
      printWindow.document.write(`<th>${header}</th>`);
    });
    printWindow.document.write('</tr></thead>');
    
    // Table body
    printWindow.document.write('<tbody>');
    filteredStores.forEach(store => {
      printWindow.document.write('<tr>');
      printWindow.document.write(`<td>${store.name}</td>`);
      printWindow.document.write(`<td>${store.code}</td>`);
      printWindow.document.write(`<td>${store.description || '-'}</td>`);
      printWindow.document.write('</tr>');
    });
    printWindow.document.write('</tbody>');
    
    printWindow.document.write('</table>');
    printWindow.document.write(`<div class="print-footer">Total Records: ${filteredStores.length}</div>`);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };


  return (
    <div className="flex flex-col md:flex-row gap-4 p-4" style={{width:'1080px', position:'relative', right:"35px"}}>
      <div className="flex flex-col lg:flex-row gap-6" style={{width:"2500px"}}>
        {/* Left side - Form */}
        <div className="lg:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
            <h2 className="text-xl font-semibold mb-4">
              {editingId ? 'Edit Store' : 'Add New Store'}
            </h2>
            <form onSubmit={handleSubmitStore}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name*</label>
                  <input
                    type="text"
                    name="name"
                    value={newStore.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Code*</label>
                  <input
                    type="text"
                    name="code"
                    value={newStore.code}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="description"
                    value={newStore.description}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    rows="3"
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
            
            <div style={{width:'600px', position:'relative',right:'20px'}} ref={tableRef}>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Store Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Store Code</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider no-print">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStores.length > 0 ? (
                    filteredStores.map((store) => (
                      <tr key={store.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{store.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{store.code}</td>
                        <td className="px-6 py-4">{store.description}</td>
                        <td className="px-6 py-4 whitespace-nowrap no-print">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditStore(store.id)}
                              className="text-blue-600 hover:text-blue-900 p-1"
                              title="Edit"
                            >
                              <Pencil size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteStore(store.id)}
                              className="text-red-600 hover:text-red-900 p-1"
                              title="Delete"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-center">No stores found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemStore;