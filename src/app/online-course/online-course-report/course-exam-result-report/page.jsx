"use client";
import { useState } from 'react';
import Link from "next/link";

import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation';

export default function CourseExamReport() {
    const router = useRouter();
    const pathname = usePathname();
    
      
    const attendanceMenuItems = [
        { 
          title: "Student Course Purchase Report",
          path: "../online-course-report/student-course-purchase-report" 
        },
        { 
          title: "Course Sell Count Report", 
          path: "../online-course-report/course-sell-count-report" 
        },
        { 
          title: "Course Trending Report",
          path: "../online-course-report/course-trending-report" 
        },
        { 
          title: "Course Complete Report",
          path: "../online-course-report/course-complete-report" 
        },
        { 
          title: "Course Rating Report",
          path: "../online-course-report/course-rating-report" 
        },
        { 
          title: "Guest Report",
          path: "../online-course-report/guest-report" 
        },
        { 
          title: "Course Assignment Report",
          path: "../online-course-report/course-assignment-report" 
        },
        { 
            title: "Course Exam Result Report",
            path: "../online-course-report/course-exam-result-report" 
          },
          { 
            title: "Course Exam Report",
            path: "../online-course-report/course-exam-report" 
          },
          { 
            title: "Course Exam Attempt Report",
            path: "../online-course-report/course-exam-attempt-report" 
          }
        
      ];
  const courses = [
    { id: 1, name: 'Basic Drawing Skills course' },
    { id: 2, name: 'Understanding Plants' },
    { id: 3, name: 'Trending Course' },
    { id: 4, name: 'Writing Course' },
    { id: 5, name: 'The Art Science and Drawing' }
  ];

  const exams = [
    { id: 1, name: 'Drawing Exam', courseId: 1 },
    { id: 2, name: 'Plant Knowledge Test', courseId: 2 },
    { id: 3, name: 'Trending Topics Exam', courseId: 3 },
    { id: 4, name: 'Writing Skills Test', courseId: 4 },
    { id: 5, name: 'Art Science Exam', courseId: 5 }
  ];

  const reports = [
    {
      id: 1,
      student: 'Crystal Wood (Guest - Guest165)',
      totalAttempt: 10,
      remainingAttempt: 9,
      examSubmitted: '05/02/2025',
      courseId: 1,
      examId: 1
    },
    {
      id: 2,
      student: 'John Doe (Guest - Guest123)',
      totalAttempt: 5,
      remainingAttempt: 3,
      examSubmitted: '04/28/2025',
      courseId: 2,
      examId: 2
    },
    {
      id: 3,
      student: 'Jane Smith (Guest - Guest456)',
      totalAttempt: 8,
      remainingAttempt: 6,
      examSubmitted: '05/01/2025',
      courseId: 3,
      examId: 3
    },
    {
      id: 4,
      student: 'Mike Johnson (Guest - Guest789)',
      totalAttempt: 7,
      remainingAttempt: 5,
      examSubmitted: '04/30/2025',
      courseId: 4,
      examId: 4
    },
    {
      id: 5,
      student: 'Sarah Williams (Guest - Guest012)',
      totalAttempt: 12,
      remainingAttempt: 10,
      examSubmitted: '05/03/2025',
      courseId: 5,
      examId: 5
    }
  ];

  // State management
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedExam, setSelectedExam] = useState('');
  const [filteredReports, setFilteredReports] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [filteredExams, setFilteredExams] = useState(exams);

  // Handle course selection change
  const handleCourseChange = (e) => {
    const courseId = e.target.value;
    setSelectedCourse(courseId);
    setSelectedExam('');
    
    if (courseId) {
      const examsForCourse = exams.filter(exam => exam.courseId.toString() === courseId);
      setFilteredExams(examsForCourse);
    } else {
      setFilteredExams(exams);
    }
  };

  // Search function
  const handleSearch = () => {
    if (selectedCourse && selectedExam) {
      const results = reports.filter(
        report => report.courseId.toString() === selectedCourse && 
                 report.examId.toString() === selectedExam
      );
      setFilteredReports(results);
    }
  };

  // View details function
  const handleView = (report) => {
    setSelectedReport(report);
    setShowDetails(true);
  };

  // Back to report function
  const handleBack = () => {
    setShowDetails(false);
  };
  const buttonGroups = [
    [0, 1, 2],  // First column - 3 buttons
    [3, 4,5],     // Second column - 2 buttons
    [6,7],
    [8, 9] // Third column - 2 buttons
  ];
  return (
    <div className="min-h-screen bg-gray-50 p-6">
        <div style={{
    
    backgroundColor: '#f9fafb',
    padding: '24px',
    fontFamily: 'Arial, sans-serif'
  }}>
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <h1 style={{
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: '32px'
      }}>Online Course Report</h1>
      
      <div style={{
        display: 'flex',
        gap: '16px'
      }}>
        {/* Render button groups as columns */}
        {buttonGroups.map((group, groupIndex) => (
          <div 
            key={groupIndex}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              flex: groupIndex === 0 ? '1.5' : '1' // First column wider for long text
            }}
          >
            {group.map((itemIndex) => {
              const item = attendanceMenuItems[itemIndex];
              const isActive = pathname === item.path;
              
              return (
                <Link href={item.path} key={itemIndex} passHref legacyBehavior>
                  <button
                    style={{
                      padding: '16px 24px',
                      borderRadius: '8px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                      border: '1px solid #e5e7eb',
                      transition: 'all 0.3s ease',
                      backgroundColor: isActive ? '#f0f9ff' : '#ffffff',
                      borderColor: isActive ? '#bfdbfe' : '#e5e7eb',
                      color: isActive ? '#1d4ed8' : '#1f2937',
                      textAlign: 'left',
                      cursor: 'pointer',
                      width: '100%',
                      ':hover': {
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        borderColor: '#d1d5db'
                      }
                    }}
                  >
                    <h3 style={{
                      fontWeight: '500',
                      fontSize: '16px',
                      margin: '0'
                    }}>{item.title}</h3>
                  </button>
                </Link>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  </div>
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Course Exam Result Report</h1>
        
        {!showDetails ? (
          <>
            {/* Search Criteria Section */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Select Criteria</h2>
              <div style={{ 
        backgroundColor: '#f3f4f6', 
        padding: '15px', 
        borderRadius: '8px', 
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        flexWrap: 'wrap'
      }}>
                    <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course*</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={selectedCourse}
                    onChange={handleCourseChange}
                  >
                    <option value="">Select Course</option>
                    {courses.map(course => (
                      <option key={course.id} value={course.id}>{course.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Exam*</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={selectedExam}
                    onChange={(e) => setSelectedExam(e.target.value)}
                    disabled={!selectedCourse}
                  >
                    <option value="">Select Exam</option>
                    {filteredExams.map(exam => (
                      <option key={exam.id} value={exam.id}>{exam.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                className="bg-blue-600 text-black px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                onClick={handleSearch}
                disabled={!selectedCourse || !selectedExam}
              >
                Search
              </button>
            </div>

            {/* Results Table */}
            {filteredReports.length > 0 && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student/Quest</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Attempt</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remaining Attempt</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exam Submitted</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredReports.map(report => (
                      <tr key={report.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.student}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.totalAttempt}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.remainingAttempt}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.examSubmitted}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button
                            className="text-blue-600 hover:text-blue-800 focus:outline-none"
                            onClick={() => handleView(report)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        ) : (
          /* Details View */
          <div className="space-y-6">
            <button
              className="flex items-center text-blue-600 hover:text-blue-800 focus:outline-none"
              onClick={handleBack}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Report
            </button>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Exam Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Course & Exam Info */}
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-gray-700 mb-3 border-b pb-2">Course & Exam Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Course</p>
                      <p className="text-gray-800">
                        {courses.find(c => c.id === selectedReport.courseId)?.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Exam</p>
                      <p className="text-gray-800">
                        {exams.find(e => e.id === selectedReport.examId)?.name}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Student Info */}
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-gray-700 mb-3 border-b pb-2">Student Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Student</p>
                      <p className="text-gray-800">{selectedReport.student}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Exam Submitted</p>
                      <p className="text-gray-800">{selectedReport.examSubmitted}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Attempt Info */}
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-700 mb-3 border-b pb-2">Attempt Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-500">Total Attempt</span>
                      <span className="text-sm font-medium text-gray-800">{selectedReport.totalAttempt}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${(selectedReport.totalAttempt / 15) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-500">Remaining Attempt</span>
                      <span className="text-sm font-medium text-gray-800">{selectedReport.remainingAttempt}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-green-600 h-2.5 rounded-full" 
                        style={{ width: `${(selectedReport.remainingAttempt / 15) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}