"use client";
import { useState, useRef, useEffect } from 'react';
import {
  Search, Edit, Trash, ChevronLeft, ChevronRight,
  Download, FileText, Printer, Grid, Loader2
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function StudentCategory() {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [displaySection, setDisplaySection] = useState([true, true, true, true]); // Added status column
  const [showGrid, setShowGrid] = useState(false);
  const tableRef = useRef(null);
  const itemsPerPage = 6;

  const API_URL = 'https://school2025.dolittletech.co.in/api/categories';

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success && Array.isArray(data.categorylist)) {
        setCategories(data.categorylist);
      } else {
        throw new Error("Invalid data format from API");
      }
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error(error.message);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const filteredCategories = categories.filter(category => {
    const catName = category?.category?.toLowerCase() || '';
    const search = searchTerm.toLowerCase();
    return catName.includes(search);
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  const handleSave = async () => {
    if (!categoryName.trim()) {
      toast.error('Category name is required');
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
        body: JSON.stringify({ category: categoryName }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to save category');
      }

      toast.success(result.message || (editId ? 'Updated successfully' : 'Added successfully'));
      await fetchCategories();
      setCategoryName('');
      setEditId(null);
    } catch (error) {
      console.error('Save error:', error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to delete');
      }

      toast.success(result.message || 'Deleted successfully');
      await fetchCategories();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category) => {
    setCategoryName(category.category);
    setEditId(category.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-6">
        {/* Form Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-medium text-gray-800 mb-6">
            {editId ? 'Edit Category' : 'Add Category'}
          </h2>
          <div className="mb-4">
            <label htmlFor="categoryName" className="block text-gray-700 mb-2">
              Category Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="categoryName"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter category name"
            />
          </div>
          <div className="flex justify-end gap-2">
            {editId && (
              <button
                onClick={() => {
                  setCategoryName('');
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
              disabled={loading || !categoryName.trim()}
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
            <h2 className="text-xl font-medium text-gray-800">Category List</h2>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  let table = `<table border="1"><tr><th>ID</th><th>Category</th><th>Status</th></tr>`;
                  categories.forEach(category => {
                    table += `<tr><td>${category.id}</td><td>${category.category}</td><td>${category.is_active === 'yes' ? 'Active' : 'Inactive'}</td></tr>`;
                  });
                  table += `</table>`;
                  const blob = new Blob([table], { type: 'application/vnd.ms-excel' });
                  const url = window.URL.createObjectURL(blob);
                  const link = document.createElement('a');
                  link.href = url;
                  link.download = 'categories.xls';
                  link.click();
                }}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                title="Export to Excel"
                disabled={loading || categories.length === 0}
              >
                <Download size={18} />
              </button>
              <button
                onClick={() => {
                  const printWindow = window.open('', '_blank');
                  printWindow.document.write(`
                    <html>
                      <head>
                        <title>Categories List</title>
                        <style>
                          table { border-collapse: collapse; width: 100%; }
                          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                          th { background-color: #f2f2f2; }
                        </style>
                      </head>
                      <body>
                        <h1>Categories List</h1>
                        <table>
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Category</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            ${categories.map(category => `
                              <tr>
                                <td>${category.id}</td>
                                <td>${category.category}</td>
                                <td>${category.is_active === 'yes' ? 'Active' : 'Inactive'}</td>
                              </tr>
                            `).join('')}
                          </tbody>
                        </table>
                      </body>
                    </html>
                  `);
                  printWindow.document.close();
                  printWindow.focus();
                  printWindow.print();
                }}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                title="Print"
                disabled={loading || categories.length === 0}
              >
                <Printer size={18} />
              </button>
              <button
                onClick={() => setShowGrid(!showGrid)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                title="View Options"
                disabled={loading}
              >
                <Grid size={18} />
              </button>
            </div>
          </div>

          {/* Search and Column Toggles */}
          <div className="mb-4 relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search categories..."
              className="w-full p-2 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              disabled={loading}
            />
          </div>

          {showGrid && (
            <div className="mb-4 bg-white border shadow rounded p-2 flex gap-2">
              {['Category', 'ID', 'Status', 'Actions'].map((label, index) => (
                <button
                  key={`toggle-${index}`}
                  className={`px-3 py-1 text-sm rounded border ${
                    displaySection[index] ? 'bg-blue-100 border-blue-500' : ''
                  }`}
                  onClick={() => {
                    const updated = [...displaySection];
                    updated[index] = !updated[index];
                    setDisplaySection(updated);
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto" ref={tableRef}>
            {loading && categories.length === 0 ? (
              <div className="flex justify-center items-center h-32">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200 border">
                <thead className="bg-gray-50">
                  <tr>
                    {displaySection[0] && (
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                    )}
                    {displaySection[1] && (
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                    )}
                    {displaySection[2] && (
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    )}
                    {displaySection[3] && (
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.length > 0 ? (
                    currentItems.map((category) => (
                      <tr key={`category-${category.id}`}>
                        {displaySection[0] && (
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {category.category}
                          </td>
                        )}
                        {displaySection[1] && (
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {category.id}
                          </td>
                        )}
                        {displaySection[2] && (
                          <td className="px-4 py-3 text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              category.is_active === 'yes' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {category.is_active === 'yes' ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                        )}
                        {displaySection[3] && (
                          <td className="px-4 py-3 text-sm">
                            <div className="flex gap-4">
                              <button
                                className="text-gray-600 hover:text-red-600"
                                onClick={() => handleDelete(category.id)}
                                disabled={loading}
                                title="Delete"
                              >
                                <Trash size={18} />
                              </button>
                              <button
                                className="text-gray-600 hover:text-blue-600"
                                onClick={() => handleEdit(category)}
                                disabled={loading}
                                title="Edit"
                              >
                                <Edit size={18} />
                              </button>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 py-6 text-center text-sm text-gray-500"
                      >
                        {categories.length === 0
                          ? "No categories found"
                          : "No matching categories found"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {filteredCategories.length > 0 && (
            <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
              <div>
                Showing {indexOfFirstItem + 1} to{" "}
                {Math.min(indexOfLastItem, filteredCategories.length)} of{" "}
                {filteredCategories.length} entries
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1 || loading}
                  className="p-1 rounded disabled:opacity-50 hover:bg-gray-100"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="px-2 py-1 bg-gray-100 rounded">
                  {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
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