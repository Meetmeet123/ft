"use client";

import React from 'react';

export default function StatsDashboard({overviewData}) {
  // Data for each overview section
  const feesData = overviewData.feesOverview;

  const enquiryData = overviewData.enquiryOverview;

  const libraryData = overviewData.libraryOverview;

  const attendanceData = overviewData.studentAttendance;

  // Component for individual stat items with progress bar
  const StatItem = ({ item }) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700">{item.count} {item.label}</span>
        {item.percentage !== null && (
          <span className="text-sm font-medium text-gray-700">{item.percentage}%</span>
        )}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`${item.color} h-2 rounded-full`} 
          style={{ width: `${item.percentage !== null ? item.percentage : 100}%` }}
        ></div>
      </div>
    </div>
  );

  // Component for each overview card
  const OverviewCard = ({ title, data }) => (
    <div className="bg-blue-50 p-5 rounded-lg shadow-sm h-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-5">{title}</h2>
      <div>
        {data.map((item, index) => (
          <StatItem key={index} item={item} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 p-4 my-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <OverviewCard title="Fees Overview" data={feesData} />
          <OverviewCard title="Enquiry Overview" data={enquiryData} />
          <OverviewCard title="Library Overview" data={libraryData} />
          <OverviewCard title="Student Today Attendance" data={attendanceData} />
        </div>
      </div>
    </div>
  );
}