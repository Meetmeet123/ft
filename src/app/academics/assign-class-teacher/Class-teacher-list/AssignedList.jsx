"use client";

import { useRef, useState } from "react";
import { Table } from "antd";
import {
  CopyOutlined,
  FileExcelOutlined,
  FileTextOutlined,
  FilePdfOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const initialClasses = [
  { id: "1", name: "Class 1", section: "A", teachers: ["Shivam Verma (9002)"] },
  {
    id: "2",
    name: "Class 2",
    section: "A",
    teachers: ["Jason Sharlton (90006)", "Shivam Verma (9002)"],
  },
  {
    id: "3",
    name: "Class 3",
    section: "A",
    teachers: ["Jason Sharlton (90006)"],
  },
  {
    id: "4",
    name: "Class 4",
    section: "A",
    teachers: ["Jason Sharlton (90006)"],
  },
  { id: "5", name: "Class 5", section: "A", teachers: ["Shivam Verma (9002)"] },
];

const ClassTeacherList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [classes] = useState(initialClasses);
  const tableRef = useRef(null);

  // 🔍 **Apply Search Filtering**
  const filteredClasses = classes.filter(
    (cls) =>
      cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.teachers.some((teacher) =>
        teacher.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  // 📌 Copy Table Data
  const handleCopy = () => {
    const text = filteredClasses
      .map((cls) => `${cls.name}, ${cls.section}, ${cls.teachers.join(", ")}`)
      .join("\n");
    navigator.clipboard.writeText(text);
    alert("Table copied to clipboard!");
  };

  // 📌 Export to CSV
  const handleExportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Class, Section, Class Teacher"]
        .concat(
          filteredClasses.map(
            (cls) => `${cls.name}, ${cls.section}, ${cls.teachers.join(", ")}`
          )
        )
        .join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "class_teacher_list.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 📌 Export to Excel
  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredClasses.map((cls) => ({
        Class: cls.name,
        Section: cls.section,
        "Class Teacher": cls.teachers.join(", "),
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Class Teacher List");
    XLSX.writeFile(workbook, "class_teacher_list.xlsx");
  };

  // 📌 Export to PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Class Teacher List", 20, 10);
    autoTable(doc, {
      head: [["Class", "Section", "Class Teacher"]],
      body: filteredClasses.map((cls) => [
        cls.name,
        cls.section,
        cls.teachers.join(", "),
      ]),
    });
    doc.save("class_teacher_list.pdf");
  };

  // 📌 Print Functionality
  const handlePrint = () => {
    const tableHTML = `
      <html>
        <head>
          <title>Print Class Teacher List</title>
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
          <h2>Class Teacher List</h2>
          <table>
            <thead>
              <tr>
                <th>Class</th>
                <th>Section</th>
                <th>Class Teacher</th>
              </tr>
            </thead>
            <tbody>
              ${filteredClasses
                .map(
                  (cls) => `
                <tr>
                  <td>${cls.name}</td>
                  <td>${cls.section}</td>
                  <td>${cls.teachers.join(", ")}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(tableHTML);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    } else {
      alert("Popup blocked! Please allow popups for printing.");
    }
  };

  const columns = [
    { title: "Class", dataIndex: "name", key: "name" },
    { title: "Section", dataIndex: "section", key: "section" },
    {
      title: "Class Teacher",
      dataIndex: "teachers",
      key: "teachers",
      render: (teachers) => teachers.join(", "),
    },
  ];

  return (
    <div className="mt-1">
      <div className="bg-white shadow-md rounded-lg p-5 border border-gray-300">
        <h3 className="text-lg font-semibold mb-4">Class Teacher List</h3>

        {/* Top Controls */}
        <div className="flex gap-2">
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
        {/* Class List Table */}
        <div ref={tableRef}>
          <Table
            columns={columns}
            dataSource={filteredClasses} // ✅ FIXED SEARCH FILTERING
            pagination={false}
            rowKey="id"
          />
        </div>
      </div>
    </div>
  );
};

export default ClassTeacherList;
