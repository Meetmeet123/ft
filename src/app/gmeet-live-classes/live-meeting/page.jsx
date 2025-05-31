"use client";
import React, { useState } from 'react';
import { FaPlay, FaTrash, FaUserFriends, FaSearch, FaCheck,FaEdit } from 'react-icons/fa';

export default function LiveMeetings() {
  // Dummy data for meetings
  const initialMeetings = [
    { id: 1, title: "Urgent Meeting", description: "Urgent Meeting", dateTime: "05/30/2025 13:30:00", duration: 45, createdBy: "Self", status: "Awaited", gmeetUrl: "https://meet.google.com/tft-doko-ukq", staffIds: [9002, 90006] },
    { id: 2, title: "Book Stock Discussion", description: "", dateTime: "05/26/2025 13:30:00", duration: 35, createdBy: "Self", status: "Cancelled", gmeetUrl: "https://meet.google.com/tft-doko-ukq", staffIds: [9006] },
    { id: 3, title: "Finance Report Discussion", description: "Finance Report Discussion", dateTime: "05/20/2025 13:00:00", duration: 45, createdBy: "Self", status: "Awaited", gmeetUrl: "https://meet.google.com/tft-doko-ukq", staffIds: [9003, 9004] },
    { id: 4, title: "School Timetable Preparation", description: "School Timetable Preparation", dateTime: "05/15/2025 11:00:00", duration: 45, createdBy: "Self", status: "Awaited", gmeetUrl: "https://meet.google.com/tft-doko-ukq", staffIds: [9002, 90006, 54545454] },
    { id: 5, title: "Meeting With Staff", description: "Meeting With Staff", dateTime: "05/10/2025 02:00:00", duration: 35, createdBy: "Self", status: "Awaited", gmeetUrl: "https://meet.google.com/tft-doko-ukq", staffIds: [9002, 9003, 9004, 9005, 9006, 90006, 54545454] }
  ];

  // Staff data
  const staffMembers = [
    { id: 9002, name: "Shivam Verma", role: "Teacher" },
    { id: 9006, name: "Brandon Heart", role: "Librarian" },
    { id: 9003, name: "William Abbot", role: "Admin" },
    { id: 90006, name: "Jason Shariton", role: "Teacher" },
    { id: 9004, name: "James Deckar", role: "Accountant" },
    { id: 9005, name: "Maria Ford", role: "Receptionist" },
    { id: 54545454, name: "Albert Thomas", role: "Teacher" }
  ];

  // Status options
  const statusOptions = ["Awaited", "Cancelled", "Finished"];

  // State management
  const [meetings, setMeetings] = useState(initialMeetings);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showStaffList, setShowStaffList] = useState(false);
  const [currentMeetingStaff, setCurrentMeetingStaff] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    dateTime: "",
    duration: "",
    gmeetUrl: "https://meet.google.com/tft-doko-ukq",
    description: "",
    staffIds: []
  });
  const [editingId, setEditingId] = useState(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle staff selection
  const handleStaffSelect = (staffId) => {
    setFormData(prev => {
      if (prev.staffIds.includes(staffId)) {
        return { ...prev, staffIds: prev.staffIds.filter(id => id !== staffId) };
      } else {
        return { ...prev, staffIds: [...prev.staffIds, staffId] };
      }
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newMeeting = {
      id: editingId || Math.max(...meetings.map(m => m.id)) + 1,
      title: formData.title,
      description: formData.description,
      dateTime: formData.dateTime,
      duration: parseInt(formData.duration),
      createdBy: "Self",
      status: "Awaited",
      gmeetUrl: formData.gmeetUrl,
      staffIds: formData.staffIds
    };

    if (editingId) {
      setMeetings(meetings.map(m => m.id === editingId ? newMeeting : m));
    } else {
      setMeetings([...meetings, newMeeting]);
    }

    setShowForm(false);
    setFormData({
      title: "",
      dateTime: "",
      duration: "",
      gmeetUrl: "https://meet.google.com/tft-doko-ukq",
      description: "",
      staffIds: []
    });
    setEditingId(null);
  };

  // Handle delete
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this meeting?")) {
      setMeetings(meetings.filter(m => m.id !== id));
    }
  };

  // Handle start meeting
  const handleStartMeeting = (url) => {
    window.open(url, "_blank");
  };

  // Handle show staff
  const handleShowStaff = (staffIds) => {
    setCurrentMeetingStaff(staffMembers.filter(staff => staffIds.includes(staff.id)));
    setShowStaffList(true);
  };

  // Handle edit
  const handleEdit = (meeting) => {
    setFormData({
      title: meeting.title,
      dateTime: meeting.dateTime,
      duration: meeting.duration.toString(),
      gmeetUrl: meeting.gmeetUrl,
      description: meeting.description,
      staffIds: meeting.staffIds
    });
    setEditingId(meeting.id);
    setShowForm(true);
  };

  // Filter meetings based on search term
  const filteredMeetings = meetings.filter(meeting =>
    meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (meeting.description && meeting.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Live Meeting</h1>
        
        {/* Search and Add Button */}
        <div className="flex justify-between items-center mb-6">
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
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Live Meeting
          </button>
        </div>

        {/* Add/Edit Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
              <h2 className="text-xl font-bold mb-4">Add Live Meeting</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Date Time *</label>
                    <input
                      type="datetime-local"
                      name="dateTime"
                      value={formData.dateTime}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Duration (Minutes) *</label>
                    <input
                      type="number"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gmeet URL <span className="text-blue-600">(How To Get Gmeet URL?)</span> *
                  </label>
                  <input
                    type="url"
                    name="gmeetUrl"
                    value={formData.gmeetUrl}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                    rows="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Staff List *</label>
                  <div className="border border-gray-300 rounded p-3">
                    {staffMembers.map(staff => (
                      <div key={staff.id} className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          id={`staff-${staff.id}`}
                          checked={formData.staffIds.includes(staff.id)}
                          onChange={() => handleStaffSelect(staff.id)}
                          className="mr-2"
                        />
                        <label htmlFor={`staff-${staff.id}`}>
                          {staff.name} ({staff.role} : {staff.id})
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setFormData({
                        title: "",
                        dateTime: "",
                        duration: "",
                        gmeetUrl: "https://meet.google.com/tft-doko-ukq",
                        description: "",
                        staffIds: []
                      });
                      setEditingId(null);
                    }}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700"
                  >
                    {editingId ? 'Update' : 'Save'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Staff List Modal */}
        {showStaffList && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
              <h2 className="text-xl font-bold mb-4">Invited Staff</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentMeetingStaff.map(staff => (
                      <tr key={staff.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setShowStaffList(false)}
                  className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Meetings Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meeting Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration (Minutes)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMeetings.map(meeting => (
                <tr key={meeting.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{meeting.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{meeting.description || "-"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{meeting.dateTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{meeting.duration}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{meeting.createdBy}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <select style={{width:'100px'}}
                      value={meeting.status}
                      onChange={(e) => {
                        setMeetings(meetings.map(m => 
                          m.id === meeting.id ? { ...m, status: e.target.value } : m
                        ));
                      }}
                      className="border border-gray-300 rounded p-1"
                    >
                      {statusOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                    <div className="flex space-x-2">
  <button
    onClick={() => handleStartClass(cls.gmeetUrl)}
    className="flex items-center space-x-1 text-white p-1"
    style={{ backgroundColor: 'green', width: 'auto', padding: '4px 8px', borderRadius: '4px' }}
    title="Start Class"
  >
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="6" width="15" height="12" rx="2" ry="2" stroke="#fff" strokeWidth="2" fill="white"/>
      <polygon points="16,10 21,7 21,17 16,14" fill="#fff"/>
    </svg>
    <span>Start</span>
  </button>
</div>
<button
                        onClick={() => handleShowStaff(meeting.staffIds)}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="Invited Staff"
                      >
                        <FaUserFriends />
                      </button>
          
                      
                      <button
                        onClick={() => handleDelete(meeting.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}