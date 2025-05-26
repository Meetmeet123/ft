import React, { useState, useEffect } from "react";
import { Table, Button, Input, message } from "antd";
import {
  FileExcelOutlined,
  FilePdfOutlined,
  FileTextOutlined,
  PrinterOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const API_URL = "https://school2025.dolittletech.co.in/api/complaints";

interface Complaint {
  id: number;
  complaint_type: string;
  name: string;
  contact: string;
  date: string;
  source: string;
}

const ComplainList: React.FC<{
  onEdit: (complaint: Complaint) => void;
  refreshKey: number;
}> = ({ onEdit, refreshKey }) => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    const fetchComplaints = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setComplaints(data);
      } catch (error) {
        console.error(error);
        message.error("Failed to fetch complaints");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [refreshKey]);

  const handleDelete = async (id: number) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      message.success("Complaint deleted successfully");
      setComplaints(complaints.filter(item => item.id !== id));
    } catch (error) {
      console.error(error);
      message.error("Delete failed");
    }
  };

  const filteredComplaints = complaints.filter((complaint) =>
    complaint.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const paginatedData = filteredComplaints.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const columns = [
    {
      title: "Complain #",
      dataIndex: "id",
      key: "id",
      ellipsis: true,
    },
    {
      title: "Complain Type",
      dataIndex: "complaint_type",
      key: "complaint_type",
      ellipsis: true,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
    },
    {
      title: "Phone",
      dataIndex: "contact",
      key: "contact",
      ellipsis: true,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      ellipsis: true,
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Complaint) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button 
            icon={<EditOutlined />} 
            onClick={() => onEdit(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => {
              if (window.confirm("Delete Confirm?")) {
                handleDelete(record.id);
              }
            }}
          />
        </div>
      ),
      width: 120,
    },
  ];

  return (
    <div className="p-0 w-full">
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
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: filteredComplaints.length,
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

export default ComplainList;