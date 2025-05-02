'use client';
import React, { useState } from 'react';

export default function StudentManager() {
  const [searchForm, setSearchForm] = useState({
    class_id: '',
    section_id: ''
  });

  const [showAddMemberForm, setShowAddMemberForm] = useState(false);
  const [newLibraryCardNo, setNewLibraryCardNo] = useState('');
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [studentsWithRemovedCards, setStudentsWithRemovedCards] = useState([]);

  // Dummy dropdown data
  const [dropdownData] = useState({
    classes: [
      { id: '1', class: 'Class 1' },
      { id: '2', class: 'Class 2' },
      { id: '3', class: 'Class 3' },
      { id: '4', class: 'Class 4' },
      { id: '5', class: 'Class 5' }
    ],
    sections: [
      { id: 'A', section: 'Section A' },
      { id: 'B', section: 'Section B' },
      { id: 'C', section: 'Section C' },
      { id: 'D', section: 'Section D' }
    ]
  });

  // Dummy student data
  const [dummyStudentData] = useState([
    {
      id: '1',
      member_id: 'MEM001',
      library_card_no: '1001',
      admission_no: 'ADM001',
      firstname: 'Rahul',
      middlename: 'Kumar',
      lastname: 'Sharma',
      class: '1',
      section: 'A',
      father_name: 'Rajesh Sharma',
      dob: '2010-05-15',
      gender: 'Male',
      mobileno: '9876543210'
    },
    {
      id: '2',
      member_id: 'MEM002',
      library_card_no: '1002',
      admission_no: 'ADM002',
      firstname: 'Priya',
      middlename: '',
      lastname: 'Patel',
      class: '1',
      section: 'A',
      father_name: 'Sanjay Patel',
      dob: '2010-08-22',
      gender: 'Female',
      mobileno: '8765432109'
    },
    {
      id: '3',
      member_id: 'MEM003',
      library_card_no: '1003',
      admission_no: 'ADM003',
      firstname: 'Amit',
      middlename: 'Singh',
      lastname: 'Verma',
      class: '2',
      section: 'B',
      father_name: 'Vikram Verma',
      dob: '2009-11-30',
      gender: 'Male',
      mobileno: '7654321098'
    },
    {
      id: '4',
      member_id: 'MEM004',
      library_card_no: '1004',
      admission_no: 'ADM004',
      firstname: 'Neha',
      middlename: 'Kumari',
      lastname: 'Gupta',
      class: '2',
      section: 'B',
      father_name: 'Anil Gupta',
      dob: '2009-04-17',
      gender: 'Female',
      mobileno: '6543210987'
    },
    {
      id: '5',
      member_id: 'MEM005',
      library_card_no: '1005',
      admission_no: 'ADM005',
      firstname: 'Vivek',
      middlename: '',
      lastname: 'Joshi',
      class: '3',
      section: 'C',
      father_name: 'Prakash Joshi',
      dob: '2008-07-25',
      gender: 'Male',
      mobileno: '9432109876'
    }
  ]);

  const [studentData, setStudentData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleClassChange = (e) => {
    const class_id = e.target.value;
    setSearchForm(prev => ({ ...prev, class_id, section_id: '' }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setHasSearched(true);

    setTimeout(() => {
      try {
        let filteredStudents = dummyStudentData;
        
        if (searchForm.class_id) {
          filteredStudents = filteredStudents.filter(
            student => student.class === searchForm.class_id
          );
        }
        
        if (searchForm.section_id) {
          filteredStudents = filteredStudents.filter(
            student => student.section === searchForm.section_id
          );
        }

        setStudentData(filteredStudents);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }, 500);
  };

  const handleRemoveLibraryCard = (studentId) => {
    setEditingStudentId(studentId);
    setStudentsWithRemovedCards(prev => [...prev, studentId]);
  };

  const handleShowAddForm = () => {
    setShowAddMemberForm(true);
  };

  const handleAddLibraryCard = () => {
    if (!newLibraryCardNo) return;
    
    setStudentsWithRemovedCards(prev => 
      prev.filter(id => id !== editingStudentId)
    );
    setShowAddMemberForm(false);
    setEditingStudentId(null);
    setNewLibraryCardNo('');
  };

  if (isLoading) return <div className="p-6">Loading data...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto" style={{ width:"108%",position:"relative",right:"40px"}}>
      {/* Search Form */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h1 className="text-xl font-bold mb-4">Select Criteria</h1>
        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Class *</label>
              <select
                name="class_id"
                value={searchForm.class_id}
                onChange={handleClassChange}
                className="w-full border rounded px-3 py-2 text-sm"
                required
              >
                <option value="">Select Class</option>
                {dropdownData.classes.map(classItem => (
                  <option key={classItem.id} value={classItem.id}>
                    {classItem.class}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Section</label>
              <select
                name="section_id"
                value={searchForm.section_id}
                onChange={(e) => setSearchForm(prev => ({...prev, section_id: e.target.value}))}
                className="w-full border rounded px-3 py-2 text-sm"
                disabled={!searchForm.class_id}
              >
                <option value="">Select Section</option>
                {dropdownData.sections.map(section => (
                  <option key={section.id} value={section.id}>
                    {section.section}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4">
            <button 
              type="submit" 
              // className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Add Member Form - Now shows as an alert/modal */}
      {showAddMemberForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Member</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Library Card No. *
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={newLibraryCardNo}
                onChange={(e) => setNewLibraryCardNo(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="Enter Library Card Number"
                required
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowAddMemberForm(false);
                  setEditingStudentId(null);
                }}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddLibraryCard}
                // className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Student List */}
      {hasSearched && (
        <div className="bg-white p-4 rounded shadow">
          <div className="mb-4">
            <h2 className="text-lg font-bold mb-2">Student Members List</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full border rounded px-3 py-2 text-sm pl-10"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-gray-600 bg-gray-50">
                  <th className="py-3 px-4">Member ID</th>
                  <th className="py-3 px-4">Library Card No.</th>
                  <th className="py-3 px-4">Admission No</th>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Class</th>
                  <th className="py-3 px-4">Father Name</th>
                  <th className="py-3 px-4">Date of Birth</th>
                  <th className="py-3 px-4">Gender</th>
                  <th className="py-3 px-4">Mobile Number</th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {studentData.length > 0 ? (
                  studentData.map((student) => (
                    <tr key={student.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        {studentsWithRemovedCards.includes(student.id) ? '-' : student.member_id || '-'}
                      </td>
                      <td className="py-3 px-4">
                        {studentsWithRemovedCards.includes(student.id) ? '-' : student.library_card_no || '-'}
                      </td>
                      <td className="py-3 px-4">{student.admission_no || '-'}</td>
                      <td className="py-3 px-4">{student.firstname} {student.middlename} {student.lastname}</td>
                      <td className="py-3 px-4">Class {student.class} ({student.section})</td>
                      <td className="py-3 px-4">{student.father_name}</td>
                      <td className="py-3 px-4">{student.dob}</td>
                      <td className="py-3 px-4">{student.gender}</td>
                      <td className="py-3 px-4">{student.mobileno}</td>
                      <td className="py-3 px-4">
                        {studentsWithRemovedCards.includes(student.id) ? (
                          <button 
                            className="text-green-500 hover:text-green-700 text-xl"
                            onClick={() => {
                              setEditingStudentId(student.id);
                              handleShowAddForm();
                            }}
                          >
                            <span>+</span>
                          </button>
                        ) : (
                          <button 
                            className="text-purple-500 hover:text-purple-700 text-xl"
                            onClick={() => handleRemoveLibraryCard(student.id)}
                          >
                            <span><svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  className="w-5 h-5 text-gray-700"
>
  <path d="M3 7v6h6" />
  <path d="M21 17a9 9 0 0 0-15-6.7L3 13" />
</svg>
</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="text-center py-4">
                      No students found for selected criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {studentData.length > 0 && (
            <div className="mt-3 text-sm text-gray-500">
              Records: 1 to {studentData.length} of {studentData.length}
            </div>
          )}
        </div>
      )}
    </div>
  );
}