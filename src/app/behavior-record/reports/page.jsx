"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBook } from 'react-icons/fa';



export default function Attendance() {
  const pathname = usePathname();

  // Attendance menu items with exact names from screenshot
  const attendanceMenuItems = [
    { 
      title: "Student Incident List",
      path: "reports/student-incident-list" 
    },
    { 
      title: "Student Behaviour Rank List", 
      path: "reports/student-behaviour-rank-list" 
    },
    { 
      title: "Class Wise Rank Report",
      path: "reports/class-wise-rank-report" 
    },
    { 
      title: "Class Section Wise Rank Report",
      path: "reports/class-section-wise-renk-report" 
    },
    { 
      title: "House Wise Rank Report",
      path: "reports/house-wise-rank-report" 
    },
    { 
      title: "Incident Wise Report",
      path: "reports/incident-wise-report" 
    } 
  ];

  // Group indices to create 3-2-2 layout
  const buttonGroups = [
    [0, 1, 2],  // First column - 3 buttons
    [3, 4],     // Second column - 2 buttons
    [5]      // Third column - 2 buttons
  ];

  return (
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
                      <span style={{
                        fontWeight: '500',
                        fontSize: '16px',
                        margin: '0'
                      }}>                            
                      {item.title}</span>
                    </button>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}