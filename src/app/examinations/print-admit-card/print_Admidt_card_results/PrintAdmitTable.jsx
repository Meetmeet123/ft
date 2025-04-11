"use client";
import React, { useState } from "react";
import { Table, button, Tooltip } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";

const StudentAdmitList = ({ students = [] }) => {
  const [selectedStudents, setSelectedStudents] = useState({});

  if (students.length === 0) {
    return <div className="hidden">No students available.</div>;
  }

  const handleCheckboxChange = (admissionNo) => {
    setSelectedStudents((prev) => ({
      ...prev,
      [admissionNo]: !prev[admissionNo], // Toggle selection
    }));
  };

  const columns = [
    {
      title: "Select",
      dataIndex: "select",
      key: "select",
      render: (_, record) => (
        <input
          type="checkbox"
          checked={selectedStudents[record.admissionNo] || false}
          onChange={() => handleCheckboxChange(record.admissionNo)}
        />
      ),
    },
    {
      title: "Admission No",
      dataIndex: "admissionNo",
      key: "admissionNo",
    },
    {
      title: "Student Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Tooltip title={record.name}>
          <a
            href={`https://demo.smart-school.in/student/view/${record.admissionNo}`}
          >
            {text}
          </a>
        </Tooltip>
      ),
    },
    {
      title: "Father Name",
      dataIndex: "fatherName",
      key: "fatherName",
    },
    {
      title: "Date of Birth",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Mobile Number",
      dataIndex: "mobile",
      key: "mobile",
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-end mb-3.5">
        <button
          style={{
            backgroundColor: "#164f63",
            borderColor: "#0d9488",
            color: "white",
          }}
          className="font-bold px-4 py-2 rounded hover:bg-teal-700 transition"
        >
          <PrinterOutlined /> Print
        </button>
      </div>
      <Table
        dataSource={students}
        columns={columns}
        rowKey="admissionNo"
        pagination={false}
      />
    </div>
  );
};

export default StudentAdmitList;
