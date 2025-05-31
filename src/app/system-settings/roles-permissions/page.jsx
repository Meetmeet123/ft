"use client";   
import React, { useState } from 'react';
import { Search, Edit, Trash, ChevronLeft, ChevronRight, Upload, Download, FileText, Image, Printer, Grid } from 'lucide-react';

export default function RoleManagement() {
  const [roleName, setRoleName] = useState('');
  const [roles, setRoles] = useState([
    { id: 1, name: 'Teacher', type: 'System' },
    { id: 2, name: 'Super Admin', type: 'System' },
    { id: 3, name: 'Receptionist', type: 'System' },
    { id: 4, name: 'Librarian', type: 'System' },
    { id: 5, name: 'Admin', type: 'System' },
    { id: 6, name: 'Accountant', type: 'System' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rolesPerPage = 6;

  // Filter roles based on search term
  const filteredRoles = roles.filter(role => 
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastRole = currentPage * rolesPerPage;
  const indexOfFirstRole = indexOfLastRole - rolesPerPage;
  const currentRoles = filteredRoles.slice(indexOfFirstRole, indexOfLastRole);
  const totalPages = Math.ceil(filteredRoles.length / rolesPerPage);

  const handleSave = () => {
    if (roleName.trim()) {
      const newRole = {
        id: roles.length + 1,
        name: roleName,
        type: 'Custom'
      };
      setRoles([...roles, newRole]);
      setRoleName('');
    }
  };

  const handleDelete = (id) => {
    setRoles(roles.filter(role => role.id !== id));
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Panel - Add Role */}
        <div className="bg-white h-70 p-6 rounded-lg shadow">
          <h2 className="text-xl font-medium text-gray-800 mb-6">Role</h2>
          <div className="mb-4">
            <label htmlFor="roleName" className="block text-gray-700 mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="roleName"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
            />
          </div>
          
          <div className="flex justify-end mt-6">
            <button 
              onClick={handleSave}
              className="btn btn-primary mt-5 bg-blue-500 text-white p-1 px-2 rounded flex justify-end focus:ring-0 focus:outline-none"
            >
              Save
            </button>
          </div>
        </div>
        
        {/* Right Panel - Role List */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-medium text-gray-800 mb-6">Role List</h2>
          
          {/* Search and Export Tools */}
          <div className="mb-4 flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative flex-grow max-w-md">
              <input
                type="text"
                placeholder="Search..."
                className="w-full p-2 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
            
            <div className="flex gap-1">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded" title="Export to Excel">
                <Download size={18} />
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded" title="Export to PDF">
                <FileText size={18} />
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded" title="Export to Image">
                <Image size={18} />
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded" title="Print">
                <Printer size={18} />
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded" title="View as Grid">
                <Grid size={18} />
              </button>
            </div>
          </div>
          
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-gray-900">
                    Role <span>▼</span>
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-gray-900">
                    Type <span>▼</span>
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentRoles.map((role) => (
                  <tr key={role.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-700">{role.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{role.type}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex space-x-2">
                        <button className="text-gray-600 hover:text-blue-600">
                          <Trash size={18} onClick={() => handleDelete(role.id)} />
                        </button>
                        <button className="text-gray-600 hover:text-blue-600">
                          <Edit size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
            <div>
              Records: {indexOfFirstRole + 1} to {Math.min(indexOfLastRole, filteredRoles.length)} of {filteredRoles.length}
            </div>
            <div className="flex space-x-1">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`p-1 rounded ${currentPage === 1 ? 'text-gray-400' : 'hover:bg-gray-100'}`}
              >
                <ChevronLeft size={18} />
              </button>
              <span className="px-2 py-1 bg-gray-100 rounded">{currentPage}</span>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`p-1 rounded ${currentPage === totalPages ? 'text-gray-400' : 'hover:bg-gray-100'}`}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}