'use client';
import React, { useEffect, useState } from 'react';
import { getNotificationDetails, updateNotificationDetails } from './notificationData';
import { toast, ToastContainer } from 'react-toastify';

interface NotificationItem {
  id: number;
  subject: string;
  message: string;
  recipient: string[] | null;
  display_notification?: boolean | string | number;
  display_sms?: boolean | string | number;
  display_whatsapp?: boolean | string | number;
  is_mail?: boolean | string | number;
  [key: string]: any; // For dynamic keys
}

const NotificationSettings: React.FC = () => {
  const [notificationItems, setNotificationItems] = useState<NotificationItem[]>([]);
  const [updatedData, setUpdateData] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [savingStatus, setSavingStatus] = useState<{
    loading: boolean;
    success: boolean;
    error: string | null;
  }>({
    loading: false,
    success: false,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getNotificationDetails();
        setNotificationItems(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDestinationChange = (index: number, key: string) => {
    setNotificationItems(prevItems => {
      const updatedItems = [...prevItems];
      const currentValue = updatedItems[index][key];
      
      // Convert to boolean and toggle
      const isCurrentlyTrue = currentValue === true || 
                             currentValue === 'true' || 
                             currentValue === 1 || 
                             currentValue === '1';
      
      updatedItems[index] = {
        ...updatedItems[index],
        [key]: !isCurrentlyTrue,
      };

      const updatedItem = updatedItems[index];
      
      // Update the updatedData state
      setUpdateData(prevUpdatedData => {
        const existingIndex = prevUpdatedData.findIndex(data => data.id === updatedItem.id);
        if (existingIndex >= 0) {
          const newUpdatedData = [...prevUpdatedData];
          newUpdatedData[existingIndex] = updatedItem;
          return newUpdatedData;
        } else {
          return [...prevUpdatedData, updatedItem];
        }
      });

      return updatedItems;
    });
  };

  const handleRecipientChange = (index: number, recipient: string) => {
    setNotificationItems(prevItems => {
      const updatedItems = [...prevItems];
      const currentItem = { ...updatedItems[index] };

      if (!Array.isArray(currentItem.recipient)) {
        currentItem.recipient = [recipient];
      } else if (currentItem.recipient.includes(recipient)) {
        currentItem.recipient = currentItem.recipient.filter((r) => r !== recipient);
      } else {
        currentItem.recipient = [...currentItem.recipient, recipient];
      }

      updatedItems[index] = currentItem;

      // Update the updatedData state
      setUpdateData(prevUpdatedData => {
        const existingIndex = prevUpdatedData.findIndex(data => data.id === currentItem.id);
        if (existingIndex >= 0) {
          const newUpdatedData = [...prevUpdatedData];
          newUpdatedData[existingIndex] = currentItem;
          return newUpdatedData;
        } else {
          return [...prevUpdatedData, currentItem];
        }
      });

      return updatedItems;
    });
  };

  const handleSave = async () => {
    if (updatedData.length === 0) {
      toast.info("No changes to save");
      return;
    }

    setSavingStatus({ loading: true, success: false, error: null });

    try {
      console.log('Saving data:', updatedData); // Debug log
      
      const responses = await Promise.all(
        updatedData.map((data) => updateNotificationDetails(data))
      );

      console.log('API responses:', responses); // Debug log

      const hasError = responses.some(
        (res) => !res || typeof res !== 'object' || !('status' in res) || res.status !== 200
      );

      if (hasError) {
        toast.error("Some updates failed");
        setSavingStatus({ loading: false, success: false, error: 'Partial failure' });
      } else {
        toast.success("All updates saved successfully");
        setSavingStatus({ loading: false, success: true, error: null });
        
        // Clear the updated data after successful save
        setUpdateData([]);
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSavingStatus(prev => ({ ...prev, success: false }));
        }, 3000);
      }

    } catch (error: any) {
      console.error('Save error:', error); // Debug log
      toast.error("Failed to save notifications");
      setSavingStatus({ 
        loading: false, 
        success: false, 
        error: error.message || 'Failed to save' 
      });
    }
  };

  const destinationOptions: Record<string, string> = {
    display_notification: 'Notification',
    display_sms: 'SMS',
    display_whatsapp: 'WhatsApp',
    is_mail: 'Email',
  };

  const recipientOptions: string[] = ['Student', 'Guardian', 'Staff'];

  if (loading) {
    return <div className="p-4">Loading notification settings...</div>;
  }

  if (!notificationItems || notificationItems.length === 0) {
    return <div className="p-4">No notification settings available.</div>;
  }

  return (
    <div className="relative p-4 min-h-screen">
      <ToastContainer/>
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
              <tr key={item.id} className="border-t">
                <td className="border px-3 py-2 align-top min-w-[150px]">{item.subject}</td>

                <td className="border px-3 py-2 align-top min-w-[150px]">
                  {Object.entries(destinationOptions).map(([key, label]) => (
                    <div key={key} className="flex items-center space-x-1 mb-1">
                      <input
                        type="checkbox"
                        checked={
                          item[key] === true ||
                          item[key] === 'true' ||
                          item[key] === 1 ||
                          item[key] === '1'
                        }
                        onChange={() => handleDestinationChange(index, key)}
                      />
                      <label className="ml-1 text-sm">{label}</label>
                    </div>
                  ))}
                </td>

                <td className="border px-3 py-2 align-top min-w-[150px]">
                  {recipientOptions.map((type) => (
                    <div key={type} className="flex items-center space-x-1 mb-1">
                      <input
                        type="checkbox"
                        checked={Array.isArray(item.recipient) && item.recipient.includes(type)}
                        onChange={() => handleRecipientChange(index, type)}
                      />
                      <label className="ml-1 text-sm">{type}</label>
                    </div>
                  ))}
                </td>

                <td className="border px-3 py-2 align-top whitespace-pre-line min-w-[200px]">
                  {item.message}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-4 items-center">
        <button
          className={`px-6 py-2 ${
            savingStatus.loading || updatedData.length === 0
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-cyan-900 hover:bg-cyan-800'
            } text-white rounded transition`}
          onClick={handleSave}
          disabled={savingStatus.loading || updatedData.length === 0}
        >
          {savingStatus.loading ? 'Saving...' : `Save`}
        </button>
      </div>
    </div>
  );
};

export default NotificationSettings;