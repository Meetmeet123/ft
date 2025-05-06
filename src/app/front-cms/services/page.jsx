"use client";
import { useState } from 'react';
import { FiEdit2, FiX } from 'react-icons/fi';

export default function CertificationManagement() {
  // Dummy data
  const initialCertifications = [
    {
      id: 1,
      title: "Certification",
      description: "Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.",
      icon: "flaticon-diploma",
      sectionClass: "by-primary"
    },
    {
      id: 2,
      title: "Book & Library",
      description: "Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.",
      icon: "flaticon-books",
      sectionClass: "by-tertiary"
    },
    {
      id: 3,
      title: "Special Education",
      description: "Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.",
      icon: "flaticon-reading",
      sectionClass: "by-fifth"
    },
    {
      id: 4,
      title: "Certified Teachers",
      description: "Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.",
      icon: "flaticon-teacher",
      sectionClass: "by-quarternary"
    }
  ];

  // State
  const [certifications, setCertifications] = useState(initialCertifications);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    description: '',
    icon: '',
    sectionClass: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Filter certifications based on search
  const filteredCertifications = certifications.filter(cert =>
    cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      // Update existing certification
      setCertifications(certifications.map(cert =>
        cert.id === formData.id ? formData : cert
      ));
    } else {
      // Add new certification
      const newCert = {
        ...formData,
        id: certifications.length + 1
      };
      setCertifications([...certifications, newCert]);
    }
    setShowForm(false);
    resetForm();
  };

  // Edit certification
  const handleEdit = (cert) => {
    setFormData(cert);
    setShowForm(true);
  };

  // Delete certification
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this certification?')) {
      setCertifications(certifications.filter(cert => cert.id !== id));
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      id: null,
      title: '',
      description: '',
      icon: '',
      sectionClass: ''
    });
  };

  // Available icons and classes
  const icons = [
    { value: 'flaticon-diploma', label: 'Diploma' },
    { value: 'flaticon-books', label: 'Books' },
    { value: 'flaticon-reading', label: 'Reading' },
    { value: 'flaticon-teacher', label: 'Teacher' }
  ];

  const sectionClasses = [
    { value: 'by-primary', label: 'Primary' },
    { value: 'by-tertiary', label: 'Tertiary' },
    { value: 'by-fifth', label: 'Fifth' },
    { value: 'by-quarternary', label: 'Quaternary' }
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Certification Management</h1>

      {!showForm ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border rounded-lg w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <button style={{backgroundColor:"black",color:"white"}}
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-black px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              + Add 
            </button>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Icon</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Section Class</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCertifications.map((cert) => (
                  <tr key={cert.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cert.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">{cert.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span className={cert.icon}></span> {cert.icon.replace('flation-', '')}
              </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cert.sectionClass}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => handleEdit(cert)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                                               <FiEdit2 size={16} />

                      </button>
                      <button
                        onClick={() => handleDelete(cert.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                                            <FiX size={16} />
                      
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-6 py-3 bg-gray-50 text-right text-sm text-gray-500">
              Records: 1 to {filteredCertifications.length} of {filteredCertifications.length}
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            {formData.id ? 'Edit Certification' : 'Add Certification'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  name="title"
                  className="w-full p-2 border rounded-lg"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  name="description"
                  className="w-full p-2 border rounded-lg"
                  rows="3"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Icon *</label>
                <select
                  name="icon"
                  className="w-full p-2 border rounded-lg"
                  value={formData.icon}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Icon</option>
                  {icons.map((icon) => (
                    <option key={icon.value} value={icon.value}>
                      {icon.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Section Class *</label>
                <select
                  name="sectionClass"
                  className="w-full p-2 border rounded-lg"
                  value={formData.sectionClass}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Class</option>
                  {sectionClasses.map((cls) => (
                    <option key={cls.value} value={cls.value}>
                      {cls.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              
              <button
                type="submit" style={{backgroundColor:"black",color:"white"}}
                className="px-4 py-2 bg-blue-600 text-black rounded-lg hover:bg-blue-700"
              >
                {formData.id ? 'Update' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}