'use client';
import { useState, useRef } from 'react';
import {
  Search, Edit, Trash, ChevronLeft, ChevronRight,
  Download, FileText, Printer, Grid, Copy
} from 'lucide-react';

interface FeesGroupItem {
  name: string;
  description: string;
}

export default function FeesGroup() {
  const [roleName, setRoleName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [groupList, setGroupList] = useState<FeesGroupItem[]>([
    { name: "Class 1 General", description: "" },
    { name: "Class 1 Lump Sum", description: "" },
    { name: "Class 1- I Installment", description: "" },
    { name: "Class 1-II Installment", description: "" },
    { name: "Class 2 General", description: "" },
    { name: "Class 2 Lump Sum", description: "" },
    { name: "Class 2- I Installment", description: "" },
    { name: "Class 2 - II Installment", description: "" },
    { name: "Class 3 General", description: "" },
    { name: "Class 3- I Installment", description: "" },
    { name: "Class 3- II Installment", description: "" },
    { name: "Class 4 General", description: "" },
    { name: "Discount", description: "" },
    { name: "March Fees", description: "" },
    { name: "Exam", description: "" },
    { name: "Fees", description: "" },
    { name: "Class 4- I Installment", description: "" },
    { name: "Class 5 General", description: "" }
  ]);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [displaySection, setDisplaySection] = useState<boolean[]>([true, true, true]);
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const tableRef = useRef<HTMLDivElement | null>(null);
  const rolesPerPage = 6;

  const filteredRoles = groupList.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRole = currentPage * rolesPerPage;
  const indexOfFirstRole = indexOfLastRole - rolesPerPage;
  const currentRoles = filteredRoles.slice(indexOfFirstRole, indexOfLastRole);
  const totalPages = Math.ceil(filteredRoles.length / rolesPerPage);

  const handleSave = () => {
    if (roleName.trim()) {
      const newRole: FeesGroupItem = {
        name: roleName,
        description: description,
      };
      setGroupList([...groupList, newRole]);
      setRoleName('');
      setDescription('');
    }
  };

  const handleDelete = (name: string) => {
    setGroupList(groupList.filter(role => role.name !== name));
  };

  const handleExcelExport = () => {
    let table = `<table border="1"><tr><th>Name</th><th>Description</th></tr>`;
    groupList.forEach(role => {
      table += `<tr><td>${role.name}</td><td>${role.description === "" ? 'None' : role.description}</td></tr>`;
    });
    table += `</table>`;
    const blob = new Blob([table], { type: 'application/vnd.ms-excel' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'FeesGroup.xls';
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    const printContents = tableRef.current?.innerHTML;
    const printWindow = window.open('', '', 'height=500,width=800');
    if (printWindow && printContents) {
      printWindow.document.write('<html><head><title>Fees Group</title></head><body>');
      printWindow.document.write(printContents);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleCopy = () => {
    if (!groupList || groupList.length === 0) return;
    const jsonData = JSON.stringify(groupList, null, 2);
    navigator.clipboard.writeText(jsonData);
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-6">
        {/* Form Section */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
          <h2 className="text-lg sm:text-xl font-medium text-gray-800 mb-4 sm:mb-6">Add Fees Group</h2>
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
          <div className='block h-1/2'>
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='w-full p-2 border border-gray-300 rounded h-2/3 focus:outline-none'
            />
          </div>
          <div className="flex justify-end mt-4 sm:mt-6">
            <button
              onClick={handleSave}
              className="btn btn-primary bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Save
            </button>
          </div>
        </div>

        {/* List Section */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
          <h2 className="text-lg sm:text-xl font-medium text-gray-800 mb-4 sm:mb-6">Group List</h2>

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
              <button onClick={() => setShowGrid(!showGrid)} className="p-2 text-gray-600 hover:bg-gray-100 rounded" title="View Columns">
                <Grid size={18} />
              </button>
              <button
                onClick={handleCopy}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                <Copy className='h-5 w-5' />
              </button>
            </div>
          </div>

          {/* Grid Toggle */}
          {showGrid && (
            <div className="flex flex-wrap gap-2 mb-4">
              <button className="px-3 py-1 text-sm border rounded focus:border-2" onClick={() => {
                const updated = [...displaySection];
                updated[0] = !updated[0];
                setDisplaySection(updated);
              }}>Name</button>
              <button className="px-3 py-1 text-sm border rounded" onClick={() => {
                const updated = [...displaySection];
                updated[1] = !updated[1];
                setDisplaySection(updated);
              }}>Description</button>
              <button className="px-3 py-1 text-sm border rounded" onClick={() => {
                const updated = [...displaySection];
                updated[2] = !updated[2];
                setDisplaySection(updated);
              }}>Action</button>

            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto" ref={tableRef}>
            <table className="min-w-full divide-y divide-gray-200 border text-sm">
              <thead className="bg-gray-100">
                <tr>
                  {displaySection[0] && <th className="px-4 py-3 text-left font-medium text-gray-600">Name</th>}
                  {displaySection[1] && <th className="px-4 py-3 text-left font-medium text-gray-600">Description</th>}
                  {displaySection[2] && <th className="px-4 py-3 text-left font-medium text-gray-600">Action</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentRoles.map(role => (
                  <tr key={role.name}>
                    {displaySection[0] && <td className="px-4 py-3 text-gray-700">{role.name}</td>}
                    {displaySection[1] && <td className="px-4 py-3 text-gray-700">{role.description}</td>}
                    {displaySection[2] && (
                      <td className="px-4 py-3">
                        <div className="flex gap-3">
                          <button className="text-gray-600 hover:text-red-600" onClick={() => handleDelete(role.name)}>
                            <Trash size={18} />
                          </button>
                          <button className="text-gray-600 hover:text-blue-600">
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
              <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className="p-1 rounded disabled:opacity-50">
                <ChevronLeft size={18} />
              </button>
              <span className="px-2 py-1 bg-gray-100 rounded">{currentPage}</span>
              <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="p-1 rounded disabled:opacity-50">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
