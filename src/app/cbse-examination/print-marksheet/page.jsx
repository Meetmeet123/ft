"use client";
import React, { useState } from 'react';
import { Download, Edit } from 'lucide-react';
import * as XLSX from 'xlsx'

export default function StudentListPage() {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [students, setStudents] = useState([
    {
      admissionNo: '120036',
      studentName: 'Ayan Desai',
      fatherName: 'Abhinand',
      dateOfBirth: '10/15/2015',
      gender: 'Male',
      mobileNo: '9067875674'
    },
    {
      admissionNo: '2152',
      studentName: 'Kaylen',
      fatherName: 'Lyndon',
      dateOfBirth: '06/19/2019',
      gender: 'Female',
      mobileNo: '541801858420'
    },
    {
      admissionNo: '96302',
      studentName: 'Jacob Bethell',
      fatherName: 'Brydon',
      dateOfBirth: '08/19/2016',
      gender: 'Male',
      mobileNo: '065758878'
    }
  ]);

  const [selectedStudents, setSelectedStudents] = useState([]);
  const [showContent, setShowContent] = useState(false);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedStudents(students.map(student => student.admissionNo));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleSelectStudent = (admissionNo) => {
    setSelectedStudents(prev =>
      prev.includes(admissionNo)
        ? prev.filter(id => id !== admissionNo)
        : [...prev, admissionNo]
    );
  };

  const handleBulkDownload = () => {
    if (!selectedClass || selectedStudents.length === 0) {
      alert("Select the student(s)");
    } else {
      // Get full student data based on selected admission numbers
      const selectedData = students.filter(student =>
        selectedStudents.includes(student.admissionNo)
      );
  
      // Convert to Excel
      const worksheet = XLSX.utils.json_to_sheet(selectedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');
      XLSX.writeFile(workbook, 'Student_List.xlsx');
    }
  };

  const handleSingleDownload = (content) => {
    const worksheet = XLSX.utils.json_to_sheet([content]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Student');
    XLSX.writeFile(workbook, `${content.studentName}_Marksheet.xlsx`);
  };  


  return (
    <div className="p-4 bg-white min-h-screen">
      <div className='my-6 w-full border-b'>
        <h3 className='text-xl'>Select Criteria</h3>
      </div>

      <div className="mb-4 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 gap-4">
        <select
          className="border rounded p-2 flex-1"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">Select Class</option>
          <option value="Class1">Class 1</option>
          <option value="Class2">Class 2</option>
          <option value="Class3">Class 3</option>
          <option value="Class4">Class 4</option>
          <option value="Class5">Class 5</option>
        </select>

        <select
          className="border rounded p-2 flex-1"
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
        >
          <option value="">Select Section</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>

        <select
          className="border rounded p-2 flex-1"
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value)}
        >
          <option value="">Select Template</option>
          <option value="AssesmentTemplate">Assessment Template</option>
        </select>
      </div>

      <div className='flex justify-end my-4'>
        <button
          className="btn btn-primary text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => {
            if (selectedClass && selectedSection && selectedTemplate) {
              setShowContent(true);
            }
          }}
        >
          Search
        </button>
      </div>

      {showContent && (
        <div className="overflow-x-auto">
          <div className='flex justify-end w-full my-4'>
            <button
            onClick={handleBulkDownload}
              className='btn btn-primary text-white px-4 py-2 rounded hover:bg-green-700'
            >
              Bulk Download
            </button>
          </div>

          {students.length > 0 ? (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={selectedStudents.length === students.length}
                    />
                  </th>
                  <th className="border p-2 text-left">Admission No</th>
                  <th className="border p-2 text-left">Student Name</th>
                  <th className="border p-2 text-left">Father Name</th>
                  <th className="border p-2 text-left">Date of Birth</th>
                  <th className="border p-2 text-left">Gender</th>
                  <th className="border p-2 text-left">Mobile No.</th>
                  <th className="border p-2 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {students.map((student) => (
                  <tr key={student.admissionNo} className="hover:bg-gray-50">
                    <td className="border p-2">
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(student.admissionNo)}
                        onChange={() => handleSelectStudent(student.admissionNo)}
                      />
                    </td>
                    <td className="border p-2">{student.admissionNo}</td>
                    <td className="border p-2 text-blue-600">{student.studentName}</td>
                    <td className="border p-2">{student.fatherName}</td>
                    <td className="border p-2">{student.dateOfBirth}</td>
                    <td className="border p-2">{student.gender}</td>
                    <td className="border p-2">{student.mobileNo}</td>
                    <td className="border p-2 text-center">
                      <div className="flex justify-center space-x-3">
                        <button className="text-gray-600 hover:text-gray-800">
                          <Download 
                          onClick={() => handleSingleDownload(student)}
                          className='h-5 w-5' 
                          />
                        </button>
                        <button className="text-gray-600 hover:text-gray-800">
                          <Edit className='h-5 w-5' />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-500 mt-4">No students found.</p>
          )}
        </div>
      )}
    </div>
  );
}
