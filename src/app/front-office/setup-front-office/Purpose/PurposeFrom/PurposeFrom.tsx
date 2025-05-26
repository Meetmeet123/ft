"use client";
import React, { useState, useEffect } from "react";
import { message } from "antd";

interface PurposeFormProps {
  editData?: {
    id: number;
    visitors_purpose: string;
    description: string;
  };
  refreshList: () => void;
}

const PurposeForm = ({ editData, refreshList }: PurposeFormProps) => {
  const [formData, setFormData] = useState({
    visitors_purpose: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editData) {
      setFormData({
        visitors_purpose: editData.visitors_purpose,
        description: editData.description || "", // Handle possible undefined
      });
    } else {
      setFormData({
        visitors_purpose: "",
        description: "",
      });
    }
  }, [editData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editData
        ? `https://school2025.dolittletech.co.in/api/visitors-purposes/${editData.id}`
        : "https://school2025.dolittletech.co.in/api/visitors-purposes";

      const method = editData ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          // Add authorization header if needed
          // "Authorization": `Bearer ${yourToken}`
        },
        body: JSON.stringify({
          visitors_purpose: formData.visitors_purpose,
          description: formData.description,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Operation failed");
      }

      message.success(
        editData 
          ? "Purpose updated successfully" 
          : "Purpose created successfully"
      );
      
      // Reset form and refresh list
      if (!editData) {
        setFormData({
          visitors_purpose: "",
          description: "",
        });
      }
      refreshList();
    } catch (error) {
      console.error("API Error:", error);
      message.error(
        error instanceof Error 
          ? error.message 
          : "Operation failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full border-[#164f63]/60 shadow-gray-300 rounded-2xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-gray-700 font-medium text-lg">
            Purpose Type <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="visitors_purpose"
            value={formData.visitors_purpose}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium text-lg">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
            rows={3}
            disabled={loading}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#164f63] hover:bg-[#0e3a4a] text-black font-bold px-4 py-2 rounded transition"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : editData ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PurposeForm;