"use client";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

function PieChart({ presentData }) {

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

  const chartOption = {
    chart: {
      type: 'donut',
      width: '100%',
    },
    labels: presentData.labels,
    colors: ['#22c55e', '#eab308', '#14b8a6', '#9ca3af', '#b45309'],
    legend: {
      position: 'bottom',
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          labels: {
            show: true,
            name: { show: true },
            value: {
              show: true,
              formatter: (val) => `${val}%`,
            },
            total: {
              show: true,
              label: 'Total',
              formatter: () => '100%',
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            width: '100%',
          },
          legend: {
            position: 'bottom',
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: '100%',
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  return (
    <div className={`h-full lg:w-full md:w-1/11 sm:w-full`}>
      <Chart
        options={chartOption}
        series={presentData.series}
        type="donut"
        height='100%'
        width={windowWidth * 0.7} // Adjust the width based on window size
      />
    </div>
  );
}

export default PieChart;
