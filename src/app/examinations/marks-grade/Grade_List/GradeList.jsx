import React, { useState } from "react";
import { Table, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const GradeList = ({ grades, onDelete }) => {
  const [editingGrade, setEditingGrade] = useState(null);
  const [formData, setFormData] = useState({
    examType: "",
    gradeName: "",
    markFrom: "",
    markUpto: "",
    gradePoint: "",
  });

  const handleEdit = (grade) => {
    setEditingGrade(grade.key);
    setFormData({
      examType: grade.examType,
      gradeName: grade.gradeName,
      markFrom: grade.markFrom,
      markUpto: grade.markUpto,
      gradePoint: grade.gradePoint,
    });
  };

  const handleSaveEdit = () => {
    const updatedGrades = grades.map((grade) =>
      grade.key === editingGrade ? { ...grade, ...formData } : grade
    );
    console.log("Updated Grades:", updatedGrades); // Replace with backend update logic
    setEditingGrade(null);
  };

  const columns = [
    {
      title: "Exam Type",
      dataIndex: "examType",
      key: "examType",
    },
    {
      title: "Grade Name",
      dataIndex: "gradeName",
      key: "gradeName",
    },
    {
      title: "Percent Range",
      key: "percentRange",
      render: (_, record) => `${record.markFrom} - ${record.markUpto}`,
    },
    {
      title: "Grade Point",
      dataIndex: "gradePoint",
      key: "gradePoint",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(record)}
            className="text-green-600 hover:text-green-700"
          >
            <EditOutlined />
          </button>
          <button
            onClick={() => onDelete(record.key)}
            className="text-red-600 hover:text-red-700"
          >
            <DeleteOutlined />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Grade List</h3>

      {editingGrade && (
        <div className="mb-4 p-4 bg-gray-100 rounded-lg">
          <h4 className="font-semibold mb-2">Edit Grade</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Exam Type</label>
              <input
                type="text"
                value={formData.examType}
                onChange={(e) =>
                  setFormData({ ...formData, examType: e.target.value })
                }
                className="border rounded-md w-full p-2"
              />
            </div>
            <div>
              <label className="block font-medium">Grade Name</label>
              <input
                type="text"
                value={formData.gradeName}
                onChange={(e) =>
                  setFormData({ ...formData, gradeName: e.target.value })
                }
                className="border rounded-md w-full p-2"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block font-medium">Mark From</label>
              <input
                type="number"
                value={formData.markFrom}
                onChange={(e) =>
                  setFormData({ ...formData, markFrom: e.target.value })
                }
                className="border rounded-md w-full p-2"
              />
            </div>
            <div>
              <label className="block font-medium">Mark Upto</label>
              <input
                type="number"
                value={formData.markUpto}
                onChange={(e) =>
                  setFormData({ ...formData, markUpto: e.target.value })
                }
                className="border rounded-md w-full p-2"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block font-medium">Grade Point</label>
            <input
              type="number"
              value={formData.gradePoint}
              onChange={(e) =>
                setFormData({ ...formData, gradePoint: e.target.value })
              }
              className="border rounded-md w-full p-2"
            />
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button onClick={() => setEditingGrade(null)}>Cancel</Button>
            <Button
              type="primary"
              style={{ backgroundColor: "#164f63" }}
              onClick={handleSaveEdit}
            >
              Save
            </Button>
          </div>
        </div>
      )}

      <Table
        dataSource={grades}
        columns={columns}
        rowKey="key"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default GradeList;
