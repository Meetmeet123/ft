"use client";
import React, { useState, useEffect } from "react";
import { message } from "antd";

interface IncomeFormData {
  id?: number;
  inc_head_id: string;
  name: string;
  invoice_no: string;
  date: string;
  amount: string;
  note: string;
  documents: File | null;
  existing_document?: string | null;
}

const AddIncomeForm = ({ incomeToEdit, onIncomeAdded, onIncomeUpdated, resetEdit }: {
  incomeToEdit: any;
  onIncomeAdded: () => void;
  onIncomeUpdated: () => void;
  resetEdit: () => void;
}) => {
  const [formData, setFormData] = useState<IncomeFormData>({
    inc_head_id: "",
    name: "",
    invoice_no: "",
    date: new Date().toISOString().split('T')[0],
    amount: "",
    note: "",
    documents: null,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (incomeToEdit) {
      setFormData({
        id: incomeToEdit.id,
        inc_head_id: incomeToEdit.inc_head_id.toString(),
        name: incomeToEdit.name,
        invoice_no: incomeToEdit.invoice_no || "",
        date: incomeToEdit.date.split('T')[0],
        amount: incomeToEdit.amount.toString(),
        note: incomeToEdit.note || "",
        documents: null,
        existing_document: incomeToEdit.documents || null
      });
    } else {
      setFormData({
        inc_head_id: "",
        name: "",
        invoice_no: "",
        date: new Date().toISOString().split('T')[0],
        amount: "",
        note: "",
        documents: null,
      });
    }
  }, [incomeToEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, documents: file }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formPayload = new FormData();
    formPayload.append('inc_head_id', formData.inc_head_id);
    formPayload.append('name', formData.name);
    formPayload.append('invoice_no', formData.invoice_no);
    formPayload.append('date', formData.date);
    formPayload.append('amount', formData.amount);
    formPayload.append('note', formData.note);
    
    if (formData.documents) {
      formPayload.append('documents', formData.documents);
    }

    try {
      let url = 'http://127.0.0.1:8000/api/income';
      let method = 'POST';
      
      if (formData.id) {
        url = `http://127.0.0.1:8000/api/income/${formData.id}`;
        method = 'POST';
        formPayload.append('_method', 'PUT');
      }

      const response = await fetch(url, {
        method: method,
        body: formPayload,
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save income');
      }

      if (formData.id) {
        message.success("Income updated successfully!");
        onIncomeUpdated();
        resetEdit();
      } else {
        message.success("Income added successfully!");
        onIncomeAdded();
      }

      // Reset form
      setFormData({
        inc_head_id: "",
        name: "",
        invoice_no: "",
        date: new Date().toISOString().split('T')[0],
        amount: "",
        note: "",
        documents: null,
      });
      
    } catch (error: any) {
      message.error(error.message || "Operation failed");
      console.error('Error details:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-[#164f63]/60 shadow-gray-300 rounded-2xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Income Head */}
        <div>
          <label className="block text-gray-700 font-medium text-lg">
            Income Head <span className="text-red-500">*</span>
          </label>
          <select
            name="inc_head_id"
            value={formData.inc_head_id}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
            required
          >
            <option value="">Select</option>
            <option value="1">School Fees</option>
            <option value="2">Donation</option>
            <option value="3">Other</option>
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

        {/* Invoice Number */}
        <div>
          <label className="block text-gray-700 font-medium text-lg">
            Invoice Number
          </label>
          <input
            type="text"
            name="invoice_no"
            value={formData.invoice_no}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-gray-700 font-medium text-lg">
            Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
            required
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block text-gray-700 font-medium text-lg">
            Amount <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
            required
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
              name="documents"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400 opacity-0 absolute inset-0 cursor-pointer"
            />
            <div className="w-full p-2 border border-gray-300 rounded flex items-center justify-center text-gray-500">
              <span className="mr-2">☁️</span> 
              {formData.documents 
                ? formData.documents.name 
                : formData.existing_document
                  ? "Current file attached (click to change)"
                  : "Drag and drop a file here or click"}
            </div>
          </div>
          {formData.existing_document && !formData.documents && (
            <div className="mt-1 text-sm text-gray-500">
              Current file: <a href={formData.existing_document} target="_blank" rel="noopener noreferrer">View</a>
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium text-lg">
            Description
          </label>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
            rows={3}
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-end gap-2">
          {incomeToEdit && (
            <button
              type="button"
              onClick={() => {
                resetEdit();
                setFormData({
                  inc_head_id: "",
                  name: "",
                  invoice_no: "",
                  date: new Date().toISOString().split('T')[0],
                  amount: "",
                  note: "",
                  documents: null,
                });
              }}
              className="bg-gray-400 hover:bg-gray-500 text-white font-medium px-4 py-2 rounded transition"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="bg-gray-600 hover:bg-gray-700 text-white font-medium px-4 py-2 rounded transition"
            style={{ backgroundColor: "#164f63", border: "none" }}
            disabled={loading}
          >
            {loading 
              ? 'Processing...' 
              : incomeToEdit 
                ? 'Update' 
                : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddIncomeForm;