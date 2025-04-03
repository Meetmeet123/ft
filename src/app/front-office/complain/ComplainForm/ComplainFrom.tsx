import React, { useState } from "react";
import { message } from "antd";

interface ComplainFormData {
  complainType: string;
  source: string;
  complainBy: string;
  phone: string;
  date: string;
  description: string;
  actionTaken: string;
  assigned: string;
  note: string;
  document: File | null;
}

const ComplainForm = () => {
  const [formData, setFormData] = useState<ComplainFormData>({
    complainType: "",
    source: "",
    complainBy: "",
    phone: "",
    date: "2025-03-25", // Pre-filled with the date from the image
    description: "",
    actionTaken: "",
    assigned: "",
    note: "",
    document: null,
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
      message.success("Record Saved Successfully");
      // Reset form (optional)
      setFormData({
        complainType: "",
        source: "",
        complainBy: "",
        phone: "",
        date: "2025-03-25",
        description: "",
        actionTaken: "",
        assigned: "",
        note: "",
        document: null,
      });
    }, 1000);
  };

  return (
    <div className="p-6 w-full shadow-lg border-solid border-2 border-[#164f63]/60 shadow-gray-300 rounded-2xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Complain Type */}
        <div>
          <label className="block text-gray-700 font-medium text-lg">
            Complain Type
          </label>
          <select
            name="complainType"
            value={formData.complainType}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
          >
            <option value="">Select</option>
            <option value="Service">Service</option>
            <option value="Product">Product</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Source */}
        <div>
          <label className="block text-gray-700 font-medium text-lg">
            Source
          </label>
          <select
            name="source"
            value={formData.source}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
          >
            <option value="">Select</option>
            <option value="Phone">Phone</option>
            <option value="Email">Email</option>
            <option value="In-Person">In-Person</option>
          </select>
        </div>

        {/* Complain By */}
        <div>
          <label className="block text-gray-700 font-medium text-lg">
            Complain By <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="complainBy"
            value={formData.complainBy}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-gray-700 font-medium text-lg">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-gray-700 font-medium text-lg">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
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

        {/* Action Taken */}
        <div>
          <label className="block text-gray-700 font-medium text-lg">
            Action Taken
          </label>
          <textarea
            name="actionTaken"
            value={formData.actionTaken}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
            rows={3}
          />
        </div>

        {/* Assigned */}
        <div>
          <label className="block text-gray-700 font-medium text-lg">
            Assigned
          </label>
          <input
            type="text"
            name="assigned"
            value={formData.assigned}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        {/* Note */}
        <div>
          <label className="block text-gray-700 font-medium text-lg">
            Note
          </label>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
            rows={3}
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

export default ComplainForm;