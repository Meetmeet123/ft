"use client"
import { useEffect, useState } from 'react';
import { Search, List, Grid, Edit, Trash, Printer, FileText, Database, Download, Copy } from 'lucide-react';
import Link from 'next/link';
import class1Data from './Class1Data';
import class2Data from './Class2Data';
import class3Data from './Class3Data';
import class4Data from './Class4Data';
import class5Data from './Class5Data';
import Image from 'next/image';

// Interface for Student data structure
interface Student {
  id: number;
  name: string;
  rollNo: number;
  class: string;
  fatherName: string;
  dob: string;
  gender: 'Male' | 'Female';
  category?: string;
  mobileNumber: string;
  nationalId?: number;
  localId?: number;
  username?: string;
  active: boolean;
  guardianPhone?: string;
  address?: string;
}

// Type for view modes
type ViewMode = 'list' | 'details';

// Type for class names
type ClassName = '' | 'Class 1' | 'Class 2' | 'Class 3' | 'Class 4' | 'Class 5';

// Type for sections
type Section = '' | 'A' | 'B' | 'C' | 'D';

export default function StudentManagementSystem() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [className, setClassName] = useState<ClassName>('');
  const [section, setSection] = useState<Section>('');
  const [keyword, setKeyword] = useState<string>('');
  const [students, setStudents] = useState<Student[]>([]);
  const [displayedStudents, setDisplayedStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  function handleSearch(): void {
    let selectedData: Student[] = [];

    switch (className) {
      case 'Class 1':
        selectedData = class1Data.map((student: any) => ({
          ...student,
          id: Number(student.id),
          rollNo: Number(student.rollNo),
          nationalId: student.nationalId ? Number(student.nationalId) : undefined,
          localId: student.localId ? Number(student.localId) : undefined,
          active: true, // or set based on your logic
        }));
        break;
      case 'Class 2':
        selectedData = class2Data.map((student: any) => ({
          ...student,
          id: Number(student.id),
          rollNo: Number(student.rollNo),
          nationalId: student.nationalId ? Number(student.nationalId) : undefined,
          localId: student.localId ? Number(student.localId) : undefined,
          active: true, // or set based on your logic
        }));
        break;
      case 'Class 3':
        selectedData = class3Data.map((student: any) => ({
          ...student,
          id: Number(student.id),
          rollNo: Number(student.rollNo),
          nationalId: student.nationalId ? Number(student.nationalId) : undefined,
          localId: student.localId ? Number(student.localId) : undefined,
          active: true, // or set based on your logic
        }));
        break;
      case 'Class 4':
        selectedData = class4Data.map((student: any) => ({
          ...student,
          id: Number(student.id),
          rollNo: Number(student.rollNo),
          nationalId: student.nationalId ? Number(student.nationalId) : undefined,
          localId: student.localId ? Number(student.localId) : undefined,
          active: true, // or set based on your logic
        }));
        break;
      case 'Class 5':
        selectedData = class5Data.map((student: any) => ({
          ...student,
          id: Number(student.id),
          rollNo: Number(student.rollNo),
          nationalId: student.nationalId ? Number(student.nationalId) : undefined,
          localId: student.localId ? Number(student.localId) : undefined,
          active: true, // or set based on your logic
        }));
        break;
      default:
        selectedData = [];
    }

    let filtered: Student[] = selectedData;

    if (section) {
        filtered = filtered.filter((student: Student) => {
          const match = student.class.match(/\(([^)]+)\)/); // extract section from "Class 2(A)"
          const studentSection = match ? match[1] : '';
          return studentSection === section;
        });
      }
      

    if (keyword && keyword.trim() !== '') {
      const lowerKeyword = keyword.toLowerCase();
      filtered = filtered.filter((student: Student) =>
        student.name?.toLowerCase().includes(lowerKeyword) ||
        student.rollNo?.toString().includes(lowerKeyword) ||
        student.id?.toString().includes(lowerKeyword) ||
        student.nationalId?.toString().includes(lowerKeyword) ||
        student.localId?.toString().includes(lowerKeyword)
      );
    }

    setStudents(filtered);
    setDisplayedStudents(filtered);
    console.log(filtered);
  }

  // Filter the displayed students whenever searchQuery changes
  useEffect(() => {
    if (!searchQuery.trim()) {
      setDisplayedStudents(students);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filteredStudents = students.filter((student: Student) => 
      student.name?.toLowerCase().includes(query) ||
      student.rollNo?.toString().includes(query) ||
      student.id?.toString().includes(query) ||
      student.class?.toLowerCase().includes(query) ||
      student.fatherName?.toLowerCase().includes(query) ||
      student.dob?.toLowerCase().includes(query) ||
      student.gender?.toLowerCase().includes(query) ||
      student.category?.toLowerCase().includes(query) ||
      student.mobileNumber?.toString().includes(query) ||
      student.nationalId?.toString().includes(query) ||
      student.localId?.toString().includes(query)
    );
    
    setDisplayedStudents(filteredStudents);
  }, [searchQuery, students]);

  const handleCopy = (): void => {
    if (!displayedStudents.length) return;
    
    const header = Object.keys(displayedStudents[0]).join('\t');
    const rows = displayedStudents.map((student: Student) =>
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
    const header = ["Admission No", "Student Name", "Username", "Class", "Father Name", "Mobile Number", "Status"];
    
    // Ensure that students are filtered before export
    const rows = displayedStudents.map((s: Student) => [
      s.id, // Admission No
      s.name, // Student Name
      s.username || '', // Username
      s.class, // Class
      s.fatherName, // Father Name
      s.mobileNumber, // Mobile Number
      s.active ? "Active" : "Inactive", // Status
    ]);
    
    // Combine header and rows into a single CSV string
    const csvContent = [
      header.join(","),  // Join header with commas
      ...rows.map((row: (string | number)[]) => row.join(","))  // Join each row with commas
    ].join("\n");  // Join all rows with new line
  
    // Create a blob from the CSV string
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  
    // Create a download link for the blob
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "StudentsData.csv";  // File name for download
  
    // Simulate a click to trigger the download
    link.click();
  };
  
  const handlePrint = (): void => {
    window.print();
  };

  const handleClassNameChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setClassName(e.target.value as ClassName);
  };

  const handleSectionChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSection(e.target.value as Section);
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setKeyword(e.target.value);
  };

  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="bg-gray-50 p-4 w-full min-h-screen">
      <div className="max-w-7xl mx-auto bg-white rounded-md shadow-sm">
        <div className="p-6">
          <h2 className="text-xl font-medium text-gray-700 mb-6">Select Criteria</h2>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 mb-6">
            <div className='w-full'>
              <label className="block text-sm font-medium text-gray-700 mb-1">Class <span className="text-red-500">*</span></label>
              <select onChange={handleClassNameChange} value={className}
                className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
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
              <select onChange={handleSectionChange} value={section}
                className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
              <div className="flex justify-end md:justify-start mt-6">
                <button onClick={handleSearch} className="btn btn-primary hover:bg-gray-600 text-white py-2 rounded-md">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </button>
              </div>
            </div>
            <div className='w-full'>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search By Keyword</label>
              <input onChange={handleKeywordChange} value={keyword} type="text"
                placeholder="Search By Student Name, Roll Number, Enroll Number, National Id, Local Id Etc."
                className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <div className="flex justify-end md:justify-start mt-6">
                <button onClick={handleSearch} className="btn btn-primary hover:bg-gray-600 text-white py-2 rounded-md">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </button>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-200 mb-6">
            <div className="flex space-x-4 gap-5">
              <button className={`relative flex items-center pb-3 px-1 ${
                  viewMode === 'list'
                    ? 'after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-blue-600'
                    : ''
                }`}
                onClick={() => setViewMode('list')}
                >
                <List className="w-4 h-4 mr-2" />
                List View
              </button>
              <button className={`relative flex items-center pb-3 px-1 ${
                    viewMode === 'details'
                      ? 'after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-blue-600'
                      : ''
                  }`} onClick={() => setViewMode('details')}>
                <Grid className="w-4 h-4 mr-2" />
                Details View
              </button>
            </div>
          </div>

          {viewMode === 'list' ? (
            <div className="overflow-x-auto">
              <div className="grid lg:grid-cols-2 sm:grid-cols-1 mb-4 space-x-2">
                <div className="w-1/2">
                  <input 
                    type='text' 
                    value={searchQuery}
                    onChange={handleSearchQueryChange} 
                    className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' 
                    placeholder='Search in results...' 
                  />
                </div>
                <div className='text-end' >
                  <button className="p-1 text-gray-600 hover:text-gray-800"><Database className="w-5 h-5" /></button>
                  <button className="p-1 text-gray-600 hover:text-gray-800" onClick={handleExcelExport}><Download className="w-5 h-5" /></button>
                  <button className="p-1 text-gray-600 hover:text-gray-800" onClick={handleCopy}><Copy className="w-5 h-5" /></button>
                  <button className="p-1 text-gray-600 hover:text-gray-800" onClick={handlePrint}><Printer className="w-5 h-5" /></button>
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
                  {displayedStudents.map((student: Student) => (
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
                        <div className="flex space-x-2 gap-4">
                        <Link href={{
                        pathname:'/student-information/student-details/student-view',
                        query:{...student},
                        }} className="text-gray-600 hover:text-gray-800 mr-3">
                          <List className="w-5 h-5" />
                          </Link>
                            <Link href={{
                          pathname: '/student-information/student-details/student-edit',
                          query: { ...student }, // spreads all student fields into the URL
                          }} className="text-gray-600 hover:text-gray-800 mr-3"><Edit className="w-5 h-5" /></Link>
                          <button className="text-gray-600 hover:text-gray-800"><span className="w-5 h-5">₹</span></button>
                          <button onClick={handlePrint} className="text-gray-600 hover:text-gray-800"><Printer className="w-5 h-5" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {displayedStudents.length === 0 && students.length > 0 && (
                <div className="text-center py-4 text-gray-500">
                  No students match your search criteria
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="mb-4">
                <input 
                  type='text' 
                  value={searchQuery}
                  onChange={handleSearchQueryChange} 
                  className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' 
                  placeholder='Search in results...' 
                />
              </div>
              {displayedStudents.map((student: Student) => (
                <div key={student.id} className="border rounded-md p-4 flex flex-col md:flex-row">
                  <div className="w-1/2 md:w-1/6 grid lg:grid-cols-4 md:grid-cols-3 mb-4 md:mb-0">
                    <div className="w-32 h-32 bg-gray-200 rounded-md border border-gray-300">
                      <Image
                        src={student.gender === 'Male' ? "/public/male.jpg" : "/public/female.jpg"}
                        alt="Student"
                        width={130}
                        height={40}
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-5/6 md:pl-6">
                    <h3 className="text-xl font-medium text-blue-500">{student.name}</h3>
                    <div className="grid lg:grid-cols-3 md:grid-cols-1 items-center mt-3">
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
                      <Link href={{
                        pathname:'/student-information/student-details/student-view',
                        query:{...student},
                        }} className="text-gray-600 hover:text-gray-800 mr-3">
                        <List className="w-5 h-5" />
                      </Link>
                      <Link href={{
                    pathname: '/student-information/student-details/student-edit',
                    query: { ...student }, // spreads all student fields into the URL
                    }} className="text-gray-600 hover:text-gray-800 mr-3"><Edit className="w-5 h-5" /></Link>
                      <button className="p-1 text-gray-600 hover:text-gray-800 mr-3"><span>₹</span></button>
                      <button className="text-gray-600 hover:text-gray-800 mr-3" onClick={handlePrint}><Printer className="w-5 h-5" /></button>
                    </div>
                  </div>
                </div>
              ))}
              {displayedStudents.length === 0 && students.length > 0 && (
                <div className="text-center py-4 text-gray-500">
                  No students match your search criteria
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