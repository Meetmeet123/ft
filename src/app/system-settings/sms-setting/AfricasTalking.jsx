import React, { useState } from 'react';
import Image from 'next/image';
import image from './assets/africastalking.png';

export default function AfricasTalkingForm() {
  const [formData, setFormData] = useState({
    username: '',
    apiKey: '',
    shortCode: '',
    status: ''
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
    console.log("Africa's Talking form submitted:", formData);
    // Add your form submission logic here
  };

  return (
    <div className="max-w-4xl mx-auto p-4 flex flex-col lg:flex-row gap-6">
      {/* Form Section */}
      <div className="flex-1 w-full">
        <form onSubmit={handleSubmit} className="w-full">
          {[{
            id: 'username',
            label: 'Username',
            required: true,
            type: 'text'
          },
          {
            id: 'apiKey',
            label: 'API Key',
            required: true,
            type: 'text'
          },
          {
            id: 'shortCode',
            label: 'Short Code',
            required: false,
            type: 'text'
          }].map(({ id, label, required, type }) => (
            <div key={id} className="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <label htmlFor={id} className="w-full sm:w-32 sm:text-right sm:mr-4 font-medium">
                {label}
                {required && <span className="text-red-500">*</span>}
              </label>
              <input
                type={type}
                id={id}
                name={id}
                required={required}
                value={formData[id]}
                onChange={handleChange}
                className="w-full sm:flex-1 mt-2 sm:mt-0 border border-gray-300 rounded p-2"
              />
            </div>
          ))}

          <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
            <label htmlFor="status" className="w-full sm:w-32 sm:text-right sm:mr-4 font-medium">
              Status<span className="text-red-500">*</span>
            </label>
            <select
              id="status"
              name="status"
              required
              value={formData.status}
              onChange={handleChange}
              className="w-full sm:flex-1 mt-2 sm:mt-0 border border-gray-300 rounded p-2"
            >
              <option value="">Select</option>
              <option value="active">Enable</option>
              <option value="inactive">Disable</option>
            </select>
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="px-6 py-2 bg-cyan-900 text-white rounded hover:bg-cyan-800 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>

      {/* Image Section */}
      <div className="flex flex-col items-center justify-start w-full lg:w-56">
        <Image
          src={image}
          alt="Africa's Talking Logo"
          className="w-28 h-auto mb-4"
        />
        <a
          href="https://africastalking.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 text-sm text-center break-words"
        >
          https://africastalking.com/
        </a>
      </div>
    </div>
  );
}
