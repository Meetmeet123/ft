"use client";
import React, { useState } from 'react';

const classes = [
  { id: "1", name: "Class 1" },
  { id: "2", name: "Class 2" },
  { id: "3", name: "Class 3" },
  { id: "4", name: "Class 4" },
  { id: "5", name: "Class 5" },
];

const teachers = [
  { id: "2", name: "Shivam Verma (9002)" },
  { id: "5", name: "Jason Sharlton (90006)" },
  { id: "10", name: "Albert Thomas (54545454)" },
];

const AssignClassTeacherForm = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");

  const handleTeacherSelection = (teacherId) => {
    setSelectedTeacher(teacherId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      class: selectedClass,
      section: selectedSection,
      teacher: selectedTeacher,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg ml-5 mt-1 p-5 border border-gray-300"
    >
      <div className="mb-4">
        <label className="block font-medium">
          Class<span className="text-red-500"> *</span>
        </label>
        <select
          className="w-full p-2 border rounded-md"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">Select</option>
          {classes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-medium">
          Section<span className="text-red-500"> *</span>
        </label>
        <select
          className="w-full p-2 border rounded-md"
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
        >
          <option value="">Select</option>
          {/* Dynamic section options can be added here */}
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-medium">
          Class Teacher<span className="text-red-500"> *</span>
        </label>
        {teachers?.map((teacher) => (
          <div
            key={teacher.id}
            className="flex items-center "
            style={{ marginBlock: "5px" }}
          >
            <input
              type="radio"
              name="teacher"
              className="mr-1"
              checked={selectedTeacher === teacher.id}
              onChange={() => handleTeacherSelection(teacher.id)}
            />
            <label>{teacher.name}</label>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          style={{ backgroundColor: "#164f63" }}
          className=" hover:bg-teal-700 text-white font-bold px-4 py-2 rounded"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default AssignClassTeacherForm;
