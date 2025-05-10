"use client";
import { useState } from 'react';
import { FaSearch, FaTrash,FaDownload } from 'react-icons/fa';

export default function AssignmentList() {
  // Dummy data for assignments
  const [assignments, setAssignments] = useState([
    { 
      id: 1, 
      title: 'Assignments', 
      type: 'Document', 
      date: '13-02-2023', 
      availableFor: 'Nursery' 
    },
    { 
      id: 2, 
      title: 'Math Homework', 
      type: 'Worksheet', 
      date: '15-02-2023', 
      availableFor: 'Nursery' 
    },
    { 
      id: 3, 
      title: 'Science Project', 
      type: 'Project', 
      date: '18-02-2023', 
      availableFor: 'Nursery' 
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  // Filter assignments based on search term
  const filteredAssignments = assignments.filter(assignment =>
    assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.availableFor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle delete
  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this assignment?')) {
      setAssignments(assignments.filter(item => item.id !== id));
    }
  };
  const handleDownload = () => {
    const headers = ['Content Title', 'Type', 'Date', 'Available For', 'Class'];
    const csvContent = [
      headers.join(','),
      ...contentTypes.map(item => [
        `"${item.title}"`,
        `"${item.type}"`,
        `"${item.date}"`,
        `"${item.availableFor}"`,
        `"${item.class}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'content_list.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6"> Study Material List</h1>
        
        {/* Search Bar */}
        <div className="mb-6 flex items-center justify-between">
          <div className="relative w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="text-sm text-gray-600">
            Records {filteredAssignments.length} of {assignments.length}
          </div>
        </div>

        {/* Assignment Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available For</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAssignments.length > 0 ? (
                filteredAssignments.map(assignment => (
                  <tr key={assignment.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{assignment.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{assignment.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{assignment.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{assignment.availableFor}</td>
                  
                         
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                            onClick={handleDownload}
                            className="text-green-600 hover:text-green-800 p-1"
                            title="Download"
                          >
                            <FaDownload />
                          </button>
                      <button
                        onClick={() => handleDelete(assignment.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                    No Study Material found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}