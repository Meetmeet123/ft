"use client";
import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Link from "next/link";
import { usePathname } from "next/navigation";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
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
  const sessionData = {
    'All Session Points': [
      { incident: 'Improper behaviour', students: 3 },
      { incident: 'Cheating and plagiarism', students: 10 },
      { incident: 'Threats and violence', students: 15 },
      { incident: 'Harassment and bullying', students: 25 },
      { incident: 'Student Good Behaviour', students: 50 },
      { incident: 'Respect others/property.', students: 45 },
      { incident: 'Thefts', students: 12 },
    ],
    'Current Session Points': [
      { incident: 'Improper behaviour', students: 0 },
      { incident: 'Cheating and plagiarism', students: 5 },
      { incident: 'Threats and violence', students: 11 },
      { incident: 'Harassment and bullying', students: 22 },
      { incident: 'Student Good Behaviour', students: 40 },
      { incident: 'Respect others/property.', students: 35 },
      { incident: 'Thefts', students: 6 },
    ],
  };
 const handleSearch = () => {
    setReportData(sessionData[selectedSession]);
  };
  const [selectedSession, setSelectedSession] = useState('Current Session Points');
  const [reportData, setReportData] = useState(sessionData['Current Session Points']);



  const pieData = {
    labels: reportData.map(item => item.incident),
    datasets: [
      {
        data: reportData.map(item => item.students),
        backgroundColor: [
          '#4CAF50',
          '#F44336',
          '#2196F3',
          '#FF9800',
          '#9C27B0',
          '#FFEB3B',
          '#FF7043',
        ],
        borderWidth: 1,
      },
    ],
  };
 const buttonGroups = [
    [0, 1, 2],  // First column - 3 buttons
    [3, 4],     // Second column - 2 buttons
    [5 ]      // Third column - 2 buttons
  ];
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial', maxWidth: '1200px', margin: '0 auto' }}>
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
      <h1  >Select Criteria</h1>
      <div style={{ marginBottom: '1.5rem' }}>
        <label><strong>Session:</strong></label>{' '}
        <select
          value={selectedSession}
          onChange={(e) => setSelectedSession(e.target.value)}
          style={{ 
            padding: '0.5rem', 
            marginRight: '1rem',
            borderRadius: '4px',
            border: '1px solid #ccc',width:'300px'
          }}
        >

          <option value="Current Session Points">Current Session Points</option>
          <option value="All Session Points">All Session Points</option>
        </select>
      </div>
<button onClick={handleSearch} style={{ padding: '0.5rem 1rem' }}>Search</button>
      {reportData.length > 0 && (
        <>
          <h3 style={{ margin: '2rem 0 1rem' }}>Incident Wise Report</h3>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <div style={{ flex: '1', minWidth: '300px' }}>
              <table style={{ 
                borderCollapse: 'collapse', 
                width: '100%',
                boxShadow: '0 0 10px rgba(0,0,0,0.1)'
              }}>
                <thead>
                  <tr style={{ 
                    background: '#f0f0f0',
                    textAlign: 'left'
                  }}>
                    <th style={{ padding: '12px', border: '1px solid #ddd' }}>Incident</th>
                    <th style={{ padding: '12px', border: '1px solid #ddd' }}>Students</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((item, index) => (
                    <tr key={index} style={{ 
                      borderBottom: '1px solid #ddd',
                      ':hover': { backgroundColor: '#f9f9f9' }
                    }}>
                      <td style={{ padding: '12px', border: '1px solid #ddd' }}>{item.incident}</td>
                      <td style={{ padding: '12px', border: '1px solid #ddd' }}>{item.students}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div style={{ flex: '1', minWidth: '300px', maxWidth: '500px' }}>
              <div style={{ 
                padding: '1rem',
                background: 'white',
                boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                borderRadius: '8px'
              }}>
                <Pie 
                  data={pieData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                      legend: {
                        position: 'right',
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}