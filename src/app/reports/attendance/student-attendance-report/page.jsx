"use client";

import { useState } from 'react';
import Link from "next/link";

import { usePathname } from "next/navigation";

export default function StudentAttendanceReport() {
  const pathname = usePathname();
  
    // Attendance menu items with exact names from screenshot
    const attendanceMenuItems = [
      { 
        title: "Attendance Report",
        path: "attendance/student-attendance-report" 
      },
      { 
        title: "Student Day Wise Attendance Report", 
        path: "/attendance/student-day-wise" 
      },
      { 
        title: "Biometric Attendance Log",
        path: "/attendance/biometric-log" 
      },
      { 
        title: "Student Attendance Type Report",
        path: "/attendance/student-type" 
      },
      { 
        title: "Staff Day Wise Attendance Report",
        path: "/attendance/staff-day-wise" 
      },
      { 
        title: "Daily Attendance Report",
        path: "/attendance/daily" 
      },
      { 
        title: "Staff Attendance Report",
        path: "/attendance/staff" 
      }
    ];
  
    // Group indices to create 3-2-2 layout
    const buttonGroups = [
      [0, 1, 2],  // First column - 3 buttons
      [3, 4],     // Second column - 2 buttons
      [5, 6]      // Third column - 2 buttons
    ];
  
  // Dummy data matching your screenshot
  const dummyData = {
    classes: ["Class 1", "Class 2", "Class 3"],
    sections: ["A", "B", "C"],
    months: ["January", "February", "March", "April", "May", "June"],
    years: ["2024", "2025", "2026"],
    weekDays: ["Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", 
               "Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", 
               "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon", 
               "Tue", "Wed", "Thu", "Fri"],
    students: [] // Empty array to show "No Record Found"
  };

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [showReport, setShowReport] = useState(false);

  const handleSearch = () => {
    if (selectedClass && selectedSection && selectedMonth) {
      setShowReport(true);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
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
        }}>Attendance Report</h1>
        
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
      <div style={{position:'relative',top:'50px'}}>
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
     
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Select Criteria</h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '15px',
        marginBottom: '30px'
      }}>
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }}>Class *</h2>
          <select 
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">Select Class</option>
            {dummyData.classes.map((cls, index) => (
              <option key={index} value={cls}>{cls}</option>
            ))}
          </select>
        </div>

        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }}>Section *</h2>
          <select 
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
          >
            <option value="">Select Section</option>
            {dummyData.sections.map((sec, index) => (
              <option key={index} value={sec}>{sec}</option>
            ))}
          </select>
        </div>

        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }}>Month *</h2>
          <select 
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">Select Month</option>
            {dummyData.months.map((month, index) => (
              <option key={index} value={month}>{month}</option>
            ))}
          </select>
        </div>

        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }}>Year</h2>
          <select 
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">Select Year</option>
            {dummyData.years.map((year, index) => (
              <option key={index} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <hr style={{ margin: '20px 0', border: '0', borderTop: '1px solid #eee' }} />

      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Student Attendance Report</h1>

      {showReport ? (
        <div style={{ overflowX: 'auto' }}>
           <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <div><strong>Present:</strong> P</div>
            <div><strong>Late:</strong> L</div>
            <div><strong>Absent:</strong> A</div>
            <div><strong>Holiday:</strong> H</div>
            <div><strong>Half Day:</strong> F</div>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px', fontSize: '14px' }}>
            <thead>
              <tr>
                <th style={{  padding: '10px', border: '1px solid #ddd', backgroundColor: '#f2f2f2', fontWeight: 'bold', textAlign: 'left' }}>Student / Date</th>
                <th style={{ width:'00px',padding: '10px', border: '1px solid #ddd', backgroundColor: '#f2f2f2', fontWeight: 'bold' }} colSpan="5">P L A H F</th>
                {Array.from({ length: 30 }, (_, i) => i + 1).map(day => (
                  <th key={day} style={{ 
                    padding: '10px', 
                    border: '1px solid #ddd', 
                    backgroundColor: '#f2f2f2', 
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}>
                    {day.toString().padStart(2, '0')}
                  </th>
                ))}
              </tr>
              <tr>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}></td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }} colSpan="5"></td>
                {dummyData.weekDays.slice(0, 30).map((day, index) => (
                  <td key={index} style={{ 
                    padding: '10px', 
                    border: '1px solid #ddd', 
                    textAlign: 'center',
                    fontSize: '12px'
                  }}>
                    {day}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {dummyData.students.length > 0 ? (
                dummyData.students.map(student => (
                  <tr key={student.id}>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{student.name}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>0</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>0</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>0</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>0</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>0</td>
                    {Array.from({ length: 30 }, (_, i) => (i + 1).toString().padStart(2, '0')).map(day => (
                      <td key={day} style={{ 
                        padding: '10px', 
                        border: '1px solid #ddd', 
                        textAlign: 'center'
                      }}>
                        {student.attendance?.[day] || ''}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={36} style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                    No Record Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

         
        </div>
      ) : (
        <div style={{ padding: '20px', textAlign: 'center', color: '#666', fontSize: '16px' }}>
          Please select Class, Section, Month, and Year, then click Search to view attendance report.
        </div>
      )}
    </div>
      </div>
    </div> 
    
  );
}