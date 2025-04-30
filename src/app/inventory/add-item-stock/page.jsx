'use client';

import { useState, useRef } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

import autoTable from "jspdf-autotable";
import { useReactToPrint } from 'react-to-print';

// Dummy data
const inventoryData = [
  {
    id: 1,
    item: "Projectors",
    category: "Chemistry Lab Apparatus",
    supplier: "Camini Stationers",
    store: "Chemistry Equipment (Ch201)",
    quantity: 15,
    price: 180.00,
    date: "04/20/2025",
    description: ""
  },
  {
    id: 2,
    item: "Hotebooks",
    category: "Books Stationery",
    supplier: "Camini Stationers",
    store: "Science Store (SC2)",
    quantity: 50,
    price: 200.00,
    date: "04/25/2025",
    description: ""
  },
  {
    id: 3,
    item: "Staff Uniform",
    category: "Staff Dress",
    supplier: "Jihonson Uniform",
    store: "Uniform Dress Store (JMD23)",
    quantity: 10,
    price: 150.00,
    date: "04/20/2025",
    description: ""
  },
  {
    id: 4,
    item: "Lab Equipment",
    category: "Chemistry Lab Apparatus",
    supplier: "Jihon Smith",
    store: "Chemistry Equipment (Ch201)",
    quantity: 20,
    price: 150.00,
    date: "04/15/2025",
    description: ""
  },
  {
    id: 5,
    item: "Tablechair",
    category: "Furniture",
    supplier: "David Furniture",
    store: "Furniture Store (FS342)",
    quantity: 20,
    price: 150.00,
    date: "04/10/2025",
    description: ""
  },
  {
    id: 6,
    item: "Uniform",
    category: "Staff Dress",
    supplier: "Jihonson Uniform",
    store: "Uniform Dress Store (JMD23)",
    quantity: 15,
    price: 120.00,
    date: "04/05/2025",
    description: ""
  },
  {
    id: 7,
    item: "Cricket Bar",
    category: "Sports",
    supplier: "Jihon Smith",
    store: "Sports Store (pg55)",
    quantity: 25,
    price: 150.00,
    date: "04/01/2025",
    description: ""
  },
  {
    id: 8,
    item: "Class Board",
    category: "Books Stationery",
    supplier: "Camini Stationers",
    store: "Science Store (SC2)",
    quantity: 20,
    price: 100.00,
    date: "03/01/2025",
    description: ""
  }
];

const categories = [
  "Chemistry Lab Apparatus",
  "Books Stationery",
  "Staff Dress",
  "Furniture",
  "Sports"
];

const suppliers = [
  "Camini Stationers",
  "Jihonson Uniform",
  "Jihon Smith",
  "David Furniture"
];

const stores = [
  "Chemistry Equipment (Ch201)",
  "Science Store (SC2)",
  "Uniform Dress Store (JMD23)",
  "Furniture Store (FS342)",
  "Sports Store (pg55)"
];

