"use client";

import { useState, useRef } from "react";
import { Table } from "antd";
import { SaveOutlined, PrinterOutlined } from "@ant-design/icons";

const teachers = [
  { id: "2", name: "Shivam Verma (9002)" },
  { id: "5", name: "Jason Sharlton (90006)" },
  { id: "10", name: "Albert Thomas (54545454)" },
];

const teacherTimeTableData = {
  2: {
    Monday: [
      {
        class: "Class 1(A)",
        subject: "English (210)",
        timeFrom: "09:00 AM",
        timeTo: "09:40 AM",
        roomNo: "120",
      },
      {
        class: "Class 3(A)",
        subject: "English (210)",
        timeFrom: "09:30 AM",
        timeTo: "10:10 AM",
        roomNo: "115",
      },
    ],
    Tuesday: [
      {
        class: "Class 2(A)",
        subject: "Mathematics (110)",
        timeFrom: "10:10 AM",
        timeTo: "10:50 AM",
        roomNo: "125G",
      },
    ],
  },
};

const TeacherTimeTable = () => {
  const [selectedTeacher, setSelectedTeacher] = useState("2");
  const timetable = teacherTimeTableData[selectedTeacher] || {};
  const tableRef = useRef(null);

  const columns = [
    {
      title: "Day",
      dataIndex: "day",
      key: "day",
    },
    {
      title: "Class",
      dataIndex: "class",
      key: "class",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Room No.",
      dataIndex: "roomNo",
      key: "roomNo",
    },
  ];

  const dataSource = Object.keys(timetable).flatMap((day) =>
    timetable[day].map((entry, index) => ({
      key: `${day}-${index}`,
      day,
      class: entry.class,
      subject: entry.subject,
      time: `${entry.timeFrom} - ${entry.timeTo}`,
      roomNo: entry.roomNo,
    }))
  );

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write("<html><head><title>Teacher Timetable</title>");
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
    <div className="m-5 p-5 bg-white shadow-md rounded-lg border border-gray-300">
      <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
        <SaveOutlined /> Teacher Time Table
      </h3>

      <div className="flex items-center gap-4 mb-4">
        <label className="font-medium">Select Teacher:</label>
        <select
          className="border px-3 py-2 rounded"
          value={selectedTeacher}
          onChange={(e) => setSelectedTeacher(e.target.value)}
        >
          {teachers.map((teacher) => (
            <option key={teacher.id} value={teacher.id}>
              {teacher.name}
            </option>
          ))}
        </select>
      </div>

      <div ref={tableRef}>
        <Table columns={columns} dataSource={dataSource} pagination={false} />
      </div>

      <div className="mt-4 flex justify-end gap-4">
        <button
          onClick={handlePrint}
          style={{ backgroundColor: "#164f63" }}
          className="hover:bg-teal-700 text-white font-bold px-4 py-2 rounded flex items-center"
        >
          <PrinterOutlined className="mr-2" /> Print
        </button>
      </div>
    </div>
  );
};

export default TeacherTimeTable;
