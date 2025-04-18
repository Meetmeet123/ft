import { useState } from 'react';
import Image from 'next/image';
import image from './assets/mobireach.jpg';

export default function MobiReachForm() {
  const [formData, setFormData] = useState({
    authKey: '',
    senderId: '',
    routeId: '',
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
    console.log('MobiReach form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <div className="max-w-4xl mx-auto p-4 flex flex-col md:flex-row gap-8">
      {/* Form Section */}
      <div className="flex-1">
        <form onSubmit={handleSubmit}>
          {[
            { id: 'authKey', label: 'Auth Key' },
            { id: 'senderId', label: 'Sender ID' },
            { id: 'routeId', label: 'Route ID' }
          ].map((field) => (
            <div key={field.id} className="mb-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <label htmlFor={field.id} className="sm:w-32 font-medium">
                {field.label}<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id={field.id}
                name={field.id}
                value={formData[field.id]}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
          ))}

          {/* Status */}
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <label htmlFor="status" className="sm:w-32 font-medium">
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

      {/* Image Section */}
      <div className="flex flex-col items-center justify-center">
        <div className="w-32 h-auto mb-4">
          <Image src={image} alt="MobiReach Logo" className="w-full h-auto" />
        </div>
        <a
          href="https://user.mobireach.com.bd/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 text-sm break-all text-center"
        >
          https://user.mobireach.com.bd/
        </a>
      </div>
    </div>
  );
}