export default function InventoryPage() {
  const [formData, setFormData] = useState({
    id: null,
    item: '',
    category: '',
    supplier: '',
    store: '',
    quantity: 1,
    price: 0,
    date: new Date().toISOString().split('T')[0],
    description: ''
  });
  const [items, setItems] = useState(inventoryData.map(item => ({
    ...item,
    price: Number(item.price)
  })));
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const componentRef = useRef();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleQuantityChange = (amount) => {
    const newQuantity = Math.max(1, formData.quantity + amount);
    setFormData({
      ...formData,
      quantity: newQuantity
    });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditing) {
      setItems(items.map(item => 
        item.id === formData.id ? { 
          ...formData, 
          price: Number(formData.price),
          date: new Date(formData.date).toLocaleDateString('en-US')
        } : item
      ));
    } else {
      const newItem = {
        id: items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1,
        ...formData,
        price: Number(formData.price),
        date: new Date(formData.date).toLocaleDateString('en-US')
      };
      setItems([newItem, ...items]);
    }
    
    setFormData({
      id: null,
      item: '',
      category: '',
      supplier: '',
      store: '',
      quantity: 1,
      price: 0,
      date: new Date().toISOString().split('T')[0],
      description: ''
    });
    setIsEditing(false);
    setSelectedFile(null);
  };

  const handleEdit = (id) => {
    const itemToEdit = items.find(item => item.id === id);
    if (itemToEdit) {
      setFormData({
        ...itemToEdit,
        date: new Date(itemToEdit.date).toISOString().split('T')[0]
      });
      setIsEditing(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handleCancelEdit = () => {
    setFormData({
      id: null,
      item: '',
      category: '',
      supplier: '',
      store: '',
      quantity: 1,
      price: 0,
      date: new Date().toISOString().split('T')[0],
      description: ''
    });
    setIsEditing(false);
  };

  const filteredItems = items.filter(item =>
    item.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.store.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportToCSV = () => {
    const headers = ["Item", "Category", "Supplier", "Store", "Quantity", "Price ($)", "Date", "Description"];
    const data = filteredItems.map(item => [
      item.item,
      item.category,
      item.supplier,
      item.store,
      item.quantity,
      item.price.toFixed(2),
      item.date,
      item.description
    ]);

    const csvContent = [headers.join(","), ...data.map(row => row.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "inventory.csv");
    link.click();
  };

  // Fixed Excel export
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredItems.map(item => ({
        "Item": item.item,
        "Category": item.category,
        "Supplier": item.supplier,
        "Store": item.store,
        "Quantity": item.quantity,
        "Price ($)": item.price,
        "Date": item.date,
        "Description": item.description
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory");
    XLSX.writeFile(workbook, "inventory.xlsx");
  };

  // Fixed PDF export
  const exportToPDF = () => {
    try {
      // Create new jsPDF instance
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(16);
      doc.text("Inventory Report", 14, 15);
  
      // Using the plugin directly
      autoTable(doc, {
        head: [['Item', 'Category', 'Supplier', 'Store', 'Quantity', 'Price', 'Date']],
        body: filteredItems.map(item => [
          item.item,
          item.category,
          item.supplier,
          item.store,
          item.quantity.toString(),
          `$${item.price.toFixed(2)}`,
          item.date
        ]),
        startY: 20,
        styles: {
          fontSize: 8,
          cellPadding: 2
        },
        headStyles: {
          fillColor: [41, 128, 185],
          textColor: 255,
          fontStyle: 'bold'
        }
      });
  
      doc.save("inventory.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please check console for details.");
    }
  };

  // Fixed Print functionality
  const printTable = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Inventory List</title>');
    printWindow.document.write('<style>');
    printWindow.document.write(`
      body { font-family: Arial; margin: 20px; }
      table { border-collapse: collapse; width: 100%; margin-top: 20px; }
      th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
      th { background-color: #f2f2f2; font-weight: bold; }
      tr:nth-child(even) { background-color: #f9f9f9; }
      .print-title { margin-bottom: 20px; font-size: 24px; text-align: center; }
      .negative-qty { background-color: #ffebee; }
    `);
    printWindow.document.write('</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write('<div class="print-title">Inventory List</div>');
    printWindow.document.write('<table>');
    
    // Table headers
    printWindow.document.write('<thead><tr>');
    const headers = ['Item', 'Category', 'Unit', 'Quantity', 'Description'];
    headers.forEach(header => {
      printWindow.document.write(`<th>${header}</th>`);
    });
    printWindow.document.write('</tr></thead>');
    
    // Table body
    printWindow.document.write('<tbody>');
    filteredItems.forEach(item => {
      // Add class for negative quantities
      const rowClass = item.quantity < 0 ? 'class="negative-qty"' : '';
      printWindow.document.write(`<tr ${rowClass}>`);
      printWindow.document.write(`<td>${item.item}</td>`);
      printWindow.document.write(`<td>${item.category}</td>`);
      printWindow.document.write(`<td>${item.unit}</td>`);
      printWindow.document.write(`<td>${item.quantity}</td>`);
      printWindow.document.write(`<td>${item.description || '-'}</td>`);
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
    <div className="flex flex-col md:flex-row gap-4 p-4" style={{width:'1080px', position:'relative', right:"30px"}}>
      {/* Add Item Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8" style={{width:'350px'}}>
        <h2 className="text-xl font-semibold mb-4">Add Item Stock</h2>
        <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Item Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Item *</label>
              <input
                type="text"
                name="item"
                value={formData.item}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
              <select
                name="supplier"
                value={formData.supplier}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select</option>
                {suppliers.map(supplier => (
                  <option key={supplier} value={supplier}>{supplier}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Store</label>
              <select
                name="store"
                value={formData.store}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select</option>
                {stores.map(store => (
                  <option key={store} value={store}>{store}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => handleQuantityChange(-1)}
                  className="px-3 py-1 bg-gray-200 rounded-l-md"
                >
                  -
                </button>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  min="1"
                  className="w-16 text-center p-1 border-t border-b border-gray-300"
                />
                <button
                  type="button"
                  onClick={() => handleQuantityChange(1)}
                  className="px-3 py-1 bg-gray-200 rounded-r-md"
                >
                  +
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Price ($) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                step="0.01"
                min="0"
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Attach Document</label>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  {selectedFile ? (
                    <p>{selectedFile.name}</p>
                  ) : (
                    <p>Drag and drop a file here or click</p>
                  )}
                </label>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              className="w-full p-2 border border-gray-300 rounded-md"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-black px-4 py-2 rounded-md hover:bg-blue-700 w-full mt-4"
          >
            Add Item
          </button>
        </form>
      </div>

      {/* Inventory List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Item Stock List</h2>
        <div className="flex justify-between items-center mb-4">
          <div className="mb-4" style={{width:'200px', margin:'20px'}}> 
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={exportToCSV}
              className="bg-green-600 text-black px-3 py-1 rounded text-sm hover:bg-green-700"
            >
              CSV
            </button>
            <button 
              onClick={exportToExcel}
              className="bg-green-700 text-black px-3 py-1 rounded text-sm hover:bg-green-800"
            >
              Excel
            </button>
            <button 
              onClick={exportToPDF}
              className="bg-red-600 text-black px-3 py-1 rounded text-sm hover:bg-red-700"
            >
              PDF
            </button>
            <button 
              onClick={printTable}
              className="bg-blue-600 text-black px-3 py-1 rounded text-sm hover:bg-blue-700"
            >
              Print
            </button>
          </div>
        </div>

        <div className="overflow-x-auto" style={{width:'580px'}} ref={componentRef}>
          <table className="min-w-full divide-y divide-gray-200" >
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Store</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price ($)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{item.item}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.supplier}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.store}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${item.price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button 
                      onClick={() => handleEdit(item.id)}
                      className="text-blue-600 hover:text-blue-800 mr-2"
                    >
                    <Pencil size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                    <Trash2 size={16} />
                    </button>
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