"use client";
import { useState, useRef } from 'react';
import { FiMenu,FiEdit2,FiX } from 'react-icons/fi';

export default function MediaManager() {
  const [files, setFiles] = useState([]);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [fileTypeFilter, setFileTypeFilter] = useState('all');
  const [selectedFile, setSelectedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showOptions, setShowOptions] = useState(null);
  const fileInputRef = useRef(null);

  // Sample initial files data
  const initialFiles = [
    { 
      id: 1, 
      name: 'M_Admission-side-banner.png', 
      type: 'image/png', 
      url: 'https://demo.smart-school.in/uploads/gallery/medi-ai/743747104-150620734067ef78202e903M_Admission-side-banner.png?1746269258', 
      size: '53.51 KB', 
      dimensions: '800x600', 
      uploaded: '2023-06-15',
      title: 'ADMISSION OPEN for 2025 - 2026',
      subtitle: 'COME JOIN THE INVENTURE COMMUNITY'
    },
    { 
      id: 2, 
      name: 'Screenshot 2023-02-23.png', 
      type: 'image/png', 
      url: '/sample2.png', 
      size: '1.8 MB', 
      dimensions: '1280x720', 
      uploaded: '2023-02-23',
      title: '',
      subtitle: ''
    },
  ];

  // Initialize with sample files
  useState(() => {
    setFiles(initialFiles);
  }, []);

  // Handle file upload
  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files).map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      type: file.type,
      url: URL.createObjectURL(file),
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      dimensions: 'N/A',
      uploaded: new Date().toISOString().split('T')[0],
      file,
      title: '',
      subtitle: ''
    }));
    setFiles([...files, ...uploadedFiles]);
  };

  // Handle YouTube URL submission
  const handleYoutubeSubmit = (e) => {
    e.preventDefault();
    if (youtubeUrl) {
      const newVideo = {
        id: Date.now(),
        name: `YouTube Video ${files.length + 1}`,
        type: 'youtube',
        url: youtubeUrl,
        size: 'N/A',
        dimensions: 'N/A',
        uploaded: new Date().toISOString().split('T')[0],
        title: '',
        subtitle: ''
      };
      setFiles([...files, newVideo]);
      setYoutubeUrl('');
    }
  };

  // Handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) {
      handleFileUpload({ target: { files: e.dataTransfer.files } });
    }
  };

  // Handle file view
  const handleView = (file) => {
    setSelectedFile(file);
    setShowModal(true);
    setShowOptions(null);
  };

  // Handle file delete
  const handleDelete = (id) => {
    setFiles(files.filter(file => file.id !== id));
    setShowOptions(null);
  };

  // Filter files based on search and type
  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = fileTypeFilter === 'all' || 
                       (fileTypeFilter === 'image' && file.type.startsWith('image')) ||
                       (fileTypeFilter === 'video' && file.type.startsWith('video')) ||
                       (fileTypeFilter === 'document' && ['application/pdf', 'application/msword'].includes(file.type)) ||
                       (fileTypeFilter === 'youtube' && file.type === 'youtube');
    return matchesSearch && matchesType;
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Media Manager</h1>

      {/* Upload Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Upload Your File</h2>
        
        {/* File Upload */}
        <div  
          className=" border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6 cursor-pointer"
          onClick={() => fileInputRef.current.click()}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            multiple
          />
          <p className="text-gray-600 mb-2">Choose a file or drag it here.</p>
          <button className="bg-blue-500 text-black py-2 px-4 rounded">
            Select Files
          </button>
        </div>

        {/* YouTube Upload */}
        <form onSubmit={handleYoutubeSubmit} className="space-y-4">
          <div  >
            <label className="block text-sm font-medium mb-1">Upload Youtube Video*</label>
            <input
              type="url"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="Enter YouTube URL"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-black py-2 px-4 rounded">
            Submit
          </button>
        </form>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div style={{ 
        backgroundColor: '#f3f4f6', 
        padding: '15px', 
        borderRadius: '8px', 
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        flexWrap: 'wrap'
      }}>
                    <div className="flex-1 min-w-[200px]">

            <label className="block text-sm font-medium mb-1">Search By File Name</label>
            <input
              type="text"
              placeholder="Enter Keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex-1 min-w-[200px]">

            <label className="block text-sm font-medium mb-1">Filter By File Type</label>
            <select
              value={fileTypeFilter}
              onChange={(e) => setFileTypeFilter(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="all">All Types</option>
              <option value="image">Images</option>
              <option value="video">Videos</option>
              <option value="document">Documents</option>
              <option value="youtube">YouTube</option>
            </select>
          </div>
        </div>
      </div>

      {/* Files Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredFiles.map(file => (
          <div key={file.id} className="bg-white rounded-lg shadow overflow-hidden relative">
            {file.type.startsWith('image') ? (
              <img 
                src={file.url} 
                alt={file.name} 
                className="w-full h-32 object-cover cursor-pointer"
                onClick={() => handleView(file)}
              />
            ) : file.type === 'youtube' ? (
              <div 
                className="w-full h-32 bg-gray-200 flex items-center justify-center cursor-pointer"
                onClick={() => handleView(file)}
              >
                <span className="text-gray-500">YouTube Video</span>
              </div>
            ) : (
              <div 
                className="w-full h-32 bg-gray-100 flex items-center justify-center cursor-pointer"
                onClick={() => handleView(file)}
              >
                <span className="text-gray-500">{file.type.split('/')[1] || file.type}</span>
              </div>
            )}
            
            {/* Options button */}
            <button 
              className="absolute top-2 right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md"
              onClick={(e) => {
                e.stopPropagation();
                setShowOptions(showOptions === file.id ? null : file.id);
              }}
            >
              ⋮
            </button>
            
            {/* Options dropdown */}
            {showOptions === file.id && (
              <div className="absolute top-10 right-2 bg-white shadow-lg rounded-md z-10">
                <button 
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleView(file);
                  }}
                >
                                              <FiMenu size={20} />

                </button>
                <button 
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(file.id);
                  }}
                >
                                              <FiX size={16} />

                </button>
              </div>
            )}
            
            <div className="p-2">
              <p className="text-sm font-medium truncate">{file.name}</p>
              <p className="text-xs text-gray-500">{file.type.split('/')[1] || file.type}</p>
            </div>
          </div>
        ))}
      </div>

      {/* File Details Modal */}
      {showModal && selectedFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">Media Details</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            {selectedFile.title && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold">{selectedFile.title}</h3>
                <p className="text-gray-600">{selectedFile.subtitle}</p>
              </div>
            )}
            
            <div className="mb-4">
              {selectedFile.type.startsWith('image') ? (
                <img 
                  src={selectedFile.url} 
                  alt={selectedFile.name} 
                  className="w-full h-48 object-contain mx-auto"
                />
              ) : (
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-500">
                    {selectedFile.type === 'youtube' ? 'YouTube Video' : 'File Preview'}
                  </span>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Media Name:</span>
                <span className="font-medium">{selectedFile.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Media Type:</span>
                <span className="font-medium">{selectedFile.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Media Path:</span>
                <span className="font-medium truncate max-w-xs">{selectedFile.url}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Media Size:</span>
                <span className="font-medium">{selectedFile.size}</span>
              </div>
              {selectedFile.dimensions && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Dimensions:</span>
                  <span className="font-medium">{selectedFile.dimensions}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Uploaded:</span>
                <span className="font-medium">{selectedFile.uploaded}</span>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-blue-500 text-black rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="mt-8 text-center text-sm text-gray-500">
        © 2025 Shinkishina Vidyalaya Guripati Omega
      </footer>
    </div>
  );
}