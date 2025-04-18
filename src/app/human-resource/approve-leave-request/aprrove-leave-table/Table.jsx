"use client";
import React, { useRef, useState } from "react";
import { Table } from "antd";
import {
  SearchOutlined,
  FileTextOutlined,
  FilePdfOutlined,
  PrinterOutlined,
  EyeOutlined,
  DeleteOutlined,
  CopyOutlined,
  FileExcelOutlined,
} from "@ant-design/icons";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const LeaveManagementTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [leaveData, setLeaveData] = useState([
    {
      id: "140",
      staff: "Jason Sharlton (90006)",
      role: "Manager",
      leaveType: "Casual Leave",
      leaveFrom: "03/25/2025",
      leaveTo: "03/28/2025",
      days: 4,
      applyDate: "03/25/2025",
      reason: "Family Emergency",
      note: "Urgent leave required",
      document: "",
      status: "Pending",
      submittedBy: "Jason Sharlton (90006)",
      staffId: "90006",
    },
    {
      id: "139",
      staff: "William Abbot (9003)",
      role: "Senior Engineer",
      leaveType: "Casual Leave",
      leaveFrom: "03/21/2025",
      leaveTo: "03/22/2025",
      days: 2,
      applyDate: "03/20/2025",
      reason: "Personal",
      note: "",
      document: "",
      status: "Approved",
      submittedBy: "William Abbot (9003)",
      staffId: "9003",
    },
    {
      id: "138",
      staff: "Joe Black (9000)",
      role: "Junior Developer",
      leaveType: "Medical Leave",
      leaveFrom: "03/10/2025",
      leaveTo: "03/15/2025",
      days: 6,
      applyDate: "03/10/2025",
      reason: "Medical Treatment",
      note: "Doctor recommendation attached",
      document: "",
      status: "Approved",
      submittedBy: "Joe Black (9000)",
      staffId: "9000",
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);

  const handleDelete = (id) => {
    setLeaveData(leaveData.filter((item) => item.id !== id));
  };

  const handleView = (record) => {
    setSelectedLeave(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedLeave((prev) => ({ ...prev, [name]: value }));
  };

  const filteredData = leaveData.filter((item) =>
    item.staff.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { title: "Staff", dataIndex: "staff", key: "staff" },
    { title: "Role", dataIndex: "role", key: "role" },
    { title: "Leave Type", dataIndex: "leaveType", key: "leaveType" },
    { title: "Leave From", dataIndex: "leaveFrom", key: "leaveFrom" },
    { title: "Leave To", dataIndex: "leaveTo", key: "leaveTo" },
    { title: "Days", dataIndex: "days", key: "days" },
    { title: "Apply Date", dataIndex: "applyDate", key: "applyDate" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-2">
          <button
            className="p-2 bg-gray-200 rounded hover:bg-gray-300"
            title="View"
            onClick={() => handleView(record)}
          >
            <EyeOutlined />
          </button>
          <button
            className="p-2 bg-red-200 rounded hover:bg-red-300 text-red-600"
            title="Delete"
            onClick={() => handleDelete(record.id)}
          >
            <DeleteOutlined />
          </button>
        </div>
      ),
    },
  ];

  const tableRef = useRef(null);

  const handleCopy = () => {
    const text = leaveData
      .map((row) => Object.values(row).join("\t"))
      .join("\n");
    navigator.clipboard.writeText(text);
    alert("Table data copied to clipboard!");
  };

  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(leaveData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Leave Data");
    XLSX.writeFile(wb, "LeaveData.xlsx");
  };

  const handleExportCSV = () => {
    const csvContent = [
      Object.keys(leaveData[0]).join(","),
      ...leaveData.map((row) => Object.values(row).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "LeaveData.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [
        [
          "Staff",
          "Role",
          "Leave Type",
          "Leave From",
          "Leave To",
          "Days",
          "Apply Date",
          "Status",
        ],
      ],
      body: leaveData.map((row) => [
        row.staff,
        row.role,
        row.leaveType,
        row.leaveFrom,
        row.leaveTo,
        row.days,
        row.applyDate,
        row.status,
      ]),
      startY: 20,
    });

    doc.text("Leave Data", 14, 10);
    doc.save("LeaveData.pdf");
  };

  const handlePrint = () => {
    const printWindow = window.open("", "", "width=900,height=650");
    if (printWindow) {
      const printableData = leaveData
        .map(
          ({
            id,
            staff,
            role,
            leaveType,
            leaveFrom,
            leaveTo,
            days,
            applyDate,
            reason,
            note,
            status,
            submittedBy,
          }) =>
            `<tr>
          <td>${id}</td>
          <td>${staff}</td>
          <td>${role}</td>
          <td>${leaveType}</td>
          <td>${leaveFrom}</td>
          <td>${leaveTo}</td>
          <td>${days}</td>
          <td>${applyDate}</td>
          <td>${reason}</td>
          <td>${note}</td>
          <td>${status}</td>
          <td>${submittedBy}</td>
        </tr>`
        )
        .join("");

      printWindow.document.write(`
        <html>
          <head>
            <title>Leave Data</title>
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
            <h2>Leave Data</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Staff</th>
                  <th>Role</th>
                  <th>Leave Type</th>
                  <th>Leave From</th>
                  <th>Leave To</th>
                  <th>Days</th>
                  <th>Apply Date</th>
                  <th>Reason</th>
                  <th>Note</th>
                  <th>Status</th>
                  <th>Submitted By</th>
                </tr>
              </thead>
              <tbody>
                ${printableData}
              </tbody>
            </table>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="p-4 border-b mt-5 bg-white shadow-md rounded-lg">
      <div className=" p-4 ">
        <div className="p-4 flex flex-col md:flex-row justify-between items-center border-b">
          <div className="relative">
            <input
              type="search"
              placeholder="Search..."
              className="px-4 py-2 border rounded-md w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchOutlined className="absolute right-3 top-2.5 text-gray-400" />
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
          {" "}
          <Table
            columns={columns}
            dataSource={filteredData}
            rowKey="id"
            pagination={{ pageSize: 5 }}
          />
        </div>
      </div>

      {isModalVisible && selectedLeave && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-1/2 relative">
            <h2 className="text-lg font-semibold mb-4">Leave Details</h2>

            <div className="grid gap-2">
              <label>
                Name:{" "}
                <input
                  type="text"
                  name="staff"
                  value={selectedLeave.staff}
                  readOnly
                  className="border p-2 w-full"
                />
              </label>
              <label>
                Staff ID:{" "}
                <input
                  type="number"
                  name="staffId"
                  value={selectedLeave.staffId}
                  readOnly
                  className="border p-2 w-full"
                />
              </label>
              <label>
                Submitted By:{" "}
                <input
                  type="text"
                  name="submittedBy"
                  value={selectedLeave.submittedBy}
                  readOnly
                  className="border p-2 w-full"
                />
              </label>
              <label>
                Leave Type:{" "}
                <input
                  type="text"
                  name="leaveType"
                  value={selectedLeave.leaveType}
                  readOnly
                  className="border p-2 w-full"
                />
              </label>
              <label>
                Leave:{" "}
                <input
                  type="text"
                  value={`${selectedLeave.leaveFrom} - ${selectedLeave.leaveTo} (${selectedLeave.days} Days)`}
                  readOnly
                  className="border p-2 w-full"
                />
              </label>
              <label>
                Apply Date:{" "}
                <input
                  type="date"
                  name="applyDate"
                  value={selectedLeave.applyDate}
                  readOnly
                  className="border p-2 w-full"
                />
              </label>
              <label>
                Status:
                <div>
                  <input
                    type="radio"
                    name="status"
                    value="Pending"
                    checked={selectedLeave.status === "Pending"}
                    onChange={handleChange}
                  />{" "}
                  Pending
                  <input
                    type="radio"
                    name="status"
                    value="Approved"
                    checked={selectedLeave.status === "Approved"}
                    onChange={handleChange}
                  />{" "}
                  Approved
                  <input
                    type="radio"
                    name="status"
                    value="Disapproved"
                    checked={selectedLeave.status === "Disapproved"}
                    onChange={handleChange}
                  />{" "}
                  Disapproved
                </div>
              </label>
              <label>
                Reason:{" "}
                <input
                  type="text"
                  name="reason"
                  value={selectedLeave.reason}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
              </label>
              <label>
                Note:{" "}
                <textarea
                  name="note"
                  className="border p-2 w-full"
                  rows="2"
                  value={selectedLeave.note}
                  onChange={handleChange}
                ></textarea>
              </label>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                style={{ backgroundColor: "red" }}
                className="px-4 py-2  rounded text-white"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                style={{ backgroundColor: "#164f63" }}
                className="px-4 py-2  text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveManagementTable;
