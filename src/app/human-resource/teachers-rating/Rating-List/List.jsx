"use client";
import React, { useState } from "react";
import { Table } from "antd";
import {
  CopyOutlined,
  FileExcelOutlined,
  FileTextOutlined,
  FilePdfOutlined,
  PrinterOutlined,
  StarOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const TeachersRatingList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [ratings, setRatings] = useState([
    {
      id: 1,
      staffId: "9002",
      name: "Shivam Verma",
      rating: 3,
      comment: "good",
      status: "Pending",
      studentName: "Glen Stark",
    },
    {
      id: 2,
      staffId: "9002",
      name: "Shivam Verma",
      rating: 4,
      comment: "no comment",
      status: "Pending",
      studentName: "Edward Thomas",
    },
    {
      id: 3,
      staffId: "9002",
      name: "Shivam Verma",
      rating: 5,
      comment: "Motivates students to progress",
      status: "Approved",
      studentName: "Saurabh Shah",
    },
    {
      id: 4,
      staffId: "9002",
      name: "Shivam Verma",
      rating: 5,
      comment: "Excellent",
      status: "Approved",
      studentName: "Robin Peterson",
    },
    {
      id: 5,
      staffId: "90006",
      name: "Jason Sharlton",
      rating: 5,
      comment:
        "Solidifies a positive relationship or connection with your students",
      status: "Approved",
      studentName: "Saurabh Shah",
    },
    {
      id: 6,
      staffId: "90006",
      name: "Jason Sharlton",
      rating: 4,
      comment: "good team teacher learning and best regards",
      status: "Approved",
      studentName: "MANISH RAJPUT",
    },
    {
      id: 7,
      staffId: "90006",
      name: "Jason Sharlton",
      rating: 2,
      comment: "yddyy",
      status: "Approved",
      studentName: "Kavya Roy",
    },
    {
      id: 8,
      staffId: "90006",
      name: "Jason Sharlton",
      rating: 4,
      comment: "Very Good",
      status: "Approved",
      studentName: "Robin Peterson",
    },
    {
      id: 9,
      staffId: "90006",
      name: "Jason Sharlton",
      rating: 2,
      comment: "Very nice",
      status: "Approved",
      studentName: "Devin Coinneach",
    },
    {
      id: 10,
      staffId: "90006",
      name: "Jason Sharlton",
      rating: 2,
      comment: "Good",
      status: "Approved",
      studentName: "Henry Taylor",
    },
  ]);

  const filteredRatings = ratings.filter((rating) =>
    rating.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm("Delete Confirm?")) {
      setRatings(ratings.filter((rating) => rating.id !== id));
    }
  };

  const handleApprove = (id) => {
    setRatings((prevRatings) =>
      prevRatings.map((rating) =>
        rating.id === id ? { ...rating, status: "Approved" } : rating
      )
    );
  };

  const columns = [
    {
      title: "Staff ID",
      dataIndex: "staffId",
      key: "staffId",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <a
          href={`https://demo.smart-school.in/admin/staff/profile/${record.id}`}
          className="text-blue-600 hover:underline"
        >
          {text} ({record.staffId})
        </a>
      ),
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => (
        <div>
          {[...Array(5)].map((_, index) => (
            <StarOutlined
              key={index}
              style={{
                color: `${
                  index < rating
                    ? "var(--color-orange-500)"
                    : "var(--color-gray-300)"
                }`,
              }}
            />
          ))}
        </div>
      ),
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          className={`label ${
            status === "Approved" ? "text-green-600" : "text-yellow-600"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Student Name",
      dataIndex: "studentName",
      key: "studentName",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="flex space-x-2">
          {record.status === "Pending" && (
            <button
              onClick={() => handleApprove(record.id)}
              style={{ color: "var(--color-blue-600)" }}
              className=" hover:underline"
            >
              Approve
            </button>
          )}
          <button
            style={{ color: "var(--color-red-600)" }}
            onClick={() => handleDelete(record.id)}
            className=" hover:underline ml-5"
          >
            <DeleteOutlined />
          </button>
        </div>
      ),
    },
  ];

  const handleCopy = () => {
    const text = filteredRatings
      .map(
        (row) =>
          `${row.staffId}, ${row.name}, ${row.rating}, ${row.comment}, ${row.status}, ${row.studentName}`
      )
      .join("\n");
    navigator.clipboard.writeText(text);
    alert("Table data copied to clipboard!");
  };

  const handlePrint = () => {
    const printWindow = window.open("", "", "width=900,height=650");
    if (printWindow) {
      const headers = `<th>Staff ID</th><th>Name</th><th>Rating</th><th>Comment</th><th>Status</th><th>Student Name</th>`;
      const rows = filteredRatings
        .map(
          (row) =>
            `<tr><td>${row.staffId}</td><td>${row.name}</td><td>${row.rating}</td><td>${row.comment}</td><td>${row.status}</td><td>${row.studentName}</td></tr>`
        )
        .join("");

      printWindow.document.write(`
          <html>
            <head>
              <title>Teachers Rating List</title>
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
              <h2>Teachers Rating List</h2>
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
    const ws = XLSX.utils.json_to_sheet(filteredRatings);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Teachers Ratings");
    XLSX.writeFile(wb, "Teachers_Ratings.xlsx");
  };

  const handleExportCSV = () => {
    const csvContent = [
      ["Staff ID", "Name", "Rating", "Comment", "Status", "Student Name"].join(
        ","
      ),
      ...filteredRatings.map((row) =>
        [
          row.staffId,
          row.name,
          row.rating,
          row.comment,
          row.status,
          row.studentName,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "Teachers_Ratings.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [
        ["Staff ID", "Name", "Rating", "Comment", "Status", "Student Name"],
      ],
      body: filteredRatings.map((row) => [
        row.staffId,
        row.name,
        row.rating,
        row.comment,
        row.status,
        row.studentName,
      ]),
    });
    doc.save("Teachers_Ratings.pdf");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Teachers Rating List</h3>
        {/* Utility buttons */}
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
      <input
        type="search"
        className="p-2 border border-gray-300 rounded-md mb-4"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Table
        columns={columns}
        dataSource={filteredRatings} // Make sure this is defined in your component
        rowKey="id"
        pagination={{ pageSize: 5 }} // Set pagination with page size of 5
      />
      <div className="mt-4">
        Records: {filteredRatings.length} to {filteredRatings.length} of{" "}
        {ratings.length}
      </div>
    </div>
  );
};

export default TeachersRatingList;
