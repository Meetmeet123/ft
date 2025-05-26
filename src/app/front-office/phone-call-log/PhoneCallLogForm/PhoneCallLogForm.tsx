 

"use client";
import React, { useState, useEffect } from "react";
import { message } from "antd";

interface PhoneCallLogFormProps {
  refreshList: () => void;
  editData: any | null;
  setEditData: (data: any | null) => void;
}

const API_URL = "https://school2025.dolittletech.co.in/api/general-calls";

const PhoneCallLogForm = ({ refreshList, editData, setEditData }: PhoneCallLogFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    date: new Date().toISOString().split('T')[0],
    description: "",
    follow_up_date: "",
    call_dureation: "",
    note: "",
    call_type: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name || "",
        contact: editData.contact || "",
        date: editData.date ? editData.date.split('T')[0] : new Date().toISOString().split('T')[0],
        description: editData.description || "",
        follow_up_date: editData.follow_up_date ? editData.follow_up_date.split('T')[0] : "",
        call_dureation: editData.call_dureation || "",
        note: editData.note || "",
        call_type: editData.call_type || "",
      });
    } else {
      setFormData({
        name: "",
        contact: "",
        date: new Date().toISOString().split('T')[0],
        description: "",
        follow_up_date: "",
        call_dureation: "",
        note: "",
        call_type: "",
      });
    }
  }, [editData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editData ? `${API_URL}/${editData.id}` : API_URL;
      const method = editData ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      await response.json();
      message.success(editData ? 'Record updated successfully' : 'Record created successfully');
      refreshList();
      setEditData(null);
    } catch (error) {
      message.error('Error saving record');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 w-full shadow-lg border-solid border-2 border-[#164f63]/60 shadow-gray-300 rounded-2xl">
      <h2 className="text-xl font-bold mb-4">{editData ? 'Edit Phone Call Log' : 'Add Phone Call Log'}</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-gray-700 font-medium text-lg">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-gray-700 font-medium text-lg">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
            required
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-gray-700 font-medium text-lg">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        {/* Description */}
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
          />
        </div>

        {/* Next Follow Up Date */}
        <div>
          <label className="block text-gray-700 font-medium text-lg">
            Next Follow Up Date
          </label>
          <input
            type="date"
            name="follow_up_date"
            value={formData.follow_up_date}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        {/* Call Duration */}
        <div>
          <label className="block text-gray-700 font-medium text-lg">
            Call Duration
          </label>
          <input
            type="text"
            name="call_dureation"
            value={formData.call_dureation}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        {/* Note */}
        <div>
          <label className="block text-gray-700 font-medium text-lg">Note</label>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
            rows={3}
          />
        </div>

        {/* Call Type */}
        <div>
          <label className="block text-gray-700 font-medium text-lg">
            Call Type <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="call_type"
                value="Incoming"
                checked={formData.call_type === "Incoming"}
                onChange={handleChange}
                className="mr-2"
                required
              />
              Incoming
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="call_type"
                value="Outgoing"
                checked={formData.call_type === "Outgoing"}
                onChange={handleChange}
                className="mr-2"
              />
              Outgoing
            </label>
          </div>
        </div>
        
        <div className="flex justify-end gap-4">
          {editData && (
            <button
              type="button"
              onClick={() => setEditData(null)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className="bg-[#164f63] hover:bg-[#0e3a4a] text-white font-bold px-4 py-2 rounded disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PhoneCallLogForm;