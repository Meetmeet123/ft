"use client";
import React, { useState } from 'react';

// Initial data structure
const initialSettings = {
  curriculum: {
    quiz: true,
    exam: true,
    assignment: true
  },
  aws: {
    accessKeyId: 'superadmin@gmail.com',
    secretAccessKey: '',
    bucketName: '',
    region: '',
    ybyh: ''
  },
  guest: {
    guestLogin: 'disabled',
    guestUserPrefix: 'Guest',
    guestUserIdStart: 100
  }
};

export default function SettingsPage() {
  // State for all settings
  const [settings, setSettings] = useState(initialSettings);
  const [saveStatus, setSaveStatus] = useState({
    curriculum: false,
    aws: false,
    guest: false
  });

  // Handle saving any section
  const handleSave = async (section, e) => {
    e.preventDefault();
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In a real app, you would send to your backend:
      // const response = await fetch(`/api/settings/${section}`, {
      //   method: 'POST',
      //   body: JSON.stringify(settings[section])
      // });

      setSaveStatus({...saveStatus, [section]: true});
      setTimeout(() => setSaveStatus({...saveStatus, [section]: false}), 2000);
    } catch (error) {
      console.error(`Error saving ${section}:`, error);
    }
  };

  // Handle input changes
  const handleChange = (section, field, value) => {
    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [field]: value
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">System Settings</h1>

      {/* Online Course Curriculum Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Online Course Curriculum</h2>
        
        <form onSubmit={(e) => handleSave('curriculum', e)}>
          <div className="space-y-3 mb-4">
            {['quiz', 'exam', 'assignment'].map((item) => (
              <label key={item} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.curriculum[item]}
                  onChange={(e) => handleChange('curriculum', item, e.target.checked)}
                  className="h-4 w-4"
                />
                <span className="capitalize">{item}</span>
              </label>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <div>
              {saveStatus.curriculum && (
                <span className="text-green-600 text-sm">Saved successfully!</span>
              )}
            </div>
            <button style={{backgroundColor:'darkgray',color:'white'}}
              type="submit"
              className="px-4 py-2 bg-blue-600 text-black rounded hover:bg-blue-700"
            >
              Save  
            </button>
          </div>
        </form>
      </div>

      {/* AWS S3 Bucket Setting Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">AWS S3 Bucket Setting</h2>
        
        <form onSubmit={(e) => handleSave('aws', e)}>
          <div className="space-y-4 mb-4">
            {[
              {id: 'accessKeyId', label: 'Access Key ID', type: 'text'},
              {id: 'secretAccessKey', label: 'Secret Access Key', type: 'password'},
              {id: 'bucketName', label: 'Bucket Name', type: 'text'},
              {id: 'region', label: 'Region', type: 'text'},
              {id: 'ybyh', label: 'YBYH', type: 'text'}
            ].map((field) => (
              <div key={field.id}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}:
                </label>
                <input
                  type={field.type}
                  value={settings.aws[field.id]}
                  onChange={(e) => handleChange('aws', field.id, e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <div>
              {saveStatus.aws && (
                <span className="text-green-600 text-sm">Saved successfully!</span>
              )}
            </div>
            <button style={{backgroundColor:'darkgray',color:'white'}}
              type="submit"
              className="px-4 py-2 bg-blue-600 text-black rounded hover:bg-blue-700"
            >
              Save  
            </button>
          </div>
        </form>
      </div>

      {/* Guest User Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Guest User</h2>
        
        <form onSubmit={(e) => handleSave('guest', e)}>
          <div className="space-y-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Guest Login:
              </label>
              <div className="flex space-x-4">
                {['disabled', 'enabled'].map((option) => (
                  <label key={option} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="guestLogin"
                      value={option}
                      checked={settings.guest.guestLogin === option}
                      onChange={() => handleChange('guest', 'guestLogin', option)}
                      className="h-4 w-4"
                    />
                    <span className="capitalize">{option}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Guest User Prefix:
              </label>
              <input
                type="text"
                value={settings.guest.guestUserPrefix}
                onChange={(e) => handleChange('guest', 'guestUserPrefix', e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Guest User Id Start From:
              </label>
              <input
                type="number"
                value={settings.guest.guestUserIdStart}
                onChange={(e) => handleChange('guest', 'guestUserIdStart', parseInt(e.target.value) || 0)}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              {saveStatus.guest && (
                <span className="text-green-600 text-sm">Saved successfully!</span>
              )}
            </div>
            <button style={{backgroundColor:'darkgray',color:'white'}}
              type="submit"
              className="px-4 py-2 bg-blue-600 text-black rounded hover:bg-blue-700"
            >
              Save  
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}