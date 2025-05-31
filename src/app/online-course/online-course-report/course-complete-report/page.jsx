"use client";
import React, { useState } from 'react';
import Link from "next/link";

import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation';

const CourseCompleteReport = () => {
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
  const dummyData = {
    classes: [
      { id: 1, name: 'Class 1' },
      { id: 2, name: 'Class 2' }
    ],
    sections: [
      { id: 1, name: 'A', classId: 1 },
      { id: 2, name: 'B', classId: 1 },
      { id: 3, name: 'A', classId: 2 }
    ],
    courses: [
      { id: 1, name: 'TRADING COURSE' },
      { id: 2, name: 'Music Courses' }
    ],
    students: [
      { id: 18001, name: 'Edward Thomas', classId: 1, sectionId: 1 },
      { id: 18002, name: 'Robin Peterson', classId: 1, sectionId: 1 },
      { id: 18005, name: 'Glen Stark', classId: 1, sectionId: 1 },
      { id: 18007, name: 'Brian Kohlar', classId: 1, sectionId: 1 },
      { id: 18004, name: 'Laura Clinton', classId: 1, sectionId: 2 },
      { id: 18008, name: 'David Heart', classId: 1, sectionId: 2 },
      { id: 18013, name: 'Benjamin Gates', classId: 2, sectionId: 3 },
      { id: 11025, name: 'Surya Lalwani', classId: 2, sectionId: 3 },
      { id: 18009, name: 'Kavya Roy', classId: 2, sectionId: 3 },
      { id: 18016, name: 'Apolline', classId: 2, sectionId: 3 }
    ],
    guests: [
      { id: 20001, name: 'Guest User 1' },
      { id: 20002, name: 'Guest User 2' },
      { id: 20003, name: 'Guest User 3' }
    ],
    performanceData: {
      '18001_1': {
        totalLesson: 1,
        completedLesson: 0,
        totalAssignment: 0,
        assignmentCompleted: 0,
        totalQuiz: 0,
        completedQuiz: 0,
        totalExams: 0,
        examsCompleted: 0,
        percentage: 0
      },
      '18002_1': {
        totalLesson: 1,
        completedLesson: 1,
        totalAssignment: 0,
        assignmentCompleted: 0,
        totalQuiz: 0,
        completedQuiz: 0,
        totalExams: 0,
        examsCompleted: 0,
        percentage: 50
      }
    }
  };

  // State management
  const [userType, setUserType] = useState('Student');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [selectedPerformance, setSelectedPerformance] = useState(null);

  // Filter sections based on selected class
  const filteredSections = dummyData.sections.filter(
    section => section.classId === parseInt(selectedClass)
  );

  // Filter students based on selected class and section
  const filteredStudents = dummyData.students.filter(
    student => student.classId === parseInt(selectedClass) && 
              (selectedSection ? student.sectionId === parseInt(selectedSection) : true)
  );

  // Filter users based on user type and search term
  const filteredUsers = userType === 'Student' 
    ? filteredStudents.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : dummyData.guests.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()));

  // Handle search button click
  const handleSearch = () => {
    if ((userType === 'Student' && selectedClass && selectedCourse) || 
        (userType === 'Guest' && selectedCourse)) {
      setShowResults(true);
    }
  };

  // Handle view performance button click
  const handleViewPerformance = (userId) => {
    const performanceKey = `${userId}_${selectedCourse}`;
    setSelectedPerformance(dummyData.performanceData[performanceKey] || {
      totalLesson: 1,
      completedLesson: 0,
      totalAssignment: 0,
      assignmentCompleted: 0,
      totalQuiz: 0,
      completedQuiz: 0,
      totalExams: 0,
      examsCompleted: 0,
      percentage: 0
    });
  };
  const buttonGroups = [
    [0, 1, 2],  // First column - 3 buttons
    [3, 4,5],     // Second column - 2 buttons
    [6,7],
    [8, 9] // Third column - 2 buttons
  ];
  return (
    <div className="container mx-auto p-4">
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
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h1 className="text-2xl font-bold mb-6">Course Complete Report</h1>
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

            <label className="block text-sm font-medium text-gray-700 mb-1">Users Type*</label>
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={userType}
              onChange={(e) => {
                setUserType(e.target.value);
                setSelectedClass('');
                setSelectedSection('');
                setSelectedCourse('');
                setShowResults(false);
              }}
            >
              <option value="Student">Student</option>
              <option value="Guest">Guest</option>
            </select>
          </div>
          
          {userType === 'Student' && (
            <>
                     <div className="flex-1 min-w-[200px]">

                <label className="block text-sm font-medium text-gray-700 mb-1">Class*</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded"
                  value={selectedClass}
                  onChange={(e) => {
                    setSelectedClass(e.target.value);
                    setSelectedSection('');
                    setShowResults(false);
                  }}
                >
                  <option value="">Select</option>
                  {dummyData.classes.map(cls => (
                    <option key={cls.id} value={cls.id}>{cls.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex-1 min-w-[200px]">

                <label className="block text-sm font-medium text-gray-700 mb-1">Section*</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded"
                  value={selectedSection}
                  onChange={(e) => {
                    setSelectedSection(e.target.value);
                    setShowResults(false);
                  }}
                  disabled={!selectedClass}
                >
                  <option value="">Select</option>
                  {filteredSections.map(section => (
                    <option key={section.id} value={section.id}>{section.name}</option>
                  ))}
                </select>
              </div>
            </>
          )}
          
          <div className="flex-1 min-w-[200px]">

            <label className="block text-sm font-medium text-gray-700 mb-1">Course*</label>
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={selectedCourse}
              onChange={(e) => {
                setSelectedCourse(e.target.value);
                setShowResults(false);
              }}
            >
              <option value="">Select</option>
              {dummyData.courses.map(course => (
                <option key={course.id} value={course.id}>{course.name}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <input
            type="text"
            className="flex-1 p-2 border border-gray-300 rounded"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button style={{backgroundColor:'darkgray',color:'white'}}
            className="bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            onClick={handleSearch}
            disabled={
              (userType === 'Student' && (!selectedClass || !selectedCourse)) ||
              (userType === 'Guest' && !selectedCourse)
            }
          >
            Search
          </button>
        </div>
      </div>
      
      {showResults && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
           
          
         
          
           
          
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student/Guest</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course progress</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.name} ({userType} - {user.id})
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {/* {dummyData.courses.find(c => c.id === parseInt(selectedCourse))?.name} */}
                    0
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button style={{backgroundColor:'darkgray',color:'white'}}
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleViewPerformance(user.id)}
                    >
                      Course Performance
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {selectedPerformance && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Course Performance</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Total Lesson:</p>
                <p className="font-semibold">{selectedPerformance.totalLesson}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Completed Lesson:</p>
                <p className="font-semibold">{selectedPerformance.completedLesson}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Assignment:</p>
                <p className="font-semibold">{selectedPerformance.totalAssignment}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Assignment Completed:</p>
                <p className="font-semibold">{selectedPerformance.assignmentCompleted}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Quiz:</p>
                <p className="font-semibold">{selectedPerformance.totalQuiz}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Completed Quiz:</p>
                <p className="font-semibold">{selectedPerformance.completedQuiz}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Exams:</p>
                <p className="font-semibold">{selectedPerformance.totalExams}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Exams Completed:</p>
                <p className="font-semibold">{selectedPerformance.examsCompleted}</p>
              </div>
            </div>
            
            <div className="text-center my-6">
              <div className="text-3xl font-bold">{selectedPerformance.percentage}%</div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${selectedPerformance.percentage}%` }}
                ></div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setSelectedPerformance(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseCompleteReport;