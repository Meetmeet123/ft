"use client";
import React, { useState, useEffect } from "react";
import { Table, Button, Input, message } from "antd";
import { EditOutlined, DeleteOutlined, SyncOutlined } from "@ant-design/icons";

interface Purpose {
  id: number;
  visitors_purpose: string;
  description: string;
}

interface PurposeListProps {
  onEdit?: (data: Purpose) => void; // Make onEdit optional
  refreshKey?: number; // Make refreshKey optional
}

const PurposeList: React.FC<PurposeListProps> = ({ 
  onEdit = () => {}, // Provide default empty function
  refreshKey = 0 // Provide default value
}) => {
  const [purposes, setPurposes] = useState<Purpose[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchPurposes();
  }, [refreshKey]);

  const fetchPurposes = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://school2025.dolittletech.co.in/api/visitors-purposes"
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Handle different API response structures
      if (Array.isArray(data)) {
        setPurposes(data);
      } else if (data.data) {
        setPurposes(Array.isArray(data.data) ? data.data : [data.data]);
      } else {
        setPurposes([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      message.error("Failed to load purposes");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(
        `https://school2025.dolittletech.co.in/api/visitors-purposes/${id}`,
        { method: "DELETE" }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      message.success("Purpose deleted successfully");
      fetchPurposes(); // Refresh the list
    } catch (error) {
      console.error("Delete error:", error);
      message.error("Failed to delete purpose");
    }
  };

  const filteredData = purposes.filter(purpose =>
    purpose.visitors_purpose.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'Purpose',
      dataIndex: 'visitors_purpose',
      key: 'visitors_purpose',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text: string) => text || '—',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Purpose) => (
        <div className="flex gap-2">
          <Button
            icon={<EditOutlined />}
            onClick={() => onEdit(record)} // Now safe to call
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => {
              if (confirm('Are you sure you want to delete this purpose?')) {
                handleDelete(record.id);
              }
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between mb-4">
        <Input.Search
          placeholder="Search purposes..."
          allowClear
          onChange={e => setSearchText(e.target.value)}
          style={{ width: 300 }}
        />
        <Button
          icon={<SyncOutlined />}
          onClick={fetchPurposes}
          loading={loading}
        >
          Refresh
        </Button>
      </div>
      
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize: 5,
          showSizeChanger: false,
        }}
        locale={{
          emptyText: (
            <div className="py-8 text-center">
              {loading ? 'Loading...' : 'No purposes found'}
            </div>
          ),
        }}
      />
    </div>
  );
};

export default PurposeList;