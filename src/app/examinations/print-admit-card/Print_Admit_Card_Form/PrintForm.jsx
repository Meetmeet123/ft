import { SearchOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";

const PrintForm = () => {
  const [examGroup, setExamGroup] = useState("");
  const [exam, setExam] = useState("");
  const [session, setSession] = useState("");
  const [classId, setClassId] = useState("");
  const [section, setSection] = useState("");

  // Dynamic state for dropdown options
  const [examGroups, setExamGroups] = useState([]);
  const [exams, setExams] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);

  // Fetch data dynamically (Simulated API call)
  useEffect(() => {
    // Replace these with actual API calls
    setExamGroups([
      { id: "1", name: "Class 4 (Pass / Fail)" },
      { id: "2", name: "Class 4 (School Based Grading System)" },
      { id: "3", name: "Class 4 (College Based Grading System)" },
      { id: "4", name: "Class 4 (GPA Grading System)" },
      { id: "5", name: "Average Passing Exam" },
    ]);

    setExams([
      { id: "171", name: "Final Exam (March -2025)" },
      { id: "163", name: "Monthly Test JULY(2024)" },
      { id: "159", name: "Chapter Wise Weekly Test(April-2024)" },
    ]);

    setSessions([
      { id: "20", name: "2024-25" },
      { id: "21", name: "2025-26" },
    ]);

    setClasses([
      { id: "4", name: "Class 4" },
      { id: "5", name: "Class 5" },
    ]);

    setSections([
      { id: "1", name: "A" },
      { id: "2", name: "B" },
      { id: "3", name: "C" },
    ]);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    console.log({ examGroup, exam, session, classId, section });
  }

  return (
    <form onSubmit={handleSubmit} className="p-2.5">
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
            <option value="">Select Exam Group</option>
            {examGroups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
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
            <option value="">Select Exam</option>
            {exams.map((exam) => (
              <option key={exam.id} value={exam.id}>
                {exam.name}
              </option>
            ))}
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
            <option value="">Select Session</option>
            {sessions.map((session) => (
              <option key={session.id} value={session.id}>
                {session.name}
              </option>
            ))}
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
            <option value="">Select Class</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.name}
              </option>
            ))}
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
            <option value="">Select Section</option>
            {sections.map((section) => (
              <option key={section.id} value={section.id}>
                {section.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Search Button */}
      <div className="w-full flex justify-end px-2 mt-4">
        <button
          type="submit"
          style={{ backgroundColor: "var(--color-teal-500) " }}
          className=" hover:bg-teal-700 text-white font-bold px-4 py-2 rounded transition flex items-center"
        >
          <SearchOutlined className="mr-2" /> Search
        </button>
      </div>
    </form>
  );
};

export default PrintForm;
