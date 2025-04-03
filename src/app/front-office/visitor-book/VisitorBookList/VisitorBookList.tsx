import React, { useState } from "react";
import { Table, Button, Input } from "antd";
import {
  FileExcelOutlined,
  FilePdfOutlined,
  FileTextOutlined,
  PrinterOutlined,
  EditOutlined,
  DeleteOutlined,
  DownloadOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import "antd/dist/reset.css";

const visitors = [
  {
    id: 1,
    purpose: "Admission",
    name: "Vijaya Pandit",
    phone: "1234567890",
    date: "06-02-2023",
    inTime: "12:30 AM",
    outTime: "01:30 AM",
  },
  // Add more visitor data if needed for pagination to be meaningful
];

const VisitorBookList = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Number of items per page

  const filteredVisitors = visitors.filter((visitor) =>
    visitor.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const paginatedData = filteredVisitors.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const columns = [
    {
      title: "Purpose",
      dataIndex: "purpose",
      key: "purpose",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "In Time",
      dataIndex: "inTime",
      key: "inTime",
    },
    {
      title: "Out Time",
      dataIndex: "outTime",
      key: "outTime",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button icon={<MenuOutlined />} />
          <Button icon={<DownloadOutlined />} />
          <Button icon={<EditOutlined />} href={``} />
          <Button icon={<PrinterOutlined />} />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => {
              if (window.confirm("Delete Confirm?")) {
                // Handle delete action here
                console.log(`Deleted visitor with id: ${record.id}`);
              }
            }}
          />
        </div>
      ),
    },
  ];

  const totalItems = filteredVisitors.length;

  return (
    <div className=" w-full ">  
      <Input
        placeholder="Search..."
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
          showTotal: (total, range) =>
            `Record: ${range[0]} to ${range[1]} of ${total}`,
        }}
      />
    </div>
  );
};

export default VisitorBookList;