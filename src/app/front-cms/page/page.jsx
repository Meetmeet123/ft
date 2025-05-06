"use client";
import { useState, useEffect } from 'react';
import { FiMenu,FiEdit2,FiX } from 'react-icons/fi';


export default function PageManager() {
  const [pages, setPages] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    pageType: 'Standard',
    description: '',
   
    sidebar: false,
    featuredImage: null,
    metaTitle: '',
    metaKeywords: '',
    metaDescription: ''
  });
  const [editingPage, setEditingPage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy data matching your first screenshot
  useEffect(() => {
    const dummyPages = [
      {
        id: 1,
        title: "Home",
        url: "https://demo.smart-school.in/page/home",
        pageType: "Standard",
        description: "Home page content",
        
        sidebar: true,
        metaTitle: "Home Page",
        metaKeywords: "home, main",
        metaDescription: "Main home page of the school"
      },
      {
        id: 2,
        title: "Complain",
        url: "https://demo.smart-school.in/page/complain",
        pageType: "Standard",
        description: "Complaint submission page",
       
       
        sidebar: false,
        metaTitle: "Complaint Page",
        metaKeywords: "complain, feedback",
        metaDescription: "Submit your complaints here"
      },
      // Add more pages as needed...
    ];
    setPages(dummyPages);
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      featuredImage: e.target.files[0]
    });
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPage) {
      // Update existing page
      setPages(pages.map(page => 
        page.id === editingPage.id ? { ...formData, id: editingPage.id } : page
      ));
    } else {
      // Add new page
      const newPage = {
        id: pages.length + 1,
        ...formData,
        url: `https://demo.smart-school.in/page/${formData.title.toLowerCase().replace(/\s+/g, '-')}`
      };
      setPages([...pages, newPage]);
    }
    setShowForm(false);
    resetForm();
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      url: '',
      pageType: 'Standard',
      description: '',
     
      sidebar: false,
      featuredImage: null,
      metaTitle: '',
      metaKeywords: '',
      metaDescription: ''
    });
    setEditingPage(null);
  };

  // Edit page
  const handleEdit = (page) => {
    setEditingPage(page);
    setFormData({
      title: page.title,
      url: page.url,
      pageType: page.pageType,
      description: page.description,
     
      sidebar: page.sidebar,
      featuredImage: page.featuredImage,
      metaTitle: page.metaTitle,
      metaKeywords: page.metaKeywords,
      metaDescription: page.metaDescription
    });
    setShowForm(true);
  };

  // Delete page
  const handleDelete = (id) => {
    setPages(pages.filter(page => page.id !== id));
  };

  // Filter pages based on search
  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Page List</h1>

      {/* Search and Add button at the top */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search..."
          className="w-1/2 p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-black py-2 px-4 rounded"
        >
          + Add 
        </button>
      </div>

      {!showForm ? (
        /* Page List View */
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Page Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPages.map(page => (
                  <tr key={page.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{page.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500 underline">
                      <a href={page.url} target="_blank" rel="noopener noreferrer">
                        {page.url}
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{page.pageType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(page)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                                                 <FiEdit2 size={16} />
                                                                             

                        </button>
                        <button
                          onClick={() => handleDelete(page.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                                                                              <FiX size={16} />

                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Add/Edit Page Form */
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-6">
            {editingPage ? 'Edit Page' : 'Add Page'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Section */}
            <div>
              <label className="block text-sm font-medium mb-1">Title*</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            {/* Page Type Section */}
            <div>
              <label className="block text-sm font-medium mb-1">Page Type*</label>
              <div className="flex space-x-4">
                {['Standard', 'Events', 'News', 'Gallery'].map(type => (
                  <label key={type} className="flex items-center">
                    <input
                      type="radio"
                      name="pageType"
                      value={type}
                      checked={formData.pageType === type}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            {/* Description Section */}
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                rows="4"
              />
            </div>

           
            {/* Sidebar Setting Section */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-medium mb-3">Sidebar Setting</h3>
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  name="sidebar"
                  checked={formData.sidebar}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label>Sidebar</label>
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">Featured Image</label>
                <div className="border-2 border-dashed border-gray-300 rounded p-4 text-center">
                  <input
                    type="file"
                    id="featuredImage"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="featuredImage"
                    className="inline-block px-4 py-2 bg-gray-100 rounded cursor-pointer"
                  >
                    Please Select Image
                  </label>
                </div>
              </div>
            </div>

            {/* SEO Detail Section */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-medium mb-3">SEO Detail</h3>
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">Meta Title</label>
                <input
                  type="text"
                  name="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">Meta Keyword</label>
                <input
                  type="text"
                  name="metaKeywords"
                  value={formData.metaKeywords}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">Meta Description</label>
                <textarea
                  name="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  rows="2"
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-4 border-t">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
                className="px-4 py-2 bg-gray-500 text-black rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-black rounded"
              >
                {editingPage ? 'Update' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}