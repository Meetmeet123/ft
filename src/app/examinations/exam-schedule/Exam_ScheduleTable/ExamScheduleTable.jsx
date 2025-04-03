import React, { useState } from "react";
import {
  CopyOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  FileTextOutlined,
  PrinterOutlined,
  SplitCellsOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import "antd/dist/reset.css";

const ExamScheduleTable = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const tableData = [
    {
      subject: "English (210)",
      date: "03/05/2025",
      time: "12:30:30",
      duration: 1,
      room: 12,
      maxMarks: 100,
      minMarks: 35,
    },
    {
      subject: "Hindi (230)",
      date: "03/08/2025",
      time: "12:30:30",
      duration: 1,
      room: 11,
      maxMarks: 100,
      minMarks: 35,
    },
    {
      subject: "Mathematics (110)",
      date: "03/10/2025",
      time: "12:30:30",
      duration: 1,
      room: 12,
      maxMarks: 100,
      minMarks: 35,
    },
    {
      subject: "Science (111)",
      date: "03/12/2025",
      time: "12:30:30",
      duration: 1,
      room: 11,
      maxMarks: 100,
      minMarks: 35,
    },
  ];

  const filteredData = tableData.filter((row) =>
    row.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full p-4 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <Button
            className="bg-gray-200 p-2 rounded hover:bg-gray-300"
            title="Copy"
            icon={<CopyOutlined />}
          />
          <Button
            className="bg-gray-200 p-2 rounded hover:bg-gray-300"
            title="Excel"
            icon={<FileExcelOutlined />}
          />
          <Button
            className="bg-gray-200 p-2 rounded hover:bg-gray-300"
            title="CSV"
            icon={<FileTextOutlined />}
          />
          <Button
            className="bg-gray-200 p-2 rounded hover:bg-gray-300"
            title="PDF"
            icon={<FilePdfOutlined />}
          />
          <Button
            className="bg-gray-200 p-2 rounded hover:bg-gray-300"
            title="Print"
            icon={<PrinterOutlined />}
          />
          <Button
            className="bg-gray-200 p-2 rounded hover:bg-gray-300"
            title="Columns"
            icon={<SplitCellsOutlined />}
          />
        </div>

        <input
          type="text"
          placeholder="Search..."
          className="p-2 border border-gray-300 rounded focus:ring focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredData.length === 0 ? (
        <div className="text-center p-6">
          <p className="text-gray-600">No data available in table</p>
          <img
            src="https://smart-school.in/ssappresource/images/addnewitem.svg"
            width="150"
            alt="No data"
            className="mx-auto my-4"
          />
          <p className="text-success font-bold">
            <i className="fa fa-arrow-left"></i> Add new record or search with
            different criteria.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Subject</th>
                <th className="border border-gray-300 p-2">Date From</th>
                <th className="border border-gray-300 p-2">Start Time</th>
                <th className="border border-gray-300 p-2">Duration</th>
                <th className="border border-gray-300 p-2">Room No.</th>
                <th className="border border-gray-300 p-2">Marks (Max.)</th>
                <th className="border border-gray-300 p-2">Marks (Min.)</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="border border-gray-300 p-2">{row.subject}</td>
                  <td className="border border-gray-300 p-2">{row.date}</td>
                  <td className="border border-gray-300 p-2">{row.time}</td>
                  <td className="border border-gray-300 p-2">{row.duration}</td>
                  <td className="border border-gray-300 p-2">{row.room}</td>
                  <td className="border border-gray-300 p-2">{row.maxMarks}</td>
                  <td className="border border-gray-300 p-2">{row.minMarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExamScheduleTable;
