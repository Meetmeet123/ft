"use client";
import React, { useState } from 'react';
import classGeneral from './Class1General';
import studentData from './student';

function AssignFees() {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [category, setCategory] = useState('');
  const [gender, setGender] = useState('');
  const [RTE, setRTE] = useState('');
  const [displayedStudents, setDisplayedStudents] = useState(studentData);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showContent,setShowContent] = useState(false);

  const handleSearch = () => {
    const filtered = studentData.filter((student) => {
        setShowContent(true)
      return (
        (!selectedClass || student.class.slice(0,7) === selectedClass) &&
        (!selectedSection || student.class.slice(8,9) === selectedSection) &&
        (!category || student.category === category) &&
        (!gender || student.gender === gender) &&
        (!RTE || student.rte === RTE)
      );
    });
    setDisplayedStudents(filtered);
    setSelectedStudents([]);
    setSelectAll(false);
  };

  const handleSelectStudent = (admissionNo) => {
    setSelectedStudents((prev) =>
      prev.includes(admissionNo)
        ? prev.filter((id) => id !== admissionNo)
        : [...prev, admissionNo]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedStudents([]);
    } else {
      const allIds = displayedStudents.map((s) => s.admissionNo);
      setSelectedStudents(allIds);
    }
    setSelectAll(!selectAll);
  };

  return (
    <div>
      <div className="w-full mt-5 border-b p-3">
        <h3 className="text-xl">Select Criteria</h3>
      </div>

      <div className="grid lg:grid-cols-5 mt-3 gap-5">
        <div>
          <label>Class</label>
          <select className="w-full" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
            <option value="">Select</option>
            <option value="Class 1">Class 1</option>
            <option value="Class 2">Class 2</option>
            <option value="Class 3">Class 3</option>
            <option value="Class 4">Class 4</option>
            <option value="Class 5">Class 5</option>
          </select>
        </div>

        <div>
          <label>Section</label>
          <select className="w-full" value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)}>
            <option value="">Select</option>
            <option value="A">Section A</option>
            <option value="B">Section B</option>
            <option value="C">Section C</option>
            <option value="D">Section D</option>
          </select>
        </div>

        <div>
          <label>Category</label>
          <select className="w-full" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select</option>
            <option value="General">General</option>
            <option value="OBC">OBC</option>
            <option value="Special">Special</option>
            <option value="PhysicallyChallenged">Physically Challenged</option>
          </select>
        </div>

        <div>
          <label>Gender</label>
          <select className="w-full" value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <label>RTE</label>
          <select className="w-full" value={RTE} onChange={(e) => setRTE(e.target.value)}>
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="flex items-end">
          <button onClick={handleSearch} className="btn btn-primary w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Search
          </button>
        </div>
      </div>

      {showContent && <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Assign Fees Group</h1>
        <h2 className="text-xl font-medium text-gray-700 mb-4">Class 1 General</h2>

        <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-6">
          {/* Fees Table */}
          <div className="w-full">
            <div className="bg-white rounded-md shadow overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fees Code</th>
                    <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {classGeneral.map((fee, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="py-2 px-4 text-sm text-gray-700">{fee.feesCode}</td>
                      <td className="py-2 px-4 text-sm text-gray-700 text-right">{fee.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Student List */}
          <div className="w-full">
            <div className="bg-white rounded-md shadow overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-3 text-center">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </th>
                    <th className="py-3 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admission No</th>
                    <th className="py-3 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                    <th className="py-3 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                    <th className="py-3 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Father Name</th>
                    <th className="py-3 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="py-3 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {displayedStudents.map((student, index) => (
                    <tr key={student.admissionNo} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="py-2 px-3 text-center">
                        <input
                          type="checkbox"
                          checked={selectedStudents.includes(student.admissionNo)}
                          onChange={() => handleSelectStudent(student.admissionNo)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </td>
                      <td className="py-2 px-3 text-sm text-gray-700">{student.admissionNo}</td>
                      <td className="py-2 px-3 text-sm text-gray-700">{student.studentName}</td>
                      <td className="py-2 px-3 text-sm text-gray-700">{student.class}</td>
                      <td className="py-2 px-3 text-sm text-gray-700">{student.father}</td>
                      <td className="py-2 px-3 text-sm text-gray-700">{student.category}</td>
                      <td className="py-2 px-3 text-sm text-gray-700">{student.gender}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Assign Fees
          </button>
        </div>
      </div>}
    </div>
  );
}

export default AssignFees;
