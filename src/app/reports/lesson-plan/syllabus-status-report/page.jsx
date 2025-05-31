"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SyllabusStatusReport() {
    const router = useRouter();
      const handleClick1 = () => {
        router.push('../lesson-plan/syllabus-status-report'); 
        // yahan apne destination ka route likho
      };
      
      const handleClick2 = () => {
        router.push('../lesson-plan/subject-lesson-plan-report'); 
    
        // yahan apne destination ka route likho
      };
  // Dummy data for classes, sections, and subject groups
  const classOptions = ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5"];
  const sectionOptions = ["A", "B", "C"];
  const subjectGroupOptions = ["Class 1st Subject Group", "Class 2nd Subject Group", "Advanced Group"];

  // Dummy syllabus data structure
  const syllabusData = {
    "Class 1": {
      "A": {
        "Class 1st Subject Group": [
          {
            subject: "English (210)",
            completion: 22.5,
            topics: [
              { lesson: "1 First Day at School", topic: "1.1 School Life", status: "Complete (04/19/2025)", completion: 100 },
              { lesson: "", topic: "1.2 School Day's", status: "Incomplete", completion: 0 },
              { lesson: "", topic: "1.3 Chapter-2", status: "Incomplete", completion: 0 },
              { lesson: "2 The Wind and the Sun", topic: "2.1 The Wind", status: "22% Complete", completion: 22 },
              { lesson: "3 Storm in the Garden", topic: "3.1 My Garden", status: "33% Complete", completion: 33 },
              { lesson: "", topic: "3.2 Chapter 2", status: "0% Complete", completion: 0 },
              { lesson: "4 The Grasshopper and the Ant", topic: "4.1 The Ant", status: "Incomplete", completion: 0 },
              { lesson: "", topic: "4.2 Chapter-4", status: "50% Complete", completion: 50 },
              { lesson: "", topic: "4.3 Chapter-5", status: "Complete (04/25/2025)", completion: 100 }
            ]
          },
          {
            subject: "Hindi (230)",
            completion: 80.3,
            topics: [
              { lesson: "1 पाठ 1", topic: "1.1 पाठ 1.1", status: "50% Complete", completion: 50 },
              { lesson: "", topic: "1.2 Chapter 6", status: "50% Complete", completion: 50 },
              { lesson: "2 Chapter 5", topic: "", status: "Complete (04/20/2025)", completion: 100 }
            ]
          },
          {
            subject: "Mathematics (110)",
            completion: 88.3,
            topics: [
              { lesson: "1 Fun With Numbers", topic: "1.1 Number Series", status: "30% Complete", completion: 30 },
              { lesson: "", topic: "1.2 Chapter-6", status: "50% Complete", completion: 50 },
              { lesson: "", topic: "1.3 Number line jumps", status: "Complete (04/19/2025)", completion: 100 },
              { lesson: "", topic: "1.4 Chapter 8", status: "Incomplete", completion: 0 },
              { lesson: "2 Play With Patterns", topic: "2.1 Patterns Numbers", status: "Complete (04/27/2025)", completion: 100 },
              { lesson: "", topic: "2.2 Chapter-10", status: "Incomplete", completion: 0 },
              { lesson: "3 Shapes And Designs", topic: "3.1 Design Circle", status: "50% Complete", completion: 50 },
              { lesson: "", topic: "3.2 Chapter-8", status: "Incomplete", completion: 0 }
            ]
          },
          {
            subject: "Science (111)",
            completion: 90.3,
            topics: [
              { lesson: "1 Our Body", topic: "1.1 Body Parts", status: "Complete (04/25/2025)", completion: 100 },
              { lesson: "", topic: "1.2 Chapter 2", status: "0% Complete", completion: 0 },
              { lesson: "2 Plants Around Us", topic: "2.1 Types of Plants", status: "Incomplete", completion: 0 },
              { lesson: "", topic: "2.2 Chapter 4", status: "Incomplete", completion: 0 }
            ]
          },
          {
            subject: "Drawing (200)",
            completion: 100.3,
            topics: [
              { lesson: "1 Basic Shapes", topic: "1.1 Drawing Circles", status: "Complete (04/22/2025)", completion: 100 },
              { lesson: "", topic: "1.2 Drawing Squares", status: "Complete (04/23/2025)", completion: 100 }
            ]
          },
          {
            subject: "Computer (00220)",
            completion: 0.3,
            topics: [
              { lesson: "1 Introduction", topic: "1.1 Computer Basics", status: "0% Complete", completion: 0 },
              { lesson: "", topic: "1.2 Chapter 1", status: "Incomplete", completion: 0 }
            ]
          }
        ]
      }
    }
  };

  // State for search criteria
  const [searchCriteria, setSearchCriteria] = useState({
    class: '',
    section: '',
    subjectGroup: ''
  });

  // State for filtered data
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle search
  const handleSearch = () => {
    if (!searchCriteria.class || !searchCriteria.section || !searchCriteria.subjectGroup) {
      alert('Please select Class, Section, and Subject Group');
      return;
    }

    setHasSearched(true);
    
    // Get data based on selected criteria
    const data = syllabusData[searchCriteria.class]?.[searchCriteria.section]?.[searchCriteria.subjectGroup] || [];
    setFilteredSubjects(data);
  };
  const commonStyle = (report) => ({
    padding: '10px',
    backgroundColor:  '#f0f0f0',
    color:  '#333',
    border: '1px solid #ddd',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontWeight: '500',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  });
  // Circular progress component
  const CircularProgress = ({ percentage, subject }) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-gray-200"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="50"
            cy="50"
          />
          <circle
            className="text-blue-600"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="50"
            cy="50"
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-lg font-bold">{percentage}%</span>
          <span className="text-xs text-gray-600">{subject.split(' ')[0]}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
    <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Online Examinations Report</h1>
    
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '10px',
      marginBottom: '30px'
    }}>
      <button style={commonStyle()} onClick={handleClick1}> Syllabus Status Report</button>
      <button style={commonStyle()} onClick={handleClick2}>Subject Lesson Plan Report</button>
  
      
    </div>
  </div>
     
      
      {/* Search Criteria */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Select Criteria</h2>
        
        <div className="flex flex-wrap gap-4 items-end">

        <div className="flex-1 min-w-[200px]">

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
          
          <div className="flex-1 min-w-[200px]">

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
          
          <div className="flex-1 min-w-[200px]">

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
        <div className="bg-white rounded-lg shadow-md overflow-hidden p-4">
             <h1 className="text-2xl font-bold mb-6">Syllabus Status Report</h1>
          {filteredSubjects.length > 0 ? (
            <>
              {/* Circular Progress Indicators */}
              <div className="flex flex-wrap justify-center gap-8 mb-8">
                {filteredSubjects.map(subject => (
                  <CircularProgress 
                    key={subject.subject} 
                    percentage={subject.completion} 
                    subject={subject.subject} 
                  />
                ))}
              </div>
              
              <p className="text-sm text-gray-500 mb-4 text-center">
                Note: Subject Percentage Based On Topic.
              </p>
              
              {/* Detailed Topic Status */}
              <div className="space-y-8">
                {filteredSubjects.map(subject => (
                  <div key={subject.subject} className="border rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-4">{subject.subject}</h3>
                    
                    <div className="space-y-2">
                      {subject.topics.map((topic, index) => (
                        <div key={index} className="grid grid-cols-12 gap-2 items-center">
                          {topic.lesson && (
                            <div className="col-span-12 font-medium text-blue-600">
                              {topic.lesson}
                            </div>
                          )}
                          <div className="col-span-8 md:col-span-9 pl-4">
                            {topic.topic}
                          </div>
                          <div className="col-span-4 md:col-span-3 text-right">
                            <span className={`px-2 py-1 rounded text-xs ${
                              topic.status.includes('Complete') ? 'bg-green-100 text-green-800' :
                              topic.status.includes('%') ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {topic.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No syllabus data found for the selected criteria.
            </div>
          )}
        </div>
      )}
    </div>
  );
}