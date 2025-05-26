"use client";
import { useState } from 'react';
import { FaSearch, FaPlus, FaEye, FaBars } from 'react-icons/fa';
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function StudentIncidentManagement() {
  // Dummy data
   const pathname = usePathname();

  // Attendance menu items with exact names from screenshot
  const attendanceMenuItems = [
    { 
      title: "Student Incident List",
      path: "../reports/student-incident-list" 
    },
    { 
      title: "Student Behaviour Rank List", 
      path: "../reports/student-behaviour-rank-list" 
    },
    { 
      title: "Class Wise Rank Report",
      path: "../reports/class-wise-rank-report" 
    },
    { 
      title: "Class Section Wise Rank Report",
      path: "../reports/class-section-wise-renk-report" 
    },
    { 
      title: "House Wise Rank Report",
      path: "../reports/house-wise-rank-report" 
    },
    { 
      title: "Incident Wise Report",
      path: "../reports/incident-wise-report" 
    } 
  ];
  const studentsData = [
    {
      admissionNo: "120020",
      studentName: "Ashwani Kumar",
      classSection: "Class 1 (A)",
      gender: "Male",
      phone: "980678463",
      totalIncidents: 4,
      totalPoints: 40,
      incidents: [
        { title: "Student Good Behaviour", point: 20, session: "2025-26", date: "04/01/2025", description: "Smile & have a good attitude and good behaviour.", assignBy: "Jason Shariton (90006)" },
        { title: "Respect others/property", point: 10, session: "2025-26", date: "04/01/2025", description: "Respect others/property", assignBy: "Jason Shariton (90006)" },
        { title: "Harassment and bullying", point: -10, session: "2025-26", date: "05/01/2025", description: "If students report this type of behaviour, institutions will be able to monitor the individuals involved. They can then try to resolve the situation.", assignBy: "Jason Shariton (90006)" },
        { title: "Student Good Behaviour", point: 20, session: "2025-26", date: "05/01/2025", description: "Smile & have a good attitude and good behaviour.", assignBy: "Jason Shariton (90006)" }
      ]
    },
    {
      admissionNo: "120039",
      studentName: "Nathan Smith",
      classSection: "Class 1 (A)",
      gender: "Male",
      phone: "8906785675",
      totalIncidents: 3,
      totalPoints: 50,
      incidents: [
        { title: "Student Good Behaviour", point: 20, session: "2025-26", date: "04/01/2025", description: "Excellent participation in class.", assignBy: "Jason Shariton (90006)" },
        { title: "Respect others/property", point: 10, session: "2025-26", date: "04/05/2025", description: "Helped clean up the classroom.", assignBy: "Jason Shariton (90006)" },
        { title: "Student Good Behaviour", point: 20, session: "2025-26", date: "05/10/2025", description: "Helped another student with homework.", assignBy: "Jason Shariton (90006)" }
      ]
    },
    {
      admissionNo: "125005",
      studentName: "Nehal Wadhera",
      classSection: "Class 1 (A)",
      gender: "Male",
      phone: "890786784",
      totalIncidents: 0,
      totalPoints: 50,
      incidents: []
    },
    {
      admissionNo: "520039",
      studentName: "Xavier Barilett",
      classSection: "Class 1 (A)",
      gender: "Male",
      phone: "0890789657",
      totalIncidents: 3,
      totalPoints: 40,
      incidents: [
        { title: "Student Good Behaviour", point: 20, session: "2025-26", date: "04/01/2025", description: "Always prepared for class.", assignBy: "Jason Shariton (90006)" },
        { title: "Late to class", point: -10, session: "2025-26", date: "04/15/2025", description: "Arrived 10 minutes late.", assignBy: "Jason Shariton (90006)" },
        { title: "Student Good Behaviour", point: 20, session: "2025-26", date: "05/01/2025", description: "Volunteered for extra assignments.", assignBy: "Jason Shariton (90006)" },
        { title: "Disruptive behavior", point: -10, session: "2025-26", date: "05/10/2025", description: "Talking during lecture.", assignBy: "Jason Shariton (90006)" }
      ]
    }
  ];

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudentIncidents, setSelectedStudentIncidents] = useState(null);
  const [showIncidentsModal, setShowIncidentsModal] = useState(false);

  const handleSearch = () => {
    if (!selectedClass || !selectedSection || !selectedSession) {
      alert("Please select Class, Section, and Session");
      return;
    }

    const filtered = studentsData.filter(student => {
      const matchesSearch = 
        student.admissionNo.includes(searchTerm) ||
        student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.classSection.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesSearch;
    });

    setFilteredStudents(filtered);
  };

  const viewIncidents = (student) => {
    setSelectedStudentIncidents(student);
    setShowIncidentsModal(true);
  };

  const closeModal = () => {
    setShowIncidentsModal(false);
    setSelectedStudentIncidents(null);
  };
 const buttonGroups = [
    [0, 1, 2],  // First column - 3 buttons
    [3, 4],     // Second column - 2 buttons
    [5 ]      // Third column - 2 buttons
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
        }}> Report</h1>
        
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
      <h1 className="text-2xl font-bold mb-6">Select Criteria</h1>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Class</h2>
        <div className="flex flex-wrap gap-4 mb-4">
                   <div className="flex-1 min-w-[200px]">

            <label className="block mb-2">Class</label>
            <select 
                           className="w-full p-2 border border-gray-300 rounded"

              value={selectedClass}
              
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="">Select Class</option>
              <option value="Class 1">Class 1</option>
              <option value="Class 2">Class 2</option>
              <option value="Class 3">Class 3</option>
            </select>
          </div>
                   <div className="flex-1 min-w-[200px]">

            <label className="block mb-2">Section</label>
            <select 
                          className="w-full p-2 border border-gray-300 rounded"

              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
            >
              <option value="">Select Section</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>
                  <div className="flex-1 min-w-[200px]">

            <label className="block mb-2">Session</label>
            <select 
                           className="w-full p-2 border border-gray-300 rounded"

              value={selectedSession}
              onChange={(e) => setSelectedSession(e.target.value)}
            >
              <option value="">Select Session</option>
              <option value="2024-25">2024-25</option>
              <option value="2025-26">2025-26</option>
              <option value="2026-27">2026-27</option>
            </select>
          </div>
        </div>
 <button style={{ backgroundColor:'black',position:'relative',left:"1080px"}}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleSearch}
        >
          Search
        </button>
        <div className="mb-4">
          <label className="block mb-2">Search...</label>
          <input
            type="text"
            className="border p-2 rounded w-full"
            placeholder="Search by Admission No, Name, or Class"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

       
      </div>

      {filteredStudents.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Student Incident List</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border">Admission No</th>
                  <th className="py-2 px-4 border">Student Name</th>
                  <th className="py-2 px-4 border">Class (Section)</th>
                  <th className="py-2 px-4 border">Gender</th>
                  <th className="py-2 px-4 border">Phone</th>
                  <th className="py-2 px-4 border">Total Incidents</th>
                  <th className="py-2 px-4 border">Total Points</th>
                  <th className="py-2 px-4 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="py-2 px-4 border">{student.admissionNo}</td>
                    <td className="py-2 px-4 border">{student.studentName}</td>
                    <td className="py-2 px-4 border">{student.classSection}</td>
                    <td className="py-2 px-4 border">{student.gender}</td>
                    <td className="py-2 px-4 border">{student.phone}</td>
                    <td className="py-2 px-4 border">{student.totalIncidents}</td>
                    <td className="py-2 px-4 border">{student.totalPoints}</td>
                    <td className="py-2 px-4 border">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => viewIncidents(student)}
                      >
                      <FaBars/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Records: 1 to {filteredStudents.length} of {filteredStudents.length}
          </div>
        </div>
      )}

      {showIncidentsModal && selectedStudentIncidents && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Assigned Incidents </h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={closeModal}
              >
                ✕
              </button>
            </div>

            <div className="mb-4">
              <input
                type="text"
                className="border p-2 rounded w-full"
                placeholder="Search..."
              />
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 border">Title</th>
                    <th className="py-2 px-4 border">Point</th>
                    <th className="py-2 px-4 border">Session</th>
                    <th className="py-2 px-4 border">Date</th>
                    <th className="py-2 px-4 border">Description</th>
                    <th className="py-2 px-4 border">Assign By</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedStudentIncidents.incidents.length > 0 ? (
                    selectedStudentIncidents.incidents.map((incident, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="py-2 px-4 border">{incident.title}</td>
                        <td className={`py-2 px-4 border ${incident.point > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {incident.point}
                        </td>
                        <td className="py-2 px-4 border">{incident.session}</td>
                        <td className="py-2 px-4 border">{incident.date}</td>
                        <td className="py-2 px-4 border">{incident.description}</td>
                        <td className="py-2 px-4 border">{incident.assignBy}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="py-4 text-center text-gray-500">
                        No incidents found for this student
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {selectedStudentIncidents.incidents.length > 0 && (
              <div className="mt-4 text-sm text-gray-600">
                Results: 1 to {selectedStudentIncidents.incidents.length} of {selectedStudentIncidents.incidents.length}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}