"use client";
import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons"; // Ant Design Icon

const PayrollForm = () => {
  // Data inside the component
  const roles = [
    "Admin",
    "Teacher",
    "Accountant",
    "Librarian",
    "Receptionist",
    "Super Admin",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years = ["2024", "2025"];

  // State for form fields
  const [role, setRole] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected Criteria:", { role, month, year });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-5">
      <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
        <SearchOutlined /> Select Criteria
      </h3>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Role Selection */}
          <div>
            <label className="block font-medium">Role</label>
            <select
              className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select Role</option>
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Month Selection */}
          <div>
            <label className="block font-medium">Month</label>
            <select
              className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              <option value="">Select Month</option>
              {months.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* Year Selection */}
          <div>
            <label className="block font-medium">Year</label>
            <select
              className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="">Select Year</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            style={{ backgroundColor: "#164f63" }}
            className="flex items-center gap-2  text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-all"
          >
            <SearchOutlined /> Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default PayrollForm;
