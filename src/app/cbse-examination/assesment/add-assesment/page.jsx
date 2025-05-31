"use client";
import React, { useState } from 'react';
import { X } from "lucide-react";

function AddGrade({ handleAdd, onClose }) {
  const [displayContent, setDisplayContent] = useState({
    title: "",
    description: "",
    grades: [{}],
  });

  const addField = () => {
    const newField = {};
    setDisplayContent({
      ...displayContent,
      grades: [...displayContent.grades, newField],
    });
  };

  return (
       <div className="fixed inset-0 z-50 bg-opacity-50 flex items-center justify-center p-2">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg p-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <h3 className="text-2xl font-semibold text-gray-800">Edit Grade</h3>
          <X className="w-6 h-6 text-gray-600 hover:text-red-500 cursor-pointer" onClick={onClose} />
        </div>

        {/* Title Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Grade Title</label>
          <input
            type="text"
            value={displayContent.title}
            onChange={(e) => setDisplayContent({ ...displayContent, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={displayContent.description}
            onChange={(e) => setDisplayContent({ ...displayContent, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Add Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={addField}
            className="btn btn-primary text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Add Grade Field
          </button>
        </div>

        {/* Grades Table */}
        <div className="max-h-[20vh] overflow-x-auto">
          <table className="w-full table-auto border border-gray-200 rounded-md shadow-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2 text-sm font-semibold text-gray-700 whitespace-nowrap">
                  Grade <span className="text-red-500">*</span>
                </th>
                <th className="px-4 py-2 text-sm font-semibold text-gray-700 whitespace-nowrap">
                  Maximum % <span className="text-red-500">*</span>
                </th>
                <th className="px-4 py-2 text-sm font-semibold text-gray-700 whitespace-nowrap">
                  Minimum % <span className="text-red-500">*</span>
                </th>
                <th className="px-4 py-2 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayContent.grades.map((grade, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      value={grade.grade || ""}
                      onChange={(e) => {
                        const temp = displayContent.grades.map((g, i) =>
                          i === index ? { ...g, grade: e.target.value } : g
                        );
                        setDisplayContent({ ...displayContent, grades: temp });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      value={grade.maxPercentage || ""}
                      onChange={(e) => {
                        const temp = displayContent.grades.map((g, i) =>
                          i === index ? { ...g, maxPercentage: e.target.value } : g
                        );
                        setDisplayContent({ ...displayContent, grades: temp });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      value={grade.minPercentage || ""}
                      onChange={(e) => {
                        const temp = displayContent.grades.map((g, i) =>
                          i === index ? { ...g, minPercentage: e.target.value } : g
                        );
                        setDisplayContent({ ...displayContent, grades: temp });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <X
                      onClick={() => {
                        const updatedGrades = displayContent.grades.filter((_, idx) => idx !== index);
                        setDisplayContent({ ...displayContent, grades: updatedGrades });
                      }}
                      className="w-5 h-5 text-red-500 cursor-pointer hover:scale-110 transition"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={() => handleAdd(displayContent)}
            className="btn btn-primary text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddGrade;
