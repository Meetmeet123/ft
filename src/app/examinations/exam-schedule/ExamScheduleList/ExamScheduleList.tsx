import React, { useState } from "react";
import { Table, Button, Input } from "antd";
import {
  FileExcelOutlined,
  FilePdfOutlined,
  FileTextOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import "antd/dist/reset.css";

interface ExamSchedule {
  id: number;
  subject: string;
  dateFrom: string;
  startTime: string;
  duration: string;
  roomNo: string;
  marksMax: number;
  marksMin: number;
}

const examSchedules: ExamSchedule[] = []; // Empty array to simulate "No data available"

const ExamScheduleList = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Number of items per page

  const filteredSchedules = examSchedules.filter((schedule: any) =>
    schedule.subject?.toLowerCase().includes(searchText.toLowerCase())
  );

  const paginatedData = filteredSchedules.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const columns = [
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Date From",
      dataIndex: "dateFrom",
      key: "dateFrom",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Room No",
      dataIndex: "roomNo",
      key: "roomNo",
    },
    {
      title: "Marks (Max...)",
      dataIndex: "marksMax",
      key: "marksMax",
    },
    {
      title: "Marks (Min...)",
      dataIndex: "marksMin",
      key: "marksMin",
    },
  ];

  const totalItems = filteredSchedules.length;

  return (
    <div className="w-full">
      <Input
        placeholder="Search..."
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
        locale={{
          emptyText: (
            <div className="flex flex-col items-center justify-center py-8">
              {/* <img
                src={nodata}
                alt="No data illustration"
                className="mb-4"
                width={200}
              /> */}
              <p className="text-gray-500">No data available in table</p>
              <a
                href="#"
                className="text-green-600 mt-2 flex items-center gap-2 hover:underline"
              >
                <span className="text-lg">←</span> Add new record or search with
                different criteria.
              </a>
            </div>
          ),
        }}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: totalItems,
          onChange: (page) => setCurrentPage(page),
          showTotal: (total, range) =>
            `Record: ${range[0]} to ${range[1]} of ${total}`,
        }}
      />
    </div>
  );
};

export default ExamScheduleList;