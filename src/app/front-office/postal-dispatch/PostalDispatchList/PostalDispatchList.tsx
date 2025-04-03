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

interface PostalDispatch {
  id: string;
  toTitle: string;
  referenceNo: string;
  fromTitle: string;
  date: string;
}

const postalDispatches: PostalDispatch[] = []; // Empty array to match the "No data available" state in the image

const PostalDispatchList = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Number of items per page

  const filteredDispatches = postalDispatches.filter((dispatch) =>
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
    <div className=" w-full">
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

export default PostalDispatchList;