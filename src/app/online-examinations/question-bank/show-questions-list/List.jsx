"use client";
import { useRef, useState } from "react";
import { Table } from "antd";
import {
  SearchOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  CopyOutlined,
  FileExcelOutlined,
  FileTextOutlined,
  FilePdfOutlined,
  PrinterOutlined,
} from "@ant-design/icons";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const initialData = [
  {
    key: "1",
    id: 82,
    subject: "English (210)",
    class: "Class 10",
    section: "A",
    questionType: "Descriptive",
    questionLevel: "High",
    question: "Question test 2",
    createdBy: "Joe Black (9000)",
  },
  {
    key: "2",
    id: 81,
    subject: "Mathematics (110)",
    class: "Class 9",
    section: "B",
    questionType: "Multiple Choice",
    questionLevel: "Medium",
    question: "What is 2+2?",
    createdBy: "Shivam Verma (9002)",
  },
  {
    key: "3",
    id: 80,
    subject: "Science (111)",
    class: "Class 8",
    section: "C",
    questionType: "True/False",
    questionLevel: "Low",
    question: "Water boils at 100°C?",
    createdBy: "Jason Sharlton (90006)",
  },
];

export default function QuestionBank() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [data, setData] = useState(initialData);

  const allKeys = data.map((item) => item.key);

  const handleCopy = () => {
    const tableText = data
      .map(
        (s) =>
          `${s.id},${s.subject},${s.questionType},${s.level},${s.question},${s.createdBy}`
      )
      .join("\n");
    navigator.clipboard.writeText(tableText);
    alert("Table copied to clipboard!");
  };

  const handleExportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Q.ID", "Subject", "questionType", "Level", "Question", "createdBy"]
        .concat(
          data.map(
            (s) =>
              `${s.id},${s.subject},${s.questionType},${s.level},${s.question},${s.createdBy}`
          )
        )
        .join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "data.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "data");
    XLSX.writeFile(workbook, "data.xlsx");
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Section List", 20, 10);

    autoTable(doc, {
      head: [
        ["Q.ID", "Subject", "questionType", "Level", "Question", "createdBy"],
      ],
      body: data.map((s) => [
        s.id,
        s.subject,
        s.questionType,
        s.level,
        s.question,
        s.createdBy,
      ]),
    });

    doc.save("data.pdf");
  };

  const tableRef = useRef(null);

  const handlePrint = () => {
    // Create a full table for printing (without pagination)
    const tableHTML = `
      <html>
        <head>
          <title>Print data</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; margin: 20px; }
            h2 { text-align: center; margin-bottom: 20px; }
            table {
              width: 100%;
              border-collapse: collapse;
              font-size: 16px;
            }
            th, td {
              border: 1px solid black;
              padding: 10px;
              text-align: left;
            }
            th {
              background-color: #f4f4f4;
            }
          </style>
        </head>
        <body>
          <h2>Section List</h2>
          <table>
            <thead>
              <tr>
                <th>Q.id</th>
                 <th>Subject</th> <th>Question Type</th> <th>Level</th> <th>Question</th> <th>CreatedBy</th>
              </tr>
            </thead>
            <tbody>
              ${data
                .map(
                  (section) => `
                  <tr>
                    <td>${section.id}</td>
                   <td>${section.subject}</td><td>${section.questionType}</td><td>${section.level}</td><td>${section.question}</td><td>${section.createdBy}</td>
                  </tr>
                `
                )
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
      `;

    const blob = new Blob([tableHTML], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const printWindow = window.open(url, "_blank");

    printWindow.onload = () => {
      printWindow.print();
      URL.revokeObjectURL(url);
    };
  };

  const handleSelectAll = (e) => {
    setSelectedKeys(e.target.checked ? allKeys : []);
  };

  const handleSelect = (key) => {
    setSelectedKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleDelete = (key) => {
    setData(data.filter((item) => item.key !== key));
  };

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const columns = [
    {
      title: (
        <input
          type="checkbox"
          className="cursor-pointer"
          checked={selectedKeys.length === allKeys.length}
          onChange={handleSelectAll}
        />
      ),
      key: "select",
      render: (_, record) => (
        <input
          type="checkbox"
          className="cursor-pointer"
          checked={selectedKeys.includes(record.key)}
          onChange={() => handleSelect(record.key)}
        />
      ),
    },
    {
      title: "Q. ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Question Type",
      dataIndex: "questionType",
      key: "questionType",
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "Question",
      dataIndex: "question",
      key: "question",
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <button
            style={{ color: "var(--color-blue-500)" }}
            className="px-2 py-1 text-white rounded flex items-center gap-1"
          >
            <EyeOutlined /> View
          </button>
          <button
            style={{ color: "var(--color-green-500)" }}
            className="px-2 py-1 text-white rounded flex items-center gap-1"
          >
            <EditOutlined /> Edit
          </button>
          <button
            style={{ color: "var(--color-red-500)" }}
            className="px-2 py-1 text-white rounded flex items-center gap-1"
            onClick={() => handleDelete(record.key)}
          >
            <DeleteOutlined /> Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <SearchOutlined /> Question Bank
        </h3>
        <input
          type="search"
          className="border rounded px-3 py-1 w-1/3"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
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
        {" "}
        <Table
          dataSource={filteredData}
          columns={columns}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </div>
  );
}
