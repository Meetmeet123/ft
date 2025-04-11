"use client";
import React, { useState } from "react";
import { Table } from "antd";
import {
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

const DepartmentList = () => {
  const [departments, setDepartments] = useState([
    { id: 1, name: "Academic" },
    { id: 2, name: "Library" },
    { id: 3, name: "Sports" },
    { id: 4, name: "Science" },
    { id: 5, name: "Commerce" },
    { id: 6, name: "Arts" },
    { id: 7, name: "Exam" },
    { id: 8, name: "Admin" },
    { id: 9, name: "Finance" },
    { id: 10, name: "Maths" },
  ]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm("Delete Confirm?")) {
      setDepartments(departments.filter((department) => department.id !== id));
    }
  };

  const handleEdit = (department) => {
    setCurrentDepartment(department);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentDepartment(null);
  };

  const handleUpdateDepartment = (updatedData) => {
    setDepartments(
      departments.map((department) =>
        department.id === updatedData.id ? updatedData : department
      )
    );
    handleModalClose();
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const filteredDepartments = departments.filter((department) =>
    department.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center", // Center align the header
    },
    {
      title: "Action",
      key: "action",
      align: "center", // Center align the header
      render: (text, record) => (
        <div className="flex justify-center space-x-2">
          <button
            style={{ color: "blue" }}
            className="flex items-center hover:underline mr-1"
            onClick={() => handleEdit(record)}
          >
            <EditOutlined style={{ marginRight: 4 }} />
          </button>
          <button
            className="flex items-center text-red-500 hover:underline"
            onClick={(e) => {
              e.preventDefault();
              handleDelete(record.id);
            }}
          >
            <DeleteOutlined style={{ marginRight: 4 }} />
          </button>
        </div>
      ),
    },
  ];

  const handleCopy = () => {
    const text = filteredDepartments
      .map((row) => `${row.id}, ${row.name}`)
      .join("\n");
    navigator.clipboard.writeText(text);
    alert("Table data copied to clipboard!");
  };

  const handlePrint = () => {
    const printWindow = window.open("", "", "width=900,height=650");
    if (printWindow) {
      const headers = `<th>ID</th><th>Name</th>`;
      const rows = filteredDepartments
        .map((row) => `<tr><td>${row.id}</td><td>${row.name}</td></tr>`)
        .join("");

      printWindow.document.write(`
            <html>
              <head>
                <title>Department List</title>
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
                <h2>Department List</h2>
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
    const ws = XLSX.utils.json_to_sheet(departments);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Departments");
    XLSX.writeFile(wb, "Departments.xlsx");
  };

  const handleExportCSV = () => {
    const csvContent = [
      ["ID", "Name"].join(","),
      ...departments.map((row) => [row.id, row.name].join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "Departments.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["ID", "Name"]],
      body: filteredDepartments.map((row) => [row.id, row.name]),
    });
    doc.save("Departments.pdf");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedData = {
      id: currentDepartment.id,
      name: formData.get("name"),
    };
    handleUpdateDepartment(updatedData);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex-1/2">
      <h3 className="text-lg font-semibold mb-4">Department Lists</h3>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search departments"
          value={searchText}
          onChange={handleSearch}
          className="border inline-block border-gray-300 rounded-md p-2 mb-4 w-1/3"
        />
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
      <Table
        dataSource={filteredDepartments.slice(
          (currentPage - 1) * pageSize,
          currentPage * pageSize
        )}
        columns={columns}
        rowKey="id"
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: filteredDepartments.length,
          onChange: (page) => setCurrentPage(page),
        }}
        bordered
      />

      {/* Modal for Editing Department */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-0 bg-black/95">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Edit Department</h2>
            <form onSubmit={handleSubmit}>
              <label className="block mb-2">
                Name:
                <input
                  type="text"
                  name="name"
                  defaultValue={currentDepartment.name}
                  required
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </label>
              <div className="flex justify-end">
                <button
                  type="submit"
                  style={{ backgroundColor: "#164f63" }}
                  className="text-white rounded-md px-4 py-2 mr-2"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleModalClose}
                  style={{ backgroundColor: "red" }}
                  className="rounded-md px-4 py-2 text-white"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentList;
