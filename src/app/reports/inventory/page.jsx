"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Inventory = () => {
    const router = useRouter();
    
      const handleClick1 = () => {
        router.push('inventory/stock-report'); 
        // yahan apne destination ka route likho
      };
      
      const handleClick2 = () => {
        router.push('inventory/add-item-report'); 
    
        // yahan apne destination ka route likho
      };
    
      const handleClick3 = () => {
        router.push('inventory/issue-item-report'); 
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
       <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Inventory Report</h1>
        
       <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '10px',
          marginBottom: '30px'
        }}>
          <button style={commonStyle()} onClick={handleClick1}>Stock Report</button>
          <button style={commonStyle()} onClick={handleClick2}>Add Item Report</button>
          <button style={commonStyle()} onClick={handleClick3}>Issue Item Report</button>
        
          
        </div>
      </div>
  );
};

export default Inventory;