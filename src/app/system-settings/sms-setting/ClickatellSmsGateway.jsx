'use client';

import Image from 'next/image';
import image from './assets/clickatell.png';

function ClickatellSmsGateway() {
  return (
    <div className="p-4 sm:p-6">
      <div className="grid grid-cols-2 md:grid-cols-2 gap-6 bg-white shadow p-6 rounded-lg">
        {/* Left Form Section */}
        <div className="space-y-4">
          {[
            { label: 'Clickatell Username', type: 'text' },
            { label: 'Clickatell Password', type: 'password' },
            { label: 'API Key', type: 'text' }
          ].map((field, index) => (
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4" key={index}>
              <label className="sm:w-40 font-semibold">
                {field.label}
                <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full border px-3 py-2 rounded"
                type={field.type}
              />
            </div>
          ))}

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <label className="sm:w-40 font-semibold">
              Status<span className="text-red-500">*</span>
            </label>
            <select className="w-full border px-3 py-2 rounded">
              <option value="">Select</option>
              <option value="Active">Enable</option>
              <option value="Inactive">Disable</option>
            </select>
          </div>
        </div>

        {/* Right-side Logo */}
        <div className="flex justify-center items-center">
          <div className="text-center">
            <Image
              src={image}
              alt="Clickatell"
              width={160}
              height={80}
              className="mx-auto mb-2"
            />
            <a
              href="https://www.clickatell.com"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline break-all text-sm"
            >
              https://www.clickatell.com
            </a>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-center mt-10">
        <button
          className="btn btn-primary text-white px-6 py-2 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default ClickatellSmsGateway;
