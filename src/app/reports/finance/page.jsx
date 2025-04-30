// app/online-admission-report/page.jsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';
const finance = () => {
      const router = useRouter();
  
      
 
  const handleClick1 = () => {
    router.push('finance/balance-fees-statement'); 
    // yahan apne destination ka route likho
  };
  
  const handleClick2 = () => {
    router.push('finance/balance-fees-report'); 

    // yahan apne destination ka route likho
  };
  const handleClick3 = () => {
    router.push('finance/balance-fees-report-with-remark'); 

    // yahan apne destination ka route likho
  };
  const handleClick4 = () => {
    router.push('finance/payroll-report'); 

    // yahan apne destination ka route likho
  };
  
  const handleClick5 = () => {
    router.push('finance/online-admission-fees-collection-report'); 

    // yahan apne destination ka route likho
  };
  const handleClick6 = () => {
    router.push('finance/daily-collection-report'); 

    // yahan apne destination ka route likho
  };
  const handleClick7 = () => {
    router.push('finance/balance-fees-statement'); 

    // yahan apne destination ka route likho
  };
  const handleClick8 = () => {
    router.push('finance/income-report'); 

    // yahan apne destination ka route likho
  };
  const handleClick9 = () => {
    router.push('finance/income-group-report'); 

    // yahan apne destination ka route likho
  };
  const handleClick10 = () => {
    router.push('finance/income-expense-balance-report'); 

    // yahan apne destination ka route likho
  };
  const handleClick11 = () => {
    router.push('finance/fees-statement'); 

    // yahan apne destination ka route likho
  };
  const handleClick12 = () => {
    router.push('finance/online-fees-collection-report'); 

    // yahan apne destination ka route likho
  };
  const handleClick13 = () => {
    router.push('finance/expense-report'); 

    // yahan apne destination ka route likho
  };
  const handleClick14 = () => {
    router.push('finance/expense-group-report'); 

    // yahan apne destination ka route likho
  };
  // Dummy JSON data

 
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
    <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Finance</h1>
    
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '10px',
      marginBottom: '30px'
    }}>
      <button style={commonStyle()} onClick={handleClick1}>Balance Fees Statement</button>
      <button style={commonStyle()} onClick={handleClick2}>Balance Fees Report</button>
      <button style={commonStyle()} onClick={handleClick3}>Balance Fees Report With Remark</button>
      <button style={commonStyle()} onClick={handleClick4}>Payroll Report</button>
      <button style={commonStyle()} onClick={handleClick5}>Online Admission Fees Collection Report</button>
      <button style={commonStyle()} onClick={handleClick6}>Daily Collection Report</button>
      <button style={commonStyle()} onClick={handleClick7}>Fees Collection Report</button>
      <button style={commonStyle()} onClick={handleClick8}>Income Report</button>
      <button style={commonStyle()} onClick={handleClick9}>Income Group Report</button>
      <button style={commonStyle()} onClick={handleClick10}>Income Expense Balance Report</button>
      <button style={commonStyle()} onClick={handleClick11}>Fees Statement</button>
      <button style={commonStyle()} onClick={handleClick12}>Online Fees Collection Report</button>
      <button style={commonStyle()} onClick={handleClick13}>Expense Report</button>
      <button style={commonStyle()} onClick={handleClick14}>Expense Group Report</button>
    </div>
  </div>
  );
};

export default finance;