'use client';

import React, { useState } from 'react';
import { BookOpen, Clock, LayoutGrid, Edit, X, Save, Eye, Trash2 } from 'lucide-react';

export default function ManageLessonPlan() {
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [results, setResults] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [viewingLesson, setViewingLesson] = useState(null);
  const [formData, setFormData] = useState({
    lessonTitle: '',
    date: '',
    youtubeUrl: '',
    teachingMethod: '',
    previousKnowledge: '',
    topic: '',
    subTopic: '',
    timeFrom: '',
    timeTo: '',
    generalObjectives: '',
    comprehensiveQuestions: ''
  });

  const teachers = [
    { name: 'Shivam Verma', id: '9002' },
    { name: 'Jason Sharlton', id: '90006' },
    { name: 'Albert Thomas', id: '54545454' },
  ];

  const getDayName = (dateString) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString);
    return days[date.getDay()];
  };

  const handleSearch = async () => {
    const dummyData = [
      // Monday
      {
        id: 1,
        subject: 'English',
        subject_id: '210',
        class: 'Class 5(A)',
        time_start: '9:00 AM',
        time_end: '09:45 AM',
        room_no: '12',
        lessonTitle: 'English Literature',
        date: '04/14/2025',
        day: 'Monday',
        teachingMethod: 'Discussion and analysis',
        previousKnowledge: 'Basic reading skills',
        topic: 'Literature',
        subTopic: 'Poetry',
        generalObjectives: 'Understand poetic devices',
        comprehensiveQuestions: 'What are the main themes?'
      },
      // Tuesday
      {
        id: 2,
        subject: 'Science',
        subject_id: '111',
        class: 'Class 5(A)',
        time_start: '09:45 AM',
        time_end: '10:30 AM',
        room_no: '12',
        lessonTitle: 'Biology Basics',
        date: '04/15/2025',
        day: 'Tuesday',
        teachingMethod: 'Experiments and observation',
        previousKnowledge: 'Basic science concepts',
        topic: 'Biology',
        subTopic: 'Cells',
        generalObjectives: 'Understand cell structure',
        comprehensiveQuestions: 'How do cells function?'
      },
      // Wednesday
      {
        id: 3,
        subject: 'Hindi',
        subject_id: '230',
        class: 'Class 5(A)',
        time_start: '09:45 AM',
        time_end: '10:30 AM',
        room_no: '12',
        lessonTitle: 'Hindi Grammar',
        date: '04/16/2025',
        day: 'Wednesday',
        teachingMethod: 'Practice exercises',
        previousKnowledge: 'Basic vocabulary',
        topic: 'Grammar',
        subTopic: 'Verbs',
        generalObjectives: 'Improve sentence construction',
        comprehensiveQuestions: 'List 5 action verbs'
      },
      // Thursday
      {
        id: 4,
        subject: 'Mathematics',
        subject_id: '110',
        class: 'Class 5(A)',
        time_start: '09:45 AM',
        time_end: '10:30 AM',
        room_no: '12',
        lessonTitle: 'Algebra Basics',
        date: '04/17/2025',
        day: 'Thursday',
        teachingMethod: 'Problem solving',
        previousKnowledge: 'Basic arithmetic',
        topic: 'Algebra',
        subTopic: 'Equations',
        generalObjectives: 'Solve simple equations',
        comprehensiveQuestions: 'Solve for x: 2x + 3 = 7'
      },
      // Friday
      {
        id: 5,
        subject: 'Social Studies',
        subject_id: '212',
        class: 'Class 5(A)',
        time_start: '09:45 AM',
        time_end: '10:30 AM',
        room_no: '12',
        lessonTitle: 'World History',
        date: '04/18/2025',
        day: 'Friday',
        teachingMethod: 'Discussion and research',
        previousKnowledge: 'Basic historical events',
        topic: 'History',
        subTopic: 'Ancient Civilizations',
        generalObjectives: 'Understand early societies',
        comprehensiveQuestions: 'Name 3 ancient civilizations'
      },
      // Saturday
      {
        id: 6,
        subject: 'English',
        subject_id: '210',
        class: 'Class 5(A)',
        time_start: '9:00 AM',
        time_end: '09:45 AM',
        room_no: '12',
        lessonTitle: 'Reading Comprehension',
        date: '04/19/2025',
        day: 'Saturday',
        teachingMethod: 'Guided reading',
        previousKnowledge: 'Basic reading skills',
        topic: 'Literature',
        subTopic: 'Comprehension',
        generalObjectives: 'Improve reading skills',
        comprehensiveQuestions: 'Summarize the passage'
      },
      // Sunday - Not scheduled
      {
        id: 7,
        subject: '',
        subject_id: '',
        class: 'Class 5(A)',
        time_start: '',
        time_end: '',
        room_no: '',
        lessonTitle: 'Not Scheduled',
        date: '04/20/2025',
        day: 'Sunday',
        teachingMethod: '',
        previousKnowledge: '',
        topic: '',
        subTopic: '',
        generalObjectives: '',
        comprehensiveQuestions: ''
      }
    ];

    if (selectedTeacher) {
      setResults(dummyData);
    } else {
      alert('Please select a teacher');
    }
  };

  const handleEditClick = (lesson, index) => {
    setEditingIndex(index);
    setFormData({
      lessonTitle: lesson.lessonTitle,
      date: lesson.date,
      youtubeUrl: '',
      teachingMethod: lesson.teachingMethod,
      previousKnowledge: lesson.previousKnowledge,
      topic: lesson.topic,
      subTopic: lesson.subTopic,
      timeFrom: lesson.time_start,
      timeTo: lesson.time_end,
      generalObjectives: lesson.generalObjectives,
      comprehensiveQuestions: lesson.comprehensiveQuestions || ''
    });
  };

  const handleViewClick = (lesson) => {
    setViewingLesson(lesson);
  };

  const handleDeleteClick = (index) => {
    if (window.confirm('Are you sure you want to delete this lesson plan?')) {
      const updatedResults = [...results];
      updatedResults.splice(index, 1);
      setResults(updatedResults);
      alert('Lesson plan deleted successfully!');
    }
  };

  const handleCloseEdit = () => {
    setEditingIndex(null);
  };

  const handleCloseView = () => {
    setViewingLesson(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updatedResults = [...results];
    updatedResults[editingIndex] = {
      ...updatedResults[editingIndex],
      lessonTitle: formData.lessonTitle,
      date: formData.date,
      teachingMethod: formData.teachingMethod,
      previousKnowledge: formData.previousKnowledge,
      topic: formData.topic,
      subTopic: formData.subTopic,
      time_start: formData.timeFrom,
      time_end: formData.timeTo,
      generalObjectives: formData.generalObjectives,
      comprehensiveQuestions: formData.comprehensiveQuestions
    };

    setResults(updatedResults);
    setEditingIndex(null);
    alert('Lesson plan updated successfully!');
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4 border rounded shadow" style={{width:"100%",position:"relative",right:"20px"}}>
      <h2 className="text-xl font-semibold mb-4">Manage Lesson Plan</h2>

      {/* Teacher Selection */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="md:col-span-3" style={{width:"300px"}}>
          <label className="block mb-1 font-medium text-sm text-gray-700">
            Teachers <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full border rounded px-3 py-2"
            value={selectedTeacher}
            onChange={(e) => setSelectedTeacher(e.target.value)}
          >
            <option value="">Select</option>
            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.name} ({teacher.id})
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-end">
          <button
            // className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 w-full"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      {/* Week Schedule */}
      {results.length > 0 && (
        <div className="mt-6">
          <div className="mb-4">
            <h3 className="font-semibold">{getDayName(results[0].date)} {results[0].date}</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {results.map((day) => (
                    <th key={day.id} className="border p-2 bg-gray-50">
                      <div className="font-semibold">{day.day}</div>
                      <div className="text-sm">{day.date}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {results.map((day) => (
                    <td key={`subject-${day.id}`} className="border p-2">
                      {day.subject ? (
                        <>
                         <div className="mt-2 flex gap-2">
                            <button 
                              onClick={() => handleViewClick(day)}
                              className="text-green-600 hover:text-green-800"
                              title="View"
                            >
                              <Eye size={16} />
                            </button>
                            <button 
                              onClick={() => handleEditClick(day, day.id-1)}
                              className="text-blue-600 hover:text-blue-800"
                              title="Edit"
                            >
                              <Edit size={16} />
                            </button>
                            <button 
                              onClick={() => handleDeleteClick(day.id-1)}
                              className="text-red-600 hover:text-red-800"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <div style={{ color:"blue"}}><strong>Subject:</strong> {day.subject} ({day.subject_id})</div>
                          <div style={{ color:"blue"}}><strong>Class:</strong> {day.class}</div>
                          <div style={{ color:"blue"}}>{day.time_start} - {day.time_end}</div>
                          <div style={{ color:"blue"}}><strong>Room No:</strong> {day.room_no}</div>
                         
                        </>
                      ) : (
                        <div>Not Scheduled</div>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewingLesson && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Lesson Plan Details</h3>
              <button onClick={handleCloseView} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold">Class</h4>
                  <p>{viewingLesson.class}</p>
                </div>
                <div>
                  <h4 className="font-bold">Subject</h4>
                  <p>{viewingLesson.subject} ({viewingLesson.subject_id})</p>
                </div>
                <div>
                  <h4 className="font-bold">Date</h4>
                  <p>{viewingLesson.date} {viewingLesson.time_start} - {viewingLesson.time_end}</p>
                </div>
                <div>
                  <h4 className="font-bold">Room No</h4>
                  <p>{viewingLesson.room_no}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-bold">Lesson</h4>
                <p>{viewingLesson.lessonTitle}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold">Topic</h4>
                  <p>{viewingLesson.topic}</p>
                </div>
                <div>
                  <h4 className="font-bold">Sub Topic</h4>
                  <p>{viewingLesson.subTopic}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-bold">General Objectives</h4>
                <p>{viewingLesson.generalObjectives}</p>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-bold">Teaching Method</h4>
                <p>{viewingLesson.teachingMethod}</p>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-bold">Previous Knowledge</h4>
                <p>{viewingLesson.previousKnowledge}</p>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-bold">Comprehensive Questions</h4>
                <div className="bg-gray-50 p-4 rounded">
                  <p>{viewingLesson.comprehensiveQuestions}</p>
                </div>
              </div>
              
              <div className="flex justify-end pt-4">
                <button
                  onClick={handleCloseView}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Form Modal */}
      {editingIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Edit Lesson Plan</h3>
              <button onClick={handleCloseEdit} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium">Lesson <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="lessonTitle"
                      value={formData.lessonTitle}
                      onChange={handleInputChange}
                      className="w-full border rounded px-3 py-2 mt-1"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-medium">Date <span className="text-red-500">*</span></label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full border rounded px-3 py-2 mt-1"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium">Subject <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full border rounded px-3 py-2 mt-1"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-medium">Class <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="class"
                      value={formData.class}
                      onChange={handleInputChange}
                      className="w-full border rounded px-3 py-2 mt-1"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium">Time From <span className="text-red-500">*</span></label>
                    <input
                      type="time"
                      name="timeFrom"
                      value={formData.timeFrom}
                      onChange={handleInputChange}
                      className="w-full border rounded px-3 py-2 mt-1"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-medium">Time To <span className="text-red-500">*</span></label>
                    <input
                      type="time"
                      name="timeTo"
                      value={formData.timeTo}
                      onChange={handleInputChange}
                      className="w-full border rounded px-3 py-2 mt-1"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium">Room No <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="room_no"
                    value={formData.room_no}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2 mt-1"
                    required
                  />
                </div>

                <div className="border-t pt-4">
                  <label className="block font-medium">Lecture YouTube URL</label>
                  <input
                    type="url"
                    name="youtubeUrl"
                    value={formData.youtubeUrl}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2 mt-1"
                    placeholder="https://www.youtube.com/..."
                  />
                </div>

                <div>
                  <label className="block font-medium">Teaching Method</label>
                  <textarea
                    name="teachingMethod"
                    value={formData.teachingMethod}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2 mt-1"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block font-medium">Previous Knowledge</label>
                  <textarea
                    name="previousKnowledge"
                    value={formData.previousKnowledge}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2 mt-1"
                    rows={3}
                  />
                </div>

                <div className="bg-gray-50 p-4 rounded">
                  <h4 className="font-medium mb-2">Presentation</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium">Topic <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        name="topic"
                        value={formData.topic}
                        onChange={handleInputChange}
                        className="w-full border rounded px-3 py-2 mt-1"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-medium">Sub Topic</label>
                      <input
                        type="text"
                        name="subTopic"
                        value={formData.subTopic}
                        onChange={handleInputChange}
                        className="w-full border rounded px-3 py-2 mt-1"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-medium">Lecture Video</label>
                  <div className="border-2 border-dashed rounded p-4 text-center mt-1">
                    <p>Drag and drop a file here or click</p>
                    <input type="file" className="hidden" />
                  </div>
                </div>

                <div>
                  <label className="block font-medium">Attachment</label>
                  <div className="border-2 border-dashed rounded p-4 text-center mt-1">
                    <p>Drag and drop a file here or click</p>
                    <input type="file" className="hidden" />
                  </div>
                </div>

                <div>
                  <label className="block font-medium">General Objectives</label>
                  <textarea
                    name="generalObjectives"
                    value={formData.generalObjectives}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2 mt-1"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block font-medium">Comprehensive Questions</label>
                  <textarea
                    name="comprehensiveQuestions"
                    value={formData.comprehensiveQuestions}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2 mt-1"
                    rows={3}
                    placeholder="Enter questions separated by new lines"
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseEdit}
                    className="px-4 py-2 border rounded hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    // className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
                  >
                    <Save size={16} />
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}