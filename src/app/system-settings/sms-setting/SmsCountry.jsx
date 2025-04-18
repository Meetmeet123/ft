import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import image from './assets/sms-country.jpg';

function SMSCountryForm() {
  const [formData, setFormData] = useState({
    username: 'ss641installer',
    authKey: '',
    authToken: '',
    senderId: 'ii',
    password: '**************',
    status: 'Disabled'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting form data:', formData);
    // API call would go here
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Form Section */}
        <div className="w-full lg:w-2/3">
          <form onSubmit={handleSubmit}>
            {[
              { id: 'username', label: 'Username' },
              { id: 'authKey', label: 'Auth Key' },
              { id: 'authToken', label: 'Authentication Token' },
              { id: 'senderId', label: 'Sender ID' },
              { id: 'password', label: 'Password', type: 'password' }
            ].map(({ id, label, type = 'text' }) => (
              <div key={id} className="mb-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <label htmlFor={id} className="sm:w-48 font-medium text-gray-700">
                  {label}<span className="text-red-500">*</span>
                </label>
                <input
                  type={type}
                  id={id}
                  name={id}
                  value={formData[id]}
                  onChange={handleInputChange}
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
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 p-2 rounded"
              >
                <option value="Disabled">Disabled</option>
                <option value="Active">Enable</option>
                <option value="Inactive">Disable</option>
              </select>
            </div>

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

        {/* Logo & Link Section */}
        <div className="w-full lg:w-1/3 flex flex-col items-center justify-center text-center">
          <Image
            src={image}
            alt="SMS Country Logo"
            width={160}
            height={80}
            className="mb-4"
          />
          <Link
            href="https://www.smscountry.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 text-sm hover:underline break-words"
          >
            https://www.smscountry.com
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SMSCountryForm;
