"use client"
import { useState } from 'react';
import { Search, List, Grid, Edit, Trash, Printer, FileText, Database, Download, Copy } from 'lucide-react';
import Link from 'next/link';
import class1Data from './Class1Data';
import class2Data from './Class2Data';
import class3Data from './Class3Data';
import class4Data from './Class4Data';
import class5Data from './Class5Data';

export default function BulkDelete() {
  const [viewMode, setViewMode] = useState('list');
  const [className, setClassName] = useState('');
  const [section, setSection] = useState('');
  const [keyword, setKeyword] = useState('');
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);

  const handleSelectAll = () => {
    const allIds = students.map((s) => s.id);
    setSelectedIds((prev) => prev.length === students.length ? [] : allIds);
  };

  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleDelete = () => {
    const filtered = students.filter((s) => !selectedIds.includes(s.id));
    setStudents(filtered);
    setSelectedIds([]);
  };
  

  function handleSearch() {
    let selectedData = [];

    switch (className) {
      case 'Class 1':
        selectedData = class1Data;
        break;
      case 'Class 2':
        selectedData = class2Data;
        break;
      case 'Class 3':
        selectedData = class3Data;
        break;
      case 'Class 4':
        selectedData = class4Data;
        break;
      case 'Class 5':
        selectedData = class5Data;
        break;
      default:
        selectedData = [];
    }

    let filtered = selectedData;

    if (section && section !== 'Select') {
        filtered = filtered.filter(student => {
          const match = student.class.match(/\(([^)]+)\)/); // extract section from "Class 2(A)"
          const studentSection = match ? match[1] : '';
          return studentSection === section;
        });
      }
      

    if (keyword && keyword.trim() !== '') {
      const lowerKeyword = keyword.toLowerCase();
      filtered = filtered.filter(student =>
        student.name?.toLowerCase().includes(lowerKeyword) ||
        student.rollNo?.toString().includes(lowerKeyword) ||
        student.id?.toString().includes(lowerKeyword) ||
        student.nationalId?.toString().includes(lowerKeyword) ||
        student.localId?.toString().includes(lowerKeyword)
      );
    }

    setStudents(filtered);
    console.log(filtered);
  }

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
  
  const handleDownload = () => {
    const csv = [
      ["Admission No", "Student Name", "Roll No", "Class", "Father Name", "Mobile Number"],
      ...students.map((s) => [
        s.id,
        s.name,
        s.rollNo || "-",
        s.class,
        s.fatherName,
        s.mobileNumber || "-",
      ]),
    ]
      .map((row) => row.map((val) => `"${val}"`).join(","))
      .join("\n");
  
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "class5_students.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  
  
  const handlePrint = () => {
    window.print();
  };  

  return (
    <div className="bg-gray-50 p-4 w-full min-h-screen">
      <div className="max-w-7xl mx-auto bg-white rounded-md shadow-sm">
        <div className="p-6">
          <h2 className="text-xl font-medium text-gray-700 mb-6">Select Criteria</h2>
          <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-6 mb-6">
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
                <button onClick={handleSearch} className="btn btn-primary hover:bg-gray-600 text-white py-2 rounded-md">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 w-full min-h-screen">
      <div className="max-w-7xl mx-auto bg-white rounded-md shadow-sm">
        <div className="p-6">
          <div className="w-full mt-5 mb-2 flex justify-between">
            <button className="btn btn-dark-100" onClick={handleSelectAll}>
              {selectedIds.length === students.length ? 'Unselect All' : 'Select All'}
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-white text-left text-gray-700">
                  <th className="py-3 px-4 font-medium">#</th>
                  <th className="py-3 px-4 font-medium">Admission No</th>
                  <th className="py-3 px-4 font-medium">Student Name</th>
                  <th className="py-3 px-4 font-medium">Roll No.</th>
                  <th className="py-3 px-4 font-medium">Class</th>
                  <th className="py-3 px-4 font-medium">Father Name</th>
                  <th className="py-3 px-4 font-medium">Date of Birth</th>
                  <th className="py-3 px-4 font-medium">Gender</th>
                  <th className="py-3 px-4 font-medium">Category</th>
                  <th className="py-3 px-4 font-medium">Mobile Number</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(student.id)}
                        onChange={() => handleCheckboxChange(student.id)}
                      />
                    </td>
                    <td className="py-3 px-4">{student.id}</td>
                    <td className="py-3 px-4 text-blue-500">{student.name}</td>
                    <td className="py-3 px-4">{student.rollNo}</td>
                    <td className="py-3 px-4">{student.class}</td>
                    <td className="py-3 px-4">{student.fatherName}</td>
                    <td className="py-3 px-4">{student.dob}</td>
                    <td className="py-3 px-4">{student.gender}</td>
                    <td className="py-3 px-4">{student.category || '-'}</td>
                    <td className="py-3 px-4">{student.mobileNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="p-2 bg-gray-50 text-right text-xs text-gray-500 border-t">
          © 2025 Mount Carmel School
        </div>
      </div>
    </div>
        </div>
        <div className="p-2 bg-gray-50 text-right text-xs text-gray-500 border-t">
          © 2025 Mount Carmel School
        </div>
      </div>
    </div>
  );
}
