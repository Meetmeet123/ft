"use client";
import React, { useState } from 'react';
import { FiEdit2, FiX } from 'react-icons/fi';

export default function DirectorManagement() {
  // Dummy data
  const initialDirectors = [
    {
      id: 1,
      title: "Director's Address",
      name: "Hon. Basvaraj M. Patil, Nagraikar",
      post: "President- Kamawser Bhaurao Patil Education Society, Udgir",
      description: ""
    },
    {
      id: 2,
      title: "Commander's Address",
      name: "Commander B.K. Singh (Retd)",
      post: "Commandant",
      description: ""
    },
    {
      id: 3,
      title: "Principal's Address",
      name: "Mr. Kulkarni VG",
      post: "Principal",
      description: ""
    }
  ];

  // State
  const [directors, setDirectors] = useState(initialDirectors);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    name: '',
    post: '',
    description: '',
   
    aidMedia: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Filter directors based on search
  const filteredDirectors = directors.filter(dir =>
    dir.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dir.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dir.post.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      // Update existing director
      setDirectors(directors.map(dir =>
        dir.id === formData.id ? formData : dir
      ));
    } else {
      // Add new director
      const newDirector = {
        ...formData,
        id: directors.length + 1
      };
      setDirectors([...directors, newDirector]);
    }
    setShowForm(false);
    resetForm();
  };

  // Edit director
  const handleEdit = (dir) => {
    setFormData(dir);
    setShowForm(true);
  };

  // Delete director
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this director?')) {
      setDirectors(directors.filter(dir => dir.id !== id));
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      id: null,
      title: '',
      name: '',
      post: '',
      description: '',
       
      aidMedia: ''
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Director Management</h1>

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
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full sm:w-auto"
            >
              + Add 
            </button>
          </div>

          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Director Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Director Post</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDirectors.map((dir) => (
                  <tr key={dir.id}>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{dir.title}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{dir.name}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{dir.post}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => handleEdit(dir)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                                              <FiEdit2 size={16} />

                      </button>
                      <button
                        onClick={() => handleDelete(dir.id)}
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
              Records: 1 to {filteredDirectors.length} of {filteredDirectors.length}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-4">
            {formData.id ? 'Edit Director' : 'Add Director'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Director Name</h3>
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
              <h3 className="text-lg font-medium mb-2">Director Post</h3>
              <input
                type="text"
                name="post"
                className="w-full p-2 border rounded-lg"
                value={formData.post}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Title *</h3>
              <input
                type="text"
                name="title"
                className="w-full p-2 border rounded-lg"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Description *</h3>
              <textarea
                name="description"
                className="w-full p-2 border rounded-lg"
                rows="4"
                value={formData.description}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>

           
            <div>
              <h4 className="font-medium mb-2">Aid Media</h4>
              <input
                type="text"
                name="aidMedia"
                className="w-full p-2 border rounded-lg"
                value={formData.aidMedia}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
             
              <button style={{backgroundColor:"black",color:"white"}}
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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