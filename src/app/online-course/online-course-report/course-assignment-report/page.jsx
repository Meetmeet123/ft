"use client";
import React, { useState } from 'react';
import Link from "next/link";

import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function CourseAssignmentReport() {
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
  // Dummy data for course assignments
  const assignmentsData = [
    {
      id: 1,
      courseName: 'Chemistry Course',
      assignmentTitle: 'A Chemical Reaction',
      assignmentDate: '03/01/2025',
      submitDate: '03/31/2025',
      createdBy: 'Joe Black (9000)',
      evaluatedBy: 1,
      totalStudent: 1,
      totalSubmit: 0,
      totalEvaluate: 1,
      totalGuest: 0,
      totalGuestSubmit: 0,
      totalGuestEvaluate: 0,
      totalStudentGuest: 2,
      students: [
        {
          id: 101,
          name: 'Robin Peterson (Student - 18002)',
          submitted: true,
          submittedDate: '03/01/2025',
          evaluated: false,
          evaluatedDate: ''
        },
        {
          id: 102,
          name: 'Alex Johnson (Student - 18003)',
          submitted: false,
          submittedDate: '',
          evaluated: false,
          evaluatedDate: ''
        }
      ]
    },
    {
      id: 2,
      courseName: 'Chemistry Course',
      assignmentTitle: 'Molecules in Motion',
      assignmentDate: '03/05/2025',
      submitDate: '03/28/2025',
      createdBy: 'Joe Black (9000)',
      evaluatedBy: 1,
      totalStudent: 0,
      totalSubmit: 0,
      totalEvaluate: 1,
      totalGuest: 0,
      totalGuestSubmit: 0,
      totalGuestEvaluate: 0,
      totalStudentGuest: 2,
      students: [
        {
          id: 201,
          name: 'Robin Peterson (Student - 18002)',
          submitted: false,
          submittedDate: '',
          evaluated: false,
          evaluatedDate: ''
        },
        {
          id: 202,
          name: 'cbf (Guest - Guest162)',
          submitted: false,
          submittedDate: '',
          evaluated: false,
          evaluatedDate: ''
        }
      ]
    },
    {
      id: 3,
      courseName: 'Music Courses',
      assignmentTitle: 'Music Assignment',
      assignmentDate: '04/01/2025',
      submitDate: '04/25/2025',
      createdBy: 'Joe Black (9000)',
      evaluatedBy: 0,
      totalStudent: 0,
      totalSubmit: 0,
      totalEvaluate: 0,
      totalGuest: 0,
      totalGuestSubmit: 0,
      totalGuestEvaluate: 0,
      totalStudentGuest: 0,
      students: []
    },
    {
      id: 4,
      courseName: 'Yoga for Kids',
      assignmentTitle: 'Yoga assignment',
      assignmentDate: '04/01/2025',
      submitDate: '04/30/2025',
      createdBy: 'Joe Black (9000)',
      evaluatedBy: 1,
      totalStudent: 0,
      totalSubmit: 0,
      totalEvaluate: 1,
      totalGuest: 0,
      totalGuestSubmit: 0,
      totalGuestEvaluate: 0,
      totalStudentGuest: 2,
      students: [
        {
          id: 401,
          name: 'Sarah Miller (Student - 18004)',
          submitted: false,
          submittedDate: '',
          evaluated: false,
          evaluatedDate: ''
        },
        {
          id: 402,
          name: 'yogalover (Guest - Guest163)',
          submitted: false,
          submittedDate: '',
          evaluated: false,
          evaluatedDate: ''
        }
      ]
    },
    {
      id: 5,
      courseName: 'Basic Drawing Skills course',
      assignmentTitle: 'Basic Drawing Arts',
      assignmentDate: '05/01/2025',
      submitDate: '05/31/2025',
      createdBy: 'Joe Black (9000)',
      evaluatedBy: 1,
      totalStudent: 0,
      totalSubmit: 0,
      totalEvaluate: 1,
      totalGuest: 1,
      totalGuestSubmit: 1,
      totalGuestEvaluate: 0,
      totalStudentGuest: 2,
      students: [
        {
          id: 501,
          name: 'Crystal Wood (Guest - Guest165)',
          submitted: true,
          submittedDate: '05/15/2025',
          evaluated: false,
          evaluatedDate: ''
        },
        {
          id: 502,
          name: 'Mike Johnson (Student - 18005)',
          submitted: false,
          submittedDate: '',
          evaluated: false,
          evaluatedDate: ''
        }
      ]
    }
  ];

  // State management
  const [assignments, setAssignments] = useState(assignmentsData);
  const [showStudentList, setShowStudentList] = useState(false);
  const [currentStudents, setCurrentStudents] = useState([]);
  const [currentAssignment, setCurrentAssignment] = useState(null);

  // Handle click on Total Student/Guest number
  const handleStudentGuestClick = (assignment) => {
    setCurrentStudents(assignment.students);
    setCurrentAssignment(assignment);
    setShowStudentList(true);
  };

  // Handle back to assignment list
  const handleBackToList = () => {
    setShowStudentList(false);
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
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-6">
        {!showStudentList ? (
          <>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Course Assignment Report</h1>
            
            {/* Search Section */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Search...</h2>
              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="flex-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Search
                </button>
              </div>
            </div>

            {/* Assignments Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignment Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignment Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submit Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created By</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Evaluated By</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Student</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Submit</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Evaluate</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Guest</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Submit</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Evaluate</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Student/Guest</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {assignments.map((assignment) => (
                    <tr key={assignment.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{assignment.courseName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{assignment.assignmentTitle}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{assignment.assignmentDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{assignment.submitDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{assignment.createdBy}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{assignment.evaluatedBy}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{assignment.totalStudent}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{assignment.totalSubmit}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{assignment.totalEvaluate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{assignment.totalGuest}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{assignment.totalGuestSubmit}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{assignment.totalGuestEvaluate}</td>
                      <td 
                        className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 cursor-pointer hover:underline"
                        onClick={() => handleStudentGuestClick(assignment)}
                      >
                        {assignment.totalStudentGuest}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Records count */}
            <div className="mt-4 text-sm text-gray-500">
              Records: 1 to {assignments.length} of {assignments.length}
            </div>
          </>
        ) : (
          /* Student List View */
          <div>
            <button
              className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
              onClick={handleBackToList}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Assignment Report
            </button>

            <h1 className="text-2xl font-bold text-gray-800 mb-6">Student List</h1>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              {currentAssignment.courseName} - {currentAssignment.assignmentTitle}
            </h2>

            {/* Students Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student/ Guest</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Evaluated</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Evaluated Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentStudents.length > 0 ? (
                    currentStudents.map((student) => (
                      <tr key={student.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {student.submitted ? (
                            <FaCheck className="text-green-500" />
                          ) : (
                            <span className="text-red-500">0</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.submittedDate || '-'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {student.evaluated ? (
                            <FaCheck className="text-green-500" />
                          ) : (
                            <span className="text-red-500">0</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="10" fill="#2E2E2E"/>
  <rect x="11" y="6" width="2" height="8" fill="white"/>
  <rect x="11" y="15" width="2" height="2" fill="white"/>
</svg>
</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                        No students found for this assignment
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}