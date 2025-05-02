
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';
const Library = () => {
    const router = useRouter();
  const handleClick1 = () => {
    router.push('library/book-issue-report'); 
    // yahan apne destination ka route likho
  };
  
  const handleClick2 = () => {
    router.push('library/book-due-report'); 

    // yahan apne destination ka route likho
  };

  const handleClick3 = () => {
    router.push('library/book-inventory-report'); 
    // yahan apne destination ka route likho
  };
  
  const handleClick4 = () => {
    router.push('library/book-issue-return-report'); 

    // yahan apne destination ka route likho
  };

 
  const commonStyle = (report) => ({
    padding: '10px',
    backgroundColor:  '#f0f0f0',
    color:  '#333',
    border: '1px solid #ddd',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontWeight: '500',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  });
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
    <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Library Report</h1>
    
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '10px',
      marginBottom: '30px'
    }}>
      <button style={commonStyle()} onClick={handleClick1}>Book Issue Report</button>
      <button style={commonStyle()} onClick={handleClick2}>Book Due Report</button>
      <button style={commonStyle()} onClick={handleClick3}>Book Inventory Report</button>
      <button style={commonStyle()} onClick={handleClick4}>Book Issue Return Report</button>
      
    </div>
  </div>
  );
};

export default Library;