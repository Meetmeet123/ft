"use client";
import { useState } from "react";
import { Table, Pagination } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const MarksheetList = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [editingMarksheet, setEditingMarksheet] = useState(null);

  const [marksheets, setMarksheets] = useState([
    {
      id: 1,
      name: "School Marksheet",
      template: "Template A",
      heading: "Annual Exam",
      title: "Marksheet",
      exam_name: "Final Term 2024",
      school_name: "Springfield High School",
      exam_center: "Center 101",
      content_footer: "Best of luck for your exams!",
      printing_date: "2024-04-15",
      background_img: "https://source.unsplash.com/random/300x200?sig=1",
      left_logo: null,
      right_logo: null,
      sign: null,
      header_image: null,
      left_sign: null,
      middle_sign: null,
      right_sign: null,
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
      name: "College Marksheet",
      template: "Template B",
      heading: "Mid-Term Exam",
      title: "Marksheet",
      exam_name: "Mid Term 2024",
      school_name: "Oakridge International",
      exam_center: "Center 202",
      content_footer: "Prepare well for your exams!",
      printing_date: "2024-06-20",
      background_img: "https://source.unsplash.com/random/300x200?sig=2",
      left_logo: null,
      right_logo: null,
      sign: null,
      header_image: null,
      left_sign: null,
      middle_sign: null,
      right_sign: null,
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
      setMarksheets(marksheets.filter((sheet) => sheet.id !== id));
    }
  };

  const handleEdit = (sheet) => {
    setEditingMarksheet(sheet);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setMarksheets(
      marksheets.map((sheet) =>
        sheet.id === editingMarksheet.id ? editingMarksheet : sheet
      )
    );
    setEditingMarksheet(null);
  };

  const filteredSheets = marksheets.filter((sheet) =>
    sheet.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      title: "Certificate Name",
      dataIndex: "name",
      key: "name",
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
      title: "Actions",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-3">
          {/* impliment view functionality */}
          <EyeOutlined className="text-blue-500 cursor-pointer hover:scale-110" />
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
      {editingMarksheet ? (
        <div className="max-w-lg mx-auto bg-gray-100 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold border-b pb-3">
            Edit Marksheet
          </h3>
          <form onSubmit={handleSaveEdit} className="mt-4">
            <div className="mb-4">
              <label className="block font-medium">Heading</label>
              <input
                type="text"
                value={editingMarksheet.heading}
                onChange={(e) =>
                  setEditingMarksheet({
                    ...editingMarksheet,
                    heading: e.target.value,
                  })
                }
                className="w-full border p-2 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium">Title</label>
              <input
                type="text"
                value={editingMarksheet.title}
                onChange={(e) =>
                  setEditingMarksheet({
                    ...editingMarksheet,
                    title: e.target.value,
                  })
                }
                className="w-full border p-2 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium">Exam Name</label>
              <input
                type="text"
                value={editingMarksheet.exam_name}
                onChange={(e) =>
                  setEditingMarksheet({
                    ...editingMarksheet,
                    exam_name: e.target.value,
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
                      checked={editingMarksheet[field]}
                      onChange={() =>
                        setEditingMarksheet({
                          ...editingMarksheet,
                          [field]: !editingMarksheet[field],
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
                onClick={() => setEditingMarksheet(null)}
                className="text-blue-500 hover:text-blue-700"
              >
                ← Back to List
              </button>
              <button
                style={{ backgroundColor: "#164f63" }}
                type="submit"
                className=" text-white px-4 py-2 rounded-md hover:bg-teal-700"
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
            dataSource={filteredSheets}
            rowKey="id"
            pagination={{
              pageSize: pageSize,
              current: currentPage,
              total: filteredSheets.length,
              onChange: (page) => setCurrentPage(page),
              showSizeChanger: false,
            }}
          />
        </>
      )}
    </div>
  );
};

export default MarksheetList;
