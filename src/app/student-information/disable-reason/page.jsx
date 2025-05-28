"use client";
import { useState, useRef, useEffect } from "react";
import {
  Search,
  Edit,
  Trash,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  Printer,
  Grid,
  Loader2,
} from "lucide-react";

export default function StudentCategory() {
  const [reasonName, setReasonName] = useState("");
  const [editId, setEditId] = useState(null);
  const [reasons, setReasons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const reasonsPerPage = 6;
  const [displaySection, setDisplaySection] = useState([true, false, true]);
  const [showGrid, setShowGrid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const tableRef = useRef(null);

  const API_URL = "https://school2025.dolittletech.co.in/api/disable-reasons";

  // Fetch all disable reasons
  const fetchDisableReasons = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("API Response:", data); // Debug log
      
      // Handle API response structure
      let reasonsData = [];
      if (Array.isArray(data)) {
        reasonsData = data;
      } else if (data && Array.isArray(data.data)) {
        reasonsData = data.data;
      } else if (data && Array.isArray(data.results)) {
        reasonsData = data.results;
      } else if (data && data.name) {
        reasonsData = [data];
      } else {
        throw new Error("Invalid API response structure");
      }
      
      setReasons(reasonsData);
    } catch (error) {
      console.error("Error fetching disable reasons:", error);
      setError(error.message);
      setReasons([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDisableReasons();
  }, []);

  // Robust filtering
  const filteredReasons = reasons.filter((reason) => {
    if (!reason) return false;
    const name = reason.name || reason.Name || reason.reason || "";
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Pagination
  const indexOfLastReason = currentPage * reasonsPerPage;
  const indexOfFirstReason = indexOfLastReason - reasonsPerPage;
  const currentReasons = filteredReasons.slice(indexOfFirstReason, indexOfLastReason);
  const totalPages = Math.max(1, Math.ceil(filteredReasons.length / reasonsPerPage));

  // Add or Update disable reason
  const handleSave = async () => {
    if (!reasonName.trim()) {
      setError("Reason name cannot be empty");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const method = editId ? "PUT" : "POST";
      const url = editId ? `${API_URL}/${editId}` : API_URL;
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: reasonName }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save reason");
      }

      await fetchDisableReasons();
      setReasonName("");
      setEditId(null);
    } catch (error) {
      console.error("Error saving disable reason:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete disable reason
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this disable reason?")) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete reason");
      }

      await fetchDisableReasons();
    } catch (error) {
      console.error("Error deleting disable reason:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Edit disable reason
  const handleEdit = (reason) => {
    setReasonName(reason.name || reason.Name || reason.reason || "");
    setEditId(reason.id || reason._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Export to Excel
  const handleExcelExport = () => {
    const headers = ["ID", "Disable Reason"];
    const rows = reasons.map(reason => [
      reason.id || reason._id, 
      reason.name || reason.Name || reason.reason || ""
    ]);
    
    let csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + rows.map(row => row.join(",")).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "disable_reasons.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Print function
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Disable Reasons</title>
          <style>
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>Disable Reasons</h1>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              ${reasons.map(reason => `
                <tr>
                  <td>${reason.id || reason._id}</td>
                  <td>${reason.name || reason.Name || reason.reason || ""}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-6">
        {/* Add/Edit Form */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-medium text-gray-800 mb-6">
            {editId ? "Edit Disable Reason" : "Add Disable Reason"}
          </h2>
          <div className="mb-4">
            <label htmlFor="reasonName" className="block text-gray-700 mb-2">
              Reason Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="reasonName"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={reasonName}
              onChange={(e) => setReasonName(e.target.value)}
              placeholder="Enter disable reason"
            />
          </div>
          <div className="flex justify-end gap-2">
            {editId && (
              <button
                onClick={() => {
                  setReasonName("");
                  setEditId(null);
                  setError(null);
                }}
                className="px-4 py-2 bg-gray-500 text-black rounded hover:bg-gray-600"
                disabled={isLoading}
              >
                Cancel
              </button>
            )}
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-600 flex items-center"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editId ? "Update" : "Save"}
            </button>
          </div>
        </div>

        {/* Reason List */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium text-gray-800">
              Disable Reason List
            </h2>
            <div className="flex gap-2">
              <button
                onClick={handleExcelExport}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                title="Export to Excel"
                disabled={isLoading}
              >
                <Download size={18} />
              </button>
              <button
                onClick={handlePrint}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                title="Print"
                disabled={isLoading}
              >
                <Printer size={18} />
              </button>
              <button
                onClick={() => setShowGrid(!showGrid)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                title="View Options"
                disabled={isLoading}
              >
                <Grid size={18} />
              </button>
            </div>
          </div>

          {/* Column Toggle */}
          {showGrid && (
            <div className="mb-4 bg-white border shadow rounded p-2 flex gap-2">
              <button
                className={`px-3 py-1 text-sm rounded border ${
                  displaySection[0] ? "bg-blue-100 border-blue-500" : ""
                }`}
                onClick={() => {
                  const updated = [...displaySection];
                  updated[0] = !updated[0];
                  setDisplaySection(updated);
                }}
              >
                Reason
              </button>
              <button
                className={`px-3 py-1 text-sm rounded border ${
                  displaySection[2] ? "bg-blue-100 border-blue-500" : ""
                }`}
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

          {/* Search */}
          <div className="mb-4 relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search reasons..."
              className="w-full p-2 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              disabled={isLoading}
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto" ref={tableRef}>
            {isLoading && reasons.length === 0 ? (
              <div className="flex justify-center items-center h-32">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200 border">
                <thead className="bg-gray-50">
                  <tr>
                    {displaySection[0] && (
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Disable Reason
                      </th>
                    )}
                    {displaySection[2] && (
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentReasons.length > 0 ? (
                    currentReasons.map((reason) => (
                      <tr key={reason.id || reason._id}>
                        {displaySection[0] && (
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {reason.name || reason.Name || reason.reason || ""}
                          </td>
                        )}
                        {displaySection[2] && (
                          <td className="px-4 py-3 text-sm">
                            <div className="flex gap-4">
                              <button
                                className="text-gray-600 hover:text-red-600"
                                onClick={() => handleDelete(reason.id || reason._id)}
                                disabled={isLoading}
                                title="Delete"
                              >
                                <Trash size={18} />
                              </button>
                              <button
                                className="text-gray-600 hover:text-blue-600"
                                onClick={() => handleEdit(reason)}
                                disabled={isLoading}
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
                        colSpan={2}
                        className="px-4 py-6 text-center text-sm text-gray-500"
                      >
                        {reasons.length === 0
                          ? "No disable reasons found"
                          : "No matching results found"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {filteredReasons.length > 0 && (
            <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
              <div>
                Showing {indexOfFirstReason + 1} to{" "}
                {Math.min(indexOfLastReason, filteredReasons.length)} of{" "}
                {filteredReasons.length} entries
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1 || isLoading}
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
                  disabled={currentPage === totalPages || isLoading}
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