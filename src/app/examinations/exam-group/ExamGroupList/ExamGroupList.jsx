"use client";

import { useState, useRef } from "react";
import { Table } from "antd";
import {
  SaveOutlined,
  PrinterOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

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
    { title: "Day", dataIndex: "day", key: "day" },
    { title: "Class", dataIndex: "class", key: "class" },
    { title: "Subject", dataIndex: "subject", key: "subject" },
    { title: "Time", dataIndex: "time", key: "time" },
    { title: "Room No.", dataIndex: "roomNo", key: "roomNo" },
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

  const handleExportCSV = () => {
    const csvContent = [
      ["Day", "Class", "Subject", "Time", "Room No."],
      ...dataSource.map(({ day, class: className, subject, time, roomNo }) => [
        day,
        className,
        subject,
        time,
        roomNo,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "timetable.csv";
    link.click();
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dataSource);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Timetable");
    XLSX.writeFile(workbook, "timetable.xlsx");
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      columns: columns.map((col) => ({ header: col.title, dataKey: col.key })),
      body: dataSource,
    });
    doc.save("timetable.pdf");
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

      <div className="flex gap-2 mb-4 mt-4">
        <button
          style={{ fontSize: "24px" }}
          className="text-green-600 hover:text-green-800"
          onClick={handleExportExcel}
        >
          <FileExcelOutlined />
        </button>
        <button
          style={{ fontSize: "24px" }}
          className="text-gray-600 hover:text-gray-800"
          onClick={handleExportCSV}
        >
          <FileTextOutlined />
        </button>
        <button
          style={{ fontSize: "24px" }}
          className="text-red-600 hover:text-red-800"
          onClick={handleExportPDF}
        >
          <FilePdfOutlined />
        </button>
        <button
          style={{ fontSize: "24px" }}
          className="text-gray-600 hover:text-gray-800"
          onClick={handlePrint}
        >
          <PrinterOutlined />
        </button>
      </div>

      <div ref={tableRef}>
        <Table columns={columns} dataSource={dataSource} pagination={false} />
      </div>
    </div>
  );
};

export default TeacherTimeTable;
