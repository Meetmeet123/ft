// app/inventory/page.js
'use client';

import { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Pencil, Trash2 } from 'lucide-react';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const inventoryData = [
  { id: 1, item: "Cricket Bat", category: "Sports", unit: "Piece", quantity: 142, description: "" },
  { id: 2, item: "Uniform", category: "Staff Dress", unit: "Piece", quantity: -3, description: "" },
  { id: 3, item: "Table chair", category: "Furniture", unit: "Piece", quantity: 115, description: "" },
  { id: 4, item: "Staff Uniform", category: "Staff Dress", unit: "Piece", quantity: 49, description: "" },
  { id: 5, item: "Benches", category: "Furniture", unit: "Piece", quantity: 25, description: "" },
  { id: 6, item: "Football", category: "Sports", unit: "Piece", quantity: 34, description: "" },
  { id: 7, item: "Class Board", category: "Books Stationery", unit: "Piece", quantity: 15, description: "" },
  { id: 8, item: "Desk", category: "Furniture", unit: "Piece", quantity: -1, description: "" },
  { id: 9, item: "Lab Equipment", category: "Chemistry Lab Apparatus", unit: "Piece", quantity: 44, description: "" },
  { id: 10, item: "Notebooks", category: "Books Stationery", unit: "Piece", quantity: 125, description: "" },
  { id: 11, item: "Projectors", category: "Chemistry Lab Apparatus", unit: "Piece", quantity: 74, description: "" }
];

const categories = ["Sports", "Staff Dress", "Furniture", "Books Stationery", "Chemistry Lab Apparatus"];
const units = ["Piece", "Dozen", "Set", "Kg", "Liter"];

export default function InventoryPage() {
  const [formData, setFormData] = useState({
    id: null,
    item: '',
    category: '',
    unit: 'Piece',
    quantity: 0,
    description: ''
  });
  const [items, setItems] = useState(inventoryData);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const componentRef = useRef();

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setItems(items.map(item => item.id === formData.id ? formData : item));
    } else {
      const newItem = {
        ...formData,
        id: items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1
      };
      setItems([newItem, ...items]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      id: null,
      item: '',
      category: '',
      unit: 'Piece',
      quantity: 0,
      description: ''
    });
    setIsEditing(false);
  };

  // Item actions
  const handleEdit = (item) => {
    setFormData(item);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  // Search
  const filteredItems = items.filter(item =>
    item.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Export functions
  const exportToCSV = () => {
    const headers = ["Item", "Category", "Unit", "Quantity", "Description"];
    const data = filteredItems.map(item => [
      item.item, item.category, item.unit, item.quantity, item.description
    ]);
    const csvContent = [headers.join(","), ...data.map(row => row.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "inventory.csv");
    link.click();
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredItems);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory");
    XLSX.writeFile(workbook, "inventory.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(16);
    doc.text("Inventory Report", 14, 15);
  
    // Prepare table data
    const tableData = filteredItems.map(item => [
      item.item, 
      item.category, 
      item.unit, 
      item.quantity.toString(), 
      item.description
    ]);
  
    // Add table using autoTable
    autoTable(doc, {
      head: [['Item', 'Category', 'Unit', 'Quantity', 'Description']],
      body: tableData,
      startY: 20,
      styles: {
        fontSize: 8,
        cellPadding: 2,
        overflow: 'linebreak'
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold'
      },
      columnStyles: {
        0: { cellWidth: 40 },  // Item column width
        1: { cellWidth: 40 },  // Category column width
        2: { cellWidth: 30 },  // Unit column width
        3: { cellWidth: 30 },  // Quantity column width
        4: { cellWidth: 'auto' } // Description column width
      }
    });
  
    doc.save("inventory.pdf");
  };
  const printTable = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Issue Item List</title>');
    printWindow.document.write('<style>');
    printWindow.document.write(`
      body { font-family: Arial; }
      table { border-collapse: collapse; width: 100%; }
      th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
      th { background-color: #f2f2f2; }
      tr:nth-child(even) { background-color: #f9f9f9; }
      .print-title { margin-bottom: 20px; font-size: 24px; }
    `);
    printWindow.document.write('</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write('<div class="print-title">Issue Item List</div>');
    printWindow.document.write('<table>');
    
    // Table headers
    printWindow.document.write('<thead><tr>');
    const headers = ['Item', 'Category',  'Unit', 'Quantity', 'Description', 'Date'];
    headers.forEach(header => {
      printWindow.document.write(`<th>${header}</th>`);
    });
    printWindow.document.write('</tr></thead>');
    
    // Table body
    printWindow.document.write('<tbody>');
    filteredItems.forEach(item => {
      printWindow.document.write('<tr>');
      printWindow.document.write(`<td>${item.item}</td>`);   
    
      printWindow.document.write(`<td>${item.category}</td>`);
      printWindow.document.write(`<td>${item.unit}</td>`);

      printWindow.document.write(`<td>${item.quantity}</td>`);
      printWindow.document.write(`<td>${item.description}</td>`);
      
     
      printWindow.document.write('</tr>');
    });
    printWindow.document.write('</tbody>');
    
    printWindow.document.write('</table>');
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
      {/* Add Item Form - Left Side */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-[350px]" style={{width:'350px'}}>
      <h2 className="text-xl font-semibold mb-4 border-b pb-2">Add Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Item</label>
            <input
              type="text"
              name="item"
              value={formData.item}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
            <div className="mb-5">
              <label className="block text-sm font-medium mb-2">Item Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="mb-5">
              <label className="block text-sm font-medium mb-2">Unit</label>
              <select
                name="unit"
                value={formData.unit}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                {units.map(unit => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
            </div>
         
          <div className="mb-5">
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="2"
              className="w-full p-2 border rounded"
            ></textarea>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
            //   className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {isEditing ? 'Update' : 'Save'}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
  
      {/* Item List - Right Side */}
      <div className="bg-white p-6 rounded-lg shadow-md flex-1">
        <div className="bg-white p-6 rounded-lg shadow-md flex-1">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-xl font-semibold">Item List</h2>
         
        </div>
        
        <div className="mb-4" style={{width:"300px"}}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex space-x-2" style={{position:'relative',left:'350px'}}>
            <button onClick={exportToCSV} className="bg-green-600 text-black px-3 py-1 rounded text-sm">CSV</button>
            <button onClick={exportToExcel} className="bg-green-700 text-black px-3 py-1 rounded text-sm">Excel</button>
            <button onClick={exportToPDF} className="bg-red-600 text-black px-3 py-1 rounded text-sm">PDF</button>
            {/* <button onClick={handlePrint} className="bg-blue-600 text-black px-3 py-1 rounded text-sm">Print</button>
             */}
             <button onClick={printTable} className="bg-blue-600 text-black px-3 py-1 rounded text-sm">Print</button>

          </div>
        
        <div className="overflow-x-auto" style={{width:'550px'}} ref={componentRef}>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <tr key={item.id} className={item.quantity < 0 ? 'bg-red-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap">{item.item}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.unit}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-2">
                    <button 
                      onClick={() => handleEdit(item)} 
                      className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                      aria-label="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)} 
                      className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                      aria-label="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>

  );
}