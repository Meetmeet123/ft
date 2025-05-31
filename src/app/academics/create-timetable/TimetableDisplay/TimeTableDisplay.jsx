"use client";

import React, { useState } from 'react';
import { Table } from "antd";
import { SaveOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";

const timetableData = {
  Monday: [],
  Tuesday: [],
  Wednesday: [],
  Thursday: [],
  Friday: [],
  Saturday: [],
  Sunday: [],
};

const subjects = [
  { id: "110", name: "English (210)" },
  { id: "111", name: "Hindi (230)" },
  { id: "112", name: "Mathematics (110)" },
  { id: "113", name: "Science (111)" },
  { id: "114", name: "Social Studies (212)" },
];
const teachers = [
  { id: "2", name: "Shivam Verma (9002)" },
  { id: "5", name: "Jason Sharlton (90006)" },
  { id: "10", name: "Albert Thomas (54545454)" },
];

const TimeTable = () => {
  const [entries, setEntries] = useState(timetableData);
  const [activeDay, setActiveDay] = useState("Monday");

  const addRow = () => {
    setEntries({
      ...entries,
      [activeDay]: [
        ...entries[activeDay],
        { subject: "", teacher: "", time_from: "", time_to: "", room_no: "" },
      ],
    });
  };

  const saveTable = () => {
    localStorage.setItem("savedTimeTable", JSON.stringify(entries));
    console.log("TimeTable Saved:", entries);
  };

  const updateRow = (index, field, value) => {
    const updatedEntries = entries[activeDay].map((entry, i) =>
      i === index ? { ...entry, [field]: value } : entry
    );
    setEntries({ ...entries, [activeDay]: updatedEntries });
    saveTable();
  };

  const columns = [
    {
      title: "Subject",
      dataIndex: "subject",
      render: (value, _, index) => (
        <select
          className="w-full p-2 border rounded-md"
          onChange={(e) => updateRow(index, "subject", e.target.value)}
          value={value}
        >
          <option value="">Select</option>
          {subjects.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      ),
    },
    {
      title: "Teacher",
      dataIndex: "teacher",
      render: (value, _, index) => (
        <select
          className="w-full p-2 border rounded-md"
          onChange={(e) => updateRow(index, "teacher", e.target.value)}
          value={value}
        >
          <option value="">Select</option>
          {teachers.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      ),
    },
    {
      title: "Time From",
      dataIndex: "time_from",
      render: (value, _, index) => (
        <input
          type="time"
          className="w-full p-2 border rounded-md"
          value={value}
          onChange={(e) => updateRow(index, "time_from", e.target.value)}
        />
      ),
    },
    {
      title: "Time To",
      dataIndex: "time_to",
      render: (value, _, index) => (
        <input
          type="time"
          className="w-full p-2 border rounded-md"
          value={value}
          onChange={(e) => updateRow(index, "time_to", e.target.value)}
        />
      ),
    },
    {
      title: "Room No.",
      dataIndex: "room_no",
      render: (value, _, index) => (
        <input
          type="text"
          className="w-full p-2 border rounded-md"
          value={value}
          onChange={(e) => updateRow(index, "room_no", e.target.value)}
        />
      ),
    },
    {
      title: "Action",
      render: (_, __, index) => (
        <button
          className="text-red-500"
          onClick={() =>
            setEntries({
              ...entries,
              [activeDay]: entries[activeDay].filter((_, i) => i !== index),
            })
          }
        >
          <DeleteOutlined />
        </button>
      ),
    },
  ];

  return (
    <div className="ml-5 mt-5 bg-white shadow-md rounded-lg p-4 border border-gray-300">
      <div className="flex gap-2 mb-4 border-b pb-2">
        {Object.keys(entries).map((day) => (
          <button
            key={day}
            style={{
              backgroundColor:
                activeDay === day ? "#164f63" : "var(--color-gray-200)",
            }}
            className={`px-3 py-1 rounded-md ${
              activeDay === day ? " text-white" : " hover:bg-gray-300"
            }`}
            onClick={() => setActiveDay(day)}
          >
            {day}
          </button>
        ))}
      </div>
      <Table
        columns={columns}
        dataSource={entries[activeDay]}
        pagination={false}
        rowKey={(record) =>
          `${record.subject}-${record.teacher}-${record.time_from}-${record.time_to}-${record.room_no}`
        }
      />
      <div className="mt-4 flex justify-start gap-5">
        <button
          style={{ backgroundColor: "#164f63" }}
          className=" hover:bg-teal-700 text-white font-bold px-4 py-2 rounded flex items-center"
          onClick={addRow}
        >
          <PlusOutlined className="mr-2" /> Add Row
        </button>
        <button
          style={{ backgroundColor: "var(--color-green-500)" }}
          className=" hover:bg-green-700 text-white font-bold px-4 py-2 rounded flex items-center"
          onClick={saveTable}
        >
          <SaveOutlined className="mr-2" /> Save Table
        </button>
      </div>
    </div>
  );
};

export default TimeTable;
