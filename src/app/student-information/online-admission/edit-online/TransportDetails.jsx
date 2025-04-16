'use client';

import React, { useState } from 'react';

const months = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december'
];

function Transport() {
  const [formData, setFormData] = useState({
    routeList: '',
    pickupPoint: '',
    feesMonth: [],
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Changed: ${name} => ${value}`);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClick = (e) => {
    console.log(`Clicked: ${e.target.name}`);
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      feesMonth: checked
        ? [...prev.feesMonth, value]
        : prev.feesMonth.filter((m) => m !== value),
    }));
  };

  return (
    <div>
      <div className="bg-gray-100 p-4 rounded-md mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Transport Details</h3>
        <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-6">
          {/* Route List */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Route List</label>
            <select
              name="routeList"
              value={formData.routeList}
              onChange={handleInputChange}
              onClick={handleClick}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option value="VH1001">VH1001</option>
              <option value="VH4584">VH4584</option>
              <option value="VH5645">VH5645</option>
            </select>
          </div>

          {/* Pickup Point */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Point</label>
            <select
              name="pickupPoint"
              value={formData.pickupPoint}
              onChange={handleInputChange}
              onClick={handleClick}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option value="point1">Point 1</option>
              <option value="point2">Point 2</option>
              <option value="point3">Point 3</option>
            </select>
          </div>

          {/* Fees Month - Checkbox Dropdown */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Fees Month</label>
            <button
              type="button"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-left focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              {formData.feesMonth.length > 0
                ? formData.feesMonth.map(m => m.charAt(0).toUpperCase() + m.slice(1)).join(', ')
                : "Select Months"}
            </button>

            {isOpen && (
              <div className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 w-full max-h-60 overflow-y-auto p-2 shadow-md">
                {months.map((month) => (
                  <label key={month} className="flex items-center gap-2 py-1 text-sm">
                    <input
                      type="checkbox"
                      value={month}
                      checked={formData.feesMonth.includes(month)}
                      onChange={handleCheckboxChange}
                    />
                    {month.charAt(0).toUpperCase() + month.slice(1)}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transport;
