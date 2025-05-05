"use client";
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { FiMenu,FiEdit2,FiX } from 'react-icons/fi';


export default function NewsManager() {
  // State for news and form
  const [news, setNews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    description: '',
    url: '',
    sidebar: false,
    featuredImage: null,
  
    metaTitle: '',
    metaKeywords: '',
    metaDescription: ''
  });
  const [editingNews, setEditingNews] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy data matching your screenshots
  useEffect(() => {
    const dummyNews = [
      {
        id: 1,
        title: "School Vacation Notice",
        date: "2025-05-01",
        url: "https://demo.smart-school.in/read/school-vacation-notice",
        description: "Notice about upcoming school vacation",
        sidebar: true,
     
      },
      {
        id: 2,
        title: "Books Mela",
        date: "2025-04-15",
        url: "https://demo.smart-school.in/read/books-mela-1",
        description: "Annual book fair event announcement",
        sidebar: false,
      
      },
      {
        id: 3,
        title: "New Academic Session Admission Start (2025-26)!!!!!!!!!!",
        date: "2025-04-01",
        url: "https://demo.smart-school.in/read/new-academic-session-admission-start-2025-26",
        description: "Admissions open for new academic year",
        sidebar: true,
      
      },
      // Add more news items as needed...
    ];
    setNews(dummyNews);
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
    if (editingNews) {
      // Update existing news
      setNews(news.map(item => 
        item.id === editingNews.id ? { ...formData, id: editingNews.id } : item
      ));
    } else {
      // Add new news
      const newItem = {
        id: news.length + 1,
        ...formData
      };
      setNews([...news, newItem]);
    }
    setShowForm(false);
    resetForm();
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      description: '',
      url: '',
      sidebar: false,
      featuredImage: null,
    
      metaTitle: '',
      metaKeywords: '',
      metaDescription: ''
    });
    setEditingNews(null);
  };

  // Edit news
  const handleEdit = (newsItem) => {
    setEditingNews(newsItem);
    setFormData({
      title: newsItem.title,
      date: newsItem.date,
      description: newsItem.description,
      url: newsItem.url,
      sidebar: newsItem.sidebar || false,
      featuredImage: newsItem.featuredImage || null,
    
      metaTitle: newsItem.metaTitle || '',
      metaKeywords: newsItem.metaKeywords || '',
      metaDescription: newsItem.metaDescription || ''
    });
    setShowForm(true);
  };

  // Delete news
  const handleDelete = (id) => {
    setNews(news.filter(item => item.id !== id));
  };

  // Filter news based on search
  const filteredNews = news.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">News List</h1>

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
          Add News
        </button>
      </div>

      {!showForm ? (
        /* News List View */
        <div className="bg-white rounded-lg shadow p-4">
          <div className="mb-4">
            <div className="grid grid-cols-12 font-semibold border-b pb-2">
              <div className="col-span-6">Title</div>
              <div className="col-span-5">URL</div>
              <div className="col-span-1">Action</div>
            </div>
            
            {filteredNews.map(item => (
              <div key={item.id} className="grid grid-cols-12 border-b py-3 hover:bg-gray-50">
                <div className="col-span-6 font-medium">{item.title}</div>
                <div className="col-span-5 text-blue-500 underline">
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.url}
                  </a>
                </div>
                <div className="col-span-1 flex space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                                                 <FiEdit2 size={16} />

                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                                                 <FiX size={16} />

                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Add/Edit News Form */
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-6">
            {editingNews ? 'Edit News' : 'Add News'}
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

            {/* Date Section */}
            <div>
              <label className="block text-sm font-medium mb-1">Date*</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            {/* URL Section */}
            <div>
              <label className="block text-sm font-medium mb-1">URL</label>
              <input
                type="url"
                name="url"
                value={formData.url}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="https://example.com/news"
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

            {/* Description Section */}
            <div>
              <label className="block text-sm font-medium mb-1">Description*</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                rows="4"
                required
              />
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
                {editingNews ? 'Update' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}