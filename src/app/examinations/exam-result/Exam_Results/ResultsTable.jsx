import React from "react";
import { Table, Button, Tooltip } from "antd";
import {
  FileExcelOutlined,
  FilePdfOutlined,
  FileTextOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import "antd/dist/reset.css";

const examResults = [
  {
    admissionNo: "18016",
    rollNumber: "1243",
    studentName: "Apolline",
    english: "66.00",
    hindi: "85.00",
    mathematics: "56.00",
    science: "55.00",
    grandTotal: "262.00/400.00",
    percent: "65.50 (B++)",
    rank: "7",
    result: "Pass",
  },
  {
    admissionNo: "18013",
    rollNumber: "113",
    studentName: "Benjamin Gates",
    english: "67.00",
    hindi: "(F) Absent",
    mathematics: "45.00",
    science: "67.00",
    grandTotal: "179.00/400.00",
    percent: "44.75 (B)",
    rank: "17",
    result: "Fail",
  },
  {
    admissionNo: "18020",
    rollNumber: "121",
    studentName: "Charlie Brown",
    english: "78.00",
    hindi: "80.00",
    mathematics: "75.00",
    science: "82.00",
    grandTotal: "315.00/400.00",
    percent: "78.75 (A)",
    rank: "3",
    result: "Pass",
  },
  {
    admissionNo: "18025",
    rollNumber: "130",
    studentName: "Lucy Heartfilia",
    english: "55.00",
    hindi: "65.00",
    mathematics: "60.00",
    science: "58.00",
    grandTotal: "238.00/400.00",
    percent: "59.50 (C+)",
    rank: "10",
    result: "Pass",
  },
  {
    admissionNo: "18030",
    rollNumber: "140",
    studentName: "Natsu Dragneel",
    english: "90.00",
    hindi: "88.00",
    mathematics: "85.00",
    science: "92.00",
    grandTotal: "355.00/400.00",
    percent: "88.75 (A+)",
    rank: "1",
    result: "Pass",
  },
];

const ExamResultsTable = () => {
  if (examResults.length === 0) {
    return <div className="hidden">No results available.</div>;
  }

  const columns = [
    {
      title: "Admission No",
      dataIndex: "admissionNo",
      key: "admissionNo",
    },
    {
      title: "Roll Number",
      dataIndex: "rollNumber",
      key: "rollNumber",
    },
    {
      title: "Student Name",
      dataIndex: "studentName",
      key: "studentName",
      render: (text, record) => (
        <Tooltip title={record.studentName}>
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
      title: "English",
      dataIndex: "english",
      key: "english",
    },
    {
      title: "Hindi",
      dataIndex: "hindi",
      key: "hindi",
    },
    {
      title: "Mathematics",
      dataIndex: "mathematics",
      key: "mathematics",
    },
    {
      title: "Science",
      dataIndex: "science",
      key: "science",
    },
    {
      title: "Grand Total",
      dataIndex: "grandTotal",
      key: "grandTotal",
    },
    {
      title: "Percent (%)",
      dataIndex: "percent",
      key: "percent",
    },
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
    },
    {
      title: "Result",
      dataIndex: "result",
      key: "result",
      render: (text) => (
        <span
          className={`font-semibold ${
            text === "Pass" ? "text-green-500" : "text-red-500"
          }`}
        >
          {text}
        </span>
      ),
    },
  ];

  return (
    <div className="p-6  shadow-md rounded-lg ">
      {/* Action Buttons */}
      <div className="flex gap-2 mb-4">
        <Button icon={<FileTextOutlined />} className="border-gray-400" />
        <Button icon={<FileExcelOutlined />} className="border-gray-400" />
        <Button icon={<FilePdfOutlined />} className="border-gray-400" />
        <Button icon={<PrinterOutlined />} className="border-gray-400" />
      </div>

      {/* Ant Design Table with Pagination */}
      <Table
        dataSource={examResults}
        columns={columns}
        rowKey="admissionNo"
        pagination={{ pageSize: 5 }} // Set pagination size to 5
        bordered
      />
    </div>
  );
};

export default ExamResultsTable;
