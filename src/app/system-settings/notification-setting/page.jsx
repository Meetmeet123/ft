'use client';
import React, { useState } from 'react';
import { notificationData } from './notificationData';

const NotificationSettings = () => {
  const [data, setData] = useState(notificationData);

  const handleCheckboxChange = (index, type, value, category) => {
    const updatedData = [...data];
    const targetArray = updatedData[index][category];
    if (targetArray.includes(value)) {
      updatedData[index][category] = targetArray.filter((v) => v !== value);
    } else {
      updatedData[index][category].push(value);
    }
    setData(updatedData);
  };

  const options = {
    destination: ['Email', 'SMS', 'Mobile App'],
    recipient: ['Student', 'Guardian', 'Staff'],
  };

  return (
    <div className="relative p-4 min-h-screen">
      <h2 className="text-xl md:text-2xl font-bold mb-4">Notification Setting</h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border px-3 py-2">Event</th>
              <th className="border px-3 py-2">Destination</th>
              <th className="border px-3 py-2">Recipient</th>
              <th className="border px-3 py-2">Sample Message</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="border px-3 py-2 align-top min-w-[150px]">{item.event}</td>

                {/* Destination */}
                <td className="border px-3 py-2 align-top min-w-[150px]">
                  {options.destination.map((type) => (
                    <div key={type} className="flex items-center space-x-1">
                      <input
                        type="checkbox"
                        checked={item.destination.includes(type)}
                        onChange={() =>
                          handleCheckboxChange(index, type, type, 'destination')
                        }
                      />
                      <label>{type}</label>
                    </div>
                  ))}
                </td>

                {/* Recipient */}
                <td className="border px-3 py-2 align-top min-w-[150px]">
                  {options.recipient.map((type) => (
                    <div key={type} className="flex items-center space-x-1">
                      <input
                        type="checkbox"
                        checked={item.recipient.includes(type)}
                        onChange={() =>
                          handleCheckboxChange(index, type, type, 'recipient')
                        }
                      />
                      <label>{type}</label>
                    </div>
                  ))}
                </td>

                {/* Sample Message */}
                <td className="border px-3 py-2 align-top whitespace-pre-line min-w-[200px]">
                  {item.message}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-4">
        <button className="px-6 py-2 bg-cyan-900 text-white rounded hover:bg-cyan-800 transition">
          Save
        </button>
      </div>
    </div>
  );
};

export default NotificationSettings;
