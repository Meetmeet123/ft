"use client";
import { useState, useEffect } from 'react';
import { Search, Edit, Trash, ChevronLeft, ChevronRight, Upload, Download, FileText, Image, Printer, Grid } from 'lucide-react';
import { getSessionDetails } from './SessionDetails';
import { updateSessionDetails } from './SessionDetails';
import { deleteSessionDetails } from './SessionDetails';
import * as XLSX from 'xlsx';

export default function Session() {
  const [sessionName, setSessionName] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const sessionsPerPage = 6;

  // Filter sessions based on search term
  const filteredSessions = Array.isArray(sessions)
    ? sessions.filter(session =>
        session.session.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Calculate pagination
  const indexOfLastSession = currentPage * sessionsPerPage;
  const indexOfFirstSession = indexOfLastSession - sessionsPerPage;
  const currentSessions = filteredSessions.slice(indexOfFirstSession, indexOfLastSession);
  const totalPages = Math.ceil(filteredSessions.length / sessionsPerPage);

  useEffect(() => {
    const fetchData = async() => {
      try {
        const data = await getSessionDetails();
        console.log(data.data)
        setSessions(data.data);
      } catch (err) {
        console.error("Error fetching session details:", err);
      }
    };
    fetchData();
  }, []);

  const handleSave = () => {
  if (sessionName.trim()) {
    const currentTime = new Date().toISOString().replace(/\.\d+Z$/, '.000000Z'); // precise timestamp format
    const nextId = sessions.length > 0 ? Math.max(...sessions.map(s => s.id)) + 1 : 1;

    if (editMode && editId) {
      // Update existing session
      const updatedSessions = sessions.map(session =>
        session.id === editId
          ? { ...session, session: sessionName, is_active: isActive ? 'yes' : 'no', updated_at: currentTime }
          : session
      );
      setSessions(updatedSessions);
      const newData = sessions.map(session =>
        session.id === editId
          ? { session: sessionName, is_active: isActive ? 'yes' : 'no'}
          : session
      );
      updateSessionDetails(newData);
      setEditMode(false);
      setEditId(null);
    } else {
      // Add new session
      const newSession = {
        session: sessionName,
        id: nextId,
        is_active: isActive ? 'yes' : 'no',
      };
      const newData = { session: newSession.session, is_active: newSession.is_active };
      updateSessionDetails(newData)
      setSessions([...sessions, newSession]);
    }

    // Reset form
    setSessionName('');
    setIsActive(false);
  }
};

  const handleEdit = (session) => {
    setEditMode(true);
    setEditId(session.id);
    setSessionName(session.session);
    setIsActive(session.is_active === 'yes');
  };

  const handleDelete = (id) => {
    setSessions(sessions.filter(session => session.id !== id));
    deleteSessionDetails(id);
  };

  const handleExcelExport = () => {
    // Step 1: Convert data to worksheet
    const worksheet = XLSX.utils.json_to_sheet(sessions);
  
    // Step 2: Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sessions');
  
    // Step 3: Trigger download
    XLSX.writeFile(workbook, 'Session_List.xlsx');
  };

  const handleCopy = () => {
    if (!sessions || sessions.length === 0) return;
  
    const jsonText = JSON.stringify(sessions, null, 2);
  
    navigator.clipboard.writeText(jsonText)
      .then(() => {
        alert('JSON data copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy JSON: ', err);
      });
  };

  const handlePrint = () => {
    if (!sessions || sessions.length === 0) return;
  
    const headers = Object.keys(sessions[0]);
    let table = '<table border="1" style="border-collapse: collapse; width: 100%"><thead><tr>';
  
    // Headers
    headers.forEach(header => {
      table += `<th style="padding: 8px; text-align: left;">${header}</th>`;
    });
    table += '</tr></thead><tbody>';
  
    // Rows
    sessions.forEach(row => {
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
        <head>
          <title>Print Session List</title>
        </head>
        <body>
          <h2>Session List</h2>
          ${table}
          <script>
            window.onload = function () {
              window.print();
              window.onafterprint = function () {
                window.close();
              };
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const toggleSessionActive = (id) => {
    setSessions(sessions.map(session => 
      session.id === id 
        ? { ...session, is_active: session.is_active === 'yes' ? 'no' : 'yes' } 
        : session
    ));
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Panel - Add/Edit Session */}
        <div className="bg-white h-70 p-6 rounded-lg shadow">
          <h2 className="text-xl font-medium text-gray-800 mb-6">
            {editMode ? 'Edit Session' : 'Add New Session'}
          </h2>
          <div className="mb-4">
            <label htmlFor="sessionName" className="block text-gray-700 mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="sessionName"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sessionName}
              onChange={(e) => setSessionName(e.target.value)}
              placeholder="Enter session name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="isActive" className="block text-gray-700 mb-2">
              Active <span className="text-red-500">*</span>
            </label>
            <input
              type="checkbox"
              id="isActive"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
          </div>

          <div className="flex justify-end mt-6 gap-2">
            {editMode && (
              <button
                onClick={() => {
                  setEditMode(false);
                  setEditId(null);
                  setSessionName('');
                  setIsActive(false);
                }}
                className="btn btn-secondary bg-gray-300 text-gray-700 p-1 px-2 rounded flex justify-end focus:ring-0 focus:outline-none"
              >
                Cancel
              </button>
            )}
            <button
              onClick={handleSave}
              className="btn btn-primary bg-blue-500 text-white p-1 px-2 rounded flex justify-end focus:ring-0 focus:outline-none"
            >
              {editMode ? 'Update' : 'Save'}
            </button>
          </div>
        </div>

        {/* Right Panel - Session List */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-medium text-gray-800 mb-6">Session List</h2>

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
              <button 
                className="p-2 text-gray-600 hover:bg-gray-100 rounded" 
                title="Export to Excel"
                onClick={handleExcelExport}
              >
                <Download size={18} />
              </button>
              <button 
                className="p-2 text-gray-600 hover:bg-gray-100 rounded" 
                title="Copy JSON"
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
                  {/* <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-gray-900">
                    Id 
                  </th> */}
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-gray-900">
                    Session
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-gray-900">
                    Active
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentSessions.length > 0 ? (
                  currentSessions.map((session) => (
                    <tr key={session.id} className="hover:bg-gray-50">
                      {/* <td className="px-4 py-3 text-sm text-gray-700">{session.id}</td> */}
                      <td className="px-4 py-3 text-sm text-gray-700">{session.session}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        <input 
                          type="checkbox" 
                          checked={session.is_active === 'yes'} 
                          onChange={() => toggleSessionActive(session.id)}
                        />
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex space-x-2">
                          <button 
                            className="text-gray-600 hover:text-red-600"
                            onClick={() => handleDelete(session.id)}
                            title="Delete"
                          >
                            <Trash size={18} />
                          </button>
                          <button 
                            className="text-gray-600 hover:text-blue-600"
                            onClick={() => handleEdit(session)}
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-4 py-3 text-sm text-center text-gray-500">
                      No sessions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
            <div>
              {filteredSessions.length > 0 ? (
                `Records: ${indexOfFirstSession + 1} to ${Math.min(indexOfLastSession, filteredSessions.length)} of ${filteredSessions.length}`
              ) : (
                'No records'
              )}
            </div>
            <div className="flex space-x-1">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1 || filteredSessions.length === 0}
                className={`p-1 rounded ${currentPage === 1 || filteredSessions.length === 0 ? 'text-gray-400' : 'hover:bg-gray-100'}`}
              >
                <ChevronLeft size={18} />
              </button>
              <span className="px-2 py-1 bg-gray-100 rounded">{currentPage}</span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || filteredSessions.length === 0}
                className={`p-1 rounded ${currentPage === totalPages || filteredSessions.length === 0 ? 'text-gray-400' : 'hover:bg-gray-100'}`}
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