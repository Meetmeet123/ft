"use client";
import React, { useState } from 'react';
import { FiEdit2, FiX } from 'react-icons/fi';

export default function TeacherManagement() {
  // Dummy data
  const initialTeachers = [
    {
      id: 1,
      name: "Blanca Wilson",
      designation: "Teacher",
      description: "I am an ambitious workaholic, but apart from that, pretty simple person.",
      imageUrl: "",
      imageFile: null
    }
  ];

  // State
  const [teachers, setTeachers] = useState(initialTeachers);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    designation: '',
    description: '',
    imageUrl: '',
    imageFile: null
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [activeImageTab, setActiveImageTab] = useState('upload'); // 'upload' or 'url'

  // Filter teachers based on search
  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle image file selection
  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          imageFile: reader.result,
          imageUrl: '' // Clear URL if file is selected
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const teacherData = {
      ...formData,
      // Use whichever image source was provided
      image: activeImageTab === 'upload' ? formData.imageFile : formData.imageUrl
    };

    if (formData.id) {
      // Update existing teacher
      setTeachers(teachers.map(teacher =>
        teacher.id === formData.id ? teacherData : teacher
      ));
    } else {
      // Add new teacher
      const newTeacher = {
        ...teacherData,
        id: teachers.length + 1
      };
      setTeachers([...teachers, newTeacher]);
    }
    setShowForm(false);
    resetForm();
  };

  // Edit teacher
  const handleEdit = (teacher) => {
    setFormData({
      ...teacher,
      imageUrl: teacher.imageUrl || '',
      imageFile: teacher.imageFile || null
    });
    setShowForm(true);
  };

  // Delete teacher
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      setTeachers(teachers.filter(teacher => teacher.id !== id));
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      id: null,
      name: '',
      designation: '',
      description: '',
      imageUrl: '',
      imageFile: null
    });
    setActiveImageTab('upload');
  };

  // Get current image preview
  const getImagePreview = () => {
    if (activeImageTab === 'upload' && formData.imageFile) {
      return formData.imageFile;
    } else if (activeImageTab === 'url' && formData.imageUrl) {
      return formData.imageUrl;
    }
    return null;
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* <h1 className="text-2xl font-bold mb-6">Teacher Management</h1> */}

      {!showForm ? (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border rounded-lg w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <button style={{backgroundColor:"black",color:"white"}}
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="bg-blue-600  text-black px-4 py-2 rounded-lg hover:bg-blue-700 w-full sm:w-auto"
            >
              + Add 
            </button>
          </div>

          {filteredTeachers.length > 0 ? (
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTeachers.map((teacher) => (
                    <tr key={teacher.id}>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{teacher.name}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{teacher.designation}</td>
                      <td className="px-4 py-4 text-sm text-gray-500 max-w-xs">{teacher.description}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() => handleEdit(teacher)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                                                                       <FiEdit2 size={16} />

                        </button>
                        <button
                          onClick={() => handleDelete(teacher.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                                                                   <FiX size={16} />
                    
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-4 py-3 bg-gray-50 text-right text-sm text-gray-500">
                Records: {filteredTeachers.length} | 01
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-500 mb-2">No data available in table</p>
              <p className="text-gray-400 text-sm">
                Add new record or search with different criteria.
              </p>
              <div className="mt-4 text-sm text-gray-500">
                Records: 0 | 00
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">
            {formData.id ? 'Edit Teacher' : 'Add Teacher'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image</label>
              
              {/* Image source tabs */}
              <div className="flex border-b mb-4">
                <button
                  type="button"
                  className={`px-4 py-2 ${activeImageTab === 'upload' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                  onClick={() => setActiveImageTab('upload')}
                >
                  Upload Image
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 ${activeImageTab === 'url' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                  onClick={() => setActiveImageTab('url')}
                >
                  Image URL
                </button>
              </div>
              
              {/* Image preview */}
              <div className="mt-1 flex items-center mb-4">
                {getImagePreview() ? (
                  <img src={getImagePreview()} alt="Preview" className="h-16 w-16 rounded-full object-cover" />
                ) : (
                  <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                    <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
              
              {/* Upload tab content */}
              {activeImageTab === 'upload' && (
                <label className="cursor-pointer">
                  <span className="bg-blue-600  text-black px-4 py-2 rounded-lg hover:bg-blue-700 inline-block">
                    Select Image
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageFileChange}
                  />
                </label>
              )}
              
              {/* URL tab content */}
              {activeImageTab === 'url' && (
                <input
                  type="url"
                  name="imageUrl"
                  placeholder="Enter image URL"
                  className="w-full p-2 border rounded-lg"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input
                type="text"
                name="name"
                className="w-full p-2 border rounded-lg"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Designation *</label>
              <input
                type="text"
                name="designation"
                className="w-full p-2 border rounded-lg"
                value={formData.designation}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                className="w-full p-2 border rounded-lg"
                rows="3"
                value={formData.description}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              
              <button style={{backgroundColor:"black",color:"white"}}
                type="submit"
                className="px-4 py-2 bg-blue-600  text-black rounded-lg hover:bg-blue-700"
              >
                {formData.id ? 'Update' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}