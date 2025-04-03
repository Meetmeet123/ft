"use client";
import React, { useRef, useState } from "react";
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
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const ClassList = () => {
  const [data, setData] = useState([
    { id: 1, class: "Class 1", sections: ["A", "B", "C", "D"] },
    { id: 2, class: "Class 2", sections: ["A", "B", "C", "D"] },
    { id: 3, class: "Class 3", sections: ["A", "B", "C", "D"] },
    { id: 4, class: "Class 4", sections: ["A", "B", "C", "D"] },
    { id: 5, class: "Class 5", sections: ["A", "B", "C", "D"] },
  ]);
  const [editingClass, setEditingClass] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const tableRef = useRef(null);

  const columns = [
    {
      title: <div className="text-center">Class</div>,
      dataIndex: "class",
      key: "class",
      align: "center",
      render: (text, record) =>
        editingClass?.id === record.id ? (
          <input
            type="text"
            value={editedValues.class || record.class}
            onChange={(e) =>
              setEditedValues({ ...editedValues, class: e.target.value })
            }
            className="border p-1 text-center"
          />
        ) : (
          <div className="text-center">{text}</div>
        ),
    },
    {
      title: <div className="text-center">Sections</div>,
      dataIndex: "sections",
      key: "sections",
      align: "center",
      render: (sections, record) =>
        editingClass?.id === record.id ? (
          <input
            type="text"
            value={editedValues.sections?.join(", ") || sections.join(", ")}
            onChange={(e) =>
              setEditedValues({
                ...editedValues,
                sections: e.target.value.split(", "),
              })
            }
            className="border p-1 text-center"
          />
        ) : (
          <div className="text-center">{sections.join(", ")}</div>
        ),
    },
    {
      title: <div className="text-center">Action</div>,
      key: "action",
      align: "center",
      render: (_, record) => (
        <div className="flex gap-2 justify-center">
          {editingClass?.id === record.id ? (
            <button
              className="text-green-500 hover:text-green-700"
              onClick={() => {
                console.log("Updated Values:", editedValues);
                setEditingClass(null);
              }}
            >
              Save
            </button>
          ) : (
            <a
              className="text-blue-500 hover:text-blue-700"
              title="Edit"
              onClick={() => {
                setEditingClass(record);
                setEditedValues({
                  class: record.class,
                  sections: record.sections,
                });
              }}
            >
              <EditOutlined />
            </a>
          )}
          <a
            href={`https://demo.smart-school.in/classes/delete/${record.id}`}
            className="text-red-500 hover:text-red-700"
            title="Delete"
            onClick={() =>
              window.confirm(
                "Deleting this class will also delete all students under this class. This action is irreversible."
              )
            }
          >
            <DeleteOutlined />
          </a>
        </div>
      ),
    },
  ];

  const handleCopy = () => {
    const tableText = filteredData
      .map((s) => `${s.class},${s.sections}`)
      .join("\n");
    navigator.clipboard.writeText(tableText);
    alert("Table copied to clipboard!");
  };

  const handleExportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Class,Sections"]
        .concat(filteredData.map((s) => `${s.class},${s.sections}`))
        .join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "filteredData.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "filteredData");
    XLSX.writeFile(workbook, "filteredData.xlsx");
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Subject List", 20, 10);

    autoTable(doc, {
      head: [["Class", "section"]],
      body: filteredData.map((s) => [s.class, s.sections]),
    });

    doc.save("filteredData.pdf");
  };

  const handlePrint = () => {
    // Create a full table for printing (without pagination)
    const tableHTML = `
  <html>
    <head>
      <title>Print filteredData</title>
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
            <th>Class</th>
            <th>Sections</th>
            
          </tr>
        </thead>
        <tbody>
          ${filteredData
            .map(
              (subject) => `
              <tr>
                <td>${subject.class}</td>
                <td>${subject.sections}</td>
                
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

  const filteredData = data.filter((item) =>
    item.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1/2 bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Class List</h3>
      <input
        type="text"
        placeholder="Search Class..."
        className="border p-2 w-1/3 mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
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
          rowKey="id"
          pagination={false}
        />
      </div>
    </div>
  );
};

export default ClassList;
