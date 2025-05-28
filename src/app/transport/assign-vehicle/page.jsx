'use client';
import { useState, useRef } from 'react';
import {
  Search, Edit, Trash, ChevronLeft, ChevronRight,
  Download, FileText, Printer, Grid, Copy
} from 'lucide-react';
import * as XLSX from 'xlsx';

export default function TransportRoutes() {
  const [routeName, setRouteName] = useState('');
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [routeList, setRouteList] = useState([
    { name: "Brooklyn Central", vehicles: ["Bus 1", "Van A"] },
    { name: "Brooklyn East", vehicles: ["Bus 2"] },
    { name: "High Court", vehicles: ["Van B", "Bus 3"] }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [displaySection, setDisplaySection] = useState([true, true, true]);
  const [showGrid, setShowGrid] = useState(false);
  const tableRef = useRef(null);
  const routesPerPage = 6;

  const vehicleOptions = ['Bus 1', 'Bus 2', 'Bus 3', 'Van A', 'Van B', 'Van C'];

  const filteredRoutes = routeList.filter(route =>
    route.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * routesPerPage;
  const indexOfFirst = indexOfLast - routesPerPage;
  const currentRoutes = filteredRoutes.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredRoutes.length / routesPerPage);

  const handleSave = () => {
    if (routeName.trim()) {
      const newRoute = {
        name: routeName,
        vehicles: selectedVehicles,
      };
      setRouteList([...routeList, newRoute]);
      setRouteName('');
      setSelectedVehicles([]);
    }
  };

  const handleDelete = (name) => {
    setRouteList(routeList.filter(route => route.name !== name));
  };

  const handleExcelExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(routeList);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Routes');
    XLSX.writeFile(workbook, 'Route_List.xlsx');
  };

  const handlePrint = () => {
    const printContents = tableRef.current?.innerHTML;
    const printWindow = window.open('', '', 'height=500,width=800');
    if (printWindow && printContents) {
      printWindow.document.write('<html><head><title>Transport Routes</title></head><body>');
      printWindow.document.write(printContents);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleCopy = () => {
    if (!routeList || routeList.length === 0) return;
    const jsonData = JSON.stringify(routeList, null, 2);
    navigator.clipboard.writeText(jsonData);
  };

  const toggleVehicle = (vehicle) => {
    setSelectedVehicles(prev =>
      prev.includes(vehicle)
        ? prev.filter(v => v !== vehicle)
        : [...prev, vehicle]
    );
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-6">
        {/* Form Section */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
          <h2 className="text-lg sm:text-xl font-medium text-gray-800 mb-4 sm:mb-6">Add Transport Route</h2>

          <div className="mb-4">
            <label htmlFor="routeName" className="block text-gray-700 mb-2">
              Route Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="routeName"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={routeName}
              onChange={(e) => setRouteName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Select Vehicles</label>
            <div className="flex flex-wrap gap-3">
              {vehicleOptions.map(vehicle => (
                <label key={vehicle} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedVehicles.includes(vehicle)}
                    onChange={() => toggleVehicle(vehicle)}
                    className="accent-blue-500"
                  />
                  <span>{vehicle}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
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
          <h2 className="text-lg sm:text-xl font-medium text-gray-800 mb-4 sm:mb-6">Route List</h2>

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

            <div className="flex ">
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
              <button onClick={handleCopy} className="p-2 text-gray-600 hover:bg-gray-100 rounded">
                <Copy size={18} />
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
              }}>Route</button>
              <button className="px-3 py-1 text-sm border rounded" onClick={() => {
                const updated = [...displaySection];
                updated[1] = !updated[1];
                setDisplaySection(updated);
              }}>Vehicles</button>
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
                  {displaySection[0] && <th className="px-4 py-3 text-left font-medium text-gray-600">Route</th>}
                  {displaySection[1] && <th className="px-4 py-3 text-left font-medium text-gray-600">Vehicles</th>}
                  {displaySection[2] && <th className="px-4 py-3 text-left font-medium text-gray-600">Action</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentRoutes.map(route => (
                  <tr key={route.name}>
                    {displaySection[0] && <td className="px-4 py-3 text-gray-700">{route.name}</td>}
                    {displaySection[1] && <td className="px-4 py-3 text-gray-700">{route.vehicles?.join(', ')}</td>}
                    {displaySection[2] && (
                      <td className="px-4 py-3">
                        <div className="flex gap-3">
                          <button className="text-gray-600 hover:text-red-600" onClick={() => handleDelete(route.name)}>
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
              Records: {indexOfFirst + 1} to {Math.min(indexOfLast, filteredRoutes.length)} of {filteredRoutes.length}
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
