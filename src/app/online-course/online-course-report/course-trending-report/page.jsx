"use client";
import React, { useState } from 'react';
import Link from "next/link";

import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation';

const CourseTrendingReport = () => {
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
    
  // Dummy data
  const initialCourses = [
    {
      id: 1,
      course: 'How To Write A Novel For Beginners',
      class: 'Class 3',
      section: 'A, B, C, D',
      viewCount: 84,
      assignTeacher: 'Shivam Verma (9002)',
      createdBy: 'Joe Black (9000)',
      price: 200.00,
      currentPrice: 180.00
    },
    {
      id: 2,
      course: 'Digital Painting Courses',
      class: 'Class 3',
      section: 'A, B, C, D',
      viewCount: 24,
      assignTeacher: 'Jason Shariton (90006)',
      createdBy: 'Joe Black (9000)',
      price: 250.00,
      currentPrice: 225.00
    },
    {
      id: 3,
      course: 'Communication Skills Courses',
      class: 'Class 3',
      section: 'A, B, C, D',
      viewCount: 21,
      assignTeacher: 'Jason Shariton (90006)',
      createdBy: 'Jason Shariton (90006)',
      price: 200.00,
      currentPrice: 170.00
    },
    {
      id: 4,
      course: 'Fundamentals of Energy Course',
      class: 'Class 5',
      section: 'A, B, C, D',
      viewCount: 20,
      assignTeacher: 'Jason Shariton (90006)',
      createdBy: 'Joe Black (9000)',
      price: 200.00,
      currentPrice: 180.00
    },
    {
      id: 5,
      course: 'Communication Skills course',
      class: 'Class 3',
      section: 'A, B, C, D',
      viewCount: 18,
      assignTeacher: 'Shivam Verma (9002)',
      createdBy: 'Jason Shariton (90006)',
      price: 250.00,
      currentPrice: 225.00
    }
  ];

  // State management
  const [courses, setCourses] = useState(initialCourses);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter courses based on search term
  const filteredCourses = courses.filter(course =>
    course.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.assignTeacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.createdBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate summary data
  const class3Count = courses.filter(course => course.class === 'Class 3').length;
  const shivamCourses = courses.filter(course => course.assignTeacher.includes('Shivam Verma'));
  const joeCourses = courses.filter(course => course.createdBy.includes('Joe Black'));
  const totalPrice = courses.reduce((sum, course) => sum + course.price, 0);

  const buttonGroups = [
    [0, 1, 2],  // First column - 3 buttons
    [3, 4,5],     // Second column - 2 buttons
    [6,7],
    [8, 9] // Third column - 2 buttons
  ];

  return (
    <div className="course-report-container">
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
  <br />
      <h1 style={{fontSize:'20px'}}> Course Trending Report</h1>
      <br />
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="course-table">
        <thead>
          <tr>
            <th>Course</th>
            <th>Class</th>
            <th>Section</th>
            <th>View Count</th>
            <th>Assign Teacher</th>
            <th>Created By</th>
            <th>Price ($)</th>
            <th>Current Price ($)</th>
          </tr>
        </thead>
        <tbody>
          {filteredCourses.map(course => (
            <tr key={course.id}>
              <td>{course.course}</td>
              <td>{course.class}</td>
              <td>{course.section}</td>
              <td>{course.viewCount}</td>
              <td>{course.assignTeacher}</td>
              <td>{course.createdBy}</td>
              <td>{course.price.toFixed(2)}</td>
              <td>{course.currentPrice.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      
    </div>
  );
};

// CSS styles
const styles = `
  .course-report-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .search-bar {
    margin-bottom: 20px;
  }

  .search-bar input {
    width: 100%;
    max-width: 400px;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .course-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }

  .course-table th, .course-table td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  .course-table th {
    background-color: #f2f2f2;
    font-weight: bold;
  }

  .summary-section {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #ddd;
  }

  .summary-item {
    padding: 8px 16px;
    background-color: #f9f9f9;
    border-radius: 4px;
  }
`;

// Add styles to the head
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = styles;
  document.head.appendChild(styleElement);
}

export default CourseTrendingReport;