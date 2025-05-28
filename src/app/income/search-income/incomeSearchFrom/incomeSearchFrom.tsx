import { SearchOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { message } from "antd";

interface IncomeSearchFormProps {
  setSearchParams: React.Dispatch<React.SetStateAction<any>>;
  setRefreshList: React.Dispatch<React.SetStateAction<boolean>>;
}

const IncomeSearchForm: React.FC<IncomeSearchFormProps> = ({ 
  setSearchParams,
  setRefreshList 
}) => {
  const [searchType, setSearchType] = useState("");
  const [searchValue, setSearchValue] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const params = new URLSearchParams();
      if (searchType) params.append('search_type', searchType);
      if (searchValue) params.append('search_value', searchValue);

      const response = await fetch(`http://127.0.0.1:8000/api/income/search?${params.toString()}`);
      const data = await response.json();
      
      if (response.ok) {
        setSearchParams({ searchType, searchValue });
        setRefreshList(prev => !prev);
      } else {
        message.error(data.message || "Search failed");
      }
    } catch (error) {
      message.error("Error performing search");
      console.error("Search error:", error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-2.5">
      <div className="flex flex-row items-end gap-4 mt-5 mx-2">
        {/* Search Type Dropdown */}
        <div className="flex-1 min-w-0">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium text-lg">
              Search Type *
            </label>
            <select
              id="search_type"
              name="search_type"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="">Select</option>
              <option value="name">Name</option>
              <option value="invoice_no">Invoice Number</option>
              <option value="inc_head_id">Income Head</option>
            </select>
          </div>
        </div>

        {/* Search Input */}
        <div className="flex-1 min-w-0">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium text-lg">
              Search *
            </label>
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Search..."
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
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

export default IncomeSearchForm;