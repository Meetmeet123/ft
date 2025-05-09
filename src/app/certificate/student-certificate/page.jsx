"use client";
import { useState } from 'react';

export default function CertificateManagement() {
  // Dummy data - EXACTLY AS YOU PROVIDED
  const initialCertificates = [
    {
      id: 1,
      certificateName: "Sample Transfer Certificate",
      backgroundImage: "/cert-bg.jpg",
      headerLeftText: "",
      headerCenterText: "",
      headerRightText: "",
      bodyText: "This is to certify that [name], son/daughter of [father_name], was a student of our school from [admission_date] to [created_at].",
      footerLeftText: "",
      footerCenterText: "",
      footerRightText: "",
      headerHeight: "100px",
      footerHeight: "80px",
      bodyHeight: "400px",
      bodyWidth: "800px",
      includeStudentPhoto: false,
      photoHeight: "100px"
    }
  ];

  // State - EXACTLY AS YOU PROVIDED
  const [certificates, setCertificates] = useState(initialCertificates);
  const [formData, setFormData] = useState({
    id: null,
    certificateName: '',
    headerLeftText: '',
    headerCenterText: '',
    headerRightText: '',
    bodyText: '',
    footerLeftText: '',
    footerCenterText: '',
    footerRightText: '',
    headerHeight: '100px',
    footerHeight: '80px',
    bodyHeight: '400px',
    bodyWidth: '800px',
    includeStudentPhoto: false,
    photoHeight: '100px',
    backgroundImage: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  
  // NEW STATE FOR VIEW
  const [viewCertificate, setViewCertificate] = useState(null);

  // Filter certificates based on search - EXACTLY AS YOU PROVIDED
  const filteredCertificates = certificates.filter(certificate =>
    certificate.certificateName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form input changes - EXACTLY AS YOU PROVIDED
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle form submission - EXACTLY AS YOU PROVIDED
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.id) {
      setCertificates(certificates.map(certificate =>
        certificate.id === formData.id ? formData : certificate
      ));
    } else {
      const newCertificate = {
        ...formData,
        id: certificates.length + 1
      };
      setCertificates([...certificates, newCertificate]);
    }
    resetForm();
  };

  // Edit certificate - EXACTLY AS YOU PROVIDED
  const handleEdit = (certificate) => {
    setFormData(certificate);
  };

  // NEW FUNCTION: Handle view certificate
  const handleView = (certificate) => {
    setViewCertificate(certificate);
  };

  // Delete certificate - EXACTLY AS YOU PROVIDED
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      setCertificates(certificates.filter(certificate => certificate.id !== id));
      if (formData.id === id) {
        resetForm();
      }
    }
  };

  // Reset form - EXACTLY AS YOU PROVIDED
  const resetForm = () => {
    setFormData({
      id: null,
      certificateName: '',
      headerLeftText: '',
      headerCenterText: '',
      headerRightText: '',
      bodyText: '',
      footerLeftText: '',
      footerCenterText: '',
      footerRightText: '',
      headerHeight: '100px',
      footerHeight: '80px',
      bodyHeight: '400px',
      bodyWidth: '800px',
      includeStudentPhoto: false,
      photoHeight: '100px',
      backgroundImage: ''
    });
  };

  // NEW FUNCTION: Replace placeholders with sample data
  const renderCertificateText = (text) => {
    const sampleData = {
      name: "John Doe",
      father_name: "Mr. Doe",
      admission_date: "01/04/2020",
      created_at: "30/03/2024",
      // Add other placeholders if needed
    };

    return text.replace(/\[(\w+)\]/g, (match, p1) => sampleData[p1] || match);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Student Certificate Management</h1>

      {/* NEW: View Mode */}
      {viewCertificate ? (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Certificate Preview</h2>
            <button
              onClick={() => setViewCertificate(null)}
              className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Back to List
            </button>
          </div>
          
          {/* Certificate Preview - MATCHING YOUR SCREENSHOT */}
          <div className="border-2 border-gray-300 rounded-lg p-8" style={{ width: viewCertificate.bodyWidth }}>
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold"># Mount Carmel School</h1>
              <p className="text-sm">23, Kings Street, CA, Phone: 0916-6766-144</p>
            </div>
            
            <div className="border-t border-b border-gray-300 py-2 my-2"></div>
            
            {/* Reference and Date */}
            <div className="flex justify-between mb-4">
              <p className="font-semibold">Refl. No 1111</p>
              <p>Date: 10/01/2024</p>
            </div>
            
            {/* Body */}
            <p className="mb-2">To Whomever It May Concern</p>
            
            <div className="my-4">
              <p>This is certify that John Doe has born on 15-05-2005 and have following details</p>
              <p>Present Address: 123 Main St, City</p>
              <p>Guardian: Mr. Smith</p>
              <p>Admission No: STU2023001</p>
              <p>Roll No: 25</p>
              <p>Class: 10th Section: A</p>
              <p>Gender: Male</p>
              <p>Admission Date: 01-04-2018</p>
              <p>Category: General</p>
              <p>Cast: None</p>
              <p>Father Name: Mr. Doe</p>
              <p>Mother Name: Mrs. Doe</p>
              <p>Religion: Christian</p>
              <p>Email: john.doe@example.com</p>
              <p>Phone: 1234567890</p>
              <p>We wish best of luck for future endeavors.</p>
            </div>
            
            <div className="border-t border-b border-gray-300 py-2 my-2"></div>
            
            {/* Footer */}
            <div className="grid grid-cols-3 mt-6">
              <div className="text-center">
                <p className="font-semibold">admin</p>
              </div>
              <div className="text-center">
                <p className="font-semibold">admin</p>
              </div>
              <div className="text-center">
                <p className="font-semibold">principal</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Form Section - EXACTLY AS YOU PROVIDED */}
          <div className="lg:w-1/2 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              {formData.id ? 'Edit Certificate' : 'Add Student Certificate'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Certificate Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="certificateName"
                className="w-full p-2 border rounded-lg"
                value={formData.certificateName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Header Left Text
                </label>
                <input
                  type="text"
                  name="headerLeftText"
                  className="w-full p-2 border rounded-lg"
                  value={formData.headerLeftText}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Header Center Text
                </label>
                <input
                  type="text"
                  name="headerCenterText"
                  className="w-full p-2 border rounded-lg"
                  value={formData.headerCenterText}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Header Right Text
                </label>
                <input
                  type="text"
                  name="headerRightText"
                  className="w-full p-2 border rounded-lg"
                  value={formData.headerRightText}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Body Text <span className="text-red-500">*</span>
              </label>
              <textarea
                name="bodyText"
                className="w-full p-2 border rounded-lg"
                rows="5"
                value={formData.bodyText}
                onChange={handleInputChange}
                required
              ></textarea>
              <p className="text-xs text-gray-500 mt-1">
                Available placeholders: [name], [dob], [present_address], [guardian], [created_at], 
                [admission_no], [roll_no], [class], [section], [gender], [admission_date], 
                [category], [cast], [father_name], [mother_name], [religion], [email], [phone], [Medical]
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Footer Left Text
                </label>
                <input
                  type="text"
                  name="footerLeftText"
                  className="w-full p-2 border rounded-lg"
                  value={formData.footerLeftText}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Footer Center Text
                </label>
                <input
                  type="text"
                  name="footerCenterText"
                  className="w-full p-2 border rounded-lg"
                  value={formData.footerCenterText}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Footer Right Text
                </label>
                <input
                  type="text"
                  name="footerRightText"
                  className="w-full p-2 border rounded-lg"
                  value={formData.footerRightText}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-lg font-medium mb-3">Certificate Design</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Header Height
                  </label>
                  <input
                    type="text"
                    name="headerHeight"
                    className="w-full p-2 border rounded-lg"
                    value={formData.headerHeight}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Footer Height
                  </label>
                  <input
                    type="text"
                    name="footerHeight"
                    className="w-full p-2 border rounded-lg"
                    value={formData.footerHeight}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Body Height
                  </label>
                  <input
                    type="text"
                    name="bodyHeight"
                    className="w-full p-2 border rounded-lg"
                    value={formData.bodyHeight}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Body Width
                  </label>
                  <input
                    type="text"
                    name="bodyWidth"
                    className="w-full p-2 border rounded-lg"
                    value={formData.bodyWidth}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="includeStudentPhoto"
                  name="includeStudentPhoto"
                  className="mr-2"
                  checked={formData.includeStudentPhoto}
                  onChange={handleInputChange}
                />
                <label htmlFor="includeStudentPhoto" className="text-sm font-medium text-gray-700">
                  Student Photo
                </label>
              </div>
              
              {formData.includeStudentPhoto && (
                <div className="ml-6 mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Photo Height
                  </label>
                  <input
                    type="text"
                    name="photoHeight"
                    className="w-full p-2 border rounded-lg"
                    value={formData.photoHeight}
                    onChange={handleInputChange}
                  />
                </div>
              )}
            </div>

            <div className="border-t pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Background Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <p className="text-gray-500">Drag and drop a file here or click</p>
                <input
                  type="file"
                  className="hidden"
                  id="backgroundImage"
                  name="backgroundImage"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFormData({
                          ...formData,
                          backgroundImage: reader.result
                        });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <label
                  htmlFor="backgroundImage"
                  className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
                >
                  Select Image
                </label>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              {formData.id && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 mr-3"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {formData.id ? 'Update' : 'Save'}
              </button>
            </div>
            </form>
          </div>

          {/* Table Section - WITH ADDED VIEW BUTTON */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Student Certificate List</h2>
              
              {/* Search - EXACTLY AS YOU PROVIDED */}
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border rounded-lg w-full"
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

              {filteredCertificates.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certificate Name</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Background Image</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredCertificates.map((certificate) => (
                        <tr key={certificate.id}>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{certificate.certificateName}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                            {certificate.backgroundImage && (
                              <div className="h-10 w-16 bg-gray-200 rounded overflow-hidden">
                                <img 
                                  src={certificate.backgroundImage} 
                                  alt="Certificate BG" 
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            )}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                            {/* ADDED VIEW BUTTON */}
                            <button
                              onClick={() => handleView(certificate)}
                              className="text-green-600 hover:text-green-900 mr-3"
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleEdit(certificate)}
                              className="text-blue-600 hover:text-blue-900 mr-3"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(certificate.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="px-4 py-3 bg-gray-50 text-right text-sm text-gray-500">
                    Records: 1 to {filteredCertificates.length} of {filteredCertificates.length}
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                  <p className="text-gray-500 mb-2">No certificates found</p>
                  <p className="text-gray-400 text-sm">
                    {searchTerm ? 'Try a different search' : 'Add a new certificate to get started'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


