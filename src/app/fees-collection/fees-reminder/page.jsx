"use client"
import React, { useState } from 'react';

export default function FeesReminder() {
  const [reminders, setReminders] = useState([
    { id: 1, isActive: false, type: 'Before', days: '2' },
    { id: 2, isActive: false, type: 'Before', days: '5' },
    { id: 3, isActive: false, type: 'After', days: '2' },
    { id: 4, isActive: false, type: 'After', days: '5' },
  ]);

  const handleCheckboxChange = (id) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isActive: !r.isActive } : r))
    );
  };

  const handleDaysChange = (id, value) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, days: value } : r))
    );
  };


  return (
    <div className="w-full mx-auto mt-8 bg-white shadow rounded border">
      <h2 className="text-xl font-semibold px-6 py-4 border-b">Fees Reminder</h2>

      <table className="w-full table-auto text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="text-left px-6 py-3">Action</th>
            <th className="text-left px-6 py-3">Reminder Type</th>
            <th className="text-left px-6 py-3">Days</th>
          </tr>
        </thead>
        <tbody>
          {reminders.map((reminder) => (
            <tr key={reminder.id} className="border-t">
              <td className="px-6 py-3">
                <label className="inline-flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={reminder.isActive}
                    onChange={() => handleCheckboxChange(reminder.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Active</span>
                </label>
              </td>
              <td className="px-6 py-3">{reminder.type}</td>
              <td className="px-6 py-3">
                <input
                  type="number"
                  className="border rounded w-full px-2 py-1"
                  value={reminder.days}
                  onChange={(e) => handleDaysChange(reminder.id, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="px-6 py-4 flex justify-end border-t bg-gray-50">
        <button
          className="btn btn-primary bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Save
        </button>
      </div>
    </div>
  );
}
