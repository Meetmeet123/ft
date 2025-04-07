"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SearchOutlined } from "@ant-design/icons";

const AttendanceForm = ({ roles }) => {
  const router = useRouter();
  const [role, setRole] = useState("select");
  const [roleOptions, setRoleOptions] = useState(
    roles || ["Admin", "Manager", "Employee"]
  );
  const date = "03/31/2025";

  useEffect(() => {
    // Console log instead of fetching
    console.log("Available roles:", roleOptions);
  }, [roleOptions]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Selected Role: ${role}, Date: ${date}`);
    router.push(`/admin/staffattendance?role=${role}&date=${date}`);
  };

  return (
    <div className="bg-white mt-5 p-6 shadow-md rounded-md">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <SearchOutlined className="mr-2" /> Select Criteria
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label className="block text-gray-700">Role</label>
            <select
              id="role"
              name="user_id"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border rounded-md p-2"
            >
              <option value="select">Select</option>
              {roleOptions.map((roleOption) => (
                <option key={roleOption} value={roleOption}>
                  {roleOption}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="block text-gray-700">Attendance Date</label>
            <input
              type="text"
              name="date"
              value={date}
              readOnly
              className="w-full border rounded-md p-2 bg-gray-100 cursor-not-allowed"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            style={{ backgroundColor: "#164f63" }}
            className=" text-white px-4 py-2 rounded-md hover:bg-teal-600 flex items-center"
          >
            <SearchOutlined className="mr-2" /> Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default AttendanceForm;
