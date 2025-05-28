"use client";
import dynamic from "next/dynamic";
import React from "react";
import { useState, useEffect } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

function LineChart({ presentData }) {

  const [windowWidth, setWindowWidth] = useState(0);

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

  const chartOptions = {
    chart: {
      type: 'area',
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    dataLabels: { enabled: false },
    stroke: {
      curve: 'smooth',
      width: [3, 2],
    },
    xaxis: {
      categories: presentData.map(item => item.month),
      labels: {
        style: { colors: "#616161", fontSize: "12px" }
      },
      axisTicks: { show: false },
      axisBorder: { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: "#616161", fontSize: "12px" },
        formatter: (value) => {
          if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
          if (value >= 1000) return (value / 1000).toFixed(0) + 'K';
          return value;
        }
      }
    },
    colors: ['#22c55e', '#ef4444'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
      }
    },
    tooltip: {
      y: {
        formatter: (value) => value.toLocaleString()
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
    },
    grid: {
      borderColor: "#dddddd",
      strokeDashArray: 5,
      padding: { top: 5, right: 20 },
      xaxis: { lines: { show: true } },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: { height: 300 },
          legend: { position: 'bottom', horizontalAlign: 'center' },
        }
      },
      {
        breakpoint: 768,
        options: {
          chart: { height: 250 },
          legend: { position: 'bottom', horizontalAlign: 'center' },
        }
      },
      {
        breakpoint: 480,
        options: {
          chart: { height: 220 },
          xaxis: {
            labels: { rotate: -45, style: { fontSize: "10px" } },
          },
        }
      }
    ]
  };

  const chartSeries = [
    {
      name: 'Fees',
      data: presentData.map(item => item.fees),
    },
    {
      name: 'Expenses',
      data: presentData.map(item => item.expenses),
    },
  ];

  return (
    <div className="w-full h-full">
      <Chart options={chartOptions} 
      series={chartSeries} 
      type="area" 
      height="80%" 
      width={windowWidth*0.7}
      />
    </div>
  );
}

export default LineChart;
