"use client";
import React, { useState } from 'react';

const AddClassForm = () => {
  const [className, setClassName] = useState("");
  const [selectedSections, setSelectedSections] = useState([]);
  const sections = [
    { id: 1, label: "A" },
    { id: 2, label: "B" },
    { id: 3, label: "C" },
    { id: 4, label: "D" },
    { id: 7, label: "E" },
  ];

  const handleSectionChange = (id) => {
    setSelectedSections((prev) =>
      prev.includes(id)
        ? prev.filter((section) => section !== id)
        : [...prev, id]
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      className,
      sections: selectedSections,
    });
  };

  return (
    <div className="flex-1 h-fit bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-semibold border-b pb-3">Add Class</h3>

      <form onSubmit={handleSubmit} className="mt-4">
        {/* Class Input */}
        <div className="mb-4">
          <label className="block font-medium">Class Name</label>
          <input
            type="text"
            placeholder="Enter class name"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>

        {/* Sections Selection */}
        <div className="mb-4">
          <label className="block font-medium">Sections</label>
          <div className="grid grid-cols-3 gap-3 mt-2">
            {sections.map((section) => (
              <label key={section.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedSections.includes(section.id)}
                  onChange={() => handleSectionChange(section.id)}
                />
                {section.label}
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            style={{ backgroundColor: "#164f63" }}
            className=" text-white px-4 py-2 rounded-md hover:teal-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClassForm;
