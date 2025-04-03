"use client";
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";

export default function QuestionSearchForm() {
  const [formData, setFormData] = useState({
    class: "",
    section: "",
    subject: "",
    questionType: "",
    questionLevel: "",
    createdBy: "",
  });

  const classes = ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5"];
  const subjects = [
    { id: 1, name: "English (210)" },
    { id: 3, name: "Hindi (230)" },
    { id: 4, name: "Mathematics (110)" },
    { id: 5, name: "Science (111)" },
    { id: 6, name: "Social Studies (212)" },
    { id: 7, name: "French (231)" },
    { id: 8, name: "Drawing (200)" },
    { id: 9, name: "Computer (00220)" },
    { id: 10, name: "Elective 1 (101)" },
    { id: 11, name: "Elective 2 (102)" },
    { id: 12, name: "Elective 3 (103)" },
  ];
  const questionTypes = [
    "Single Choice",
    "Multiple Choice",
    "True/False",
    "Descriptive",
  ];
  const questionLevels = ["Low", "Medium", "High"];
  const createdByOptions = [
    { id: 1, name: "Joe Black (9000)" },
    { id: 2, name: "Shivam Verma (9002)" },
    { id: 5, name: "Jason Sharlton (90006)" },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Select Criteria</h3>
      <form
        action="https://demo.smart-school.in/admin/question/questionsearchvalidation"
        method="post"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div>
            <label className="block text-sm font-medium">Class</label>
            <select
              name="class"
              className="w-full border px-2 py-1 rounded mt-1"
              onChange={handleChange}
            >
              <option value="">Select</option>
              {classes.map((cls, index) => (
                <option key={index} value={index + 1}>
                  {cls}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Section</label>
            <select
              name="section"
              className="w-full border px-2 py-1 rounded mt-1"
              onChange={handleChange}
            >
              <option value="">Select</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Subject</label>
            <select
              name="subject"
              className="w-full border px-2 py-1 rounded mt-1"
              onChange={handleChange}
            >
              <option value="">Select</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Question Type</label>
            <select
              name="questionType"
              className="w-full border px-2 py-1 rounded mt-1"
              onChange={handleChange}
            >
              <option value="">Select</option>
              {questionTypes.map((type, index) => (
                <option
                  key={index}
                  value={type.toLowerCase().replace(" ", "_")}
                >
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Question Level</label>
            <select
              name="questionLevel"
              className="w-full border px-2 py-1 rounded mt-1"
              onChange={handleChange}
            >
              <option value="">Select</option>
              {questionLevels.map((level, index) => (
                <option key={index} value={level.toLowerCase()}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Created By</label>
            <select
              name="createdBy"
              className="w-full border px-2 py-1 rounded mt-1"
              onChange={handleChange}
            >
              <option value="">Select</option>
              {createdByOptions.map((creator) => (
                <option key={creator.id} value={creator.id}>
                  {creator.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            style={{ backgroundColor: "#164f63" }}
            className=" text-white px-4 py-2 rounded hover:bg-teal-700 flex items-center gap-2"
          >
            <SearchOutlined /> Search
          </button>
        </div>
      </form>
    </div>
  );
}
