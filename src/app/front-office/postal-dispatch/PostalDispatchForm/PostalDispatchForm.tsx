import React, { useState, useEffect } from "react";
import { message } from "antd";

interface PostalDispatchFormProps {
  dispatchToEdit?: any;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const API_URL = "https://school2025.dolittletech.co.in/api/dispatch";

const PostalDispatchForm: React.FC<PostalDispatchFormProps> = ({ 
  dispatchToEdit, 
  onSuccess,
  onCancel 
}) => {
  const [formData, setFormData] = useState({
    to_title: "",
    reference_no: "",
    address: "",
    note: "",
    from_title: "",
    date: new Date().toISOString().split('T')[0],
    document: null as File | null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (dispatchToEdit) {
      setFormData({
        to_title: dispatchToEdit.to_title || "",
        reference_no: dispatchToEdit.reference_no || "",
        address: dispatchToEdit.address || "",
        note: dispatchToEdit.note || "",
        from_title: dispatchToEdit.from_title || "",
        date: dispatchToEdit.date || new Date().toISOString().split('T')[0],
        document: null,
      });
    }
  }, [dispatchToEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, document: file }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append('to_title', formData.to_title);
    formDataToSend.append('reference_no', formData.reference_no);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('note', formData.note);
    formDataToSend.append('from_title', formData.from_title);
    formDataToSend.append('date', formData.date);
    formDataToSend.append('type', 'dispatch');
    if (formData.document) {
      formDataToSend.append('image', formData.document);
    }

    try {
      if (dispatchToEdit?.id) {
        // Update existing dispatch
        await fetch(`${API_URL}/${dispatchToEdit.id}`, {
          method: 'POST',
          body: formDataToSend,
        });
        message.success("Dispatch updated successfully");
      } else {
        // Create new dispatch
        await fetch(API_URL, {
          method: 'POST',
          body: formDataToSend,
        });
        message.success("Dispatch created successfully");
      }

      setFormData({
        to_title: "",
        reference_no: "",
        address: "",
        note: "",
        from_title: "",
        date: new Date().toISOString().split('T')[0],
        document: null,
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
    <div className="p-6 w-60% shadow-lg border-solid border-2 border-[#164f63]/60 shadow-gray-300 rounded-2xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* To Title */}
        <div>
          <label className="block text-gray-700 font-bold text-lg">
            To Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="to_title"
            value={formData.to_title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
            required
          />
        </div>

        {/* Reference No */}
        <div>
          <label className="block text-gray-700 font-bold text-lg">
            Reference No
          </label>
          <input
            type="text"
            name="reference_no"
            value={formData.reference_no}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-gray-700 font-bold text-lg">
            Address
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
            rows={3}
          />
        </div>

        {/* Note */}
        <div>
          <label className="block text-gray-700 font-bold text-lg">
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

        {/* From Title */}
        <div>
          <label className="block text-gray-700 font-bold text-lg">
            From Title
          </label>
          <input
            type="text"
            name="from_title"
            value={formData.from_title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-gray-700 font-bold text-lg">
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

        {/* Attach Document */}
        <div>
          <label className="block text-gray-700 font-bold text-lg">
            Attach Document
          </label>
          <div className="relative">
            <input
              type="file"
              name="document"
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
          {dispatchToEdit && (
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
            style={{ backgroundColor: "#164f63", border: "none" }}
            disabled={loading}
          >
            {loading ? 'Saving...' : dispatchToEdit ? 'Update' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostalDispatchForm;