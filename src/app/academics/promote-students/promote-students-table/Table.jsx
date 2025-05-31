"use client";
import React, { useState } from 'react';
import { Table } from "antd";

const StudentList = () => {
  const students = [
    {
      id: 1,
      admissionNo: "18001",
      name: "Edward Thomas",
      fatherName: "Olivier Thomas",
      dob: "03/11/2014",
    },
    {
      id: 2,
      admissionNo: "18002",
      name: "Robin Peterson",
      fatherName: "Lucas Peterson",
      dob: "07/12/2013",
    },
    {
      id: 6,
      admissionNo: "18007",
      name: "Brian Kohlar",
      fatherName: "Nick Kohlar",
      dob: "01/05/2015",
    },
    {
      id: 7,
      admissionNo: "18004",
      name: "Laura Clinton",
      fatherName: "Michael Clinton",
      dob: "07/01/2015",
    },
  ];

  const [selectedStudents, setSelectedStudents] = useState([]);
  const [results, setResults] = useState({});
  const [nextSessionStatus, setNextSessionStatus] = useState({});

  const toggleSelectStudent = (id) => {
    setSelectedStudents((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const columns = [
    {
      title: "",
      dataIndex: "select",
      render: (_, record) => (
        <input
          type="checkbox"
          checked={selectedStudents.includes(record.id)}
          onChange={() => toggleSelectStudent(record.id)}
        />
      ),
    },
    {
      title: "Admission No",
      dataIndex: "admissionNo",
    },
    {
      title: "Student Name",
      dataIndex: "name",
    },
    {
      title: "Father Name",
      dataIndex: "fatherName",
    },
    {
      title: "Date of Birth",
      dataIndex: "dob",
    },
    {
      title: "Current Result",
      dataIndex: "result",
      render: (_, record) => (
        <>
          <label className="mr-2">
            <input
              type="radio"
              name={`result_${record.id}`}
              value="pass"
              checked={results[record.id] === "pass"}
              onChange={() => setResults({ ...results, [record.id]: "pass" })}
              className="mr-1"
            />
            Pass
          </label>
          <label>
            <input
              className="mr-1"
              type="radio"
              name={`result_${record.id}`}
              value="fail"
              checked={results[record.id] === "fail"}
              onChange={() => setResults({ ...results, [record.id]: "fail" })}
            />
            Fail
          </label>
        </>
      ),
    },
    {
      title: "Next Session Status",
      dataIndex: "nextSession",
      render: (_, record) => (
        <>
          <label className="mr-2">
            <input
              className="mr-1"
              type="radio"
              name={`next_working_${record.id}`}
              value="continue"
              checked={nextSessionStatus[record.id] === "continue"}
              onChange={() =>
                setNextSessionStatus({
                  ...nextSessionStatus,
                  [record.id]: "continue",
                })
              }
            />
            Continue
          </label>
          <label>
            <input
              className="mr-1"
              type="radio"
              name={`next_working_${record.id}`}
              value="leave"
              checked={nextSessionStatus[record.id] === "leave"}
              onChange={() =>
                setNextSessionStatus({
                  ...nextSessionStatus,
                  [record.id]: "leave",
                })
              }
            />
            Leave
          </label>
        </>
      ),
    },
  ];

  return (
    <section className="p-6 bg-gray-100 w-full">
      <div className="w-full bg-white shadow-md rounded-lg p-6">
        <h3 className="text-lg font-semibold flex items-center gap-2 border-b pb-3">
          <i className="fa fa-list"></i> Student List
        </h3>

        <Table
          columns={columns}
          dataSource={students}
          rowKey="id"
          pagination={false}
          className="w-full"
        />

        <div className="flex justify-end mt-6">
          <button
            style={{ backgroundColor: "#164f63" }}
            className=" text-white px-4 py-2 rounded hover:bg-teal-700"
            data-toggle="modal"
            data-target="#pramoteStudentModal"
          >
            Promote
          </button>
        </div>
      </div>
    </section>
  );
};

export default StudentList;
