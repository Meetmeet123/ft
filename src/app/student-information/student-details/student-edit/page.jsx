"use client";
import React, { useState, useEffect } from 'react';
import { Edit, Upload } from 'lucide-react';
import FeesDetails from './FeesDetails'; // Assuming this is the correct path to your FeesDetails component
import FeesDiscount from './FeesDiscount'; // Assuming this is the correct path to your FeesDiscount component
import OtherDetails from './OtherDetails'; // Assuming this is the correct path to your OtherDetails component
import ParentGuardianForm from './ParentInfo';

const StudentEditForm = () => {
  const [student, setStudent] = useState({
    id: '',
    rollNo: '',
    class: '',
    section: '',
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    category: '',
    religion: '',
    caste: '',
    mobileNumber: '',
    email: '',
    admissionDate: '',
    bloodGroup: '',
    house: '',
    height: '',
    weight: '',
    measurementDate: ''
  });

  useEffect(() => {
    // Manually extract query parameters from URL
    const params = new URLSearchParams(window.location.search);
    const studentData = {};
    
    params.forEach((value, key) => {
      studentData[key] = value;  // Collect all query params into an object
    });

    // Set the student data to state
    setStudent(studentData);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission - API call to update student data
    // console.log('Submitting student data:', student);
  };

  const handleAddSibling = () => {
    // console.log('Add sibling clicked');
    // Implement sibling addition logic here
  };

  return (
    <div className="font-sans">
      <div className="border-t-2 border-gray-200">
        <div className="bg-gray-100 py-3 px-4 border-b border-gray-300">
          <h2 className="text-base font-bold">Edit Student</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white p-4">
            <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4">
              <div>
                <label className="block text-sm mb-1">
                  Admission No <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="id"
                  value={student.id }
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1">
                  Roll Number
                </label>
                <input
                  type="text"
                  name="rollNo"
                  value={student.rollNo}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">
                  Class <span className="text-red-500">*</span>
                </label>
                <select
                  name="class"
                  value={student.class}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2 text-sm appearance-none bg-white"
                  required
                >
                  <option value="Class 1">Class 1</option>
                  <option value="Class 2">Class 2</option>
                  <option value="Class 3">Class 3</option>
                  <option value="Class 4">Class 4</option>
                  <option value="Class 5">Class 5</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1">
                  Section <span className="text-red-500">*</span>
                </label>
                <select
                  name="section"
                  value={student.section || ''}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2 text-sm appearance-none bg-white"
                  required
                >
                  <option value="">Select</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={student.firstName || ''}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={student.lastName || ''}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  name="gender"
                  value={student.gender || ''}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2 text-sm appearance-none bg-white"
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="dob"
                  value={student.dob || ''}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={student.category || ''}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2 text-sm appearance-none bg-white"
                >
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1">
                  Religion
                </label>
                <input
                  type="text"
                  name="religion"
                  value={student.religion || ''}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">
                  Caste
                </label>
                <input
                  type="text"
                  name="caste"
                  value={student.caste || ''}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="mobileNumber"
                  value={student.mobileNumber || ''}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">
                  Email
                </label>
                <input
                  // type="email"
                  // name="email"
                  value={student.email || ''}
                  onChange={()=>handleChange}
                  className="w-full border border-gray-300 rounded p-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">
                  Admission Date
                </label>
                <input
                  type="text"
                  name="admissionDate"
                  value={student.admissionDate || ''}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">
                  Student Photo (100px X 100px)
                </label>
                <div className="w-full border border-gray-300 rounded flex items-center justify-center bg-gray-50 p-2 h-10">
                  <div className="flex items-center">
                    <Upload className="w-4 h-4 text-gray-500 mr-1" />
                    <span className="text-xs text-gray-500">Drag and drop a file here or click</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1">
                  Blood Group
                </label>
                <select
                  name="bloodGroup"
                  value={student.bloodGroup || ''}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2 text-sm appearance-none bg-white"
                >
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1">
                  House
                </label>
                <select
                  name="house"
                  value={student.house || ''}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2 text-sm appearance-none bg-white"
                >
                  <option value="Red">Red</option>
                  <option value="Blue">Blue</option>
                  <option value="Green">Green</option>
                  <option value="Yellow">Yellow</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1">
                  Height
                </label>
                <input
                  type="text"
                  name="height"
                  value={student.height || ''}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">
                  Weight
                </label>
                <input
                  type="text"
                  name="weight"
                  value={student.weight || ''}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">
                  Measurement Date
                </label>
                <input
                  type="text"
                  name="measurementDate"
                  value={student.measurementDate || ''}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2 text-sm"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={handleAddSibling}
                  className="text-blue-500 flex items-center text-sm"
                >
                  <span className="text-blue-500 text-lg mr-1">+</span> Add Sibling
                </button>
              </div>
            </div>

            {/* Medical History */}
            <div className="mt-4">
              <label className="block text-sm mb-1">
                Medical History
              </label>
              <textarea
                name="medicalHistory"
                value={student.medicalHistory || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2 text-sm h-24"
              />
            </div>
          </div>

          {/* Transport Details */}
          <div className="mt-6">
            <div className="bg-gray-100 py-3 px-4 border-y border-gray-300">
              <h2 className="text-base font-bold">Transport Details</h2>
            </div>

            <div className="bg-white p-4">
              <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm mb-1">
                    Route List
                  </label>
                  <select
                    name="route"
                    value={student.route || ''}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded p-2 text-sm appearance-none bg-white"
                  >
                    <option value="VH1001">VH1001</option>
                    <option value="VH1002">VH1002</option>
                    <option value="VH1003">VH1003</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-1">
                    Pickup Point
                  </label>
                  <select
                    name="pickupPoint"
                    value={student.pickupPoint || ''}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded p-2 text-sm appearance-none bg-white"
                  >
                    <option value="Brooklyn North">Brooklyn North</option>
                    <option value="Manhattan South">Manhattan South</option>
                    <option value="Queens West">Queens West</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-1">
                    Month
                  </label>
                  <div className="relative">
                    <select
                      name="transportMonth"
                      value={student.transportMonth || ''}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded p-2 text-sm appearance-none bg-white pr-8"
                    >
                      <option value="12">input</option>
                      <option value="6">6 months</option>
                      <option value="3">3 months</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <FeesDetails/>
          <FeesDiscount/>
          <ParentGuardianForm/>
          <OtherDetails/>

          {/* Submit Button */}
          <div className="mt-6 p-4 flex justify-end">
            <button
              type="submit"
              className="btn btn-primary bg-blue-500 text-white py-2 px-4 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentEditForm;