import React, { useState, useEffect } from "react";
import { message } from "antd";

interface IncomeHeadFormData {
  income_category: string;
  description: string;
  is_active: string;
}

interface IncomeHeadFromProps {
  editData: any;
  setEditData: React.Dispatch<React.SetStateAction<any>>;
  setRefreshList: React.Dispatch<React.SetStateAction<boolean>>;
  refreshList: boolean;
}

const IncomeHeadForm: React.FC<IncomeHeadFromProps> = ({ 
  editData, 
  setEditData, 
  setRefreshList, 
  refreshList 
}) => {
  const [formData, setFormData] = useState<IncomeHeadFormData>({
    income_category: "",
    description: "",
    is_active: "yes",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editData) {
      setFormData({
        income_category: editData.income_category || "",
        description: editData.description || "",
        is_active: editData.is_active || "yes",
      });
    } else {
      setFormData({
        income_category: "",
        description: "",
        is_active: "yes",
      });
    }
  }, [editData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const url = editData 
      ? `http://127.0.0.1:8000/api/incomehead/${editData.id}`
      : "http://127.0.0.1:8000/api/incomehead";
    
    const method = editData ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Operation failed");
      }

      message.success(
        editData 
          ? "Income head updated successfully" 
          : "Income head created successfully"
      );
      
      // Reset form and refresh list
      setFormData({
        income_category: "",
        description: "",
        is_active: "yes",
      });
      setEditData(null);
      setRefreshList(prev => !prev);
    } catch (error: any) {
      message.error(error.message || "An error occurred. Please try again.");
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full border-[#164f63]/60 shadow-gray-300 rounded-2xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-gray-700 font-medium text-lg">
            Income Head <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="income_category"
            value={formData.income_category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
            required
            disabled={submitting}
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
            disabled={submitting}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium text-lg">
            Status <span className="text-red-500">*</span>
          </label>
          <select
            name="is_active"
            value={formData.is_active}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
            required
            disabled={submitting}
          >
            <option value="yes">Active</option>
            <option value="no">Inactive</option>
          </select>
        </div>

        <div className="flex justify-end gap-2">
          {editData && (
            <button
              type="button"
              onClick={() => setEditData(null)}
              className="bg-gray-400 hover:bg-gray-500 text-black font-bold px-4 py-2 rounded transition"
              disabled={submitting}
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="bg-[#164f63] hover:bg-[#0e3a4a] text-black font-bold px-4 py-2 rounded transition"
            disabled={submitting}
          >
            {submitting ? "Processing..." : editData ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default IncomeHeadForm;