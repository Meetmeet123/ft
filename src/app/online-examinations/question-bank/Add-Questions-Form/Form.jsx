"use client";
import { useState } from "react";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";

export default function SelectCriteria() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    questionType: "",
    questionLevel: "",
    class: "",
    section: "",
    question: "",
  });

  const subjects = [
    "English (210)",
    "Hindi (230)",
    "Mathematics (110)",
    "Science (111)",
    "Social Studies (212)",
    "French (231)",
    "Drawing (200)",
    "Computer (00220)",
    "Elective 1 (101)",
    "Elective 2 (102)",
    "Elective 3 (103)",
  ];

  const questionTypes = [
    "Single Choice",
    "Multiple Choice",
    "True/False",
    "Descriptive",
  ];
  const questionLevels = ["Low", "Medium", "High"];
  const classes = ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5"];
  const sections = ["Section A", "Section B", "Section C"];

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
    setIsAddModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center py-2">
        <h3 className="text-lg font-semibold">Select Criteria</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setIsAddModalOpen(true)}
            style={{ backgroundColor: "#164f63" }}
            className=" hover:bg-teal-800 text-white text-sm px-4 py-2 rounded flex items-center gap-1"
          >
            <PlusOutlined /> Add Question
          </button>
          <button
            onClick={() => setIsImportModalOpen(true)}
            style={{ backgroundColor: "#164f63" }}
            className=" hover:bg-teal-800 text-white text-sm px-4 py-2 rounded flex items-center gap-1"
          >
            <PlusOutlined /> Import
          </button>
        </div>
      </div>

      {isImportModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h4 className="text-lg font-semibold">Import Question</h4>
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                <CloseOutlined />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {["subject", "class", "section"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium capitalize">
                    {field.replace(/([A-Z])/g, " $1")} *
                  </label>
                  <select
                    className="w-full border px-2 py-1 rounded mt-1"
                    onChange={(e) => handleChange(field, e.target.value)}
                  >
                    <option value="">Select</option>
                    {(field === "subject"
                      ? subjects
                      : field === "class"
                      ? classes
                      : sections
                    ).map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium">Attach File *</label>
              <input
                type="file"
                className="w-full border px-2 py-1 rounded mt-1"
                onChange={handleFileChange}
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h4 className="text-lg font-semibold">Add Question</h4>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                <CloseOutlined />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {[
                "subject",
                "class",
                "section",
                "questionType",
                "questionLevel",
              ].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium capitalize">
                    {field.replace(/([A-Z])/g, " $1")} *
                  </label>
                  <select
                    className="w-full border px-2 py-1 rounded mt-1"
                    onChange={(e) => handleChange(field, e.target.value)}
                  >
                    <option value="">Select</option>
                    {(field === "subject"
                      ? subjects
                      : field === "class"
                      ? classes
                      : field === "section"
                      ? sections
                      : field === "questionType"
                      ? questionTypes
                      : questionLevels
                    ).map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium">Question *</label>
              <textarea
                rows={3}
                className="w-full border px-2 py-1 rounded mt-1"
                placeholder="Enter the question"
                onChange={(e) => handleChange("question", e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsAddModalOpen(false)}
                style={{ backgroundColor: "red" }}
                className=" hover:bg-teal-800 text-white text-sm px-4 py-2 rounded flex items-center gap-1"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                style={{ backgroundColor: "#164f63" }}
                className=" hover:bg-teal-800 text-white text-sm px-4 py-2 rounded flex items-center gap-1"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
