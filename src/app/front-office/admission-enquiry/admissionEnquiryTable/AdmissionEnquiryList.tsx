import React, { useState } from "react";
import { Table, Button, Input } from "antd";
import {
  FileExcelOutlined,
  FilePdfOutlined,
  FileTextOutlined,
  PrinterOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import "antd/dist/reset.css";

const enquiries = [
  {
    id: 1,
    name: "Mayur m",
    phone: "7879789789",
    source: "NewsPaper",
    enquiryDate: "15-08-2024",
    lastFollowUpDate: "",
    nextFollowUpDate: "17-08-2024",
    status: "Active",
  },
  // Add more enquiry data if needed for pagination to be meaningful
];

const AdmissionEnquiryList = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Number of items per page

  const filteredEnquiries = enquiries.filter((enquiry) =>
    enquiry.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const paginatedData = filteredEnquiries.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ellipsis: true, // Allow text to truncate with ellipsis if too long
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      ellipsis: true,
    },
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
      ellipsis: true,
    },
    {
      title: "Enquiry Date",
      dataIndex: "enquiryDate",
      key: "enquiryDate",
      ellipsis: true,
    },
    {
      title: "Last Follow Up Date",
      dataIndex: "lastFollowUpDate",
      key: "lastFollowUpDate",
      ellipsis: true,
    },
    {
      title: "Next Follow Up Date",
      dataIndex: "nextFollowUpDate",
      key: "nextFollowUpDate",
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      ellipsis: true,
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button icon={<PhoneOutlined />} href={`tel:${record.phone}`} />
          <Button icon={<EditOutlined />} href={``} />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => {
              if (window.confirm("Delete Confirm?")) {
                // Handle delete action here
                console.log(`Deleted enquiry with id: ${record.id}`);
              }
            }}
          />
        </div>
      ),
      width: 150, // Fixed width for the Action column to prevent it from shrinking too much
    },
  ];

  const totalItems = filteredEnquiries.length;

  return (
    <div className="p-6 w-full shadow-lg border-solid border-2 border-[#164f63]/60 shadow-gray-300 rounded-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-extrabold">Admission Enquiry List</h3>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          href={``}
          style={{ backgroundColor: "var(--color-teal-500)", border: "none" }}
        >
          Add
        </Button>
      </div>
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
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: totalItems,
          onChange: (page) => setCurrentPage(page),
        }}
        rowClassName={() => "bg-pink-50"}
        scroll={{ x: "max-content" }} // Enable horizontal scrolling if the table is too wide
      />
    </div>
  );
};

export default AdmissionEnquiryList;