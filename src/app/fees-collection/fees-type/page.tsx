'use client';
import { useState, useRef } from 'react';
import {
  Search, Edit, Trash, ChevronLeft, ChevronRight,
  Download, FileText, Printer, Grid, Copy
} from 'lucide-react';

interface FeesTypeItem {
  name: string;
  feesCode: string;
}

export default function FeesType() {
  const [roleName, setRoleName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [feesCode, setFeesCode] = useState<string>('');
  const [feesType, setFeesType] = useState<FeesTypeItem[]>([
    { "name": "Admission Fees", "feesCode": "admission-fees" },
    { "name": "1st Installment Fees", "feesCode": "1-installment-fees" },
    { "name": "2nd Installment Fees", "feesCode": "2-installment-fees" },
    { "name": "3rd Installment Fees", "feesCode": "3-installment-fees" },
    { "name": "4th Installment Fees", "feesCode": "4-installment-fees" },
    { "name": "5th Installment Fees", "feesCode": "5-installment-fees" },
    { "name": "6th Installment Fees", "feesCode": "6-installment-fees" },
    { "name": "April Month Fees", "feesCode": "apr-month-fees" },
    { "name": "August Month Fees", "feesCode": "aug-month-fees" },
    { "name": "Bus-fees", "feesCode": "Bus-fees" },
    { "name": "Caution Money Fees", "feesCode": "caution-money-fees" },
    { "name": "Certificate fee", "feesCode": "Cert-Fee" },
    { "name": "December Month Fees", "feesCode": "dec-month-fees" },
    { "name": "Exam Fees", "feesCode": "exam-fees" },
    { "name": "February Month Fees", "feesCode": "feb-month-fees" },
    { "name": "January Month Fees", "feesCode": "jan-month-fees" },
    { "name": "July Month Fees", "feesCode": "jul-month-fees" },
    { "name": "June Month Fees", "feesCode": "jun-month-fees" },
    { "name": "March Month Fees", "feesCode": "march-month-fees" },
    { "name": "May Month Fees", "feesCode": "may-month-fees" },
    { "name": "September Month Fees", "feesCode": "sep-month-fees" },
    { "name": "October Month Fees", "feesCode": "oct-month-fees" },
    { "name": "November Month Fees", "feesCode": "nov-month-fees" },
    { "name": "Lumpsum fees", "feesCode": "lumpsum-fees" },
    { "name": "fees", "feesCode": "fees" },
    { "name": "Topper Discount", "feesCode": "discount123" },
    { "name": "March Fees", "feesCode": "F02302" },
    { "name": "Exam Fees", "feesCode": "Exam" }
  ]);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [displaySection, setDisplaySection] = useState<boolean[]>([true, true, true]);
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const tableRef = useRef<HTMLDivElement>(null);
  const rolesPerPage: number = 6;

  const filteredRoles: FeesTypeItem[] = feesType.filter((role: FeesTypeItem) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRole: number = currentPage * rolesPerPage;
  const indexOfFirstRole: number = indexOfLastRole - rolesPerPage;
  const currentRoles: FeesTypeItem[] = filteredRoles.slice(indexOfFirstRole, indexOfLastRole);
  const totalPages: number = Math.ceil(filteredRoles.length / rolesPerPage);

  const handleSave = (): void => {
    if (roleName.trim()) {
      const newRole: FeesTypeItem = {
        name: roleName,
        feesCode: feesCode
      };
      setFeesType([...feesType, newRole]);
      setRoleName('');
      setFeesCode('');
    }
  };

  const handleDelete = (name: string): void => {
    setFeesType(feesType.filter((role: FeesTypeItem) => role.name !== name));
  };

  const handleExcelExport = (): void => {
    let table = `<table border="1"><tr><th>Name</th><th>Fees Code</th></tr>`;
    feesType.forEach((role: FeesTypeItem) => {
      table += `<tr><td>${role.name}</td><td>${role.feesCode === "" ? 'None' : role.feesCode}</td></tr>`;
    });
    table += `</table>`;
    const blob = new Blob([table], { type: 'application/vnd.ms-excel' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Fees Type.xls';
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const handlePrint = (): void => {
    const printContents = tableRef.current?.innerHTML;
    const printWindow = window.open('', '', 'height=500,width=800');
    if (printWindow && printContents) {
      printWindow.document.write('<html><head><title>Fees Type</title></head><body>');
      printWindow.document.write(printContents);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleCopy = (): void => {
    if (!feesType || feesType.length === 0) return;
    const jsonData = JSON.stringify(feesType, null, 2);
    navigator.clipboard.writeText(jsonData);
  };

  const handleColumnToggle = (index: number): void => {
    const updated = [...displaySection];
    updated[index] = !updated[index];
    setDisplaySection(updated);
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-6">
        {/* Form Section */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
          <h2 className="text-lg sm:text-xl font-medium text-gray-800 mb-4 sm:mb-6">Add Fees Type</h2>
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
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2'>Fees Code</label>
            <input 
              value={feesCode}
              onChange={(e) => setFeesCode(e.target.value)}
              className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500' 
            />
          </div>
          <div className='block h-1/3'>
            <label className="block text-gray-700 mb-2">Description</label>
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
          <h2 className="text-lg sm:text-xl font-medium text-gray-800 mb-4 sm:mb-6">Fees Type List</h2>

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
              <button onClick={handleExcelExport} className={`p-2 text-gray-600 hover:bg-gray-100 rounded`} title="Export to Excel">
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
                title="Copy Data"
              >
                <Copy className='h-5 w-5' />
              </button>
            </div>
          </div>

          {/* Grid Toggle */}
          {showGrid && (
            <div className="flex flex-wrap gap-2 mb-4">
              <button 
                className={`px-3 py-1 text-sm border rounded focus:border-2 ${displaySection[0] ? 'btn-primary' : ''}`} 
                onClick={() => handleColumnToggle(0)}
              >
                Name
              </button>
              <button 
                className={`px-3 py-1 text-sm border rounded focus:border-2 ${displaySection[1] ? 'btn-primary' : ''}`} 
                onClick={() => handleColumnToggle(1)}
              >
                Fees Code
              </button>
              <button 
                className={`px-3 py-1 text-sm border rounded focus:border-2 ${displaySection[2] ? 'btn-primary' : ''}`} 
                onClick={() => handleColumnToggle(2)}
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
                  {displaySection[0] && <th className="px-4 py-3 text-left font-medium text-gray-600">Name</th>}
                  {displaySection[1] && <th className="px-4 py-3 text-left font-medium text-gray-600">Fees Code</th>}
                  {displaySection[2] && <th className="px-4 py-3 text-left font-medium text-gray-600">Action</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentRoles.map((role: FeesTypeItem) => (
                  <tr key={role.name}>
                    {displaySection[0] && <td className="px-4 py-3 text-gray-700">{role.name}</td>}
                    {displaySection[1] && <td className="px-4 py-3 text-gray-700">{role.feesCode}</td>}
                    {displaySection[2] && (
                      <td className="px-4 py-3">
                        <div className="flex gap-3">
                          <button 
                            className="text-gray-600 hover:text-red-600" 
                            onClick={() => handleDelete(role.name)}
                            title="Delete"
                          >
                            <Trash size={18} />
                          </button>
                          <button 
                            className="text-gray-600 hover:text-blue-600"
                            title="Edit"
                          >
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
              >
                <ChevronLeft size={18} />
              </button>
              <span className="px-2 py-1 bg-gray-100 rounded">{currentPage}</span>
              <button 
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} 
                disabled={currentPage === totalPages} 
                className="p-1 rounded disabled:opacity-50"
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