import React from "react";
import { Table, button, Card, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const GradeDivList = ({ grades, onEdit, onDelete }) => {
  const columns = [
    {
      title: "Division Name",
      dataIndex: "divisionName",
      key: "divisionName",
    },
    {
      title: "Percent From",
      dataIndex: "markFrom",
      key: "markFrom",
    },
    {
      title: "Percent Upto",
      dataIndex: "markUpto",
      key: "markUpto",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-2">
          <Tooltip title="Edit">
            <button
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
              className="text-green-600 border-none hover:text-green-700 hover:bg-green-100 transition-all"
            />
          </Tooltip>
          <Tooltip title="Delete">
            <button
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
    <Card style={{ marginTop: "calc(var(--spacing) * 5)" }}>
      <Table dataSource={grades} columns={columns} rowKey="key" />
    </Card>
  );
};

export default GradeDivList;
