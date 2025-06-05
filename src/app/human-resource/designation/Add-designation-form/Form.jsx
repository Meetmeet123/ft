"use client";
import React from "react";
import { AddNewDesignation } from "../DesignationDetails"; // ensure this is the correct API function
import { toast, ToastContainer } from "react-toastify";

const AddDesignation = ({handleAddData}) => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const name = formData.get("name");
    const status = formData.get("status") === "on" ? "yes" : "no";

    const payloadData = { type: name, status };

    try {
      const response = await AddNewDesignation(payloadData);
      console.log(response);
      handleAddData(payloadData);
      // Optionally reset form or show success message here
      toast.success("Record Added")
      event.target.reset();
    } catch (error) {
      toast.error("Failed to Add new Record")
      console.error("Error adding designation:", error);
    }
  };

  return (
    <div className="flex-1">
      <ToastContainer/>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="border-b border-gray-200 mb-4">
          <h3 className="text-lg font-semibold">Add Designation</h3>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="off"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-500"
            />
          </div>

          {/* Status Checkbox */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-3">
              <input
                id="status"
                name="status"
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label htmlFor="status" className="text-sm text-gray-600">
                Active
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="text-white rounded-md px-4 py-2 hover:bg-teal-600"
              style={{ backgroundColor: "#164f63" }}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDesignation;
