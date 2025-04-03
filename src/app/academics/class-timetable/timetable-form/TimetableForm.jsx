"use client";

import {
  PlusOutlined,
  SearchOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import { Table } from "antd";
import { useRef } from "react";

const timetableData = [
  {
    key: "monday",
    day: "Monday",
    schedule: [
      {
        subject: "English (210)",
        time: "9:30 AM - 10:10 AM",
        teacher: "Shivam Verma (9002)",
        room: "110",
      },
      {
        subject: "Mathematics (110)",
        time: "10:10 AM - 10:50 AM",
        teacher: "Jason Sharlton (90006)",
        room: "110",
      },
      {
        subject: "Science (111)",
        time: "10:50 AM - 11:30 AM",
        teacher: "Shivam Verma (9002)",
        room: "110",
      },
      {
        subject: "Hindi (230)",
        time: "12:10 PM - 12:50 PM",
        teacher: "Jason Sharlton (90006)",
        room: "110",
      },
    ],
  },
  {
    key: "tuesday",
    day: "Tuesday",
    schedule: [
      {
        subject: "Hindi (230)",
        time: "9:30 AM - 10:10 AM",
        teacher: "Jason Sharlton (90006)",
        room: "110",
      },
      {
        subject: "Mathematics (110)",
        time: "10:10 AM - 10:50 AM",
        teacher: "Shivam Verma (9002)",
        room: "110",
      },
      {
        subject: "English (210)",
        time: "10:50 AM - 11:30 AM",
        teacher: "Jason Sharlton (90006)",
        room: "110",
      },
      {
        subject: "Social Studies (212)",
        time: "12:10 PM - 12:50 PM",
        teacher: "Shivam Verma (9002)",
        room: "110",
      },
    ],
  },
];

const columns = [
  {
    title: "Day",
    dataIndex: "day",
    key: "day",
  },
  {
    title: "Schedule",
    dataIndex: "schedule",
    key: "schedule",
    render: (schedule) => (
      <div>
        {schedule.map((entry, index) => (
          <div key={index} className="border-b py-2">
            <p>
              <strong>{entry.subject}</strong>
            </p>
            <p>{entry.time}</p>
            <p>{entry.teacher}</p>
            <p>{entry.room}</p>
          </div>
        ))}
      </div>
    ),
  },
];

const Header = () => {
  const tableRef = useRef(null);

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write("<html><head><title>Timetable</title>");
    printWindow.document.write("<style>");
    printWindow.document.write(
      "table { width: 100%; border-collapse: collapse; } th, td { border: 1px solid black; padding: 8px; text-align: left; } "
    );
    printWindow.document.write("</style>");
    printWindow.document.write("</head><body>");
    printWindow.document.write(tableRef.current.innerHTML);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="ml-5 mt-5">
      <div className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 border border-gray-300">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <SearchOutlined /> Select Criteria
        </h3>
        <a
          href="create-timetable"
          className="bg-[#164f63] hover:bg-teal-700 text-white font-bold px-4 py-2 rounded flex items-center"
        >
          <PlusOutlined className="mr-2" /> Add
        </a>
      </div>
      <div className="flex justify-end mt-4">
        <button
          style={{ backgroundColor: "#164f63" }}
          className=" hover:bg-teal-700 text-white font-bold px-4 py-2 rounded mr-5 flex items-center"
        >
          <SearchOutlined className="mr-2" /> Search
        </button>
      </div>
      <div className="mt-5 bg-white shadow-md rounded-lg p-4">
        <button
          onClick={handlePrint}
          style={{ backgroundColor: "#164f63" }}
          className=" hover:bg-teal-700 text-white font-bold px-4 py-2 mb-5 rounded flex items-center"
        >
          <PrinterOutlined className="mr-2" /> Print
        </button>
        <div ref={tableRef}>
          <Table
            columns={columns}
            dataSource={timetableData}
            pagination={false}
            bordered
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
