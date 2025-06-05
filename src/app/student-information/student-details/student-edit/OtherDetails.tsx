"use client";
import React, { useState, ChangeEvent } from 'react';

interface Document {
  id: number;
  title: string;
  file: File | null;
}

interface StudentAddressFormProps {
  onSubmit?: (formData: FormData) => void;
}

interface FormData {
  isGuardianAddressCurrent: boolean;
  isPermanentAddressCurrent: boolean;
  currentAddress: string;
  permanentAddress: string;
  bankAccountNumber: string;
  bankName: string;
  ifscCode: string;
  nationalIdNumber: string;
  localIdNumber: string;
  rte: 'Yes' | 'No';
  previousSchoolDetails: string;
  note: string;
  documents: Document[];
}

export default function StudentAddressForm({ onSubmit }: StudentAddressFormProps) {
  const [formData, setFormData] = useState<FormData>({
    isGuardianAddressCurrent: false,
    isPermanentAddressCurrent: false,
    currentAddress: '',
    permanentAddress: '',
    bankAccountNumber: '',
    bankName: '',
    ifscCode: '',
    nationalIdNumber: '',
    localIdNumber: '',
    rte: 'Yes',
    previousSchoolDetails: '',
    note: '',
    documents: [
      { id: 1, title: '', file: null },
      { id: 2, title: '', file: null },
      { id: 3, title: '', file: null },
      { id: 4, title: '', file: null },
    ]
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? target.checked : value
    }));
  };

  const handleFileChange = (id: number, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.map(doc =>
        doc.id === id ? { ...doc, file } : doc
      )
    }));
  };

  const handleTitleChange = (id: number, e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.map(doc =>
        doc.id === id ? { ...doc, title: value } : doc
      )
    }));
  };

  return (
    <div className="max-w-6xl mx-auto mt-8 p-6 bg-white rounded shadow-md">
      {/* Address Section */}
      <div className="border rounded mb-6">
        <div className="bg-gray-100 p-3 border-b">
          <h2 className="text-lg font-semibold">Address Details</h2>
        </div>
        <div className="p-4 grid lg:grid-cols-2 md:grid-cols-1 gap-6">
          <div>
            <label className="inline-flex items-center mb-4">
              <input
                type="checkbox"
                name="isGuardianAddressCurrent"
                checked={formData.isGuardianAddressCurrent}
                onChange={handleInputChange}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2">If Guardian Address Is Current Address</span>
            </label>
            <label className="block text-gray-700 mb-2">Current Address</label>
            <textarea
              name="currentAddress"
              value={formData.currentAddress}
              onChange={handleInputChange}
              className="w-full border rounded p-2 h-24"
            />
          </div>

          <div>
            <label className="inline-flex items-center mb-4">
              <input
                type="checkbox"
                name="isPermanentAddressCurrent"
                checked={formData.isPermanentAddressCurrent}
                onChange={handleInputChange}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2">If Permanent Address Is Current Address</span>
            </label>
            <label className="block text-gray-700 mb-2">Permanent Address</label>
            <textarea
              name="permanentAddress"
              value={formData.permanentAddress}
              onChange={handleInputChange}
              className="w-full border rounded p-2 h-24"
            />
          </div>
        </div>
      </div>

      {/* Miscellaneous Section */}
      <div className="border rounded mb-6">
        <div className="bg-gray-100 p-3 border-b">
          <h2 className="text-lg font-semibold">Miscellaneous Details</h2>
        </div>
        <div className="p-4">
          <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 mb-2">Bank Account Number</label>
              <input
                type="text"
                name="bankAccountNumber"
                value={formData.bankAccountNumber}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Bank Name</label>
              <input
                type="text"
                name="bankName"
                value={formData.bankName}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">IFSC Code</label>
              <input
                type="text"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">National Identification Number</label>
              <input
                type="text"
                name="nationalIdNumber"
                value={formData.nationalIdNumber}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Local Identification Number</label>
              <input
                type="text"
                name="localIdNumber"
                value={formData.localIdNumber}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">RTE</label>
              <div className="flex items-center space-x-6 mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="rte"
                    value="Yes"
                    checked={formData.rte === 'Yes'}
                    onChange={handleInputChange}
                    className="form-radio text-blue-600 h-5 w-5"
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="rte"
                    value="No"
                    checked={formData.rte === 'No'}
                    onChange={handleInputChange}
                    className="form-radio text-blue-600 h-5 w-5"
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Previous School Details</label>
              <textarea
                name="previousSchoolDetails"
                value={formData.previousSchoolDetails}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded p-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Note</label>
              <textarea
                name="note"
                value={formData.note}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded p-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
