"use client";
// pages/course-report.js
import { useState } from 'react';
import Link from "next/link";

import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation';
// Complete dummy data with all courses and matching purchase counts
const courseData = {

  courses: [
    {
      id: 1,
      name: "A Course on Modern History",
      class: "Class 4",
      sections: "A, B, C, D",
      sellCount: 13,
      assignedTeacher: "Shivam Verma (9002)",
      createdBy: "Joe Black (9000)",
      purchases: [
        { student: "sapna (Guest - Guest147)", date: "05/03/2024", price: 225.00 },
        { student: "abadh (Guest - Guest148)", date: "05/03/2024", price: 225.00 },
        { student: "Ashu (Guest - Guest149)", date: "05/03/2024", price: 225.00 },
        { student: "Edward Thomas (Student - 18001)", date: "05/03/2024", price: 225.00 },
        { student: "Robin Peterson (Student - 18002)", date: "05/03/2024", price: 225.00 },
        { student: "Apolline (Student - 18016)", date: "05/03/2024", price: 225.00 },
        { student: "Jhonson wood (Student - 18025)", date: "05/03/2024", price: 225.00 },
        { student: "Scarlett Kennedy (Student - 07874)", date: "05/03/2024", price: 225.00 },
        { student: "Karuna Rana (Student - 18023)", date: "05/03/2024", price: 225.00 },
        { student: "Laura Clinton (Student - 18004)", date: "05/03/2024", price: 225.00 },
        { student: "Harry (Student - 53322)", date: "05/03/2024", price: 225.00 },
        { student: "Saurabh Shah (Student - 908875)", date: "05/03/2024", price: 225.00 },
        { student: "Brian Kohlar (Student - 18007)", date: "05/02/2024", price: 225.00 }
      ]
    },
    {
      id: 2,
      name: "Indias Geography",
      class: "Class 3",
      sections: "A, B, C, D",
      sellCount: 12,
      assignedTeacher: "Jason Shariton (90006)",
      createdBy: "Joe Black (9000)",
      purchases: [
        { student: "Student 1 (Guest - Guest150)", date: "05/01/2024", price: 200.00 },
        { student: "Student 2 (Student - 18008)", date: "05/02/2024", price: 200.00 },
        { student: "Student 3 (Guest - Guest151)", date: "05/03/2024", price: 200.00 },
        { student: "Student 4 (Student - 18009)", date: "05/03/2024", price: 200.00 },
        { student: "Student 5 (Guest - Guest152)", date: "05/03/2024", price: 200.00 },
        { student: "Student 6 (Student - 18010)", date: "05/03/2024", price: 200.00 },
        { student: "Student 7 (Guest - Guest153)", date: "05/03/2024", price: 200.00 },
        { student: "Student 8 (Student - 18011)", date: "05/03/2024", price: 200.00 },
        { student: "Student 9 (Guest - Guest154)", date: "05/03/2024", price: 200.00 },
        { student: "Student 10 (Student - 18012)", date: "05/03/2024", price: 200.00 },
        { student: "Student 11 (Guest - Guest155)", date: "05/03/2024", price: 200.00 },
        { student: "Student 12 (Student - 18013)", date: "05/03/2024", price: 200.00 }
      ]
    },
    {
      id: 3,
      name: "Communication Skills Courses",
      class: "Class 3",
      sections: "A, B, C, D",
      sellCount: 10,
      assignedTeacher: "Jason Shariton (90006)",
      createdBy: "Jason Shariton (90006)",
      purchases: [
        { student: "Participant 1 (Student - 18014)", date: "05/01/2024", price: 175.00 },
        { student: "Participant 2 (Guest - Guest156)", date: "05/02/2024", price: 175.00 },
        { student: "Participant 3 (Student - 18015)", date: "05/03/2024", price: 175.00 },
        { student: "Participant 4 (Guest - Guest157)", date: "05/03/2024", price: 175.00 },
        { student: "Participant 5 (Student - 18016)", date: "05/03/2024", price: 175.00 },
        { student: "Participant 6 (Guest - Guest158)", date: "05/03/2024", price: 175.00 },
        { student: "Participant 7 (Student - 18017)", date: "05/03/2024", price: 175.00 },
        { student: "Participant 8 (Guest - Guest159)", date: "05/03/2024", price: 175.00 },
        { student: "Participant 9 (Student - 18018)", date: "05/03/2024", price: 175.00 },
        { student: "Participant 10 (Guest - Guest160)", date: "05/03/2024", price: 175.00 }
      ]
    },
    // Add more courses as needed following the same pattern
  ]
};

export default function CourseReport() {
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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Filter courses based on search term
  const filteredCourses = courseData.courses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.assignedTeacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredCourses.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredCourses.length / rowsPerPage);

  // Handle view details - ensures we show exactly sellCount number of records
  const handleViewDetails = (course) => {
    // Verify purchase count matches sell count
    if (course.purchases.length !== course.sellCount) {
      console.warn(`Data mismatch: Course ${course.name} has sellCount ${course.sellCount} but ${course.purchases.length} purchase records`);
    }
    setSelectedCourse(course);
  };

  const buttonGroups = [
    [0, 1, 2],  // First column - 3 buttons
    [3, 4,5],     // Second column - 2 buttons
    [6,7],
    [8, 9] // Third column - 2 buttons
  ];
  // Handle back to list
  const handleBackToList = () => {
    setSelectedCourse(null);
  };

  // Detail view showing purchase records
  if (selectedCourse) {
    return (
      <div className="container mx-auto px-4 py-8">
       
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">{selectedCourse.name}</h1>
            <p className="text-gray-600">
              Class: {selectedCourse.class} | Sections: {selectedCourse.sections} | 
              Total Purchases: {selectedCourse.sellCount}
            </p>
          </div>
          <button
            onClick={handleBackToList}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Back to List
          </button>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search within purchases..."
            className="p-2 border rounded w-full md:w-1/3"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student / Guest</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchase Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price ($)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {selectedCourse.purchases.map((purchase, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{purchase.student}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{purchase.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{purchase.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          Showing all {selectedCourse.sellCount} purchase records
        </div>
      </div>
    );
  }

  // Main course list view
  return (
    <div className="container mx-auto px-4 py-8">
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
      <h1 className="text-2xl font-bold mb-6">Course Sell Count Report</h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search courses..."
          className="p-2 border rounded w-full md:w-1/3"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="text-gray-600 whitespace-nowrap">
          Total Courses: {filteredCourses.length}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Section</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sell Count</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned Teacher</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created By</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentRows.map((course) => (
              <tr key={course.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{course.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{course.class}</td>
                <td className="px-6 py-4 whitespace-nowrap">{course.sections}</td>
                <td className="px-6 py-4 whitespace-nowrap font-medium">{course.sellCount}</td>
                <td className="px-6 py-4 whitespace-nowrap">{course.assignedTeacher}</td>
                <td className="px-6 py-4 whitespace-nowrap">{course.createdBy}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleViewDetails(course)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View  
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredCourses.length > rowsPerPage && (
        <div className="mt-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-600">
            Showing {indexOfFirstRow + 1} to {Math.min(indexOfLastRow, filteredCourses.length)} of {filteredCourses.length} courses
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
            >
              Previous
            </button>
            <span className="px-3 py-1 flex items-center">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}