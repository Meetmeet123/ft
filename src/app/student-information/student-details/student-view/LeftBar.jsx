"use client";
import React from "react";
import Image from "next/image";
import BarCode from "./assets/BarCode.png"; // Make sure this path is correct
import QRCode from "./assets/QRCode.png";   // Make sure this path is correct

function LeftBar() {
  const studentData = {
    name: "Nishant Sindhu",
    admissionNo: "120028",
    rollNumber: "100028",
    class: "Class 1 (2025-26)",
    section: "B",
    gender: "Male",
    rte: "No",
    behaviorScore: "10",
  };

  return (
    <div className="lg:w-1/4">
      <div className="bg-white rounded-md shadow-sm p-4 mb-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-semibold">{studentData.name}</h2>
            <p className="text-sm text-gray-500">
              Admission No:{" "}
              <span className="text-blue-500">{studentData.admissionNo}</span>
            </p>
            <p className="text-sm text-gray-500">
              Roll Number:{" "}
              <span className="text-blue-500">{studentData.rollNumber}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-md shadow-sm p-4">
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Class</span>
            <span className="text-blue-500">{studentData.class}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Section</span>
            <span className="text-blue-500">{studentData.section}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Gender</span>
            <span className="text-blue-500">{studentData.gender}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">RTE</span>
            <span className="text-blue-500">{studentData.rte}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Barcode</span>
            <div className="w-32 h-8 relative bg-gray-200">
              <Image
                src={BarCode}
                alt="Barcode"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">QR Code</span>
            <div className="w-16 h-16 relative bg-gray-200">
              <Image
                src={QRCode}
                alt="QR Code"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Behaviour Score</span>
            <span className="text-blue-500">{studentData.behaviorScore}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftBar;
