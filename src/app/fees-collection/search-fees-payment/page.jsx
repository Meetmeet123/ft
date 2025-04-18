"use client";
import React, { useState } from "react";
import { Search, Database, Download, Copy, Printer } from "lucide-react";

function FeesPayment() {
  const [paymentId, setPaymentId] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const heading=[
    "Payment ID",
    "Date",
    "Name",
    "Class",
    "Fees Group",
    "Fee Type",
    "Mode",
    "Paid",
    "Discount",
    "Fine",
    "Action"
  ];

  const handleExportExcel = () => {
  
    const headers = heading;
    let table = '<table><tr>';
  
    // Add table headers
    headers.forEach(header => {
      table += `<th>${header}</th>`;
    });
    table += '</tr>';
  
    // Add table rows
    heading.forEach(row => {
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
    a.download = 'FeesPayment.xls'; // .xls works fine with this method
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };  

  const handlePrint = () => {
  
    const headers = heading;
    let table = '<table border="1" style="border-collapse: collapse; width: 100%"><thead><tr>';
  
    // Headers
    headers.forEach(header => {
      table += `<th style="padding: 8px; text-align: left;">${header}</th>`;
    });
    table += '</tr></thead><tbody>';
  
    // Rows
    heading.forEach(row => {
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
          <title>Print Payment Requests</title>
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
    const jsonText = JSON.stringify(heading, null, 2);
  
    navigator.clipboard.writeText(jsonText)
      .then(() => {
        alert('JSON data copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy JSON: ', err);
      });
  };

  return (
    <div className="p-2 md:p-4">
      <div className="w-full flex bg-blue-100 h-10 mt-4 border-b p-3 items-center">
        <h2 className="text-xl">Search Fees Payment</h2>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 md:items-center gap-4 m-4 md:m-7">
        <label className="w-1/4 text-sm md:text-base">Payment Id</label>
        <input
          value={paymentId}
          type="text"
          required
          className="rounded lg:w-full border px-2 py-1 text-sm"
          onChange={(e) => setPaymentId(e.target.value)}
        />
        <button
          type="submit"
          onClick={() => {
            if (paymentId === "") {
              setShowDetails(false);
              alert("Give Payment ID");
            } else {
              setShowDetails(true);
              setPaymentId('');
            }
          }}
          className="btn w-1/4 btn-primary flex items-center gap-1 text-sm"
        >
          <Search className="w-4 h-4" /> Search
        </button>
      </div>

      {showDetails && (
        <div>
          <div className="border p-4 bg-blue-100">
            <h2 className="text-xl">Payment ID Detail</h2>
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-2 items-start justify-between gap-4 px-2 md:px-4 py-2">
            <div className="w-full">
              <input
                type="text"
                className="w-full md:w-1/2 focus:outline-none border-b border-gray-400 bg-transparent px-2 py-1 text-sm"
                placeholder="Search..."
              />
            </div>
            <div className="flex flex-wrap gap-2 justify-end">
              <button 
              onClick={handleExportExcel}
              className="btn btn-sm">
                <Database className="w-4 h-4" />
              </button>
              <button className="btn btn-sm">
                <Download onClick={handleExportExcel} className="w-4 h-4" />
              </button>
              <button 
              onClick={handleCopy}
              className="btn btn-sm">
                <Copy className="w-4 h-4" />
              </button>
              <button 
               onClick={handlePrint}
              className="btn btn-sm">
                <Printer className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="flex min-w-[800px] justify-between px-4 py-2 bg-gray-100 font-semibold text-sm">
              {heading.map((data, key) => (
                <div key={key} className="flex-1 min-w-[100px]">
                  {data}
                </div>
              ))}
            </div>
          </div>

          <div className="w-full flex justify-center items-center h-10 bg-red-100 mt-10 border border-red-600">
            <h3 className="text-red-500 text-sm">No Records Found</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default FeesPayment;
