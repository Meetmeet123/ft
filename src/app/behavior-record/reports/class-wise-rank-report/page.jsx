"use client";
import { useState } from 'react';
import { FaSearch, FaBars, FaEye, FaTrash } from 'react-icons/fa';
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function SchoolReports() {
  const [activeTab, setActiveTab] = useState('rank');
  const [searchTerm, setSearchTerm] = useState('');
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
  // Dummy data for class ranks
  const classRankData = [
    { rank: 1, class: 'Class 5', students: 18, totalPoints: 260 },
    { rank: 2, class: 'Class 4', students: 15, totalPoints: 230 },
    { rank: 3, class: 'Class 1', students: 5, totalPoints: 190 },
    { rank: 4, class: 'Class 2', students: 6, totalPoints: 150 },
    { rank: 5, class: 'Class 3', students: 8, totalPoints: 70 },
  ];

  // Dummy data for assigned incidents
  const incidentData = [
    {
      admissionNo: '18008',
      student: 'David Heart',
      classSection: 'Class 4 (A)',
      incidents: [
        {
          type: 'Threats and violence',
          description: 'If the university or school, is aware of these cases, they can monitor the spaces where threats and violence occur and improve security. This ensures that the individuals implicated can face consequences for their actions.',
          points: -20
        },
        {
          type: 'Harassment and bullying',
          description: 'If students report this type of behaviour, institutions will be able to monitor the individuals involved. They can then try to resolve the situation.',
          points: -10
        },
        {
          type: 'Respect others/property',
          description: 'Respect others/property',
          points: 10
        }
      ]
    },
    {
      admissionNo: '11025',
      student: 'Surya Lahwani',
      classSection: 'Class 4 (A)',
      incidents: [
        {
          type: 'Respect others/property',
          description: 'Respect others/property',
          points: 10
        },
        {
          type: 'Student Good Behaviour',
          description: 'Smile & have a good attitude and good behaviour.',
          points: 20
        }
      ]
    },
    {
      admissionNo: '18021',
      student: 'Mohit Raina',
      classSection: 'Class 4 (A)',
      incidents: [
        {
          type: 'Student Good Behaviour',
          description: 'Smile & have a good attitude and good behaviour.',
          points: 20
        },
        {
          type: 'Respect others/property',
          description: 'Respect others/property',
          points: 10
        }
      ]
    },
    {
      admissionNo: '18097',
      student: 'George Jeny Sharon',
      classSection: 'Class 4 (A)',
      incidents: [
        {
          type: 'Respect others/property',
          description: 'Respect others/property',
          points: 10
        },
        {
          type: 'Student Good Behaviour',
          description: 'Smile & have a good attitude and good behaviour.',
          points: 20
        }
      ]
    },
    {
      admissionNo: '11011',
      student: 'MANISH RAJPUT',
      classSection: 'Class 4 (A)',
      incidents: [
        {
          type: 'Student Good Behaviour',
          description: 'Smile & have a good attitude and good behaviour.',
          points: 20
        },
        {
          type: 'Respect others/property',
          description: 'Respect others/property',
          points: 10
        },
        {
          type: 'Harassment and bullying',
          description: 'If students report this type of behaviour, institutions will be able to monitor the individuals involved. They can then try to resolve the situation.',
          points: -10
        },
        {
          type: 'Student Good Behaviour',
          description: 'Smile & have a good attitude and good behaviour.',
          points: 20
        }
      ]
    },
    {
      admissionNo: '1121',
      student: 'sumit soni',
      classSection: 'Class 4 (A)',
      incidents: [
        {
          type: 'Student Good Behaviour',
          description: 'Smile & have a good attitude and good behaviour.',
          points: 20
        },
        {
          type: 'Respect others/property',
          description: 'Respect others/property',
          points: 10
        }
      ]
    },
    {
      admissionNo: '90088',
      student: 'Jonathan Hibbins',
      classSection: 'Class 4 (A)',
      incidents: [
        {
          type: 'Student Good Behaviour',
          description: 'Smile & have a good attitude and good behaviour.',
          points: 20
        }
      ]
    },
    {
      admissionNo: '9000563',
      student: 'Cathrine Rosengren',
      classSection: 'Class 4 (C)',
      incidents: [
        {
          type: 'Respect others/property',
          description: 'Respect others/property',
          points: 10
        }
      ]
    }
  ];

  // Filter incidents based on search term
  const filteredIncidents = incidentData.filter(item => 
    item.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.admissionNo.includes(searchTerm) ||
    item.classSection.toLowerCase().includes(searchTerm.toLowerCase())
  );
const viewIncidents = (student) => {
    setSelectedStudentIncidents(student);
    setShowIncidentsModal(true);
  };
   const buttonGroups = [
    [0, 1, 2],  // First column - 3 buttons
    [3, 4],     // Second column - 2 buttons
    [5 ]      // Third column - 2 buttons
  ];
  return (
    <div className="container mx-auto p-4">
      {/* <h1 className="text-2xl font-bold mb-6">School Reports</h1> */}
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
      

      {activeTab === 'rank' ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">Class Wise Rank Report</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 border rounded"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border">Rank</th>
                  <th className="py-2 px-4 border">Class</th>
                  <th className="py-2 px-4 border">Student</th>
                  <th className="py-2 px-4 border">Total Points</th>
                  <th className="py-2 px-4 border">Action</th>

                </tr>
              </thead>
              <tbody>
                {classRankData.map((item) => (
                  <tr key={item.rank} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border text-center">{item.rank}</td>
                    <td className="py-2 px-4 border text-center">{item.class}</td>
                    <td className="py-2 px-4 border text-center">{item.students}</td>
                    <td className="py-2 px-4 border text-center">{item.totalPoints}</td>
                    <td className="py-2 px-4 border">
                                          <button
                                            className="text-blue-500 hover:text-blue-700 text-xl"
                                           onClick={() => setActiveTab('incidents')}
                                            title="View Incidents"
                                          >
                                           <FaBars/>
                                          </button>
                                        </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Records: 1 to {classRankData.length} of {classRankData.length}
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">Assigned Incident</h2>
         
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border">Admission No</th>

                  <th className="py-2 px-4 border">Student</th>
                  <th className="py-2 px-4 border">Class (Section)</th>
                  <th className="py-2 px-4 border">Assigned Incident</th>
                  <th className="py-2 px-4 border">Description</th>
                  <th className="py-2 px-4 border">Point</th>
                </tr>
              </thead>
              <tbody>
                {filteredIncidents.map((student) => (
                  student.incidents.map((incident, index) => (
                    <tr key={`${student.admissionNo}-${index}`} className="hover:bg-gray-50">
                      {index === 0 ? (
                        <>
                        <td rowSpan={student.incidents.length} className="py-2 px-4 border">
                            <div className="font-semibold">{student.admissionNo}</div>
                            
                          </td>
                          <td rowSpan={student.incidents.length} className="py-2 px-4 border">
                            <div className="font-semibold">{student.student}</div>
                            
                          </td>
                          <td rowSpan={student.incidents.length} className="py-2 px-4 border">
                            {student.classSection}
                          </td>
                        </>
                      ) : null}
                      <td className="py-2 px-4 border">{incident.type}</td>
                      <td className="py-2 px-4 border">{incident.description}</td>
                      <td className={`py-2 px-4 border text-center ${incident.points > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {incident.points}
                      </td>
                    </tr>
                  ))
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Records: 1 to {filteredIncidents.length} of {filteredIncidents.length}
          </div>
        </div>
      )}
    </div>
  );
}