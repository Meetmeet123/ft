"use client";
import React, { useState } from 'react';
import { MdAdd, MdEdit, MdDelete } from 'react-icons/md';

const initialIncidents = [
  {
    id: 1,
    title: "Thefts",
    points: 10,
    isNegative: true,
    description: "It's important to report cases of theft on campus so that the university or school can increase security where needed. They could also consider other options to combat incidents of theft, such as lockers."
  },
  {
    id: 2,
    title: "Respect",
    points: 10,
    isNegative: true,
    description: "Respect others/property."
  },
  {
    id: 3,
    title: "Student Good Behaviour",
    points: 20,
    isNegative: false,
    description: "Smile & have a good attitude and good behaviour."
  },
  {
    id: 4,
    title: "Harassment and bullying",
    points: 10,
    isNegative: true,
    description: "If students report this type of behaviour, institutions will be able to monitor the individuals involved. They can then try to resolve the situation."
  },
  {
    id: 5,
    title: "Threats and violence",
    points: 20,
    isNegative: true,
    description: "If the university, or school, is aware of these cases, they can monitor the spaces where threats and violence occur and improve security. This ensures that the individuals implicated can face consequences for their actions."
  },
  {
    id: 6,
    title: "Cheating and plagiarism",
    points: 10,
    isNegative: true,
    description: "Cheating and plagiarism are important to report. They undermine the credibility of academics at any institution."
  },
  {
    id: 7,
    title: "Improper behaviour",
    points: 15,
    isNegative: true,
    description: "Improper behaviour could be observed in a staff member or another student. If the behaviour is threatening, concerning or inappropriate, the university or school will need to monitor the individual to ensure that the behaviour is not repetitive."
  }
];

export default function IncidentList() {
  const [incidents, setIncidents] = useState(initialIncidents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    points: '',
    isNegative: true,
    description: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Filter incidents based on search term
  const filteredIncidents = incidents.filter(incident =>
    incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    incident.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.points || !formData.description) {
      alert("Please fill all required fields");
      return;
    }

    if (formData.id) {
      // Update existing incident
      setIncidents(incidents.map(incident =>
        incident.id === formData.id ? formData : incident
      ));
    } else {
      // Add new incident
      const newIncident = {
        ...formData,
        id: Date.now(),
        points: parseInt(formData.points)
      };
      setIncidents([newIncident, ...incidents]);
    }

    // Reset form and close modal
    setFormData({
      id: null,
      title: '',
      points: '',
      isNegative: true,
      description: ''
    });
    setIsModalOpen(false);
  };

  // Handle edit
  const handleEdit = (incident) => {
    setFormData({
      id: incident.id,
      title: incident.title,
      points: incident.points.toString(),
      isNegative: incident.isNegative,
      description: incident.description
    });
    setIsModalOpen(true);
  };

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this incident?")) {
      setIncidents(incidents.filter(incident => incident.id !== id));
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Incident List</h1>
        <button style={{color:'white',backgroundColor:'black'}}
          onClick={() => {
            setFormData({
              id: null,
              title: '',
              points: '',
              isNegative: true,
              description: ''
            });
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-600"
        >
          <MdAdd />Add 
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Incident Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left border-b">Title</th>
              <th className="p-3 text-left border-b">Point</th>
              <th className="p-3 text-left border-b">Description</th>
              <th className="p-3 text-left border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredIncidents.length > 0 ? (
              filteredIncidents.map((incident) => (
                <tr key={incident.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{incident.title}</td>
                  <td className="p-3">{incident.points}</td>
                  <td className="p-3">{incident.description}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(incident)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <MdEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(incident.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-3 text-center text-gray-500">
                  No incidents found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">
                {formData.id ? "Edit Incident" : "Add Incident"}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Point <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="points"
                    value={formData.points}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="mb-4 flex items-center">
                  <input
                    type="checkbox"
                    name="isNegative"
                    id="isNegative"
                    checked={formData.isNegative}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <label htmlFor="isNegative" className="text-sm font-medium">
                    Is This Negative Incident
                  </label>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

