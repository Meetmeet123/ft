"use client";

import React from "react";
import dynamic from "next/dynamic";
import BarChart from "../bar-chart/BarChart";
import PieChart from "../pie-chart/PieChart";
import LineChart from "../line-chart/LineChart";
import FeeStatus from "../fee-status/FeeStatus";
import Overview from "../overview/Overview";
import Periodic from '../periodic/Periodic';
import { useState, useEffect } from "react";

export default function FinancialDashboard() {

    const [windowWidth, setWindowWidth] = useState(0);
    
      // Set initial window width and add resize listener
      useEffect(() => {
        setWindowWidth(window.innerWidth);
        
        const handleResize = () => {
          setWindowWidth(window.innerWidth);
        };
        // Set initial height
        handleResize();
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

    // Daily fees and expenses data for May 2025
    const dailyData = [
        { day: '01', fees: 300000, expenses: 20000 },
        { day: '02', fees: 45000, expenses: 5000 },
        { day: '03', fees: 10000, expenses: 3000 },
        { day: '04', fees: 5000, expenses: 2000 },
        { day: '05', fees: 8000, expenses: 18000 },
        { day: '06', fees: 15000, expenses: 4000 },
        { day: '07', fees: 10000, expenses: 6000 },
        { day: '08', fees: 410000, expenses: 8000 },
        { day: '09', fees: 25000, expenses: 5000 },
        { day: '10', fees: 5000, expenses: 2000 },
        { day: '11', fees: 2000, expenses: 6000 },
        { day: '12', fees: 3000, expenses: 4000 },
        { day: '13', fees: 4000, expenses: 2000 },
        { day: '14', fees: 6000, expenses: 8000 },
        { day: '15', fees: 8000, expenses: 5000 },
        { day: '16', fees: 7000, expenses: 12000 },
        { day: '17', fees: 9000, expenses: 4000 },
        { day: '18', fees: 11000, expenses: 7000 },
        { day: '19', fees: 13000, expenses: 8000 },
        { day: '20', fees: 12000, expenses: 5000 },
        { day: '21', fees: 10000, expenses: 6000 },
        { day: '22', fees: 8000, expenses: 4000 },
        { day: '23', fees: 7000, expenses: 5000 },
        { day: '24', fees: 9000, expenses: 7000 },
        { day: '25', fees: 11000, expenses: 8000 },
        { day: '26', fees: 13000, expenses: 9000 },
        { day: '27', fees: 12000, expenses: 7000 },
        { day: '28', fees: 10000, expenses: 5000 },
        { day: '29', fees: 8000, expenses: 4000 },
        { day: '30', fees: 9000, expenses: 6000 },
        { day: '31', fees: 7000, expenses: 5000 },
    ];

    // Monthly fees and expenses data for Session 2025-26
    const monthlyData = [
        { month: 'April', fees: 2000000, expenses: 50000 },
        { month: 'May', fees: 1000000, expenses: 70000 },
        { month: 'June', fees: 100000, expenses: 40000 },
        { month: 'July', fees: 50000, expenses: 30000 },
        { month: 'August', fees: 30000, expenses: 20000 },
        { month: 'September', fees: 25000, expenses: 18000 },
        { month: 'October', fees: 20000, expenses: 15000 },
        { month: 'November', fees: 15000, expenses: 12000 },
        { month: 'December', fees: 10000, expenses: 8000 },
        { month: 'January', fees: 8000, expenses: 7000 },
        { month: 'February', fees: 5000, expenses: 5000 },
        { month: 'March', fees: 3000, expenses: 3000 },
    ];

    // Income breakdown data
    const incomeData = {
        series: [25, 15, 30, 15, 15],
        labels: ['Donation', 'Rent', 'Miscellaneous', 'Book Sale', 'Uniform Sale']
    };

    // Expense breakdown data
    const expenseData = {
        series: [15, 20, 10, 40, 15],
        labels: ['Stationery Purchase', 'Electricity Bill', 'Telephone Bill', 'Miscellaneous', 'Flower']
    };    
      
    const feeDetails = [
        {
          "title": "Fees Awaiting Payment",
          "count": "12/121",
          "percent": "10%",
          "color": "bg-blue-500"
        },
        {
          "title": "Staff Approved Leave",
          "count": "1/4",
          "percent": "25%",
          "color": "bg-cyan-500"
        },
        {
          "title": "Student Approved Leave",
          "count": "2/10",
          "percent": "20%",
          "color": "bg-blue-500"
        },
        {
            "title": "Converted Leads",
            "count": "2/10",
            "percent": "20%",
            "color": "bg-red-500"
          },
          {
            "title": "Staff Present Today",
            "count": "0/8",
            "percent": "0%",
            "color": "bg-gray-500"
          },
          {
            "title": "Student Present Today",
            "count": "45/121",
            "percent": "37%",
            "color": "bg-green-500"
          }
      ]

    const overviewData = {
        "feesOverview": [
          { "label": "UNPAID", "count": 98, "percentage": 80.99, "color": "bg-blue-500" },
          { "label": "PARTIAL", "count": 11, "percentage": 9.09, "color": "bg-cyan-500" },
          { "label": "PAID", "count": 12, "percentage": 9.92, "color": "bg-cyan-500" }
        ],
        "enquiryOverview": [
          { "label": "ACTIVE", "count": 5, "percentage": 50, "color": "bg-red-500" },
          { "label": "WON", "count": 2, "percentage": 20, "color": "bg-amber-500" },
          { "label": "PASSIVE", "count": 1, "percentage": 10, "color": "bg-amber-500" },
          { "label": "LOST", "count": 1, "percentage": 10, "color": "bg-amber-500" },
          { "label": "DEAD", "count": 1, "percentage": 10, "color": "bg-amber-500" }
        ],
        "libraryOverview": [
          { "label": "DUE FOR RETURN", "count": 35, "percentage": null, "color": "bg-green-500" },
          { "label": "RETURNED", "count": 12, "percentage": null, "color": "bg-green-500" },
          { "label": "ISSUED OUT OF 575", "count": 34, "percentage": 5.91, "color": "bg-green-500" },
          { "label": "AVAILABLE OUT OF 575", "count": 541, "percentage": 94.09, "color": "bg-green-500" }
        ],
        "studentAttendance": [
          { "label": "PRESENT", "count": 8, "percentage": 14.55, "color": "bg-blue-500" },
          { "label": "LATE", "count": 2, "percentage": 3.64, "color": "bg-blue-500" },
          { "label": "ABSENT", "count": 3, "percentage": 5.45, "color": "bg-blue-500" },
          { "label": "HALF DAY", "count": 2, "percentage": 3.64, "color": "bg-blue-500" }
        ]
      }      

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div>
                <FeeStatus feeDetails = {feeDetails} />
            </div>
            <div className="max-w-7xl mx-auto">
                <div className="grid gap-6">
                    {/* Daily Fees & Expenses Chart */}
                    <div className="p-4 rounded-lg shadow bg-blue-50 ">
                        <h2 className="text-lg font-semibold mb-4">Fees Collection & Expenses For May 2025</h2>
                        <div className="h-64 ">
                            <BarChart presentData={dailyData} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4" >
                        {/* Income Distribution Chart */}
                        <div className={`p-4 rounded-lg shadow bg-blue-50`} style={{width: windowWidth * 0.75}}>
                            <h2 className="text-lg font-semibold mb-4">Income - May 2025</h2>
                            <div className="h-64 ">
                                <PieChart presentData={incomeData} />
                            </div>
                        </div>
                        {/* Expense Distribution Chart */}
                        <div className={`p-4 rounded-lg shadow bg-blue-50`} style={{width: windowWidth * 0.75}}>
                            <h2 className="text-lg font-semibold mb-4">Expense - May 2025</h2>
                            <div className="h-64">
                                <PieChart presentData={expenseData} />
                            </div>
                        </div>
                    </div>

                    {/* Session Fees & Expenses Chart */}
                    <div className="bg-blue-50 p-4 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-4">Fees Collection & Expenses For Session 2025-26</h2>
                        <div className="h-64">
                            <LineChart presentData={monthlyData} />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Overview overviewData = {overviewData} />
            </div>
            <div>
                <Periodic/>
            </div>
        </div>
    );
}