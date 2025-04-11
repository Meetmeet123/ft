"use client";
import { useRef, useState } from "react";
import { Table } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  CopyOutlined,
  FileExcelOutlined,
  FileTextOutlined,
  FilePdfOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import { ArrowLeft } from "lucide-react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const SubjectList = () => {
  const [subjects, setSubjects] = useState([
    { id: 1, name: "English", code: "210", type: "Theory" },
    { id: 2, name: "Hindi", code: "230", type: "Theory" },
    { id: 3, name: "Mathematics", code: "110", type: "Practical" },
    { id: 4, name: "Science", code: "111", type: "Practical" },
    { id: 5, name: "Social Studies", code: "212", type: "Theory" },
    { id: 6, name: "French", code: "231", type: "Practical" },
    { id: 7, name: "Drawing", code: "200", type: "Practical" },
    { id: 8, name: "Computer", code: "00220", type: "Practical" },
    { id: 9, name: "Elective 1", code: "101", type: "Theory" },
    { id: 10, name: "Elective 2", code: "102", type: "Theory" },
    { id: 11, name: "Elective 3", code: "103", type: "Theory" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [editingSubject, setEditingSubject] = useState(null);

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this subject?")) {
      setSubjects(subjects.filter((subject) => subject.id !== id));
    }
  };

  const handleEdit = (subject) => {
    setEditingSubject(subject);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setSubjects(
      subjects.map((subj) =>
        subj.id === editingSubject.id ? editingSubject : subj
      )
    );
    setEditingSubject(null);
  };

  const handleCopy = () => {
    const tableText = subjects
      .map((s) => `${s.name}, ${s.code}, ${s.type}`)
      .join("\n");
    navigator.clipboard.writeText(tableText);
    alert("Table copied to clipboard!");
  };

  const handleExportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Subject,Code,Type"]
        .concat(subjects.map((s) => `${s.name},${s.code},${s.type}`))
        .join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "subjects.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(subjects);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Subjects");
    XLSX.writeFile(workbook, "subjects.xlsx");
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Subject List", 20, 10);

    autoTable(doc, {
      head: [["Subject", "Code", "Type"]],
      body: subjects.map((s) => [s.name, s.code, s.type]),
    });

    doc.save("subjects.pdf");
  };

  const tableRef = useRef(null);

  const handlePrint = () => {
    // Create a full table for printing (without pagination)
    const tableHTML = `
  <html>
    <head>
      <title>Print Subjects</title>
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
      <h2>Subject List</h2>
      <table>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Code</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          ${subjects
            .map(
              (subject) => `
              <tr>
                <td>${subject.name}</td>
                <td>${subject.code}</td>
                <td>${subject.type}</td>
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

  const filteredSubjects = subjects.filter((subject) =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { title: "Subject", dataIndex: "name", key: "name" },
    { title: "Subject Code", dataIndex: "code", key: "code" },
    { title: "Subject Type", dataIndex: "type", key: "type" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-3">
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
    <div className="flex-1 bg-white shadow-md rounded-lg p-6">
      {editingSubject ? (
        <div className="max-w-lg mx-auto bg-gray-100 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold border-b pb-3">Edit Subject</h3>
          <form onSubmit={handleSaveEdit} className="mt-4">
            <div className="mb-4">
              <label className="block font-medium">Subject Name</label>
              <input
                type="text"
                value={editingSubject.name}
                onChange={(e) =>
                  setEditingSubject({ ...editingSubject, name: e.target.value })
                }
                className="w-full border p-2 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium">Subject Code</label>
              <input
                type="text"
                value={editingSubject.code}
                onChange={(e) =>
                  setEditingSubject({ ...editingSubject, code: e.target.value })
                }
                className="w-full border p-2 rounded-md"
              />
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setEditingSubject(null)}
                className="text-blue-500 hover:text-blue-700"
              >
                <ArrowLeft />
                <span>Back to List</span>
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center border-b pb-3">
            <h3 className="text-lg font-semibold">Subject List</h3>

            <div className="relative flex items-center border rounded-md px-3 py-2">
              <SearchOutlined className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="outline-none w-full"
              />
            </div>
          </div>

          {/* Utility Buttons */}
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

          <div className="mt-4" ref={tableRef}>
            <Table
              columns={columns}
              dataSource={filteredSubjects}
              rowKey="id"
              pagination={{ pageSize: 5 }}
              className="overflow-x-auto"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SubjectList;
