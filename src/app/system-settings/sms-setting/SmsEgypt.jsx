import React, { useState } from 'react';
import Image from 'next/image';
import image from './assets/smseg.png';

export default function SMSegForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    senderId: '',
    type: '',
    status: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('SMSeg form submitted:', formData);
    // Add form logic here
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Form */}
        <div className="w-full lg:w-2/3">
          <form onSubmit={handleSubmit}>
            {[
              { id: 'username', label: 'Username', type: 'text', required: true },
              { id: 'password', label: 'Password', type: 'password', required: true },
              { id: 'senderId', label: 'Sender ID', type: 'text' },
            ].map(({ id, label, type = 'text', required }) => (
              <div key={id} className="mb-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <label htmlFor={id} className="sm:w-32 font-medium text-gray-700 text-right sm:text-left">
                  {label}{required && <span className="text-red-500">*</span>}
                </label>
                <input
                  type={type}
                  id={id}
                  name={id}
                  value={formData[id]}
                  onChange={handleChange}
                  required={required}
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
            ))}

            {/* Type */}
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <label htmlFor="type" className="sm:w-32 font-medium text-gray-700 text-right sm:text-left">
                Type<span className="text-red-500">*</span>
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded p-2"
              >
                <option value="">Select</option>
                <option value="text">Local SMS</option>
                <option value="unicode">International SMS</option>
              </select>
            </div>

            {/* Status */}
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <label htmlFor="status" className="sm:w-32 font-medium text-gray-700 text-right sm:text-left">
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
                <option value="">Select</option>
                <option value="active">Enable</option>
                <option value="inactive">Disable</option>
              </select>
            </div>

            {/* Submit */}
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

        {/* Logo & Link */}
        <div className="w-full lg:w-1/3 flex flex-col items-center justify-center text-center">
          <Image
            src={image}
            alt="SMSeg Logo"
            width={160}
            height={80}
            className="mb-4"
          />
          <a
            href="https://smseg.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 text-sm hover:underline break-words"
          >
            https://smseg.com/
          </a>
        </div>
      </div>
    </div>
  );
}
