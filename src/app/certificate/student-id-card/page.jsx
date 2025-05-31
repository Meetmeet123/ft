"use client";
import React, { useState } from 'react';

export default function StudentIdCardManagement() {
  // Dummy data
  const initialIdCards = [
    {
      id: 1,
      title: "Sample Student Identity Card",
      designType: "horizontal",
      headerColor: "#3498db",
      schoolName: "Mount Carmel School",
      schoolContact: "110 Kings Street, CA\nPhone: 456542\nEmail: mouinfo@mail.com",
      backgroundImage: "/id-bg-1.jpg",
      logo: "/school-logo.png",
      signature: "/principal-signature.png",
      fields: {
        admissionNo: true,
        studentName: true,
        class: true,
        fatherName: true,
        motherName: true,
        address: true,
        phone: true,
        dob: true,
        bloodGroup: true
      },
      sampleData: {
        name: "Shrikrishna Sylveshchengya",
        admissionNo: "STU2023001",
        class: "10th Grade",
        dob: "15-05-2008",
        fatherName: "Mr. Sylveshchengya",
        phone: "(02475)251927",
        bloodGroup: "A+",
        address: "D.No., Strain, Name, Address Line\n2 Address Line"
      }
    },
    {
      id: 2,
      title: "Sample Student Identity Card Vertical",
      designType: "vertical",
      headerColor: "#e74c3c",
      schoolName: "Mount Carmel School",
      schoolContact: "110 Kings Street, CA\nPhone: 456542\nEmail: mouinfo@mail.com",
      backgroundImage: "/id-bg-2.jpg",
      logo: "/school-logo.png",
      signature: "/principal-signature.png",
      fields: {
        admissionNo: true,
        studentName: true,
        class: true,
        fatherName: true,
        motherName: false,
        address: true,
        phone: true,
        dob: true,
        bloodGroup: true
      },
      sampleData: {
        name: "Shrikrishna Sylveshchengya",
        admissionNo: "STU2023001",
        class: "10th Grade",
        dob: "15-05-2008",
        fatherName: "Mr. Sylveshchengya",
        phone: "(02475)251927",
        bloodGroup: "A+",
        address: "D.No., Strain, Name, Address Line\n2 Address Line"
      }
    }
  ];

  // State
  const [idCards, setIdCards] = useState(initialIdCards);
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    designType: 'horizontal',
    headerColor: '#3498db',
    schoolName: '',
    schoolContact: '',
    backgroundImage: '',
    logo: '',
    signature: '',
    fields: {
      admissionNo: true,
      studentName: true,
      class: true,
      fatherName: true,
      motherName: true,
      address: true,
      phone: true,
      dob: true,
      bloodGroup: true
    },
    sampleData: {
      name: '',
      admissionNo: '',
      class: '',
      dob: '',
      fatherName: '',
      phone: '',
      bloodGroup: '',
      address: ''
    }
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [viewIdCard, setViewIdCard] = useState(null);

  // Filter ID cards based on search
  const filteredIdCards = idCards.filter(idCard =>
    idCard.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('fields.')) {
      const fieldName = name.split('.')[1];
      setFormData({
        ...formData,
        fields: {
          ...formData.fields,
          [fieldName]: type === 'checkbox' ? checked : value
        }
      });
    } else if (name.startsWith('sampleData.')) {
      const fieldName = name.split('.')[1];
      setFormData({
        ...formData,
        sampleData: {
          ...formData.sampleData,
          [fieldName]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  // Handle file upload
  const handleFileUpload = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          [fieldName]: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.id) {
      // Update existing ID card
      setIdCards(idCards.map(idCard =>
        idCard.id === formData.id ? formData : idCard
      ));
    } else {
      // Add new ID card
      const newIdCard = {
        ...formData,
        id: idCards.length + 1
      };
      setIdCards([...idCards, newIdCard]);
    }
    resetForm();
  };

  // Edit ID card
  const handleEdit = (idCard) => {
    setFormData(idCard);
    setViewIdCard(null);
  };

  // View ID card
  const handleView = (idCard) => {
    setViewIdCard(idCard);
  };

  // Delete ID card
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this ID card?')) {
      setIdCards(idCards.filter(idCard => idCard.id !== id));
      if (formData.id === id) {
        resetForm();
      }
      if (viewIdCard?.id === id) {
        setViewIdCard(null);
      }
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      id: null,
      title: '',
      designType: 'horizontal',
      headerColor: '#3498db',
      schoolName: '',
      schoolContact: '',
      backgroundImage: '',
      logo: '',
      signature: '',
      fields: {
        admissionNo: true,
        studentName: true,
        class: true,
        fatherName: true,
        motherName: true,
        address: true,
        phone: true,
        dob: true,
        bloodGroup: true
      },
      sampleData: {
        name: '',
        admissionNo: '',
        class: '',
        dob: '',
        fatherName: '',
        phone: '',
        bloodGroup: '',
        address: ''
      }
    });
    setViewIdCard(null);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* <h1 className="text-2xl font-bold mb-6">Student ID Card Management</h1> */}

      {viewIdCard ? (
        <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">ID Card Preview</h2>
            <button
              onClick={() => setViewIdCard(null)}
              className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Back to List
            </button>
          </div>
          
          {/* ID Card Preview */}
          <div 
            className={`relative border-2 border-gray-300 rounded-lg overflow-hidden ${viewIdCard.designType === 'vertical' ? 'w-80 h-[500px]' : 'w-[600px] h-[350px]'}`}
            style={{ backgroundColor: '#f8f9fa' }}
          >
            {/* Background Image */}
            {viewIdCard.backgroundImage && (
              <img 
                src={viewIdCard.backgroundImage} 
                alt="ID Card Background" 
                className="absolute inset-0 w-full h-full object-cover opacity-20"
              />
            )}
            
            {/* Header */}
            <div 
              className="h-16 flex items-center justify-center relative"
              style={{ backgroundColor: viewIdCard.headerColor }}
            >
              <h3 className="text-xl font-bold text-black">{viewIdCard.schoolName}</h3>
              {viewIdCard.logo && (
                <img 
                  src={viewIdCard.logo} 
                  alt="School Logo" 
                  className="absolute left-4 h-12 w-12 object-contain"
                />
              )}
            </div>
            
            {/* Content */}
            <div className="border-2 border-gray-300 rounded-lg p-6 bg-white">
            
            <div className="text-center mb-4">
            <div className="flex justify-center mt-6">
              <div className="w-24 h-32 border-2 border-dashed border-gray-400 flex  " style={{position:"absolute",top:"370px",left:'350px'}}>
                <span className="text-gray-500">Staff Photo</span>
              </div>
            </div>
              <h1 className="text-xl font-bold" style={{backgroundColor:'brown',color:'white'}}>{viewIdCard.schoolName}</h1>
              <p className="text-sm">{viewIdCard.schoolAddress}</p>
            </div>
            
            <div className="text-center mb-6">
              <h2 className="text-lg font-semibold" style={{backgroundColor:'brown',color:'white'}}>SAMPLE STAFF ID CARD HORIZONTAL</h2>
            </div>
            
            <div className="space-y-3" style={{position:'relative',left:'180px'}}>
              <div className="flex">
                <span className="w-1/3 font-semibold">Staff Name</span>
                <span className="w-2/3">{viewIdCard.sampleData.staffName}</span>
              </div>
              <div className="flex">
                <span className="w-1/3 font-semibold">Staff ID</span>
                <span className="w-2/3">{viewIdCard.sampleData.staffId}</span>
              </div>
              <div className="flex">
                <span className="w-1/3 font-semibold">Father Name</span>
                <span className="w-2/3">{viewIdCard.sampleData.fatherName}</span>
              </div>
              <div className="flex">
                <span className="w-1/3 font-semibold">Mother Name</span>
                <span className="w-2/3">{viewIdCard.sampleData.motherName}</span>
              </div>
              <div className="flex">
                <span className="w-1/3 font-semibold">Date Of Joining</span>
                <span className="w-2/3">{viewIdCard.sampleData.dateOfJoining}</span>
              </div>
              <div className="flex">
                <span className="w-1/3 font-semibold">Address</span>
                <span className="w-2/3 whitespace-pre-line">{viewIdCard.sampleData.address}</span>
              </div>
              <div className="flex">
                <span className="w-1/3 font-semibold">Phone</span>
                <span className="w-2/3">{viewIdCard.sampleData.phone}</span>
              </div>
              <div className="flex">
                <span className="w-1/3 font-semibold">Date of Birth</span>
                <span className="w-2/3">{viewIdCard.sampleData.dob}</span>
              </div>
            </div>
            
            {/* Photo Placeholder */}
            
          </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Form Section - Always visible on desktop */}
          <div className="lg:w-1/2 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              {formData.id ? 'Edit ID Card' : 'Add Student ID Card'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
            <div className="border-t pt-4">
                {/* <h3 className="text-lg font-medium mb-3">Images</h3> */}
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Background Image</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <p className="text-gray-500 mb-2">Drag and drop a file here or click</p>
                      <input
                        type="file"
                        className="hidden"
                        id="backgroundImage"
                        onChange={(e) => handleFileUpload(e, 'backgroundImage')}
                      />
                      <label
                        htmlFor="backgroundImage"
                        className="inline-block px-4 py-2 bg-blue-600 text-black rounded-lg hover:bg-blue-700 cursor-pointer"
                      >
                        Select Image
                      </label>
                      {formData.backgroundImage && (
                        <div className="mt-2">
                          <img 
                            src={formData.backgroundImage} 
                            alt="Background Preview" 
                            className="h-16 mx-auto object-contain"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <p className="text-gray-500 mb-2">Drag and drop a file here or click</p>
                      <input
                        type="file"
                        className="hidden"
                        id="logo"
                        onChange={(e) => handleFileUpload(e, 'logo')}
                      />
                      <label
                        htmlFor="logo"
                        className="inline-block px-4 py-2 bg-blue-600 text-black rounded-lg hover:bg-blue-700 cursor-pointer"
                      >
                        Select Image
                      </label>
                      {formData.logo && (
                        <div className="mt-2">
                          <img 
                            src={formData.logo} 
                            alt="Logo Preview" 
                            className="h-16 mx-auto object-contain"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Signature</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <p className="text-gray-500 mb-2">Drag and drop a file here or click</p>
                      <input
                        type="file"
                        className="hidden"
                        id="signature"
                        onChange={(e) => handleFileUpload(e, 'signature')}
                      />
                      <label
                        htmlFor="signature"
                        className="inline-block px-4 py-2 bg-blue-600 text-black rounded-lg hover:bg-blue-700 cursor-pointer"
                      >
                        Select Image
                      </label>
                      {formData.signature && (
                        <div className="mt-2">
                          <img 
                            src={formData.signature} 
                            alt="Signature Preview" 
                            className="h-16 mx-auto object-contain"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ID Card Title <span className="text-red-500">*</span>
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

              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="designType"
                  name="designType"
                  className="mr-2"
                  checked={formData.designType === 'vertical'}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      designType: e.target.checked ? 'vertical' : 'horizontal'
                    });
                  }}
                />
                <label htmlFor="designType" className="text-sm font-medium text-gray-700">
                  Vertical Design
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Header Color
                </label>
                <div className="flex items-center">
                  <input
                    type="color"
                    name="headerColor"
                    className="w-10 h-10 mr-2"
                    value={formData.headerColor}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="headerColor"
                    className="flex-1 p-2 border rounded-lg"
                    value={formData.headerColor}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  School Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="schoolName"
                  className="w-full p-2 border rounded-lg"
                  value={formData.schoolName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address / Phone / Email <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="schoolContact"
                  className="w-full p-2 border rounded-lg"
                  rows="3"
                  value={formData.schoolContact}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter each contact detail on a new line"
                ></textarea>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-3">Fields to Include</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="admissionNo"
                      name="fields.admissionNo"
                      className="mr-2"
                      checked={formData.fields.admissionNo}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="admissionNo" className="text-sm text-gray-700">Admission No</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="studentName"
                      name="fields.studentName"
                      className="mr-2"
                      checked={formData.fields.studentName}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="studentName" className="text-sm text-gray-700">Student Name</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="class"
                      name="fields.class"
                      className="mr-2"
                      checked={formData.fields.class}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="class" className="text-sm text-gray-700">Class</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="fatherName"
                      name="fields.fatherName"
                      className="mr-2"
                      checked={formData.fields.fatherName}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="fatherName" className="text-sm text-gray-700">Father Name</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="motherName"
                      name="fields.motherName"
                      className="mr-2"
                      checked={formData.fields.motherName}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="motherName" className="text-sm text-gray-700">Mother Name</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="address"
                      name="fields.address"
                      className="mr-2"
                      checked={formData.fields.address}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="address" className="text-sm text-gray-700">Student Address</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="phone"
                      name="fields.phone"
                      className="mr-2"
                      checked={formData.fields.phone}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="phone" className="text-sm text-gray-700">Phone</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="dob"
                      name="fields.dob"
                      className="mr-2"
                      checked={formData.fields.dob}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="dob" className="text-sm text-gray-700">Date of Birth</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="bloodGroup"
                      name="fields.bloodGroup"
                      className="mr-2"
                      checked={formData.fields.bloodGroup}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="bloodGroup" className="text-sm text-gray-700">Blood Group</label>
                  </div>
                </div>
              </div>

              

             

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-black rounded-lg hover:bg-blue-700"
                >
                  {formData.id ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>

          {/* Table Section */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Student ID Card List</h2>
              
              <div className="relative mb-4">
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

              {filteredIdCards.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Card Title</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Background Image</th>

                        
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Design Type</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredIdCards.map((idCard) => (
                        <tr key={idCard.id}>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{idCard.title}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                            {idCard.backgroundImage && (
                              <div className="h-10 w-16 bg-gray-200 rounded overflow-hidden">
                                <img 
                                  src={idCard.backgroundImage} 
                                  alt="ID Card BG" 
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            )}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                            {idCard.designType}
                          </td>
                          
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button
                              onClick={() => handleView(idCard)}
                              className="text-green-600 hover:text-green-900 mr-3"
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleEdit(idCard)}
                              className="text-blue-600 hover:text-blue-900 mr-3"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(idCard.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="px-4 py-3 bg-gray-50 text-right text-sm text-gray-500">
                    Records: 1 to {filteredIdCards.length} of {filteredIdCards.length}
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                  <p className="text-gray-500 mb-2">No ID cards found</p>
                  <p className="text-gray-400 text-sm">
                    {searchTerm ? 'Try a different search' : 'Add a new ID card to get started'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}