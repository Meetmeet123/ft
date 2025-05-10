"use client";
import { useState } from 'react';
import Link from "next/link";

import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation';

const CourseRatingReport = () => {
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
  const initialCourses = [
    {
      id: 1,
      title: 'Basic Drawing Skills course',
      class: 'Class 5 (A)',
      rating: 4,
      reviewCount: 2,
      reviews: [
        {
          id: 1,
          studentName: 'Crystal Wood (Guest - Guest165)',
          rating: 5,
          review: 'The class was very good, very informative. I learned a lot.'
        },
        {
          id: 2,
          studentName: 'Benjamin Gates (Student - 18013)',
          rating: 5,
          review: 'Everything I needed to get started in drawing. The instructor\'s relaxed easy going style was very helpful.'
        }
      ]
    },
    {
      id: 2,
      title: 'Yoga for kids',
      class: 'Class 5 (A)',
      rating: 4,
      reviewCount: 2,
      reviews: [
        {
          id: 1,
          studentName: 'Alice Smith (Student - 18014)',
          rating: 4,
          review: 'Great introduction to yoga for children.'
        },
        {
          id: 2,
          studentName: 'Robert Johnson (Guest - Guest166)',
          rating: 4,
          review: 'My kids loved the classes!'
        }
      ]
    },
    {
      id: 3,
      title: 'Chemistry Course',
      class: 'Class 4 (A)',
      rating: 4,
      reviewCount: 1,
      reviews: [
        {
          id: 1,
          studentName: 'David Wilson (Student - 18015)',
          rating: 4,
          review: 'Good basic chemistry course.'
        }
      ]
    },
    // Add more courses as needed...
    {
      id: 15,
      title: 'Indias Geography',
      class: 'Class 3 (A)',
      rating: 4,
      reviewCount: 6,
      reviews: [
        {
          id: 1,
          studentName: 'Student 1',
          rating: 4,
          review: 'Review 1'
        },
        // Add more reviews...
      ]
    }
  ];

  // State management
  const [courses, setCourses] = useState(initialCourses);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [view, setView] = useState('list'); // 'list' or 'details'

  // Filter courses based on search term
  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle view change to show rating details
  const showRatingDetails = (course) => {
    setSelectedCourse(course);
    setView('details');
  };

  // Handle delete review
  const deleteReview = (courseId, reviewId) => {
    try {
      const updatedCourses = courses.map(course => {
        if (course.id === courseId) {
          const updatedReviews = course.reviews.filter(review => review.id !== reviewId);
          
          // Calculate new average rating
          const newRating = updatedReviews.length > 0 
            ? Math.round(updatedReviews.reduce((sum, review) => sum + review.rating, 0) / updatedReviews.length * 10) / 10
            : 0;
          
          return {
            ...course,
            reviews: updatedReviews,
            reviewCount: updatedReviews.length,
            rating: newRating
          };
        }
        return course;
      });
      
      setCourses(updatedCourses);
      
      // Update selected course if it's the one being viewed
      if (selectedCourse && selectedCourse.id === courseId) {
        const updatedCourse = updatedCourses.find(c => c.id === courseId);
        setSelectedCourse(updatedCourse);
      }
      
    } catch (error) {
      console.error("Error deleting review:", error);
      // You might want to add error handling UI here
    }
  };

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} style={{ color: i < rating ? '#FFD700' : '#C0C0C0' }}>
          {i < rating ? '★' : '☆'}
        </span>
      );
    }
    return stars;
  };

  // Render different views
  const renderView = () => {
    switch (view) {
      case 'list':
        return renderCourseList();
      case 'details':
        return renderRatingDetails();
      default:
        return renderCourseList();
    }
  };

  const buttonGroups = [
    [0, 1, 2],  // First column - 3 buttons
    [3, 4,5],     // Second column - 2 buttons
    [6,7],
    [8, 9] // Third column - 2 buttons
  ];
  // Render course list view
  const renderCourseList = () => (
    <div className="course-rating-container">
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
      <h1  style={{fontSize:'20px'}}>Course Rating Report</h1>
      <br />
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* <span className="records-count">100 ▼</span> */}
      </div>

      <table className="course-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Class ▼</th>
            <th>Rating ▼</th>
            <th>Review Count ▼</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredCourses.map(course => (
            <tr key={course.id}>
              <td>{course.title}</td>
              <td>{course.class}</td>
              <td>{renderStars(course.rating)}</td>
              <td>{course.reviewCount}</td>
              <td>
                <button 
                  className="view-button"
                  onClick={() => showRatingDetails(course)}
                  disabled={course.reviewCount === 0}
                >
                  {course.reviewCount > 0 ? 'View' : 'No reviews'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Render rating details view
  const renderRatingDetails = () => (
    <div className="rating-details-container">
      <h1>Rating Details</h1>
      <button 
        className="back-button"
        onClick={() => setView('list')}
      >
        Back to Course List
      </button>
      
      <h2>{selectedCourse.title} - {selectedCourse.class}</h2>
      <p>Average Rating: {renderStars(selectedCourse.rating)} ({selectedCourse.rating.toFixed(1)})</p>
      <p>Total Reviews: {selectedCourse.reviewCount}</p>

      <table className="reviews-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Rating</th>
            <th>Review</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {selectedCourse.reviews.map(review => (
            <tr key={review.id}>
              <td>{review.studentName}</td>
              <td>{renderStars(review.rating)}</td>
              <td>{review.review}</td>
              <td>
                <button 
                  className="delete-button"
                  onClick={() => deleteReview(selectedCourse.id, review.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="main-container">
      {renderView()}
    </div>
  );
};

// CSS styles
const styles = `
  .main-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .course-rating-container, .rating-details-container {
    width: 100%;
  }

  .search-bar {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
  }

  .search-bar input {
    flex: 1;
    max-width: 400px;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .records-count {
    color: #666;
    font-size: 14px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }

  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f2f2f2;
    font-weight: bold;
  }

  .view-button, .back-button, .delete-button {
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .view-button {
    background-color: #2196F3;
    color: white;
  }

  .view-button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

  .back-button {
    background-color: #4CAF50;
    color: white;
    margin-bottom: 20px;
  }

  .delete-button {
    background-color: #f44336;
    color: white;
  }

  .rating-details-container h2 {
    margin: 20px 0 10px;
  }

  .rating-details-container p {
    margin-bottom: 20px;
  }
`;

// Add styles to the head
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = styles;
  document.head.appendChild(styleElement);
}

export default CourseRatingReport;