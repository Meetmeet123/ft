"use client";
import { useRef, useState, useEffect } from "react";
import { Table, message } from "antd";
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

const API_URL = "http://127.0.0.1:8000/api/online-exams";

export default function OnlineExamList() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editExam, setEditExam] = useState(null);
  const [examData, setExamData] = useState({});
  const [selectedExams, setSelectedExams] = useState([]);
  const [showAddExam, setShowAddExam] = useState(false);
  const [newExam, setNewExam] = useState({
    exam: "",
    description: "",
    is_quiz: false,
    attempt: 0,
    exam_from: "",
    exam_to: "",
    duration: "",
    is_active: false,
    publish_result: false,
  });

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch exams");
      }
      const data = await response.json();
      setExams(data.questionList || []);
    } catch (error) {
      message.error("Error fetching exams: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    const tableText = exams
      .map(
        (s) =>
          `${s.exam}, ${s.is_quiz},${s.attempt},${s.exam_from},${s.exam_to},${s.duration},${s.is_active},${s.publish_result},${s.description}`
      )
      .join("\n");
    navigator.clipboard.writeText(tableText);
    message.success("Table copied to clipboard!");
  };

  const handleExportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        "Exam",
        "Quiz",
        "Attempt",
        "Exam From",
        "Exam to",
        "Duration",
        "Exam Published",
        "Result Published",
        "Description",
      ]
        .concat(
          exams.map(
            (s) =>
              `${s.exam}, ${s.is_quiz},${s.attempt},${s.exam_from},${s.exam_to},${s.duration},${s.is_active},${s.publish_result},${s.description}`
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
    doc.text("Exam List", 20, 10);

    autoTable(doc, {
      head: [
        [
          "Exam",
          "Quiz",
          "Attempt",
          "Exam From",
          "Exam to",
          "Duration",
          "Exam Published",
          "Result Published",
          "Description",
        ],
      ],
      body: exams.map((s) => [
        s.exam,
        s.is_quiz ? "Yes" : "No",
        s.attempt,
        s.exam_from,
        s.exam_to,
        s.duration,
        s.is_active ? "Yes" : "No",
        s.publish_result ? "Yes" : "No",
        s.description,
      ]),
    });

    doc.save("exams.pdf");
  };

  const tableRef = useRef(null);

  const handlePrint = () => {
    const tableHTML = `
    <html>
      <head>
        <title>Print Exams</title>
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
        <h2>Exam List</h2>
        <table>
          <thead>
            <tr>
              <th>Exam</th>
              <th>Quiz</th>
              <th>Attempt</th>
              <th>Exam From</th>
              <th>Exam to</th>
              <th>Duration</th>
              <th>Exam published</th>
              <th>Result published</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            ${exams
              .map(
                (exam) => `
                <tr>
                  <td>${exam.exam}</td>
                  <td>${exam.is_quiz ? "Yes" : "No"}</td>
                  <td>${exam.attempt}</td>
                  <td>${exam.exam_from}</td>
                  <td>${exam.exam_to}</td>
                  <td>${exam.duration}</td>
                  <td>${exam.is_active ? "Yes" : "No"}</td>
                  <td>${exam.publish_result ? "Yes" : "No"}</td>
                  <td>${exam.description}</td>
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

  const handleAddExam = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newExam),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add exam");
      }

      // Refresh the exam list
      await fetchExams();
      
      setShowAddExam(false);
      setNewExam({
        exam: "",
        description: "",
        is_quiz: false,
        attempt: 0,
        exam_from: "",
        exam_to: "",
        duration: "",
        is_active: false,
        publish_result: false,
      });
      message.success("Exam added successfully!");
    } catch (error) {
      message.error("Error adding exam: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete exam");
      }

      setExams(exams.filter((exam) => exam.id !== id));
      message.success("Exam deleted successfully!");
    } catch (error) {
      message.error("Error deleting exam: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (exam) => {
    setEditExam(exam);
    setExamData({
      exam: exam.exam,
      description: exam.description,
      is_quiz: exam.is_quiz,
      attempt: exam.attempt,
      exam_from: exam.exam_from,
      exam_to: exam.exam_to,
      duration: exam.duration,
      is_active: exam.is_active,
      publish_result: exam.publish_result,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setExamData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/${editExam.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(examData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update exam");
      }

      // Refresh the exam list
      await fetchExams();
      
      setEditExam(null);
      message.success("Exam updated successfully!");
    } catch (error) {
      message.error("Error updating exam: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (id) => {
    setSelectedExams((prev) =>
      prev.includes(id) ? prev.filter((examId) => examId !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = async () => {
    try {
      setLoading(true);
      await Promise.all(
        selectedExams.map((id) =>
          fetch(`${API_URL}/${id}`, {
            method: "DELETE",
          })
        )
      );
      
      // Refresh the exam list
      await fetchExams();
      
      setSelectedExams([]);
      message.success("Selected exams deleted successfully!");
    } catch (error) {
      message.error("Error deleting exams: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredExams = exams.filter((exam) => {
    const now = new Date();
    const examFrom = new Date(exam.exam_from);
    const examTo = new Date(exam.exam_to);
    
    return activeTab === "upcoming" 
      ? examFrom > now  // Upcoming exams are those where exam_from is in future
      : examTo <= now;  // Completed exams are those where exam_to has passed
  });

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
    { title: "Exam", dataIndex: "exam", key: "exam" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Quiz",
      dataIndex: "is_quiz",
      key: "is_quiz",
      render: (is_quiz) => (
        <input type="checkbox" style={{ color: "#164f63" }} checked={is_quiz} disabled />
      ),
    },
    { title: "Attempt", dataIndex: "attempt", key: "attempt" },
    { title: "Exam From", dataIndex: "exam_from", key: "exam_from" },
    { title: "Exam To", dataIndex: "exam_to", key: "exam_to" },
    { title: "Duration", dataIndex: "duration", key: "duration" },
    {
      title: "Exam Published",
      dataIndex: "is_active",
      key: "is_active",
      render: (is_active) => (
        <input type="checkbox" style={{ color: "#164f63" }} checked={is_active} disabled />
      ),
    },
    {
      title: "Result Published",
      dataIndex: "publish_result",
      key: "publish_result",
      render: (publish_result) => (
        <input
          type="checkbox"
          style={{ color: "#164f63" }}
          checked={publish_result}
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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Exam Name</label>
              <input
                type="text"
                name="exam"
                value={examData.exam || ""}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Description</label>
              <input
                type="text"
                name="description"
                value={examData.description || ""}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Attempt</label>
              <input
                type="number"
                name="attempt"
                value={examData.attempt || 0}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Quiz</label>
              <input
                type="checkbox"
                name="is_quiz"
                checked={examData.is_quiz || false}
                onChange={handleChange}
                className="border p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Exam From</label>
              <input
                type="datetime-local"
                name="exam_from"
                value={examData.exam_from || ""}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Exam To</label>
              <input
                type="datetime-local"
                name="exam_to"
                value={examData.exam_to || ""}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Duration</label>
              <input
                type="time"
                step="1"
                name="duration"
                value={examData.duration || ""}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Published</label>
              <input
                type="checkbox"
                name="is_active"
                checked={examData.is_active || false}
                onChange={handleChange}
                className="border p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Publish Result
              </label>
              <input
                type="checkbox"
                name="publish_result"
                checked={examData.publish_result || false}
                onChange={handleChange}
                className="border p-2"
              />
            </div>
          </div>
          <button
            style={{ backgroundColor: "#164f63" }}
            className="text-white p-2 mt-2"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            style={{ backgroundColor: "gray" }}
            className="text-white p-2 mt-2 ml-2"
            onClick={() => setEditExam(null)}
            disabled={loading}
          >
            Cancel
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
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete Selected Exams"}
        </button>
      )}

      {showAddExam && (
        <div className="mt-4 p-4 border rounded">
          <h4 className="text-lg font-semibold">Add New Exam</h4>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <label className="block text-sm font-medium">Exam Name</label>
              <input
                type="text"
                placeholder="Exam Name"
                className="border p-2 w-full"
                value={newExam.exam}
                onChange={(e) =>
                  setNewExam({ ...newExam, exam: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Description</label>
              <input
                type="text"
                placeholder="Description"
                className="border p-2 w-full"
                value={newExam.description}
                onChange={(e) =>
                  setNewExam({ ...newExam, description: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Attempt</label>
              <input
                type="number"
                placeholder="Attempt"
                className="border p-2 w-full"
                value={newExam.attempt}
                onChange={(e) =>
                  setNewExam({ ...newExam, attempt: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Quiz</label>
              <input
                type="checkbox"
                checked={newExam.is_quiz}
                onChange={(e) =>
                  setNewExam({ ...newExam, is_quiz: e.target.checked })
                }
                className="border p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Exam From</label>
              <input
                type="datetime-local"
                className="border p-2 w-full"
                placeholder="From"
                value={newExam.exam_from}
                onChange={(e) =>
                  setNewExam({ ...newExam, exam_from: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Exam To</label>
              <input
                type="datetime-local"
                className="border p-2 w-full"
                placeholder="To"
                value={newExam.exam_to}
                onChange={(e) =>
                  setNewExam({ ...newExam, exam_to: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Duration</label>
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
            <div>
              <label className="block text-sm font-medium">Published</label>
              <input
                type="checkbox"
                checked={newExam.is_active}
                onChange={(e) =>
                  setNewExam({ ...newExam, is_active: e.target.checked })
                }
                className="border p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Publish Result
              </label>
              <input
                type="checkbox"
                checked={newExam.publish_result}
                onChange={(e) =>
                  setNewExam({ ...newExam, publish_result: e.target.checked })
                }
                className="border p-2"
              />
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={handleAddExam}
              style={{ backgroundColor: "#164f63" }}
              className="text-white p-2 rounded"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => setShowAddExam(false)}
              style={{ backgroundColor: "var(--color-gray-300)" }}
              className="p-2 rounded"
              disabled={loading}
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
          disabled={loading}
        >
          <CopyOutlined />
        </button>
        <button
          style={{ fontSize: "24px" }}
          className="text-green-600 hover:text-green-800"
          onClick={handleExportExcel}
          disabled={loading}
        >
          <FileExcelOutlined />
        </button>
        <button
          style={{ fontSize: "24px" }}
          className="text-gray-600 hover:text-gray-800"
          onClick={handleExportCSV}
          disabled={loading}
        >
          <FileTextOutlined />
        </button>
        <button
          style={{ fontSize: "24px" }}
          className="text-red-600 hover:text-red-800"
          onClick={handleExportPDF}
          disabled={loading}
        >
          <FilePdfOutlined />
        </button>
        <button
          style={{ fontSize: "24px" }}
          className="text-gray-600 hover:text-gray-800"
          onClick={handlePrint}
          disabled={loading}
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
          loading={loading}
        />
      </div>
    </div>
  );
}