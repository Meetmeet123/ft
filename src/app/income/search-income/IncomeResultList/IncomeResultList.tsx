import React, { useState } from "react";
import { Table, Button, Input } from "antd";
import {
  FileTextOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  PrinterOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import "antd/dist/reset.css";

interface Income {
  id: string;
  name: string;
  invoiceNumber: string;
  incomeHead: string;
  date: string;
  amount: number;
}

const incomeData: Income[] = []; // Empty array to simulate no data initially

const IncomeResult = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Number of items per page

  const filteredIncome = incomeData.filter((item) =>
    item.name?.toLowerCase().includes(searchText.toLowerCase()) ||
    item.invoiceNumber?.toLowerCase().includes(searchText.toLowerCase())
  );

  const paginatedData = filteredIncome.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
    },
    {
      title: "Invoice Number",
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
      ellipsis: true,
    },
    {
      title: "Income Head",
      dataIndex: "incomeHead",
      key: "incomeHead",
      ellipsis: true,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      ellipsis: true,
    },
    {
      title: "Amount (₹)",
      dataIndex: "amount",
      key: "amount",
      ellipsis: true,
    },
  ];

  const totalItems = filteredIncome.length;

  return (
    <div className="p-2 w-full border-[#164f63]/60 shadow-gray-300 rounded-2xl">
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
        locale={{
          emptyText: (
            <div className="text-center py-10">
              <div className="text-pink-500 mb-4">No data available in table</div>
              <div className="flex justify-center">
                {/* Placeholder for the illustrative graphic - you can replace with an actual image or SVG */}
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="https://smart-school.in/ssappresource/images/addnewitem.svg"
                  className="text-gray-400"
                >
                  {/* Simplified placeholder graphic - replace with actual design */}
                  <rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" />
                  <path d="M4 12H20" stroke="currentColor" />
                  <path d="M12 4V20" stroke="currentColor" />
                </svg>
              </div>
              <p className="text-green-600 mt-4">
                ← Add new record or search with different criteria.
              </p>
            </div>
          ),
        }}
        rowClassName={() => "bg-pink-50"}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default IncomeResult;