import { SearchOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";

const PrintForm = () => {
  const [examGroup, setExamGroup] = useState("1");
  const [exam, setExam] = useState("171");
  const [session, setSession] = useState("20");
  const [classId, setClassId] = useState("4");
  const [section, setSection] = useState("1");

  // Dynamic dropdown options (can be fetched from an API)
  const [examGroups, setExamGroups] = useState([
    { id: "1", name: "Class 4 (Pass / Fail)" },
    { id: "2", name: "Class 4 (School Based Grading System)" },
    { id: "3", name: "Class 4 (College Based Grading System)" },
    { id: "4", name: "Class 4 (GPA Grading System)" },
    { id: "5", name: "Average Passing Exam" },
  ]);

  const [exams, setExams] = useState([
    { id: "171", name: "Final Exam (March -2025)" },
    { id: "163", name: "Monthly Test JULY(2024)" },
    { id: "159", name: "Chapter Wise Weekly Test(April-2024)" },
  ]);

  const [sessions, setSessions] = useState([
    { id: "20", name: "2024-25" },
    { id: "21", name: "2025-26" },
  ]);

  const [classes, setClasses] = useState([
    { id: "4", name: "Class 4" },
    { id: "5", name: "Class 5" },
  ]);

  const [sections, setSections] = useState([
    { id: "1", name: "A" },
    { id: "2", name: "B" },
    { id: "3", name: "C" },
  ]);

  // Example: Fetch data from API (if needed)
  useEffect(() => {
    // Simulating an API call
    // Example: fetch("/api/exam-groups").then(res => res.json()).then(data => setExamGroups(data));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    console.log({ examGroup, exam, session, classId, section });
  }

  return (
    <form onSubmit={handleSubmit} className=" p-4 bg-white ">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Exam Group Dropdown */}
        <div>
          <label className="block text-gray-700 font-medium text-sm">
            Exam Group <span className="text-red-500">*</span>
          </label>
          <select
            id="exam_group_id"
            name="exam_group_id"
            aria-label="Exam Group"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-400 focus:border-blue-400"
            value={examGroup}
            onChange={(e) => setExamGroup(e.target.value)}
          >
            {examGroups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </div>

        {/* Exam Dropdown */}
        <div>
          <label className="block text-gray-700 font-medium text-sm">
            Exam <span className="text-red-500">*</span>
          </label>
          <select
            id="exam_id"
            name="exam_id"
            aria-label="Exam"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-400 focus:border-blue-400"
            value={exam}
            onChange={(e) => setExam(e.target.value)}
          >
            {exams.map((exam) => (
              <option key={exam.id} value={exam.id}>
                {exam.name}
              </option>
            ))}
          </select>
        </div>

        {/* Session Dropdown */}
        <div>
          <label className="block text-gray-700 font-medium text-sm">
            Session <span className="text-red-500">*</span>
          </label>
          <select
            id="session_id"
            name="session_id"
            aria-label="Session"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-400 focus:border-blue-400"
            value={session}
            onChange={(e) => setSession(e.target.value)}
          >
            {sessions.map((session) => (
              <option key={session.id} value={session.id}>
                {session.name}
              </option>
            ))}
          </select>
        </div>

        {/* Class Dropdown */}
        <div>
          <label className="block text-gray-700 font-medium text-sm">
            Class <span className="text-red-500">*</span>
          </label>
          <select
            id="class_id"
            name="class_id"
            aria-label="Class"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-400 focus:border-blue-400"
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
          >
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.name}
              </option>
            ))}
          </select>
        </div>

        {/* Section Dropdown */}
        <div>
          <label className="block text-gray-700 font-medium text-sm">
            Section <span className="text-red-500">*</span>
          </label>
          <select
            id="section_id"
            name="section_id"
            aria-label="Section"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-400 focus:border-blue-400"
            value={section}
            onChange={(e) => setSection(e.target.value)}
          >
            {sections.map((section) => (
              <option key={section.id} value={section.id}>
                {section.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Search Button */}
      <div className="w-full flex justify-end mt-4">
        <button
          type="submit"
          className="bg-teal-500 hover:bg-teal-700 text-white font-bold px-4 py-2 rounded transition flex items-center"
        >
          <SearchOutlined className="mr-2" /> Search
        </button>
      </div>
    </form>
  );
};

export default PrintForm;
