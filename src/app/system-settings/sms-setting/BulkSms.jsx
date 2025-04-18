import { useState } from 'react';
import image from './assets/bulk_sms.png';
import Image from 'next/image';

export default function BulkSMSForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
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
    console.log('BulkSMS form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <div className="max-w-4xl mx-auto p-4 flex flex-col lg:flex-row gap-6">
      {/* Form Section */}
      <div className="flex-1 w-full">
        <form onSubmit={handleSubmit}>
          {[{
            id: 'username',
            label: 'Username',
            type: 'text',
            required: true
          },
          {
            id: 'password',
            label: 'Password',
            type: 'password',
            required: true
          }].map(({ id, label, type, required }) => (
            <div key={id} className="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <label htmlFor={id} className="w-full sm:w-32 sm:text-right sm:mr-4 font-medium">
                {label}
                {required && <span className="text-red-500">*</span>}
              </label>
              <input
                type={type}
                id={id}
                name={id}
                value={formData[id]}
                onChange={handleChange}
                required={required}
                className="w-full sm:flex-1 mt-2 sm:mt-0 border border-gray-300 rounded p-2"
              />
            </div>
          ))}

          {/* Status Dropdown */}
          <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
            <label htmlFor="status" className="w-full sm:w-32 sm:text-right sm:mr-4 font-medium">
              Status<span className="text-red-500">*</span>
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="w-full sm:flex-1 mt-2 sm:mt-0 border border-gray-300 rounded p-2"
            >
              <option value="">Select</option>
              <option value="active">Enable</option>
              <option value="inactive">Disable</option>
            </select>
          </div>

          {/* Save Button */}
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="btn btn-primary px-6 py-2 text-white rounded bg-cyan-900 hover:bg-cyan-800 transition"
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
          alt="BulkSMS Logo"
          className="w-28 h-auto mb-4"
        />
        <a
          href="https://www.bulksms.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 text-sm text-center break-words"
        >
          https://www.bulksms.com/
        </a>
      </div>
    </div>
  );
}
