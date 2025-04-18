"use client";
import { useState } from "react";

const AddLeaveType = () => {
  const [leaveType, setLeaveType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Leave Type Submitted:", leaveType);
    setLeaveType("");
  };

  return (
    <div className="flex-1 h-fit  bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Add Leave Type</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700"
          >
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="type"
            name="type"
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          style={{ backgroundColor: "#164f63" }}
          className="w-full  text-white py-2 px-4 rounded-md hover:bg-teal-700"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default AddLeaveType;
