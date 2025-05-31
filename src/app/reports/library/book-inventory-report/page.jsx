"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BookInventoryReport() {
    const router = useRouter();
    const handleClick1 = () => {
      router.push('../library/book-issue-report'); 
    };
    
    const handleClick2 = () => {
      router.push('../library/book-due-report'); 
    };
  
    const handleClick3 = () => {
      router.push('../library/book-inventory-report'); 
    };
    
    const handleClick4 = () => {
      router.push('../library/book-issue-return-report'); 
    };

  // Dummy data
  const bookInventoryData = [
    {
      bookTitle: "Shapes and Designs",
      bookNumber: "7434",
      isbnNumber: "WESD88809",
      publisher: "S.K.Publisher",
      author: "S.K.mehta",
      subject: "Mathematics",
      backNumber: "4322",
      qty: 100,
      available: 91,
      issued: 9,
      bookPrice: "$80.00",
      postDate: "01/01/2025"
    },
    {
      bookTitle: "The Story of Food",
      bookNumber: "546433",
      isbnNumber: "DFDF89078",
      publisher: "D.S.Publisher",
      author: "G.S.Lokesh",
      subject: "English",
      backNumber: "67564",
      qty: 80,
      available: 73,
      issued: 7,
      bookPrice: "$120.00",
      postDate: "01/06/2025"
    },
    {
      bookTitle: "The Valley of Flowers",
      bookNumber: "34533",
      isbnNumber: "LPOO-00999",
      publisher: "S.K.Publisher",
      author: "K.S.Mehta",
      subject: "HINDI",
      backNumber: "53422",
      qty: 90,
      available: 85,
      issued: 5,
      bookPrice: "$95.00",
      postDate: "01/10/2025"
    },
    {
      bookTitle: "Motion and Measurement of Distances",
      bookNumber: "4634377",
      isbnNumber: "KO009098",
      publisher: "D.S.Publisher",
      author: "T.Mehta",
      subject: "EYS-II",
      backNumber: "3244",
      qty: 90,
      available: 84,
      issued: 6,
      bookPrice: "$100.00",
      postDate: "01/15/2025"
    }
  ];

  // State for filters and search
  const [filters, setFilters] = useState({
    searchType: '',
    searchQuery: ''
  });
  const [showResults, setShowResults] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Handle search
  const handleSearch = () => {
    if (!filters.searchType) {
      alert('Please select a search type first');
      return;
    }
    
    let results = bookInventoryData;
    
    // Filter by search query if provided
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      results = results.filter(item => 
        item.bookTitle.toLowerCase().includes(query) ||
        item.bookNumber.includes(filters.searchQuery) ||
        item.isbnNumber.toLowerCase().includes(query) ||
        item.publisher.toLowerCase().includes(query) ||
        item.author.toLowerCase().includes(query) ||
        item.subject.toLowerCase().includes(query)
      );
    }
    
    setFilteredData(results);
    setShowResults(true);
  };

  const commonStyle = {
    padding: '10px',
    backgroundColor: '#f0f0f0',
    color: '#333',
    border: '1px solid #ddd',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontWeight: '500',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Library Reports</h1>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '10px',
          marginBottom: '30px'
        }}>
          <button style={commonStyle} onClick={handleClick1}>Book Issue Report</button>
          <button style={commonStyle} onClick={handleClick2}>Book Due Report</button>
          <button style={commonStyle} onClick={handleClick3}>Book Inventory Report</button>
          <button style={commonStyle} onClick={handleClick4}>Book Issue Return Report</button>
        </div>
      </div>
      
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Select Criteria</h1>
      
      {/* Search Criteria - Single Row */}
      <div style={{ 
        backgroundColor: '#f3f4f6', 
        padding: '15px', 
        borderRadius: '8px', 
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        flexWrap: 'wrap'
      }}>
        <div style={{ flex: '1', minWidth: '100px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Search Type:</label>
          <select
            name="searchType"
            value={filters.searchType}
            onChange={handleFilterChange}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              backgroundColor: 'white'
            }}
            required
          >
            <option value="">Select</option>
            <option value="Today">Today</option>
            <option value="This Week">This Week</option>
            <option value="Last Week">Last Week</option>
            <option value="This Month">This Month</option>
            <option value="Last Month">Last Month</option>
          </select>
        </div>
        
        <button
          onClick={handleSearch}
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '500',
            marginTop: '10px'
          }}
        >
          Search
        </button>
      </div>
      
      {/* Search Input */}
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Book Inventory Report</h1>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          name="searchQuery"
          placeholder="Search..."
          value={filters.searchQuery}
          onChange={handleFilterChange}
          style={{
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            padding: '8px 12px',
            width: '100%',
            maxWidth: '400px'
          }}
        />
        {showResults && (
          <span style={{ marginLeft: '10px', color: '#6b7280' }}>
            {filteredData.length} records found
          </span>
        )}
      </div>
      
      {/* Results Table - Only shown after search */}
      {showResults && filteredData.length > 0 ? (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            backgroundColor: 'white',
            border: '1px solid #e5e7eb'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f3f4f6' }}>
                <th style={{ padding: '10px', border: '1px solid #e5e7eb', textAlign: 'left' }}>Book Title</th>
                <th style={{ padding: '10px', border: '1px solid #e5e7eb', textAlign: 'left' }}>Book Number</th>
                <th style={{ padding: '10px', border: '1px solid #e5e7eb', textAlign: 'left' }}>ISBN Number</th>
                <th style={{ padding: '10px', border: '1px solid #e5e7eb', textAlign: 'left' }}>Publisher</th>
                <th style={{ padding: '10px', border: '1px solid #e5e7eb', textAlign: 'left' }}>Author</th>
                <th style={{ padding: '10px', border: '1px solid #e5e7eb', textAlign: 'left' }}>Subject</th>
                <th style={{ padding: '10px', border: '1px solid #e5e7eb', textAlign: 'left' }}>Back Number</th>
                <th style={{ padding: '10px', border: '1px solid #e5e7eb', textAlign: 'left' }}>Qty</th>
                <th style={{ padding: '10px', border: '1px solid #e5e7eb', textAlign: 'left' }}>Available</th>
                <th style={{ padding: '10px', border: '1px solid #e5e7eb', textAlign: 'left' }}>Issued</th>
                <th style={{ padding: '10px', border: '1px solid #e5e7eb', textAlign: 'left' }}>Book Price</th>
                <th style={{ padding: '10px', border: '1px solid #e5e7eb', textAlign: 'left' }}>Post Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr 
                  key={index} 
                  style={{ 
                    backgroundColor: index % 2 === 0 ? 'white' : '#f9fafb',
                    borderBottom: '1px solid #e5e7eb'
                  }}
                >
                  <td style={{ padding: '10px', border: '1px solid #e5e7eb' }}>{item.bookTitle}</td>
                  <td style={{ padding: '10px', border: '1px solid #e5e7eb' }}>{item.bookNumber}</td>
                  <td style={{ padding: '10px', border: '1px solid #e5e7eb' }}>{item.isbnNumber}</td>
                  <td style={{ padding: '10px', border: '1px solid #e5e7eb' }}>{item.publisher}</td>
                  <td style={{ padding: '10px', border: '1px solid #e5e7eb' }}>{item.author}</td>
                  <td style={{ padding: '10px', border: '1px solid #e5e7eb' }}>{item.subject}</td>
                  <td style={{ padding: '10px', border: '1px solid #e5e7eb' }}>{item.backNumber}</td>
                  <td style={{ padding: '10px', border: '1px solid #e5e7eb' }}>{item.qty}</td>
                  <td style={{ padding: '10px', border: '1px solid #e5e7eb' }}>{item.available}</td>
                  <td style={{ padding: '10px', border: '1px solid #e5e7eb' }}>{item.issued}</td>
                  <td style={{ padding: '10px', border: '1px solid #e5e7eb' }}>{item.bookPrice}</td>
                  <td style={{ padding: '10px', border: '1px solid #e5e7eb' }}>{item.postDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : showResults ? (
        <p style={{ color: '#6b7280', textAlign: 'center', padding: '20px' }}>
          No records found matching your criteria
        </p>
      ) : null}
    </div>
  );
}