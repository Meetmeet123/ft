import { SearchOutlined } from "@ant-design/icons";
import React, { useState } from "react";

const ExamScheduleForm = () => {
  const [examGroup, setExamGroup] = useState("");
  const [exam, setExam] = useState("");
  function handleSubmit(e) {
    e.prevendDefault();
    //MAke api call here
  }
  return (
    <form onSubmit={handleSubmit} className=" p-2.5">
      <div className="flex flex-wrap mt-5 mx-2">
        {/* Exam Group Dropdown */}
        <div className="w-full sm:w-1/2 lg:w-1/4 px-2">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold text-lg">
              Exam Group <span className="text-red-500">*</span>
            </label>
            <select
              id="exam_group_id"
              name="exam_group_id"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
              value={examGroup}
              onChange={(e) => setExamGroup(e.target.value)}
            >
              <option value="">Select</option>
              <option value="1">Class 4 (Pass / Fail)</option>
              <option value="2">Class 4 (School Based Grading System)</option>
              <option value="3">Class 4 (College Based Grading System)</option>
              <option value="4">Class 4 (GPA Grading System)</option>
              <option value="5">Average Passing Exam</option>
            </select>
          </div>
        </div>

        {/* Exam Dropdown */}
        <div className="w-full sm:w-1/2 lg:w-1/4 px-2">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold text-lg">
              Exam <span className="text-red-500">*</span>
            </label>
            <select
              id="exam_id"
              name="exam_id"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
              value={exam}
              onChange={(e) => setExam(e.target.value)}
            >
              <option value="">Select</option>
            </select>
          </div>
        </div>

        {/* Search button */}
        <div className="w-full px-2">
          <button
            type="submit"
            style={{ backgroundColor: "#164f63" }}
            className=" hover:bg-teal-700 text-white font-bold  px-2 py-2 rounded mr-2 transition float-right"
          >
            <SearchOutlined /> Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default ExamScheduleForm;
