import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import ApexCharts with SSR disabled
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

function BarChart({ presentData }) {
  const [chartHeight, setChartHeight] = useState(400);
  const [windowWidth, setWindowWidth] = useState(0);

  // Set initial window width and add resize listener
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      
      // Adjust chart height based on screen width
      if (window.innerWidth <= 480) {
        setChartHeight(280);
      } else if (window.innerWidth <= 768) {
        setChartHeight(320);
      } else if (window.innerWidth <= 1024) {
        setChartHeight(350);
      } else {
        setChartHeight(400);
      }
    };
    
    // Set initial height
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const chartOption = {
    chart: {
      type: 'bar',
      toolbar: { show: false },
      stacked: false,
      fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        }
      },
      background: 'transparent'
    },
    plotOptions: {
      bar: {
        horizontal: windowWidth < 480 ? true : false, // Switch to horizontal on very small screens
        columnWidth: windowWidth < 640 ? '40%' : windowWidth < 1024 ? '50%' : '55%',
        borderRadius: 3,
        dataLabels: {
          position: 'top'
        }
      },
    },
    dataLabels: { 
      enabled: false,
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ["#304758"]
      },
      formatter: function(val) {
        // Return an empty string if the value is less than 10000, else return the value
        return val >= 10000 ? val : '';
      }
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: presentData.map(item => item.day),
      labels: {
        style: { 
          colors: "#616161", 
          fontSize: windowWidth < 640 ? '9px' : windowWidth < 1024 ? '10px' : '12px',
        },
        rotate: windowWidth < 640 ? -45 : 0,
        offsetY: windowWidth < 640 ? 5 : 0,
        trim: true,
        maxHeight: 120
      },
      axisTicks: { show: false },
      axisBorder: { show: false },
    },
    yaxis: {
      labels: {
        style: { 
          colors: "#616161", 
          fontSize: windowWidth < 640 ? '9px' : windowWidth < 1024 ? '10px' : '12px'
        },
        formatter: (value) => {
          // Return an empty string if the value is less than 10000, else return the value
          return value >= 10000 ? value : '';
        }
      }
    },
    fill: { 
      opacity: 0.8,
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: "vertical",
        shadeIntensity: 0.1,
        opacityFrom: 0.9,
        opacityTo: 0.8,
      }
    },
    tooltip: {
      y: {
        formatter: (value) => value >= 10000 ? value : '',
      },
      shared: true,
      intersect: false
    },
    colors: ['#22c55e', '#ef4444'],
    legend: {
      position: windowWidth < 768 ? 'bottom' : 'top',
      horizontalAlign: windowWidth < 768 ? 'center' : 'right',
      fontSize: windowWidth < 640 ? '10px' : '12px',
      itemMargin: {
        horizontal: 10,
        vertical: 5
      }
    },
    grid: {
      show: true,
      borderColor: "#dddddd",
      strokeDashArray: 5,
      padding: { 
        top: 5, 
        right: windowWidth < 640 ? 10 : 20,
        bottom: windowWidth < 640 ? 10 : 0,
        left: windowWidth < 640 ? 10 : 0
      },
      xaxis: { lines: { show: true } },
    },
    responsive: [
      {
        breakpoint: 1366,
        options: {
          plotOptions: {
            bar: { columnWidth: '52%' }
          }
        }
      },
      {
        breakpoint: 1024,
        options: {
          plotOptions: {
            bar: { columnWidth: '50%' }
          }
        }
      },
      {
        breakpoint: 768,
        options: {
          plotOptions: {
            bar: { columnWidth: '45%' }
          }
        }
      },
      {
        breakpoint: 640,
        options: {
          plotOptions: {
            bar: { columnWidth: '40%' }
          }
        }
      },
      {
        breakpoint: 480,
        options: {
          plotOptions: {
            bar: { 
              horizontal: true,
              columnWidth: '65%'
            }
          }
        }
      }
    ]
  };

  const chartSeries = [
    { name: 'Fees', data: presentData.map(item => item.fees) },
    { name: 'Expenses', data: presentData.map(item => item.expenses) }
  ];

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full" style={{ height: `${chartHeight}px` }}>
        {windowWidth > 0 && (
          <Chart 
            options={chartOption}
            series={chartSeries} 
            type="bar" 
            height="80%" 
            width={windowWidth > 620 ? windowWidth * 0.75 : 620}
          />
        )}
      </div>
    </div>
  );
}

export default BarChart;
