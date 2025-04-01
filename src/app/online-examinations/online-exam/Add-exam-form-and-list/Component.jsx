"use client";
import { useRef, useState } from "react";
import { Table } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CopyOutlined,
  FileExcelOutlined,
  FileTextOutlined,
  PrinterOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const initialExams = [
  {
    id: 1,
    name: "Science Quiz",
    description: "A general science quiz for students.",
    quiz: true,
    questions: 7,
    attempt: 10,
    from: "03/25/2025 12:30 PM",
    to: "03/31/2025 05:00 PM",
    duration: "01:30:00",
    published: true,
    resultPublished: false,
    completed: false,
  },
  {
    id: 2,
    name: "Math Final Exam",
    description: "Comprehensive final exam covering all topics.",
    quiz: false,
    questions: 10,
    attempt: 1,
    from: "02/10/2025 10:00 AM",
    to: "02/10/2025 12:00 PM",
    duration: "02:00:00",
    published: true,
    resultPublished: true,
    completed: true,
  },
];

export default function OnlineExamList() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [exams, setExams] = useState(initialExams);
  const [editExam, setEditExam] = useState(null);
  const [examData, setExamData] = useState({});
  const [selectedExams, setSelectedExams] = useState([]);
  const [showAddExam, setShowAddExam] = useState(false);
  const [newExam, setNewExam] = useState({
    name: "",
    description: "",
    quiz: false,
    questions: 0,
    attempt: 0,
    from: "",
    to: "",
    duration: "",
    published: false,
    resultPublished: false,
  });

  const handleCopy = () => {
    const tableText = exams
      .map(
        (s) =>
          `${s.name}, ${s.quiz},${s.questions},${s.attempt} ,${s.from},${s.to},${s.duration},${s.published},${s.resultPublished},${s.description}`
      )
      .join("\n");
    navigator.clipboard.writeText(tableText);
    alert("Table copied to clipboard!");
  };

  const handleExportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        "Exam",
        "Quiz",
        "Questions",
        "Attempt",
        "Exam From",
        "Exam to",
        "Duration",
        "Exam Published",
        "Result Published",
        "description",
      ]
        .concat(
          exams.map(
            (s) =>
              `${s.name}, ${s.quiz},${s.questions},${s.attempt} ,${s.from},${s.to},${s.duration},${s.published},${s.resultPublished}`
          )
        )
        .join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "exams.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(exams);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "exams");
    XLSX.writeFile(workbook, "exams.xlsx");
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Subject List", 20, 10);

    autoTable(doc, {
      head: [
        [
          "Exam",
          "Quiz",
          "Questions",
          "Attempt",
          "Exam From",
          "Exam to",
          "Duration",
          "Exam Published",
          "Result Published",
          "description",
        ],
      ],
      body: exams.map((s) => [
        s.name,
        s.quiz,
        s.questions,
        s.attempt,
        s.from,
        s.to,
        s.duration,
        s.published,
        s.resultPublished,
        s.description,
      ]),
    });

    doc.save("exams.pdf");
  };

  const tableRef = useRef(null);

  const handlePrint = () => {
    // Create a full table for printing (without pagination)
    const tableHTML = `
    <html>
      <head>
        <title>Print exams</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; margin: 20px; }
          h2 { text-align: center; margin-bottom: 20px; }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 16px;
          }
          th, td {
            border: 1px solid black;
            padding: 10px;
            text-align: left;
          }
          th {
            background-color: #f4f4f4;
          }
        </style>
      </head>
      <body>
        <h2>Subject List</h2>
        <table>
          <thead>
            <tr>
              <th>Exam</th>
              <th>Quiz</th>
              <th>Questions</th><th>Attempt</th><th>Exam From</th><th>Exam to</th><th>Duration</th><th>Exam published</th>
              <th>Result published</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            ${exams
              .map(
                (subject) => `
                <tr>
                  <td>${subject.name}</td>
                  <td>${subject.quiz}</td>
                  <td>${subject.questions}</td>
                  <td>${subject.attempt}</td>
                  <td>${subject.from}</td>
                  <td>${subject.to}</td>
                  <td>${subject.duration}</td>
                  <td>${subject.published}</td>
                  <td>${subject.resultPublished}</td>
                  <td>${subject.description}</td>
                </tr>
              `
              )
              .join("")}
          </tbody>
        </table>
      </body>
    </html>
    `;

    const blob = new Blob([tableHTML], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const printWindow = window.open(url, "_blank");

    printWindow.onload = () => {
      printWindow.print();
      URL.revokeObjectURL(url);
    };
  };

  const handleAddExam = () => {
    setExams([...exams, { id: exams.length + 1, ...newExam }]);
    setShowAddExam(false);
    setNewExam({
      name: "",
      description: "",
      quiz: false,
      questions: 0,
      attempt: 0,
      from: "",
      to: "",
      duration: "",
      published: false,
      resultPublished: false,
    });
  };

  const handleDelete = (id) => {
    setExams(exams.filter((exam) => exam.id !== id));
  };

  const handleEdit = (exam) => {
    setEditExam(exam);
    setExamData(exam);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExamData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setExams(
      exams.map((exam) =>
        exam.id === editExam.id ? { ...exam, ...examData } : exam
      )
    );
    setEditExam(null);
  };

  const handleSelect = (id) => {
    setSelectedExams((prev) =>
      prev.includes(id) ? prev.filter((examId) => examId !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    setExams(exams.filter((exam) => !selectedExams.includes(exam.id)));
    setSelectedExams([]);
  };

  const filteredExams = exams.filter((exam) =>
    activeTab === "upcoming" ? !exam.completed : exam.completed
  );

  const columns = [
    activeTab === "completed"
      ? {
          title: "Select",
          dataIndex: "select",
          key: "select",
          render: (_, record) => (
            <input
              type="checkbox"
              style={{ color: "#164f63" }}
              checked={selectedExams.includes(record.id)}
              onChange={() => handleSelect(record.id)}
            />
          ),
        }
      : {},
    { title: "Exam", dataIndex: "name", key: "name" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Quiz",
      dataIndex: "quiz",
      key: "quiz",
      render: (_, record) => (
        <input
          type="checkbox"
          style={{ color: "#164f63" }}
          checked={record.quiz}
          disabled
        />
      ),
    },
    { title: "Questions", dataIndex: "questions", key: "questions" },
    { title: "Attempt", dataIndex: "attempt", key: "attempt" },
    { title: "Exam From", dataIndex: "from", key: "from" },
    { title: "Exam To", dataIndex: "to", key: "to" },
    { title: "Duration", dataIndex: "duration", key: "duration" },
    {
      title: "Exam Published",
      dataIndex: "published",
      key: "published",
      render: (_, record) => (
        <input
          style={{ color: "#164f63" }}
          type="checkbox"
          checked={record.published}
          disabled
        />
      ),
    },
    {
      title: "Result Published",
      dataIndex: "resultPublished",
      key: "resultPublished",
      render: (_, record) => (
        <input
          type="checkbox"
          style={{ color: "#164f63" }}
          checked={record.resultPublished}
          disabled
        />
      ),
    },
    ...(activeTab === "completed"
      ? []
      : [
          {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
              <div className="flex gap-2">
                <button
                  style={{ color: "blue" }}
                  onClick={() => handleEdit(record)}
                >
                  <EditOutlined />
                </button>
                <button
                  style={{ color: "red" }}
                  onClick={() => handleDelete(record.id)}
                >
                  <DeleteOutlined />
                </button>
              </div>
            ),
          },
        ]),
  ].filter((col) => Object.keys(col).length !== 0);

  return (
    <div
      style={{
        padding: "1.5rem",
        backgroundColor: "white",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        borderRadius: "8px",
      }}
      className="mt-5"
    >
      <div className="flex justify-between items-center border-b pb-4">
        <h3 className="text-lg font-semibold">Online Exam List</h3>
        <button
          onClick={() => setShowAddExam(true)}
          className="btn btn-primary btn-sm flex items-center gap-1"
        >
          <PlusOutlined /> Add Exam
        </button>
      </div>

      <div className="mt-4 flex gap-4 border-b pb-2">
        <button
          style={{
            backgroundColor: activeTab === "upcoming" ? "#164f63" : "#e5e7eb",
            color: activeTab === "upcoming" ? "white" : "black",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
          }}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming Exams
        </button>
        <button
          style={{
            backgroundColor: activeTab === "completed" ? "#164f63" : "#e5e7eb",
            color: activeTab === "completed" ? "white" : "black",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
          }}
          onClick={() => setActiveTab("completed")}
        >
          Completed Exams
        </button>
      </div>

      {editExam && (
        <div className="mt-4 p-4 border rounded">
          <h4>Edit Exam</h4>
          {Object.keys(editExam).map((key) => (
            <div key={key} className="mb-2">
              <label className="block text-sm font-medium">{key}</label>
              <input
                type="text"
                name={key}
                value={examData[key] || ""}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>
          ))}
          <button
            style={{ backgroundColor: "#164f63" }}
            className=" text-white p-2 mt-2"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      )}

      {activeTab === "completed" && selectedExams.length > 0 && (
        <button
          style={{
            marginTop: "1rem",
            backgroundColor: "red",
            color: "white",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
          }}
          onClick={handleDeleteSelected}
        >
          Delete Selected Exams
        </button>
      )}

      {showAddExam && (
        <div className="mt-4 p-4 border rounded">
          <h4 className="text-lg font-semibold">Add New Exam</h4>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <input
              type="text"
              placeholder="Exam Name"
              className="border p-2 w-full"
              value={newExam.name}
              onChange={(e) => setNewExam({ ...newExam, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Questions"
              className="border p-2 w-full"
              value={newExam.questions}
              onChange={(e) =>
                setNewExam({ ...newExam, questions: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="description"
              className="border p-2 w-full"
              value={newExam.description}
              onChange={(e) =>
                setNewExam({ ...newExam, description: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Attempt"
              className="border p-2 w-full"
              value={newExam.attempt}
              onChange={(e) =>
                setNewExam({ ...newExam, attempt: e.target.value })
              }
            />
            <input
              type="datetime-local"
              className="border p-2 w-full"
              placeholder="From"
              value={newExam.from}
              onChange={(e) => setNewExam({ ...newExam, from: e.target.value })}
            />
            <input
              type="datetime-local"
              className="border p-2 w-full"
              placeholder="To"
              value={newExam.to}
              onChange={(e) => setNewExam({ ...newExam, to: e.target.value })}
            />
            <input
              type="time"
              step="1"
              className="border p-2 w-full"
              placeholder="Duration"
              value={newExam.duration}
              onChange={(e) =>
                setNewExam({ ...newExam, duration: e.target.value })
              }
            />
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={handleAddExam}
              style={{ backgroundColor: "#164f63" }}
              className=" text-white p-2 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setShowAddExam(false)}
              style={{ backgroundColor: "var(--color-gray-300)" }}
              className="p-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-2 mb-4 mt-4">
        <button
          style={{ fontSize: "24px" }}
          className="text-gray-600 hover:text-gray-800"
          onClick={handleCopy}
        >
          <CopyOutlined />
        </button>
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
        <Table
          dataSource={filteredExams}
          columns={columns}
          rowKey="id"
          className="mt-4"
        />
      </div>
    </div>
  );
}
