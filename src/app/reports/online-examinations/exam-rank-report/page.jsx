"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ExamRankReport() {
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
  // Dummy exam data (same as previous implementation)
  const dummyExams = [
    { exam: "Essay Writing", class: "Class 5", section: "A" },
    { exam: "Mathematics Quiz", class: "Class 5", section: "B" },
    { exam: "Science Test", class: "Class 6", section: "A" },
    { exam: "English Exam", class: "Class 5", section: "B" }
  ];

  // Dummy student rank data
  const dummyRankData = [
    {
      rank: 1,
      admissionNo: 18001,
      studentName: "Edward Thomas",
      class: "Class 5",
      fatherName: "Mr. Thomas",
      examSubmitted: true,
      totalQuestions: 10,
      descriptiveCorrect: 8,
      wrongAnswer: 1,
      notAttempted: 1,
      totalExamMarks: 100,
      totalNegativeMarks: 2,
      totalScoredMarks: 78,
      scorePercentage: 78
    },
    {
      rank: 2,
      admissionNo: 18002,
      studentName: "Robin Peterson",
      class: "Class 5",
      fatherName: "Mr. Peterson",
      examSubmitted: true,
      totalQuestions: 10,
      descriptiveCorrect: 7,
      wrongAnswer: 2,
      notAttempted: 1,
      totalExamMarks: 100,
      totalNegativeMarks: 4,
      totalScoredMarks: 66,
      scorePercentage: 66
    },
    {
      rank: 3,
      admissionNo: 18005,
      studentName: "Glen Stark",
      class: "Class 5",
      fatherName: "Mr. Stark",
      examSubmitted: true,
      totalQuestions: 10,
      descriptiveCorrect: 6,
      wrongAnswer: 3,
      notAttempted: 1,
      totalExamMarks: 100,
      totalNegativeMarks: 6,
      totalScoredMarks: 54,
      scorePercentage: 54
    },
    {
      rank: 4,
      admissionNo: 18007,
      studentName: "Brian Kohler",
      class: "Class 5",
      fatherName: "Mr. Kohler",
      examSubmitted: true,
      totalQuestions: 10,
      descriptiveCorrect: 5,
      wrongAnswer: 4,
      notAttempted: 1,
      totalExamMarks: 100,
      totalNegativeMarks: 8,
      totalScoredMarks: 42,
      scorePercentage: 42
    }
  ];

  // State for search criteria
  const [searchCriteria, setSearchCriteria] = useState({
    exam: '',
    class: '',
    section: ''
  });

  // State for filtered data
  const [filteredData, setFilteredData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Get unique classes based on selected exam
  const getClasses = () => {
    if (!searchCriteria.exam) return [];
    return [...new Set(dummyExams
      .filter(e => e.exam === searchCriteria.exam)
      .map(e => e.class))];
  };

  // Get unique sections based on selected exam and class
  const getSections = () => {
    if (!searchCriteria.exam || !searchCriteria.class) return [];
    return [...new Set(dummyExams
      .filter(e => e.exam === searchCriteria.exam && e.class === searchCriteria.class)
      .map(e => e.section))];
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria(prev => ({
      ...prev,
      [name]: value,
      // Reset dependent fields when parent field changes
      ...(name === 'exam' && { class: '', section: '' }),
      ...(name === 'class' && { section: '' })
    }));
  };

  // Handle search
  const handleSearch = () => {
    if (!searchCriteria.exam || !searchCriteria.class || !searchCriteria.section) {
      alert('Please select Exam, Class, and Section');
      return;
    }

    setHasSearched(true);
    
    // Filter rank data based on selected criteria
    const filtered = dummyRankData.filter(student => 
      student.class === searchCriteria.class
    );
    
    setFilteredData(filtered);
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
      <h1 className="text-2xl font-bold mb-6">Exam Rank Report</h1>
      
      {/* Search Criteria */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Select Criteria</h2>
        
        <div className="flex flex-wrap gap-4 items-end">

        <div className="flex-1 min-w-[200px]">

            <label className="block text-sm font-medium text-gray-700 mb-1">Exam*</label>
            <select
              name="exam"
              value={searchCriteria.exam}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Exam</option>
              {[...new Set(dummyExams.map(e => e.exam))].map(exam => (
                <option key={exam} value={exam}>{exam}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1 min-w-[200px]">

            <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
            <select
              name="class"
              value={searchCriteria.class}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              disabled={!searchCriteria.exam}
            >
              <option value="">Select Class</option>
              {getClasses().map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1 min-w-[200px]">

            <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
            <select
              name="section"
              value={searchCriteria.section}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              disabled={!searchCriteria.class}
            >
              <option value="">Select Section</option>
              {getSections().map(sec => (
                <option key={sec} value={sec}>{sec}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="mt-4">
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-black px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </div>
      </div>
      
      {/* Results Section */}
      {hasSearched && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {filteredData.length > 0 ? (
            <>
              <div className="p-4 border-b">
                <h2 className="text-xl font-semibold">Exam Rank Report</h2>
                <p className="text-sm text-gray-500">
                  Showing results for: {searchCriteria.exam} - {searchCriteria.class} - {searchCriteria.section}
                </p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admission No</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Father Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exam Submitted</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Questions</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descriptive Correct</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wrong Answer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Not Attempted</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Exam Marks</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Negative Marks</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Scored Marks</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score (%)</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredData.map((student) => (
                      <tr key={student.admissionNo}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.rank}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.admissionNo}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.studentName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.class}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.fatherName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {student.examSubmitted ? '✅' : '❌'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.totalQuestions}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.descriptiveCorrect}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.wrongAnswer}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.notAttempted}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.totalExamMarks}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.totalNegativeMarks}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.totalScoredMarks}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.scorePercentage}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="p-4 text-center">
              <h2 className="text-xl font-semibold">Exam Rank Report</h2>
              <p className="text-gray-500 mt-2">Exam Rank Not Generated.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}