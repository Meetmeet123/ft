"use client";
import { useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';

interface FormData {
  guardianType: 'Father' | 'Mother' | 'Other';
  fatherName: string;
  fatherPhone: string;
  fatherOccupation: string;
  fatherPhoto: File | null;
  motherName: string;
  motherPhone: string;
  motherOccupation: string;
  motherPhoto: File | null;
  guardianName: string;
  guardianRelation: string;
  guardianEmail: string;
  guardianPhoto: File | null;
  guardianPhone: string;
  guardianOccupation: string;
  guardianAddress: string;
}

interface ParentInfoProps {
  initialData?: Partial<FormData>;
  onSubmit?: (data: FormData) => void;
}

const ParentInfo: React.FC<ParentInfoProps> = () => {
  const [formData, setFormData] = useState<FormData>({
    guardianType: 'Father',
    fatherName: '',
    fatherPhone: '',
    fatherOccupation: '',
    fatherPhoto: null,
    motherName: '',
    motherPhone: '',
    motherOccupation: '',
    motherPhoto: null,
    guardianName: '',
    guardianRelation: '',
    guardianEmail: '',
    guardianPhoto: null,
    guardianPhone: '',
    guardianOccupation: '',
    guardianAddress: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (fieldName: keyof FormData) => (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        [fieldName]: e.target.files![0]
      }));
    }
  };

  const handleGuardianTypeChange = (value: 'Father' | 'Mother' | 'Other') => {
    setFormData(prev => ({
      ...prev,
      guardianType: value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {

  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Parent Guardian Detail</h2>

      {/* <form onSubmit={handleSubmit}> */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6 mb-6">
          <div>
            <label htmlFor="fatherName" className="block text-sm font-medium text-gray-700 mb-1">
              Father Name
            </label>
            <input
              type="text"
              id="fatherName"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="fatherPhone" className="block text-sm font-medium text-gray-700 mb-1">
              Father Phone
            </label>
            <input
              type="tel"
              id="fatherPhone"
              name="fatherPhone"
              value={formData.fatherPhone}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="fatherOccupation" className="block text-sm font-medium text-gray-700 mb-1">
              Father Occupation
            </label>
            <input
              type="text"
              id="fatherOccupation"
              name="fatherOccupation"
              value={formData.fatherOccupation}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Father Photo (100px X 100px)
            </label>
            <div className="border border-gray-300 border-dashed rounded-md p-4 text-center bg-gray-50 cursor-pointer hover:bg-gray-100">
              <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span className="text-sm text-gray-500">Drag and drop a file here or click</span>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange('fatherPhoto')}
              />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6 mb-6">
          <div>
            <label htmlFor="motherName" className="block text-sm font-medium text-gray-700 mb-1">
              Mother Name
            </label>
            <input
              type="text"
              id="motherName"
              name="motherName"
              value={formData.motherName}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="motherPhone" className="block text-sm font-medium text-gray-700 mb-1">
              Mother Phone
            </label>
            <input
              type="tel"
              id="motherPhone"
              name="motherPhone"
              value={formData.motherPhone}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="motherOccupation" className="block text-sm font-medium text-gray-700 mb-1">
              Mother Occupation
            </label>
            <input
              type="text"
              id="motherOccupation"
              name="motherOccupation"
              value={formData.motherOccupation}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mother Photo (100px X 100px)
            </label>
            <div className="border border-gray-300 border-dashed rounded-md p-4 text-center bg-gray-50 cursor-pointer hover:bg-gray-100">
              <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span className="text-sm text-gray-500">Drag and drop a file here or click</span>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange('motherPhoto')}
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            If Guardian Is <span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-6">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="guardianType"
                value="Father"
                checked={formData.guardianType === 'Father'}
                onChange={() => handleGuardianTypeChange('Father')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Father</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="guardianType"
                value="Mother"
                checked={formData.guardianType === 'Mother'}
                onChange={() => handleGuardianTypeChange('Mother')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Mother</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="guardianType"
                value="Other"
                checked={formData.guardianType === 'Other'}
                onChange={() => handleGuardianTypeChange('Other')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Other</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6 mb-6">
          <div className='w-full'>
            <label htmlFor="guardianName" className="block text-sm font-medium text-gray-700 mb-1">
              Guardian Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="guardianName"
              name="guardianName"
              value={formData.guardianName}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="guardianRelation" className="block text-sm font-medium text-gray-700 mb-1">
              Guardian Relation
            </label>
            <input
              type="text"
              id="guardianRelation"
              name="guardianRelation"
              value={formData.guardianRelation}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="guardianEmail" className="block text-sm font-medium text-gray-700 mb-1">
              Guardian Email
            </label>
            <input
              type="email"
              id="guardianEmail"
              name="guardianEmail"
              value={formData.guardianEmail}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Guardian Photo (100px X 100px)
            </label>
            <div className="border border-gray-300 border-dashed rounded-md p-4 text-center bg-gray-50 cursor-pointer hover:bg-gray-100">
              <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span className="text-sm text-gray-500">Drag and drop a file here or click</span>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange('guardianPhoto')}
              />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
          <div>
            <label htmlFor="guardianPhone" className="block text-sm font-medium text-gray-700 mb-1">
              Guardian Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="guardianPhone"
              name="guardianPhone"
              value={formData.guardianPhone}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="guardianOccupation" className="block text-sm font-medium text-gray-700 mb-1">
              Guardian Occupation
            </label>
            <input
              type="text"
              id="guardianOccupation"
              name="guardianOccupation"
              value={formData.guardianOccupation}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="guardianAddress" className="block text-sm font-medium text-gray-700 mb-1">
              Guardian Address
            </label>
            <textarea
              id="guardianAddress"
              name="guardianAddress"
              value={formData.guardianAddress}
              onChange={handleInputChange}
              rows={2}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
      {/* </form> */}
    </div>
  );
};

export default ParentInfo;