"use client";
import { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Pencil, Trash2 } from 'lucide-react';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
const { utils, writeFile } = XLSX;

import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export default function IssueItemList() {
   const [items, setItems] = useState([
    {
      id: 1,
      item: "Staff Uniform",
      note: "",
      itemCategory: "Staff Dress",
      issueReturn: "04/25/2025-04/30/2025",
      issueTo: "Maria Ford (9005)",
      issuedBy: "Brandon Heart (9006)",
      quantity: 5,
      status: "click to return",
      action: "✗"
    },
    {
      id: 2,
      item: "Projectors",
      note: "",
      itemCategory: "Chemistry Lab Apparatus",
      issueReturn: "04/22/2025-04/28/2025",
      issueTo: "Jason Shariton (90006)",
      issuedBy: "William Abbot (9003)",
      quantity: 2,
      status: "click to return",
      action: "✗"
    },
    {
      id: 3,
      item: "Paper and Pencils",
      note: "",
      itemCategory: "Books Stationery",
      issueReturn: "04/15/2025-04/22/2025",
      issueTo: "Brandon Heart (9006)",
      issuedBy: "James Deckar (9004)",
      quantity: 5,
      status: "click to return",
      action: "✗"
    },
    {
      id: 4,
      item: "Football",
      note: "",
      itemCategory: "Sports",
      issueReturn: "04/10/2025-04/02/2025",
      issueTo: "James Deckar (9004)",
      issuedBy: "Maria Ford (9005)",
      quantity: 2,
      status: "Returned",
      action: "✗"
    },
    {
      id: 5,
      item: "Notebooks",
      note: "",
      itemCategory: "Books Stationery",
      issueReturn: "04/05/2025-04/12/2025",
      issueTo: "Jason Shariton (90006)",
      issuedBy: "Brandon Heart (9006)",
      quantity: 5,
      status: "click to return",
      action: "✗"
    },
    {
      id: 6,
      item: "Cricket Bat",
      note: "",
      itemCategory: "Sports",
      issueReturn: "04/01/2025-04/02/2025",
      issueTo: "Shivam Verma (9002)",
      issuedBy: "Brandon Heart (9006)",
      quantity: 2,
      status: "Returned",
      action: "✗"
    },
    {
      id: 7,
      item: "Projectors",
      note: "",
      itemCategory: "Chemistry Lab Apparatus",
      issueReturn: "03/20/2025-03/26/2025",
      issueTo: "Jason Shariton (90006)",
      issuedBy: "Shivam Verma (9002)",
      quantity: 2,
      status: "click to return",
      action: "✗"
    }
  ]);

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    userType: "",
    issueTo: "",
    issueBy: "",
    issueDate: "",
    returnDate: "",
    note: "",
    itemCategory: "",
    item: "",
    quantity: ""
  });

  // Return confirmation state
  const [showReturnConfirm, setShowReturnConfirm] = useState(false);
  const [itemToReturn, setItemToReturn] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = items.filter((item) =>
    item.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.itemCategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.issueTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.issuedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create new item
    const newItem = {
      id: items.length + 1,
      item: formData.item,
      note: formData.note,
      itemCategory: formData.itemCategory,
      issueReturn: `${formData.issueDate}-${formData.returnDate}`,
      issueTo: formData.issueTo,
      issuedBy: formData.issueBy,
      quantity: parseInt(formData.quantity),
      status: "click to return",
      action: "✗"
    };

    // Add to items list
    setItems([...items, newItem]);
    
    // Reset form and close
    setFormData({
      userType: "",
      issueTo: "",
      issueBy: "",
      issueDate: "",
      returnDate: "",
      note: "",
      itemCategory: "",
      item: "",
      quantity: ""
    });
    setShowForm(false);
  };

  // Handle return confirmation
  const handleReturnConfirm = () => {
    if (itemToReturn) {
      setItems(items.map(item => 
        item.id === itemToReturn.id 
          ? {...item, status: "Returned"} 
          : item
      ));
      setShowReturnConfirm(false);
      setItemToReturn(null);
    }
  };
    // Export to Excel function
    const exportToExcel = () => {
        const worksheet = utils.json_to_sheet(filteredItems);
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, "IssueItems");
        writeFile(workbook, "IssueItems.xlsx");
      };
    
      // Export to CSV function
      const exportToCSV = () => {
        const headers = [
          "Item",
          "Note",
          "Item Category",
          "Issue - Return",
          "Issue To",
          "Issued By",
          "Quantity",
          "Status"
        ];
        
        const csvRows = [];
        csvRows.push(headers.join(','));
        
        filteredItems.forEach(item => {
          const row = [
            `"${item.item}"`,
            `"${item.note}"`,
            `"${item.itemCategory}"`,
            `"${item.issueReturn}"`,
            `"${item.issueTo}"`,
            `"${item.issuedBy}"`,
            item.quantity,
            `"${item.status}"`
          ];
          csvRows.push(row.join(','));
        });
    
        const csvContent = csvRows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', 'IssueItems.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
    
      // Export to PDF function
      const exportToPDF = () => {
        const doc = new jsPDF();
      
        // Add title
        doc.setFontSize(16);
        doc.text("Inventory Report", 14, 15);
      
        // Prepare table data
        const tableData = filteredItems.map(item => [
          item.item,
          item.note,
          item.itemCategory,
          item.issueReturn,
          item.issueTo,
          item.issuedBy,
          item.quantity.toString(),
          item.status
        ]);
      
        // Add table using autoTable
        autoTable(doc, {
          head: [["Item", "Note", "Category", "Issue - Return", "Issue To", "Issued By", "Quantity", "Status"]],
          body: tableData,
          startY: 20,
          styles: { fontSize: 8 },
        });
      
        // Save the PDF
        doc.save("IssueItems_Report.pdf");
      };
      
    
      // Print function
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
        const headers = ["Item", "Note", "Category", "Issue - Return", "Issue To", "Issued By", "Quantity", "Status"];
        headers.forEach(header => {
          printWindow.document.write(`<th>${header}</th>`);
        });
        printWindow.document.write('</tr></thead>');
        
        // Table body
        printWindow.document.write('<tbody>');
        filteredItems.forEach(item => {
          printWindow.document.write('<tr>');
          printWindow.document.write(`<td>${item.item}</td>`);
          printWindow.document.write(`<td>${item.note}</td>`);
          printWindow.document.write(`<td>${item.itemCategory}</td>`);
          printWindow.document.write(`<td>${item.issueReturn}</td>`);
          printWindow.document.write(`<td>${item.issueTo}</td>`);
          printWindow.document.write(`<td>${item.issuedBy}</td>`);
          printWindow.document.write(`<td>${item.quantity}</td>`);
          printWindow.document.write(`<td>${item.status}</td>`);
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

  // Sample options for dropdowns
  const userTypes = ["Admin", "Staff", "Student"];
  const issueToOptions = ["Maria Ford (9005)", "Jason Shariton (90006)", "Brandon Heart (9006)", "James Deckar (9004)", "Shivam Verma (9002)"];
  const issueByOptions = ["Brandon Heart (9006)", "William Abbot (9003)", "James Deckar (9004)", "Maria Ford (9005)", "Shivam Verma (9002)"];
  const itemCategories = ["Staff Dress", "Chemistry Lab Apparatus", "Books Stationery", "Sports"];


  return (
    <div className="p-6 max-w-6xl mx-auto" style={{ width: "108%", position: "relative", right: "40px" }}>
      <style jsx global>{`
         body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        .container {
          max-width: 1200px;
        }
        table {
          border-collapse: collapse;
          width: 100%;
        }
        th, td {
          text-align: left;
          padding: 8px;
          border: 1px solid #ddd;
        }
        th {
          background-color: #f2f2f2;
        }
        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        tr:hover {
          background-color: #f5f5f5;
        }
        .form-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .form-container {
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          width: 500px;
          max-width: 90%;
        }
        .form-row {
          margin-bottom: 15px;
        }
        .form-label {
          display: block;
          margin-bottom: 5px;
          font-weight: 500;
        }
        .form-input {
          width: 100%;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        .required:after {
          content: " *";
          color: red;
        }
        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 20px;
        }
        .btn {
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
        }
        .btn-primary {
          background-color: #007bff;
          color: white;
          border: none;
        }
        .btn-secondary {
          background-color: #6c757d;
          color: white;
          border: none;
        }
        .confirm-modal {
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          width: 400px;
          max-width: 90%;
        }
        .confirm-title {
          font-size: 1.25rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }
        .confirm-content {
          margin-bottom: 1.5rem;
        }
        .confirm-divider {
          border-top: 1px solid #ddd;
          margin: 1rem 0;
        }

        .button-group {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        .export-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 8px 12px;
          border-radius: 4px;
          background-color: #f0f0f0;
          border: 1px solid #ddd;
          cursor: pointer;
          font-size: 14px;
        }
        .export-btn:hover {
          background-color: #e0e0e0;
        }
      `}</style>
  <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Issue Item List</h1>
        <div className="button-group">
          <button 
            onClick={() => setShowForm(true)}
            className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
          >
            +Issue Item
          </button>
          <button className="export-btn" onClick={exportToExcel}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Excel
          </button>
          <button className="export-btn" onClick={exportToCSV}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            CSV
          </button>
          <button className="export-btn" onClick={exportToPDF}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            PDF
          </button>
          <button className="export-btn" onClick={printTable}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 6 2 18 2 18 9"></polyline>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
              <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
            Print
          </button>
        </div>
      </div>


     <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 border rounded w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4">Item</th>
              <th className="py-2 px-4">Note</th>
              <th className="py-2 px-4">Item Category</th>
              <th className="py-2 px-4">Issue - Return</th>
              <th className="py-2 px-4">Issue To</th>
              <th className="py-2 px-4">Issued By</th>
              <th className="py-2 px-4">Quantity</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.id}>
                <td className="py-2 px-4">{item.item}</td>
                <td className="py-2 px-4">{item.note}</td>
                <td className="py-2 px-4">{item.itemCategory}</td>
                <td className="py-2 px-4">{item.issueReturn}</td>
                <td className="py-2 px-4">{item.issueTo}</td>
                <td className="py-2 px-4">{item.issuedBy}</td>
                <td className="py-2 px-4">{item.quantity}</td>
                <td className="py-2 px-4">
                  <button 
                    className={`px-2 py-1 rounded ${
                      item.status === "Returned" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800 hover:bg-red-200"
                    }`}
                    onClick={() => {
                      if (item.status === "click to return") {
                        setItemToReturn(item);
                        setShowReturnConfirm(true);
                      }
                    }}
                  >
                    {item.status}
                  </button>
                </td>
                <td className="py-2 px-4">
                  <button 
                    className="text-red-500 hover:text-red-700"
                    onClick={() => {
                      setItems(items.filter(i => i.id !== item.id));
                    }}
                  >
                    {item.action}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Issue Item Form Modal */}
      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <h2 className="text-xl font-bold mb-4">Issue Item</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="form-row">
                  <label className="form-label required">User Type</label>
                  <select
                    name="userType"
                    value={formData.userType}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  >
                    <option value="">Select</option>
                    {userTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div className="form-row">
                  <label className="form-label required">Issue To</label>
                  <select
                    name="issueTo"
                    value={formData.issueTo}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  >
                    <option value="">Select</option>
                    {issueToOptions.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div className="form-row">
                  <label className="form-label required">Issue By</label>
                  <select
                    name="issueBy"
                    value={formData.issueBy}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  >
                    <option value="">Select</option>
                    {issueByOptions.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="form-row">
                  <label className="form-label required">Issue Date</label>
                  <input
                    type="date"
                    name="issueDate"
                    value={formData.issueDate}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-row">
                  <label className="form-label">Return Date</label>
                  <input
                    type="date"
                    name="returnDate"
                    value={formData.returnDate}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
                <div className="form-row">
                  <label className="form-label">Note</label>
                  <input
                    type="text"
                    name="note"
                    value={formData.note}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="form-row">
                  <label className="form-label required">Item Category</label>
                  <select
                    name="itemCategory"
                    value={formData.itemCategory}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  >
                    <option value="">Select</option>
                    {itemCategories.map((category, index) => (
                      <option key={index} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div className="form-row">
                  <label className="form-label required">Item</label>
                  <input
                    type="text"
                    name="item"
                    value={formData.item}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-row">
                  <label className="form-label required">Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="form-input"
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Return Confirmation Modal */}
      {showReturnConfirm && itemToReturn && (
        <div className="form-overlay">
          <div className="confirm-modal">
            <h2 className="confirm-title">Confirm Return</h2>
            <p className="confirm-content">Are You Sure To Return This Item?</p>
            
            <div className="mb-4">
              <p className="font-semibold">Item</p>
              <p>{itemToReturn.item}</p>
            </div>
            
            <div className="mb-4">
              <p className="font-semibold">Item Category</p>
              <p>{itemToReturn.itemCategory}</p>
            </div>
            
            <div className="mb-6">
              <p className="font-semibold">Quantity</p>
              <p>{itemToReturn.quantity}</p>
            </div>
            
            <div className="confirm-divider"></div>
            
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setShowReturnConfirm(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleReturnConfirm}
                className="btn btn-primary"
              >
                Return
              </button>
            </div>
          </div>
        </div>
      )}
 
    </div>
  );
}