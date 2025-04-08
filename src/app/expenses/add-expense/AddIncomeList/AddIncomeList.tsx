'use client';
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

const incomeData: {
  name: string;
  description: string;
  invoiceNumber: string;
  date: string;
}[] = []; // Empty data to match the "No data available" state in the image

const AddIncomeList = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Number of items per page

  const filteredData = incomeData.filter((income) =>
    income.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      filterDropdown: () => (
        <div style={{ padding: 8 }}>
          <Input placeholder="Filter by Name" />
        </div>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      filterDropdown: () => (
        <div style={{ padding: 8 }}>
          <Input placeholder="Filter by Description" />
        </div>
      ),
    },
    {
      title: "Invoice Number",
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
      filterDropdown: () => (
        <div style={{ padding: 8 }}>
          <Input placeholder="Filter by Invoice Number" />
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      filterDropdown: () => (
        <div style={{ padding: 8 }}>
          <Input placeholder="Filter by Date" />
        </div>
      ),
    },
    {
      title: "Expense Head",
      dataIndex: "ExpenseHead",
      key: "ExpenseHead",
      filterDropdown: () => (
        <div style={{ padding: 8 }}>
          <Input placeholder="Filter by Expense Head" />
        </div>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      filterDropdown: () => (
        <div style={{ padding: 8 }}>
          <Input placeholder="Filter by Amount" />
        </div>
      ),
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
                console.log(`Deleted income with id: ${record.id}`);
              }
            }}
          />
        </div>
      ),
    },
  ];

  const totalItems = filteredData.length;

  return (
    <div className="w-full">
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
        locale={{
          emptyText: (
            <div className="py-10">
              <h3 className="text-red-400">No data available in table</h3>
              <div className="flex justify-center my-4">
                <svg className="w-[20%] h-auto" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="60" y="50" width="80" height="60" rx="5" fill="#E5E7EB"/>
                  <rect x="70" y="40" width="60" height="80" rx="5" fill="#F3F4F6"/>
                  <rect x="80" y="30" width="40" height="100" rx="5" fill="#FFFFFF"/>
                  <circle cx="90" cy="40" r="3" fill="#D1D5DB"/>
                  <circle cx="110" cy="40" r="3" fill="#D1D5DB"/>
                  <line x1="85" y1="50" x2="115" y2="50" stroke="#D1D5DB"/>
                  <line x1="85" y1="60" x2="115" y2="60" stroke="#D1D5DB"/>
                  <line x1="85" y1="70" x2="115" y2="70" stroke="#D1D5DB"/>
                </svg>
              </div>
              <h3 className="font-semibold text-green-600">
                <span className="inline-block mr-1">←</span> Add new record or search with different criteria.
              </h3>
            </div>
          ),
        }}
      />
    </div>
  );
};

export default AddIncomeList;