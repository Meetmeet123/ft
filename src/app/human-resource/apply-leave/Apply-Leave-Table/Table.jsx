"use client";
import { Table } from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  PrinterOutlined,
  FileTextOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { useRef, useState } from "react";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const LeaveRecords = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const [data, setData] = useState([
    {
      key: "1",
      staff: "Jason Sharlton (90006)",
      role: "Manager",
      leaveType: "Casual Leave",
      leaveFrom: "03/25/2025",
      leaveTo: "03/28/2025",
      days: "4",
      applyDate: "03/25/2025",
      status: "Pending",
    },
    {
      key: "2",
      staff: "William Abbot (9003)",
      role: "Senior Engineer",
      leaveType: "Casual Leave",
      leaveFrom: "03/21/2025",
      leaveTo: "03/22/2025",
      days: "2",
      applyDate: "03/20/2025",
      status: "Approved",
    },
    {
      key: "3",
      staff: "Joe Black (9000)",
      role: "Junior Developer",
      leaveType: "Medical Leave",
      leaveFrom: "03/10/2025",
      leaveTo: "03/15/2025",
      days: "6",
      applyDate: "03/10/2025",
      status: "Approved",
    },
  ]);

  const handleView = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  const handleDelete = (key) => {
    setData(data.filter((item) => item.key !== key));
  };

  const filteredData = data.filter(
    (item) =>
      item.staff.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.leaveType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      title: "Staff",
      dataIndex: "staff",
      key: "staff",
      //   sorter: (a, b) => a.staff.localeCompare(b.staff),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      //   sorter: (a, b) => a.role.localeCompare(b.role),
    },
    {
      title: "Leave Type",
      dataIndex: "leaveType",
      key: "leaveType",
      //   sorter: (a, b) => a.leaveType.localeCompare(b.leaveType),
    },
    {
      title: "Leave From",
      dataIndex: "leaveFrom",
      key: "leaveFrom",
      //   sorter: (a, b) => new Date(a.leaveFrom) - new Date(b.leaveFrom),
    },
    {
      title: "Leave To",
      dataIndex: "leaveTo",
      key: "leaveTo",
      //   sorter: (a, b) => new Date(a.leaveTo) - new Date(b.leaveTo),
    },
    {
      title: "Days",
      dataIndex: "days",
      key: "days",
      //   sorter: (a, b) => a.days - b.days,
    },
    {
      title: "Apply Date",
      dataIndex: "applyDate",
      key: "applyDate",
      //   sorter: (a, b) => new Date(a.applyDate) - new Date(b.applyDate),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => <span>{text}</span>,
      //   sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            type="button"
            onClick={() => handleView(record)}
            style={{ color: "blue" }}
            className=" hover:text-teal-800"
          >
            <EyeOutlined />
          </button>
          <button
            className=" hover:text-teal-800"
            type="button"
            style={{ color: "red" }}
            onClick={() => handleDelete(record.key)}
          >
            <DeleteOutlined />
          </button>
        </div>
      ),
    },
  ];

  const tableRef = useRef(null);
  const handleCopy = () => {
    const text = [
      columns.map((col) => col.title).join("\t"),
      ...filteredData.map((row) =>
        columns.map((col) => row[col.dataIndex]).join("\t")
      ),
    ].join("\n");
    navigator.clipboard.writeText(text);
    alert("Table data copied to clipboard!");
  };

  const handlePrint = () => {
    const printWindow = window.open("", "", "width=900,height=650");
    if (printWindow) {
      const headers = columns
        .filter((col) => col.key !== "actions") // Exclude actions column
        .map((col) => `<th>${col.title}</th>`)
        .join("");

      const rows = filteredData
        .map(
          (row) =>
            `<tr>${columns
              .filter((col) => col.key !== "actions")
              .map((col) => `<td>${row[col.dataIndex]}</td>`)
              .join("")}</tr>`
        )
        .join("");

      printWindow.document.write(`
      <html>
        <head>
          <title>Leave Records</title>
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
          <h2>Leave Records</h2>
          <table>
            <thead>
              <tr>${headers}</tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </body>
      </html>
    `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Leave Records");
    XLSX.writeFile(wb, "LeaveRecords.xlsx");
  };

  const handleExportCSV = () => {
    const csvContent = [
      columns.map((col) => col.title).join(","),
      ...filteredData.map((row) =>
        columns.map((col) => row[col.dataIndex]).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "LeaveRecords.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [columns.map((col) => col.title)],
      body: filteredData.map((row) => columns.map((col) => row[col.dataIndex])),
      startY: 20,
    });
    doc.text("Leave Records", 14, 10);
    doc.save("LeaveRecords.pdf");
  };

  return (
    <div className="p-4 bg-white mt-5 shadow-md rounded-lg">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <div style={{ position: "relative", width: "260px" }}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
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
      </div>

      <div ref={tableRef}>
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{
            pageSize: 10,
            simple: true,
            showSizeChanger: false,
            current: 1,
          }}
          style={{ backgroundColor: "white", borderRadius: "4px" }}
        />
      </div>
      {isModalOpen && selectedRecord && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Leave Details</h2>
            <p>
              <strong>Name:</strong> {selectedRecord.staff}
            </p>
            <p>
              <strong>Role:</strong> {selectedRecord.role}
            </p>
            <p>
              <strong>Leave Type:</strong> {selectedRecord.leaveType}
            </p>
            <p>
              <strong>Leave:</strong> {selectedRecord.leaveFrom} -{" "}
              {selectedRecord.leaveTo} ({selectedRecord.days} Days)
            </p>
            <p>
              <strong>Apply Date:</strong> {selectedRecord.applyDate}
            </p>
            <p>
              <strong>Status:</strong> {selectedRecord.status}
            </p>
            <button
              onClick={handleClose}
              style={{ backgroundColor: "#164f63" }}
              className="mt-4 px-4 py-2  text-white rounded hover:bg-teal-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveRecords;
