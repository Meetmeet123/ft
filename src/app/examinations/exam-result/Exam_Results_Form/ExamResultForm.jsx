import { SearchOutlined } from "@ant-design/icons";
import React, { useState } from "react";

const ResultForm = () => {
  const [examGroup, setExamGroup] = useState("1");
  const [exam, setExam] = useState("171");
  const [session, setSession] = useState("20");
  const [classId, setClassId] = useState("4");
  const [section, setSection] = useState("1");

  function handleSubmit(e) {
    e.preventDefault();
    // Make API call here
    console.log({ examGroup, exam, session, classId, section });
  }

  return (
    <form onSubmit={handleSubmit} className="p-2.5">
      {/* Using flex with wrap to align fields in same row till md screen */}
      <div className="flex flex-wrap md:flex-nowrap gap-4 mt-5 mx-2">
        {/* Exam Group Dropdown */}
        <div className="w-full md:w-1/5">
          <label className="block text-gray-700 font-bold text-sm md:text-lg">
            Exam Group <span className="text-red-500">*</span>
          </label>
          <select
            id="exam_group_id"
            name="exam_group_id"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
            value={examGroup}
            onChange={(e) => setExamGroup(e.target.value)}
          >
            <option value="1">Class 4 (Pass / Fail)</option>
            <option value="2">Class 4 (School Based Grading System)</option>
            <option value="3">Class 4 (College Based Grading System)</option>
            <option value="4">Class 4 (GPA Grading System)</option>
            <option value="5">Average Passing Exam</option>
          </select>
        </div>

        {/* Exam Dropdown */}
        <div className="w-full md:w-1/5">
          <label className="block text-gray-700 font-bold text-sm md:text-lg">
            Exam <span className="text-red-500">*</span>
          </label>
          <select
            id="exam_id"
            name="exam_id"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
            value={exam}
            onChange={(e) => setExam(e.target.value)}
          >
            <option value="171">Final Exam (March -2025)</option>
            <option value="163">Monthly Test JULY(2024)</option>
            <option value="159">Chapter Wise Weekly Test(April-2024)</option>
          </select>
        </div>

        {/* Session Dropdown */}
        <div className="w-full md:w-1/5">
          <label className="block text-gray-700 font-bold text-sm md:text-lg">
            Session <span className="text-red-500">*</span>
          </label>
          <select
            id="session_id"
            name="session_id"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
            value={session}
            onChange={(e) => setSession(e.target.value)}
          >
            <option value="20">2024-25</option>
            <option value="21">2025-26</option>
          </select>
        </div>

        {/* Class Dropdown */}
        <div className="w-full md:w-1/5">
          <label className="block text-gray-700 font-bold text-sm md:text-lg">
            Class <span className="text-red-500">*</span>
          </label>
          <select
            id="class_id"
            name="class_id"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
          >
            <option value="4">Class 4</option>
            <option value="5">Class 5</option>
          </select>
        </div>

        {/* Section Dropdown */}
        <div className="w-full md:w-1/5">
          <label className="block text-gray-700 font-bold text-sm md:text-lg">
            Section <span className="text-red-500">*</span>
          </label>
          <select
            id="section_id"
            name="section_id"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
            value={section}
            onChange={(e) => setSection(e.target.value)}
          >
            <option value="1">A</option>
            <option value="2">B</option>
            <option value="3">C</option>
          </select>
        </div>
      </div>

      {/* Search Button - Aligned Properly */}
      <div className="w-full flex justify-end px-2 mt-4">
        <button
          type="submit"
          style={{ backgroundColor: "var(--color-teal-500)" }}
          className=" hover:bg-teal-700 text-white font-bold px-4 py-2 rounded transition flex items-center"
        >
          <SearchOutlined className="mr-2" /> Search
        </button>
      </div>
    </form>
  );
};

export default ResultForm;
