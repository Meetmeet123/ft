"use client";

import { SearchOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

const FormComponent = () => {
  const [formData, setFormData] = useState({
    class_id: "",
    section_id: "",
    subject_group_id: "",
  });

  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [subjectGroups, setSubjectGroups] = useState([]);

  useEffect(() => {
    // Simulating API calls
    setClasses([
      { id: "1", name: "Class 1" },
      { id: "2", name: "Class 2" },
      { id: "3", name: "Class 3" },
      { id: "4", name: "Class 4" },
      { id: "5", name: "Class 5" },
    ]);
    setSections([
      { id: "A", name: "Section A" },
      { id: "B", name: "Section B" },
      { id: "C", name: "Section C" },
    ]);
    setSubjectGroups([
      { id: "101", name: "Science Group" },
      { id: "102", name: "Commerce Group" },
      { id: "103", name: "Arts Group" },
    ]);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="ml-5 mt-5 bg-white shadow-md rounded-lg p-4 border border-gray-300">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <SearchOutlined /> Select Criteria
      </h3>
      <form
        action="https://demo.smart-school.in/admin/timetable/create"
        method="post"
        className="mt-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="form-group">
            <label className="block font-medium">
              Class<span className="text-red-500"> *</span>
            </label>
            <select
              name="class_id"
              value={formData.class_id}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="block font-medium">
              Section<span className="text-red-500"> *</span>
            </label>
            <select
              name="section_id"
              value={formData.section_id}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select</option>
              {sections.map((sec) => (
                <option key={sec.id} value={sec.id}>
                  {sec.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="block font-medium">
              Subject Group<span className="text-red-500"> *</span>
            </label>
            <select
              name="subject_group_id"
              value={formData.subject_group_id}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select</option>
              {subjectGroups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            style={{ backgroundColor: "#164f63" }}
            className=" hover:bg-teal-700 text-white font-bold px-4 py-2 rounded flex items-center"
          >
            <SearchOutlined className="mr-2" /> Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormComponent;
