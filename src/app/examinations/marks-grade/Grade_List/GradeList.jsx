import React from "react";
import { Table, Button, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const GradeList = ({ grades, onEdit, onDelete }) => {
  const columns = [
    {
      title: "Exam Type",
      dataIndex: "examType",
      key: "examType",
      className: "text-gray-800 font-medium",
    },
    {
      title: "Grade Name",
      dataIndex: "gradeName",
      key: "gradeName",
      className: "text-gray-800 font-medium",
    },
    {
      title: "Percent Range",
      key: "percentRange",
      render: (_, record) => (
        <span className="text-gray-700">
          {record.markFrom} - {record.markUpto}
        </span>
      ),
    },
    {
      title: "Grade Point",
      dataIndex: "gradePoint",
      key: "gradePoint",
      className: "text-gray-800 font-medium",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-2">
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
              className="text-green-600 border-none hover:text-green-700 hover:bg-green-100 transition-all"
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              icon={<DeleteOutlined />}
              onClick={() => onDelete(record.key)}
              className="text-red-600 border-none hover:text-red-700 hover:bg-red-100 transition-all"
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Grade List</h3>
      <Table
        dataSource={grades}
        columns={columns}
        rowKey="key"
        className="rounded-lg overflow-hidden"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default GradeList;
