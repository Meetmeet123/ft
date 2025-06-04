import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface TwilioProps {
  api_id: string;
  authkey: string;
  username: string;
  contact: string;
  url?: string;
}

function TwilioForm({ twilio }: { twilio: TwilioProps }) {
  const [formData, setFormData] = useState({
    accountId: twilio.api_id,
    authToken: twilio.authkey,
    username: twilio.username,
    phoneNumber: twilio.contact,
    status: 'Select',
  });

  interface FormData {
    accountId: string;
    authToken: string;
    username: string;
    phoneNumber: string;
    status: string;
  }

  interface InputChangeEvent {
    target: {
      name: keyof FormData;
      value: string;
    };
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target as InputChangeEvent['target'];
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  interface SubmitEvent extends React.FormEvent<HTMLFormElement> {}

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Form */}
        <div className="w-full lg:w-2/3">
          <form onSubmit={handleSubmit}>
            {[
              {
                id: 'accountId',
                label: 'Account SID',
              },
              {
                id: 'authToken',
                label: 'Authentication Token',
              },
              {
                id: 'username',
                label: 'User Name',
              },
              {
                id: 'phoneNumber',
                label: 'Registered Phone Number',
              },
            ].map(({ id, label }) => (
              <div
                key={id}
                className="mb-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
              >
                <label
                  htmlFor={id}
                  className="sm:w-48 font-medium text-gray-700 text-right sm:text-left"
                >
                  {label}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id={id}
                  name={id}
                  value={formData[id as keyof typeof formData]}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
            ))}

            {/* Status */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <label
                htmlFor="status"
                className="sm:w-48 font-medium text-gray-700 text-right sm:text-left"
              >
                Status<span className="text-red-500">*</span>
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
              >
                <option value="Select">Select</option>
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

        {/* Logo & Link */}
        <div className="w-full lg:w-1/3 flex flex-col items-center justify-center text-center">
          {twilio?.url && <Image
            src={twilio.url}
            alt="Twilio Logo"
            width={160}
            height={80}
            className="mb-4"
          />}
          <Link
            href="https://www.twilio.com"
            className="text-blue-500 text-sm hover:underline break-words"
            target="_blank"
            rel="noopener noreferrer"
          >
            {twilio.url}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TwilioForm;
