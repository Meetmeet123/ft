"use client";
import { useState } from "react";

export default function AddSection() {
  const [section, setSection] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting section:", section);
    // Add API call logic here
  };

  return (
    <div className="flex-1 bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Add Section</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="section"
            className="block text-sm font-medium text-gray-700"
          >
            Section Name <span className="text-red-500">*</span>
          </label>
          <input
            id="section"
            name="section"
            type="text"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
            autoFocus
          />
        </div>
        <div className="text-right">
          <button
            type="submit"
            style={{ backgroundColor: "#164f63" }}
            className=" text-white px-4 py-2 rounded-md hover:bg-teal-600 transition"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
