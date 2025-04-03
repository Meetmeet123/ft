import React, { useState } from "react";
import { message } from "antd";

const PhoneCallLogForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "2025-03-25", // Pre-filled with the date from the image
    description: "",
    nextFollowUpDate: "",
    callDuration: "",
    note: "",
    callType: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setShowSuccess(true);
      message.success("Record Saved Successfully");
      // Reset form (optional)
      setFormData({
        name: "",
        phone: "",
        date: "2025-03-25",
        description: "",
        nextFollowUpDate: "",
        callDuration: "",
        note: "",
        callType: "",
      });
    }, 1000);
  };

  return (
    <div className="p-6 w-full shadow-lg border-solid border-2 border-[#164f63]/60 shadow-gray-300 rounded-2xl">
      
      {showSuccess && (
        <div className="bg-green-100 text-green-700 p-2 rounded mb-4">
          Record Saved Successfully
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Name */}
        <div>
          <label className="block text-gray-700 font-medium text-lg">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-gray-700 font-medium text-lg">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
            required
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

        {/* Next Follow Up Date */}
        <div>
          <label className="block text-gray-700 font-medium text-lg">
            Next Follow Up Date
          </label>
          <input
            type="date"
            name="nextFollowUpDate"
            value={formData.nextFollowUpDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        {/* Call Duration */}
        <div>
          <label className="block text-gray-700 font-medium text-lg">
            Call Duration
          </label>
          <input
            type="text"
            name="callDuration"
            value={formData.callDuration}
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

        {/* Call Type */}
        <div>
          <label className="block text-gray-700 font-medium text-lg">
            Call Type <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="callType"
                value="Incoming"
                checked={formData.callType === "Incoming"}
                onChange={handleChange}
                className="mr-2"
                required
              />
              Incoming
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="callType"
                value="Outgoing"
                checked={formData.callType === "Outgoing"}
                onChange={handleChange}
                className="mr-2"
              />
              Outgoing
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold px-4 py-2 rounded transition"
            style={{ backgroundColor: "#164f63", border: "none" }}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default PhoneCallLogForm;