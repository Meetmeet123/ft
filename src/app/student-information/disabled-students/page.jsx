"use client"
import React, { useState } from 'react';
import { Search, List, Grid, Edit, Trash, Printer, FileText, Database, Download, Copy } from 'lucide-react';
import Link from 'next/link';

export default function DisabledStudents() {
  const [viewMode, setViewMode] = useState('list');
  const [className, setClassName] = useState('');
  const [section, setSection] = useState('');
  const [keyword, setKeyword] = useState('');
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  

  const handleCopy = () => {
    if (!students.length) return;
    const header = Object.keys(students[0]).join('\t');
    const rows = students.map((student) =>
      Object.values(student).join('\t')
    );
    const data = [header, ...rows].join('\n');
    navigator.clipboard.writeText(data);
    alert("Copied to clipboard!");
  };
  
  const handleExcelExport = () => {
    const handlePrintClick = () => {
      const header = ["Admission No", "Student Name", "Username", "Class", "Father Name", "Mobile Number", "Status"];
      const rows = filteredStudents.map((s) => [
        s.admissionNo,
        s.name,
        s.username,
        s.class,
        s.fatherName,
        s.mobileNumber,
        s.active ? "Active" : "Inactive",
      ]);
    
      const tableHTML = `
        <table border="1" style="border-collapse: collapse; width: 100%; font-family: sans-serif;">
          <thead>
            <tr>${header.map(h => `<th>${h}</th>`).join("")}</tr>
          </thead>
          <tbody>
            ${rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join("")}</tr>`).join("")}
          </tbody>
        </table>
      `;
    
      const printWindow = window.open("", "", "width=900,height=700");
      printWindow.document.write(`<html><head><title>Print Students</title></head><body>${tableHTML}</body></html>`);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    };    
  };
  
  const handlePrint = () => {
    window.print();
  };  

  return (
    <div className="bg-gray-50 p-4 w-full min-h-screen">
      <div className="max-w-7xl mx-auto bg-white rounded-md shadow-sm">
        <div className="p-6">
          <h2 className="text-xl font-medium text-gray-700 mb-6">Select Criteria</h2>
          <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-6 mb-6">
            <div className='w-full'>
              <label className="block text-sm font-medium text-gray-700 mb-1">Class <span className="text-red-500">*</span></label>
              <select onChange={(e) => setClassName(e.target.value)} value={className}
                className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Select</option>
                <option>Class 1</option>
                <option>Class 2</option>
                <option>Class 3</option>
                <option>Class 4</option>
                <option>Class 5</option>
              </select>
            </div>
            <div className='w-full'>
              <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
              <select onChange={(e) => setSection(e.target.value)} value={section}
                className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Select</option>
                <option>A</option>
                <option>B</option>
                <option>C</option>
                <option>D</option>
              </select>
              <div className="flex justify-end md:justify-start mt-6">
                <button className="btn btn-primary hover:bg-gray-600 text-white py-2 rounded-md">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </button>
              </div>
            </div>
            <div className='w-full'>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search By Keyword</label>
              <input onChange={(e) => setKeyword(e.target.value)} value={keyword} type="text"
                placeholder="Search By Student Name, Roll Number, Enroll Number, National Id, Local Id Etc."
                className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <div className="flex justify-end md:justify-start mt-6">
                <button className="btn btn-primary hover:bg-gray-600 text-white py-2 rounded-md">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </button>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-200 mb-6">
            <div className="flex space-x-4">
            <button
                className={`relative flex items-center pb-3 px-1 ${
                  viewMode === 'list'
                    ? 'after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-blue-600'
                    : ''
                }`}
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4 mr-2" />
                List View
              </button>
              <button
                  className={`relative flex items-center pb-3 px-1 ${
                    viewMode === 'details'
                      ? 'after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-blue-600'
                      : ''
                  }`}
                  onClick={() => setViewMode('details')}
                >
                  <Grid className="w-4 h-4 mr-2" />
                  Details View
            </button>
            </div>
          </div>

          {viewMode === 'list' ? (
            <div className="overflow-x-auto">
              <div className="grid lg:grid-cols-2 md:grid-cols-1 mb-4 space-x-2">
                <div className="w-full">
                  <input type='text' onChange={(e) => setSearchQuery(e.target.value)} className='w-full' placeholder='Search...' />
                </div>
                <div className='text-end' >
                  <button className="p-1 text-gray-600 hover:text-gray-800"  ><Database className="w-5 h-5" /></button>
                  <button className="p-1 text-gray-600 hover:text-gray-800" onClick={handleExcelExport} ><Download className="w-5 h-5" /></button>
                  <button className="p-1 text-gray-600 hover:text-gray-800" onClick={handleCopy} ><Copy className="w-5 h-5" /></button>
                  <button className="p-1 text-gray-600 hover:text-gray-800" onClick={handlePrint} ><Printer className="w-5 h-5" /></button>
                </div>
              </div>
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-white text-left text-gray-700">
                    <th className="py-3 px-4 font-medium">Admission No</th>
                    <th className="py-3 px-4 font-medium">Student Name</th>
                    <th className="py-3 px-4 font-medium">Roll No.</th>
                    <th className="py-3 px-4 font-medium">Class</th>
                    <th className="py-3 px-4 font-medium">Father Name</th>
                    <th className="py-3 px-4 font-medium">Date of Birth</th>
                    <th className="py-3 px-4 font-medium">Gender</th>
                    <th className="py-3 px-4 font-medium">Category</th>
                    <th className="py-3 px-4 font-medium">Mobile Number</th>
                    <th className="py-3 px-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} className="border-t border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-4">{student.id}</td>
                      <td className="py-3 px-4 text-blue-500">{student.name}</td>
                      <td className="py-3 px-4">{student.rollNo}</td>
                      <td className="py-3 px-4">{student.class}</td>
                      <td className="py-3 px-4">{student.fatherName}</td>
                      <td className="py-3 px-4">{student.dob}</td>
                      <td className="py-3 px-4">{student.gender}</td>
                      <td className="py-3 px-4">{student.category || '-'}</td>
                      <td className="py-3 px-4">{student.mobileNumber}</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button className="text-gray-600 hover:text-gray-800"><List className="w-5 h-5" /></button>
                          <button className="text-gray-600 hover:text-gray-800"><Edit className="w-5 h-5" /></button>
                          <button className="text-gray-600 hover:text-gray-800"><Trash className="w-5 h-5" /></button>
                          <button className="text-gray-600 hover:text-gray-800"><Printer className="w-5 h-5" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="space-y-6">
              {students.map((student) => (
                <div key={student.id} className="border rounded-md p-4 flex flex-col md:flex-row">
                  <div className="w-full md:w-1/6 flex items-center justify-center mb-4 md:mb-0">
                    {student.photo ? (
                      <img src={student.photo} alt={student.name} className="w-32 h-32 object-cover rounded-md border border-gray-200" />
                    ) : (
                      <div className="w-32 h-32 bg-gray-200 rounded-md border border-gray-300 flex items-center justify-center">
                        <span className="text-gray-500">No Photo</span>
                      </div>
                    )}
                  </div>
                  <div className="w-full md:w-5/6 md:pl-6">
                    <h3 className="text-xl font-medium text-blue-500">{student.name}</h3>
                    <div className="flex gap-x-6 gap-y-2 mt-3">
                      <div>
                        <p className="text-sm text-gray-600">Class: {student.class}</p>
                        <p className="text-sm text-gray-600">Admission No: {student.id}</p>
                        <p className="text-sm text-gray-600">Date of Birth: {student.dob}</p>
                        <p className="text-sm text-gray-600">Gender: {student.gender}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Local Identification Number: {student.localId || '-'}</p>
                        <p className="text-sm text-gray-600">Guardian Name: {student.fatherName}</p>
                        <p className="text-sm text-gray-600">Guardian Phone: {student.guardianPhone || '-'}</p>
                        <p className="text-sm text-gray-600">Current Address: {student.address || '-'}</p>
                      </div>
                    </div>
                    <div className="flex justify-end mt-4 space-x-2">
                      <button className="text-gray-600 hover:text-gray-800 mr-3"><List className="w-5 h-5" /></button>
                      <button className='p-1 text-gray-600 hover:text-gray-800 mr-3'><Edit className="w-5 h-5" /></button>
                      <button className="p-1 text-gray-600 hover:text-gray-800 mr-3"><span>₹</span></button>
                      <button className="text-gray-600 hover:text-gray-800 mr-3"><Printer className="w-5 h-5" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="p-2 bg-gray-50 text-right text-xs text-gray-500 border-t">
          © 2025 Mount Carmel School
        </div>
      </div>
    </div>
  );
}
