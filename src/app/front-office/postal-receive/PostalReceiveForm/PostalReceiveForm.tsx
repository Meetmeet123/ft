import React, { useState } from "react";
import { message } from "antd";

const PostalReceiveForm = () => {
  const [formData, setFormData] = useState<{
    toTitle: string;
    referenceNo: string;
    address: string;
    note: string;
    fromTitle: string;
    date: string;
    document: File | null;
  }>({
    toTitle: "",
    referenceNo: "",
    address: "",
    note: "",
    fromTitle: "",
    date: "2025-03-25", // Pre-filled with the date from the image
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
        toTitle: "",
        referenceNo: "",
        address: "",
        note: "",
        fromTitle: "",
        date: "2025-03-25",
        document: null,
      });
    }, 1000);
  };

  return (
    <div className="p-6 w-60% shadow-lg border-solid border-2 border-[#164f63]/60 shadow-gray-300 rounded-2xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* To Title */}
        <div>
          <label className="block text-gray-700 font-medium text-lg">
            To Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="toTitle"
            value={formData.toTitle}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
            required
          />
        </div>

        {/* Reference No */}
        <div>
          <label className="block text-gray-700 font-medium text-lg">
            Reference No
          </label>
          <input
            type="text"
            name="referenceNo"
            value={formData.referenceNo}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-gray-700 font-medium text-lg">
            Address
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
            rows={3}
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

        {/* From Title */}
        <div>
          <label className="block text-gray-700 font-medium text-lg">
            From Title
          </label>
          <input
            type="text"
            name="fromTitle"
            value={formData.fromTitle}
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

export default PostalReceiveForm;