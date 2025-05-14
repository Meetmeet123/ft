"use client";
import { useState } from 'react';
import Link from "next/link";

import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation';



// Helper functions moved to the top
const isThisWeek = (date) => {
     

  const today = new Date();
  const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
  return date >= firstDayOfWeek;
};

const isThisMonth = (date) => {
  const today = new Date();
  return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
};

const isLastWeek = (date) => {
  const today = new Date();
  const firstDayOfLastWeek = new Date(today.setDate(today.getDate() - today.getDay() - 7));
  const lastDayOfLastWeek = new Date(today.setDate(today.getDate() + 6));
  return date >= firstDayOfLastWeek && date <= lastDayOfLastWeek;
};

const isLastMonth = (date) => {
  const today = new Date();
  const lastMonth = today.getMonth() === 0 ? 11 : today.getMonth() - 1;
  const year = today.getMonth() === 0 ? today.getFullYear() - 1 : today.getFullYear();
  return date.getMonth() === lastMonth && date.getFullYear() === year;
};

const getTodayDateString = () => {
  const today = new Date();
  return `${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}/${today.getFullYear()}`;
};

const PurchaseReportPage = () => {
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
  const initialPurchases = [
    {
      id: 1,
      student: 'Crystal Wood (Guest - Guest165)',
      date: '05/02/2025',
      course: 'Basic Drawing Skills course',
      provider: 'Youtube',
      paymentType: 'Online',
      paymentMethod: 'Paystack (TXN ID - 174616760702)',
      price: 135.00,
      status: 'Success',
      userType: 'Guest'
    },
    {
      id: 2,
      student: 'John Doe',
      date: '05/01/2025',
      course: 'Yoga for Kids',
      provider: 'Udemy',
      paymentType: 'Online',
      paymentMethod: 'Credit Card (TXN ID - 274616760703)',
      price: 90.00,
      status: 'Success',
      userType: 'Student'
    },
    {
      id: 3,
      student: 'Alice Smith (Guest - Guest166)',
      date: '04/30/2025',
      course: 'Music Courses',
      provider: 'Coursera',
      paymentType: 'Online',
      paymentMethod: 'PayPal (TXN ID - 374616760704)',
      price: 135.00,
      status: 'Processing',
      userType: 'Guest'
    },
    {
      id: 4,
      student: 'Bob Johnson',
      date: '04/28/2025',
      course: 'Chemistry Course',
      provider: 'Khan Academy',
      paymentType: 'Offline',
      paymentMethod: 'Bank Transfer',
      price: 135.00,
      status: 'Success',
      userType: 'Student'
    },
    {
      id: 5,
      student: 'Emma Watson',
      date: getTodayDateString(),
      course: 'Modern Physics',
      provider: 'EdX',
      paymentType: 'Online',
      paymentMethod: 'Stripe (TXN ID - 474616760705)',
      price: 150.00,
      status: 'Success',
      userType: 'Student'
    }
  ];

  // State management
  const [purchases, setPurchases] = useState(initialPurchases);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [usersType, setUsersType] = useState('');

  // Filter purchases based on search criteria
  const filteredPurchases = purchases.filter(purchase => {
    const matchesSearch = (
      purchase.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const todayDateString = getTodayDateString();
    const purchaseDate = new Date(purchase.date);
    
    const matchesSearchType = searchType ? 
      (searchType === 'Today' ? purchase.date === todayDateString :
       searchType === 'This Week' ? isThisWeek(purchaseDate) :
       searchType === 'This Month' ? isThisMonth(purchaseDate) :
       searchType === 'Last Week' ? isLastWeek(purchaseDate) :
       searchType === 'Last Month' ? isLastMonth(purchaseDate) : true) : true;
    
    const matchesPaymentType = paymentType ? purchase.paymentType === paymentType : true;
    const matchesPaymentStatus = paymentStatus ? purchase.status === paymentStatus : true;
    const matchesUsersType = usersType ? purchase.userType === usersType : true;
    
    return matchesSearch && matchesSearchType && matchesPaymentType && 
           matchesPaymentStatus && matchesUsersType;
  });

  // Calculate grand total
  const grandTotal = filteredPurchases.reduce((sum, purchase) => sum + purchase.price, 0);

  const handleSearch = () => {
    // The filtering is already done in the filteredPurchases calculation
    // This function is just for triggering the search when the button is clicked
    console.log('Search triggered with:', {
      searchTerm,
      searchType,
      paymentType,
      paymentStatus,
      usersType
    });
  };
  const buttonGroups = [
    [0, 1, 2],  // First column - 3 buttons
    [3, 4,5],     // Second column - 2 buttons
    [6,7],
    [8, 9] // Third column - 2 buttons
  ];

  return (
    <div className="purchase-report-container">
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
  <br /><br />
      <h1 style={{fontSize:'20px'}}> Student Course Purchase Report</h1>
      <br />
      <div className="search-filters">
        <div className="filter-row">
          <div className="filter-group">
            <label>Search Type*</label>
            <select 
              value={searchType} 
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Today">Today</option>
              <option value="This Week">This Week</option>
              <option value="This Month">This Month</option>
              <option value="Last Week">Last Week</option>
              <option value="Last Month">Last Month</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Payment Type*</label>
            <select 
              value={paymentType} 
              onChange={(e) => setPaymentType(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Payment Status</label>
            <select 
              value={paymentStatus} 
              onChange={(e) => setPaymentStatus(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Processing">Processing</option>
              <option value="Success">Success</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Users Type</label>
            <select 
              value={usersType} 
              onChange={(e) => setUsersType(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Student">Student</option>
              <option value="Guest">Guest</option>
            </select>
          </div>
        </div>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      <table className="purchase-table">
        <thead>
          <tr>
            <th>Student / Guest</th>
            <th>Date</th>
            <th>Course</th>
            <th>Course Provider</th>
            <th>Payment Type</th>
            <th>Payment Method</th>
            <th>Price ($)</th>
          </tr>
        </thead>
        <tbody>
          {filteredPurchases.map(purchase => (
            <tr key={purchase.id}>
              <td>{purchase.student}</td>
              <td>{purchase.date}</td>
              <td>{purchase.course}</td>
              <td>{purchase.provider}</td>
              <td>{purchase.paymentType}</td>
              <td>{purchase.paymentMethod}</td>
              <td>{purchase.price.toFixed(2)}</td>
            </tr>
          ))}
          <tr className="grand-total-row">
            <td colSpan="6">Grand Total</td>
            <td>${grandTotal.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

// CSS styles
const styles = `
  .purchase-report-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .search-filters {
    margin-bottom: 20px;
  }

  .filter-row {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 15px;
  }

  .filter-group {
    flex: 1;
    min-width: 200px;
  }

  .filter-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  .filter-group select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .search-bar {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }

  .search-bar input {
    flex: 1;
    max-width: 400px;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .search-button {
    padding: 8px 16px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .purchase-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }

  .purchase-table th, .purchase-table td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  .purchase-table th {
    background-color: #f2f2f2;
    font-weight: bold;
  }

  .grand-total-row {
    font-weight: bold;
    background-color: #f9f9f9;
  }
`;

// Add styles to the head
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = styles;
  document.head.appendChild(styleElement);
}

export default PurchaseReportPage;