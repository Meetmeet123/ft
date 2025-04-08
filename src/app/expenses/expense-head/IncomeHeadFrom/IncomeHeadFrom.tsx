import React, { useState } from "react";
import { message } from "antd";

const IncomeHeadFrom = () => {
  const [formData, setFormData] = useState({
    Incomehead: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      message.success("Record Saved Successfully");
      // Reset form (optional)
      setFormData({
        Incomehead: "",
        description: "",
      });
    }, 1000);
  };

  return (
    <div className=" w-full   border-[#164f63]/60 shadow-gray-300 rounded-2xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Incomehead Type */}
        <div>
          <label className="block text-gray-700 font-medium text-lg">
          Expense Head <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="Incomehead"
            value={formData.Incomehead}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium text-lg">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
            rows={3}
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold px-4 py-2 rounded transition"
            style={{ backgroundColor: "#164f63" }}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default IncomeHeadFrom;