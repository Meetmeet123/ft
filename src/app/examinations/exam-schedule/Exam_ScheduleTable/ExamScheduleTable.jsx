import React, { useRef, useState } from "react";
import { Table } from "antd";
import {
  CopyOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  FileTextOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "antd/dist/reset.css";

const ExamScheduleTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const tableRef = useRef(null);
  const tableData = [
    {
      key: "1",
      subject: "English (210)",
      date: "03/05/2025",
      time: "12:30:30",
      duration: 1,
      room: 12,
      maxMarks: 100,
      minMarks: 35,
    },
    {
      key: "2",
      subject: "Hindi (230)",
      date: "03/08/2025",
      time: "12:30:30",
      duration: 1,
      room: 11,
      maxMarks: 100,
      minMarks: 35,
    },
    {
      key: "3",
      subject: "Mathematics (110)",
      date: "03/10/2025",
      time: "12:30:30",
      duration: 1,
      room: 12,
      maxMarks: 100,
      minMarks: 35,
    },
    {
      key: "4",
      subject: "Science (111)",
      date: "03/12/2025",
      time: "12:30:30",
      duration: 1,
      room: 11,
      maxMarks: 100,
      minMarks: 35,
    },
  ];

  const columns = [
    { title: "Subject", dataIndex: "subject", key: "subject" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Start Time", dataIndex: "time", key: "time" },
    { title: "Duration", dataIndex: "duration", key: "duration" },
    { title: "Room No.", dataIndex: "room", key: "room" },
    { title: "Max Marks", dataIndex: "maxMarks", key: "maxMarks" },
    { title: "Min Marks", dataIndex: "minMarks", key: "minMarks" },
  ];

  const handleCopy = () => {
    const text = filteredData
      .map((row) => Object.values(row).join("\t"))
      .join("\n");
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const handleExportCSV = () => {
    const csvContent = [
      [
        "Subject",
        "Date",
        "Time",
        "Duration",
        "Room No.",
        "Max Marks",
        "Min Marks",
      ],
      ...filteredData.map((row) => Object.values(row)),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "exam_schedule.csv";
    link.click();
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Exam Schedule");
    XLSX.writeFile(workbook, "exam_schedule.xlsx");
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [
        [
          "Subject",
          "Date",
          "Time",
          "Duration",
          "Room No.",
          "Max Marks",
          "Min Marks",
        ],
      ],
      body: filteredData.map((row) => Object.values(row)),
    });
    doc.save("exam_schedule.pdf");
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(
      "<html><head><title>Exam Schedule</title></head><body style='background-color:#f4f4f4;'>"
    );
    printWindow.document.write(
      `<table border="1" style="width: 100%; border-collapse: collapse;">`
    );
    printWindow.document.write(
      `<tr>${columns.map((col) => `<th>${col.title}</th>`).join("")}</tr>`
    );
    tableData.forEach((row) => {
      printWindow.document.write(
        `<tr>${columns
          .map((col) => `<td>${row[col.dataIndex]}</td>`)
          .join("")}</tr>`
      );
    });
    printWindow.document.write("</table>");
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  const filteredData = tableData.filter((row) =>
    row.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full p-4 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border border-gray-300 rounded focus:ring focus:ring-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-2 mb-4 mt-4">
        <button
          style={{ fontSize: "24px" }}
          className="text-gray-600 hover:text-gray-800"
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

export default ExamScheduleTable;
