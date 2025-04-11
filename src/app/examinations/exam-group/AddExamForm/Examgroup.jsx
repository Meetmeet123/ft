import { useState } from "react";

export default function ExamGroupForm() {
  const [formData, setFormData] = useState({
    name: "",
    exam_type: "",
    description: "",
    ci_csrf_token: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Add fetch/axios request here if needed
  };

  return (
    <div className="md:w-full mx-auto p-6 shadow-lg border-solid border-2 border-[#164f63]/60 shadow-gray-300 rounded-2xl  ">
      <h3 className="text-xl font-extrabold mb-4">Add Exam Group</h3>
      <form id="form1" onSubmit={handleSubmit}>
        <input
          type="hidden"
          name="ci_csrf_token"
          value={formData.ci_csrf_token}
        />

        <div className="mb-4">
          <label className="block text-gray-700">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.name}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">
            Exam Type <span className="text-red-500">*</span>
          </label>
          <select
            name="exam_type"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.exam_type}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="basic_system">General Purpose (Pass/Fail)</option>
            <option value="school_grade_system">
              School Based Grading System
            </option>
            <option value="coll_grade_system">
              College Based Grading System
            </option>
            <option value="gpa">GPA Grading System</option>
            <option value="average_passing">Average Passing</option>
          </select>
        </div>

        <div className="mb-4">
          {<span className="font-medium text-[#333]">Description</span>}
          <textarea
            name="description"
            className="w-full p-2 border border-gray-300 rounded"
            rows="3"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-teal-500 hover:bg-teal-700 text-white font-bold  px-2 py-1 rounded mr-2"
        >
          Save
        </button>
      </form>
    </div>
  );
}
