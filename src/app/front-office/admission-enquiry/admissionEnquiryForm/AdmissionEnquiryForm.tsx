"use client";
import { SearchOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import axios from "axios";
import { message } from "antd";

interface EnquiryData {
  id?: number;
  name: string;
  contact: string;
  address: string;
  reference: string;
  date: string;
  description: string;
  follow_up_date: string;
  note: string;
  source: string;
  email: string;
  assigned: string;
  class: number;
  no_of_child: number;
  status: string;
}

const AdmissionEnquiryForm = ({ 
  onSearch,
  refreshList 
}: { 
  onSearch: (data: EnquiryData[]) => void;
  refreshList: () => void;
}) => {
  const [source, setSource] = useState("");
  const [enquiryFromDate, setEnquiryFromDate] = useState("");
  const [enquiryToDate, setEnquiryToDate] = useState("");
  const [status, setStatus] = useState("active");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    // Validate at least one filter is selected
    if (!source && !enquiryFromDate && !enquiryToDate && !status) {
      message.warning("Please select at least one filter criteria");
      return;
    }

    // Validate date range if both dates are provided
    if (enquiryFromDate && enquiryToDate && enquiryFromDate > enquiryToDate) {
      message.error("From date cannot be after To date");
      return;
    }

    setLoading(true);
    
    try {
      const params = new URLSearchParams();
      if (source) params.append('source', source);
      if (enquiryFromDate) params.append('from_date', enquiryFromDate);
      if (enquiryToDate) params.append('to_date', enquiryToDate);
      if (status) params.append('status', status.toLowerCase());

      const response = await axios.get(
        `https://school2025.dolittletech.co.in/api/enquiry?${params.toString()}`
      );
      
      // Check if we got filtered data
      if (response.data.data && response.data.data.length > 0) {
        onSearch(response.data.data);
      } else {
        message.info("No records found matching your criteria");
        onSearch([]); // Clear the table
      }
    } catch (error) {
      console.error("Error fetching enquiries:", error);
      message.error("Failed to fetch filtered data");
      onSearch([]); // Clear the table on error
    } finally {
      setLoading(false);
    }
  }

  const handleReset = () => {
    setSource("");
    setEnquiryFromDate("");
    setEnquiryToDate("");
    setStatus("active");
    refreshList(); // Refresh to show all data
  };

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
              <option value="">All Sources</option>
              <option value="NewsPaper">Newspaper</option>
              <option value="SocialMedia">Social Media</option>
              <option value="Reference">Reference</option>
              <option value="Website">Website</option>
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
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
              value={enquiryFromDate}
              onChange={(e) => setEnquiryFromDate(e.target.value)}
              max={enquiryToDate || undefined}
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
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
              value={enquiryToDate}
              onChange={(e) => setEnquiryToDate(e.target.value)}
              min={enquiryFromDate || undefined}
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="">All Statuses</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mb-4 flex gap-2">
          <button
            type="submit"
            className="bg-gray-600 hover:bg-gray-700 text-white font-medium px-4 py-2 rounded transition flex items-center gap-2"
            style={{ backgroundColor: "#164f63", border: "none" }}
            disabled={loading}
          >
            <SearchOutlined /> {loading ? "Searching..." : "Search"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-4 py-2 rounded transition"
          >
            Reset
          </button>
        </div>
      </div>
    </form>
  );
};

export default AdmissionEnquiryForm;