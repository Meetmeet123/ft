import { useState } from 'react';
import Image from 'next/image';
import image from './assets/nexmo.jpg';

export default function NexmoForm() {
  const [formData, setFormData] = useState({
    apiKey: '',
    apiSecret: '',
    fromNumber: '',
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
    console.log('Nexmo form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Form Section */}
        <div className="w-full lg:w-2/3">
          <form onSubmit={handleSubmit}>
            {[
              { id: 'apiKey', label: 'Nexmo Api Key' },
              { id: 'apiSecret', label: 'Nexmo Api Secret' },
              { id: 'fromNumber', label: 'Registered / From Number' }
            ].map(({ id, label }) => (
              <div key={id} className="mb-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <label htmlFor={id} className="sm:w-48 font-medium text-gray-700">
                  {label}<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id={id}
                  name={id}
                  value={formData[id]}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
            ))}

            <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <label htmlFor="status" className="sm:w-48 font-medium text-gray-700">
                Status<span className="text-red-500">*</span>
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 rounded"
              >
                <option value="">Select</option>
                <option value="active">Enable</option>
                <option value="inactive">Disable</option>
              </select>
            </div>

            <div className="flex justify-center mt-10">
              <button type="submit" className="btn btn-primary text-white bg-teal-800 px-6 py-2 rounded">
                Save
              </button>
            </div>
          </form>
        </div>

        {/* Logo + Link */}
        <div className="w-full lg:w-1/3 flex flex-col items-center justify-center text-center">
          <Image
            src={image}
            alt="Nexmo Logo"
            width={160}
            height={80}
            className="mb-4"
          />
          <a
            href="https://dashboard.nexmo.com/sign-up"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 text-sm hover:underline break-words"
          >
            https://dashboard.nexmo.com/sign-up
          </a>
        </div>
      </div>
    </div>
  );
}
