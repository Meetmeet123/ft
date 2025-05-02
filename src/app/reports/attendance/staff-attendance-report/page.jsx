"use client";
import { useState } from 'react';
import Attendance from '../page';

const StaffAttendanceReport = () => {
  // Dummy data
  const dummyData = {
    roles: ['Admin', 'Teacher', 'Accountant', 'Receptionist', 'Super Admin'],
    months: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    years: ['2024', '2023', '2022'],
    staff: [
      {
        id: 1,
        name: 'William Abbot',
        role: 'Admin',
        attendance: {
          '01': 'P', '02': 'P', '03': 'L', '04': 'P', '05': 'A',
          '06': 'H', '07': 'P', '08': 'P', '09': 'P', '10': 'SH',
          '11': 'P', '12': 'P', '13': 'P', '14': 'P', '15': 'A',
          '16': 'P', '17': 'P', '18': 'P', '19': 'L', '20': 'P',
          '21': 'P', '22': 'P', '23': 'P', '24': 'P', '25': 'H',
          '26': 'P', '27': 'P', '28': 'P', '29': 'P', '30': 'P',
          '31': 'P'
        }
      },
      {
        id: 2,
        name: 'Sarah Smith',
        role: 'Teacher',
        attendance: {
          '01': 'P', '02': 'P', '03': 'P', '04': 'P', '05': 'P',
          '06': 'P', '07': 'P', '08': 'P', '09': 'P', '10': 'P',
          '11': 'P', '12': 'P', '13': 'P', '14': 'P', '15': 'P',
          '16': 'P', '17': 'P', '18': 'P', '19': 'P', '20': 'P',
          '21': 'P', '22': 'P', '23': 'P', '24': 'P', '25': 'P',
          '26': 'P', '27': 'P', '28': 'P', '29': 'P', '30': 'P',
          '31': 'P'
        }
      },
      {
        id: 3,
        name: 'John Doe',
        role: 'Accountant',
        attendance: {
          '01': 'P', '02': 'P', '03': 'P', '04': 'P', '05': 'P',
          '06': 'P', '07': 'P', '08': 'P', '09': 'P', '10': 'P',
          '11': 'P', '12': 'P', '13': 'P', '14': 'P', '15': 'P',
          '16': 'P', '17': 'P', '18': 'P', '19': 'P', '20': 'P',
          '21': 'P', '22': 'P', '23': 'P', '24': 'P', '25': 'P',
          '26': 'P', '27': 'P', '28': 'P', '29': 'P', '30': 'P',
          '31': 'P'
        }
      }
    ]
  };

  // State for search criteria
  const [searchCriteria, setSearchCriteria] = useState({
    role: 'Admin',
    month: 'January',
    year: '2024'
  });

  // State for search results
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

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
    const results = dummyData.staff.filter(staff => 
      staff.role === searchCriteria.role
    );
    
    setSearchResults(results);
    setShowResults(true);
  };

  // Get day of week for a date
  const getDayOfWeek = (month, year, day) => {
    const date = new Date(`${month} ${day}, ${year}`);
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];
  };

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'P': return 'bg-green-100 text-green-800';
      case 'L': return 'bg-yellow-100 text-yellow-800';
      case 'A': return 'bg-red-100 text-red-800';
      case 'F': return 'bg-blue-100 text-blue-800';
      case 'H': return 'bg-purple-100 text-purple-800';
      case 'SH': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Generate days for the selected month
  const generateDays = () => {
    const daysInMonth = new Date(
      parseInt(searchCriteria.year),
      dummyData.months.indexOf(searchCriteria.month) + 1,
      0
    ).getDate();
    
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const day = i.toString().padStart(2, '0');
      days.push({
        day,
        dayOfWeek: getDayOfWeek(searchCriteria.month, searchCriteria.year, day)
      });
    }
    return days;
  };

  return (<> <Attendance/>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Staff Attendance Report</h1>
      
      {/* Search Criteria */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Select Criteria</h2>
        
        <div className="flex flex-wrap gap-4 items-end" >
          <div style={{width:'300px'}}>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              name="role"
              value={searchCriteria.role}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              {dummyData.roles.map((role, index) => (
                <option key={index} value={role}>{role}</option>
              ))}
            </select>
          </div>
          
          <div  style={{width:'300px'}}>
            <label className="block text-sm font-medium text-gray-700 mb-1">Month*</label>
            <select
              name="month"
              value={searchCriteria.month}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              {dummyData.months.map((month, index) => (
                <option key={index} value={month}>{month}</option>
              ))}
            </select>
          </div>
          
          <div  style={{width:'250px'}}>
            <label className="block text-sm font-medium text-gray-700 mb-1">Year*</label>
            <select
              name="year"
              value={searchCriteria.year}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              {dummyData.years.map((year, index) => (
                <option key={index} value={year}>{year}</option>
              ))}
            </select>
          </div>
          
          <button
            onClick={handleSearch}
            // className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </div>
      
      {/* Search Results */}
      {showResults && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold inline">Staff Attendance Report</h2>
            <span className="ml-4 text-sm text-gray-600">
              Present: <span className="bg-green-100 text-green-800 px-2 py-1 rounded">P</span>{' '}
              Late: <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">L</span>{' '}
              Absent: <span className="bg-red-100 text-red-800 px-2 py-1 rounded">A</span>{' '}
              Half Day: <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">F</span>{' '}
              Holiday: <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">H</span>{' '}
              Half Day Second Shift: <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded">SH</span>
            </span>
          </div>
          
          <div className="mb-4 text-sm text-gray-600">
            (Month: {searchCriteria.month}) (Year: {searchCriteria.year}) (Role: {searchCriteria.role})
          </div>
          
          {searchResults.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff / Date (%)</th>
                    {generateDays().map((day, index) => (
                      <th key={index} className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div>{day.day}</div>
                        <div>{day.dayOfWeek}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {searchResults.map((staff) => (
                    <tr key={staff.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{staff.name}</td>
                      {generateDays().map((day, index) => (
                        <td key={index} className="px-2 py-4 text-center">
                          {staff.attendance[day.day] ? (
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(staff.attendance[day.day])}`}>
                              {staff.attendance[day.day]}
                            </span>
                          ) : '-'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              
              <div className="mt-4 text-sm text-gray-500">
                Records: 1 to {searchResults.length} of {searchResults.length}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No staff records found for the selected criteria.</p>
            </div>
          )}
        </div>
      )}
    </div>
    </>
  );
};

export default StaffAttendanceReport;