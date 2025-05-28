import React, { useState, useEffect } from "react";
import { Table, Button, Input, message, Spin } from "antd";
import {
  FileExcelOutlined,
  FilePdfOutlined,
  FileTextOutlined,
  PrinterOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import "antd/dist/reset.css";

interface IncomeHeadType {
  id: number;
  income_category: string;
  description: string;
  is_active: string;
}

interface IncomeHeadListProps {
  refreshList: boolean;
  setRefreshList: React.Dispatch<React.SetStateAction<boolean>>;
  setEditData: React.Dispatch<React.SetStateAction<any>>;
}

const IncomeHeadList: React.FC<IncomeHeadListProps> = ({ 
  refreshList, 
  setRefreshList, 
  setEditData 
}) => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [incomeHeads, setIncomeHeads] = useState<IncomeHeadType[]>([]);
  const [loading, setLoading] = useState(false);
  const pageSize = 5;

  useEffect(() => {
    const fetchIncomeHeads = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://127.0.0.1:8000/api/incomehead");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        if (data.categorylist && Array.isArray(data.categorylist)) {
          setIncomeHeads(data.categorylist);
        } else {
          setIncomeHeads([]);
        }
      } catch (error) {
        message.error("Failed to fetch income heads");
        console.error("Error fetching income heads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIncomeHeads();
  }, [refreshList]);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/incomehead/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        message.success("Income head deleted successfully");
        setRefreshList(prev => !prev);
      } else {
        message.error(data.message || "Failed to delete income head");
      }
    } catch (error) {
      message.error("Error deleting income head");
      console.error("Error:", error);
    }
  };

  const filteredIncomeHeads = incomeHeads.filter((item) =>
    item.income_category.toLowerCase().includes(searchText.toLowerCase())
  );

  const paginatedData = filteredIncomeHeads.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const columns = [
    {
      title: "Income Head",
      dataIndex: "income_category",
      key: "income_category",
      ellipsis: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "is_active",
      key: "is_active",
      render: (is_active: string) => (
        <span style={{ color: is_active === "yes" ? "green" : "red" }}>
          {is_active === "yes" ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: IncomeHeadType) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button 
            icon={<EditOutlined />} 
            onClick={() => setEditData(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => {
              if (window.confirm("Are you sure you want to delete this income head?")) {
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
    <div className="w-full border-[#164f63]/60 shadow-gray-300 rounded-2xl">
      <div className="flex justify-between mb-4">
        <Input
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: "300px", minWidth: "200px" }}
        />
        <div className="flex gap-2">
          <Button icon={<FileTextOutlined />} />
          <Button icon={<FileExcelOutlined />} />
          <Button icon={<FilePdfOutlined />} />
          <Button icon={<PrinterOutlined />} />
        </div>
      </div>
      <Spin spinning={loading}>
        <Table
          dataSource={paginatedData}
          columns={columns}
          rowKey="id"
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: filteredIncomeHeads.length,
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
      </Spin>
    </div>
  );
};

export default IncomeHeadList;