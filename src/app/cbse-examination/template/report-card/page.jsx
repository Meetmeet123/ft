"use client";
import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function ReportCard({onClose}) {
  const [student] = useState({
    template: "Monthly Test Template",
    academicSession: "2025-26",
    admissionNo: "18001",
    rollNo: "101",
    studentName: "Edward Thomas",
    dateOfBirth: "03-11-2014",
    fatherName: "Olivier Thomas",
    motherName: "Caroline Thomas",
    class: "Class 3 (A)",
    schoolName: "Mount Carmel School",
    examCenter: "25 Kings Street, CA",
    resultDeclarationDate: "26-09-2023",
    subjects: [
      {
        name: "ENGLISH (001)",
        pt1: "3.50",
        multipleAssessment1: "8.00",
        halfYearly: "48.50",
        total1: "60.00",
        pt2: "3.50",
        multipleAssessment2: "8.00", 
        annual: "28.00",
        total2: "39.50",
        marksObtained: "9.75",
        grade: "c2",
        rank: "28"
      },
      {
        name: "HINDI (001)",
        pt1: "3.50",
        multipleAssessment1: "8.00",
        halfYearly: "48.50",
        total1: "60.00",
        pt2: "3.50",
        multipleAssessment2: "8.00", 
        annual: "28.00",
        total2: "39.50",
        marksObtained: "9.75",
        grade: "c2",
        rank: "28"
      },
      {
        name: "MATHEMATICS (001)",
        pt1: "3.50",
        multipleAssessment1: "8.00",
        halfYearly: "48.50",
        total1: "60.00",
        pt2: "3.50",
        multipleAssessment2: "8.00", 
        annual: "28.00",
        total2: "39.50",
        marksObtained: "9.75",
        grade: "c2",
        rank: "28"
      },
      {
        name: "EVS (001)",
        pt1: "3.50",
        multipleAssessment1: "8.00",
        halfYearly: "48.50",
        total1: "60.00",
        pt2: "3.50",
        multipleAssessment2: "8.00", 
        annual: "28.00",
        total2: "39.50",
        marksObtained: "9.75",
        grade: "c2",
        rank: "28"
      },
      {
        name: "COMPUTER (001)",
        pt1: "3.50",
        multipleAssessment1: "8.00",
        halfYearly: "48.50",
        total1: "60.00",
        pt2: "3.50",
        multipleAssessment2: "8.00", 
        annual: "28.00",
        total2: "39.50",
        marksObtained: "9.75",
        grade: "c2",
        rank: "28"
      }
    ],
    overallMarks: "270.00/350",
    percentage: "77.14",
    overallGrade: "C+",
    overallRank: "1",
    attendance: {
      totalWorkingDays: "100",
      daysPresent: "78",
      percentage: "78.00"
    },
    classTeacherRemark: "Class teacher remark here"
  });

  return (
    <div className="fixed top-20 left-1 z-60 bg-gray-100 p-2 sm:p-4 max-h-[80vh] overflow-y-scroll w-full">
  <div className="max-w-5xl mx-auto bg-white shadow-md rounded-md">
    
    {/* Header */}
    <div className="flex justify-between items-center p-2 sm:p-4 border-b">
      <h1 className="text-base sm:text-xl font-bold">{student.template}</h1>
      <button className="text-gray-600"><X onClick={onClose} /></button>
    </div>

    {/* Report Card Header */}
    <div className="text-center p-2 sm:p-4">
      <h2 className="text-lg sm:text-xl font-bold text-gray-700">REPORT CARD</h2>
      <p className="text-sm text-gray-600">Academic Session : {student.academicSession}</p>
    </div>

    {/* Student Information */}
    <div className="relative px-2 sm:px-4 py-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Left Side */}
      <div className="flex flex-col space-y-1 text-sm">
        {[
          ["Admission No.", student.admissionNo],
          ["Student's Name", student.studentName],
          ["Father's Name", student.fatherName],
          ["Class (Section)", student.class],
          ["Exam Center", student.examCenter],
        ].map(([label, value]) => (
          <div className="flex" key={label}>
            <div className="w-36 font-medium">{label}</div>
            <div className="flex-1">: {value}</div>
          </div>
        ))}
      </div>

      {/* Right Side */}
      <div className="flex flex-col space-y-1 text-sm">
        {[
          ["Roll No.", student.rollNo],
          ["Date of Birth", student.dateOfBirth],
          ["Mother's Name", student.motherName],
          ["School Name", student.schoolName],
          ["Result Declaration Date", student.resultDeclarationDate],
        ].map(([label, value]) => (
          <div className="flex" key={label}>
            <div className="w-36 sm:w-48 font-medium">{label}</div>
            <div className="flex-1">: {value}</div>
          </div>
        ))}
      </div>

      {/* Student Photo */}
      <div className="absolute right-4 top-full sm:top-20 sm:right-8 sm:block hidden">
        <div className="border border-gray-300 w-28 h-32">
          <div className="flex items-center justify-center h-full">
            <svg className="w-20 h-24 text-gray-400" viewBox="0 0 24 24" fill="none">
              <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12Z" fill="currentColor" />
              <path d="M12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    {/* Academic Table */}
    <div className="px-2 sm:px-4 py-2 overflow-x-auto">
      <table className="min-w-full border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-50">
            <th className="border px-2 py-1 text-left">Scholastic Areas</th>
            <th className="border px-2 py-1 text-center" colSpan="4">T1</th>
            <th className="border px-2 py-1 text-center" colSpan="4">T2</th>
            <th className="border px-2 py-1 text-center" colSpan="2">T1+T2</th>
            <th className="border px-2 py-1 text-center">Rank</th>
          </tr>
          <tr className="bg-gray-50">
            {[
              "Subject",
              "PT-I(10)", "Multiple Assessment (10)", "Half Yearly(80)", "Total(100)",
              "PT-II(10)", "Multiple Assessment-2 (10)", "Annual(80)", "Total(100)",
              "Marks Obtained", "Grade", "Rank"
            ].map((head, i) => (
              <th key={i} className="border px-2 py-1 text-center">{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {student.subjects.map((subject, i) => (
            <tr key={i} className="hover:bg-gray-50">
              {[
                subject.name,
                subject.pt1, subject.multipleAssessment1, subject.halfYearly, subject.total1,
                subject.pt2, subject.multipleAssessment2, subject.annual, subject.total2,
                subject.marksObtained, subject.grade, subject.rank,
              ].map((val, j) => (
                <td key={j} className="border px-2 py-1 text-center">{val}</td>
              ))}
            </tr>
          ))}
          <tr className="bg-gray-50">
            <td className="border px-2 py-1 text-left" colSpan="5">Overall Marks: {student.overallMarks}</td>
            <td className="border px-2 py-1 text-center" colSpan="4">Percentage: {student.percentage}</td>
            <td className="border px-2 py-1 text-center" colSpan="2">Grade: {student.overallGrade}</td>
            <td className="border px-2 py-1 text-center">Rank: {student.overallRank}</td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* Attendance */}
    <div className="px-2 sm:px-4 py-2 overflow-x-auto">
      <table className="min-w-full border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-50">
            {["Attendance Overall", "Total Working Days", "Days Present", "Attendance Percentage"].map((val, i) => (
              <th key={i} className="border px-2 py-2 text-center">{val}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-2 py-1 text-center"> </td>
            <td className="border px-2 py-1 text-center">{student.attendance.totalWorkingDays}</td>
            <td className="border px-2 py-1 text-center">{student.attendance.daysPresent}</td>
            <td className="border px-2 py-1 text-center">{student.attendance.percentage}</td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* Teacher Remark */}
    <div className="px-2 sm:px-4 py-4 text-sm">
      <p><span className="font-medium">Class Teacher Remark:</span> {student.classTeacherRemark}</p>
    </div>

    {/* Instructions */}
    <div className="px-2 sm:px-4 py-2">
      <h3 className="text-center font-medium mb-2 text-sm">Instructions</h3>
      <p className="text-xs sm:text-sm">
        Grading Scale: A+ (100% - 90%), B+ (80% - 89.99%), C+ (50% - 79.99%), D (40% - 49.99%), E (0% - 39.99%)
      </p>
    </div>

    {/* Footer */}
    <div className="px-2 sm:px-4 py-2 text-right text-xs text-gray-500">
      © 2025
    </div>

  </div>
</div>
  );
}