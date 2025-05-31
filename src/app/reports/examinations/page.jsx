"use client";
import React, { useState } from 'react';

const ExaminationsReport = () => {
  // Dummy data
  const dummyData = {
    examGroups: [
      "Class 5 (Pass/Fail)",
      "Class 5 (School Based Grading System)",
      "Class 5 (College Based Grading System)",
      "Class 5 (GPA Based Grading System)"
    ],
    exams: [
      "Weekly Test",
      "Practical Examination",
      "Practice Test",
      "All Subject - Examination"
    ],
    sessions: ["2024-25", "2023-24", "2022-23"],
    classes: ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5"],
    sections: ["A", "B", "C", "D"],
    students: [
      {
        id: 1,
        admissionNo: "ADM2023001",
        rollNumber: 1,
        name: "Rahul Sharma",
        english: { obtained: 85, total: 100 },
        mathematics: { obtained: 92, total: 100 },
        science: { obtained: 78, total: 100 },
        socialStudies: { obtained: 88, total: 100 },
        result: "Pass"
      },
      {
        id: 2,
        admissionNo: "ADM2023002",
        rollNumber: 2,
        name: "Priya Patel",
        english: { obtained: 78, total: 100 },
        mathematics: { obtained: 85, total: 100 },
        science: { obtained: 90, total: 100 },
        socialStudies: { obtained: 82, total: 100 },
        result: "Pass"
      },
      {
        id: 3,
        admissionNo: "ADM2023003",
        rollNumber: 3,
        name: "Amit Singh",
        english: { obtained: 42, total: 100 },
        mathematics: { obtained: 38, total: 100 },
        science: { obtained: 45, total: 100 },
        socialStudies: { obtained: 50, total: 100 },
        result: "Fail"
      }
    ]
  };

  // State for search criteria
  const [searchCriteria, setSearchCriteria] = useState({
    examGroup: "",
    exam: "",
    session: "",
    class: "",
    section: ""
  });

  // State for search results and UI
  const [searchResults, setSearchResults] = useState([]);
  const [showReport, setShowReport] = useState(false);
  const [showCriteria, setShowCriteria] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle search
  const handleSearch = () => {
    if (
      searchCriteria.examGroup &&
      searchCriteria.exam &&
      searchCriteria.session &&
      searchCriteria.class &&
      searchCriteria.section
    ) {
      setSearchResults(dummyData.students);
      setShowReport(true);
    }
  };

  // Reset form
  const handleReset = () => {
    setSearchCriteria({
      examGroup: "",
      exam: "",
      session: "",
      class: "",
      section: ""
    });
    setSearchResults([]);
    setShowReport(false);
  };

  // Toggle criteria visibility
  const toggleCriteria = () => {
    setShowCriteria(!showCriteria);
  };

  return (
    <div className="container mx-auto p-4">
     
      
      {/* Bank Report Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h1 className="text-2xl  mb-6">Examinations Report</h1>
      
        
        {/* Toggle Button */}
        <button
  onClick={toggleCriteria}
  className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-black rounded-md hover:bg-blue-200 mb-4"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 384 512"
    className="text-black"
  >
    <path d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm64 224c0 4.4-3.6 8-8 8H104c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h176c4.4 0 8 3.6 8 8v16zm0-64c0 4.4-3.6 8-8 8H104c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h176c4.4 0 8 3.6 8 8v16zm0-64c0 4.4-3.6 8-8 8H104c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h176c4.4 0 8 3.6 8 8v16zm96-80v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 17z"/>
  </svg>
  <span className="font-semibold">Rank Report</span>
</button>


        
        {/* Select Criteria - Only shown when toggled */}
        {showCriteria && (
          <>
            <h3 className="text-lg font-medium mb-4">Select Criteria</h3>
            
            <div className="flex flex-wrap gap-4 items-end" >

            <div style={{width:'180px'}}>

                <label className="block text-sm font-medium text-gray-700 mb-1">Exam Group *</label>
                <select
                  name="examGroup"
                  value={searchCriteria.examGroup}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select</option>
                  {dummyData.examGroups.map((group, index) => (
                    <option key={index} value={group}>{group}</option>
                  ))}
                </select>
              </div>
              
              <div style={{width:'160px'}}>

                <label className="block text-sm font-medium text-gray-700 mb-1">Exam *</label>
                <select
                  name="exam"
                  value={searchCriteria.exam}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select</option>
                  {dummyData.exams.map((exam, index) => (
                    <option key={index} value={exam}>{exam}</option>
                  ))}
                </select>
              </div>
              
              <div style={{width:'160px'}}>

                <label className="block text-sm font-medium text-gray-700 mb-1">Session *</label>
                <select
                  name="session"
                  value={searchCriteria.session}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select</option>
                  {dummyData.sessions.map((session, index) => (
                    <option key={index} value={session}>{session}</option>
                  ))}
                </select>
              </div>
              
              <div style={{width:'160px'}}>

                <label className="block text-sm font-medium text-gray-700 mb-1">Class *</label>
                <select
                  name="class"
                  value={searchCriteria.class}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select</option>
                  {dummyData.classes.map((cls, index) => (
                    <option key={index} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>
              
              <div style={{width:'160px'}}>

                <label className="block text-sm font-medium text-gray-700 mb-1">Section *</label>
                <select
                  name="section"
                  value={searchCriteria.section}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select</option>
                  {dummyData.sections.map((section, index) => (
                    <option key={index} value={section}>{section}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={handleSearch}
                disabled={!searchCriteria.examGroup || !searchCriteria.exam || 
                         !searchCriteria.session || !searchCriteria.class || 
                         !searchCriteria.section}
                className={`px-4 py-2 rounded-md ${
                  searchCriteria.examGroup && searchCriteria.exam && 
                  searchCriteria.session && searchCriteria.class && 
                  searchCriteria.section
                    ? 'bg-blue-600 text-black hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Search
              </button>
             
            </div>
          </>
        )}
      </div>
      
      {/* Student List - Only shown after search */}
      {showReport && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium mb-4">Student List</h3>
          
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admission No</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">English (35.00/100.00 - 210)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mathematics (35.00/100.00 - 110)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Science (35.00/100.00 - 111)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Social Studies (35.00/100.00 - 212)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grand Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percent (%)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {searchResults.length > 0 ? (
                  searchResults.map((student, index) => {
                    const grandTotal = student.english.obtained + student.mathematics.obtained + 
                                     student.science.obtained + student.socialStudies.obtained;
                    const totalMarks = student.english.total + student.mathematics.total + 
                                     student.science.total + student.socialStudies.total;
                    const percentage = ((grandTotal / totalMarks) * 100).toFixed(2);
                    
                    return (
                      <tr key={student.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{student.admissionNo}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{student.rollNumber}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {student.english.obtained}/{student.english.total}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {student.mathematics.obtained}/{student.mathematics.total}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {student.science.obtained}/{student.science.total}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {student.socialStudies.obtained}/{student.socialStudies.total}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{grandTotal}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{percentage}%</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            student.result === "Pass" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-red-100 text-red-800"
                          }`}>
                            {student.result}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="11" className="px-6 py-4 text-center text-gray-500">
                      No data available in table
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExaminationsReport;