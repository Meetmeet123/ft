"use client";
import React, { useState } from 'react';

const StudentPromotionForm = () => {
  const [classId, setClassId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [promoteClassId, setPromoteClassId] = useState("");
  const [promoteSectionId, setPromoteSectionId] = useState("");

  const classes = [
    { value: "1", label: "Class 1" },
    { value: "2", label: "Class 2" },
    { value: "3", label: "Class 3" },
    { value: "4", label: "Class 4" },
    { value: "5", label: "Class 5" },
  ];

  const sessions = [
    { value: "7", label: "2016-17" },
    { value: "11", label: "2017-18" },
    { value: "13", label: "2018-19" },
    { value: "14", label: "2019-20" },
    { value: "15", label: "2020-21" },
    { value: "16", label: "2021-22" },
    { value: "18", label: "2022-23" },
    { value: "19", label: "2023-24" },
    { value: "20", label: "2024-25" },
    { value: "21", label: "2025-26" },
    { value: "22", label: "2026-27" },
    { value: "23", label: "2027-28" },
    { value: "24", label: "2028-29" },
    { value: "25", label: "2029-30" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      classId,
      sectionId,
      sessionId,
      promoteClassId,
      promoteSectionId,
    });
  };

  return (
    <section className="p-6 bg-gray-100 w-full">
      <div className="w-full bg-white shadow-md rounded-lg p-6">
        <h3 className="text-lg font-semibold flex items-center gap-2 border-b pb-3">
          <i className="fa fa-search"></i> Select Criteria
        </h3>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">
                Class <span className="text-red-500">*</span>
              </label>
              <select
                value={classId}
                onChange={(e) => setClassId(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select</option>
                {classes.map((cls) => (
                  <option key={cls.value} value={cls.value}>
                    {cls.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium">
                Section <span className="text-red-500">*</span>
              </label>
              <select
                value={sectionId}
                onChange={(e) => setSectionId(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select</option>
              </select>
            </div>
          </div>

          <h4 className="mt-6 font-semibold">
            Promote Students In Next Session
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block font-medium">
                Promote In Session <span className="text-red-500">*</span>
              </label>
              <select
                value={sessionId}
                onChange={(e) => setSessionId(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select</option>
                {sessions.map((session) => (
                  <option key={session.value} value={session.value}>
                    {session.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium">
                Class <span className="text-red-500">*</span>
              </label>
              <select
                value={promoteClassId}
                onChange={(e) => setPromoteClassId(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select</option>
                {classes.map((cls) => (
                  <option key={cls.value} value={cls.value}>
                    {cls.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium">
                Section <span className="text-red-500">*</span>
              </label>
              <select
                value={promoteSectionId}
                onChange={(e) => setPromoteSectionId(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              style={{ backgroundColor: "#164f63" }}
              className="text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default StudentPromotionForm;
