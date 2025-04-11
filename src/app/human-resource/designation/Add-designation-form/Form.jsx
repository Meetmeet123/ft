"use client";
import React from "react";

const AddDesignation = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="flex-1">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="border-b border-gray-200 mb-4">
          <h3 className="text-lg font-semibold">Add Designation</h3>
        </div>
        <form id="form1" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-500"
              placeholder=""
              autoComplete="off"
              required
            />
            <span className="text-red-500"></span>
            <input
              id="designationid"
              name="designationid"
              type="hidden"
              className="form-control"
              value=""
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              style={{ backgroundColor: "#164f63" }}
              className=" text-white rounded-md px-4 py-2 hover:bg-teal-600"
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
