"use client";
import { useState } from 'react';
import { FiEdit2, FiX } from 'react-icons/fi';

export default function TeacherManagement() {
  // Dummy data
  const initialTeachers = [
    {
      id: 1,
      name: "John Smith",
      post: "Mathematics Teacher",
      description: "Specialized in Algebra and Calculus",
     
      facebook: "https://facebook.com/john.smith",
      twitter: "https://twitter.com/johnsmith",
      instagram: "https://instagram.com/john.smith"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      post: "Science Teacher",
      description: "Physics and Chemistry expert",
      
      facebook: "https://facebook.com/sarah.j",
      twitter: "https://twitter.com/sarahj",
      instagram: "https://instagram.com/sarahj"
    },
    {
      id: 3,
      name: "Michael Brown",
      post: "English Teacher",
      description: "Literature and Creative Writing",
      
      facebook: "https://facebook.com/michael.b",
      twitter: "https://twitter.com/michaelb",
      instagram: "https://instagram.com/michaelb"
    }
  ];

  // State
  const [teachers, setTeachers] = useState(initialTeachers);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    post: '',
    description: '',
     
    facebook: '',
    twitter: '',
    instagram: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Filter teachers based on search
  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.post.toLowerCase().includes(searchTerm.toLowerCase())
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
      // Update existing teacher
      setTeachers(teachers.map(teacher =>
        teacher.id === formData.id ? formData : teacher
      ));
    } else {
      // Add new teacher
      const newTeacher = {
        ...formData,
        id: teachers.length + 1
      };
      setTeachers([...teachers, newTeacher]);
    }
    setShowForm(false);
    resetForm();
  };

  // Edit teacher
  const handleEdit = (teacher) => {
    setFormData(teacher);
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
      post: '',
      description: '',
      
      facebook: '',
      twitter: '',
      instagram: ''
    });
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
              onClick={() => setShowForm(true)}
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
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher Post</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTeachers.map((teacher) => (
                    <tr key={teacher.id}>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{teacher.name}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{teacher.post}</td>
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
                Records: 1 to {filteredTeachers.length} of {filteredTeachers.length}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-500 mb-2">No data available in table</p>
              <p className="text-gray-400 text-sm">
                Add new record or search with different criteria.
              </p>
              <div className="mt-4 text-sm text-gray-500">
                Records: 0 to 0 of 0
              </div>
            </div>
          )}
          <div className="text-center text-gray-500 text-sm mt-4">
            2023 Dollfie Global School
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            {formData.id ? 'Edit Teacher' : 'Add Teacher'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teacher Name *</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Teacher Post *</label>
              <input
                type="text"
                name="post"
                className="w-full p-2 border rounded-lg"
                value={formData.post}
                onChange={handleInputChange}
                required
              />
            </div>
<hr />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea
                name="description"
                className="w-full p-2 border rounded-lg"
                rows="3"
                value={formData.description}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>

            

            <div className="border-t pt-4">
              <h3 className="text-lg font-medium mb-2">Social Media Links</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Facebook Link *</label>
                  <input
                    type="url"
                    name="facebook"
                    className="w-full p-2 border rounded-lg"
                    value={formData.facebook}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Twitter Link *</label>
                  <input
                    type="url"
                    name="twitter"
                    className="w-full p-2 border rounded-lg"
                    value={formData.twitter}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instagram Link *</label>
                  <input
                    type="url"
                    name="instagram"
                    className="w-full p-2 border rounded-lg"
                    value={formData.instagram}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
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