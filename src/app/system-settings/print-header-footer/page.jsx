"use client"
import React, { useState } from 'react';

const PrintHeaderFooter = () => {
  const [headerImage, setHeaderImage] = useState(null);
  const [activeTab, setActiveTab] = useState('Fees Receipt');
  const [footerContent, setFooterContent] = useState('This receipt is computer generated hence no signature is required.');
  const [selectedFormat, setSelectedFormat] = useState('Normal text');
  const [formatting, setFormatting] = useState({
    bold: false,
    italic: false,
    underline: false,
    small: false,
    quote: false,
    bulletList: false,
    numberedList: false
  });
  const [alignment, setAlignment] = useState('left');

  // Tabs for different document types
  const tabs = [
    'Fees Receipt',
    'Payslip',
    'Online Admission Receipt',
    'Online Exam',
    'General Purpose'
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHeaderImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setHeaderImage(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHeaderImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleFormatting = (type) => {
    setFormatting(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Update footer content based on the active tab
    if (tab === "Fees Receipt") {
      setFooterContent('This receipt is computer generated hence no signature is required.');
    } else if (tab === "Payslip") {
      setFooterContent('This is a computer generated payslip and does not require any signature.');
    } else if (tab === "Online Admission Receipt") {
      setFooterContent('This receipt is for admission computer generated hence no signature is required.');
    } else if (tab === "Online Exam") {
      setFooterContent("This is a receipt for online exam, computer generated, and hence no signature is required.");
    } else {
      setFooterContent("Footer text example ......");
    }
  };

  const handleSave = () => {
    // Save functionality
    alert('Document settings saved successfully!');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(footerContent)
      .then(() => alert('Footer content copied to clipboard'))
      .catch(err => console.error('Failed to copy: ', err));
  };

  const handleInsertImage = () => {
    // This would normally open a file selector, for now just alert
    document.getElementById('footer-image-upload').click();
  };

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4 sm:mb-0">Print Header Footer</h1>
        
        {/* Tab Navigation */}
        <div className="w-full sm:w-auto flex flex-nowrap overflow-x-auto pb-2 sm:pb-0 border-b sm:border-0">
  {tabs.map((tab) => (
    <button
      key={tab}
      className={`relative px-3 py-2 text-sm whitespace-nowrap 
        ${activeTab === tab 
          ? 'text-red-600 font-medium after:content-[""] after:absolute after:bottom-0 after:right-0 after:w-full after:w-10 after:h-0.5 after:bg-blue-600' 
          : 'text-gray-600 hover:text-gray-800'
        }`}
      onClick={() => handleTabChange(tab)}
    >
      {tab}
    </button>
  ))}
</div>


      </div>
      
      {/* Header Image Section */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Header Image (2230px X 300px) <span className="text-red-500">*</span>
        </label>
        
        <div
          className="border border-gray-300 rounded-lg overflow-hidden"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {headerImage ? (
            <div className="relative">
              <img 
                src={headerImage} 
                alt="Header" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white bg-black bg-opacity-50 px-2 py-1 rounded text-sm">
                  header_image.jpg
                </span>
              </div>
              <div className="relative flex justify-end p-2">
                <button 
                  onClick={handleRemoveImage}
                  className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm font-medium"
                >
                  REMOVE
                </button>
              </div>
              <div className="absolute bottom-4 right-4 text-white bg-black bg-opacity-50 px-2 py-1 rounded text-xs">
                Drag and drop or click to replace
              </div>
            </div>
          ) : (
            <div className="p-4 bg-gray-50">
              <div className="flex flex-col sm:flex-row justify-between">
                <div className="flex flex-col mb-4 sm:mb-0">
                  <div className="bg-green-600 text-white px-3 py-1 rounded mb-2 inline-block">
                    SMART SCHOOL
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800">Your School Name Here</h2>
                </div>
                <div className="text-right text-sm">
                  <p className="text-gray-700"><strong>Address:</strong> 25 Kings Street, CA</p>
                  <p className="text-gray-700"><strong>Phone No.:</strong> 8956242934</p>
                  <p className="text-gray-700"><strong>Email:</strong> yourschool@gmail.com</p>
                  <p className="text-gray-700"><strong>Website:</strong> www.yoursite.in</p>
                </div>
              </div>
              
              <div className="mt-8 text-center text-gray-400">
                <p>Drag and drop or click to replace</p>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                  className="hidden" 
                  id="header-image-upload" 
                />
                <label 
                  htmlFor="header-image-upload"
                  className="cursor-pointer inline-block mt-2 underline"
                >
                  header_image.jpg
                </label>
              </div>
            </div>
          )}

          <div className="bg-black text-white text-center py-2 font-medium">
            {activeTab}
          </div>
        </div>
      </div>
      
      {/* Footer Content Section - Matching the image exactly */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Footer Content
        </label>
        
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          {/* Rich Text Editor Toolbar - Exactly matching the image */}
          <div className="p-2 flex flex-wrap items-center gap-1">
            {/* Format Dropdown */}
            <div className="relative bg-gray-100 rounded border border-gray-300">
              <button className="px-2 py-1 text-sm flex items-center gap-1 min-w-[120px]">
                <span className="text-2xl font-serif mr-1">A</span>
                <span>Normal text</span>
                <span className="ml-auto">▼</span>
              </button>
            </div>
            
            {/* Bold Button */}
            <button 
              onClick={() => toggleFormatting('bold')}
              className={`px-3 py-1 border border-gray-300 rounded bg-gray-100 text-sm font-bold ${formatting.bold ? 'bg-gray-200' : ''}`}
            >
              Bold
            </button>
            
            {/* Italic Button */}
            <button 
              onClick={() => toggleFormatting('italic')}
              className={`px-3 py-1 border border-gray-300 rounded bg-gray-100 text-sm italic ${formatting.italic ? 'bg-gray-200' : ''}`}
            >
              Italic
            </button>
            
            {/* Underline Button */}
            <button 
              onClick={() => toggleFormatting('underline')}
              className={`px-3 py-1 border border-gray-300 rounded bg-gray-100 text-sm underline ${formatting.underline ? 'bg-gray-200' : ''}`}
            >
              Underline
            </button>
            
            {/* Small Button */}
            <button 
              onClick={() => toggleFormatting('small')}
              className={`px-3 py-1 border border-gray-300 rounded bg-gray-100 text-sm ${formatting.small ? 'bg-gray-200' : ''}`}
            >
              Small
            </button>
            
            {/* Quote Button */}
            <button 
              onClick={() => toggleFormatting('quote')}
              className={`px-3 py-1 border border-gray-300 rounded bg-gray-100 text-xl ${formatting.quote ? 'bg-gray-200' : ''}`}
            >
              <span className="font-serif">"</span>
            </button>
            
            {/* Bullet List Button */}
            <button 
              onClick={() => toggleFormatting('bulletList')}
              className={`px-3 py-1 border border-gray-300 rounded bg-gray-100 ${formatting.bulletList ? 'bg-gray-200' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H2zM3 3H2v1h1V3z"/>
                <path d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9z"/>
              </svg>
            </button>
            
            {/* Numbered List Button */}
            <button 
              onClick={() => toggleFormatting('numberedList')}
              className={`px-3 py-1 border border-gray-300 rounded bg-gray-100 ${formatting.numberedList ? 'bg-gray-200' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z"/>
                <path d="M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338v.041zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635V5z"/>
              </svg>
            </button>
            
            {/* Left Align Button */}
            <button 
              onClick={() => setAlignment('left')}
              className={`px-3 py-1 border border-gray-300 rounded bg-gray-100 ${alignment === 'left' ? 'bg-gray-200' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
              </svg>
            </button>
            
            {/* Right Align Button */}
            <button 
              onClick={() => setAlignment('right')}
              className={`px-3 py-1 border border-gray-300 rounded bg-gray-100 ${alignment === 'right' ? 'bg-gray-200' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3-3a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3-3a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3-3a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z"/>
              </svg>
            </button>
            
            {/* Copy Button */}
            <button 
              onClick={handleCopy}
              className="px-3 py-1 border border-gray-300 rounded bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
              </svg>
            </button>
            
            {/* Insert Image Button */}
            <button 
              onClick={handleInsertImage}
              className="px-3 py-1 border border-gray-300 rounded bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
              </svg>
              <input
                type="file"
                accept="image/*"
                id="footer-image-upload"
                className="hidden"
              />
            </button>
          </div>
          
          {/* Footer text editor - Matching the image exactly */}
          <textarea 
            value={footerContent} 
            onChange={(e) => setFooterContent(e.target.value)} 
            className={`w-full p-4 min-h-[200px] focus:outline-none resize-none border-t border-gray-300
              ${alignment === 'left' ? 'text-left' : alignment === 'center' ? 'text-center' : 'text-right'}
              ${formatting.bold ? 'font-bold' : ''}
              ${formatting.italic ? 'italic' : ''}
              ${formatting.underline ? 'underline' : ''}
              ${formatting.small ? 'text-sm' : ''}
              ${formatting.quote ? 'pl-4 border-l-4 border-gray-300' : ''}
            `}
          />
        </div>
      </div>

      {/* Save Button - Exactly matching the image */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleSave}
          className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default PrintHeaderFooter;