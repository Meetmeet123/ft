"use client";
import { useState } from 'react';
import { FiEdit2, FiX } from 'react-icons/fi';

export default function ContentManagement() {
  // Dummy data
  const initialContents = [
    {
      id: 1,
      title: "Skills To Develop Your Child Memory",
      date: "05-05-2025",
      description: "",
      featuredImage: "",
      addedBy: "",
      metaTitle: "",
      metaKeywords: "",
      metaDescription: ""
    },
    {
      id: 2,
      title: "Creative WordPress Themes",
      date: "05-05-2025",
      description: "",
      featuredImage: "",
      addedBy: "",
      metaTitle: "",
      metaKeywords: "",
      metaDescription: ""
    }
  ];

  // State
  const [contents, setContents] = useState(initialContents);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    date: new Date().toLocaleDateString('en-GB').replace(/\//g, '-'),
    description: '',
    featuredImage: '',
    addedBy: '',
    metaTitle: '',
    metaKeywords: '',
    metaDescription: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showSeoSection, setShowSeoSection] = useState(false);

  // Filter contents based on search
  const filteredContents = contents.filter(content =>
    content.title.toLowerCase().includes(searchTerm.toLowerCase())
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
      // Update existing content
      setContents(contents.map(content =>
        content.id === formData.id ? formData : content
      ));
    } else {
      // Add new content
      const newContent = {
        ...formData,
        id: contents.length + 1
      };
      setContents([...contents, newContent]);
    }
    setShowForm(false);
    resetForm();
  };

  // Edit content
  const handleEdit = (content) => {
    setFormData(content);
    setShowForm(true);
  };

  // Delete content
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      setContents(contents.filter(content => content.id !== id));
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      id: null,
      title: '',
      date: new Date().toLocaleDateString('en-GB').replace(/\//g, '-'),
      description: '',
      featuredImage: '',
      addedBy: '',
      metaTitle: '',
      metaKeywords: '',
      metaDescription: ''
    });
    setShowSeoSection(false);
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* <h1 className="text-2xl font-bold mb-6">Content Management</h1> */}

      {!showForm ? (
        <div className="space-y-4">
          <div className="relative w-full sm:w-64 mb-4">
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
              <button style={{backgroundColor:"black",color:"white",position:"relative",left:"850px",bottom:"30px"}}
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="bg-blue-600  text-black px-4 py-2 rounded-lg hover:bg-blue-700 w-full sm:w-auto"

          >
            + Add 
          </button> 
          </div>
        
          {filteredContents.length > 0 ? (
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredContents.map((content) => (
                    <tr key={content.id}>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{content.title}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{content.date}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() => handleEdit(content)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                                                                 <FiEdit2 size={16} />

                        </button>
                        <button
                          onClick={() => handleDelete(content.id)}
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
                Records: 1 to {filteredContents.length} of {filteredContents.length}
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
            {formData.id ? 'Edit Content' : 'Add Content'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="text"
                name="date"
                className="w-full p-2 border rounded-lg"
                value={formData.date}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                className="w-full p-2 border rounded-lg"
                rows="5"
                value={formData.description}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Added By *</label>
                  <input
                    type="text"
                    name="addedBy"
                    className="w-full p-2 border rounded-lg"
                    value={formData.addedBy}
                    onChange={handleInputChange}
                    required
                  />
                </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Featured Image
              </label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Select Image
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-black rounded-lg hover:bg-blue-700"
                >
                  Add Media
                </button>
              </div>
            </div>


            <div className="pt-4">
              <button
                type="button"
                onClick={() => setShowSeoSection(!showSeoSection)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                {showSeoSection ? 'Hide SEO Section' : 'Show SEO Section'}
              </button>
            </div>

            {showSeoSection && (
              <div className="border-t pt-4 mt-4">
                <h3 className="text-lg font-medium mb-3">SEO Details</h3>
                
               

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
                  <input
                    type="text"
                    name="metaTitle"
                    className="w-full p-2 border rounded-lg mb-2"
                    value={formData.metaTitle}
                    onChange={handleInputChange}
                  />
                 
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meta Keyword</label>
                  <input
                    type="text"
                    name="metaKeywords"
                    className="w-full p-2 border rounded-lg mb-2"
                    value={formData.metaKeywords}
                    onChange={handleInputChange}
                  />
                  
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                  <textarea
                    name="metaDescription"
                    className="w-full p-2 border rounded-lg"
                    rows="3"
                    value={formData.metaDescription}
                    onChange={handleInputChange}
                  ></textarea>
                   
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-3 pt-4">
            
              <button style={{backgroundColor:"black",color:"white"}}
                type="submit"
                className="px-4 py-2 bg-blue-600 text-black rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}