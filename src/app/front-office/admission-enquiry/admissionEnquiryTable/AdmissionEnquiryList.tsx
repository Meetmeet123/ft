"use client";
import React, { useState, useEffect } from "react";
import { Table, Button, Input, Modal, message, Tag } from "antd";
import {
  FileExcelOutlined,
  FilePdfOutlined,
  FileTextOutlined,
  PrinterOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import axios from "axios";
// import AdmissionEnquiryForm from "./AdmissionEnquiryForm";

interface EnquiryData {
  id: number;
  name: string;
  contact: string;
  address: string;
  reference: string;
  date: string;
  description: string;
  follow_up_date: string;
  note: string;
  source: string;
  email: string;
  assigned: string;
  class: {
    id: number;
    class: string;
  };
  no_of_child: number;
  status: string;
}

const AdmissionEnquiryList = () => {
  const [data, setData] = useState<EnquiryData[]>([]);
  const [filteredData, setFilteredData] = useState<EnquiryData[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<EnquiryData | null>(null);
  const pageSize = 5;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://school2025.dolittletech.co.in/api/enquiry"
      );
      setData(response.data.data || []);
      setFilteredData(response.data.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchData: EnquiryData[]) => {
    setFilteredData(searchData);
    setCurrentPage(1);
  };

  const handleDelete = async (id: number) => {
    Modal.confirm({
      title: "Delete Confirm",
      content: "Are you sure you want to delete this enquiry?",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await axios.delete(
            `https://school2025.dolittletech.co.in/api/enquiry/${id}`
          );
          message.success("Enquiry deleted successfully");
          fetchData();
        } catch (error) {
          console.error("Error deleting enquiry:", error);
          message.error("Failed to delete enquiry");
        }
      },
    });
  };

  const handleEdit = (record: EnquiryData) => {
    setEditingRecord(record);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingRecord(null);
    setIsModalOpen(true);
  };

  const handleFormSuccess = () => {
    setIsModalOpen(false);
    fetchData();
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
      ellipsis: true,
    },
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
      render: (source: string) => (
        <Tag color={source === "NewsPaper" ? "blue" : "green"}>{source}</Tag>
      ),
    },
    {
      title: "Class",
      dataIndex: "class",
      key: "class",
      render: (classData: { class: string }) => classData?.class || "-",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "active" ? "green" : "red"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: EnquiryData) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.id)}
          />
        </div>
      ),
      width: 120,
    },
  ];

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Search by name..."
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            if (e.target.value === "") {
              setFilteredData(data);
            } else {
              setFilteredData(
                data.filter((item) =>
                  item.name.toLowerCase().includes(e.target.value.toLowerCase())
                )
              );
            }
          }}
          style={{ width: "300px", minWidth: "200px" }}
        />
        <div className="flex gap-2">
          <Button icon={<PlusOutlined />} type="primary" onClick={handleAddNew}>
            Add New
          </Button>
          <Button icon={<FileTextOutlined />} />
          <Button icon={<FileExcelOutlined />} />
          <Button icon={<FilePdfOutlined />} />
          <Button icon={<PrinterOutlined />} />
        </div>
      </div>

      <Table
        dataSource={paginatedData}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: filteredData.length,
          onChange: (page) => setCurrentPage(page),
        }}
        scroll={{ x: "max-content" }}
        locale={{
          emptyText: (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="text-gray-500 mb-4">
                No data available in table
              </div>
              <div className="text-green-600 flex items-center gap-2">
                <span>←</span> Add a new record or search with different
                criteria.
              </div>
            </div>
          ),
        }}
      />

      <Modal
        title={editingRecord ? "Edit Enquiry" : "Add New Enquiry"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={800}
        destroyOnClose
      >
       
      </Modal>
    </div>
  );
};

export default AdmissionEnquiryList;