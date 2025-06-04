"use client"
import { useState } from 'react';
import { Search, List, Grid, Edit, Trash, Printer, FileText, Database, Download, Copy } from 'lucide-react';
import Link from 'next/link';

// Type definitions
interface Student {
  id: string;
  name: string;
  rollNo: string;
  class: string;
  fatherName: string;
  dob: string;
  gender: string;
  category?: string;
  mobileNumber: string;
  photo?: string;
  localId?: string;
  guardianPhone?: string;
  address?: string;
  username?: string;
  admissionNo?: string;
  active?: boolean;
}

type ViewMode = 'list' | 'details';

export default function DisabledStudents() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [className, setClassName] = useState<string>('');
  const [section, setSection] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');
  const [students, setStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter students based on search query
  const filteredStudents = students.filter((student: Student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.rollNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopy = (): void => {
    if (!students.length) return;
    
    const header = Object.keys(students[0]).join('\t');
    const rows = students.map((student: Student) =>
      Object.values(student).join('\t')
    );
    const data = [header, ...rows].join('\n');
    
    navigator.clipboard.writeText(data).then(() => {
      alert("Copied to clipboard!");
    }).catch((err) => {
      console.error('Failed to copy: ', err);
    });
  };
  
  const handleExcelExport = (): void => {
    // Excel export functionality would go here
    console.log('Excel export functionality to be implemented');
  };

  const handlePrintClick = (): void => {
    const header = ["Admission No", "Student Name", "Username", "Class", "Father Name", "Mobile Number", "Status"];
    const rows = filteredStudents.map((s: Student) => [
      s.admissionNo || s.id,
      s.name,
      s.username || '-',
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
    if (printWindow) {
      printWindow.document.write(`<html><head><title>Print Students</title></head><body>${tableHTML}</body></html>`);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  };
  
  const handlePrint = (): void => {
    window.print();
  };

  const handleSearch = (): void => {
    // Search functionality would go here
    console.log('Search with:', { className, section, keyword });
  };

  return (
    <div className="bg-gray-50 p-4 w-full min-h-screen">
      <div className="max-w-7xl mx-auto bg-white rounded-md shadow-sm">
        <div className="p-6">
          <h2 className="text-xl font-medium text-gray-700 mb-6">Select Criteria</h2>
          <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-6 mb-6">
            <div className='w-full'>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Class <span className="text-red-500">*</span>
              </label>
              <select 
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setClassName(e.target.value)} 
                value={className}
                className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option value="Class 1">Class 1</option>
                <option value="Class 2">Class 2</option>
                <option value="Class 3">Class 3</option>
                <option value="Class 4">Class 4</option>
                <option value="Class 5">Class 5</option>
              </select>
            </div>
            <div className='w-full'>
              <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
              <select 
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSection(e.target.value)} 
                value={section}
                className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
              <div className="flex justify-end md:justify-start mt-6">
                <button 
                  onClick={handleSearch}
                  className="btn btn-primary hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </button>
              </div>
            </div>
            <div className='w-full'>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search By Keyword</label>
              <input 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)} 
                value={keyword} 
                type="text"
                placeholder="Search By Student Name, Roll Number, Enroll Number, National Id, Local Id Etc."
                className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
              <div className="flex justify-end md:justify-start mt-6">
                <button 
                  onClick={handleSearch}
                  className="btn btn-primary hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center"
                >
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
                  <input 
                    type='text' 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)} 
                    className='w-full border border-gray-300 rounded-md py-2 px-3' 
                    placeholder='Search...' 
                    value={searchQuery}
                  />
                </div>
                <div className='text-end'>
                  <button className="p-1 text-gray-600 hover:text-gray-800">
                    <Database className="w-5 h-5" />
                  </button>
                  <button className="p-1 text-gray-600 hover:text-gray-800" onClick={handleExcelExport}>
                    <Download className="w-5 h-5" />
                  </button>
                  <button className="p-1 text-gray-600 hover:text-gray-800" onClick={handleCopy}>
                    <Copy className="w-5 h-5" />
                  </button>
                  <button className="p-1 text-gray-600 hover:text-gray-800" onClick={handlePrint}>
                    <Printer className="w-5 h-5" />
                  </button>
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
                  {filteredStudents.map((student: Student) => (
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
                          <button className="text-gray-600 hover:text-gray-800">
                            <List className="w-5 h-5" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-800">
                            <Edit className="w-5 h-5" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-800">
                            <Trash className="w-5 h-5" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-800" onClick={handlePrintClick}>
                            <Printer className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredStudents.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No students found
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredStudents.map((student: Student) => (
                <div key={student.id} className="border rounded-md p-4 flex flex-col md:flex-row">
                  <div className="w-full md:w-1/6 flex items-center justify-center mb-4 md:mb-0">
                    {student.photo ? (
                      <img 
                        src={student.photo} 
                        alt={student.name} 
                        className="w-32 h-32 object-cover rounded-md border border-gray-200" 
                      />
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
                      <button className="text-gray-600 hover:text-gray-800 mr-3">
                        <List className="w-5 h-5" />
                      </button>
                      <button className='p-1 text-gray-600 hover:text-gray-800 mr-3'>
                        <Edit className="w-5 h-5" />
                      </button>
                      <button className="p-1 text-gray-600 hover:text-gray-800 mr-3">
                        <span>₹</span>
                      </button>
                      <button className="text-gray-600 hover:text-gray-800 mr-3" onClick={handlePrintClick}>
                        <Printer className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {filteredStudents.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No students found
                </div>
              )}
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