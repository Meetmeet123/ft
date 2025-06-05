"use client";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { getStaffAttendance } from "../StaffAttendance";

const AttendanceForm = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const res = await getStaffAttendance();
        console.log(res.data);
        
        // Transform the backend data to match the expected format
        if (res.data && res.data.classlist) {
          const transformedData = res.data.classlist.map((staff, index) => ({
            id: staff.id,
            staffId: staff.id.toString(), // Using id as staffId
            name: staff.name,
            role: staff.name, // Using name as role since that's what the backend provides
            status: "Present", // Default status
            date: new Date().toISOString().split('T')[0], // Current date
            source: "Manual",
            entryTime: "",
            exitTime: "",
            note: "",
          }));
          setAttendanceData(transformedData);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAttendanceData();
  }, []);

  const handleAttendanceChange = (id, key, value) => {
    setAttendanceData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, [key]: value } : item
      )
    );
  };

  const handleSetAllAttendance = (status) => {
    setAttendanceData((prevData) =>
      prevData.map((item) => ({ ...item, status }))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Attendance data to save:", attendanceData);
    // Add your save logic here
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
    <form className="bg-white p-6 mt-5 shadow-md rounded-md overflow-x-auto" onSubmit={handleSubmit}>
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
                onChange={() => handleSetAllAttendance(option)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>
      <Table
        dataSource={attendanceData}
        columns={columns}
        rowKey="id"
        pagination={false}
        scroll={{ x: 1200 }}
      />
      <div className="flex justify-end mt-4">
        <button
          type="submit"
          style={{ backgroundColor: "#164f63" }}
          className="text-white px-4 py-2 rounded hover:bg-teal-700"
        >
          Save Attendance
        </button>
      </div>
    </form>
  );
};

export default AttendanceForm;