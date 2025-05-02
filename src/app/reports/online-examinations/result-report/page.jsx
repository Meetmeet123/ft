"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ResultReport = () => {
   const router = useRouter();
     const handleClick1 = () => {
       router.push('../online-examinations/result-report'); 
       // yahan apne destination ka route likho
     };
     
     const handleClick2 = () => {
       router.push('../online-examinations/exam-report'); 
   
       // yahan apne destination ka route likho
     };
     const handleClick3 = () => {
       router.push('../online-examinations/student-exam-attempt-report'); 
   
       // yahan apne destination ka route likho
     };
     const handleClick4 = () => {
       router.push('../online-examinations/exam-rank-report'); 
   
       // yahan apne destination ka route likho
     };
  // Dummy JSON data
  const dummyData = {
    exams: [
      "Mathematics Quiz", 
      "Easy Writing", 
      "GK Competition",
      "English Exam Quiz",
      "Online Practice Test",
      "Online Social Science Exam"
    ],
    classes: ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5"],
    sections: ["A", "B", "C", "D"],
    students: [
      {
        admissionNo: "18001",
        name: "Edward Thomas",
        class: "Class 5",
        section: "A",
        fatherName: "Olivier Thomas",
        totalAttempt: 10,
        remainingAttempt: 10,
        submitted: false,
        examDetails: {
          totalQuestions: 10,
          descriptiveQuestions: 0,
          examFrom: "04/25/2025 10:00 am",
          examTo: "04/30/2025 04:00 pm",
          duration: "01:00:00",
          passingPercentage: 50,
          description: "1. The Subjects or topics covered in the exam will be as per the Syllabus.\n2. Every student will take the examination on a Laptop/Desktop/Smart Phone."
        }
      },
      // ... other student objects with similar structure
    ]
  };

  // State for search criteria
  const [searchCriteria, setSearchCriteria] = useState({
    exam: "",
    class: "",
    section: ""
  });

  // State for search results
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

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
    if (searchCriteria.exam && searchCriteria.class) {
      const results = dummyData.students.filter(student => 
        student.class === searchCriteria.class &&
        (!searchCriteria.section || student.section === searchCriteria.section)
      );
      setSearchResults(results);
      setShowResults(true);
    }
  };

  // Reset form
  const handleReset = () => {
    setSearchCriteria({
      exam: "",
      class: "",
      section: ""
    });
    setSearchResults([]);
    setShowResults(false);
    setSelectedStudent(null);
  };

  // View student details
  const handleViewDetails = (student) => {
    setSelectedStudent(student);
  };

  // Close modal
  const closeModal = () => {
    setSelectedStudent(null);
   
  };
  const commonStyle = (report) => ({
    padding: '10px',
    backgroundColor:  '#f0f0f0',
    color:  '#333',
    border: '1px solid #ddd',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontWeight: '500',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  });
  return (
    <div className="container mx-auto p-4">
          <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
    <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Online Examinations Report</h1>
    
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '10px',
      marginBottom: '30px'
    }}>
      <button style={commonStyle()} onClick={handleClick1}> Result Report</button>
      <button style={commonStyle()} onClick={handleClick2}>Exams Report</button>
      <button style={commonStyle()} onClick={handleClick3}> Student Exam Attempt Report </button>
      <button style={commonStyle()} onClick={handleClick4}>Exams Rank Report</button>
      
    </div>
  </div>
      <h1 className="text-2xl font-bold mb-6">Result Report</h1>
      
      {/* Search Criteria */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Select Criteria</h2>
        
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Exam *</label>
            <select
              name="exam"
              value={searchCriteria.exam}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Exam</option>
              {dummyData.exams.map((exam, index) => (
                <option key={index} value={exam}>{exam}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1 min-w-[150px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Class *</label>
            <select
              name="class"
              value={searchCriteria.class}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Class</option>
              {dummyData.classes.map((cls, index) => (
                <option key={index} value={cls}>{cls}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1 min-w-[120px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
            <select
              name="section"
              value={searchCriteria.section}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">All Sections</option>
              {dummyData.sections.map((sec, index) => (
                <option key={index} value={sec}>{sec}</option>
              ))}
            </select>
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={handleSearch}
              disabled={!searchCriteria.exam || !searchCriteria.class}
              className={`px-4 py-2 rounded-md ${
                searchCriteria.exam && searchCriteria.class
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Search
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      
      {/* Search Results */}
      {showResults && (
        <div className="bg-white rounded-lg shadow-md p-6">
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admission No</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Attempt</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remaining Attempt</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exam Submitted</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {searchResults.length > 0 ? (
                  searchResults.map((student, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">{student.admissionNo}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{student.class}({student.section})</td>
                      <td className="px-6 py-4 whitespace-nowrap">{student.totalAttempt}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{student.remainingAttempt}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {student.submitted ? '✓' : '✗'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button 
                          onClick={() => handleViewDetails(student)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          view
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                      No students found matching the criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Student Details Modal */}
      {selectedStudent && (
        <div className="bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold">Exam</h2>
                <button 
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6" >
                <div>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 font-medium">Student Name</td>
                        <td className="py-2">{selectedStudent.name} ({selectedStudent.admissionNo})</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-medium">Class</td>
                        <td className="py-2">{selectedStudent.class}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-medium">Section</td>
                        <td className="py-2">{selectedStudent.section}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-medium">Father Name</td>
                        <td className="py-2">{selectedStudent.fatherName}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-medium">Total Attempt</td>
                        <td className="py-2">{selectedStudent.totalAttempt}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 font-medium">Total Questions</td>
                        <td className="py-2">{selectedStudent.examDetails.totalQuestions}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-medium">Descriptive Questions</td>
                        <td className="py-2">{selectedStudent.examDetails.descriptiveQuestions}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-medium">Exam From</td>
                        <td className="py-2">{selectedStudent.examDetails.examFrom}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-medium">Exam To</td>
                        <td className="py-2">{selectedStudent.examDetails.examTo}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-medium">Duration</td>
                        <td className="py-2">{selectedStudent.examDetails.duration}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-medium">Passing (%)</td>
                        <td className="py-2">{selectedStudent.examDetails.passingPercentage}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-medium mb-2">Description:</h3>
                <p className="whitespace-pre-line">{selectedStudent.examDetails.description}</p>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultReport;