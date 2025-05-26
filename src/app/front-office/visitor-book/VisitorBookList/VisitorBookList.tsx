"use client";
import React, { useState, useEffect } from "react";
import { Table, Button, Input, message, Modal } from "antd";
import { FileExcelOutlined, FilePdfOutlined, FileTextOutlined, PrinterOutlined, EditOutlined, DeleteOutlined, DownloadOutlined, MenuOutlined } from "@ant-design/icons";
import axios from "axios";
import dayjs from "dayjs";

interface Visitor {
  id: number;
  purpose: string;
  name: string;
  contact: string;
  id_proof: string;
  no_of_people: number;
  date: string;
  in_time: string;
  out_time: string;
  note: string;
}

const VisitorBookList = ({ refreshTrigger }: { refreshTrigger: number }) => {
  const [visitors, setVisitors] = useState<Visitor[]>([]); // Initialize as []
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    fetchVisitors();
  }, [refreshTrigger]);

  const fetchVisitors = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://school2025.dolittletech.co.in/api/visitors");
      console.log("API Response:", response.data); // Debugging
      // Handle different response structures:
      const data = response.data.data || response.data || [];
      setVisitors(Array.isArray(data) ? data : []); // Ensure it's always an array
    } catch (error) {
      console.error("Error fetching visitors:", error);
      message.error("Failed to fetch visitors");
      setVisitors([]); // Fallback to empty array
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    Modal.confirm({
      title: "Delete Confirmation",
      content: "Are you sure you want to delete this visitor?",
      onOk: async () => {
        try {
          await axios.delete(`https://school2025.dolittletech.co.in/api/visitors/${id}`);
          message.success("Visitor deleted successfully");
          fetchVisitors();
        } catch (error) {
          console.error("Error deleting visitor:", error);
          message.error("Failed to delete visitor");
        }
      },
    });
  };

  // Safe filtering with optional chaining
  const filteredVisitors = visitors.filter((visitor) =>
    visitor.name?.toLowerCase().includes(searchText.toLowerCase()) ||
    visitor.contact?.includes(searchText) ||
    visitor.purpose?.toLowerCase().includes(searchText.toLowerCase())
  );

  const paginatedData = filteredVisitors.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const columns = [
    { title: "Purpose", dataIndex: "purpose", key: "purpose" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Phone", dataIndex: "contact", key: "phone" },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date: string) => dayjs(date).format("DD-MM-YYYY"),
    },
    { title: "In Time", dataIndex: "in_time", key: "inTime" },
    { title: "Out Time", dataIndex: "out_time", key: "outTime" },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Visitor) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button icon={<MenuOutlined />} />
          <Button icon={<DownloadOutlined />} />
          <Button icon={<EditOutlined />} />
          <Button icon={<PrinterOutlined />} />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <Input
        placeholder="Search by name, phone or purpose..."
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
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: filteredVisitors.length,
          onChange: (page) => setCurrentPage(page),
          showTotal: (total, range) => `Record: ${range[0]} to ${range[1]} of ${total}`,
        }}
      />
    </div>
  );
};

export default VisitorBookList;