'use client';
import React, { useEffect, useState } from 'react';
import { getNotificationDetails, updateNotificationDetails } from './notificationData';

const NotificationSettings = () => {
  const [notificationItems, setNotificationItems] = useState([]);
  const [updatedData, setUpdateData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingStatus, setSavingStatus] = useState({ loading: false, success: false, error: null });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getNotificationDetails();
        setNotificationItems(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDestinationChange = (index, key) => {
    const updatedItems = [...notificationItems];

    // Toggle the specific key
    updatedItems[index] = {
      ...updatedItems[index],
      [key]: !updatedItems[index][key]
    };

    // updatedItems[index].is_sms === '1' ? updatedItems[index[key]] === '0' : '1';

    console.log(key+" "+updatedItems[index][key])
    const updatedItem = updatedItems[index];

    // Update the `updatedData` array: replace if ID matches, otherwise keep existing
    const newUpdateData = updatedData.some(data => data.id === updatedItem.id)
      ? updatedData.map(data =>
        data.id === updatedItem.id ? updatedItem : data
      )
      : [...updatedData, updatedItem];

    setUpdateData(newUpdateData);
    setNotificationItems(updatedItems);
  };

  const handleRecipientChange = (index, recipient) => {
    const updatedItems = [...notificationItems];
    const currentItem = updatedItems[index];

    if (!Array.isArray(currentItem.recipient)) {
      currentItem.recipient = [recipient];
    } else if (currentItem.recipient.includes(recipient)) {
      currentItem.recipient = currentItem.recipient.filter(r => r !== recipient);
    } else {
      currentItem.recipient = [...currentItem.recipient, recipient];
    }

    const newUpdateData = updatedData.some(data => data.id === currentItem.id)
      ? updatedData.map(data =>
        data.id === currentItem.id ? currentItem : data
      )
      : [...updatedData, currentItem];

    setUpdateData(newUpdateData);

    setNotificationItems(updatedItems);
  };

  const handleSave = async () => {
    console.log(updatedData[0])
    const res = await updateNotificationDetails(updatedData[0]);
    console.log(res);
  };

  // Define destination options
  const destinationOptions = {
    display_notification: "Notification",
    display_sms: "SMS",
    display_whatsapp: "WhatsApp",
    is_mail: "Email"
  };

  const recipientOptions = ['Student', 'Guardian', 'Staff'];

  if (loading) {
    return <div className="p-4">Loading notification settings...</div>;
  }

  // Check if data is empty
  if (!notificationItems || notificationItems.length === 0) {
    return <div className="p-4">No notification settings available.</div>;
  }

  return (
    <div className="relative p-4 min-h-screen">
      <h2 className="text-xl md:text-2xl font-bold mb-4">Notification Settings</h2>

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
            {notificationItems.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="border px-3 py-2 align-top min-w-[150px]">{item.subject}</td>

                {/* Destination */}
                <td className="border px-3 py-2 align-top min-w-[150px]">
                  {Object.entries(destinationOptions).map(([key, label]) => (
                    <div key={key} className="flex items-center space-x-1">
                      <input
                        type="checkbox"
                        checked={item[key] === true || item[key] === "true" || item[key] === 1 || item[key] === '1'}
                        onChange={() => handleDestinationChange(index, key)}
                      />
                      <label className="ml-1">{label}</label>
                    </div>
                  ))}
                </td>

                {/* Recipient */}
                <td className="border px-3 py-2 align-top min-w-[150px]">
                  {recipientOptions.map((type) => (
                    <div key={type} className="flex items-center space-x-1">
                      <input
                        type="checkbox"
                        checked={Array.isArray(item.recipient) && item.recipient.includes(type)}
                        onChange={() => handleRecipientChange(index, type)}
                      />
                      <label className="ml-1">{type}</label>
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

      {/* Save Button with status indicators */}
      <div className="flex justify-end mt-4 items-center">
        {savingStatus.error && (
          <div className="text-red-500 mr-4">
            Error: {savingStatus.error}
          </div>
        )}

        {savingStatus.success && (
          <div className="text-green-500 mr-4">
            Settings saved successfully!
          </div>
        )}

        <button
          className={`px-6 py-2 ${savingStatus.loading ? 'bg-gray-400' : 'bg-cyan-900 hover:bg-cyan-800'} text-white rounded transition`}
          onClick={handleSave}
          disabled={savingStatus.loading}
        >
          {savingStatus.loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default NotificationSettings;