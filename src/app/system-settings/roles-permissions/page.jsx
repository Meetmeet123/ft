"use client";
import { useState, useEffect } from 'react';
import { Search, Edit, Trash, ChevronLeft, ChevronRight, Download, FileText, Printer, Grid, X, Check } from 'lucide-react';
import { getRolePermission, updateRolePermission, deleteRolePermission } from './RoleDetails';
import { ToastContainer, toast } from 'react-toastify';

export default function RoleManagement() {
  const [roleName, setRoleName] = useState('');
  const [roles, setRoles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const rolesPerPage = 6;
  const [isActive, setIsActive] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', is_active: false });

  const updateNotify = () => toast.success("Record Updated Successfully!");
  const deleteNotify = () => toast.error("Record Deleted Successfully!");

  // Filter roles based on search term
  const filteredRoles = Array.isArray(roles)
    ? roles.filter(role => role?.name?.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

  // Pagination calculation
  const indexOfLastRole = currentPage * rolesPerPage;
  const indexOfFirstRole = indexOfLastRole - rolesPerPage;
  const currentRoles = filteredRoles.slice(indexOfFirstRole, indexOfLastRole);
  const totalPages = Math.ceil(filteredRoles.length / rolesPerPage);

  const handleSave = () => {
    if (roleName.trim()) {
      const newRole = {
        id: roles.length ? Math.max(...roles.map(r => r.id)) + 1 : 1,
        name: roleName,
        type: 'Custom',
        is_active: isActive ? 1 : 0
      };
      setRoles([...roles, newRole]);
      setRoleName('');
      setIsActive(false);
    }
  };

  const handleDelete = async(id) => {
    setRoles(roles.filter(role => role.id !== id));
    try{
      const res = await deleteRolePermission(id);
      console.log(res)
      deleteNotify();
    }catch (error) {
      console.error('Error deleting role:', error);
      setError('Failed to delete role');
    }
  };

  const handleEdit = (role) => {
    setEditingRole(role.id);
    setEditFormData({
      name: role.name,
      is_active: role.is_active === 1
    });
  };

  const handleCancelEdit = () => {
    setEditingRole(null);
    setEditFormData({ name: '', is_active: false });
  };

  const handleSaveEdit = async () => {
    if (!editFormData.name.trim()) {
      alert('Role name is required');
      return;
    }

    try {
      const updatedData = {
        name: editFormData.name,
        is_active: editFormData.is_active ? 1 : 0
      };

      const res = await handleRoleChanges(editingRole, updatedData);
      setEditingRole(null);
      setEditFormData({ name: '', is_active: false });
      updateNotify()
    } catch (error) {
      console.error('Error saving edit:', error);
    }
  };

  const handleExcelExport = () => {
    if (!roles || roles.length === 0) {
      alert('No data to export');
      return;
    }
    const csvContent = roles.map(role => `${role.id},${role.name},${role.is_active === 1 ? 'Active' : 'Inactive'}`).join('\n');
    const blob = new Blob([`ID,Name,Status\n${csvContent}`], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Role_Permission.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    if (!roles || roles.length === 0) {
      alert('No data to copy');
      return;
    }
    const jsonText = JSON.stringify(roles, null, 2);
    navigator.clipboard.writeText(jsonText)
      .then(() => alert('JSON data copied to clipboard'))
      .catch(err => console.error('Failed to copy JSON: ', err));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRolePermission();
        setLoading(true);
        setError(null);
        console.log('Fetched roles:', data);
        setRoles(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        console.error('Error fetching roles:', err);
        setError('Failed to load roles');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePrint = () => {
    if (!roles || roles.length === 0) {
      alert('No data to print');
      return;
    }
    const headers = Object.keys(roles[0]);
    let table = '<table border="1" style="border-collapse: collapse; width: 100%"><thead><tr>';
    headers.forEach(header => {
      table += `<th style="padding: 8px; text-align: left;">${header}</th>`;
    });
    table += '</tr></thead><tbody>';
    roles.forEach(row => {
      table += '<tr>';
      headers.forEach(header => {
        table += `<td style="padding: 8px;">${row[header] ?? ''}</td>`;
      });
      table += '</tr>';
    });
    table += '</tbody></table>';

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head><title>Print Role Permission</title></head>
        <body>
          <h2>Role Permission</h2>
          ${table}
          <script>
            window.onload = function () {
              window.print();
              window.onafterprint = function () { window.close(); };
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleRoleChanges = async (roleId, updatedData) => {
    try {
      setError(null);
      
      // Call the API to update the role
      const response = await updateRolePermission(updatedData, roleId);
      
      // Check if the response indicates success
      // Common success patterns: response.success === true, response.status === 'success', or HTTP 2xx status
      const isSuccess = response && (
        response.success === true || 
        response.status === 'success' || 
        response.message === 'Role updated' ||
        (response.status >= 200 && response.status < 300) ||
        !response.error
      );

      if (isSuccess) {
        // Update the local state with the new data
        const updatedRoles = roles.map(role => 
          role.id === roleId ? { ...role, ...updatedData } : role
        );
        setRoles(updatedRoles);
        
        console.log('Role updated successfully');
      } else {
        // Handle API error response
        const errorMessage = response?.message || response?.error || 'Failed to update role';
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Error updating role:', error);
      setError('Failed to update role: ' + error.message);
      
      // Revert optimistic updates by refetching data
      try {
        const data = await getRolePermission();
        setRoles(Array.isArray(data.data) ? data.data : []);
      } catch (fetchError) {
        console.error('Error refetching data:', fetchError);
      }
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto p-4 max-w-6xl">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto p-4 max-w-6xl">
        <div className="flex justify-center items-center h-64">
          <div className="text-red-600">{error}</div>
        </div>
      </div>
    );
  }

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
            <div className='w-full flex gap-3 items-center my-6' >
              <label>Active</label>
              <input
              type='checkbox'
              checked={isActive}
              onChange={(e) => {
                setIsActive(e.target.checked);
              }}
              />
            </div>
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

          {roles.length > 0 ? (
            <>
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
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded" title="Export to Excel" onClick={handleExcelExport}>
                    <Download size={18} />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded" title="Copy JSON to Clipboard" onClick={handleCopy}>
                    <FileText size={18} />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded" title="Print" onClick={handlePrint}>
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
                        Active <span>▼</span>
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {currentRoles.map((role) => (
                      <tr key={role.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {editingRole === role.id ? (
                            <input
                              type="text"
                              value={editFormData.name}
                              onChange={(e) => setEditFormData(prev => ({ ...prev, name: e.target.value }))}
                              className="w-full p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                              autoFocus
                            />
                          ) : (
                            role.name
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {editingRole === role.id ? (
                            <input 
                              type='checkbox'
                              checked={editFormData.is_active}
                              onChange={(e) => setEditFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                          ) : (
                            <input 
                              type='checkbox'
                              checked={role.is_active === 1}
                              onChange={async (e) => {
                                e.stopPropagation();
                                const newActiveStatus = e.target.checked ? 1 : 0;
                                
                                // Optimistically update the UI
                                const updatedRoles = roles.map(r => 
                                  r.id === role.id ? { ...r, is_active: newActiveStatus } : r
                                );
                                setRoles(updatedRoles);
                                
                                // Update via API
                                await handleRoleChanges(role.id, { is_active: newActiveStatus });
                              }}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex space-x-2 gap-3">
                            {editingRole === role.id ? (
                              <>
                                <button 
                                  className="text-green-600 hover:text-green-800" 
                                  onClick={handleSaveEdit}
                                  title="Save"
                                >
                                  <Check size={18} />
                                </button>
                                <button 
                                  className="text-red-600 hover:text-red-800" 
                                  onClick={handleCancelEdit}
                                  title="Cancel"
                                >
                                  <X size={18} />
                                </button>
                              </>
                            ) : (
                              <div className="flex space-x-2 gap-3">
                                <button 
                                  className="text-gray-600 hover:text-blue-600" 
                                  onClick={() => handleDelete(role.id)}
                                  title="Delete"
                                >
                                  <Trash size={18} />
                                </button>
                                <button 
                                  className="text-gray-600 hover:text-blue-600"
                                  onClick={() => handleEdit(role)}
                                  title="Edit"
                                >
                                  <Edit size={18} />
                                </button>
                              </div>
                            )}
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
            </>
          ) : (
            <div className="text-center text-gray-600 py-8">
              <h3 className="text-lg font-medium">No Data Found</h3>
              <p className="text-sm mt-2">Add a new role to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}