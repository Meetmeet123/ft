"use client";
import React, { useState } from "react";

const LeaveHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-4 bg-white mt-5 shadow-md rounded-lg">
      <div className="flex justify-between items-center ">
        <h3 className="text-lg font-semibold">Leaves</h3>
        <button
          onClick={() => setIsModalOpen(true)}
          style={{ backgroundColor: "#164f63" }}
          className="text-white text-sm px-4 py-2 rounded-md hover:bg-teal-600"
        >
          Apply Leave
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/2">
            <div className="flex justify-between items-center border-b pb-2">
              <h4 className="text-lg font-semibold">Add Details</h4>
            </div>
            <div className="mt-4">
              <form>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium">
                      Apply Date *
                    </label>
                    <input
                      type="text"
                      className="w-full border p-2 rounded-md bg-gray-100"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      Available Leave *
                    </label>
                    <select className="w-full border p-2 rounded-md">
                      <option value="">Select</option>
                      <option value="1">Medical Leave (2)</option>
                      <option value="2">Casual Leave (6)</option>
                      <option value="3">Maternity Leave (22)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      Leave From Date *
                    </label>
                    <input
                      type="text"
                      className="w-full border p-2 rounded-md bg-gray-100"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      Leave To Date *
                    </label>
                    <input
                      type="text"
                      className="w-full border p-2 rounded-md bg-gray-100"
                      readOnly
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium">Reason</label>
                  <textarea
                    className="w-full border p-2 rounded-md"
                    rows="4"
                  ></textarea>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium">
                    Attach Document
                  </label>
                  <input type="file" className="w-full border p-2 rounded-md" />
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    style={{ backgroundColor: "red" }}
                    className="text-white px-4 py-2 mr-1 rounded-md hover:bg-red-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{ backgroundColor: "#164f63" }}
                    className="text-white px-4 py-2 rounded-md hover:bg-teal-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveHeader;
