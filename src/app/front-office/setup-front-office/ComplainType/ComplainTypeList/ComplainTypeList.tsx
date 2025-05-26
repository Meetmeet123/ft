"use client";
import React, { useState, useEffect } from "react";
import { Table, Button, Input, message } from "antd";
import { EditOutlined, DeleteOutlined, SyncOutlined } from "@ant-design/icons";

interface ComplainType {
  id: number;
  complaint_type: string;
  description: string;
}

interface ComplainTypeListProps {
  onEdit: (data: ComplainType) => void;
  refreshKey: number;
}

const ComplainTypeList = ({ onEdit, refreshKey }: ComplainTypeListProps) => {
  const [complainTypes, setComplainTypes] = useState<ComplainType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchComplainTypes();
  }, [refreshKey]);

  const fetchComplainTypes = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://school2025.dolittletech.co.in/api/complaint-types"
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Handle different API response structures
      if (Array.isArray(data)) {
        setComplainTypes(data);
      } else if (data.data) {
        setComplainTypes(Array.isArray(data.data) ? data.data : [data.data]);
      } else {
        setComplainTypes([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      message.error("Failed to load complain types");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(
        `https://school2025.dolittletech.co.in/api/complaint-types/${id}`,
        { method: "DELETE" }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      message.success("Complain type deleted successfully");
      fetchComplainTypes(); // Refresh the list
    } catch (error) {
      console.error("Delete error:", error);
      message.error("Failed to delete complain type");
    }
  };

  const filteredData = complainTypes.filter(type =>
    type.complaint_type.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'Complain Type',
      dataIndex: 'complaint_type',
      key: 'complaint_type',
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
      render: (_: any, record: ComplainType) => (
        <div className="flex gap-2">
          <Button
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => {
              if (confirm('Are you sure you want to delete this complain type?')) {
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
          placeholder="Search complain types..."
          allowClear
          onChange={e => setSearchText(e.target.value)}
          style={{ width: 300 }}
        />
        <Button
          icon={<SyncOutlined />}
          onClick={fetchComplainTypes}
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
              {loading ? 'Loading...' : 'No complain types found'}
            </div>
          ),
        }}
      />
    </div>
  );
};

export default ComplainTypeList;