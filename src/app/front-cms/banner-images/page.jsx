"use client";
import React, { useState } from 'react';

export default function ImageGallery() {
  // Dummy image data with some empty URLs to show placeholders
  const [images, setImages] = useState([
    { id: 1, url: 'https://via.placeholder.com/300x200?text=4barmer1', name: '4barmer1.jpg' },
    { id: 2, url: '', name: '4barmer4.jpg' },
    { id: 3, url: 'https://via.placeholder.com/300x200?text=op-barmer2', name: 'op-barmer2-2.jpg' },
    { id: 4, url: '', name: '4barmer3-3.jpg' },
    { id: 5, url: 'https://via.placeholder.com/300x200?text=DCC+Sports', name: 'DCC Sports Day (3).jpg' },
  ]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      setImages(images.filter(image => image.id !== id));
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Image Gallery</h1>
      
      <div className="flex flex-wrap gap-4">
        {images.map((image) => (
          <div 
            key={image.id} 
            className="flex-1 min-w-[200px] max-w-[300px] bg-white rounded-lg overflow-hidden shadow-md"
          >
            {/* Image or Placeholder */}
            <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
              {image.url ? (
                <img 
                  src={image.url} 
                  alt={image.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-4">
                  <div className="w-16 h-16 mx-auto mb-2 bg-blue-100 rounded-full flex items-center justify-center text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-500">No Image</p>
                </div>
              )}
            </div>
            
            {/* Image Info and Delete Button */}
            <div className="p-3 flex justify-between items-center border-t">
              <p className="text-sm font-medium text-gray-700 truncate">
                {image.name}
              </p>
              
              <button
                onClick={() => handleDelete(image.id)}
                className="text-red-500 hover:text-red-700"
                title="Delete image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}