"use client";
import { useState, ChangeEvent } from "react";

export default function ParentGuardianForm() {
  const [guardianType, setGuardianType] = useState<string>("Father");

  const handleGuardianTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGuardianType(e.target.value);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Parent Guardian Detail
      </h2>

      {/* Father Info */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6 mb-6">
        <div>
          <label
            htmlFor="fatherName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Father Name
          </label>
          <input
            type="text"
            id="fatherName"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="fatherPhone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Father Phone
          </label>
          <input
            type="tel"
            id="fatherPhone"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="fatherOccupation"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Father Occupation
          </label>
          <input
            type="text"
            id="fatherOccupation"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Father Photo (100px X 100px)
          </label>
          <div className="border border-gray-300 border-dashed rounded-md p-4 text-center bg-gray-50 cursor-pointer hover:bg-gray-100">
            <div className="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-400 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <span className="text-sm text-gray-500">
                Drag and drop a file here or click
              </span>
            </div>
            <input type="file" className="hidden" accept="image/*" />
          </div>
        </div>
      </div>

      {/* Mother Info */}
      <div className="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div>
          <label
            htmlFor="motherName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Mother Name
          </label>
          <input
            type="text"
            id="motherName"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="motherPhone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Mother Phone
          </label>
          <input
            type="tel"
            id="motherPhone"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="motherOccupation"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Mother Occupation
          </label>
          <input
            type="text"
            id="motherOccupation"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mother Photo (100px X 100px)
          </label>
          <div className="border border-gray-300 border-dashed rounded-md p-4 text-center bg-gray-50 cursor-pointer hover:bg-gray-100">
            <div className="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-400 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <span className="text-sm text-gray-500">
                Drag and drop a file here or click
              </span>
            </div>
            <input type="file" className="hidden" accept="image/*" />
          </div>
        </div>
      </div>

      {/* Guardian Type Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          If Guardian Is <span className="text-red-500">*</span>
        </label>
        <div className="flex flex-wrap gap-6">
          {["Father", "Mother", "Other"].map((type) => (
            <label key={type} className="inline-flex items-center">
              <input
                type="radio"
                name="guardianType"
                value={type}
                checked={guardianType === type}
                onChange={handleGuardianTypeChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Guardian Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div>
          <label
            htmlFor="guardianName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Guardian Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="guardianName"
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="guardianRelation"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Guardian Relation
          </label>
          <input
            type="text"
            id="guardianRelation"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Guardian Email
          </label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Guardian Photo (100px X 100px)
          </label>
          <div className="border border-gray-300 border-dashed rounded-md p-4 text-center bg-gray-50 cursor-pointer hover:bg-gray-100">
            <div className="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-400 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <span className="text-sm text-gray-500">
                Drag and drop a file here or click
              </span>
            </div>
            <input type="file" className="hidden" accept="image/*" />
          </div>
        </div>
      </div>

      {/* Guardian Contact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <label
            htmlFor="guardianPhone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Guardian Phone
          </label>
          <input
            type="tel"
            id="guardianPhone"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
