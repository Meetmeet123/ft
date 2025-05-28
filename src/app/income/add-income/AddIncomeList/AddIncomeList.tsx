'use client';
import React, { useState, useEffect } from "react";
import { Table, Button, Input, message } from "antd";
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

interface IncomeItem {
  id: number;
  inc_head_id: string;
  name: string;
  invoice_no: string;
  date: string;
  amount: number;
  note: string;
  documents: string | null;
  is_active: string;
  is_deleted: string;
  created_at: string;
  updated_at: string;
}

const AddIncomeList = ({ refreshTrigger, onEditIncome }: {
  refreshTrigger: boolean;
  onEditIncome: (income: IncomeItem) => void;
}) => {
  const [incomeData, setIncomeData] = useState<IncomeItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    fetchIncomeData();
  }, [refreshTrigger]);

  const fetchIncomeData = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/income');
      if (!response.ok) {
        throw new Error('Failed to fetch income data');
      }
      const data = await response.json();
      setIncomeData(data.incomelist || []);
    } catch (error) {
      message.error("Failed to fetch income data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this income record?")) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/income/${id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete income');
        }
        
        message.success("Income record deleted successfully");
        fetchIncomeData();
      } catch (error) {
        message.error("Failed to delete income record");
        console.error(error);
      }
    }
  };

  const filteredData = incomeData.filter((income) =>
    income.name.toLowerCase().includes(searchText.toLowerCase()) ||
    income.invoice_no.toLowerCase().includes(searchText.toLowerCase())
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
    },
    {
      title: "Description",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Invoice Number",
      dataIndex: "invoice_no",
      key: "invoice_no",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Income Head",
      dataIndex: "inc_head_id",
      key: "inc_head_id",
      render: (id: string) => {
        switch(id) {
          case '1': return 'School Fees';
          case '2': return 'Donation';
          case '3': return 'Other';
          default: return id;
        }
      }
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => `$${amount.toFixed(2)}`,
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: IncomeItem) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button icon={<MenuOutlined />} />
          {record.documents && <Button icon={<DownloadOutlined />} href={record.documents} />}
          <Button 
            icon={<EditOutlined />} 
            onClick={() => onEditIncome(record)}
          />
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

  const totalItems = filteredData.length;

  return (
    <div className="w-full">
      <Input
        placeholder="Search by name or invoice number..."
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