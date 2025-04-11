"use client";
import React, { useState } from "react";
import { Table } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  FileExcelOutlined,
  FileTextOutlined,
  FilePdfOutlined,
  PrinterOutlined,
  CopyOutlined,
} from "@ant-design/icons";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const DesignationList = () => {
  const [designations, setDesignations] = useState([
    { id: 1, name: "Faculty" },
    { id: 2, name: "Accountant" },
    { id: 3, name: "Admin" },
    { id: 4, name: "Receptionist" },
    { id: 5, name: "Principal" },
    { id: 6, name: "Director" },
    { id: 7, name: "Librarian" },
    { id: 8, name: "Technical Head" },
    { id: 9, name: "Vice Principal" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDesignation, setCurrentDesignation] = useState(null);
  const [newName, setNewName] = useState("");

  const handleDelete = (id) => {
    if (window.confirm("Delete Confirm?")) {
      setDesignations(
        designations.filter((designation) => designation.id !== id)
      );
      alert("Designation deleted successfully!"); // Simple alert for feedback
    }
  };

  const handleEdit = (id) => {
    const designationToEdit = designations.find(
      (designation) => designation.id === id
    );
    if (designationToEdit) {
      setCurrentDesignation(designationToEdit);
      setNewName(designationToEdit.name);
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentDesignation(null);
    setNewName("");
  };

  const handleUpdateDesignation = () => {
    setDesignations(
      designations.map((designation) =>
        designation.id === currentDesignation.id
          ? { ...designation, name: newName }
          : designation
      )
    );
    handleModalClose();
    alert("Designation updated successfully!"); // Simple alert for feedback
  };

  const columns = [
    {
      title: "Designation",
      dataIndex: "name",
      key: "name",
      align: "center", // Center align the content
    },
    {
      title: "Action",
      align: "center",
      key: "action",
      render: (text, record) => (
        <div className="flex justify-center space-x-2">
          <button onClick={() => handleEdit(record.id)} title="Edit">
            <EditOutlined style={{ color: "blue", cursor: "pointer" }} />
          </button>
          <button
            onClick={() => handleDelete(record.id)}
            className="ml-1"
            title="Delete"
          >
            <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
          </button>
        </div>
      ),
    },
  ];

  const handleCopy = () => {
    const text = designations.map((row) => `${row.id}, ${row.name}`).join("\n");
    navigator.clipboard.writeText(text);
    alert("Table data copied to clipboard!");
  };

  const handlePrint = () => {
    const printWindow = window.open("", "", "width=900,height=650");
    if (printWindow) {
      const headers = `<th>ID</th><th>Name</th>`;
      const rows = designations
        .map((row) => `<tr><td>${row.id}</td><td>${row.name}</td></tr>`)
        .join("");

      printWindow.document.write(`
              <html>
                <head>
                  <title>Designation List</title>
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
                  <h2>Designation List</h2>
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
    const ws = XLSX.utils.json_to_sheet(designations);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Designations");
    XLSX.writeFile(wb, "Designations.xlsx");
  };

  const handleExportCSV = () => {
    const csvContent = [
      ["ID", "Name"].join(","),
      ...designations.map((row) => [row.id, row.name].join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "Designations.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["ID", "Name"]],
      body: designations.map((row) => [row.id, row.name]),
    });
    doc.save("Designations.pdf");
  };

  return (
    <div className="flex-1/2 bg-white shadow-md rounded-lg">
      <div className=" p-6" id="tachelist">
        <div className="border-b border-gray-200 mb-4">
          <h3 className="text-lg font-semibold titlefix">Designation List</h3>
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
        <div className="overflow-x-auto">
          <Table
            dataSource={designations}
            columns={columns}
            rowKey="id"
            pagination={{
              pageSize: 5, // Set page size to 5
              showSizeChanger: false, // Hide page size changer
            }}
            style={{ textAlign: "center" }} // Center align the table content
          />
        </div>
        <div className="mt-4">
          <span className="text-sm">
            Records: 1 to {designations.length} of {designations.length}
          </span>
        </div>
      </div>

      {/* Custom Modal for Editing */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-1/3">
            <h3 className="text-lg font-semibold mb-4">Edit Designation</h3>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Enter designation name"
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={handleUpdateDesignation}
                style={{ backgroundColor: "#164f63" }}
                className="text-white rounded-md px-4 py-2 mr-2"
              >
                Save
              </button>
              <button
                onClick={handleModalClose}
                style={{ backgroundColor: "red" }}
                className="rounded-md px-4 text-white py-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesignationList;
