"use client";
import React, { useState } from 'react';

export default function StaffIdCardManagement() {
  // Dummy data
  const initialIdCards = [
    {
      id: 1,
      title: "Sample Staff ID Card Horizontal",
      designType: "horizontal",
      schoolName: "Mount Carmel School",
      schoolAddress: "110 Kings Street, CA",
      fields: {
        staffName: true,
        staffId: true,
        fatherName: true,
        motherName: true,
        dateOfJoining: true,
        address: true,
        phone: true,
        dob: true
      },
      sampleData: {
        staffName: "Mohan Patil",
        staffId: "9000",
        fatherName: "Sohan Patil",
        motherName: "Kiriti Patil",
        dateOfJoining: "01-01-2020",
        address: "D.No.1 Street Name Address Line 2\nAddress Line 3",
        phone: "9845624781",
        dob: "01-01-1980"
      }
    }
  ];

  // State
  const [idCards, setIdCards] = useState(initialIdCards);
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    designType: 'horizontal',
    schoolName: '',
    schoolAddress: '',
    fields: {
      staffName: true,
      staffId: true,
      fatherName: true,
      motherName: true,
      dateOfJoining: true,
      address: true,
      phone: true,
      dob: true
    },
    sampleData: {
      staffName: '',
      staffId: '',
      fatherName: '',
      motherName: '',
      dateOfJoining: '',
      address: '',
      phone: '',
      dob: ''
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
      schoolName: '',
      schoolAddress: '',
      fields: {
        staffName: true,
        staffId: true,
        fatherName: true,
        motherName: true,
        dateOfJoining: true,
        address: true,
        phone: true,
        dob: true
      },
      sampleData: {
        staffName: '',
        staffId: '',
        fatherName: '',
        motherName: '',
        dateOfJoining: '',
        address: '',
        phone: '',
        dob: ''
      }
    });
    setViewIdCard(null);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {viewIdCard ? (
        <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">View ID Card</h2>
            <button
              onClick={() => setViewIdCard(null)}
              className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Back to List
            </button>
          </div>
          
          {/* ID Card Preview - Exact design from screenshot */}

          
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
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Form Section */}
          <div className="lg:w-1/2 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              {formData.id ? 'Edit ID Card' : 'Add Staff ID Card'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  School Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="schoolAddress"
                  className="w-full p-2 border rounded-lg"
                  value={formData.schoolAddress}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-3">Fields to Include</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="staffName"
                      name="fields.staffName"
                      className="mr-2"
                      checked={formData.fields.staffName}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="staffName" className="text-sm text-gray-700">Staff Name</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="staffId"
                      name="fields.staffId"
                      className="mr-2"
                      checked={formData.fields.staffId}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="staffId" className="text-sm text-gray-700">Staff ID</label>
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
                      id="dateOfJoining"
                      name="fields.dateOfJoining"
                      className="mr-2"
                      checked={formData.fields.dateOfJoining}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="dateOfJoining" className="text-sm text-gray-700">Date of Joining</label>
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
                    <label htmlFor="address" className="text-sm text-gray-700">Address</label>
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
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-3">Sample Data</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Staff Name</label>
                    <input
                      type="text"
                      name="sampleData.staffName"
                      className="w-full p-2 border rounded-lg"
                      value={formData.sampleData.staffName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Staff ID</label>
                    <input
                      type="text"
                      name="sampleData.staffId"
                      className="w-full p-2 border rounded-lg"
                      value={formData.sampleData.staffId}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Father Name</label>
                    <input
                      type="text"
                      name="sampleData.fatherName"
                      className="w-full p-2 border rounded-lg"
                      value={formData.sampleData.fatherName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mother Name</label>
                    <input
                      type="text"
                      name="sampleData.motherName"
                      className="w-full p-2 border rounded-lg"
                      value={formData.sampleData.motherName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Joining</label>
                    <input
                      type="text"
                      name="sampleData.dateOfJoining"
                      className="w-full p-2 border rounded-lg"
                      value={formData.sampleData.dateOfJoining}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <textarea
                      name="sampleData.address"
                      className="w-full p-2 border rounded-lg"
                      rows="3"
                      value={formData.sampleData.address}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="text"
                      name="sampleData.phone"
                      className="w-full p-2 border rounded-lg"
                      value={formData.sampleData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    <input
                      type="text"
                      name="sampleData.dob"
                      className="w-full p-2 border rounded-lg"
                      value={formData.sampleData.dob}
                      onChange={handleInputChange}
                    />
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
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {formData.id ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>

          {/* Table Section */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Staff ID Card List</h2>
              
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
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Design Type</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredIdCards.map((idCard) => (
                        <tr key={idCard.id}>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{idCard.title}</td>
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