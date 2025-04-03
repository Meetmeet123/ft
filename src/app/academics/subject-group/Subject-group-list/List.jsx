"use client";
import { useState } from "react";
import { Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import EditSubjectGroupForm from "../Subject-group-form/edit-form/Edit"; // Import the form component

const SubjectGroupList = () => {
  const [selectedSubjectGroup, setSelectedSubjectGroup] = useState(null);

  const subjectGroups = [
    {
      id: 1,
      name: "Class 1st Subject Group",
      classId: "1",
      sections: ["1", "2", "3", "12"],
      subjects: ["1", "3", "4", "5", "8", "9", "10"], // Store subject IDs instead of names
      description: "This is the subject group for Class 1 students.",
    },
    {
      id: 2,
      name: "Class 2nd Subject Group",
      classId: "2",
      sections: ["1", "2", "3"],
      subjects: ["1", "3", "4", "5", "7", "9"], // Store subject IDs instead of names
      description: "This is the subject group for Class 2 students.",
    },
  ];

  // Mapping of subject IDs to subject names
  const subjectMap = {
    1: "English",
    3: "Hindi",
    4: "Mathematics",
    5: "Science",
    6: "Social Studies",
    7: "French",
    8: "Drawing",
    9: "Computer",
    10: "Elective 1",
    11: "Elective 2",
    12: "Elective 3",
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Subjects",
      dataIndex: "subjects",
      key: "subjects",
      render: (subjectIds) => subjectIds.map((id) => subjectMap[id]).join(", "), // Convert IDs to names
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <button
            className="text-blue-500 hover:text-blue-600"
            onClick={() => setSelectedSubjectGroup(record)}
          >
            <EditOutlined />
          </button>
          <button
            className="text-red-500 hover:text-red-600"
            onClick={() => console.log(`Deleting ${record.id}`)}
          >
            <DeleteOutlined />
          </button>
        </div>
      ),
    },
  ];

  return (
    <section className="p-6 bg-gray-100 flex-1/2">
      <div className="w-full bg-white shadow-md rounded-lg p-6">
        {selectedSubjectGroup ? (
          <>
            <button
              className="mb-4 text-blue-500 hover:text-blue-600"
              onClick={() => setSelectedSubjectGroup(null)}
            >
              ← Back to List
            </button>
            <EditSubjectGroupForm subjectGroup={selectedSubjectGroup} />
          </>
        ) : (
          <>
            <h3 className="text-lg font-semibold border-b pb-3">
              Subject Group List
            </h3>
            <Table
              columns={columns}
              dataSource={subjectGroups}
              rowKey="id"
              pagination={false}
              className="mt-4"
            />
          </>
        )}
      </div>
    </section>
  );
};

export default SubjectGroupList;
