"use client";
import { useState, useEffect } from 'react';
import { Search, Edit, Trash, ChevronLeft, ChevronRight, Download, FileText, Printer, Grid, X, Check } from 'lucide-react';
import { getRolePermission, updateRolePermission, deleteRolePermission } from './RoleDetails';
import { ToastContainer, toast } from 'react-toastify';

type Role = {
  id: number;
  name: string;
  type: string;
  is_active: number;
};

export default function RoleManagement() {
  const [roleName, setRoleName] = useState('');
  const [roles, setRoles] = useState<Role[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const rolesPerPage = 6;
  const [isActive, setIsActive] = useState(false);
  const [editingRole, setEditingRole] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState({ name: '', is_active: false });

  const updateNotify = () => toast.success("Record Updated Successfully!");
  const deleteNotify = () => toast.error("Record Deleted Successfully!");
  const saveNotify = () => toast.success("Role Added Successfully!");
  const errorNotify = (message: string) => toast.error(message);

  // Helper function to convert is_active number to boolean
  const isActiveToBoolean = (is_active: number): boolean => {
    return is_active === 1;
  };

  // Helper function to convert boolean to is_active number
  const booleanToIsActive = (active: boolean): number => {
    return active ? 1 : 0;
  };

  // Filter roles based on search term
  const filteredRoles = Array.isArray(roles)
    ? roles.filter(role => role?.name?.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

  // Pagination calculation
  const indexOfLastRole = currentPage * rolesPerPage;
  const indexOfFirstRole = indexOfLastRole - rolesPerPage;
  const currentRoles = filteredRoles.slice(indexOfFirstRole, indexOfLastRole);
  const totalPages = Math.ceil(filteredRoles.length / rolesPerPage);

  const handleSave = async () => {
    if (!roleName.trim()) {
      errorNotify('Role name is required');
      return;
    }

    try {
      const newRole = {
        id: roles.length ? Math.max(...roles.map(r => r.id)) + 1 : 1,
        name: roleName.trim(),
        type: 'Custom',
        is_active: booleanToIsActive(isActive)
      };
      
      // Add to local state immediately for better UX
      setRoles([...roles, newRole]);
      setRoleName('');
      setIsActive(false);
      saveNotify();
    } catch (error) {
      console.error('Error saving role:', error);
      errorNotify('Failed to save role');
    }
  };

  interface DeleteRoleResponse {
    success?: boolean;
    status?: string | number;
    message?: string;
    error?: string;
    [key: string]: any;
  }

  const handleDelete = async (id: number): Promise<void> => {
    try {
      // Optimistically remove from UI
      const originalRoles = [...roles];
      setRoles(roles.filter((role: Role) => role.id !== id));
      
      const res: DeleteRoleResponse = await deleteRolePermission(id);
      console.log('Delete response:', res);
      
      const isSuccess = res && (
        res.success === true ||
        res.status === 'success' ||
        (typeof res.status === 'number' && res.status >= 200 && res.status < 300) ||
        !res.error
      );

      if (isSuccess) {
        deleteNotify();
      } else {
        // Revert on failure
        setRoles(originalRoles);
        errorNotify(res.message || res.error || 'Failed to delete role');
      }
    } catch (error) {
      console.error('Error deleting role:', error);
      // Revert on error
      const data = await getRolePermission();
      setRoles(Array.isArray(data.data) ? data.data : []);
      errorNotify('Failed to delete role');
    }
  };

  interface EditFormData {
    name: string;
    is_active: boolean;
  }

  const handleEdit = (role: Role): void => {
    setEditingRole(role.id);
    setEditFormData({
      name: role.name,
      is_active: isActiveToBoolean(role.is_active)
    });
  };

  const handleCancelEdit = () => {
    setEditingRole(null);
    setEditFormData({ name: '', is_active: false });
  };

  const handleSaveEdit = async () => {
    if (!editFormData.name.trim()) {
      errorNotify('Role name is required');
      return;
    }

    try {
      const updatedData = {
        name: editFormData.name.trim(),
        is_active: booleanToIsActive(editFormData.is_active)
      };

      const res = await handleRoleChanges(editingRole, updatedData);
      console.log('Edit response:', res);
      
      setEditingRole(null);
      setEditFormData({ name: '', is_active: false });
      updateNotify();
    } catch (error) {
      console.error('Error saving edit:', error);
      errorNotify('Failed to update role');
    }
  };

  const handleExcelExport = () => {
    if (!roles || roles.length === 0) {
      errorNotify('No data to export');
      return;
    }
    
    try {
      const csvContent = roles.map(role => 
        `${role.id},"${role.name}",${isActiveToBoolean(role.is_active) ? 'Active' : 'Inactive'}`
      ).join('\n');
      
      const blob = new Blob([`ID,Name,Status\n${csvContent}`], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Role_Permission.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      toast.success('Data exported successfully');
    } catch (error) {
      errorNotify('Failed to export data');
    }
  };

  const handleCopy = () => {
    if (!roles || roles.length === 0) {
      errorNotify('No data to copy');
      return;
    }
    
    try {
      const processedRoles = roles.map(role => ({
        ...role,
        is_active_readable: isActiveToBoolean(role.is_active) ? 'Active' : 'Inactive'
      }));
      
      const jsonText = JSON.stringify(processedRoles, null, 2);
      navigator.clipboard.writeText(jsonText)
        .then(() => toast.success('JSON data copied to clipboard'))
        .catch(err => {
          console.error('Failed to copy JSON: ', err);
          errorNotify('Failed to copy data');
        });
    } catch (error) {
      errorNotify('Failed to copy data');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await getRolePermission();
        console.log('Fetched roles:', data);
        
        const rolesData = Array.isArray(data.data) ? data.data : [];
        setRoles(rolesData);
      } catch (err) {
        console.error('Error fetching roles:', err);
        setError('Failed to load roles');
        errorNotify('Failed to load roles');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handlePrint = () => {
    if (!roles || roles.length === 0) {
      errorNotify('No data to print');
      return;
    }
    
    try {
      let table = '<table border="1" style="border-collapse: collapse; width: 100%; margin-top: 20px;">';
      table += '<thead><tr style="background-color: #f5f5f5;">';
      table += '<th style="padding: 12px; text-align: left; border: 1px solid #ddd;">ID</th>';
      table += '<th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Role Name</th>';
      table += '<th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Status</th>';
      table += '<th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Type</th>';
      table += '</tr></thead><tbody>';
      
      roles.forEach(role => {
        table += '<tr>';
        table += `<td style="padding: 8px; border: 1px solid #ddd;">${role.id}</td>`;
        table += `<td style="padding: 8px; border: 1px solid #ddd;">${role.name}</td>`;
        table += `<td style="padding: 8px; border: 1px solid #ddd;">${isActiveToBoolean(role.is_active) ? 'Active' : 'Inactive'}</td>`;
        table += `<td style="padding: 8px; border: 1px solid #ddd;">${role.type || 'Custom'}</td>`;
        table += '</tr>';
      });
      
      table += '</tbody></table>';

      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Role Permission Report</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                h2 { color: #333; margin-bottom: 20px; }
                table { font-size: 14px; }
                @media print {
                  body { margin: 0; }
                }
              </style>
            </head>
            <body>
              <h2>Role Permission Report</h2>
              <p>Generated on: ${new Date().toLocaleString()}</p>
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
      } else {
        errorNotify('Unable to open print window. Please check your popup blocker settings.');
      }
    } catch (error) {
      errorNotify('Failed to generate print document');
    }
  };

  interface HandleRoleChangesResponse {
    success?: boolean;
    status?: string | number;
    message?: string;
    error?: string;
    [key: string]: any;
  }

  interface UpdatedData {
    name?: string;
    is_active?: number;
    [key: string]: any;
  }

  const handleRoleChanges = async (
    roleId: number | null,
    updatedData: UpdatedData
  ): Promise<HandleRoleChangesResponse> => {
    try {
      setError(null);

      // Store original state for potential rollback
      const originalRoles = [...roles];

      // Optimistically update the UI
      const updatedRoles = roles.map(role =>
        role.id === roleId ? { ...role, ...updatedData } : role
      );
      setRoles(updatedRoles);

      // Call the API to update the role
      const response: HandleRoleChangesResponse = await updateRolePermission(updatedData, roleId);

      // Check if the response indicates success
      const isSuccess = response && (
        response.success === true ||
        response.status === 'success' ||
        response.message === 'Role updated' ||
        (typeof response.status === 'number' && response.status >= 200 && response.status < 300) ||
        !response.error
      );

      console.log('Update response:', response);

      if (!isSuccess) {
        // Revert optimistic update on failure
        setRoles(originalRoles);
        const errorMessage = response?.message || response?.error || 'Failed to update role';
        throw new Error(errorMessage);
      }

      return response;
    } catch (error: any) {
      console.error('Error updating role:', error);
      
      // Revert optimistic updates by refetching data
      try {
        const data = await getRolePermission();
        setRoles(Array.isArray(data.data) ? data.data : []);
      } catch (fetchError) {
        console.error('Error refetching data:', fetchError);
      }

      throw error;
    }
  };

  // Handle individual checkbox toggle in table
  const handleActiveToggle = async (role: Role, newActiveStatus: boolean) => {
    try {
      const updatedData = { is_active: booleanToIsActive(newActiveStatus) };
      await handleRoleChanges(role.id, updatedData);
      // Success notification handled in handleRoleChanges
    } catch (error) {
      console.error('Error toggling active status:', error);
      errorNotify('Failed to update role status');
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto p-4 max-w-6xl">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-600">Loading roles...</div>
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
      <ToastContainer />
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Panel - Add Role */}
        <div className="bg-white h-70 p-6 rounded-lg shadow">
          <h2 className="text-xl font-medium text-gray-800 mb-6">Add New Role</h2>
          <div className="mb-4">
            <label htmlFor="roleName" className="block text-gray-700 mb-2">
              Role Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="roleName"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              placeholder="Enter role name"
            />
            
            <div className='w-full flex gap-3 items-center my-6'>
              <label htmlFor="activeCheckbox" className="text-gray-700">
                Active Status
              </label>
              <input
                type='checkbox'
                id="activeCheckbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={handleSave}
              disabled={!roleName.trim()}
              className={`px-4 py-2 rounded text-white font-medium ${
                roleName.trim() 
                  ? 'bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500' 
                  : 'bg-gray-400 cursor-not-allowed'
              } focus:outline-none`}
            >
              Save Role
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
                    placeholder="Search roles..."
                    className="w-full p-2 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1); // Reset to first page when searching
                    }}
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>

                <div className="flex gap-1">
                  <button 
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded" 
                    title="Export to Excel" 
                    onClick={handleExcelExport}
                  >
                    <Download size={18} />
                  </button>
                  <button 
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded" 
                    title="Copy JSON to Clipboard" 
                    onClick={handleCopy}
                  >
                    <FileText size={18} />
                  </button>
                  <button 
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded" 
                    title="Print" 
                    onClick={handlePrint}
                  >
                    <Printer size={18} />
                  </button>
                  <button 
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded" 
                    title="View as Grid"
                  >
                    <Grid size={18} />
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Role Name
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Active Status
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Actions
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
                              onChange={(e) => setEditFormData(prev => ({
                                ...prev,
                                is_active: e.target.checked
                              }))}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                          ) : (
                            <input
                              type='checkbox'
                              checked={role.is_active === 1}
                              onChange={(e) => {
                                e.stopPropagation();
                                handleActiveToggle(role, e.target.checked);
                              }}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex space-x-2">
                            {editingRole === role.id ? (
                              <>
                                <button
                                  className="text-green-600 hover:text-green-800 p-1"
                                  onClick={handleSaveEdit}
                                  title="Save changes"
                                >
                                  <Check size={18} />
                                </button>
                                <button
                                  className="text-red-600 hover:text-red-800 p-1"
                                  onClick={handleCancelEdit}
                                  title="Cancel editing"
                                >
                                  <X size={18} />
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  className="text-blue-600 hover:text-blue-800 p-1"
                                  onClick={() => handleEdit(role)}
                                  title="Edit role"
                                >
                                  <Edit size={18} />
                                </button>
                                <button
                                  className="text-red-600 hover:text-red-800 p-1"
                                  onClick={() => handleDelete(role.id)}
                                  title="Delete role"
                                >
                                  <Trash size={18} />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
                  <div>
                    Showing {indexOfFirstRole + 1} to {Math.min(indexOfLastRole, filteredRoles.length)} of {filteredRoles.length} records
                  </div>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`p-1 rounded ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <span className="px-3 py-1 bg-gray-100 rounded">
                      {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`p-1 rounded ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center text-gray-600 py-8">
              <h3 className="text-lg font-medium">No Roles Found</h3>
              <p className="text-sm mt-2">Add a new role to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}