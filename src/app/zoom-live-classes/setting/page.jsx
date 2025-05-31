"use client";
import React, { useState } from 'react';

export default function ZoomSettings() {
  const [formData, setFormData] = useState({
    zoomApiKey: 's4aABiuGFXK5kj5JLMfUQtg',
    zoomApiSecret: 'wOELxqUTWGzH4q3knJ2Yh5DfAqRvBypB',
    teacherApiCredential: 'Disabled',
    staffZoomClient: 'Web',
    studentZoomClient: 'Web',
    parentLiveClass: 'Disabled'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Settings saved successfully!');
    console.log('Form submitted:', formData);
  };

  const handleGetAccessToken = () => {
    alert('Redirecting to Zoom authentication...');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="w-full mx-auto bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Setting</h1>
        
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
          <p className="text-yellow-700">Access Token not generated, Please authenticate your Account.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Zoom API Key*</label>
              <input
                type="text"
                name="zoomApiKey"
                value={formData.zoomApiKey}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Zoom API Secret*</label>
              <input
                type="text"
                name="zoomApiSecret"
                value={formData.zoomApiSecret}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Teacher Api Credential*</label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="teacherApiCredential"
                    value="Disabled"
                    checked={formData.teacherApiCredential === 'Disabled'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2">Disabled</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="teacherApiCredential"
                    value="Enabled"
                    checked={formData.teacherApiCredential === 'Enabled'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2">Enabled</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Use Zoom Client for Staff*</label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="staffZoomClient"
                    value="Web"
                    checked={formData.staffZoomClient === 'Web'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2">Web</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="staffZoomClient"
                    value="Zoom App"
                    checked={formData.staffZoomClient === 'Zoom App'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2">Zoom App</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Use Zoom Client for Student*</label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="studentZoomClient"
                    value="Web"
                    checked={formData.studentZoomClient === 'Web'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2">Web</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="studentZoomClient"
                    value="Zoom App"
                    checked={formData.studentZoomClient === 'Zoom App'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2">Zoom App</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Parent Live Class*</label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="parentLiveClass"
                    value="Disabled"
                    checked={formData.parentLiveClass === 'Disabled'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2">Disabled</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="parentLiveClass"
                    value="Enabled"
                    checked={formData.parentLiveClass === 'Enabled'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2">Enabled</span>
                </label>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button style={{color:'white', backgroundColor:'black'}}
                type="submit"
                className="bg-blue-600 text-black px-6 py-2 rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h2 className="text-lg font-bold text-gray-800 mb-4" style={{color:'blue', fontSize:"50px"}}> Zoom</h2>
          <p className="text-sm text-gray-600 mb-4">
            To generate Zoom Api credential <a href="https://marketplace.zoom.us/"  style={{color:'blue'}} className="text-blue-600 hover:underline">click here</a>
          </p>
          
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-1">Zoom redirect URL:</p>
            <p className="text-sm text-gray-600">https://demo.smart-school.infadmin/conference/generatedoken</p>
          </div>
          
          <button style={{color:'white', backgroundColor:'black'}}
            onClick={handleGetAccessToken}
            className="bg-green-600 text-black px-4 py-2 rounded hover:bg-green-700"
          >
            Get Access Token
          </button>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          <p>Version 7.0</p>
        </div>
      </div>
    </div>
  );
}