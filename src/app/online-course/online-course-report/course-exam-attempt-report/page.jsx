"use client";
// pages/report.js
import React, { useState } from 'react';
import Link from "next/link";

import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation';
import { FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';

export default function CourseExamAttemptReport() {
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

  // Dummy exam attempt data with publication status
  const dummyAttempts = [
    {
      id: 1,
      student: 'Crystal Wood (Guest - Guest165)',
      exam: 'Drawing Exam',
      examFrom: '05/01/2025',
      examTo: '05/30/2025',
      duration: '02:00:00',
      examPublished: true,
      resultPublished: false,
      courseId: 1
    },
    {
      id: 2,
      student: 'John Doe (Guest - Guest123)',
      exam: 'Plant Knowledge Test',
      examFrom: '05/05/2025',
      examTo: '05/25/2025',
      duration: '01:30:00',
      examPublished: true,
      resultPublished: true,
      courseId: 2
    },
    {
      id: 3,
      student: 'Jane Smith (Guest - Guest456)',
      exam: 'Trending Topics Exam',
      examFrom: '05/10/2025',
      examTo: '06/10/2025',
      duration: '03:00:00',
      examPublished: false,
      resultPublished: false,
      courseId: 3
    }
  ];

  // State management
  const [selectedCourse, setSelectedCourse] = useState('');
  const [attempts, setAttempts] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Search function
  const handleSearch = () => {
    if (selectedCourse) {
      const filteredAttempts = dummyAttempts.filter(
        attempt => attempt.courseId.toString() === selectedCourse
      );
      setAttempts(filteredAttempts);
      setHasSearched(true);
    }
  };

  // Icon renderer
  const renderStatusIcon = (status) => {
    if (status === true) {
      return <FaCheckCircle className="text-green-500 text-lg" />;
    } else if (status === false) {
      return <FaTimesCircle className="text-red-500 text-lg" />;
    }
    return <FaClock className="text-yellow-500 text-lg" />;
  };
  const buttonGroups = [
    [0, 1, 2],  // First column - 3 buttons
    [3, 4,5],     // Second column - 2 buttons
    [6,7],
    [8, 9] // Third column - 2 buttons
  ];
  return (
    <div className="min-h-screen bg-gray-50 p-4">
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
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm p-4">
        <h1 className="text-xl font-bold text-gray-800 mb-4">Course Exam Attempt Report</h1>
        
        {/* Search Criteria Section */}
        <div className="mb-6">
          <h2 className="text-md font-semibold text-gray-700 mb-2">Select Criteria</h2>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Course *</label>
              <select
                className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                <option value="">Select Course</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>{course.name}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            className="bg-blue-600 text-black px-4 py-1.5 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            onClick={handleSearch}
            disabled={!selectedCourse}
          >
            Search
          </button>
        </div>

        {/* Results Table - Only shown after search */}
        {hasSearched && (
          <div className="border border-gray-200 rounded">
            {attempts.length > 0 ? (
              <>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student/Guest</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exam</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exam From</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exam To</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex flex-col items-center">
                          <span>Exam</span>
                          <span>Published</span>
                        </div>
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex flex-col items-center">
                          <span>Result</span>
                          <span>Published</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {attempts.map(attempt => (
                      <tr key={attempt.id}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{attempt.student}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{attempt.exam}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{attempt.examFrom}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{attempt.examTo}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{attempt.duration}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex justify-center">
                            {renderStatusIcon(attempt.examPublished)}
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex justify-center">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="10" fill="#2E2E2E"/>
  <rect x="11" y="6" width="2" height="8" fill="white"/>
  <rect x="11" y="15" width="2" height="2" fill="white"/>
</svg>


                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="px-4 py-2 text-xs text-gray-500 border-t border-gray-200">
                  Records: 1 to {attempts.length} of {attempts.length}
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No records found for the selected course.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}