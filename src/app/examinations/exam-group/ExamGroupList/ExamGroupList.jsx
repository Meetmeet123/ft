import React, { useState } from "react";
import { Table, Button, Tooltip, Input } from "antd";
import {
  FileExcelOutlined,
  FilePdfOutlined,
  FileTextOutlined,
  PrinterOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import "antd/dist/reset.css";

const examGroups = [
  {
    id: 1,
    name: "Class 4 (Pass / Fail)",
    exams: 12,
    type: "General Purpose (Pass/Fail)",
    description: "No Description",
  },
  {
    id: 2,
    name: "Class 4 (School Based Grading System)",
    exams: 13,
    type: "School Based Grading System",
    description: "SBGS stands for the SCHOOL BASED GRADING SYSTEM...",
  },
  {
    id: 3,
    name: "Class 4 (College Based Grading System)",
    exams: 8,
    type: "College Based Grading System",
    description: "No Description",
  },
  {
    id: 4,
    name: "Class 4 (GPA Grading System)",
    exams: 11,
    type: "GPA Grading System",
    description:
      "Grade Point Average (GPA) is the average of all the grades...",
  },
  {
    id: 5,
    name: "Average Passing Exam",
    exams: 8,
    type: "Average Passing",
    description: "No Description",
  },
  // Add more exam groups if needed for pagination to be meaningful
];

const ExamGroupList = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Number of items per page

  const filteredExamGroups = examGroups.filter((group) =>
    group.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const paginatedData = filteredExamGroups.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Tooltip title={record.description}>
          <span>{text}</span>
        </Tooltip>
      ),
    },
    {
      title: "No Of Exams",
      dataIndex: "exams",
      key: "exams",
    },
    {
      title: "Exam Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button icon={<PlusOutlined />} href={``} />
          <Button icon={<EditOutlined />} href={``} />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => {
              if (window.confirm("Delete Confirm?")) {
                // Handle delete action here
                console.log(`Deleted exam group with id: ${record.id}`);
              }
            }}
          />
        </div>
      ),
    },
  ];

  const totalItems = filteredExamGroups.length;

  return (
    <div className="p-6 w-9/15 shadow-lg border-solid border-2 border-[#164f63]/60 shadow-gray-300 rounded-2xl">
      <h3 className="text-xl font-extrabold">Exam Group List</h3>
      <Input
        placeholder="Search by name"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: "16px", width: "300px" }}
      />
      <div className="flex gap-2 mb-3.5">
        <Button icon={<FileTextOutlined />} />
        <Button icon={<FileExcelOutlined />} />
        <Button icon={<FilePdfOutlined />} />
        <Button icon={<PrinterOutlined />} />
      </div>
      <Table
        dataSource={paginatedData}
        columns={columns}
        rowKey="id"
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: totalItems,
          onChange: (page) => setCurrentPage(page),
        }}
      />
    </div>
  );
};

export default ExamGroupList;
