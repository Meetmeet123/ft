"use client";
import React, { useState, useEffect } from "react";
import { Table, Button, Input, message } from "antd";
import { EditOutlined, DeleteOutlined, SyncOutlined } from "@ant-design/icons";

interface Reference {
  id: number;
  reference: string;
  description: string;
}

interface ReferenceListProps {
  onEdit: (data: Reference) => void;
  refreshKey: number;
}

const ReferenceList = ({ onEdit, refreshKey }: ReferenceListProps) => {
  const [references, setReferences] = useState<Reference[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchReferences();
  }, [refreshKey]);

  const fetchReferences = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://school2025.dolittletech.co.in/api/references"
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Handle different API response structures
      if (Array.isArray(data)) {
        setReferences(data);
      } else if (data.data) {
        setReferences(Array.isArray(data.data) ? data.data : [data.data]);
      } else {
        setReferences([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      message.error("Failed to load references");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(
        `https://school2025.dolittletech.co.in/api/references/${id}`,
        { method: "DELETE" }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      message.success("Reference deleted successfully");
      fetchReferences(); // Refresh the list
    } catch (error) {
      console.error("Delete error:", error);
      message.error("Failed to delete reference");
    }
  };

  const filteredData = references.filter(reference =>
    reference.reference.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'Reference',
      dataIndex: 'reference',
      key: 'reference',
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
      render: (_: any, record: Reference) => (
        <div className="flex gap-2">
          <Button
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => {
              if (confirm('Are you sure you want to delete this reference?')) {
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
          placeholder="Search references..."
          allowClear
          onChange={e => setSearchText(e.target.value)}
          style={{ width: 300 }}
        />
        <Button
          icon={<SyncOutlined />}
          onClick={fetchReferences}
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
              {loading ? 'Loading...' : 'No references found'}
            </div>
          ),
        }}
      />
    </div>
  );
};

export default ReferenceList;