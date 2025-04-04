"use client";
import React, { useState } from "react";

const StaffSearchCriteria = () => {
  // State to hold the selected role and search text
  const [selectedRole, setSelectedRole] = useState("");
  const [searchText, setSearchText] = useState("");

  // Dynamic options for roles
  const roles = [
    { value: "", label: "Select" },
    { value: "1", label: "Admin" },
    { value: "2", label: "Teacher" },
    { value: "3", label: "Accountant" },
    { value: "4", label: "Librarian" },
    { value: "6", label: "Receptionist" },
    { value: "7", label: "Super Admin" },
  ];

  // Handle search button click
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form submission
    console.log("Selected Role:", selectedRole);
    console.log("Search Text:", searchText);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="border-b border-gray-200 mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <i className="fa fa-search mr-2"></i> Select Criteria
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Role Selection Form */}
        <div className="p-4 rounded-lg">
          <form onSubmit={handleSearch}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Role <span className="text-red-500">*</span>
              </label>
              <select
                name="role"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              >
                {roles.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
              <span className="text-red-500"></span>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="btn btn-primary btn-sm bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                <i className="fa fa-search mr-1"></i> Search
              </button>
            </div>
          </form>
        </div>

        {/* Keyword Search Form */}
        <div className=" p-4 rounded-lg">
          <form onSubmit={handleSearch}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Search By Keyword
              </label>
              <input
                type="text"
                name="search_text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                placeholder="Search By Staff ID, Name, Role etc..."
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="btn btn-primary bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                <i className="fa fa-search mr-1"></i> Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StaffSearchCriteria;
