 

"use client";
import React, { useState } from 'react';
import { FaDownload, FaTrash, FaSearch, FaChevronDown } from 'react-icons/fa';

export default function ContentTypes() {
  // Dummy data for content types (updated fields to match screenshot)
  const initialContentTypes = [
    { 
      id: 1, 
      title: 'Assignments', 
      type: 'Document', 
      date: '13:02:2023', 
      availableFor: 'student', 
      class: 'Nursery(A)' 
    }
  ];

  // State management
  const [contentTypes, setContentTypes] = useState(initialContentTypes);
  const [formData, setFormData] = useState({ 
    title: '', 
    type: 'Select', 
    date: '10-05-2025', 
    availableFor: [], 
    class: 'Select',
    section: 'Select',
    description: '',
    file: null
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle checkbox changes for Available For
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      if (checked) {
        return { ...prev, availableFor: [...prev.availableFor, value] };
      } else {
        return { ...prev, availableFor: prev.availableFor.filter(item => item !== value) };
      }
    });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, file: e.target.files[0] }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      // Update existing content type
      setContentTypes(contentTypes.map(item => 
        item.id === editingId ? { ...item, ...formData } : item
      ));
      setEditingId(null);
    } else {
      // Add new content type
      const newContentType = {
        id: Math.max(...contentTypes.map(item => item.id)) + 1,
        ...formData
      };
      setContentTypes([...contentTypes, newContentType]);
    }
    setFormData({ 
      title: '', 
      type: 'Select', 
      date: '10-05-2025', 
      availableFor: [], 
      class: 'Select',
      section: 'Select',
      description: '',
      file: null
    });
  };

  const handleDownload = () => {
    const headers = ['Content Title', 'Type', 'Date', 'Available For', 'Class'];
    const csvContent = [
      headers.join(','),
      ...contentTypes.map(item => [
        `"${item.title}"`,
        `"${item.type}"`,
        `"${item.date}"`,
        `"${item.availableFor}"`,
        `"${item.class}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'content_list.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle delete
  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this content?')) {
      setContentTypes(contentTypes.filter(item => item.id !== id));
    }
  };

  // Filter content types based on search term
  const filteredContentTypes = contentTypes.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
        {/* Left Side - Form (40% width) - UPDATED TO MATCH SCREENSHOT */}
        <div className="w-full md:w-2/5 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Upload Content</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content Type <span className="text-red-500">*</span>
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="Select">Select</option>
                <option value="Document">Document</option>
                <option value="Video">Video</option>
                <option value="Audio">Audio</option>
                <option value="Image">Image</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Available For <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="superAdmin"
                    name="availableFor"
                    value="All Super Admin"
                    checked={formData.availableFor.includes('All Super Admin')}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="superAdmin" className="ml-2 block text-sm text-gray-700">
                    All Super Admin
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="student"
                    name="availableFor"
                    value="All Student"
                    checked={formData.availableFor.includes('All Student')}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="student" className="ml-2 block text-sm text-gray-700">
                    All Student
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="allClasses"
                    name="availableFor"
                    value="Available For All Classes"
                    checked={formData.availableFor.includes('Available For All Classes')}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="allClasses" className="ml-2 block text-sm text-gray-700">
                    Available For All Classes
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Class <span className="text-red-500">*</span>
              </label>
              <select
                name="class"
                value={formData.class}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="Select">Select</option>
                <option value="Nursery(A)">Nursery(A)</option>
                <option value="Class 1">Class 1</option>
                <option value="Class 2">Class 2</option>
                <option value="Class 3">Class 3</option>
                <option value="Class 4">Class 4</option>
                <option value="Class 5">Class 5</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section <span className="text-red-500">*</span>
              </label>
              <select
                name="section"
                value={formData.section}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="Select">Select</option>
                <option value="Section A">Section A</option>
                <option value="Section B">Section B</option>
                <option value="Section C">Section C</option>
                <option value="Section D">Section D</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Date <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                rows="3"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content File <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                    >
                      <span>Drag and drop a file here or click</span>
                      <input
                        id="file-upload"
                        name="file"
                        type="file"
                        onChange={handleFileChange}
                        className="sr-only"
                        required
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">
                    PDF, DOC, MP4, MP3, JPG up to 10MB
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="submit"
                className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>

        {/* Right Side - Table (60% width) - remains unchanged */}
        <div className="w-full md:w-3/5 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Content List</h2>
          <div className="mb-4 flex items-center justify-between">
            <div className="relative w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="text-sm text-gray-600">
              Records {filteredContentTypes.length} of {contentTypes.length}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available For</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredContentTypes.length > 0 ? (
                  filteredContentTypes.map(contentType => (
                    <tr key={contentType.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contentType.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contentType.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contentType.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contentType.availableFor}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contentType.class}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button
                            onClick={handleDownload}
                            className="text-green-600 hover:text-green-800 p-1"
                            title="Download"
                          >
                            <FaDownload />
                          </button>
                          <button
                            onClick={() => handleDelete(contentType.id)}
                            className="text-red-600 hover:text-red-800 p-1"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                      No content found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}