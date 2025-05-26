import React, { useState, useEffect } from "react";
import { message } from "antd";

interface ComplainFormProps {
  complainToEdit?: any;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const API_URL = "https://school2025.dolittletech.co.in/api/complaints";

const ComplainForm: React.FC<ComplainFormProps> = ({ 
  complainToEdit, 
  onSuccess,
  onCancel 
}) => {
  const [formData, setFormData] = useState({
    complaint_type: "",
    source: "",
    name: "",
    contact: "",
    email: "",
    date: new Date().toISOString().split('T')[0],
    description: "",
    action_taken: "",
    assigned: "",
    note: "",
    image: null as File | null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (complainToEdit) {
      setFormData({
        complaint_type: complainToEdit.complaint_type || "",
        source: complainToEdit.source || "",
        name: complainToEdit.name || "",
        contact: complainToEdit.contact || "",
        email: complainToEdit.email || "",
        date: complainToEdit.date ? complainToEdit.date.split('T')[0] : new Date().toISOString().split('T')[0],
        description: complainToEdit.description || "",
        action_taken: complainToEdit.action_taken || "",
        assigned: complainToEdit.assigned || "",
        note: complainToEdit.note || "",
        image: null,
      });
    }
  }, [complainToEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append('complaint_type', formData.complaint_type);
    formDataToSend.append('source', formData.source);
    formDataToSend.append('name', formData.name);
    formDataToSend.append('contact', formData.contact);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('date', formData.date);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('action_taken', formData.action_taken);
    formDataToSend.append('assigned', formData.assigned);
    formDataToSend.append('note', formData.note);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      if (complainToEdit?.id) {
        // Update existing complaint
        await fetch(`${API_URL}/${complainToEdit.id}`, {
          method: 'POST',
          body: formDataToSend,
        });
        message.success("Complaint updated successfully");
      } else {
        // Create new complaint
        await fetch(API_URL, {
          method: 'POST',
          body: formDataToSend,
        });
        message.success("Complaint created successfully");
      }

      setFormData({
        complaint_type: "",
        source: "",
        name: "",
        contact: "",
        email: "",
        date: new Date().toISOString().split('T')[0],
        description: "",
        action_taken: "",
        assigned: "",
        note: "",
        image: null,
      });
      
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
      message.error("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 w-full shadow-lg border-solid border-2 border-[#164f63]/60 shadow-gray-300 rounded-2xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Complain Type */}
        <div>
          <label className="block text-gray-700 font-medium text-lg">
            Complain Type
          </label>
          <select
            name="complaint_type"
            value={formData.complaint_type}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
          >
            <option value="">Select</option>
            <option value="Service">Service</option>
            <option value="Product">Product</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Source */}
        <div>
          <label className="block text-gray-700 font-medium text-lg">
            Source
          </label>
          <select
            name="source"
            value={formData.source}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
          >
            <option value="">Select</option>
            <option value="Phone">Phone</option>
            <option value="Email">Email</option>
            <option value="In-Person">In-Person</option>
          </select>
        </div>

        {/* Name */}
        <div>
          <label className="block text-gray-700 font-medium text-lg">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
            required
          />
        </div>

        {/* Contact */}
        <div>
          <label className="block text-gray-700 font-medium text-lg">
            Phone
          </label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium text-lg">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-gray-700 font-medium text-lg">
            Date
          </label>
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

        {/* Action Taken */}
        <div>
          <label className="block text-gray-700 font-medium text-lg">
            Action Taken
          </label>
          <textarea
            name="action_taken"
            value={formData.action_taken}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
            rows={3}
          />
        </div>

        {/* Assigned */}
        <div>
          <label className="block text-gray-700 font-medium text-lg">
            Assigned
          </label>
          <input
            type="text"
            name="assigned"
            value={formData.assigned}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        {/* Note */}
        <div>
          <label className="block text-gray-700 font-medium text-lg">
            Note
          </label>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
            rows={3}
          />
        </div>

        {/* Attach Document */}
        <div>
          <label className="block text-gray-700 font-medium text-lg">
            Attach Document
          </label>
          <div className="relative">
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400 opacity-0 absolute inset-0 cursor-pointer"
            />
            <div className="w-full p-2 border border-gray-300 rounded flex items-center justify-center text-gray-500">
              <span className="mr-2">☁️</span> Drag and drop a file here or click
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end gap-4">
          {complainToEdit && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold px-4 py-2 rounded transition"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold px-4 py-2 rounded transition"
            style={{ backgroundColor: "#164f63" }}
            disabled={loading}
          >
            {loading ? 'Saving...' : complainToEdit ? 'Update' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ComplainForm;