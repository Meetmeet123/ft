
"use client";
import React, { useState } from "react";
import { Button, message, Upload } from "antd";
import axios from "axios";

interface VisitorData {
  purpose: string;
  name: string;
  contact: string;
  id_proof: string;
  no_of_people: number;
  date: string;
  in_time: string;
  out_time: string;
  note: string;
  document?: File | null;
  photo?: File | null;
}

const VisitorBookForm = ({ refreshList }: { refreshList: () => void }) => {
  const [formData, setFormData] = useState<VisitorData>({
    purpose: "",
    name: "",
    contact: "",
    id_proof: "",
    no_of_people: 1,
    date: new Date().toISOString().split("T")[0],
    in_time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    out_time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    note: "",
    document: null,
    photo: null
  });
  const [loading, setLoading] = useState(false);

  const countWords = (text: string) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Word limit validation for name and note
    if (name === "name" && countWords(value) > 10) return;
    if (name === "note" && countWords(value) > 20) return;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (name: string, file: File | null) => {
    setFormData(prev => ({
      ...prev,
      [name]: file
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formPayload = new FormData();
      
      // Append all form data to FormData object
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          if (key === 'document' || key === 'photo') {
            if (value) formPayload.append(key, value);
          } else {
            formPayload.append(key, value.toString());
          }
        }
      });

      const response = await axios.post(
        "https://school2025.dolittletech.co.in/api/visitors",
        formPayload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }
      );

      if (response.data && response.data.success) {
        message.success("Visitor added successfully");
        refreshList();
        // Reset form
        setFormData({
          purpose: "",
          name: "",
          contact: "",
          id_proof: "",
          no_of_people: 1,
          date: new Date().toISOString().split("T")[0],
          in_time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          out_time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          note: "",
          document: null,
          photo: null
        });
      } else {
        message.error(response.data.message || "Failed to add visitor");
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      message.error(error.response?.data?.message || "Failed to add visitor");
    } finally {
      setLoading(false);
    }
  };

  // ... rest of your form JSX remains the same ...
  return (
    <form onSubmit={handleSubmit} className="p-2.5">
   <div className="flex flex-wrap mt-5 mx-2">
        {/* Purpose Dropdown */}
        <div className="w-full px-2">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium text-lg">
              Purpose <span className="text-red-500">*</span>
            </label>
            <select
              name="purpose"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
              value={formData.purpose}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Meeting">Meeting</option>
              <option value="Admission">Admission</option>
              <option value="Delivery">Delivery</option>
            </select>
          </div>
        </div>

        {/* Name Input */}
        <div className="w-full px-2">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium text-lg">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <p className="text-sm text-gray-500">
              Max Word 10 Words -- Total word Count: {countWords(formData.name)} words.
            </p>
          </div>
        </div>

        {/* Phone Input */}
        <div className="w-full px-2">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium text-lg">
              Phone
            </label>
            <input
              type="tel"
              name="contact"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
              value={formData.contact}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* ID Card Input */}
        <div className="w-full px-2">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium text-lg">
              ID Proof
            </label>
            <input
              type="text"
              name="id_proof"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
              value={formData.id_proof}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Number of Person Input */}
        <div className="w-full px-2">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium text-lg">
              Number of People
            </label>
            <input
              type="number"
              name="no_of_people"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
              value={formData.no_of_people}
              onChange={handleChange}
              min="1"
            />
          </div>
        </div>

        {/* Date Input */}
        <div className="w-full px-2">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium text-lg">
              Date
            </label>
            <input
              type="date"
              name="date"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* In Time Input */}
        <div className="w-full px-2">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium text-lg">
              In Time
            </label>
            <input
              type="time"
              name="in_time"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
              value={formData.in_time}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Out Time Input */}
        <div className="w-full px-2">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium text-lg">
              Out Time
            </label>
            <input
              type="time"
              name="out_time"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
              value={formData.out_time}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Note Textarea */}
        <div className="w-full px-2">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium text-lg">
              Note
            </label>
            <textarea
              name="note"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
              value={formData.note}
              onChange={handleChange}
              rows={3}
            />
            <p className="text-sm text-gray-500">
              Max Word 20 Words -- Total word Count: {countWords(formData.note)} words.
            </p>
          </div>
        </div>

        {/* Attach Document Input */}
        <div className="w-full px-2">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium text-lg">
              Attach Document
            </label>
            <Upload
              beforeUpload={(file) => {
                handleFileChange("document", file);
                return false; // Prevent automatic upload
              }}
              onRemove={() => handleFileChange("document", null)}
              maxCount={1}
            >
              <Button>Select File</Button>
            </Upload>
          </div>
        </div>

        {/* Visitor Photo Input */}
        <div className="w-full px-2">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium text-lg">
              Visitor Photo
            </label>
            <Upload
              beforeUpload={(file) => {
                handleFileChange("photo", file);
                return false; // Prevent automatic upload
              }}
              onRemove={() => handleFileChange("photo", null)}
              maxCount={1}
              accept="image/*"
            >
              <Button>Select Photo</Button>
            </Upload>
          </div>
        </div>

        {/* Save Button */}
        <div className="w-full px-2">
          <Button
            type="primary"
            htmlType="submit"
            style={{ backgroundColor: "#164f63", border: "none" }}
            className="hover:bg-teal-700 text-white font-bold px-2 py-2 rounded transition float-right"
            loading={loading}
          >
            Save
          </Button>
        </div>
      </div>
    </form>
  );
};

export default VisitorBookForm;