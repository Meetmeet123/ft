"use client";
// pages/settings.js
import { useState } from 'react';
import Head from 'next/head';

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    apiKey: '988720996993-cjlb5lbg56b45fu505i3lx310iv556179.apps.googleusercontent.com',
    apiSecret: 'Xk5qRpcFacUZGg6QqC2P8kVP',
    googleCalendarApi: 'disabled',
    parentLiveClass: 'disabled'
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'radio' ? value : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    alert('Settings saved successfully!');
  };

  return (
    <>
      <Head>
        <title>Settings</title>
        <meta name="description" content="Application Settings" />
      </Head>

      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" >
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="apiKey">
                  API Key
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  id="apiKey"
                  type="text"
                  name="apiKey"
                  value={formData.apiKey}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="apiSecret">
                  API Secret
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  id="apiSecret"
                  type="text"
                  name="apiSecret"
                  value={formData.apiSecret}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-3">
                  Use Google Calendar API
                </label>
                <div className="flex space-x-6">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="googleCalendarApi"
                      value="disabled"
                      checked={formData.googleCalendarApi === 'disabled'}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-gray-700">Disabled</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="googleCalendarApi"
                      value="enabled"
                      checked={formData.googleCalendarApi === 'enabled'}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-gray-700">Enabled</span>
                  </label>
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-gray-700 text-sm font-medium mb-3">
                  Parent Live Class
                </label>
                <div className="flex space-x-6">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="parentLiveClass"
                      value="disabled"
                      checked={formData.parentLiveClass === 'disabled'}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-gray-700">Disabled</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="parentLiveClass"
                      value="enabled"
                      checked={formData.parentLiveClass === 'enabled'}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-gray-700">Enabled</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between border-t pt-6">
                <button style={{backgroundColor:'black'}} 
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save
                </button>
                <span className="text-sm text-gray-500">Version 6.0</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}