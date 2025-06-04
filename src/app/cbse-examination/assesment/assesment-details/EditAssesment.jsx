"use client";
import { useState } from "react";
import { X } from "lucide-react";

function EditGrade({ content, handleEdit, onClose }) {
  const [displayContent, setDisplayContent] = useState(content);

  return (
    <div className="fixed inset-0 z-50 bg-opacity-50 flex items-center justify-center p-2">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        
        <div className="mb-4 flex justify-between items-center">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Edit Grade</h3>
          <X className="cursor-pointer w-6 h-6" onClick={onClose} />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Grade Title</label>
          <input
            type="text"
            value={displayContent.title}
            onChange={(e) =>
              setDisplayContent({ ...displayContent, title: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={displayContent.description}
            onChange={(e) =>
              setDisplayContent({ ...displayContent, description: e.target.value })
            }
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2 text-sm font-semibold text-gray-700 whitespace-nowrap">Grade <span className="text-red-500">*</span></th>
                <th className="px-4 py-2 text-sm font-semibold text-gray-700 whitespace-nowrap">Code</th>
                <th className="px-4 py-2 text-sm font-semibold text-gray-700 whitespace-nowrap">Maximum % <span className="text-red-500">*</span></th>
                <th className="px-4 py-2 text-sm font-semibold text-gray-700 whitespace-nowrap">Minimum % <span className="text-red-500">*</span></th>
                <th className="px-4 py-2 text-sm font-semibold text-gray-700">Remark</th>
                <th className="px-4 py-2 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayContent.grades.map((grade, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={grade.grade}
                      onChange={(e) => {
                        const temp = displayContent.grades.map((g, i) =>
                          i === index ? { ...g, grade: e.target.value } : g
                        );
                        setDisplayContent({ ...displayContent, grades: temp });
                      }}
                      className="w-full px-2 py-1 border border-gray-300 rounded-md"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={grade.code}
                      onChange={(e) => {
                        const temp = displayContent.grades.map((g, i) =>
                          i === index ? { ...g, code: e.target.value } : g
                        );
                        setDisplayContent({ ...displayContent, grades: temp });
                      }}
                      className="w-full px-2 py-1 border border-gray-300 rounded-md"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      value={grade.maxPercentage}
                      onChange={(e) => {
                        const temp = displayContent.grades.map((g, i) =>
                          i === index ? { ...g, maxPercentage: e.target.value } : g
                        );
                        setDisplayContent({ ...displayContent, grades: temp });
                      }}
                      className="w-full px-2 py-1 border border-gray-300 rounded-md"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      value={grade.minPercentage}
                      onChange={(e) => {
                        const temp = displayContent.grades.map((g, i) =>
                          i === index ? { ...g, minPercentage: e.target.value } : g
                        );
                        setDisplayContent({ ...displayContent, grades: temp });
                      }}
                      className="w-full px-2 py-1 border border-gray-300 rounded-md"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={grade.remark}
                      onChange={(e) => {
                        const temp = displayContent.grades.map((g, i) =>
                          i === index ? { ...g, remark: e.target.value } : g
                        );
                        setDisplayContent({ ...displayContent, grades: temp });
                      }}
                      className="w-full px-2 py-1 border border-gray-300 rounded-md"
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

        <div className="flex justify-end mt-6">
          <button
            onClick={() => handleEdit(displayContent)}
            className="btn btn-primary text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditGrade;
