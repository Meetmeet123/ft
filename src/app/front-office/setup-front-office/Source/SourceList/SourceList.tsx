"use client";
import React, { useState, useEffect } from "react";
import { Table, Button, Input, message } from "antd";
import { EditOutlined, DeleteOutlined, SyncOutlined } from "@ant-design/icons";

interface Source {
  id: number;
  source: string;
  description: string;
}

interface SourceListProps {
  onEdit: (data: Source) => void;
  refreshKey: number;
}

const SourceList = ({ onEdit, refreshKey }: SourceListProps) => {
  const [sources, setSources] = useState<Source[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchSources();
  }, [refreshKey]);

  const fetchSources = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://school2025.dolittletech.co.in/api/sources"
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Handle different API response structures
      if (Array.isArray(data)) {
        setSources(data);
      } else if (data.data) {
        setSources(Array.isArray(data.data) ? data.data : [data.data]);
      } else {
        setSources([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      message.error("Failed to load sources");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(
        `https://school2025.dolittletech.co.in/api/sources/${id}`,
        { method: "DELETE" }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      message.success("Source deleted successfully");
      fetchSources(); // Refresh the list
    } catch (error) {
      console.error("Delete error:", error);
      message.error("Failed to delete source");
    }
  };

  const filteredData = sources.filter(source =>
    source.source.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'Source',
      dataIndex: 'source',
      key: 'source',
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
      render: (_: any, record: Source) => (
        <div className="flex gap-2">
          <Button
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => {
              if (confirm('Are you sure you want to delete this source?')) {
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
          placeholder="Search sources..."
          allowClear
          onChange={e => setSearchText(e.target.value)}
          style={{ width: 300 }}
        />
        <Button
          icon={<SyncOutlined />}
          onClick={fetchSources}
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
              {loading ? 'Loading...' : 'No sources found'}
            </div>
          ),
        }}
      />
    </div>
  );
};

export default SourceList;