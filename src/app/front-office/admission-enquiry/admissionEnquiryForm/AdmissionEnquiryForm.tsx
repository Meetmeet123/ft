import { SearchOutlined } from "@ant-design/icons";
import React, { useState } from "react";

const AdmissionEnquiryForm = () => {
  const [source, setSource] = useState("");
  const [enquiryFromDate, setEnquiryFromDate] = useState("");
  const [enquiryToDate, setEnquiryToDate] = useState("");
  const [status, setStatus] = useState("Active");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Make API call here
  }

  return (
    <form onSubmit={handleSubmit} className="p-2.5">
      <div className="flex flex-row items-end gap-4 mt-5 mx-2">
        {/* Source Dropdown */}
        <div className="flex-1 min-w-0">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium text-lg">
              Source
            </label>
            <select
              id="source"
              name="source"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            >
              <option value="">Select</option>
              <option value="1">Newspaper</option>
            </select>
          </div>
        </div>

        {/* Enquiry From Date */}
        <div className="flex-1 min-w-0">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium text-lg">
              Enquiry From Date
            </label>
            <input
              type="date"
              id="enquiry_from_date"
              name="enquiry_from_date"
              placeholder="dd-mm-yyyy"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
              value={enquiryFromDate}
              onChange={(e) => setEnquiryFromDate(e.target.value)}
            />
          </div>
        </div>

        {/* Enquiry To Date */}
        <div className="flex-1 min-w-0">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium text-lg">
              Enquiry To Date
            </label>
            <input
              type="date"
              id="enquiry_to_date"
              name="enquiry_to_date"
              placeholder="dd-mm-yyyy"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
              value={enquiryToDate}
              onChange={(e) => setEnquiryToDate(e.target.value)}
            />
          </div>
        </div>

        {/* Status Dropdown */}
        <div className="flex-1 min-w-0">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium text-lg">
              Status
            </label>
            <select
              id="status"
              name="status"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Search Button */}
        <div className="mb-4">
          <button
            type="submit"
            className="bg-gray-600 hover:bg-gray-700 text-white font-medium px-4 py-2 rounded transition"
            style={{ backgroundColor: "#164f63", border: "none" }}
          >
            <SearchOutlined /> Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default AdmissionEnquiryForm;