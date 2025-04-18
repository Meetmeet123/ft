"use client";
import React, { useState, useRef } from 'react';
import { ChevronDown, Printer, FileText, Database, Download, Search } from 'lucide-react';
import dashboardData from './DashboardData';
import DashboardDataChild from './DashboardChild';

export default function Users() {

  const getActiveData = () => {
    if(dashboardData.length > 0) return dashboardData;
    return [];
  };

  const handlePrintClick = () => {
    window.print();
  };

  const handleCopyClick = () => {
    const data = getActiveData();
    navigator.clipboard.writeText(JSON.stringify(data, null, 2))
      .then(() => alert("Copied to clipboard!"))
      .catch((err) => alert("Failed to copy!"));
  };

  const handleDownloadClick = () => {
    const data = getActiveData();
    const csvContent = convertToCSV(data);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `${activeTab}_data.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const convertToCSV = (data) => {
    if (!data || data.length === 0) return '';
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).join(',')).join('\n');
    return `${headers}\n${rows}`;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4">
        <DashboardDataChild/>
      </div>
    </div>
  );
}
