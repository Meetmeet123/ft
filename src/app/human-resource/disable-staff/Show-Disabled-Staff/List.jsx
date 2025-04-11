"use client";
import React, { useState } from "react";
import { Table } from "antd";
import {
  EyeOutlined,
  FileTextOutlined,
  AppstoreAddOutlined,
  SearchOutlined,
  PlusOutlined,
  PrinterOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
  CopyOutlined,
} from "@ant-design/icons";

import staffData from "../staffdata";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Link from "next/link";

const StaffList = () => {
  const [activeTab, setActiveTab] = useState("tab_1");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStaffData = staffData.filter((staff) =>
    staff.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      title: "Staff ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <a href={record.profileLink} className="text-blue-600 hover:underline">
          {text}
        </a>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Link
          href={`disable-staff/${record.id}`}
          className="text-blue-600 hover:underline"
          title="View"
        >
          <EyeOutlined />
        </Link>
      ),
    },
  ];

  const handleCopy = () => {
    const text = filteredStaffData
      .map((staff) => `${staff.id}, ${staff.name}`)
      .join("\n");
    navigator.clipboard.writeText(text);
    alert("Table data copied to clipboard!");
  };

  const handlePrint = () => {
    const printWindow = window.open("", "", "width=900,height=650");
    if (printWindow) {
      const headers = `<th>ID</th><th>Name</th><th>Role</th><th>Department</th><th>Designation</th>`;
      const rows = filteredStaffData
        .map(
          (staff) =>
            `<tr><td>${staff.id}</td><td>${staff.name}</td><td>${staff.role}</td><td>${staff.department}</td><td>${staff.designation}</td></tr>`
        )
        .join("");

      printWindow.document.write(`
                <html>
                  <head>
                    <title>Staff List</title>
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
                    <h2>Staff List</h2>
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
    const ws = XLSX.utils.json_to_sheet(filteredStaffData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Staff Data");
    XLSX.writeFile(wb, "StaffData.xlsx");
  };

  const handleExportCSV = () => {
    const csvContent = [
      ["ID", "Name", "Role", "Department", "Designation"].join(","),
      ...filteredStaffData.map((staff) =>
        [
          staff.id,
          staff.name,
          staff.role,
          staff.department,
          staff.designation,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "StaffData.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["ID", "Name", "Role", "Department", "Designation"]],
      body: filteredStaffData.map((staff) => [
        staff.id,
        staff.name,
        staff.role,
        staff.department,
        staff.designation,
      ]),
    });
    doc.save("StaffData.pdf");
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-5">
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search Staff"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 mr-2"
          />
          <button className="flex items-center bg-blue-500 text-white rounded-lg p-2">
            <SearchOutlined className="mr-1" /> Search
          </button>
        </div>
        <button className="flex items-center bg-green-500 text-white rounded-lg p-2">
          <PlusOutlined className="mr-1" /> Add Staff
        </button>
      </div>
      <div className="nav-tabs-custom theme-shadow">
        <ul className="flex border-b border-gray-200 mb-4">
          <li
            className={`mr-4 ${
              activeTab === "tab_1" ? "border-b-2 border-blue-600" : ""
            }`}
          >
            <button
              onClick={() => setActiveTab("tab_1")}
              className="flex items-center p-2 text-gray-700 hover:text-blue-600"
            >
              <AppstoreAddOutlined className="mr-2" /> Card View
            </button>
          </li>
          <li
            className={
              activeTab === "tab_2" ? "border-b-2 border-blue-600" : ""
            }
          >
            <button
              onClick={() => setActiveTab("tab_2")}
              className="flex items-center p-2 text-gray-700 hover:text-blue-600"
            >
              <FileTextOutlined className="mr-2" /> List View
            </button>
          </li>
        </ul>
        <div className="tab-content">
          {activeTab === "tab_1" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredStaffData.map((staff) => (
                <div
                  key={staff.id}
                  className="bg-gray-100 p-4 rounded-lg shadow"
                >
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <img
                        src={staff.image}
                        alt={staff.name}
                        className="w-16 h-16 rounded-full"
                      />
                    </div>
                    <div className="ml-4">
                      <h5 className="text-lg font-semibold">{staff.name}</h5>
                      <p className="text-sm">Staff ID: {staff.id}</p>
                      <p className="text-sm">Department: {staff.department}</p>
                      <p className="text-sm">Role: {staff.role}</p>
                      <p className="text-sm">
                        Designation: {staff.designation}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Link
                      href={`disable-staff/${staff.id}`}
                      className="text-blue-600 hover:underline"
                      title="View"
                    >
                      <EyeOutlined /> View Profile
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === "tab_2" && (
            <>
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
              <Table
                dataSource={filteredStaffData}
                columns={columns}
                rowKey="id"
                pagination={false}
                className="mt-4"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffList;
