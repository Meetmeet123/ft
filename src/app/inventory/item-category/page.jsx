'use client';

import { useState, useRef } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { CSVLink } from 'react-csv';

// Sample data
const initialCategories = [
  { id: 1, name: 'Sports', description: 'Sports equipment and gear' },
  { id: 2, name: 'Staff Dress', description: 'Uniforms for staff members' },
  { id: 3, name: 'Furniture', description: 'Office and classroom furniture' },
  { id: 4, name: 'Books Stationery', description: 'Educational materials' },
  { id: 5, name: 'Chemistry Lab Apparatus', description: 'Lab equipment for chemistry' }
];

const ItemCategoryManager = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentCategory, setCurrentCategory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const tableRef = useRef();

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = () => {
    if (!formData.name.trim()) return;
    const newCategory = {
      id: Math.max(...categories.map(c => c.id), 0) + 1,
      ...formData
    };
    setCategories([...categories, newCategory]);
    setFormData({ name: '', description: '' });
  };

  const handleEdit = (category) => {
    setCurrentCategory(category);
    setFormData({ name: category.name, description: category.description });
    setIsEditing(true);
  };

  const handleUpdate = () => {
    if (!formData.name.trim()) return;
    setCategories(categories.map(category =>
      category.id === currentCategory.id ? { ...category, ...formData } : category
    ));
    setIsEditing(false);
    setFormData({ name: '', description: '' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(category => category.id !== id));
    }
  };

  // CSV Data
  const csvData = [
    ['ID', 'Category Name', 'Description'],
    ...filteredCategories.map(category => [
      category.id,
      category.name,
      category.description || ''
    ])
  ];

  // Excel Export
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredCategories.map(category => ({
      'ID': category.id,
      'Category Name': category.name,
      'Description': category.description || ''
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Item Categories');
    XLSX.writeFile(workbook, 'item_categories.xlsx');
  };

  // PDF Export
  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Item Categories Report', 14, 15);
    const tableData = filteredCategories.map(category => [
      category.id,
      category.name,
      category.description || ''
    ]);
    autoTable(doc, {
      head: [['ID', 'Category Name', 'Description']],
      body: tableData,
      startY: 20,
      styles: {
        fontSize: 9,
        cellPadding: 2,
        overflow: 'linebreak'
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold'
      },
      columnStyles: {
        0: { cellWidth: 15 },
        1: { cellWidth: 40 },
        2: { cellWidth: 'auto' }
      }
    });
    doc.save('item-categories.pdf');
  };

  // Print Function
  const printTable = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Item Categories List</title>');
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
    printWindow.document.write('<div class="print-title">Item Categories List</div>');
    printWindow.document.write('<table>');
    
    // Table headers
    printWindow.document.write('<thead><tr>');
    const headers = ['ID', 'Category Name', 'Description'];
    headers.forEach(header => {
      printWindow.document.write(`<th>${header}</th>`);
    });
    printWindow.document.write('</tr></thead>');
    
    // Table body
    printWindow.document.write('<tbody>');
    filteredCategories.forEach(category => {
      printWindow.document.write('<tr>');
      printWindow.document.write(`<td>${category.id}</td>`);
      printWindow.document.write(`<td>${category.name}</td>`);
      printWindow.document.write(`<td>${category.description || '-'}</td>`);
      printWindow.document.write('</tr>');
    });
    printWindow.document.write('</tbody>');
    
    printWindow.document.write('</table>');
    printWindow.document.write(`<div class="print-footer">Total Records: ${filteredCategories.length}</div>`);
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
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Form Panel */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-[350px]" style={{width:'600px'}}>
          <h2 className="text-xl font-semibold mb-4">
            {isEditing ? 'Edit Category' : 'Add New Category'}
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter category name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter description (optional)"
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              {isEditing && (
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({ name: '', description: '' });
                  }}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
              )}
              <button
                type="button"
                onClick={isEditing ? handleUpdate : handleAdd}
                className="px-4 py-2 bg-blue-600 text-black rounded hover:bg-blue-700 disabled:bg-blue-400"
                disabled={!formData.name.trim()}
              >
                {isEditing ? 'Update Category' : 'Add Category'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Table Panel */}
        <div className="lg:w-2/3 w-full">
          {/* Search and Export Buttons */}
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-2" style={{width:'500px'}}>
            <input
              type="text"
              placeholder="Search categories..."
              className="border p-2 rounded w-full md:w-1/2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex gap-2">
              <CSVLink
                data={csvData}
                filename="item-categories.csv"
                // className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 text-center"
                className=" text-black py-2 px-4 rounded hover:bg-green-800"

              >
                CSV
              </CSVLink>
              <button
                onClick={exportToExcel}
                className="bg-green-700 text-black py-2 px-4 rounded hover:bg-green-800"
              >
                Excel
              </button>
              <button
                onClick={handleGeneratePDF}
                className="bg-red-600 text-black py-2 px-4 rounded hover:bg-red-700"
              >
                PDF
              </button>
              <button
                onClick={printTable}
                className="bg-blue-600 text-black py-2 px-4 rounded hover:bg-blue-700"
              >
                Print
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden" style={{width:'600px', position:'relative',right:'20px'}}>
            <div ref={tableRef}> 
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCategories.length > 0 ? (
                    filteredCategories.map((category) => (
                      <tr key={category.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{category.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium">{category.name}</td>
                        <td className="px-6 py-4">{category.description}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(category)}
                              className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                            >
                              <Pencil size={16} /> 
                            </button>
                            <button
                              onClick={() => handleDelete(category.id)}
                              className="text-red-600 hover:text-red-900 flex items-center gap-1"
                            >
                              <Trash2 size={16} /> 
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                        No categories found
                      </td>
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

export default ItemCategoryManager;