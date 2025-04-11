"use client";
import React, { useState } from "react";
import { Table, Button, Tooltip } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";

const StudentMarksList = ({ students = [] }) => {
  const [selectedStudents, setSelectedStudents] = useState({});
  const [selectAll, setSelectAll] = useState(false);

  if (students.length === 0) {
    return <div className="hidden">No students available.</div>;
  }

  const handleCheckboxChange = (admissionNo) => {
    setSelectedStudents((prev) => ({
      ...prev,
      [admissionNo]: !prev[admissionNo], // Toggle selection
    }));
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    const updatedSelection = {};
    students.forEach((student) => {
      updatedSelection[student.admissionNo] = newSelectAll;
    });
    setSelectedStudents(updatedSelection);
  };

  const columns = [
    {
      title: (
        <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
      ),
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
            className="text-blue-500 hover:underline"
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
      {/* Print Button */}
      <div className="flex justify-end mb-3.5">
        <Button
          icon={<PrinterOutlined />}
          type="primary"
          style={{
            backgroundColor: "#0d9488",
            borderColor: "#0d9488",
            color: "white",
          }}
        >
          Print
        </Button>
      </div>

      {/* Ant Design Table with custom checkbox selection */}
      <Table
        dataSource={students}
        columns={columns}
        rowKey="admissionNo"
        pagination={false}
        bordered
      />
    </div>
  );
};

export default StudentMarksList;
