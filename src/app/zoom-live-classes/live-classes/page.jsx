"use client";
import React, { useState } from 'react';
import { FaSearch, FaTrash, FaPlus } from 'react-icons/fa';

export default function LiveClasses() {
  // Dummy data for live classes
  const liveClassesData = [
    {
      id: 1,
      classTitle: "Hindi Online Classes",
      description: "Hindi Online Classes",
      dateTime: "05/30/2025 16:00:00",
      duration: 45,
      apiUsed: "Global",
      createdBy: "Self",
      createdFor: "Shivam Verma (Teacher : 9002)",
      classes: "☒ 7th Grade (A) ☒ 7th Grade (B) ☒ 7th Grade (C) ☒ 7th Grade (D)",
      status: "Awarded",
      zoomUrl: "https://us05web.zoom.us/s/81979142433?zak=eyJ0eXAiOiJKV1QiLCJzdli6ljAwMDAwMilslnptX3NrbSl6lnptX28ybSlslmFsZyl6lkhTMjU2I"
    },
    {
      id: 2,
      classTitle: "Science Extra Classes",
      description: "Science Extra Classes",
      dateTime: "05/26/2025 02:30:00",
      duration: 45,
      apiUsed: "Global",
      createdBy: "Self",
      createdFor: "Jason Shariton (Teacher : 90006)",
      classes: "☒ 7th Grade (A) ☒ 7th Grade (B) ☒ 7th Grade (C) ☒ 7th Grade (D)",
      status: "Awarded",
      zoomUrl: "https://zoom.us/j/123456789"
    },
    // Add more classes as needed
  ];

  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list', 'details', 'add'
  const [formData, setFormData] = useState({
    classTitle: '',
    classDateTime: '',
    duration: '',
    role: '',
    staff: '',
    class: '',
    section: '',
    hostVideo: 'enable',
    clientVideo: 'enable',
    description: ''
  });
  const statusOptions = ["Awaited", "Cancelled", "Finished"];

  // Filter classes based on search term
  const filteredClasses = liveClassesData.filter(cls =>
    cls.classTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.createdBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.createdFor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle view class details
  const handleViewClass = (cls) => {
    setSelectedClass(cls);
    setViewMode('details');
  };

  // Handle back to list
  const handleBackToList = () => {
    setViewMode('list');
    setSelectedClass(null);
  };

  // Handle add class form
  const handleAddClass = () => {
    setViewMode('add');
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
 const handleStartClass = (url) => {
    window.open(url, "_blank");
  };
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would save the class here
    setViewMode('list');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        {viewMode === 'list' && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Live Classes</h1>
              <button style={{ backgroundColor:"black",color:"white"}}
                onClick={handleAddClass}
                className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              >
                <FaPlus className="mr-2" />Add 
              </button>
            </div>

            <div className="mb-6 relative">
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

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration (Minutes)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Api Used</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created By</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created For</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredClasses.map(cls => (
                    <tr key={cls.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cls.classTitle}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cls.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cls.dateTime}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cls.duration}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cls.apiUsed}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{cls.createdBy}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{cls.createdFor}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
  {cls.classes.split(',').map((item, i) => (
    <span style={{width:'100px'}} key={i}>{item}<br /></span>
  ))}
</td>
                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <select style={{width:'100px'}}
                      value={cls.status}
                      onChange={(e) => {
                        setClasses(classes.map(c => 
                          c.id === cls.id ? { ...c, status: e.target.value } : c
                        ));
                      }}
                       className="border border-gray-300 rounded p-1"
                    >
                      {statusOptions.map(option => (
                        <option key={option} value={option} >{option}</option>
                      ))}
                    </select>
                  </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
  <button
   onClick={() => handleViewClass(cls)}
    className=" flex items-center space-x-1 text-white p-1"
    style={{ backgroundColor: 'green', width: 'auto', padding: '4px 8px', borderRadius: '4px' }}
    title="Start Class"
  >
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="6" width="15" height="12" rx="2" ry="2" stroke="#fff" strokeWidth="2" fill="white"/>
      <polygon points="16,10 21,7 21,17 16,14" fill="#fff"/>
    </svg>
    <span>Start</span>
  </button>
  
 <button
                        onClick={() => handleDelete(cls.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {viewMode === 'details' && selectedClass && (
          <div>
            <button
              onClick={handleBackToList}
              className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Live Classes
            </button>

            <h1 className="text-2xl font-bold text-gray-800 mb-6">{selectedClass.classTitle}</h1>
            
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">Host</th>
                    <th className="px-4 py-2 text-left">Date Time</th>
                    <th className="px-4 py-2 text-left">Duration (Minutes)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2">{selectedClass.createdFor}</td>
                    <td className="px-4 py-2">{selectedClass.dateTime}</td>
                    <td className="px-4 py-2">{selectedClass.duration}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Join With URL:</h2>
              <p className="text-blue-600 break-all">{selectedClass.zoomUrl}</p>
            </div>
             <div className="flex justify-end">
 <div className="flex space-x-2">
  <button
    onClick={() => handleStartClass(selectedClass.zoomUrl)}
    className="flex items-center space-x-1 text-white p-1"
    style={{ backgroundColor: 'green', width: 'auto', padding: '4px 8px', borderRadius: '4px' }}
    title="Start Class"
  >
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="6" width="15" height="12" rx="2" ry="2" stroke="#fff" strokeWidth="2" fill="white"/>
      <polygon points="16,10 21,7 21,17 16,14" fill="#fff"/>
    </svg>
    <span>Start</span>
  </button>
</div>

          </div>
          </div>
        )}

        {viewMode === 'add' && (
          <div>
            <button
              onClick={handleBackToList}
              className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Live Classes
            </button>

            <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Live Class</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Class Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="classTitle"
                  value={formData.classTitle}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Class Date Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  name="classDateTime"
                  value={formData.classDateTime}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Class Duration (Minutes) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role <span className="text-red-500">*</span>
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                >
                  <option value="">Select</option>
                  <option value="teacher">Teacher</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Staff <span className="text-red-500">*</span>
                </label>
                <select
                  name="staff"
                  value={formData.staff}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                >
                  <option value="">Select</option>
                  <option value="9002">Shivam Verma (9002)</option>
                  <option value="90006">Jason Shariton (90006)</option>
                  <option value="54545454">Albert Thomas (54545454)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Class <span className="text-red-500">*</span>
                </label>
                <select
                  name="class"
                  value={formData.class}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                >
                  <option value="">Select</option>
                  <option value="7th Grade">7th Grade</option>
                  <option value="Class 2">Class 2</option>
                  <option value="Class 4">Class 4</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Section <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="section"
                  value={formData.section}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Host Video <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="hostVideo"
                      value="enable"
                      checked={formData.hostVideo === 'enable'}
                      onChange={handleInputChange}
                      className="text-blue-600 focus:ring-blue-500"
                      required
                    />
                    <span className="ml-2">Enable</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="hostVideo"
                      value="disable"
                      checked={formData.hostVideo === 'disable'}
                      onChange={handleInputChange}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2">Disabled</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Client Video <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="clientVideo"
                      value="enable"
                      checked={formData.clientVideo === 'enable'}
                      onChange={handleInputChange}
                      className="text-blue-600 focus:ring-blue-500"
                      required
                    />
                    <span className="ml-2">Enable</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="clientVideo"
                      value="disable"
                      checked={formData.clientVideo === 'disable'}
                      onChange={handleInputChange}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2">Disabled</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  rows="3"
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}