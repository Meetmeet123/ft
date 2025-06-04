"use client";
import React, { useState } from "react";

const AddDepartment = () => {
  const [departmentName, setDepartmentName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    console.log("Department Name:", departmentName);
    // You can log other details or perform further actions here
  };

  return (
    <div className="bg-white shadow-md h-fit rounded-lg flex-1">
      <ToastContainer/>
      <div className=" p-6">
        <h3 className="text-lg font-semibold mb-4">Add Department</h3>
        <form id="form1" onSubmit={handleSubmit}>
          <div className="mb-4">
            <input type="hidden" name="ci_csrf_token" value="" />
            <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700"
              >
                Name <span className="text-red-500">*</span>
              </label>
              <input
                autoFocus
                id="type"
                name="type"
                placeholder=""
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)} // Update state on input change
                autoComplete="off"
              />
              <span className="text-red-500"></span>
              <input
                id="departmenttypeid"
                name="departmenttypeid"
                type="hidden"
                value=""
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              style={{ backgroundColor: "#164f63" }}
              className=" text-white py-2 px-4 rounded hover:bg-teal-600 transition duration-200"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;
