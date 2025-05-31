


"use client";
import React, { useState } from 'react';
import { FaEdit, FaTrash, FaEye, FaPlay, FaLink, FaChevronDown, FaChevronUp, FaPlus, FaTable, FaList } from 'react-icons/fa';

export default function CourseManagement() {
  const coursesData = [
    {
      id: 1,
      title: "400 DRAWING OF CUTE THINGS",
      instructor: "Shamai Verma (6002)",
      lastUpdated: "04/07/2025",
      description: "Home of the Last Updated 04/07/2025: 41, food, food",
      category: "UPGRADE SKILL",
      className: "Class 5",
      lesson: "Lesson 2",
      duration: "04:31:00 Hrs",
      exams: 1,
      quizzes: 1,
      assignments: 1,
      currentPrice: "$135.00",
      originalPrice: "$156.00",
      details: {
        title: "Basic Drawing Skills course",
        description: "How to use light lines and basic shapes to lay an accurate foundation for finished drawings. How to hold the pencil. How to bring your drawings to life with detail and texture. The Art & Science of Drawing is a remarkable program that will teach you how to draw one day at home. The program is simple, each day you'll watch one video lesson that will introduce an essential drawing skill, and then do the recommended practice.",
        sections: [
          {
            title: "Section 1: The Art & Science of Drawing SKILLS",
            lessons: [
              {
                title: "Lesson 1: The Art & Science of Drawing SKILLS",
                content: "This course is highly recommended for anyone interested in painting as well. Most master painters agree that drawing is a fundamental and essential skill for all painters. BASIC SKILLS is the perfect primer for anyone wanting to learn to draw. The skills you'll learn here will dramatically improve your art & design no matter what medium you work in."
              },
              {
                title: "Lesson 2: How to draw any form",
                content: "How to draw any form by breaking it down into basic shapes before adding dark lines. This bestselling course is now even better with new content recently added as well as improved pictures and sound. This updated version of the course now includes lots of bonus drawing demonstrations that will allow you how to apply your new drawing skills to a wide range of subject matter including botanicals and birds. There's even an introduction to basic figure drawing."
              }
            ]
          }
        ],
        preview: {
          videoTitle: "Improve Kids Drawing & Coloring Ability | Let's Draw a C.",
          youtubeLink: "https://youtube.com/watch?xyz",
          instructor: "Shivam Verma (9002)",
          lastUpdated: "05/02/2025",
          class: "Class 5 (A, B, C, D)",
          lesson: 2,
          quiz: 1,
          exam: 1,
          assignment: 1,
          duration: "04:31:00 Hrs",
          currentPrice: "$135.00",
          originalPrice: "$150.00",
          createdBy: "Joe Black (9000)"
        }
      }
    },
    {
      id: 2,
      title: "Yoga for Kids",
      instructor: "Peaceful Babes",
      lastUpdated: "03/15/2025",
      description: "The resources you will receive when you enroll in this course are exclusive to Peaceful Babes",
      category: "Health & Fitness Courses",
      className: "Class 5",
      lesson: "Lesson 2",
      duration: "04:01:00 Hrs",
      exams: 1,
      quizzes: 1,
      assignments: 1,
      currentPrice: "$90.00",
      originalPrice: "$169.00"
    },
    {
      id: 3,
      title: "Music Courses",
      instructor: "Vocal Masters",
      lastUpdated: "02/28/2025",
      description: "Free your voice & remove excess vocal weight Eliminate strain and release into the",
      category: "Lifestyle course",
      className: "Class 1",
      lesson: "Lesson 2",
      duration: "05:00:00 Hrs",
      exams: 0,
      quizzes: 1,
      assignments: 1,
      currentPrice: "$135.00",
      originalPrice: "$156.00"
    },
    {
      id: 4,
      title: "Chemistry Course",
      instructor: "Science Academy",
      lastUpdated: "04/10/2025",
      description: "This is an introductory course for students with limited background in chemistry, basic concepts",
      category: "UPGRADE SKILL",
      className: "Class 4",
      lesson: "Lesson 2",
      duration: "04:01:00 Hrs",
      exams: 1,
      quizzes: 1,
      assignments: 2,
      currentPrice: "$135.00",
      originalPrice: "$156.00"
    }
  ];
  const [courses, setCourses] = useState(coursesData);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list', 'detail', 'preview', 'add', 'table'
  const [displayMode, setDisplayMode] = useState('grid'); // 'grid' or 'list'
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    category: '',
    className: '',
    lesson: '',
    duration: '',
    exams: 0,
    quizzes: 0,
    assignments: 0,
    currentPrice: '',
    originalPrice: '',
    instructor: ''
  });


  // New state for section management
  const [showAddSection, setShowAddSection] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [showOrderSection, setShowOrderSection] = useState(false);

  // Function to handle adding a new section
  const handleAddSection = () => {
    if (!newSectionTitle.trim()) return;
    
    const updatedCourses = courses.map(course => {
      if (course.id === selectedCourse.id) {
        const newSection = {
          title: newSectionTitle,
          lessons: [],
          assignments: [],
          quizzes: [],
          exams: []
        };
        
        return {
          ...course,
          details: {
            ...course.details,
            sections: [...(course.details?.sections || []), newSection]
          }
        };
      }
      return course;
    });
    
    setCourses(updatedCourses);
    setNewSectionTitle('');
    setShowAddSection(false);
    // Update the selected course to show the new section
    setSelectedCourse(updatedCourses.find(c => c.id === selectedCourse.id));
  };

  // Function to toggle order section view
  const toggleOrderSection = () => {
    setShowOrderSection(!showOrderSection);
  };
  const handleManageCourse = (course) => {
    setSelectedCourse(course);
    setViewMode('detail');
  };

  // Handle preview
  const handlePreview = (course) => {
    setSelectedCourse(course);
    setViewMode('preview');
  };

  // Handle back to list
  const handleBackToList = () => {
    setViewMode('list');
    setSelectedCourse(null);
  };

  // Handle add course form
  const handleAddCourse = () => {
    setViewMode('add');
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = Math.max(...courses.map(c => c.id)) + 1;
    const courseToAdd = {
      id: newId,
      ...newCourse,
      lastUpdated: new Date().toLocaleDateString('en-US'),
      details: {
        title: newCourse.title,
        description: newCourse.description,
        preview: {
          videoTitle: "Preview for " + newCourse.title,
          instructor: newCourse.instructor,
          lastUpdated: new Date().toLocaleDateString('en-US'),
          class: newCourse.className,
          lesson: 1,
          quiz: newCourse.quizzes,
          exam: newCourse.exams,
          assignment: newCourse.assignments,
          duration: newCourse.duration,
          currentPrice: newCourse.currentPrice,
          originalPrice: newCourse.originalPrice,
          createdBy: "Admin"
        }
      }
    };
    
    setCourses([...courses, courseToAdd]);
    setViewMode('list');
    setNewCourse({
      title: '',
      description: '',
      category: '',
      className: '',
      lesson: '',
      duration: '',
      exams: 0,
      quizzes: 0,
      assignments: 0,
      currentPrice: '',
      originalPrice: '',
      instructor: ''
    });
  };

  // CRUD operations
  const handleEdit = (courseId) => {
    const courseToEdit = courses.find(c => c.id === courseId);
    setSelectedCourse(courseToEdit);
    setNewCourse({
      title: courseToEdit.title,
      description: courseToEdit.description,
      category: courseToEdit.category,
      className: courseToEdit.className,
      lesson: courseToEdit.lesson,
      duration: courseToEdit.duration,
      exams: courseToEdit.exams,
      quizzes: courseToEdit.quizzes,
      assignments: courseToEdit.assignments,
      currentPrice: courseToEdit.currentPrice,
      originalPrice: courseToEdit.originalPrice,
      instructor: courseToEdit.instructor
    });
    setViewMode('add');
  };

  const handleDelete = (courseId) => {
    if (confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(course => course.id !== courseId));
    }
  };

  // Toggle between grid and list view
  const toggleDisplayMode = () => {
    setDisplayMode(displayMode === 'grid' ? 'list' : 'grid');
  };

  // Show table view
  const showTableView = () => {
    setViewMode('table');
  };


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-6">
      {viewMode === 'list' && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Course List</h1>
              <div className="flex space-x-2">
                <button
                  onClick={toggleDisplayMode}
                  className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 flex items-center"
                  title={displayMode === 'grid' ? 'List View' : 'Grid View'}
                >
                  {displayMode === 'grid' ? <FaList className="mr-2" /> : <FaTable className="mr-2" />}
                  {displayMode === 'grid' ? 'List View' : 'Grid View'}
                </button>
                <button
                  onClick={showTableView}
                  className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 flex items-center"
                  title="Table View"
                >
                  <FaTable className="mr-2" /> Table View
                </button>
                <button
                  onClick={handleAddCourse}
                  className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700 flex items-center"
                >
                  <FaPlus className="mr-2" /> Add New Course
                </button>
              </div>
            </div>

            {displayMode === 'grid' ? (
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
                {courses.map(course => (
                  <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xl font-bold text-gray-800">{course.title}</h2>
                        <p className="text-sm font-medium text-gray-600">{course.instructor}</p>
                        <p className="text-xs text-gray-500">Last Updated {course.lastUpdated}</p>
                      </div>
                      <button
                        onClick={() => handleDelete(course.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm font-medium">
                        <span className="font-bold">Category:</span> {course.category}
                      </p>
                      <p className="text-sm">
                        Class: {course.className} ● {course.lesson} ● {course.duration}
                      </p>
                      <div className="flex items-center mt-1">
                        {course.exams > 0 && (
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded mr-1">
                            Exam {course.exams}
                          </span>
                        )}
                        {course.quizzes > 0 && (
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded mr-1">
                            Quiz {course.quizzes}
                          </span>
                        )}
                        {course.assignments > 0 && (
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded mr-1">
                            Assignment {course.assignments}
                          </span>
                        )}
                      </div>
                      <div className="mt-2">
                        <span className="text-lg font-bold text-gray-800">{course.currentPrice}</span>
                        <span className="text-sm text-gray-500 line-through ml-2">{course.originalPrice}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex space-x-2">
                      <button
                        onClick={() => handleManageCourse(course)}
                        className="bg-blue-600 text-black px-3 py-1 rounded hover:bg-blue-700 text-sm"
                      >
                        Manage
                      </button>
                      <button
                        onClick={() => handlePreview(course)}
                        className="bg-purple-600 text-black px-3 py-1 rounded hover:bg-purple-700 text-sm"
                      >
                        Preview
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {courses.map(course => (
                  <div key={course.id} className="border-b border-gray-200 pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xl font-bold text-gray-800">{course.title}</h2>
                        <p className="text-sm font-medium text-gray-600">{course.instructor}</p>
                        <p className="text-xs text-gray-500">Last Updated {course.lastUpdated}</p>
                        <p className="text-xs italic text-gray-500 mt-1">{course.description}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleDelete(course.id)}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm font-medium">
                        <span className="font-bold">Category:</span> {course.category}
                      </p>
                      <p className="text-sm">
                        Class: {course.className} ● {course.lesson} ● {course.duration}
                      </p>
                      <div className="flex items-center mt-1">
                        {course.exams > 0 && (
                          <span className="text-sm bg-gray-100 px-2 py-1 rounded mr-2">
                            Exam {course.exams}
                          </span>
                        )}
                        {course.quizzes > 0 && (
                          <span className="text-sm bg-gray-100 px-2 py-1 rounded mr-2">
                            Quiz {course.quizzes}
                          </span>
                        )}
                        {course.assignments > 0 && (
                          <span className="text-sm bg-gray-100 px-2 py-1 rounded mr-2">
                            Assignment {course.assignments}
                          </span>
                        )}
                      </div>
                      <div className="mt-2">
                        <span className="text-lg font-bold text-gray-800">{course.currentPrice}</span>
                        <span className="text-sm text-gray-500 line-through ml-2">{course.originalPrice}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex space-x-4">
                      <button
                        onClick={() => handleManageCourse(course)}
                        className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700"
                      >
                        Manage Course
                      </button>
                      <button
                        onClick={() => handlePreview(course)}
                        className="bg-purple-600 text-black px-4 py-2 rounded hover:bg-purple-700"
                      >
                        Course Preview
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {viewMode === 'table' && (
          <div>
            <button
              onClick={handleBackToList}
              className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Course List
            </button>

            <h1 className="text-2xl font-bold text-gray-800 mb-6">Course List</h1>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Section</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lesson</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quiz</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exam</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignment</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Hour</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price ($)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Price ($)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {courses.map((course) => (
                    <tr key={course.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{course.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.className}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.lesson.split(' ')[1]}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.quizzes}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.exams}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.assignments}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.duration}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.originalPrice}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.currentPrice}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.lastUpdated}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() => handlePreview(course)}
                          className="text-blue-600 hover:text-blue-800"
                          title="View"
                        >
                          <FaEye />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {viewMode === 'detail' && selectedCourse && (
          <div>
            <button
              onClick={handleBackToList}
              className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Course List
            </button>

            <h1 className="text-2xl font-bold text-gray-800 mb-2">Course Detail</h1>
            <div className="mb-6">
              <h2 className="text-3xl font-bold tracking-tight">
                {selectedCourse.title.split(' ')[0]}<br />
                {selectedCourse.title.split(' ').slice(1).join(' ')}
              </h2>
              <p className="text-sm italic mt-2">{selectedCourse.instructor}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-bold border-b pb-2 mb-3">Title</h2>
              <p className="text-lg">{selectedCourse.details?.title || selectedCourse.title}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-bold border-b pb-2 mb-3">Description</h2>
              <p className="text-gray-700">{selectedCourse.details?.description || selectedCourse.description}</p>
            </div>

            {/* Add Section Button */}
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">Section & Lesson</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowAddSection(true)}
                  className="bg-green-600 text-black px-3 py-1 rounded hover:bg-green-700 text-sm"
                >
                  Add Section
                </button>
                <button
                  onClick={toggleOrderSection}
                  className="bg-blue-600 text-black px-3 py-1 rounded hover:bg-blue-700 text-sm"
                >
                  Order Section
                </button>
              </div>
            </div>

            {/* Add Section Modal */}
            {showAddSection && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                  <h2 className="text-xl font-bold mb-4">Add Section</h2>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Title *</label>
                    <input
                      type="text"
                      value={newSectionTitle}
                      onChange={(e) => setNewSectionTitle(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="Enter section title"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setShowAddSection(false)}
                      className="bg-gray-500 text-black px-4 py-2 rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddSection}
                      className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Order Section View */}
            {showOrderSection ? (
              <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold mb-4">Order Section</h3>
                {selectedCourse.details?.sections?.map((section, index) => (
                  <div key={index} className="mb-4">
                    <h4 className="font-bold text-md mb-2">{section.title}</h4>
                    <div className="ml-4">
                      {section.lessons?.map((lesson, lessonIndex) => (
                        <p key={lessonIndex} className="text-sm mb-1">
                          <strong>Lesson {lessonIndex + 1}:</strong> {lesson.title}
                        </p>
                      ))}
                      {section.assignments?.length > 0 && (
                        <p className="text-sm mb-1">
                          <strong>Assignments:</strong> {section.assignments.join(', ')}
                        </p>
                      )}
                      {section.quizzes?.length > 0 && (
                        <p className="text-sm mb-1">
                          <strong>Quizzes:</strong> {section.quizzes.join(', ')}
                        </p>
                      )}
                      {section.exams?.length > 0 && (
                        <p className="text-sm mb-1">
                          <strong>Exams:</strong> {section.exams.join(', ')}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
                <button
                  onClick={toggleOrderSection}
                  className="mt-4 bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700"
                >
                  Back to Normal View
                </button>
              </div>
            ) : (
              /* Normal Section View */
              selectedCourse.details?.sections && (
                <div className="mb-6">
                  {selectedCourse.details.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="mb-4">
                      <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
                      <ul className="list-disc pl-5">
                        {section.lessons.map((lesson, lessonIndex) => (
                          <li key={lessonIndex} className="mb-3">
                            <h4 className="font-medium">{lesson.title}</h4>
                            <p className="text-gray-600 text-sm">{lesson.content}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )
            )}

            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => handlePreview(selectedCourse)}
                className="bg-purple-600 text-black px-4 py-2 rounded hover:bg-purple-700 flex items-center"
              >
                <FaPlay className="mr-2" /> Preview Course
              </button>
              <button
                onClick={() => handleEdit(selectedCourse.id)}
                className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              >
                <FaEdit className="mr-2" /> Edit Course
              </button>
            </div>
          </div>
        )}

{viewMode === 'preview' && selectedCourse && selectedCourse.details?.preview && (
          <div>
            <button
              onClick={handleBackToList}
              className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Course List
            </button>

            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <h2 className="text-xl font-bold mb-2">
                {selectedCourse.details.preview.videoTitle}
              </h2>
              <div className="aspect-w-16 aspect-h-9 bg-black rounded overflow-hidden mb-3">
                <div className="w-full h-64 flex items-center justify-center text-black">
                  <div className="text-center">
                    <FaPlay className="text-4xl mx-auto mb-2" />
                    <p>Video Preview</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <button className="text-blue-600 hover:text-blue-800 flex items-center">
                  <FaLink className="mr-1" /> Copylink
                </button>
                <span className="text-sm text-gray-600">
                  Watch on YouTube
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-bold mb-2">{selectedCourse.details.title}</h3>
                <p className="text-gray-700">{selectedCourse.details.description}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-3">
                  <p><span className="font-medium">Instructor:</span> {selectedCourse.details.preview.instructor}</p>
                  <p><span className="font-medium">Last Updated:</span> {selectedCourse.details.preview.lastUpdated}</p>
                  <p><span className="font-medium">Class:</span> {selectedCourse.details.preview.class}</p>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <p className="font-medium">Lesson:</p>
                      <p>{selectedCourse.details.preview.lesson}</p>
                    </div>
                    <div>
                      <p className="font-medium">Quiz:</p>
                      <p>{selectedCourse.details.preview.quiz}</p>
                    </div>
                    <div>
                      <p className="font-medium">Exam:</p>
                      <p>{selectedCourse.details.preview.exam}</p>
                    </div>
                    <div>
                      <p className="font-medium">Assignment:</p>
                      <p>{selectedCourse.details.preview.assignment}</p>
                    </div>
                    <div>
                      <p className="font-medium">Duration:</p>
                      <p>{selectedCourse.details.preview.duration}</p>
                    </div>
                  </div>
                  <div className="pt-2">
                    <span className="text-lg font-bold">{selectedCourse.details.preview.currentPrice}</span>
                    <span className="text-sm text-gray-500 line-through ml-2">
                      {selectedCourse.details.preview.originalPrice}
                    </span>
                  </div>
                  <p><span className="font-medium">Created By:</span> {selectedCourse.details.preview.createdBy}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => handleManageCourse(selectedCourse)}
                className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              >
                <FaEdit className="mr-2" /> Manage Course
              </button>
            </div>
          </div>
        )}

        {viewMode === 'add' && (
          <div>
            <button
              onClick={handleBackToList}
              className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Course List
            </button>

            <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Course</h1>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-lg font-medium mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={newCourse.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-lg font-medium mb-2">Outcomes</label>
                <div className="border-b border-gray-200 pb-4 mb-4"></div>
              </div>

              <div className="mb-6">
                <label className="block text-lg font-medium mb-2">Description</label>
                <textarea
                  name="description"
                  value={newCourse.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded h-32"
                  required
                ></textarea>
                
              </div>

              <div className="mb-6">
                <label className="block text-lg font-medium mb-2">Online Preview Image (700px X 400px)</label>
                <div className="border-2 border-dashed border-gray-300 rounded p-8 text-center">
                  <p>Drag and drop a file here or click</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-lg font-medium mb-2">Class</label>
                  <select
                    name="className"
                    value={newCourse.className}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  >
                    <option value="">Select</option>
                    <option value="Class 1">Class 1</option>
                    <option value="Class 2">Class 2</option>
                    <option value="Class 3">Class 3</option>
                    <option value="Class 4">Class 4</option>
                    <option value="Class 5">Class 5</option>
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-medium mb-2">Section</label>
                  <select className="w-full p-2 border border-gray-300 rounded">
                    <option value="">Select</option>
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-medium mb-2">Assign Teacher</label>
                  <select className="w-full p-2 border border-gray-300 rounded">
                    <option value="">Select</option>
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-medium mb-2">Course Category</label>
                  <select
                    name="category"
                    value={newCourse.category}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  >
                    <option value="">Select</option>
                    <option value="UPGRADE SKILL">UPGRADE SKILL</option>
                    <option value="Health & Fitness Courses">Health & Fitness Courses</option>
                    <option value="Lifestyle course">Lifestyle course</option>
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-medium mb-2">Price ($)</label>
                  <input
                    type="text"
                    name="currentPrice"
                    value={newCourse.currentPrice}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium mb-2">Discount</label>
                  <input
                    type="text"
                    name="originalPrice"
                    value={newCourse.originalPrice}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium mb-2">Instructor</label>
                  <input
                    type="text"
                    name="instructor"
                    value={newCourse.instructor}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium mb-2">Duration</label>
                  <input
                    type="text"
                    name="duration"
                    value={newCourse.duration}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={handleBackToList}
                  className="bg-gray-500 text-black px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save Course
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}