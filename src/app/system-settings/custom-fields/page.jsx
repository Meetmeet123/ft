"use client"
import React, { useState } from 'react';
import { Plus, Minus, GripVertical, Pencil, X } from 'lucide-react';

export default function CustomFieldManagement() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [fieldBelongs, setFieldBelongs] = useState('');
  const [fieldType, setFieldType] = useState('');
  const [fieldName, setFieldName] = useState('');
  const [gridValue, setGridValue] = useState('12');
  const [fieldValues, setFieldValues] = useState('');
  const [isRequired, setIsRequired] = useState(false);
  const [onTable, setOnTable] = useState(false);

  const [expanded, setExpanded] = useState({ student: false, staff: false });
  const [customFields, setCustomFields] = useState({ student: [], staff: [] });

  const handleSave = () => {
    if (!fieldBelongs || !fieldType || !fieldName) return;

    const newField = {
      name: fieldName,
      type: fieldType,
      grid: gridValue,
      values: fieldValues,
      required: isRequired,
      onTable,
    };

    setCustomFields((prev) => ({
      ...prev,
      [fieldBelongs]: [...prev[fieldBelongs], newField],
    }));

    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);

    setFieldBelongs('');
    setFieldType('');
    setFieldName('');
    setGridValue('12');
    setFieldValues('');
    setIsRequired(false);
    setOnTable(false);
  };

  const toggleExpand = (section) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 md:p-6 bg-gray-100 min-h-screen">
      {/* Left Panel - Add Custom Field */}
      <div className="w-full md:w-1/2 bg-white p-4 md:p-6 rounded shadow-sm">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 md:mb-6">Add Custom Field</h2>

        {showSuccessMessage && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-3 mb-4 md:mb-6 rounded text-sm">
            Record Saved Successfully
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Field Belongs To</label>
            <select
              className="w-full border p-2 rounded"
              value={fieldBelongs}
              onChange={(e) => setFieldBelongs(e.target.value)}
            >
              <option value="">Select</option>
              <option value="student">Student</option>
              <option value="staff">Staff</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Field Type</label>
            <select
              className="w-full border p-2 rounded"
              value={fieldType}
              onChange={(e) => setFieldType(e.target.value)}
            >
              <option value="">Select</option>
              <option value="text">Text</option>
              <option value="dropdown">Dropdown</option>
              <option value="checkbox">Checkbox</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Field Name</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={fieldName}
              onChange={(e) => setFieldName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Grid Value (1–12)</label>
            <input
              type="number"
              className="w-full border p-2 rounded"
              value={gridValue}
              onChange={(e) => setGridValue(e.target.value)}
              min="1"
              max="12"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Field Values (comma separated)</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={fieldValues}
              onChange={(e) => setFieldValues(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={isRequired}
                onChange={(e) => setIsRequired(e.target.checked)}
              />
              Required
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={onTable}
                onChange={(e) => setOnTable(e.target.checked)}
              />
              Show in Table
            </label>
          </div>

          <div className="flex justify-end">
            <button
              className="btn btn-primary w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel - Custom Field List */}
      <div className="w-full md:w-1/2 bg-white p-4 md:p-6 rounded shadow-sm">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 md:mb-6">Custom Field List</h2>

        <div className="space-y-4">
          {['student', 'staff'].map((type) => (
            <div key={type} className="border rounded overflow-hidden">
              <div
                className="flex justify-between items-center p-4 border-b bg-gray-100 cursor-pointer"
                onClick={() => toggleExpand(type)}
              >
                <h3 className="font-medium capitalize">{type}</h3>
                <button className="text-gray-500 hover:text-gray-700">
                  {expanded[type] ? <Minus size={20} /> : <Plus size={20} />}
                </button>
              </div>

              {expanded[type] && (
                <div className="p-4 space-y-2">
                  {customFields[type].length === 0 ? (
                    <p className="text-gray-400 text-sm">No fields added</p>
                  ) : (
                    customFields[type].map((field, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between border p-2 rounded"
                      >
                        <div className="flex items-center gap-2">
                          <GripVertical className="cursor-move text-gray-400" />
                          {field.name}
                        </div>
                        <div className="flex items-center gap-2">
                          <Pencil size={16} className="text-blue-500 cursor-pointer" />
                          <X size={16} className="text-red-500 cursor-pointer" />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
