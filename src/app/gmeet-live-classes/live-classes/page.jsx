"use client";
import React, { useState } from 'react';
import { FaPlay, FaTrash, FaEdit, FaSearch } from 'react-icons/fa';

export default function LiveClasses() {
  // Dummy data for live classes
  const initialClasses = [
    {
      id: 1,
      title: "Social Studies Classes",
      description: "Social Studies Classes",
      dateTime: "05/30/2025 12:00:00",
      duration: 45,
      createdBy: "Joe Black (Super Admin: 9000)",
      createdFor: "Jason Shariton (Teacher: 90006)",
      classes: ["Class 5 (A)", "Class 5 (B)", "Class 5 (C)", "Class 5 (D)"],
      status: "Awaited",
      gmeetUrl: "https://meet.google.com/tft-doko-ukq"
    },
    {
      id: 2,
      title: "Mathematics Classes",
      description: "Mathematics Classes",
      dateTime: "05/26/2025 12:30:00",
      duration: 45,
      createdBy: "Joe Black (Super Admin: 9000)",
      createdFor: "Jason Shariton (Teacher: 90006)",
      classes: ["Class 5 (A)", "Class 5 (B)", "Class 5 (C)", "Class 5 (D)"],
      status: "Awaited",
      gmeetUrl: "https://meet.google.com/tft-doko-ukq"
    },
    {
      id: 3,
      title: "Online Course Class",
      description: "Online Course Class",
      dateTime: "05/20/2025 14:00:00",
      duration: 45,
      createdBy: "Joe Black (Super Admin: 9000)",
      createdFor: "Shivam Verma (Teacher: 9002)",
      classes: ["Class 5 (A)", "Class 5 (B)", "Class 5 (C)", "Class 5 (D)"],
      status: "Awaited",
      gmeetUrl: "https://meet.google.com/tft-doko-ukq"
    },
    {
      id: 4,
      title: "Hindi Grammar Chapter-10",
      description: "Hindi Grammar Chapter-10",
      dateTime: "05/15/2025 12:00:00",
      duration: 35,
      createdBy: "Joe Black (Super Admin: 9000)",
      createdFor: "Jason Shariton (Teacher: 90006)",
      classes: ["Class 5 (A)", "Class 5 (B)", "Class 5 (C)", "Class 5 (D)"],
      status: "Finished",
      gmeetUrl: "https://meet.google.com/tft-doko-ukq"
    }
  ];

  // Options for form selects
  const roles = ["Admin", "Accountant", "Teacher", "Super Admin"];
  const staffMembers = [
    "Joe Black (Super Admin: 9000)",
    "Jason Shariton (Teacher: 90006)",
    "Shivam Verma (Teacher: 9002)"
  ];
  const classOptions = ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5"];
  const sectionOptions = ["A", "B", "C", "D"];
  const statusOptions = ["Awaited", "Cancelled", "Finished"];

  // State management
  const [classes, setClasses] = useState(initialClasses);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    duration: "",
    role: "",
    staff: "",
    class: "",
    section: "",
    gmeetUrl: "",
    description: ""
  });
  const [editingId, setEditingId] = useState(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newClass = {
      id: editingId || Math.max(...classes.map(c => c.id)) + 1,
      title: formData.title,
      description: formData.description,
      dateTime: `${formData.date} 12:00:00`,
      duration: parseInt(formData.duration),
      createdBy: formData.staff,
      createdFor: formData.staff,
      classes: [`${formData.class} (${formData.section})`],
      status: "Awaited",
      gmeetUrl: formData.gmeetUrl
    };

    if (editingId) {
      setClasses(classes.map(c => c.id === editingId ? newClass : c));
    } else {
      setClasses([...classes, newClass]);
    }

    setShowForm(false);
    setFormData({
      title: "",
      date: "",
      duration: "",
      role: "",
      staff: "",
      class: "",
      section: "",
      gmeetUrl: "",
      description: ""
    });
    setEditingId(null);
  };

  // Handle delete
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this class?")) {
      setClasses(classes.filter(c => c.id !== id));
    }
  };

  // Handle start class
  const handleStartClass = (url) => {
    window.open(url, "_blank");
  };

  // Handle edit
  const handleEdit = (classItem) => {
    const classParts = classItem.classes[0].split(" ");
    setFormData({
      title: classItem.title,
      date: classItem.dateTime.split(" ")[0],
      duration: classItem.duration.toString(),
      role: "Super Admin",
      staff: classItem.createdBy,
      class: classParts[1],
      section: classParts[2].replace("(", "").replace(")", ""),
      gmeetUrl: classItem.gmeetUrl,
      description: classItem.description
    });
    setEditingId(classItem.id);
    setShowForm(true);
  };

  // Filter classes based on search term
  const filteredClasses = classes.filter(cls =>
    cls.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.createdBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.createdFor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Live Classes</h1>
        
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
          <button style={{ backgroundColor:"black",color:"white"}}
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700"
          >
            +Add 
          </button>
        </div>

        {/* Add/Edit Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
              <h2 className="text-xl font-bold mb-4">Add Live Class</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Class Title *</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Class Date *</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Class Duration (Minutes) *</label>
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select</option>
                      {roles.map(role => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Staff *</label>
                    <select
                      name="staff"
                      value={formData.staff}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select</option>
                      {staffMembers.map(staff => (
                        <option key={staff} value={staff}>{staff}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Class *</label>
                    <select
                      name="class"
                      value={formData.class}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select</option>
                      {classOptions.map(cls => (
                        <option key={cls} value={cls}>{cls}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Section *</label>
                    <select
                      name="section"
                      value={formData.section}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select</option>
                      {sectionOptions.map(section => (
                        <option key={section} value={section}>{section}</option>
                      ))}
                    </select>
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

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setFormData({
                        title: "",
                        date: "",
                        duration: "",
                        role: "",
                        staff: "",
                        class: "",
                        section: "",
                        gmeetUrl: "",
                        description: ""
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

        {/* Classes Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration (Minutes)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created For</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClasses.map(cls => (
                <tr key={cls.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cls.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{cls.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cls.dateTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cls.duration}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{cls.createdBy}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{cls.createdFor}</td>
                  <td className="px-6 py-4 text-sm text-gray-500" >
                    {cls.classes.map((c, i) => (
                      <span style={{width:'100px'}} key={i} className="block">☒ {c}</span>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <select style={{width:'100px'}}
                      value={cls.status}
                      onChange={(e) => {
                        setClasses(classes.map(c => 
                          c.id === cls.id ? { ...c, status: e.target.value } : c
                        ));
                      }}
                       className="border border-gray-300 rounded p-1"
                    >
                      {statusOptions.map(option => (
                        <option key={option} value={option} >{option}</option>
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
                        onClick={() => handleDelete(cls.id)}
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