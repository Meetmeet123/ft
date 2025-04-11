"use client";
import React, { useState } from "react";
import { Table } from "antd";

const AttendanceForm = () => {
  const [attendanceData, setAttendanceData] = useState([
    {
      id: 1,
      staffId: "9001",
      name: "John Doe",
      role: "Admin",
      status: "Present",
      date: "2025-03-31",
      source: "Manual",
      entryTime: "09:00 AM",
      exitTime: "05:00 PM",
      note: "",
    },
    {
      id: 2,
      staffId: "9002",
      name: "Jane Smith",
      role: "Teacher",
      status: "Late",
      date: "2025-03-31",
      source: "Manual",
      entryTime: "09:30 AM",
      exitTime: "05:00 PM",
      note: "Traffic delay",
    },
    {
      id: 3,
      staffId: "9003",
      name: "William Abbot",
      role: "Admin",
      status: "Absent",
      date: "2025-03-31",
      source: "Manual",
      entryTime: "",
      exitTime: "",
      note: "Sick leave",
    },
    {
      id: 4,
      staffId: "9004",
      name: "Emily Johnson",
      role: "Staff",
      status: "Half Day",
      date: "2025-03-31",
      source: "Manual",
      entryTime: "09:00 AM",
      exitTime: "01:00 PM",
      note: "Personal work",
    },
    {
      id: 5,
      staffId: "9005",
      name: "Michael Brown",
      role: "Teacher",
      status: "Holiday",
      date: "2025-03-31",
      source: "Manual",
      entryTime: "",
      exitTime: "",
      note: "Public holiday",
    },
  ]);

  const handleAttendanceChange = (id, key, value) => {
    setAttendanceData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, [key]: value } : item
      )
    );
  };

  const columns = [
    { title: "Staff ID", dataIndex: "staffId", key: "staffId" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Role", dataIndex: "role", key: "role" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Source", dataIndex: "source", key: "source" },
    {
      title: "Entry Time",
      dataIndex: "entryTime",
      key: "entryTime",
      render: (text, record) => (
        <input
          type="time"
          value={record.entryTime}
          onChange={(e) =>
            handleAttendanceChange(record.id, "entryTime", e.target.value)
          }
        />
      ),
    },
    {
      title: "Exit Time",
      dataIndex: "exitTime",
      key: "exitTime",
      render: (text, record) => (
        <input
          type="time"
          value={record.exitTime}
          onChange={(e) =>
            handleAttendanceChange(record.id, "exitTime", e.target.value)
          }
        />
      ),
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
      render: (text, record) => (
        <input
          type="text"
          value={record.note}
          onChange={(e) =>
            handleAttendanceChange(record.id, "note", e.target.value)
          }
        />
      ),
    },
    {
      title: "Attendance",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <div className="flex gap-2">
          {["Present", "Late", "Absent", "Half Day", "Holiday"].map(
            (option) => (
              <label key={option} className="flex items-center gap-1">
                <input
                  type="radio"
                  name={`attendance-${record.id}`}
                  value={option}
                  checked={record.status === option}
                  onChange={() =>
                    handleAttendanceChange(record.id, "status", option)
                  }
                />
                {option}
              </label>
            )
          )}
        </div>
      ),
    },
  ];

  return (
    <form className="bg-white p-6 mt-5 shadow-md rounded-md">
      <h3 className="text-lg font-semibold mb-4">Staff Attendance</h3>
      <div className="mb-4 p-4 bg-gray-100 rounded">
        <label className="font-medium">Set attendance for all Staff as: </label>
        <div className="flex gap-4 mt-2">
          {[
            "Present",
            "Late",
            "Absent",
            "Half Day",
            "Holiday",
            "Half Day Second Shift",
          ].map((option, index) => (
            <label key={index} className="flex items-center gap-1">
              <input
                type="radio"
                name="attendencetype"
                value={option}
                onClick={() => console.log(`Setting all to ${option}`)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          type="submit"
          style={{ backgroundColor: "#164f63" }}
          className=" text-white px-4 py-2 rounded hover:bg-teal-700"
        >
          Save Attendance
        </button>
      </div>
      <Table
        dataSource={attendanceData}
        columns={columns}
        rowKey="id"
        pagination={false}
      />
    </form>
  );
};

export default AttendanceForm;
