"use client";
import { useState } from 'react';

const OfflinePayment = () => {
  // Dummy data
  const dummyData = {
    classes: [
      { id: 1, name: 'Class 1' },
      { id: 2, name: 'Class 2' },
    ],
    sections: [
      { id: 1, name: 'Section A', classId: 1 },
      { id: 2, name: 'Section B', classId: 1 },
      { id: 3, name: 'Section A', classId: 2 },
    ],
    students: [
      { id: 120020, name: 'Ashwani Kumar', classId: 1, sectionId: 1 },
      { id: 120021, name: 'Nathan Smith', classId: 1, sectionId: 2 },
      { id: 120022, name: 'Nihal Badhera', classId: 2, sectionId: 3 },
    ],
    courses: [
      {
        id: 1,
        name: 'TRADING COURSE',
        section: 1,
        lesson: 1,
        quiz: 0,
        exam: 0,
        assignment: 0,
        provider: 'Youtube',
        price: 330.00,
        currentPrice: 264.00,
        duration: '01h29'
      },
      {
        id: 2,
        name: 'Music Courses',
        section: 1,
        lesson: 2,
        quiz: 1,
        exam: 0,
        assignment: 1,
        provider: 'Youtube',
        price: 150.00,
        currentPrice: 135.00,
        duration: '01h29'
      },
      {
        id: 3,
        name: 'Programming Fundamentals',
        section: 2,
        lesson: 5,
        quiz: 3,
        exam: 1,
        assignment: 2,
        provider: 'Udemy',
        price: 200.00,
        currentPrice: 180.00,
        duration: '03h45'
      }
    ]
  };

  // State management
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [paymentMode, setPaymentMode] = useState('Cash');
  const [note, setNote] = useState('');

  // Filter sections based on selected class
  const filteredSections = dummyData.sections.filter(
    section => section.classId === parseInt(selectedClass)
  );

  // Filter students based on selected class and section
  const handleSectionChange = (e) => {
    const sectionId = e.target.value;
    setSelectedSection(sectionId);
    
    if (selectedClass && sectionId) {
      const students = dummyData.students.filter(
        student => student.classId === parseInt(selectedClass) && 
                  student.sectionId === parseInt(sectionId)
      );
      setFilteredStudents(students);
    } else {
      setFilteredStudents([]);
    }
    setSelectedStudent('');
  };

  // Search courses for selected student
  const handleSearch = () => {
    if (selectedStudent) {
      // In a real app, you would filter based on student's enrolled courses
      // For demo, we're showing all courses
      setFilteredCourses(dummyData.courses);
    }
  };

  // Handle payment button click
  const handlePayClick = (course) => {
    setSelectedCourse(course);
    setShowPaymentModal(true);
  };

  // Handle payment submission
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    alert(`Payment of $${selectedCourse.currentPrice} for ${selectedCourse.name} submitted via ${paymentMode}`);
    setShowPaymentModal(false);
    // Reset form
    setPaymentMode('Cash');
    setNote('');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Offline Payment</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
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

            <label className="block text-sm font-medium text-gray-700 mb-1">Class*</label>
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={selectedClass}
              onChange={(e) => {
                setSelectedClass(e.target.value);
                setSelectedSection('');
                setSelectedStudent('');
                setFilteredStudents([]);
              }}
            >
              <option value="">Select Class</option>
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
              onChange={handleSectionChange}
              disabled={!selectedClass}
            >
              <option value="">Select Section</option>
              {filteredSections.map(section => (
                <option key={section.id} value={section.id}>{section.name}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1 min-w-[200px]">

            <label className="block text-sm font-medium text-gray-700 mb-1">Student*</label>
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              disabled={!selectedSection}
            >
              <option value="">Select Student</option>
              {filteredStudents.map(student => (
                <option key={student.id} value={student.id}>{student.name} ({student.id})</option>
              ))}
            </select>
          </div>
        </div>
        
        <button
          className="bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          onClick={handleSearch}
          disabled={!selectedStudent}
        >
          Search
        </button>
      </div>
      
      {filteredCourses.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Section</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lesson</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quiz</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exam</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Provider</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price ($)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Price ($)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCourses.map((course) => (
                <tr key={course.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.section}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.lesson}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.quiz}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.exam}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.assignment}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.provider}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.currentPrice.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handlePayClick(course)}
                    >
                      Pay
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 text-sm text-gray-500">
            Records: 1 to {filteredCourses.length} of {filteredCourses.length}
          </div>
        </div>
      )}
      
      {/* Payment Modal */}
      {showPaymentModal && selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Online Course Fees</h2>
            <p className="mb-2"><span className="font-semibold">Course Name:</span> {selectedCourse.name}</p>
            
            
            
            <form onSubmit={handlePaymentSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Date*</label>
                <input
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Mode</label>
                <div className="flex flex-wrap gap-2">
                  {['Cash', 'Cheque', 'DD', 'Bank Transfer', 'UPI', 'Card'].map((mode) => (
                    <label key={mode} className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio"
                        name="paymentMode"
                        value={mode}
                        checked={paymentMode === mode}
                        onChange={() => setPaymentMode(mode)}
                      />
                      <span className="ml-2">{mode}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded"
                  rows="3"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                ></textarea>
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Total Pay</span>
                <span className="text-xl font-bold">${selectedCourse.currentPrice.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                  onClick={() => setShowPaymentModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-600"
                >
                  Pay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfflinePayment;