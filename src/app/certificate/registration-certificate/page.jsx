"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Attendance() {
  const pathname = usePathname();

  // Attendance menu items with exact names from screenshot
  const attendanceMenuItems = [
    { 
      title: "Leaving Certificate",
      path: "registration-certificate/leaving-certificate" 
    },
    { 
      title: "Bonafide Certificate", 
      path: "registration-certificate/bonafied-certificate" 
    },
    { 
      title: "Entry Certificate",
      path: "registration-certificate/entry-cerificate" 
    },
    { 
      title: "Admission Form",
      path: "registration-certificate/adminssiton-form" 
    },
    { 
      title: "Student ID Card(vertical)",
      path: "registration-certificate/student-idcard-vertical" 
    },
    { 
      title: "Student ID Card(Horizontal)",
      path: "registration-certificate/student-idcard-horizontal" 
    },
    { 
      title: "Parent's ID Card",
      path: "registration-certificate/parent-id-card" 
    }
  ];

  // Group indices to create 3-2-2 layout
  const buttonGroups = [
    [0, 1, 2],  // First column - 3 buttons
    [3, 4],     // Second column - 2 buttons
    [5, 6]      // Third column - 2 buttons
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
        }}>  Print Certificates</h1>
        
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
  );
}