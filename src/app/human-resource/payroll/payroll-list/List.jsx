"use client";
import React, { useRef, useState } from "react";
import { Table } from "antd";
import {
  FileExcelOutlined,
  FileTextOutlined,
  FilePdfOutlined,
  PrinterOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Static staff data
const staffData = [
  {
    key: "1",
    id: "9002",
    name: "Shivam Verma",
    role: "Teacher",
    department: "Academic",
    designation: "Faculty",
    phone: "9552654564",
    status: "Paid",
    payslipId: "243",
  },
  {
    key: "2",
    id: "90006",
    name: "Jason Sharlton",
    role: "Teacher",
    department: "Academic",
    designation: "Faculty",
    phone: "46546654564",
    status: "Paid",
    payslipId: "246",
  },
  {
    key: "3",
    id: "54545454",
    name: "Albert Thomas",
    role: "Teacher",
    department: "Maths",
    designation: "Faculty",
    phone: "9522369875",
    status: "Not Generated",
    payslipId: null,
  },
];

const StaffTable = () => {
  const [search, setSearch] = useState("");
  const tableRef = useRef(null);

  // Filtered data based on search
  const filteredData = staffData.filter((staff) =>
    staff.name.toLowerCase().includes(search.toLowerCase())
  );

  // Table columns
  const columns = [
    { title: "Staff ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Role", dataIndex: "role", key: "role" },
    { title: "Department", dataIndex: "department", key: "department" },
    { title: "Designation", dataIndex: "designation", key: "designation" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          className={`px-2 py-1 rounded-md text-white ${
            status === "Paid" ? "bg-green-500" : "bg-gray-400"
          }`}
        >
          {status}
        </span>
      ),
    },
  ];

  // Copy to clipboard
  const handleCopy = () => {
    const text = staffData
      .map((row) => Object.values(row).join("\t"))
      .join("\n");
    navigator.clipboard.writeText(text);
    alert("Table data copied to clipboard!");
  };

  // Print the table
  const handlePrint = () => {
    const printWindow = window.open("", "", "width=900,height=650");
    if (printWindow) {
      printWindow.document.write(`
      <html>
        <head>
          <title>Staff Data</title>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          <h2>Staff Data</h2>
          ${tableRef.current.innerHTML}
        </body>
      </html>
    `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  // Export to Excel
  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(staffData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Staff Data");
    XLSX.writeFile(wb, "StaffData.xlsx");
  };

  // Export to CSV
  const handleExportCSV = () => {
    const csvContent = [
      Object.keys(staffData[0]).join(","), // headers
      ...staffData.map((row) => Object.values(row).join(",")), // data rows
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "StaffData.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export to PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [columns.map((col) => col.title)], // Table headers
      body: staffData.map((row) => columns.map((col) => row[col.dataIndex])), // Table data
      startY: 20,
    });

    doc.text("Staff Data", 14, 10); // Add title
    doc.save("StaffData.pdf");
  };

  return (
    <div className="bg-white shadow-md rounded-lg mt-5 p-6">
      {/* Search Input */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Staff List</h3>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mb-4">
        <button
          style={{ fontSize: "24px" }}
          className="text-blue-600 hover:text-blue-800"
          onClick={handleCopy}
        >
          <CopyOutlined />
        </button>
        <button
          style={{ fontSize: "24px" }}
          className="text-green-600 hover:text-green-800"
          onClick={handleExportExcel}
        >
          <FileExcelOutlined />
        </button>
        <button
          style={{ fontSize: "24px" }}
          className="text-gray-600 hover:text-gray-800"
          onClick={handleExportCSV}
        >
          <FileTextOutlined />
        </button>
        <button
          style={{ fontSize: "24px" }}
          className="text-red-600 hover:text-red-800"
          onClick={handleExportPDF}
        >
          <FilePdfOutlined />
        </button>
        <button
          style={{ fontSize: "24px" }}
          className="text-gray-600 hover:text-gray-800"
          onClick={handlePrint}
        >
          <PrinterOutlined />
        </button>
      </div>

      {/* Table */}
      <div ref={tableRef}>
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </div>
  );
};

export default StaffTable;
