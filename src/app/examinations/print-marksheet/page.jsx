"use client";
import React from "react";
import PrintForm from "./Print_Marksheet_Form/PrintMarksheetForm";
import StudentMarksList from "./Display_Marksheets_list/DisplayMarksheet";

const sampleStudents = [
  {
    admissionNo: "A001",
    name: "John Doe",
    fatherName: "Robert Doe",
    dob: "2005-06-15",
    gender: "Male",
    category: "General",
    mobile: "9876543210",
  },
  {
    admissionNo: "A002",
    name: "Jane Smith",
    fatherName: "Michael Smith",
    dob: "2006-08-22",
    gender: "Female",
    category: "OBC",
    mobile: "8765432109",
  },
  {
    admissionNo: "A003",
    name: "Emily Johnson",
    fatherName: "David Johnson",
    dob: "2004-12-05",
    gender: "Female",
    category: "SC",
    mobile: "7654321098",
  },
];

const PrintMarksheet = () => {
  return (
    <div className="bg-white shadow-md rounded-lg ml-5 mt-5">
      {/* Select Criteria Section */}
      <div className="text-gray-700 text-xl font-bold p-4 ">
        <h3>Select Criteria</h3>
      </div>
      <PrintForm />

      {/* Student List Section */}
      <div className="text-gray-700 text-xl font-bold p-4 ">
        <h3>Student List</h3>
      </div>
      <StudentMarksList students={sampleStudents} />
    </div>
  );
};

export default PrintMarksheet;
