"use client";
import { useState } from "react";
import { Table, Pagination } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const AdmitCardList = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [editingCard, setEditingCard] = useState(null);

  const [admitCards, setAdmitCards] = useState([
    {
      id: 1,
      template: "Template A",
      heading: "Annual Exam",
      title: "Admit Card",
      exam_name: "Final Term 2024",
      school_name: "Springfield High School",
      exam_center: "Center 101",
      content_footer: "Best of luck for your exams!",
      is_name: true,
      is_father_name: true,
      is_mother_name: false,
      is_dob: true,
      is_admission_no: true,
      is_roll_no: true,
      is_address: false,
      is_gender: false,
      is_photo: true,
      is_class: true,
      is_section: true,
    },
    {
      id: 2,
      template: "Template B",
      heading: "Mid-Term Exam",
      title: "Admit Card",
      exam_name: "Mid Term 2024",
      school_name: "Oakridge International",
      exam_center: "Center 202",
      content_footer: "Prepare well for your exams!",
      is_name: true,
      is_father_name: false,
      is_mother_name: true,
      is_dob: true,
      is_admission_no: false,
      is_roll_no: true,
      is_address: true,
      is_gender: false,
      is_photo: true,
      is_class: false,
      is_section: true,
    },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Delete Confirm?")) {
      setAdmitCards(admitCards.filter((card) => card.id !== id));
    }
  };

  const handleEdit = (card) => {
    setEditingCard(card);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setAdmitCards(
      admitCards.map((card) =>
        card.id === editingCard.id ? editingCard : card
      )
    );
    setEditingCard(null);
  };

  const filteredCards = admitCards.filter((card) =>
    card.title.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Exam Name",
      dataIndex: "exam_name",
      key: "exam_name",
    },
    {
      title: "School Name",
      dataIndex: "school_name",
      key: "school_name",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-3">
          {/* add view functionality if needed */}
          <EditOutlined
            className="text-green-500 cursor-pointer hover:scale-110"
            onClick={() => handleEdit(record)}
          />
          <DeleteOutlined
            className="text-red-500 cursor-pointer hover:scale-110"
            onClick={() => handleDelete(record.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      {editingCard ? (
        <div className="max-w-lg mx-auto bg-gray-100 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold border-b pb-3">
            Edit Admit Card
          </h3>
          <form onSubmit={handleSaveEdit} className="mt-4">
            <div className="mb-4">
              <label className="block font-medium">Heading</label>
              <input
                type="text"
                value={editingCard.heading}
                onChange={(e) =>
                  setEditingCard({ ...editingCard, heading: e.target.value })
                }
                className="w-full border p-2 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium">Title</label>
              <input
                type="text"
                value={editingCard.title}
                onChange={(e) =>
                  setEditingCard({ ...editingCard, title: e.target.value })
                }
                className="w-full border p-2 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium">Exam Name</label>
              <input
                type="text"
                value={editingCard.exam_name}
                onChange={(e) =>
                  setEditingCard({ ...editingCard, exam_name: e.target.value })
                }
                className="w-full border p-2 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium">Exam Center</label>
              <input
                type="text"
                value={editingCard.exam_center}
                onChange={(e) =>
                  setEditingCard({
                    ...editingCard,
                    exam_center: e.target.value,
                  })
                }
                className="w-full border p-2 rounded-md"
              />
            </div>

            {/* Checkbox Options */}
            <div className="mb-4">
              <label className="block font-medium">Include Fields</label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {[
                  "is_name",
                  "is_father_name",
                  "is_mother_name",
                  "is_dob",
                  "is_admission_no",
                  "is_roll_no",
                  "is_address",
                  "is_gender",
                  "is_photo",
                  "is_class",
                  "is_section",
                ].map((field) => (
                  <label key={field} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={editingCard[field]}
                      onChange={() =>
                        setEditingCard({
                          ...editingCard,
                          [field]: !editingCard[field],
                        })
                      }
                    />
                    {field.replace("is_", "").replace("_", " ")}
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setEditingCard(null)}
                className="text-blue-500 hover:text-blue-700"
              >
                ← Back to List
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded-md px-3 py-1 text-sm focus:ring focus:ring-blue-300"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Table
            columns={columns}
            dataSource={filteredCards}
            rowKey="id"
            pagination={{
              pageSize: pageSize,
              current: currentPage,
              total: filteredCards.length,
              onChange: (page) => setCurrentPage(page),
              showSizeChanger: false,
            }}
          />
        </>
      )}
    </div>
  );
};

export default AdmitCardList;
