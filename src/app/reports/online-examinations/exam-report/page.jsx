"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ExamsReport() {
     
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
  // Dummy exam data
  const dummyExams = [
    {
      id: 1,
      exam: "Online English Exam",
      attempt: 10,
      examFrom: new Date(new Date().setDate(new Date().getDate() - 1)), // Yesterday
      examTo: new Date(new Date().setDate(new Date().getDate() + 7)), // Next week
      duration: "01:30:00",
      totalStudents: 58,
      questions: 9,
      examPublished: true,
      resultPublished: true
    },
    {
      id: 2,
      exam: "Mathematics Final",
      attempt: 5,
      examFrom: new Date(new Date().setDate(new Date().getDate() - 7)), // Last week
      examTo: new Date(new Date().setDate(new Date().getDate() - 6)), // Last week +1 day
      duration: "03:00:00",
      totalStudents: 120,
      questions: 25,
      examPublished: true,
      resultPublished: false
    },
    {
      id: 3,
      exam: "Science Midterm",
      attempt: 3,
      examFrom: new Date(), // Today
      examTo: new Date(new Date().setHours(new Date().getHours() + 2)), // Today +2 hours
      duration: "02:30:00",
      totalStudents: 85,
      questions: 20,
      examPublished: true,
      resultPublished: true
    },
    {
      id: 4,
      exam: "History Quiz",
      attempt: 1,
      examFrom: new Date(new Date().setDate(new Date().getDate() + 1)), // Tomorrow
      examTo: new Date(new Date().setDate(new Date().getDate() + 1.5)), // Tomorrow +12 hours
      duration: "00:30:00",
      totalStudents: 75,
      questions: 15,
      examPublished: false,
      resultPublished: false
    },
  ];

  // State for search criteria
  const [searchCriteria, setSearchCriteria] = useState({
    searchType: '',
    dataType: ''
  });

  // State for filtered exams
  const [filteredExams, setFilteredExams] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Filter exams based on search criteria
  const filterExams = () => {
    setHasSearched(true);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);

    let filtered = [...dummyExams];

    // Filter by search type (time period)
    if (searchCriteria.searchType) {
      filtered = filtered.filter(exam => {
        const examFromDate = new Date(exam.examFrom);
        examFromDate.setHours(0, 0, 0, 0);
        
        switch (searchCriteria.searchType) {
          case 'Today':
            return examFromDate.getTime() === today.getTime();
          case 'This Week':
            return examFromDate >= today && examFromDate <= nextWeek;
          case 'Last Week':
            return examFromDate >= oneWeekAgo && examFromDate < today;
          default:
            return true;
        }
      });
    }

    // Filter by data type (exam date range)
    if (searchCriteria.dataType) {
      filtered = filtered.filter(exam => {
        const examFromDate = new Date(exam.examFrom);
        const examToDate = new Date(exam.examTo);
        
        if (searchCriteria.dataType === 'Exam From Date') {
          return examFromDate >= today;
        } else if (searchCriteria.dataType === 'Exam To Date') {
          return examToDate >= today;
        }
        return true;
      });
    }

    setFilteredExams(filtered);
  };

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
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
      <h1 className="text-2xl font-bold mb-6">Exams Report</h1>
      
      
      {/* Search Criteria */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Select Criteria</h2>
        
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search Type</label>
            <select
              name="searchType"
              value={searchCriteria.searchType}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select</option>
              <option value="Today">Today</option>
              <option value="This Week">This Week</option>
              <option value="Last Week">Last Week</option>
            </select>
          </div>
          
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Data Type</label>
            <select
              name="dataType"
              value={searchCriteria.dataType}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">All</option>
              <option value="Exam From Date">Exam From Date</option>
              <option value="Exam To Date">Exam To Date</option>
            </select>
          </div>
          
          <button
            onClick={filterExams}
            className="bg-blue-600 text-black px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </div>
      </div>
      
      {/* Results Table */}
      {hasSearched && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">Exam Results</h2>
            <p className="text-sm text-gray-500">
              Showing results for: {searchCriteria.searchType || 'All time'}
              {searchCriteria.dataType ? ` (${searchCriteria.dataType})` : ''}
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exam</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attempt</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exam From</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exam To</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Students</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Questions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exam Published</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result Published</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredExams.length > 0 ? (
                  filteredExams.map((exam) => (
                    <tr key={exam.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{exam.exam}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.attempt}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(exam.examFrom)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(exam.examTo)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.duration}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.totalStudents}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.questions}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {exam.examPublished ? '✅' : '❌'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {exam.resultPublished ? '✅' : '❌'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="px-6 py-4 text-center text-sm text-gray-500">
                      No exams found matching your criteria
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
}