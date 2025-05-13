"use client";
import { useState } from 'react';

export default function SettingsPage() {
  // State for comment options
  const [commentOptions, setCommentOptions] = useState({
    studentComment: false,
    parentComment: true
  });

  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCommentOptions(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically save to backend
    console.log("Settings saved:", commentOptions);
    alert("Settings saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-full mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Setting</h1>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Comment Option</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap gap-8 items-center mb-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="studentComment"
                  name="studentComment"
                  checked={commentOptions.studentComment}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="studentComment" className="ml-2 block text-sm text-gray-700">
                  Student Comment
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="parentComment"
                  name="parentComment"
                  checked={commentOptions.parentComment}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="parentComment" className="ml-2 block text-sm text-gray-700">
                  Parent Comment
                </label>
              </div>
            </div>
            
            <div className="flex flex-col items-start">
              <button
                type="submit"
                className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700"
              >
                Save
              </button>
              
              <span className="text-sm text-gray-500 mt-2">Version 3.0</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}