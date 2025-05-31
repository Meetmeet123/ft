"use client";
import React, { useState } from 'react';
import { X } from "lucide-react";

const LinkExam = ({onClose}) => {
  const [tab, setTab] = useState("AllTerm");
  const [weightage, setWeightage] = useState("");
  const [termChecked, setTermChecked] = useState(false);
  const [examChecked, setExamChecked] = useState({});

  const data = {
    term: "Term 1",
    exams: [
      {
        name: "Monthly Test (APRIL-2025)",
        subjects: ["English"],
      },
      {
        name: "Chapter Wise Weekly Test-1",
        subjects: ["English"],
      },
      {
        name: "Cycle Test ",
        subjects: ["English"],
      },
    ],
  };

  const handleTermChange = () => {
    const newVal = !termChecked;
    setTermChecked(newVal);
    const updatedExamChecked = {};
    data.exams.forEach((_, index) => {
      updatedExamChecked[index] = newVal;
    });
    setExamChecked(updatedExamChecked);
  };

  const handleExamChange = (index) => {
    setExamChecked((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="fixed inset-0 z-60 flex items-start justify-center overflow-y-auto bg-opacity-30 p-4">
  <div className="w-full max-w-5xl bg-white rounded shadow-lg p-4 md:p-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg md:text-xl font-bold">Link Exam</h2>
      <button><X onClick={onClose} /></button>
    </div>

    {/* Marksheet Type Selector */}
    <div className="mb-6">
      <label className="font-medium block mb-2">
        Marksheet Type <span className="text-red-500">*</span>
      </label>
      <select
        value={tab}
        onChange={(e) => setTab(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 w-full sm:w-64"
      >
        <option value="">Select</option>
        <option value="AllTerm">All Term</option>
        <option value="TermWise">Term Wise</option>
        <option value="SingleTerm">Single Exam Without Term</option>
        <option value="MultipleTerms">Multiple Exams without Terms</option>
      </select>
    </div>

    {/* AllTerm */}
    {tab === "AllTerm" && (
      <div className="overflow-x-auto">
        <div className="bg-gray-100 p-2 flex flex-wrap md:flex-nowrap items-center justify-between mb-2 gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold">{data.term}</span>
          </div>
          <input
            type="text"
            placeholder="Weightage"
            value={weightage}
            onChange={(e) => setWeightage(e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded w-full max-w-xs"
          />
        </div>

        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Term</th>
              <th className="border px-4 py-2 text-left">Exam Name</th>
              <th className="border px-4 py-2 text-center">Grading</th>
              <th className="border px-4 py-2 text-center">Teacher Remark</th>
            </tr>
          </thead>
          <tbody>
            {data.exams.map((exam, ei) =>
              exam.subjects.map((subject, si) => (
                <tr key={`${ei}-${si}`}>
                  <td className="border px-4 py-2">
                    {ei === 0 && (
                      <>
                        <input
                          type="checkbox"
                          checked={termChecked}
                          onChange={handleTermChange}
                          className="mr-2 accent-blue-600"
                        />
                        {data.term}
                      </>
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {si === 0 && (
                      <>
                        <input
                          type="checkbox"
                          checked={!!examChecked[ei]}
                          onChange={() => handleExamChange(ei)}
                          className="mr-2 accent-blue-600"
                        />
                        {exam.name}
                      </>
                    )}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <input
                      type="radio"
                      name="grading"
                      className="accent-blue-600"
                    />
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <input
                      type="radio"
                      name="remark"
                      className="accent-blue-600"
                    />
                  </td>
                </tr>
              ))
            )}
            <tr>
              <td colSpan={4} className="text-right p-4">
                <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded">
                  Save
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )}

    {/* TermWise or MultipleTerms */}
    {(tab === "TermWise" || tab === "MultipleTerms") && (
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Term</th>
              <th className="border px-4 py-2 text-left">Exam Name</th>
              <th className="border px-4 py-2 text-left">Weightage</th>
              <th className="border px-4 py-2 text-center">Grading</th>
              <th className="border px-4 py-2 text-center">Teacher Remark</th>
            </tr>
          </thead>
          <tbody>
            {data.exams.map((exam, ei) =>
              exam.subjects.map((subject, si) => (
                <tr key={`${ei}-${si}`}>
                  <td className="border px-4 py-2">
                    {ei === 0 && (
                      <>
                        {tab === "TermWise" && (
                          <input
                            type="radio"
                            checked={termChecked}
                            onChange={handleTermChange}
                            className="mr-2 accent-blue-600"
                          />
                        )}
                        {data.term}
                      </>
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {si === 0 && (
                      <>
                        <input
                          type="checkbox"
                          checked={!!examChecked[ei]}
                          onChange={() => handleExamChange(ei)}
                          className="mr-2 accent-blue-600"
                        />
                        {exam.name}
                      </>
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {si === 0 && (
                      <input
                        type="text"
                        className="w-full border border-gray-300 px-2 py-1 rounded"
                      />
                    )}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <input
                      type="radio"
                      name="grading"
                      className="accent-blue-600"
                    />
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <input
                      type="radio"
                      name="remark"
                      className="accent-blue-600"
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="flex w-full justify-end my-4">
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Save
          </button>
        </div>
      </div>
    )}

    {/* SingleTerm */}
    {tab === "SingleTerm" && (
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Term</th>
              <th className="border px-4 py-2 text-left">Exam Name</th>
            </tr>
          </thead>
          <tbody>
            {data.exams.map((exam, ei) =>
              exam.subjects.map((subject, si) => (
                <tr key={`${ei}-${si}`}>
                  <td className="border px-4 py-2">
                    {ei === 0 && data.term}
                  </td>
                  <td className="border px-4 py-2 flex items-center gap-3">
                    {si === 0 && (
                      <>
                        <input
                          type="radio"
                          name="grading"
                          className="accent-blue-600"
                        />
                        {exam.name}
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="flex w-full justify-end my-4">
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Save
          </button>
        </div>
      </div>
    )}
  </div>
</div>
  );
};

export default LinkExam;
