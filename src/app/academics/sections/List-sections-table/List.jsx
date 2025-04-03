"use client";
import { useRef, useState } from "react";
import { Table } from "antd";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  EditOutlined,
  DeleteOutlined,
  CopyOutlined,
  FileExcelOutlined,
  FileTextOutlined,
  FilePdfOutlined,
  PrinterOutlined,
} from "@ant-design/icons";

export default function SectionList() {
  const [sections, setSections] = useState([
    { id: 1, name: "A" },
    { id: 2, name: "B" },
    { id: 3, name: "C" },
    { id: 4, name: "D" },
    { id: 5, name: "E" },
  ]);
  const [searchText, setSearchText] = useState("");
  const [editingSection, setEditingSection] = useState(null);
  const [editedName, setEditedName] = useState("");

  const handleDelete = (id) => {
    setSections(sections.filter((section) => section.id !== id));
  };

  const handleEdit = (section) => {
    setEditingSection(section);
    setEditedName(section.name);
  };

  const handleSave = () => {
    setSections(
      sections.map((section) =>
        section.id === editingSection.id
          ? { ...section, name: editedName }
          : section
      )
    );
    setEditingSection(null);
    setEditedName("");
  };

  const handleCopy = () => {
    const tableText = sections.map((s) => `${s.name}`).join("\n");
    navigator.clipboard.writeText(tableText);
    alert("Table copied to clipboard!");
  };

  const handleExportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Sections"].concat(sections.map((s) => `${s.name}`)).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "sections.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(sections);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "sections");
    XLSX.writeFile(workbook, "sections.xlsx");
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Section List", 20, 10);

    autoTable(doc, {
      head: [["Section"]],
      body: sections.map((s) => [s.name]),
    });

    doc.save("sections.pdf");
  };

  const tableRef = useRef(null);

  const handlePrint = () => {
    // Create a full table for printing (without pagination)
    const tableHTML = `
    <html>
      <head>
        <title>Print sections</title>
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
              <th>Sections</th>
              
            </tr>
          </thead>
          <tbody>
            ${sections
              .map(
                (section) => `
                <tr>
                  <td>${section.name}</td>
                 
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

  const filteredSections = sections.filter((section) =>
    section.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "Section",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex justify-end gap-2">
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={() => handleEdit(record)}
          >
            <EditOutlined />
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => handleDelete(record.id)}
          >
            <DeleteOutlined />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex-1/2 bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Section List</h3>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-1/3 border border-gray-300 rounded px-2 py-1"
        />
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
      </div>
      <div ref={tableRef}>
        {" "}
        <Table
          dataSource={filteredSections}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </div>
      {editingSection && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h4 className="text-lg font-semibold">Edit Section</h4>
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1 mt-2"
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={() => setEditingSection(null)}
              style={{ backgroundColor: "red" }}
              className="text-white px-4 py-2 rounded-md hover:bg-teal-600 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              style={{ backgroundColor: "#164f63" }}
              className="text-white px-4 py-2 rounded-md hover:bg-teal-600 transition"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
