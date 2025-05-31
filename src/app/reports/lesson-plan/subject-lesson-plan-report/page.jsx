"use client";
import React, { useState } from 'react';

export default function SubjectLessonPlanReport() {
  // Dummy data for dropdowns
  const classOptions = ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5"];
  const sectionOptions = ["A", "B", "C"];
  const subjectGroupOptions = ["Class 1st Subject Group", "Class 2nd Subject Group", "Advanced Group"];
  
  // Subject options based on subject group
  const subjectOptions = {
    "Class 1st Subject Group": ["English (210)", "Hindi (230)", "Mathematics (110)"],
    "Class 2nd Subject Group": ["Science (111)", "Social Studies (120)"],
    "Advanced Group": ["Computer Science (00220)", "Drawing (200)"]
  };

  // Dummy lesson plan data
  const lessonPlanData = {
    "Class 1": {
      "A": {
        "Class 1st Subject Group": {
          "English (210)": [
            {
              teacher: "Shivam Verma (9002)",
              lessonName: "First Day at School",
              topicName: "School Life",
              subTopic: "Introduction",
              date: "04/09/2025",
              timeFrom: "9:00 AM",
              timeTo: "09:45 AM"
            },
            {
              teacher: "Shivam Verma (9002)",
              lessonName: "First Day at School",
              topicName: "School Life",
              subTopic: "Activities",
              date: "04/16/2025",
              timeFrom: "9:00 AM",
              timeTo: "09:45 AM"
            },
            {
              teacher: "Shivam Verma (9002)",
              lessonName: "First Day at School",
              topicName: "School Life",
              subTopic: "Review",
              date: "04/18/2025",
              timeFrom: "9:00 AM",
              timeTo: "09:45 AM"
            },
            {
              teacher: "Shivam Verma (9002)",
              lessonName: "First Day at School",
              topicName: "School Life",
              subTopic: "Assessment",
              date: "04/19/2025",
              timeFrom: "10:30 AM",
              timeTo: "11:15 AM"
            },
            {
              teacher: "Shivam Verma (9002)",
              lessonName: "First Day at School",
              topicName: "School Life",
              subTopic: "Revision",
              date: "04/23/2025",
              timeFrom: "9:00 AM",
              timeTo: "09:45 AM"
            },
            {
              teacher: "Shivam Verma (9002)",
              lessonName: "First Day at School",
              topicName: "School Life",
              subTopic: "Final Review",
              date: "04/25/2025",
              timeFrom: "9:00 AM",
              timeTo: "09:45 AM"
            },
            {
              teacher: "Shivam Verma (9002)",
              lessonName: "First Day at School",
              topicName: "School Life",
              subTopic: "Conclusion",
              date: "04/26/2025",
              timeFrom: "10:30 AM",
              timeTo: "11:15 AM"
            }
          ],
          "Hindi (230)": [
            {
                teacher: "suman Verma (9002)",
                lessonName: "First Day at School",
                topicName: "School Life",
                subTopic: "Introduction",
                date: "04/09/2025",
                timeFrom: "9:00 AM",
                timeTo: "09:45 AM"
              },
              {
                teacher: "suman Verma (9002)",
                lessonName: "First Day at School",
                topicName: "School Life",
                subTopic: "Activities",
                date: "04/16/2025",
                timeFrom: "9:00 AM",
                timeTo: "09:45 AM"
              },
              {
                teacher: "suman Verma (9002)",
                lessonName: "First Day at School",
                topicName: "School Life",
                subTopic: "Review",
                date: "04/18/2025",
                timeFrom: "9:00 AM",
                timeTo: "09:45 AM"
              },
              {
                teacher: "suman Verma (9002)",
                lessonName: "First Day at School",
                topicName: "School Life",
                subTopic: "Assessment",
                date: "04/19/2025",
                timeFrom: "10:30 AM",
                timeTo: "11:15 AM"
              },
              {
                teacher: "suman Verma (9002)",
                lessonName: "First Day at School",
                topicName: "School Life",
                subTopic: "Revision",
                date: "04/23/2025",
                timeFrom: "9:00 AM",
                timeTo: "09:45 AM"
              },
              {
                teacher: "suman Verma (9002)",
                lessonName: "First Day at School",
                topicName: "School Life",
                subTopic: "Final Review",
                date: "04/25/2025",
                timeFrom: "9:00 AM",
                timeTo: "09:45 AM"
              },
              {
                teacher: "suman Verma (9002)",
                lessonName: "First Day at School",
                topicName: "School Life",
                subTopic: "Conclusion",
                date: "04/26/2025",
                timeFrom: "10:30 AM",
                timeTo: "11:15 AM"
              }
          ],
          "Mathematics (110)": [
            {
                teacher: "sonal Verma (9002)",
                lessonName: "First Day at School",
                topicName: "School Life",
                subTopic: "Introduction",
                date: "04/09/2025",
                timeFrom: "9:00 AM",
                timeTo: "09:45 AM"
              },
              {
                teacher: "sonal Verma (9002)",
                lessonName: "First Day at School",
                topicName: "School Life",
                subTopic: "Activities",
                date: "04/16/2025",
                timeFrom: "9:00 AM",
                timeTo: "09:45 AM"
              },
              {
                teacher: "sonal Verma (9002)",
                lessonName: "First Day at School",
                topicName: "School Life",
                subTopic: "Review",
                date: "04/18/2025",
                timeFrom: "9:00 AM",
                timeTo: "09:45 AM"
              },
              {
                teacher: "sonal Verma (9002)",
                lessonName: "First Day at School",
                topicName: "School Life",
                subTopic: "Assessment",
                date: "04/19/2025",
                timeFrom: "10:30 AM",
                timeTo: "11:15 AM"
              },
              {
                teacher: "sonal Verma (9002)",
                lessonName: "First Day at School",
                topicName: "School Life",
                subTopic: "Revision",
                date: "04/23/2025",
                timeFrom: "9:00 AM",
                timeTo: "09:45 AM"
              },
              {
                teacher: "sonal Verma (9002)",
                lessonName: "First Day at School",
                topicName: "School Life",
                subTopic: "Final Review",
                date: "04/25/2025",
                timeFrom: "9:00 AM",
                timeTo: "09:45 AM"
              },
              {
                teacher: "sonal Verma (9002)",
                lessonName: "First Day at School",
                topicName: "School Life",
                subTopic: "Conclusion",
                date: "04/26/2025",
                timeFrom: "10:30 AM",
                timeTo: "11:15 AM"
              }
          ]
        }
      }
    }
  };

  // State for search criteria
  const [searchCriteria, setSearchCriteria] = useState({
    class: '',
    section: '',
    subjectGroup: '',
    subject: ''
  });

  // State for filtered data
  const [filteredLessons, setFilteredLessons] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [completionPercentage, setCompletionPercentage] = useState(0);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria(prev => ({
      ...prev,
      [name]: value,
      // Reset dependent fields when parent field changes
      ...(name === 'subjectGroup' && { subject: '' })
    }));
  };

  // Handle search
  const handleSearch = () => {
    if (!searchCriteria.class || !searchCriteria.section || 
        !searchCriteria.subjectGroup || !searchCriteria.subject) {
      alert('Please select all criteria: Class, Section, Subject Group, and Subject');
      return;
    }

    setHasSearched(true);
    
    // Get data based on selected criteria
    const lessons = lessonPlanData[searchCriteria.class]?.[searchCriteria.section]?.[searchCriteria.subjectGroup]?.[searchCriteria.subject] || [];
    setFilteredLessons(lessons);
    
    // Calculate completion percentage (dummy calculation)
    const totalLessons = lessons.length;
    const completedLessons = lessons.filter(l => new Date(l.date) <= new Date()).length;
    setCompletionPercentage(Math.round((completedLessons / totalLessons) * 100));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Subject Lesson Plan Report</h1>
      
      {/* Search Criteria - All in one row */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Select Criteria</h2>
        
        <div className="flex flex-wrap gap-4 items-end">

        <div className="flex-1 min-w-[155px]">

            <label className="block text-sm font-medium text-gray-700 mb-1">Class *</label>
            <select
              name="class"
              value={searchCriteria.class}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Class</option>
              {classOptions.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1 min-w-[155px]">

            <label className="block text-sm font-medium text-gray-700 mb-1">Section *</label>
            <select
              name="section"
              value={searchCriteria.section}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Section</option>
              {sectionOptions.map(sec => (
                <option key={sec} value={sec}>{sec}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1 min-w-[155px]">

            <label className="block text-sm font-medium text-gray-700 mb-1">Subject Group *</label>
            <select
              name="subjectGroup"
              value={searchCriteria.subjectGroup}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Subject Group</option>
              {subjectGroupOptions.map(group => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1 min-w-[155px]">

            <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
            <select
              name="subject"
              value={searchCriteria.subject}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
              disabled={!searchCriteria.subjectGroup}
            >
              <option value="">Select Subject</option>
              {searchCriteria.subjectGroup && 
                subjectOptions[searchCriteria.subjectGroup]?.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))
              }
            </select>
          </div>
        </div>
        
        <div className="mt-4">
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-black px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </div>
      </div>
      
      {/* Results Section */}
      {hasSearched && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">
              Subject Lesson Plan Report For: {searchCriteria.subject} Complete {completionPercentage}%
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lesson Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Topic Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sub Topic</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time From</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time To</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLessons.length > 0 ? (
                  filteredLessons.map((lesson, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lesson.teacher}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lesson.lessonName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lesson.topicName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lesson.subTopic}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lesson.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lesson.timeFrom}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lesson.timeTo}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                      No lesson plans found for the selected criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}