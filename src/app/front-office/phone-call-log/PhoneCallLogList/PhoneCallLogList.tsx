"use client";
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

const API_URL = "https://school2025.dolittletech.co.in/api/general-calls";

interface PhoneCallLog {
  id: number;
  name: string;
  contact: string;
  date: string;
  follow_up_date: string;
  call_type: string;
  [key: string]: any;
}

const PhoneCallLogList = ({ setEditData, refreshTrigger }: { setEditData: (data: any) => void, refreshTrigger: boolean }) => {
  const [phoneCallLogs, setPhoneCallLogs] = useState<PhoneCallLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // useEffect(() => {
  //   const fetchPhoneCallLogs = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await fetch(API_URL);
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const data = await response.json();
  //       setPhoneCallLogs(data);
  //     } catch (error) {
  //       message.error('Failed to fetch phone call logs');
  //       console.error('Error:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchPhoneCallLogs();
  // }, [refreshTrigger]);

  const handleDelete = async (id: number) => {
    // try {
    //   const response = await fetch(`${API_URL}/${id}`, {
    //     method: 'DELETE',
    //   });

    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }

    //   message.success('Record deleted successfully');
    //   setPhoneCallLogs(phoneCallLogs.filter(log => log.id !== id));
    // } catch (error) {
    //   message.error('Failed to delete record');
    //   console.error('Error:', error);
    // }
  };

  const filteredLogs = phoneCallLogs.filter((log) =>
    log.name.toLowerCase().includes(searchText.toLowerCase()) ||
    log.contact.toLowerCase().includes(searchText.toLowerCase())
  );

  const paginatedData = filteredLogs.slice(
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
      title: "Phone",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Next Follow Up Date",
      dataIndex: "follow_up_date",
      key: "follow_up_date",
      render: (date: string) => date ? new Date(date).toLocaleDateString() : '-',
    },
    {
      title: "Call Type",
      dataIndex: "call_type",
      key: "call_type",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: PhoneCallLog) => (
        <div className="flex gap-2">
          <Button 
            icon={<EditOutlined />} 
            onClick={() => setEditData(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => {
              if (confirm('Are you sure you want to delete this record?')) {
                handleDelete(record.id);
              }
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <div className="flex justify-between mb-4">
        <Input
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300 }}
        />
        <div className="flex gap-2">
          <Button icon={<FileTextOutlined />} />
          <Button icon={<FileExcelOutlined />} />
          <Button icon={<FilePdfOutlined />} />
          <Button icon={<PrinterOutlined />} />
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={paginatedData}
        rowKey="id"
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize,
          total: filteredLogs.length,
          onChange: (page) => setCurrentPage(page),
        }}
        scroll={{ x: 'max-content' }}
        locale={{
          emptyText: (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="text-gray-500 mb-4">No data available</div>
              <div className="text-green-600 flex items-center gap-2">
                <span>←</span> Add a new record
              </div>
            </div>
          ),
        }}
      />
    </div>
  );
};

export default PhoneCallLogList;