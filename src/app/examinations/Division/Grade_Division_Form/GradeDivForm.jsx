import React, { useState } from "react";

const GradeDivForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    divisionName: "",
    markFrom: "",
    markUpto: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    setFormData({ divisionName: "", markFrom: "", markUpto: "" });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border mt-5 border-gray-200 w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Division Name</label>
          <input
            type="text"
            name="divisionName"
            value={formData.divisionName}
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

        <button
          type="submit"
          className="bg-[#164f63] hover:bg-teal-700 text-white font-bold px-4 py-2 rounded transition flex items-center"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default GradeDivForm;
