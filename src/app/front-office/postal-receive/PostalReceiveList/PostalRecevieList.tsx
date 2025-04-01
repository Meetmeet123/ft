import React, { useState } from "react";
import { Table, Button, Input } from "antd";
import {
  FileExcelOutlined,
  FilePdfOutlined,
  FileTextOutlined,
  PrinterOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import "antd/dist/reset.css";

interface PostalReceive {
  id: string;
  toTitle: string;
  referenceNo: string;
  fromTitle: string;
  date: string;
}

const postalReceivees: PostalReceive[] = []; // Empty array to match the "No data available" state in the image

const PostalReceiveList = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Number of items per page

  const filteredDispatches = postalReceivees.filter((dispatch) =>
    dispatch.toTitle.toLowerCase().includes(searchText.toLowerCase())
  );

  const paginatedData = filteredDispatches.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const columns = [
    {
      title: "To Title",
      dataIndex: "toTitle",
      key: "toTitle",
      ellipsis: true,
    },
    {
      title: "Reference No",
      dataIndex: "referenceNo",
      key: "referenceNo",
      ellipsis: true,
    },
    {
      title: "From Title",
      dataIndex: "fromTitle",
      key: "fromTitle",
      ellipsis: true,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      ellipsis: true,
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button icon={<EditOutlined />} href={``} />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => {
              if (window.confirm("Delete Confirm?")) {
                console.log(`Deleted postal dispatch with id: ${record.id}`);
              }
            }}
          />
        </div>
      ),
      width: 120,
    },
  ];

  const totalItems = filteredDispatches.length;

  return (
    <div className="p-6 w-full shadow-lg border-solid border-2 border-[#164f63]/60 shadow-gray-300 rounded-2xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-extrabold">Postal Dispatch List</h3>
      </div>
      <Input
        placeholder="Search..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: "16px", width: "300px", minWidth: "200px" }}
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
        scroll={{ x: "max-content" }}
        locale={{
          emptyText: (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="text-gray-500 mb-4">No data available in table</div>
              <div className="text-green-600 flex items-center gap-2">
                <span>←</span> Add a new record or search with different criteria.
              </div>
            </div>
          ),
        }}
      />
    </div>
  );
};

export default PostalReceiveList;