"use client"
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';

// Type definitions
interface FormData {
  admissionNo: string;
  rollNumber: string;
  class: string;
  section: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  category: string;
  religion: string;
  caste: string;
  mobileNumber: string;
  email: string;
  admissionDate: string;
  bloodGroup: string;
  house: string;
  height: string;
  weight: string;
  measurementDate: string;
  medicalHistory: string;
  routeList: string;
  pickupPoint: string;
  feesMonth: string;
  hostel: string;
  roomNo: string;
}

interface Sibling {
  name: string;
  class: string;
  section: string;
}

interface StudentAdmissionFormProps {
  handleImportStudent: (value: boolean) => void;
}

const StudentAdmissionForm: React.FC<StudentAdmissionFormProps> = (props) => {
  // Initialize with empty values, we'll set defaults after component mounts
  const [formData, setFormData] = useState<FormData>({
    admissionNo: '',
    rollNumber: '',
    class: '',
    section: '',
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
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
    measurementDate: '',
    medicalHistory: '',
    routeList: '',
    pickupPoint: '',
    feesMonth: '',
    hostel: '',
    roomNo: ''
  });

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [siblings, setSiblings] = useState<Sibling[]>([]);
  const [isClient, setIsClient] = useState<boolean>(false);

  // Set default date values after component mounts on the client side
  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setFormData(prev => ({
      ...prev,
      admissionDate: today,
      measurementDate: today
    }));
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoFile(e.target.files[0]);
    }
  };

  const addSibling = (): void => {
    setSiblings([...siblings, { name: '', class: '', section: '' }]);
  };

  const handleSiblingChange = (index: number, field: keyof Sibling, value: string): void => {
    const updatedSiblings = [...siblings];
    updatedSiblings[index][field] = value;
    setSiblings(updatedSiblings);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Submit form logic here
    console.log(formData);
    console.log(siblings);
    console.log(photoFile);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-3 md:p-6 bg-white shadow-md rounded-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800">Student Admission</h1>
        <button 
        onClick={() => props.handleImportStudent(false)}
         className="btn btn-primary bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          Import Student
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 mb-6 gap-2">
          <div className="w-full sm:w-[calc(50%-8px)] md:w-[calc(33.33%-11px)] lg:w-[calc(25%-12px)]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Admission No <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="admissionNo"
              value={formData.admissionNo}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="w-full sm:w-[calc(50%-8px)] md:w-[calc(33.33%-11px)] lg:w-[calc(25%-12px)]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Roll Number
            </label>
            <input
              type="text"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="w-full sm:w-[calc(50%-8px)] md:w-[calc(33.33%-11px)] lg:w-[calc(25%-12px)]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Class <span className="text-red-500">*</span>
            </label>
            <select
              name="class"
              value={formData.class}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option value="1">Class 1</option>
              <option value="2">Class 2</option>
              <option value="3">Class 3</option>
              <option value="4">Class 4</option>
              <option value="5">Class 5</option>
            </select>
          </div>

          <div className="w-full sm:w-[calc(50%-8px)] md:w-[calc(33.33%-11px)] lg:w-[calc(25%-12px)]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Section <span className="text-red-500">*</span>
            </label>
            <select
              name="section"
              value={formData.section}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 lg:grid-cols-2 sm:grid-cols-1 mb-6 gap-2">
          <div className="w-full sm:w-[calc(50%-8px)] md:w-[calc(33.33%-11px)] lg:w-[calc(25%-12px)]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="w-full sm:w-[calc(50%-8px)] md:w-[calc(33.33%-11px)] lg:w-[calc(25%-12px)]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="w-full sm:w-[calc(50%-8px)] md:w-[calc(33.33%-11px)] lg:w-[calc(25%-12px)]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="w-full sm:w-[calc(50%-8px)] md:w-[calc(33.33%-11px)] lg:w-[calc(25%-12px)]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-2 mb-6">
          <div className="w-full sm:w-[calc(50%-8px)] md:w-[calc(33.33%-11px)] lg:w-[calc(20%-16px)]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option value="general">General</option>
              <option value="obc">OBC</option>
              <option value="sc">SC</option>
              <option value="st">ST</option>
            </select>
          </div>

          <div className="w-full sm:w-[calc(50%-8px)] md:w-[calc(33.33%-11px)] lg:w-[calc(20%-16px)]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Religion
            </label>
            <input
              type="text"
              name="religion"
              value={formData.religion}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="w-full sm:w-[calc(50%-8px)] md:w-[calc(33.33%-11px)] lg:w-[calc(20%-16px)]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Caste
            </label>
            <input
              type="text"
              name="caste"
              value={formData.caste}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="w-full sm:w-[calc(50%-8px)] md:w-[calc(33.33%-11px)] lg:w-[calc(20%-16px)]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number
            </label>
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="w-full sm:w-[calc(50%-8px)] md:w-[calc(33.33%-11px)] lg:w-[calc(20%-16px)]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-2 mb-6">
          <div className="w-full sm:w-[calc(50%-8px)] md:w-[calc(25%-12px)]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Admission Date
            </label>
            <input
              type="date"
              name="admissionDate"
              value={formData.admissionDate}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="w-full sm:w-[calc(50%-8px)] md:w-[calc(25%-12px)]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Student Photo (100px X 100px)
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-12 border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  <span className="ml-2 text-xs sm:text-sm text-gray-500 truncate">Upload file</span>
                </div>
                <input type="file" className="hidden" onChange={handlePhotoChange} accept="image/*" />
              </label>
            </div>
          </div>

          <div className="w-full sm:w-[calc(50%-8px)] md:w-[calc(25%-12px)]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Blood Group
            </label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          <div className="w-full sm:w-[calc(50%-8px)] md:w-[calc(25%-12px)]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              House
            </label>
            <select
              name="house"
              value={formData.house}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="yellow">Yellow</option>
            </select>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-2 mb-6">
          <div className="w-full sm:w-[calc(50%-8px)] md:w-[calc(33.33%-11px)]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Height
            </label>
            <input
              type="text"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
              placeholder="cm"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="w-full sm:w-[calc(50%-8px)] md:w-[calc(33.33%-11px)]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Weight
            </label>
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              placeholder="kg"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="w-full sm:w-[calc(100%)] md:w-[calc(33.33%-11px)] flex flex-col md:flex-row justify-between gap-4">
            <div className="flex-grow">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Measurement Date
              </label>
              <input
                type="date"
                name="measurementDate"
                value={formData.measurementDate}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button 
              type="button" 
              onClick={addSibling} 
              className="self-end mb-1 flex items-center text-blue-500 hover:text-blue-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Sibling
            </button>
          </div>
        </div>

        {/* Siblings Section - Only shown if siblings exist */}
        {siblings.length > 0 && (
          <div className="mb-6 overflow-x-auto">
            <h3 className="text-lg font-medium text-gray-700 mb-3">Siblings</h3>
            {siblings.map((sibling, index) => (
              <div key={index} className="flex flex-wrap gap-4 mb-3 p-3 bg-gray-50 rounded-md">
                <div className="w-full sm:w-[calc(33.33%-11px)]">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                  <select
                    value={sibling.name}
                    onChange={(e) => handleSiblingChange(index, 'name', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    <option value='Class 1'>Class 1</option>
                    <option value='Class 2'>Class 2</option>
                    <option value='Class 3'>Class 3</option>
                    <option value='Class 4'>Class 4</option>
                    <option value='Class 5'>Class 5</option>
                  </select>
                </div>
                <div className="w-full sm:w-[calc(33.33%-11px)]">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                  <select
                    value={sibling.class}
                    onChange={(e) => handleSiblingChange(index, 'class', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                </div>
                <div className="w-full sm:w-[calc(33.33%-11px)]">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Student</label>
                  <select
                    value={sibling.section}
                    onChange={(e) => handleSiblingChange(index, 'section', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="student1">Student 1</option>
                    <option value="student2">Student 2</option>
                    <option value="student3">Student 3</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Medical History
          </label>
          <textarea
            name="medicalHistory"
            value={formData.medicalHistory}
            onChange={handleInputChange}
            rows={3}
            className="w-full border border-gray-300 h-20 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter any medical conditions, allergies, or other relevant health information"
          ></textarea>
        </div>

        {/* Transport Section */}
        <div className="bg-gray-100 p-3 sm:p-4 rounded-md mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Transport Details</h3>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-2 mb-6">
            <div className="w-full sm:w-[calc(50%-8px)] md:w-[calc(33.33%-11px)]">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Route List
              </label>
              <select
                name="routeList"
                value={formData.routeList}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option value="route1">Route 1</option>
                <option value="route2">Route 2</option>
                <option value="route3">Route 3</option>
              </select>
            </div>

            <div className="w-full sm:w-[calc(50%-8px)] md:w-[calc(33.33%-11px)]">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pickup Point
              </label>
              <select
                name="pickupPoint"
                value={formData.pickupPoint}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option value="point1">Point 1</option>
                <option value="point2">Point 2</option>
                <option value="point3">Point 3</option>
              </select>
            </div>

            <div className="w-full sm:w-[calc(50%-8px)] md:w-[calc(33.33%-11px)]">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fees Month
              </label>
              <select
                name="feesMonth"
                value={formData.feesMonth}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Month</option>
                <option value="january">January</option>
                <option value="february">February</option>
                <option value="march">March</option>
                <option value="april">April</option>
                <option value="may">May</option>
                <option value="june">June</option>
                <option value="july">July</option>
                <option value="august">August</option>
                <option value="september">September</option>
                <option value="october">October</option>
                <option value="november">November</option>
                <option value="december">December</option>
              </select>
            </div>
          </div>
        </div>

        {/* Hostel Section */}
        <div className="bg-gray-100 p-3 sm:p-4 rounded-md mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Hostel Details</h3>
          <div className="flex flex-wrap gap-4">
            <div className="w-full sm:w-[calc(50%-8px)]">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hostel
              </label>
              <input
                type="text"
                name="hostel"
                value={formData.hostel}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="w-full sm:w-[calc(50%-8px)]">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Room No.
              </label>
              <input
                type="text"
                name="roomNo"
                value={formData.roomNo}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentAdmissionForm;