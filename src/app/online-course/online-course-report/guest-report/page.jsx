"use client";
// pages/guest-report.js
import { useState } from 'react';
import Link from "next/link";

import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation';
import { FaCheck, FaTimes, FaTrash, FaUser } from 'react-icons/fa';

export default function GuestReport() {
    const router = useRouter();
const pathname = usePathname();

  
const attendanceMenuItems = [
    { 
      title: "Student Course Purchase Report",
      path: "../online-course-report/student-course-purchase-report" 
    },
    { 
      title: "Course Sell Count Report", 
      path: "../online-course-report/course-sell-count-report" 
    },
    { 
      title: "Course Trending Report",
      path: "../online-course-report/course-trending-report" 
    },
    { 
      title: "Course Complete Report",
      path: "../online-course-report/course-complete-report" 
    },
    { 
      title: "Course Rating Report",
      path: "../online-course-report/course-rating-report" 
    },
    { 
      title: "Guest Report",
      path: "../online-course-report/guest-report" 
    },
    { 
      title: "Course Assignment Report",
      path: "../online-course-report/course-assignment-report" 
    },
    { 
        title: "Course Exam Result Report",
        path: "../online-course-report/course-exam-result-report" 
      },
      { 
        title: "Course Exam Report",
        path: "../online-course-report/course-exam-report" 
      },
      { 
        title: "Course Exam Attempt Report",
        path: "../online-course-report/course-exam-attempt-report" 
      }
    
  ];
  // Dummy guest data
  const initialGuests = [
    {
      id: 1,
      name: 'Arvind Sinha',
      admissionNo: 'Guest100',
      email: 'arvind@gmail.com',
      mobile: '980678768',
      dob: '06/18/1999',
      gender: 'Male',
      address: '',
      active: false
    },
    {
      id: 2,
      name: 'Vinay Patel',
      admissionNo: 'Guest101',
      email: 'vinay@gmail.com',
      mobile: '',
      dob: '03/19/2010',
      gender: 'Male',
      address: '',
      active: false
    },
    {
      id: 3,
      name: 'Mitchel Thomas',
      admissionNo: 'Guest102',
      email: 'mitchel@gmail.com',
      mobile: '',
      dob: '07/25/2013',
      gender: 'Male',
      address: '',
      active: false
    },
    {
      id: 4,
      name: 'arvind Khanna',
      admissionNo: 'Guest103',
      email: 'arvind67@gmail.com',
      mobile: '908766678',
      dob: '07/17/2009',
      gender: 'Male',
      address: '',
      active: false
    },
    {
      id: 5,
      name: 'Elisabeth Thomas',
      admissionNo: 'Guest104',
      email: 'elisabeth@gmail.com',
      mobile: '',
      dob: '05/13/2019',
      gender: 'Female',
      address: '',
      active: false
    },
    {
      id: 6,
      name: 'Alberto Wood',
      admissionNo: 'Guest105',
      email: 'alberto@gmail.com',
      mobile: '',
      dob: '06/18/2009',
      gender: 'Male',
      address: '',
      active: false
    },
    {
      id: 7,
      name: 'Garry hook',
      admissionNo: 'Guest106',
      email: 'Garry45@gmail.com',
      mobile: '',
      dob: '',
      gender: '',
      address: '',
      active: false
    },
    {
      id: 8,
      name: 'Emma Watson',
      admissionNo: 'Guest107',
      email: 'emm45@gmail.com',
      mobile: '',
      dob: '',
      gender: '',
      address: '',
      active: false
    },
    {
      id: 9,
      name: 'Faran Shah',
      admissionNo: 'Guest108',
      email: 'faran@gmail.com',
      mobile: '898708908',
      dob: '07/24/2009',
      gender: 'Male',
      address: '',
      active: false
    }
  ];

  // State management
  const [guests, setGuests] = useState(initialGuests);
  const [searchTerm, setSearchTerm] = useState('');

  // Toggle active status
  const toggleActive = (id) => {
    setGuests(guests.map(guest => 
      guest.id === id ? { ...guest, active: !guest.active } : guest
    ));
  };

  // Delete guest
  const deleteGuest = (id) => {
    setGuests(guests.filter(guest => guest.id !== id));
  };

  // Filter guests based on search term
  const filteredGuests = guests.filter(guest =>
    guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.admissionNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const buttonGroups = [
    [0, 1, 2],  // First column - 3 buttons
    [3, 4,5],     // Second column - 2 buttons
    [6,7],
    [8, 9] // Third column - 2 buttons
  ];
  return (
    <div className="min-h-screen bg-gray-50 p-6">
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
      }}>Online Course Report</h1>
      
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
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Guest Report</h1>
        
        {/* Search Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Search...</h2>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Search guests..."
              className="flex-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Search
            </button>
          </div>
        </div>

        {/* Guests Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admission No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Birth</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredGuests.map((guest) => (
                <tr key={guest.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <FaUser className="text-gray-500" />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{guest.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{guest.admissionNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{guest.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{guest.mobile || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{guest.dob || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{guest.gender || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{guest.address }</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleActive(guest.id)}
                        className={`checkbox ${guest.active ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}
                      >
                        {guest.active ? <FaCheck /> : <FaTimes />}
                      </button>
                      <button
                        onClick={() => deleteGuest(guest.id)}
                        className="p-1 rounded bg-red-100 text-red-600 hover:bg-red-200"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Records count */}
        <div className="mt-4 text-sm text-gray-500">
          Showing {filteredGuests.length} of {filteredGuests.length} records
        </div>
      </div>
    </div>
  );
}