"use client";
import { useState } from "react";

const ApproveLeaveRequestAdd = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    role: "",
    name: "",
    applyDate: "",
    leaveType: "",
    leaveFromDate: "",
    leaveToDate: "",
    reason: "",
    note: "",
    file: null,
    status: "pending",
  });

  const roles = [
    "Admin",
    "Teacher",
    "Accountant",
    "Librarian",
    "Receptionist",
    "Super Admin",
  ];
  const leaveTypes = [
    "Medical Leave",
    "Casual Leave",
    "Maternity Leave",
    "Sick Leave",
  ];

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({ ...formData, [name]: type === "file" ? files[0] : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted: ", formData);
  };

  return (
    <div>
      {/* Header Section */}
      <div className="flex justify-between items-center border-b bg-white shadow-md rounded-lg p-4 mt-5">
        <h3 className="text-lg font-semibold">Approve Leave Request</h3>
        <button
          onClick={() => setIsOpen(true)}
          style={{ backgroundColor: "#164f63" }}
          className=" text-white px-4 py-2 text-sm rounded hover:bg-teal-600 transition"
        >
          Add Leave Request
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg w-1/3 max-h-[90vh] overflow-y-auto">
            <h4 className="text-lg font-bold mb-4">Add Details</h4>
            <form onSubmit={handleSubmit}>
              {/* Role */}
              <label className="block text-sm font-medium">Role *</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-2 text-sm"
              >
                <option value="">Select</option>
                {roles.map((role, idx) => (
                  <option key={idx} value={role}>
                    {role}
                  </option>
                ))}
              </select>

              {/* Name */}
              <label className="block text-sm font-medium">Name *</label>
              <select
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-2 text-sm"
              >
                <option value="">Select</option>
              </select>

              {/* Apply Date */}
              <label className="block text-sm font-medium">Apply Date *</label>
              <input
                type="date"
                name="applyDate"
                value={formData.applyDate}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-2 text-sm"
              />

              {/* Leave Type */}
              <label className="block text-sm font-medium">Leave Type *</label>
              <select
                name="leaveType"
                value={formData.leaveType}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-2 text-sm"
              >
                <option value="">Select</option>
                {leaveTypes.map((type, idx) => (
                  <option key={idx} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              {/* Leave Dates */}
              <label className="block text-sm font-medium">
                Leave From Date *
              </label>
              <input
                type="date"
                name="leaveFromDate"
                value={formData.leaveFromDate}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-2 text-sm"
              />

              <label className="block text-sm font-medium">
                Leave To Date *
              </label>
              <input
                type="date"
                name="leaveToDate"
                value={formData.leaveToDate}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-2 text-sm"
              />

              {/* Reason & Note */}
              <label className="block text-sm font-medium">Reason</label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-2 text-sm"
                rows="2"
              ></textarea>

              <label className="block text-sm font-medium">Note</label>
              <textarea
                name="note"
                value={formData.note}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-2 text-sm"
                rows="2"
              ></textarea>

              {/* File Upload */}
              <label className="block text-sm font-medium">
                Attach Document
              </label>
              <input
                type="file"
                name="file"
                onChange={handleChange}
                className="w-full p-2 border rounded mb-2 text-sm"
              />

              {/* Status */}
              <label className="block text-sm font-medium">Status</label>
              <div className="mb-4 text-sm">
                <label className="mr-4">
                  <input
                    type="radio"
                    name="status"
                    value="pending"
                    checked={formData.status === "pending"}
                    onChange={handleChange}
                  />{" "}
                  Pending
                </label>
                <label className="mr-4">
                  <input
                    type="radio"
                    name="status"
                    value="approved"
                    checked={formData.status === "approved"}
                    onChange={handleChange}
                  />{" "}
                  Approved
                </label>
                <label>
                  <input
                    type="radio"
                    name="status"
                    value="disapproved"
                    checked={formData.status === "disapproved"}
                    onChange={handleChange}
                  />{" "}
                  Disapproved
                </label>
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  style={{ backgroundColor: "red" }}
                  className=" text-white px-4 py-2 text-sm rounded hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: "#164f63" }}
                  className="text-white px-4 py-2 text-sm rounded hover:bg-teal-600 ml-2 transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApproveLeaveRequestAdd;
