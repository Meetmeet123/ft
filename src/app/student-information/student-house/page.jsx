"use client";
import { useState, useEffect } from 'react';
import {
  Search, Edit, Trash, ChevronLeft, ChevronRight,
  Download, Printer, Grid, Loader2, Plus
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function StudentHouse() {
  const [houseName, setHouseName] = useState('');
  const [description, setDescription] = useState('');
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showGridOptions, setShowGridOptions] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    id: true,
    name: true,
    description: true,
    status: true,
    actions: true
  });
  const itemsPerPage = 6;

  const API_URL = 'https://school2025.dolittletech.co.in/api/schoolhouses';

  // Fetch houses from API
  const fetchHouses = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Handle API response structure - modified based on your feedback
      let housesData = [];
      
      if (data.success && Array.isArray(data.houselist)) {
        // If response has success flag and houselist array
        housesData = data.houselist;
      } else if (Array.isArray(data)) {
        // If response is directly an array
        housesData = data;
      } else if (data && typeof data === 'object') {
        // If response is an object with house data
        if (Array.isArray(data.data)) {
          housesData = data.data;
        } else if (Array.isArray(data.results)) {
          housesData = data.results;
        } else if (data.id) {
          // If single house object
          housesData = [data];
        }
      }
      
      if (housesData.length === 0) {
        console.warn('No house data received from API');
      }
      
      setHouses(housesData);
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error(`Failed to load houses: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHouses();
  }, []);

  // Filter houses based on search
  const filteredHouses = houses.filter(house => {
    const name = house?.house_name?.toLowerCase() || '';
    const desc = house?.description?.toLowerCase() || '';
    const search = searchTerm.toLowerCase();
    return name.includes(search) || desc.includes(search);
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredHouses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredHouses.length / itemsPerPage);

  // Handle create/update
  const handleSave = async () => {
    if (!houseName.trim()) {
      toast.error('House name is required');
      return;
    }

    try {
      setLoading(true);
      const method = editId ? 'PUT' : 'POST';
      const url = editId ? `${API_URL}/${editId}` : API_URL;
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          house_name: houseName,
          description: description,
          is_active: "yes" // Default to active
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to save house');
      }

      toast.success(result.message || (editId ? 'House updated successfully' : 'House added successfully'));
      await fetchHouses();
      setHouseName('');
      setDescription('');
      setEditId(null);
    } catch (error) {
      console.error('Save error:', error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this house?')) return;

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to delete house');
      }

      toast.success(result.message || 'House deleted successfully');
      await fetchHouses();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle edit
  const handleEdit = (house) => {
    setHouseName(house.house_name);
    setDescription(house.description || '');
    setEditId(house.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Export to CSV
  const handleExport = () => {
    try {
      if (houses.length === 0) {
        throw new Error('No houses to export');
      }

      const headers = ['ID', 'House Name', 'Description', 'Status'];
      const rows = houses.map(house => [
        house.id,
        house.house_name,
        house.description || '',
        house.is_active === "yes" ? 'Active' : 'Inactive'
      ]);
      
      let csv = "data:text/csv;charset=utf-8," 
        + headers.join(",") + "\n" 
        + rows.map(r => r.join(",")).join("\n");
      
      const link = document.createElement("a");
      link.href = encodeURI(csv);
      link.download = "houses.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Print function
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Houses List</title>
          <style>
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ddd; padding: 8px; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>Houses List</h1>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${houses.map(house => `
                <tr>
                  <td>${house.id}</td>
                  <td>${house.house_name}</td>
                  <td>${house.description || ''}</td>
                  <td>${house.is_active === "yes" ? 'Active' : 'Inactive'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-6">
        {/* Form Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-medium text-gray-800 mb-6">
            {editId ? 'Edit House' : 'Add House'}
          </h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              House Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={houseName}
              onChange={(e) => setHouseName(e.target.value)}
              placeholder="Enter house name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          <div className="flex justify-end gap-2">
            {editId && (
              <button
                onClick={() => {
                  setHouseName('');
                  setDescription('');
                  setEditId(null);
                }}
                className="px-4 py-2 bg-gray-500 text-black rounded hover:bg-gray-600"
                disabled={loading}
              >
                Cancel
              </button>
            )}
            <button
              onClick={handleSave}
              disabled={loading || !houseName.trim()}
              className="px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-600 flex items-center"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editId ? 'Update' : 'Save'}
            </button>
          </div>
        </div>

        {/* List Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium text-gray-800">House List</h2>
            <div className="flex gap-2">
              <button
                onClick={handleExport}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                title="Export"
                disabled={loading || houses.length === 0}
              >
                <Download size={18} />
              </button>
              <button
                onClick={handlePrint}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                title="Print"
                disabled={loading || houses.length === 0}
              >
                <Printer size={18} />
              </button>
              <button
                onClick={() => setShowGridOptions(!showGridOptions)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                title="Columns"
                disabled={loading}
              >
                <Grid size={18} />
              </button>
            </div>
          </div>

          {/* Column Toggle */}
          {showGridOptions && (
            <div className="mb-4 bg-gray-50 p-3 rounded flex gap-2 flex-wrap">
              {Object.entries(visibleColumns).map(([key, visible]) => (
                <button
                  key={key}
                  onClick={() => setVisibleColumns(prev => ({
                    ...prev,
                    [key]: !visible
                  }))}
                  className={`px-3 py-1 text-sm rounded ${
                    visible ? 'bg-blue-100 text-blue-800' : 'bg-gray-200'
                  }`}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}
                </button>
              ))}
            </div>
          )}

          {/* Search */}
          <div className="mb-4 relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search houses..."
              className="w-full p-2 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              disabled={loading}
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {loading && houses.length === 0 ? (
              <div className="flex justify-center items-center h-32">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {visibleColumns.id && (
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                    )}
                    {visibleColumns.name && (
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                    )}
                    {visibleColumns.description && (
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                    )}
                    {visibleColumns.status && (
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    )}
                    {visibleColumns.actions && (
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.length > 0 ? (
                    currentItems.map((house) => (
                      <tr key={`house-${house.id}`}>
                        {visibleColumns.id && (
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {house.id}
                          </td>
                        )}
                        {visibleColumns.name && (
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {house.house_name}
                          </td>
                        )}
                        {visibleColumns.description && (
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {house.description || '-'}
                          </td>
                        )}
                        {visibleColumns.status && (
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              house.is_active === "yes" 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {house.is_active === "yes" ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                        )}
                        {visibleColumns.actions && (
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEdit(house)}
                                className="text-blue-600 hover:text-blue-900"
                                disabled={loading}
                                title="Edit"
                              >
                                <Edit size={18} />
                              </button>
                              <button
                                onClick={() => handleDelete(house.id)}
                                className="text-red-600 hover:text-red-900"
                                disabled={loading}
                                title="Delete"
                              >
                                <Trash size={18} />
                              </button>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td 
                        colSpan={Object.values(visibleColumns).filter(Boolean).length}
                        className="px-6 py-4 text-center text-sm text-gray-500"
                      >
                        {houses.length === 0 ? 'No houses found' : 'No matching results'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {filteredHouses.length > 0 && (
            <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
              <div>
                Showing {indexOfFirstItem + 1} to{' '}
                {Math.min(indexOfLastItem, filteredHouses.length)} of{' '}
                {filteredHouses.length} entries
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                  disabled={currentPage === 1 || loading}
                  className="p-1 rounded disabled:opacity-50 hover:bg-gray-100"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="px-2 py-1 bg-gray-100 rounded">
                  {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages || loading}
                  className="p-1 rounded disabled:opacity-50 hover:bg-gray-100"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}