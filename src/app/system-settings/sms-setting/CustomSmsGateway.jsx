import React, { useState } from 'react';
import Image from 'next/image';
import image from './assets/custom-sms.png';

export default function GenericSMSGatewayForm() {
  const [formData, setFormData] = useState({
    gatewayName: 'a',
    status: 'disabled'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Generic SMS Gateway form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <div className="max-w-4xl mx-auto p-4 flex flex-col md:flex-row gap-8">
      {/* Form Section */}
      <div className="flex-1">
        <form onSubmit={handleSubmit}>
          {/* Gateway Name */}
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <label htmlFor="gatewayName" className="sm:w-36 font-medium">
              Gateway Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="gatewayName"
              name="gatewayName"
              value={formData.gatewayName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>

          {/* Status */}
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <label htmlFor="status" className="sm:w-36 font-medium">
              Status<span className="text-red-500">*</span>
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded p-2"
            >
              <option value="active">Select</option>
              <option value="active">Enable</option>
              <option value="disabled">Disabled</option>
            </select>
          </div>

          {/* Save Button */}
          <div className="flex justify-center mt-10">
            <button
              type="submit"
              className="btn btn-primary text-white px-6 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>

      {/* Logo Section */}
      <div className="flex justify-center items-center">
        <div className="w-24 h-32 flex items-center justify-center bg-gray-100 rounded-lg">
          <Image src={image} alt="Logo" width={64} height={128} />
        </div>
      </div>
    </div>
  );
}
