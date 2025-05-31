"use client";
import React, { useState } from 'react';
import { FiEdit2, FiX } from 'react-icons/fi';

const AlumniManagement = () => {
  // Sample data
  const passOutSessions = Array.from({length: 15}, (_, i) => `${2010 + i}-${11 + i}`);
  const classes = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'];
  const sections = ['A', 'B', 'C', 'D'];

  const [alumniData, setAlumniData] = useState([
    {
      admissionNo: '7663',
      studentName: 'Paul S. Bealer',
      class: 'Class 1(A)',
      dob: '08/13/2005',
      gender: 'Male',
      phone: '890879789',
      email: 'paul22@gmail.com',
      address: 'Mr Road 40, Delhi',
      occupation: '',
      nationalId: '79F5678965',
      passOutSession: '2020-21'
    },
    {
      admissionNo: '5242512',
      studentName: 'Rohit Soni',
      class: 'Class 1(A)',
      dob: '02/03/2000',
      gender: 'Male',
      phone: '9876543210',
      email: 'rohit.soni@example.com',
      address: '123 Main St, Mumbai',
      occupation: 'Software Engineer',
      nationalId: '',
      passOutSession: '2020-21'
    },
    {
      admissionNo: '90977',
      studentName: 'Silvana Martin',
      class: 'Class 1(A)',
      dob: '06/17/2009',
      gender: 'Female',
      phone: '8765432109',
      email: 'silvana.martin@example.com',
      address: '456 Oak Ave, Bangalore',
      occupation: 'Doctor',
      nationalId: '',
      passOutSession: '2020-21'
    }
  ]);

  // State management
  const [filters, setFilters] = useState({
    passOutSession: '',
    class: '',
    section: '',
    admissionNo: ''
  });
  const [searchResults, setSearchResults] = useState([]);
  const [viewMode, setViewMode] = useState('list');
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editFormData, setEditFormData] = useState({
    phone: '',
    email: '',
    occupation: '',
    address: '',
    nationalId: '',
    photo: null
  });
  const [editMode, setEditMode] = useState('table'); // 'table' or 'details'

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Search alumni by filters (pass out session, class, section)
  const handleFilterSearch = () => {
    let results = alumniData;
    
    if (filters.passOutSession) {
      results = results.filter(alumni => alumni.passOutSession === filters.passOutSession);
    }
    
    if (filters.class) {
      results = results.filter(alumni => alumni.class.startsWith(filters.class));
    }
    
    if (filters.section) {
      results = results.filter(alumni => alumni.class.includes(`(${filters.section})`));
    }
    
    setSearchResults(results);
    setViewMode('list');
    setSelectedAlumni(null);
  };

  // Search alumni by admission number
  const handleAdmissionSearch = () => {
    if (!filters.admissionNo) return;
    
    const results = alumniData.filter(alumni => alumni.admissionNo === filters.admissionNo);
    
    setSearchResults(results);
    setViewMode('details');
    setSelectedAlumni(results.length > 0 ? results[0] : null);
  };

  // Handle view mode change
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    setEditMode('details');
    setEditFormData({
      phone: mode.phone,
      email: mode.email,
      occupation: mode.occupation,
      address: mode.address,
      nationalId: mode.nationalId,
      photo: null
    });
    setShowEditForm(false);
  };

  // Show alumni details
  const showAlumniDetails = (alumni) => {
    setSelectedAlumni(alumni);
    setViewMode('details');
    setEditFormData({
      phone: alumni.phone,
      email: alumni.email,
      occupation: alumni.occupation,
      address: alumni.address,
      nationalId: alumni.nationalId,
      photo: null
    });
    setEditMode('details');
    setShowEditForm(false);
  };

  // Handle edit button click from table
  const handleTableEdit = (alumni) => {
    setSelectedAlumni(alumni);
    setEditFormData({
      phone: alumni.phone,
      email: alumni.email,
      occupation: alumni.occupation,
      address: alumni.address,
      nationalId: alumni.nationalId,
      photo: null
    });
    setEditMode('table');
    setShowEditForm(true);
  };

  // Handle edit form changes
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle photo upload
  const handlePhotoUpload = (e) => {
    setEditFormData(prev => ({
      ...prev,
      photo: e.target.files[0]
    }));
  };

  // Save edited details
  const saveAlumniDetails = () => {
    const updatedAlumni = {
      ...selectedAlumni,
      phone: editFormData.phone,
      email: editFormData.email,
      occupation: editFormData.occupation,
      address: editFormData.address,
      nationalId: editFormData.nationalId
    };

    // Update the alumni data
    const updatedData = alumniData.map(alumni => 
      alumni.admissionNo === updatedAlumni.admissionNo ? updatedAlumni : alumni
    );

    setAlumniData(updatedData);
    setSearchResults(updatedData.filter(alumni => 
      searchResults.some(result => result.admissionNo === alumni.admissionNo)
    ));
    setSelectedAlumni(updatedAlumni);
    setShowEditForm(false);
    
    // If editing from table view, stay in table view
    if (editMode === 'table') {
      setViewMode('list');
    }
  };

  // Delete alumni record
  const deleteAlumni = (admissionNo) => {
    if (confirm('Are you sure you want to delete this alumni record?')) {
      const updatedData = alumniData.filter(alumni => alumni.admissionNo !== admissionNo);
      setAlumniData(updatedData);
      setSearchResults(searchResults.filter(alumni => alumni.admissionNo !== admissionNo));
      if (selectedAlumni && selectedAlumni.admissionNo === admissionNo) {
        setSelectedAlumni(null);
        setViewMode('list');
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Manage Alumni Details</h1>
      
      {/* Search Criteria */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Select Criteria</h2>
        
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Pass Out Session</label>
            <select
              name="passOutSession"
              value={filters.passOutSession}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select Session</option>
              {passOutSessions.map((session, index) => (
                <option key={index} value={session}>{session}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
            <select
              name="class"
              value={filters.class}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select Class</option>
              {classes.map((cls, index) => (
                <option key={index} value={cls}>{cls}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
            <select
              name="section"
              value={filters.section}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select Section</option>
              {sections.map((sec, index) => (
                <option key={index} value={sec}>{sec}</option>
              ))}
            </select>
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={handleFilterSearch}
              disabled={!filters.passOutSession && !filters.class && !filters.section}
              className={`px-4 py-2 text-black rounded ${
                !filters.passOutSession && !filters.class && !filters.section ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              Search  
            </button>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Admission Number</label>
            <div className="flex">
              <input
                type="text"
                name="admissionNo"
                value={filters.admissionNo}
                onChange={handleFilterChange}
                className="flex-1 p-2 border border-gray-300 rounded-l"
                placeholder="Enter admission number"
              />
              <button
                onClick={handleAdmissionSearch}
                disabled={!filters.admissionNo}
                className={`px-4 py-2 text-black rounded-r ${
                  !filters.admissionNo ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* View Mode Toggle */}
      {searchResults.length > 0 && (
        <div className="flex space-x-2 mb-4">
          <button
            onClick={() => handleViewModeChange('list')}
            className={`px-4 py-2 rounded ${
              viewMode === 'list' ? 'bg-blue-600 text-black' : 'bg-gray-200 text-gray-800'
            }`}
          >
            List View
          </button>
          <button
            onClick={() => handleViewModeChange('details')}
            className={`px-4 py-2 rounded ${
              viewMode === 'details' ? 'bg-blue-600 text-black' : 'bg-gray-200 text-gray-800'
            }`}
          >
            Details View
          </button>
        </div>
      )}
      
      {/* Search Results */}
      {searchResults.length > 0 ? (
        viewMode === 'list' ? (
          <div className="bg-white rounded shadow overflow-hidden">
            {showEditForm && editMode === 'table' ? (
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Edit Alumni Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Phone *</label>
                    <input
                      type="text"
                      name="phone"
                      value={editFormData.phone}
                      onChange={handleEditFormChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Email</label>
                    <input
                      type="email"
                      name="email"
                      value={editFormData.email}
                      onChange={handleEditFormChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
                    <input
                      type="text"
                      name="occupation"
                      value={editFormData.occupation}
                      onChange={handleEditFormChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={editFormData.address}
                      onChange={handleEditFormChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">National ID</label>
                    <input
                      type="text"
                      name="nationalId"
                      value={editFormData.nationalId}
                      onChange={handleEditFormChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Photo</label>
                  <div className="border-2 border-dashed border-gray-300 rounded p-4 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label htmlFor="photo-upload" className="cursor-pointer">
                      <p>Drag and drop a file here or click</p>
                      <p className="text-sm text-gray-500">(Supports JPG, PNG up to 5MB)</p>
                    </label>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setShowEditForm(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveAlumniDetails}
                    className="px-4 py-2 bg-green-600 text-black rounded hover:bg-green-700"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admission No</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {searchResults.map((alumni) => (
                        <tr key={alumni.admissionNo} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{alumni.admissionNo}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{alumni.studentName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{alumni.class}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{alumni.gender}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{alumni.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{alumni.phone}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleTableEdit(alumni)}
                                className="text-blue-600 hover:text-blue-800"
                              >
                               <FiEdit2 size={16} />
                              </button>
                              <button
                                onClick={() => deleteAlumni(alumni.admissionNo)}
                                className="text-red-600 hover:text-red-800"
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
                <div className="px-6 py-3 text-sm text-gray-600">
                  Records: 1 to {searchResults.length} of {searchResults.length}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="bg-white rounded shadow overflow-hidden p-6">
            {selectedAlumni && (
              <>
                {showEditForm ? (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Update Alumni Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Phone *</label>
                        <input
                          type="text"
                          name="phone"
                          value={editFormData.phone}
                          onChange={handleEditFormChange}
                          className="w-full p-2 border border-gray-300 rounded"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Email</label>
                        <input
                          type="email"
                          name="email"
                          value={editFormData.email}
                          onChange={handleEditFormChange}
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
                        <input
                          type="text"
                          name="occupation"
                          value={editFormData.occupation}
                          onChange={handleEditFormChange}
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <input
                          type="text"
                          name="address"
                          value={editFormData.address}
                          onChange={handleEditFormChange}
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">National ID</label>
                        <input
                          type="text"
                          name="nationalId"
                          value={editFormData.nationalId}
                          onChange={handleEditFormChange}
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Phone *</label>
                    <input
                      type="text"
                      name="phone"
                      value={editFormData.phone}
                      onChange={handleEditFormChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Email</label>
                    <input
                      type="email"
                      name="email"
                      value={editFormData.email}
                      onChange={handleEditFormChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
                    <input
                      type="text"
                      name="occupation"
                      value={editFormData.occupation}
                      onChange={handleEditFormChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={editFormData.address}
                      onChange={handleEditFormChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">National ID</label>
                    <input
                      type="text"
                      name="nationalId"
                      value={editFormData.nationalId}
                      onChange={handleEditFormChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                </div>
                    
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => setShowEditForm(false)}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={saveAlumniDetails}
                        className="px-4 py-2 bg-green-600 text-black rounded hover:bg-green-700"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mb-6">
                      <h2 className="text-xl font-bold mb-2">{selectedAlumni.studentName}</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p><span className="font-semibold">Admission No:</span> {selectedAlumni.admissionNo}</p>
                          <p><span className="font-semibold">Date of Birth:</span> {selectedAlumni.dob}</p>
                          <p><span className="font-semibold">Gender:</span> {selectedAlumni.gender}</p>
                          <p><span className="font-semibold">National ID:</span> {selectedAlumni.nationalId}</p>
                        </div>
                        <div>
                          <p><span className="font-semibold">Current Email:</span> {selectedAlumni.email}</p>
                          <p><span className="font-semibold">Current Address:</span> {selectedAlumni.address}</p>
                          <p><span className="font-semibold">Occupation:</span> {selectedAlumni.occupation}</p>
                          <p><span className="font-semibold">Current Phone:</span> {selectedAlumni.phone}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setShowEditForm(true);
                          setEditMode('details');
                        }}
                        className="px-4 py-2 bg-blue-600 text-black rounded hover:bg-blue-700"
                      >
                        <FiEdit2 size={16} />
                      </button>
                      <button
                        onClick={() => deleteAlumni(selectedAlumni.admissionNo)}
                        className="px-4 py-2 bg-red-600 text-black rounded hover:bg-red-700"
                      >
                      <FiX size={16} />
                      </button>
                      
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        )
      ) : (
        <div className="bg-white rounded shadow p-6 text-center text-gray-500">
          {filters.passOutSession || filters.class || filters.section || filters.admissionNo 
            ? 'No alumni records found matching your criteria' 
            : 'Please select search criteria and click Search'}
        </div>
      )}
    </div>
  );
};

export default AlumniManagement;