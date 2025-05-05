"use client";
import { useState, useEffect } from 'react';
import { FiMenu,FiEdit2,FiX } from 'react-icons/fi';

export default function GalleryManager() {
  // State for galleries and form
  const [galleries, setGalleries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    description: '',
    source: '',
    metaTitle: '',
    metaKeywords: '',
    metaDescription: '',
    images: []
  });
  const [editingGallery, setEditingGallery] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  // Dummy data matching your screenshots
  useEffect(() => {
    const dummyGalleries = [
      {
        id: 1,
        title: "Sports Events",
        url: "https://demo.smart-school.in/read/sport-e-events-1",
        description: "Sports events gallery",
        source: "Sports Department",
        metaTitle: "Sports Events Gallery",
        metaKeywords: "sports, events, gallery",
        metaDescription: "Collection of sports events photos",
        images: []
      },
      {
        id: 2,
        title: "bhajan sandhya good",
        url: "https://demo.smart-school.in/read/bhajan-sandhya-good",
        description: "Bhajan sandhya event",
        source: "Cultural Department",
        metaTitle: "Bhajan Sandhya Gallery",
        metaKeywords: "bhajan, cultural, event",
        metaDescription: "Photos from bhajan sandhya event",
        images: []
      },
      {
        id: 3,
        title: "Sports",
        url: "https://demo.smart-school.in/read/sports",
        description: "Sports activities",
        source: "Sports Department",
        metaTitle: "Sports Activities",
        metaKeywords: "sports, activities",
        metaDescription: "Gallery of sports activities",
        images: []
      },
      {
        id: 4,
        title: "Art",
        url: "https://demo.smart-school.in/read/art",
        description: "Art exhibition",
        source: "Art Department",
        metaTitle: "Art Gallery",
        metaKeywords: "art, exhibition",
        metaDescription: "Student art exhibition gallery",
        images: []
      },
      {
        id: 5,
        title: "Recreation Centre",
        url: "https://demo.smart-school.in/read/recreation-centre",
        description: "Recreation center activities",
        source: "Recreation Department",
        metaTitle: "Recreation Center",
        metaKeywords: "recreation, activities",
        metaDescription: "Photos from recreation center",
        images: []
      },
      {
        id: 6,
        title: "Facilities",
        url: "https://demo.smart-school.in/read/facilities",
        description: "School facilities",
        source: "Administration",
        metaTitle: "School Facilities",
        metaKeywords: "facilities, infrastructure",
        metaDescription: "Gallery of school facilities",
        images: []
      },
      {
        id: 7,
        title: "Celebration",
        url: "https://demo.smart-school.in/read/Celebration",
        description: "School celebrations",
        source: "Cultural Department",
        metaTitle: "Celebrations Gallery",
        metaKeywords: "celebrations, events",
        metaDescription: "Photos from school celebrations",
        images: []
      },
      {
        id: 8,
        title: "Pre Primary",
        url: "https://demo.smart-school.in/read/pre-primary",
        description: "Pre-primary activities",
        source: "Early Childhood",
        metaTitle: "Pre-Primary Gallery",
        metaKeywords: "pre-primary, kindergarten",
        metaDescription: "Gallery of pre-primary activities",
        images: []
      },
      {
        id: 9,
        title: "Activities",
        url: "https://demo.smart-school.in/read/activities",
        description: "School activities",
        source: "Student Affairs",
        metaTitle: "School Activities",
        metaKeywords: "activities, events",
        metaDescription: "Gallery of school activities",
        images: []
      },
      {
        id: 10,
        title: "Campus",
        url: "https://demo.smart-school.in/read/campus",
        description: "School campus",
        source: "Administration",
        metaTitle: "Campus Gallery",
        metaKeywords: "campus, infrastructure",
        metaDescription: "Photos of school campus",
        images: []
      },
      {
        id: 11,
        title: "NCC & Bands",
        url: "https://demo.smart-school.in/read/ncc-bands",
        description: "NCC and band activities",
        source: "NCC Department",
        metaTitle: "NCC & Bands Gallery",
        metaKeywords: "ncc, bands, activities",
        metaDescription: "Gallery of NCC and band activities",
        images: []
      }
    ];
    setGalleries(dummyGalleries);
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle file upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      id: Date.now() + Math.random(),
      file,
      preview: URL.createObjectURL(file)
    }));
    setFormData({
      ...formData,
      images: [...formData.images, ...newImages]
    });
  };

  // Remove image
  const handleRemoveImage = (id) => {
    setFormData({
      ...formData,
      images: formData.images.filter(image => image.id !== id)
    });
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingGallery) {
      // Update existing gallery
      setGalleries(galleries.map(gallery => 
        gallery.id === editingGallery.id ? { ...formData, id: editingGallery.id } : gallery
      ));
    } else {
      // Add new gallery
      const newGallery = {
        id: galleries.length + 1,
        ...formData
      };
      setGalleries([...galleries, newGallery]);
    }
    setShowForm(false);
    resetForm();
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      url: '',
      description: '',
      source: '',
      metaTitle: '',
      metaKeywords: '',
      metaDescription: '',
      images: []
    });
    setEditingGallery(null);
    setSelectedImage(null);
  };

  // Edit gallery
  const handleEdit = (gallery) => {
    setEditingGallery(gallery);
    setFormData({
      title: gallery.title,
      url: gallery.url,
      description: gallery.description,
      source: gallery.source,
      metaTitle: gallery.metaTitle,
      metaKeywords: gallery.metaKeywords,
      metaDescription: gallery.metaDescription,
      images: gallery.images
    });
    setShowForm(true);
  };

  // Delete gallery
  const handleDelete = (id) => {
    setGalleries(galleries.filter(gallery => gallery.id !== id));
  };

  // Filter galleries based on search
  const filteredGalleries = galleries.filter(gallery =>
    gallery.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    gallery.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Gallery List</h1>

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
          Add Gallery
        </button>
      </div>

      {!showForm ? (
        /* Gallery List View */
        <div className="bg-white rounded-lg shadow p-4">
          <div className="mb-4">
            <div className="grid grid-cols-12 font-semibold border-b pb-2">
              <div className="col-span-6">Title</div>
              <div className="col-span-5">URL</div>
              <div className="col-span-1">Action</div>
            </div>
            
            {filteredGalleries.map(gallery => (
              <div key={gallery.id} className="grid grid-cols-12 border-b py-3 hover:bg-gray-50">
                <div className="col-span-6 font-medium">{gallery.title}</div>
                <div className="col-span-5 text-blue-500 underline">
                  <a href={gallery.url} target="_blank" rel="noopener noreferrer">
                    {gallery.url}
                  </a>
                </div>
                <div className="col-span-1 flex space-x-2">
                  <button
                    onClick={() => handleEdit(gallery)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                                               <FiEdit2 size={16} />

                  </button>
                  <button
                    onClick={() => handleDelete(gallery.id)}
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
        /* Add/Edit Gallery Form */
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-6">
            {editingGallery ? 'Edit Gallery' : 'Add Gallery'}
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

            {/* URL Section */}
            <div>
              <label className="block text-sm font-medium mb-1">URL*</label>
              <input
                type="url"
                name="url"
                value={formData.url}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
                placeholder="https://example.com/gallery"
              />
            </div>

            {/* Description Section */}
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                rows="3"
              />
            </div>

            {/* Source Section */}
            <div>
              <label className="block text-sm font-medium mb-1">Source</label>
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  name="source"
                  value={formData.source}
                  onChange={handleInputChange}
                  className="flex-1 p-2 border rounded"
                />
                
              </div>
            </div>

            {/* Add Media Section */}
            <div className="border-t pt-4">
              <label className="block text-sm font-medium mb-1">Add Media</label>
              <div className="border-2 border-dashed border-gray-300 rounded p-4 text-center">
                <input
                  type="file"
                  id="galleryImages"
                  onChange={handleImageUpload}
                  className="hidden"
                  multiple
                />
                <label
                  htmlFor="galleryImages"
                  className="inline-block px-4 py-2 bg-gray-100 rounded cursor-pointer"
                >
                  Please Select Image
                </label>
                <p className="text-sm text-gray-500 mt-2">or drag and drop files here</p>
              </div>
              
              {/* Preview Selected Images */}
              <div className="grid grid-cols-4 gap-4 mt-4">
                {formData.images.map(image => (
                  <div key={image.id} className="relative">
                    <img
                      src={image.preview}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(image.id)}
                      className="absolute top-1 right-1 bg-red-500 text-black rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ))}
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
                {editingGallery ? 'Update' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}