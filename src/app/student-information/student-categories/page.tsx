"use client";
import React, { useState, useRef } from 'react';
import {
  Search, Edit, Trash, ChevronLeft, ChevronRight,
  Download, FileText, Printer, Grid
} from 'lucide-react';

interface Role {
  category: string;
  categoryId: number;
}

export default function StudentCategory() {
  const [roleName, setRoleName] = useState<string>('');
  const [roles, setRoles] = useState<Role[]>([
    { category: "General", categoryId: 1 },
    { category: "OBC", categoryId: 2 },
    { category: "Special", categoryId: 3 },
    { category: "Physically Challenged", categoryId: 4 }
  ]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [displaySection, setDisplaySection] = useState<boolean[]>(Array(3).fill(true));
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const tableRef = useRef<HTMLDivElement | null>(null);
  const rolesPerPage = 6;

  const filteredRoles = roles.filter(role =>
    role.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRole = currentPage * rolesPerPage;
  const indexOfFirstRole = indexOfLastRole - rolesPerPage;
  const currentRoles = filteredRoles.slice(indexOfFirstRole, indexOfLastRole);
  const totalPages = Math.ceil(filteredRoles.length / rolesPerPage);

  const handleSave = () => {
    if (roleName.trim()) {
      const newRole: Role = {
        category: roleName.trim(),
        categoryId: roles.length ? Math.max(...roles.map(r => r.categoryId)) + 1 : 1,
      };
      setRoles([...roles, newRole]);
      setRoleName('');
    }
  };

  const handleDelete = (id: number) => {
    setRoles(roles.filter(role => role.categoryId !== id));
  };

  const handleExcelExport = () => {
    let table = `<table border="1"><tr><th>Category</th><th>Category ID</th></tr>`;
    roles.forEach(role => {
      table += `<tr><td>${role.category}</td><td>${role.categoryId}</td></tr>`;
    });
    table += `</table>`;
    const blob = new Blob([table], { type: 'application/vnd.ms-excel' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'categories.xls';
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    if (!tableRef.current) return;
    const printContents = tableRef.current.innerHTML;
    const printWindow = window.open('', '', 'height=500,width=800');
    if (!printWindow) return;
    printWindow.document.write('<html><head><title>Print Categories</title></head><body>');
    printWindow.document.write(printContents);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-6">
        {/* Form Section */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
          <h2 className="text-lg sm:text-xl font-medium text-gray-800 mb-4 sm:mb-6">Category</h2>
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
          <div className="flex justify-end mt-4 sm:mt-6">
            <button
              onClick={handleSave}
              className="btn btn-primary text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Save
            </button>
          </div>
        </div>

        {/* List Section */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
          <h2 className="text-lg sm:text-xl font-medium text-gray-800 mb-4 sm:mb-6">Category List</h2>

          {/* Search + Tools */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search..."
                className="w-full p-2 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>

            <div className="flex gap-2 flex-wrap">
              <button onClick={handleExcelExport} className="p-2 text-gray-600 hover:bg-gray-100 rounded" title="Export to Excel">
                <Download size={18} />
              </button>
              <button onClick={handlePrint} className="p-2 text-gray-600 hover:bg-gray-100 rounded" title="Export to PDF">
                <FileText size={18} />
              </button>
              <button onClick={handlePrint} className="p-2 text-gray-600 hover:bg-gray-100 rounded" title="Print">
                <Printer size={18} />
              </button>
              <button onClick={() => setShowGrid(!showGrid)} className="p-2 text-gray-600 hover:bg-gray-100 rounded" title="View as Grid">
                <Grid size={18} />
              </button>
            </div>
          </div>

          {/* Grid Settings */}
          {showGrid && (
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                className="px-3 py-1 text-sm border rounded"
                onClick={() => {
                  const updated = [...displaySection];
                  updated[0] = !updated[0];
                  setDisplaySection(updated);
                }}
              >
                Category
              </button>
              <button
                className="px-3 py-1 text-sm border rounded"
                onClick={() => {
                  const updated = [...displaySection];
                  updated[1] = !updated[1];
                  setDisplaySection(updated);
                }}
              >
                Category ID
              </button>
              <button
                className="px-3 py-1 text-sm border rounded"
                onClick={() => {
                  const updated = [...displaySection];
                  updated[2] = !updated[2];
                  setDisplaySection(updated);
                }}
              >
                Action
              </button>
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto" ref={tableRef}>
            <table className="min-w-full divide-y divide-gray-200 border text-sm">
              <thead className="bg-gray-100">
                <tr>
                  {displaySection[0] && <th className="px-4 py-3 text-left font-medium text-gray-600">Category</th>}
                  {displaySection[1] && <th className="px-4 py-3 text-left font-medium text-gray-600">Category ID</th>}
                  {displaySection[2] && <th className="px-4 py-3 text-left font-medium text-gray-600">Action</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentRoles.map(role => (
                  <tr key={role.categoryId}>
                    {displaySection[0] && <td className="px-4 py-3 text-gray-700">{role.category}</td>}
                    {displaySection[1] && <td className="px-4 py-3 text-gray-700">{role.categoryId}</td>}
                    {displaySection[2] && (
                      <td className="px-4 py-3">
                        <div className="flex gap-3">
                          <button
                            className="text-gray-600 hover:text-red-600"
                            onClick={() => handleDelete(role.categoryId)}
                            aria-label={`Delete category ${role.category}`}
                          >
                            <Trash size={18} />
                          </button>
                          <button className="text-gray-600 hover:text-blue-600" aria-label={`Edit category ${role.category}`}>
                            <Edit size={18} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 text-sm text-gray-600 gap-2">
            <div>
              Records: {indexOfFirstRole + 1} to {Math.min(indexOfLastRole, filteredRoles.length)} of {filteredRoles.length}
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="p-1 rounded disabled:opacity-50"
                aria-label="Previous Page"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="px-2 py-1 bg-gray-100 rounded" aria-live="polite">{currentPage}</span>
              <button
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-1 rounded disabled:opacity-50"
                aria-label="Next Page"
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
