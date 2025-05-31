"use client";
import React, { useState } from 'react';

export default function StaffIDCardSystem() {
  // Dummy staff data
  const dummyStaff = [
    {
      staffId: '0002',
      staffName: 'Shivanand Budale',
      role: 'Admin',
      designation: 'Principal',
      department: 'Teaching Staff',
      fatherName: 'Nagnathepa',
      motherName: 'Mother Name',
      dateOfJoining: '01-01-2007',
      phone: '9421872111',
      dob: '01-01-1988',
      address: '110 Kings Street, CA'
    },
    {
      staffId: '0003',
      staffName: 'John Smith',
      role: 'Teacher',
      designation: 'Senior Teacher',
      department: 'Mathematics',
      fatherName: 'Robert Smith',
      motherName: 'Mary Smith',
      dateOfJoining: '15-06-2015',
      phone: '9876543210',
      dob: '15-05-1980',
      address: '221 Baker Street, London'
    },
    {
      staffId: '0004',
      staffName: 'Jane Doe',
      role: 'Accountant',
      designation: 'Chief Accountant',
      department: 'Finance',
      fatherName: 'Michael Doe',
      motherName: 'Sarah Doe',
      dateOfJoining: '22-09-2018',
      phone: '8765432109',
      dob: '22-03-1985',
      address: '34 Park Avenue, New York'
    }
  ];

  // Role options
  const roles = ['Admin', 'Teacher', 'Accountant', 'Librarian', 'Super Admin', 'Doctor'];
  
  // ID Card Template options
  const idCardTemplates = [
    'Sample Staff ID Card Horizontal',
    'Sample Staff ID Card Vertical'
  ];

  // State variables
  const [staff, setStaff] = useState(dummyStaff);
  const [filteredStaff, setFilteredStaff] = useState(dummyStaff);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedIdCardTemplate, setSelectedIdCardTemplate] = useState(idCardTemplates[0]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedStaff, setSelectedStaff] = useState([]);
  const [showIdCards, setShowIdCards] = useState(false);
  const [columns, setColumns] = useState({
    staffId: true,
    staffName: true,
    role: true,
    designation: true,
    department: true,
    fatherName: true,
    motherName: true,
    dateOfJoining: true,
    phone: true,
    dob: true
  });

  // Filter staff based on role and search keyword
  const filterStaff = () => {
    let filtered = [...staff];

    if (selectedRole) {
      filtered = filtered.filter(staff => staff.role === selectedRole);
    }

    if (searchKeyword) {
      const keyword = searchKeyword.toLowerCase();
      filtered = filtered.filter(staff =>
        staff.staffName.toLowerCase().includes(keyword) ||
        staff.staffId.includes(keyword) ||
        staff.phone.includes(keyword)
      );
    }

    setFilteredStaff(filtered);
  };

  // Handle search button click
  const handleSearch = () => {
    filterStaff();
  };

  // Toggle staff selection
  const toggleStaffSelection = (staffId) => {
    setSelectedStaff(prev => {
      if (prev.includes(staffId)) {
        return prev.filter(id => id !== staffId);
      } else {
        return [...prev, staffId];
      }
    });
  };

  // Toggle select all staff
  const toggleSelectAll = () => {
    if (selectedStaff.length === filteredStaff.length) {
      setSelectedStaff([]);
    } else {
      setSelectedStaff(filteredStaff.map(staff => staff.staffId));
    }
  };

  // Generate ID cards
  const handleGenerateIdCards = () => {
    if (selectedStaff.length > 0) {
      setShowIdCards(true);
    }
  };

  // Close ID cards view
  const handleCloseIdCards = () => {
    setShowIdCards(false);
  };

  // Toggle column visibility
  const toggleColumn = (column) => {
    setColumns(prev => ({
      ...prev,
      [column]: !prev[column]
    }));
  };

  return (
    <div className="container mx-auto p-4">
      {!showIdCards ? (
        <>
          <h1 className="text-2xl font-bold mb-6">Select Criteria</h1>
          
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
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

                <label className="block text-sm font-medium text-gray-700">Role</label>
                <select
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  <option value="">Select Role</option>
                  {roles.map((role, index) => (
                    <option key={index} value={role}>{role}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex-1 min-w-[200px]">

                <label className="block text-sm font-medium text-gray-700">ID Card Template *</label>
                <select
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={selectedIdCardTemplate}
                  onChange={(e) => setSelectedIdCardTemplate(e.target.value)}
                >
                  {idCardTemplates.map((template, index) => (
                    <option key={index} value={template}>{template}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <button
                  className="bg-blue-500 text-black px-4 py-2 rounded-md hover:bg-blue-600 w-full"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          
           
          
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Staff List</h2>
            
            <div className="mb-4">
              <input
                type="text"
                className="p-2 border border-gray-300 rounded-md w-full md:w-1/3"
                placeholder="Search..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 border">
                      <input
                        type="checkbox"
                        checked={selectedStaff.length === filteredStaff.length && filteredStaff.length > 0}
                        onChange={toggleSelectAll}
                        className="h-4 w-4 text-blue-600 rounded"
                      />
                    </th>
                    {columns.staffId && <th className="py-2 px-4 border">Staff Id</th>}
                    {columns.staffName && <th className="py-2 px-4 border">Staff Name</th>}
                    {columns.role && <th className="py-2 px-4 border">Role</th>}
                    {columns.designation && <th className="py-2 px-4 border">Designation</th>}
                    {columns.department && <th className="py-2 px-4 border">Department</th>}
                    {columns.fatherName && <th className="py-2 px-4 border">Father Name</th>}
                    {columns.motherName && <th className="py-2 px-4 border">Mother Name</th>}
                    {columns.dateOfJoining && <th className="py-2 px-4 border">Date Of Joining</th>}
                    {columns.phone && <th className="py-2 px-4 border">Phone</th>}
                    {columns.dob && <th className="py-2 px-4 border">Date of Birth</th>}
                  </tr>
                </thead>
                <tbody>
                  {filteredStaff.length > 0 ? (
                    filteredStaff.map((staff, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="py-2 px-4 border">
                          <input
                            type="checkbox"
                            checked={selectedStaff.includes(staff.staffId)}
                            onChange={() => toggleStaffSelection(staff.staffId)}
                            className="h-4 w-4 text-blue-600 rounded"
                          />
                        </td>
                        {columns.staffId && <td className="py-2 px-4 border">{staff.staffId}</td>}
                        {columns.staffName && <td className="py-2 px-4 border">{staff.staffName}</td>}
                        {columns.role && <td className="py-2 px-4 border">{staff.role}</td>}
                        {columns.designation && <td className="py-2 px-4 border">{staff.designation}</td>}
                        {columns.department && <td className="py-2 px-4 border">{staff.department}</td>}
                        {columns.fatherName && <td className="py-2 px-4 border">{staff.fatherName}</td>}
                        {columns.motherName && <td className="py-2 px-4 border">{staff.motherName}</td>}
                        {columns.dateOfJoining && <td className="py-2 px-4 border">{staff.dateOfJoining}</td>}
                        {columns.phone && <td className="py-2 px-4 border">{staff.phone}</td>}
                        {columns.dob && <td className="py-2 px-4 border">{staff.dob}</td>}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={Object.values(columns).filter(Boolean).length + 1} className="py-4 px-4 border text-center">
                        No staff found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 text-gray-600">
              Records: {filteredStaff.length > 0 ? 1 : 0} to {filteredStaff.length} of {filteredStaff.length}
            </div>
            
            <div className="mt-6">
              <button
                className={`px-4 py-2 rounded-md ${selectedStaff.length > 0 ? 'bg-green-500 hover:bg-green-600 text-black' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                onClick={handleGenerateIdCards}
                disabled={selectedStaff.length === 0}
              >
                Generate ID Cards ({selectedStaff.length})
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">{selectedIdCardTemplate}</h2>
            <button
              className="bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => window.print()}
            >
              Print
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{width:'400px' ,position:"relative",left:"100px"}}>
            {filteredStaff
              .filter(staff => selectedStaff.includes(staff.staffId))
              .map((staff, index) => (
                <div key={index} className="border-2 border-gray-300 p-6 rounded-lg">
             <div className="flex justify-center mt-6">
                    <div className="w-24 h-32 border-2 border-dashed border-gray-400 flex items-center justify-center" style={{position:"absolute",top:"200px",left:'30px'}}>
                      <span className="text-gray-500">Staff Photo</span>
                    </div>
                  </div>
                  <div className="text-center mb-4">
                    <h1 className="text-xl font-bold">Mount Carmel School</h1>
                    <p className="text-sm">{staff.address}</p>
                  </div>
                  
                  <div className="text-center mb-6">
                    <h2 className="text-lg font-semibold">SAMPLE STAFF ID CARD</h2>
                    <p className="text-md">HORIZONTAL</p>
                  </div>
                  
                  <div className="space-y-3" style={{position:'relative',left:'120px'}}>
                    <div className="flex">
                      <span className="w-1/3 font-semibold">Staff Name</span>
                      <span className="w-2/3">{staff.staffName}</span>
                    </div>
                    <div className="flex">
                      <span className="w-1/3 font-semibold">Staff ID</span>
                      <span className="w-2/3">{staff.staffId}</span>
                    </div>
                    <div className="flex">
                      <span className="w-1/3 font-semibold">Father Name</span>
                      <span className="w-2/3">{staff.fatherName}</span>
                    </div>
                    <div className="flex">
                      <span className="w-1/3 font-semibold">Mother Name</span>
                      <span className="w-2/3">{staff.motherName}</span>
                    </div>
                    <div className="flex">
                      <span className="w-1/3 font-semibold">Date Of Joining</span>
                      <span className="w-2/3">{staff.dateOfJoining}</span>
                    </div>
                    <div className="flex">
                      <span className="w-1/3 font-semibold">Phone</span>
                      <span className="w-2/3">{staff.phone}</span>
                    </div>
                    <div className="flex">
                      <span className="w-1/3 font-semibold">Date of Birth</span>
                      <span className="w-2/3">{staff.dob}</span>
                    </div>
                  </div>
                  
                  {/* Photo Placeholder */}
                 
                </div>
              ))}
          </div>
          
          <div className="mt-6">
            <button
              className="bg-gray-500 text-black px-4 py-2 rounded hover:bg-gray-600"
              onClick={handleCloseIdCards}
            >
              Back to Staff List
            </button>
          </div>
        </div>
      )}
    </div>
  );
}