import React, { useState } from "react";
import { message } from "antd";

const AddIncomeForm = () => {
  const [formData, setFormData] = useState<{
    incomeHead: string;
    name: string;
    invoiceNumber: string;
    date: string;
    amount: string;
    document: File | null;
    description: string;
  }>({
    incomeHead: "",
    name: "",
    invoiceNumber: "",
    date: "2025-03-31", // Pre-filled with the current date as per the system
    amount: "",
    document: null,
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, document: file }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      message.success("Income Record Saved Successfully");
      // Reset form
      setFormData({
        incomeHead: "",
        name: "",
        invoiceNumber: "",
        date: "2025-03-31",
        amount: "",
        document: null,
        description: "",
      });
    }, 1000);
  };

  return (
    <div className=" border-[#164f63]/60 shadow-gray-300 rounded-2xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Income Head */}
        <div>
          <label className="block text-gray-700 font-medium text-lg">
            Expense Head <span className="text-red-500">*</span>
          </label>
          <select
            name="incomeHead"
            value={formData.incomeHead}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
            required
          >
            <option value="">Select</option>
            <option value="salary">Salary</option>
            <option value="freelance">Freelance</option>
            <option value="investment">Investment</option>
            {/* Add more options as needed */}
          </select>
        </div>

        {/* Name */}
        <div>
          <label className="block text-gray-700 font-medium text-lg">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
            required
          />
        </div>

        {/* Invoice Number */}
        <div>
          <label className="block text-gray-700 font-medium text-lg">
            Invoice Number
          </label>
          <input
            type="text"
            name="invoiceNumber"
            value={formData.invoiceNumber}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-gray-700 font-medium text-lg">
            Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
            required
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block text-gray-700 font-medium text-lg">
            Amount <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
            required
          />
        </div>

        {/* Attach Document */}
        <div>
          <label className="block text-gray-700 font-medium text-lg">
            Attach Document
          </label>
          <div className="relative">
            <input
              type="file"
              name="document"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400 opacity-0 absolute inset-0 cursor-pointer"
            />
            <div className="w-full p-2 border border-gray-300 rounded flex items-center justify-center text-gray-500">
              <span className="mr-2">☁️</span> Drag and drop a file here or click
            </div>
          </div>
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
            className="bg-gray-600 hover:bg-gray-700 text-white font-medium px-4 py-2 rounded transition"
            style={{ backgroundColor: "#164f63", border: "none" }}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddIncomeForm;