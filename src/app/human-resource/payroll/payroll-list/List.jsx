"use client";
import React, { useEffect, useRef, useState } from "react";
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
import { getPayrollDetails } from "../PayrollDetails";

const StaffTable = () => {
  const [search, setSearch] = useState("");
  const tableRef = useRef(null);
  const [payrollData, setPayrollData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayrollData = async () => {
      try {
        setLoading(true);
        const res = await getPayrollDetails();
        console.log(res.data);
        
        // Transform the backend data to match your table structure
        const transformedData = res.data?.payroll_status?.map((staff, index) => ({
          key: (index + 1).toString(),
          id: staff.staff_id || "N/A",
          name: staff.name || "N/A",
          role: "Teacher", // Default role - adjust based on your backend data
          department: "Academic", // Default department - adjust based on your backend data
          designation: "Faculty", // Default designation - adjust based on your backend data
          phone: "N/A", // Phone not available in current data structure
          status: staff.basic > 0 ? "Paid" : "Not Generated",
          payslipId: staff.basic > 0 ? `PSL${staff.staff_id}` : null,
          month: staff.month || res.data?.month || "April",
          year: staff.year || res.data?.year || "2025",
          basic: staff.basic || 0,
          present: staff.present || 0,
          absent: staff.absent || 0,
          late: staff.late || 0,
          half_day: staff.half_day || 0,
          holiday: staff.holiday || 0,
          leave_count: staff.leave_count || 0,
          alloted_leave: staff.alloted_leave || 0,
        })) || [];
        
        setPayrollData(transformedData);
      } catch (err) {
        console.log(err);
        setPayrollData([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };
    fetchPayrollData();
  }, []);

  // Filtered data based on search
  const filteredData = payrollData.filter((staff) =>
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
    {
      title: "Basic Salary",
      dataIndex: "basic",
      key: "basic",
      render: (basic) => `$${basic || 0}`,
    },
    {
      title: "Present Days",
      dataIndex: "present",
      key: "present",
    },
  ];

  // Copy to clipboard
  const handleCopy = () => {
    if (payrollData.length === 0) {
      alert("No data to copy!");
      return;
    }
    const text = payrollData
      .map((row) => Object.values(row).join("\t"))
      .join("\n");
    navigator.clipboard.writeText(text);
    alert("Table data copied to clipboard!");
  };

  // Print the table
  const handlePrint = () => {
    if (payrollData.length === 0) {
      alert("No data to print!");
      return;
    }
    const printWindow = window.open("", "", "width=900,height=650");
    if (printWindow) {
      printWindow.document.write(`
      <html>
        <head>
          <title>Staff Payroll Data</title>
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
          <h2>Staff Payroll Data</h2>
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
    if (payrollData.length === 0) {
      alert("No data to export!");
      return;
    }
    const ws = XLSX.utils.json_to_sheet(payrollData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Staff Payroll Data");
    XLSX.writeFile(wb, "StaffPayrollData.xlsx");
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (payrollData.length === 0) {
      alert("No data to export!");
      return;
    }
    const csvContent = [
      Object.keys(payrollData[0]).join(","), // headers
      ...payrollData.map((row) => Object.values(row).join(",")), // data rows
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "StaffPayrollData.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export to PDF
  const handleExportPDF = () => {
    if (payrollData.length === 0) {
      alert("No data to export!");
      return;
    }
    const doc = new jsPDF();
    autoTable(doc, {
      head: [columns.map((col) => col.title)], // Table headers
      body: payrollData.map((row) => columns.map((col) => row[col.dataIndex])), // Table data
      startY: 20,
    });

    doc.text("Staff Payroll Data", 14, 10); // Add title
    doc.save("StaffPayrollData.pdf");
  };

  return (
    <div className="bg-white shadow-md rounded-lg mt-5 p-6">
      {/* Search Input */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Staff Payroll List</h3>
        <input
          type="text"
          placeholder="Search by name..."
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
          title="Copy to Clipboard"
        >
          <CopyOutlined />
        </button>
        <button
          style={{ fontSize: "24px" }}
          className="text-green-600 hover:text-green-800"
          onClick={handleExportExcel}
          title="Export to Excel"
        >
          <FileExcelOutlined />
        </button>
        <button
          style={{ fontSize: "24px" }}
          className="text-gray-600 hover:text-gray-800"
          onClick={handleExportCSV}
          title="Export to CSV"
        >
          <FileTextOutlined />
        </button>
        <button
          style={{ fontSize: "24px" }}
          className="text-red-600 hover:text-red-800"
          onClick={handleExportPDF}
          title="Export to PDF"
        >
          <FilePdfOutlined />
        </button>
        <button
          style={{ fontSize: "24px" }}
          className="text-gray-600 hover:text-gray-800"
          onClick={handlePrint}
          title="Print"
        >
          <PrinterOutlined />
        </button>
      </div>

      {/* Loading or Empty State */}
      {loading && (
        <div className="text-center py-4">
          <span>Loading payroll data...</span>
        </div>
      )}

      {/* Table */}
      <div ref={tableRef}>
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 5 }}
          loading={loading}
        />
      </div>

      {!loading && payrollData.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          <span>No payroll data available</span>
        </div>
      )}
      
    </div>
  );
};

export default StaffTable;