import React, { useState } from "react";

const GradeForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    examType: "",
    gradeName: "",
    markFrom: "",
    markUpto: "",
    gradePoint: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    setFormData({
      examType: "",
      gradeName: "",
      markFrom: "",
      markUpto: "",
      gradePoint: "",
      description: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
    >
      <h3 className="text-lg font-semibold mb-4">Add Marks Grade</h3>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700">Exam Type</label>
          <select
            name="examType"
            value={formData.examType}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
            required
          >
            <option value="">Select</option>
            <option value="General Purpose (Pass/Fail)">
              General Purpose (Pass/Fail)
            </option>
            <option value="School Based Grading System">
              School Based Grading System
            </option>
            <option value="College Based Grading System">
              College Based Grading System
            </option>
            <option value="GPA Grading System">GPA Grading System</option>
            <option value="Average Passing">Average Passing</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700">Grade Name</label>
          <input
            type="text"
            name="gradeName"
            value={formData.gradeName}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Percent From</label>
          <input
            type="number"
            name="markFrom"
            value={formData.markFrom}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Percent Upto</label>
          <input
            type="number"
            name="markUpto"
            value={formData.markUpto}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Grade Point</label>
          <input
            type="number"
            name="gradePoint"
            value={formData.gradePoint}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
            required
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-gray-700">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
          rows="3"
        ></textarea>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          style={{ backgroundColor: "#164f63" }}
          className=" hover:bg-teal-700 text-white font-bold px-4 py-2 rounded transition flex items-center"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default GradeForm;
