"use client";
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Check, Printer, Table, FileText, Download, PenLine, Trash2, MoreVertical } from 'lucide-react';
import * as XLSX from 'xlsx';

export default function RoutePickupTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditable, setIsEditable] = useState(false);
  const [editIndex, setEditIndex] = useState(0);
  const [editParentIndex, setEditParentIndex] = useState(0);
  const [showGrid, setShowGrid] = useState(false);
  const headers = ["Route", "PickupPoint", "MonthlyFees", "Distance", "PickupTime", "Action"];
  const [selectedContent,setSelectedContent] = useState(Array(headers.length).fill(true));
  
  // Sample data matching the image
  const [routeData,setRoutes] = useState([
    {
      route: "Brooklyn Central",
      pickupPoints: [
        { id: 1, location: "Brooklyn North", fee: 50.00, distance: 20.0, time: "9:00 AM" },
        { id: 2, location: "Brooklyn South", fee: 60.00, distance: 15.0, time: "9:30 AM" },
        { id: 3, location: "Brooklyn West", fee: 50.00, distance: 25.0, time: "10:15 AM" },
        { id: 4, location: "Brooklyn East", fee: 50.00, distance: 10.0, time: "10:45 AM" }
      ]
    },
    {
      route: "Brooklyn East",
      pickupPoints: [
        { id: 1, location: "Brooklyn North", fee: 50.00, distance: 20.0, time: "11:30 AM" },
        { id: 2, location: "Brooklyn Central", fee: 50.00, distance: 25.0, time: "12:30 PM" },
        { id: 3, location: "Brooklyn South", fee: 100.00, distance: 15.0, time: "2:30 PM" },
        { id: 4, location: "Ranital Chowk", fee: 100.00, distance: 20.0, time: "3:00 PM" }
      ]
    },
    {
      route: "Brooklyn South",
      pickupPoints: [
        { id: 1, location: "Brooklyn North", fee: 50.00, distance: 20.0, time: "10:30 AM" },
        { id: 2, location: "High Court", fee: 100.00, distance: 10.0, time: "11:00 AM" },
        { id: 3, location: "Railway Station", fee: 50.00, distance: 15.0, time: "11:45 AM" },
        { id: 4, location: "Brooklyn West", fee: 50.00, distance: 20.0, time: "12:30 PM" }
      ]
    },
    {
      route: "Brooklyn North",
      pickupPoints: [
        { id: 1, location: "Brooklyn West", fee: 50.00, distance: 20.0, time: "10:00 AM" },
        { id: 2, location: "Brooklyn East", fee: 50.00, distance: 20.0, time: "10:30 AM" },
        { id: 3, location: "Brooklyn South", fee: 100.00, distance: 15.0, time: "11:30 AM" },
        { id: 4, location: "Brooklyn Central", fee: 100.00, distance: 25.0, time: "12:15 PM" }
      ]
    },
    {
      route: "Brooklyn West",
      pickupPoints: [
        { id: 1, location: "Brooklyn North", fee: 100.00, distance: 20.0, time: "11:00 AM" },
        { id: 2, location: "Brooklyn West", fee: 50.00, distance: 10.0, time: "11:30 AM" },
        { id: 3, location: "Brooklyn South", fee: 100.00, distance: 20.0, time: "12:15 PM" },
        { id: 4, location: "Brooklyn Central", fee: 100.00, distance: 25.0, time: "12:45 PM" }
      ]
    }
  ]);

  const totalPages = Math.ceil(routeData.length / 5);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };


const downloadExcel = () => {
  const excelData = [];

  routeData.forEach(route => {
    route.pickupPoints.forEach(point => {
      excelData.push({
        Route: route.route,
        Location: point.location,
        Fee: point.fee,
        Distance: point.distance,
        Time: point.time,
      });
    });
  });

  const worksheet = XLSX.utils.json_to_sheet(excelData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Routes");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "routes_pickup_point.xlsx";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const handlePrint = () => {
    if (!routeData || routeData.length === 0) return;
  
    let table = '<table border="1" style="border-collapse: collapse; width: 100%;">';
    table += `
      <thead>
        <tr>
          <th style="padding: 8px; text-align: left;">Route</th>
          <th style="padding: 8px; text-align: left;">Pickup ID</th>
          <th style="padding: 8px; text-align: left;">Location</th>
          <th style="padding: 8px; text-align: left;">Fee</th>
          <th style="padding: 8px; text-align: left;">Distance</th>
          <th style="padding: 8px; text-align: left;">Time</th>
        </tr>
      </thead>
      <tbody>
    `;
  
    routeData.forEach(route => {
      route.pickupPoints.forEach((point, index) => {
        table += '<tr>';
        if (index === 0) {
          table += `<td rowspan="${route.pickupPoints.length}" style="padding: 8px; vertical-align: top;">${route.route}</td>`;
        }
        table += `
          <td style="padding: 8px;">${point.id}</td>
          <td style="padding: 8px;">${point.location}</td>
          <td style="padding: 8px;">${point.fee.toFixed(2)}</td>
          <td style="padding: 8px;">${point.distance.toFixed(1)} km</td>
          <td style="padding: 8px;">${point.time}</td>
        `;
        table += '</tr>';
      });
    });
  
    table += '</tbody></table>';
  
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Routes</title>
        </head>
        <body>
          <h2>Transport Route Details</h2>
          ${table}
          <script>
            window.onload = function () {
              window.print();
              window.onafterprint = function () {
                window.close();
              };
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleCopy = () => {
    if (!routeData || routeData.length === 0) return;
  
    const jsonText = JSON.stringify(routeData, null, 2);
  
    navigator.clipboard.writeText(jsonText)
      .then(() => {
        alert('JSON data copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy JSON: ', err);
      });
  };


  return (
    <div className="w-full bg-white rounded-md shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h1 className="text-xl font-medium text-gray-700">Route Pickup Point</h1>
      </div>

      {/* Search and Tools */}
      <div className="p-4 flex flex-col md:flex-row justify-between">
        <div className="relative mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Search..."
            className="pl-3 pr-10 py-2 border rounded-md w-full md:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex space-x-2 gap-3">
          <button 
          onClick={() => setShowGrid(!showGrid)}
          >
            <Table size={18} className="text-gray-600" />
          </button>
          <button 
          onClick={downloadExcel}
          >
            <Download size={18} className="text-gray-600" />
          </button>

          <button
          onClick={handleCopy}
          >
            <FileText size={18} className="text-gray-600" />
          </button>

          <button
          onClick={handlePrint}
          >
            <Printer size={18} className="text-gray-600" />
          </button>
        </div>
      </div>

      {
        showGrid && (
          <div className="flex flex-wrap gap-2 p-4 border-b">
            {headers.map((header, index) => (
                <button key={index} 
                className={`px-3 py-1 text-sm border rounded focus:border-2 ${selectedContent[index] ? 'btn-primary' : 'btn-danger' } `}
                onClick={() => {
                  const updated = [...selectedContent];
                    updated[index] = !updated[index];
                    setSelectedContent(updated);
                }}>
                {header}
              </button>
            ))}
          </div>
        )
      }

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
                {
                    headers.map((header, index) => (
                      selectedContent[index] && (
                        <th key={index} className="text-left py-3 px-4 font-medium text-gray-600">{header}</th>
                      )
                    ))
                }
            </tr>
          </thead>
          <tbody>
            {routeData.map((route, index) => (
              route.pickupPoints.map((point, pointIndex) => (
                <tr key={`${index}-${pointIndex}`} className="border-b hover:bg-gray-50">
                  {selectedContent[0] && (pointIndex === 0 ? (
                    <td 
                      className="py-3 px-4 align-top" 
                      rowSpan={route.pickupPoints.length}
                    >
                      {route.route}
                    </td>
                  ) : null)}

                  {selectedContent[1] && ((isEditable && editIndex===pointIndex && editParentIndex===index) ? 
                  <td>
                    <input 
                    value={point.location}
                    onChange={(e) => {
                      const updatedRoutes = [...routeData];
                      updatedRoutes[index].pickupPoints[pointIndex].location = e.target.value;
                      setRoutes(updatedRoutes);
                    }}
                    type='text' />
                  </td> : 
                  <td className="py-3 px-4">
                    {point.id} {point.location}
                  </td>)}

                  {selectedContent[2] && ((isEditable && editIndex===pointIndex && editParentIndex===index) ? 
                    <td>
                        <input 
                        onChange={(e) => {
                          const updatedRoutes = [...routeData];
                          updatedRoutes[index].pickupPoints[pointIndex].fee = (e.target.value) ? parseFloat(e.target.value) : 0;
                          setRoutes(updatedRoutes);
                        }}
                        value={point.fee}
                        type='number' />
                    </td> : 
                    <td className="py-3 px-4">{point.fee.toFixed(2)}</td>)}

                  {selectedContent[3] && ((isEditable && editIndex===pointIndex && editParentIndex===index) ? 
                    <td>
                        <input 
                        type='number'
                        onChange={(e) => {
                          const updatedRoutes = [...routeData];
                          updatedRoutes[index].pickupPoints[pointIndex].distance = (e.target.value) ? parseFloat(e.target.value) : 0;
                          setRoutes(updatedRoutes);
                        }
                        }
                        value={point.distance}
                        />
                    </td> : 
                    <td className="py-3 px-4">{point.distance.toFixed(1)}</td>)}

                  {selectedContent[4] && ((isEditable && editIndex===pointIndex && editParentIndex===index) ? 
                    <td>
                        <input 
                        type='text'
                        onChange={(e) => {
                          const updatedRoutes = [...routeData];
                          updatedRoutes[index].pickupPoints[pointIndex].time = e.target.value;
                          setRoutes(updatedRoutes);
                        }}
                        value={point.time}
                        />
                    </td> : 
                    <td className="py-3 px-4">{point.time}</td>)
                    }

                  {selectedContent[5] && <td className="py-3 px-4">
                    <div className="flex justify-center gap-3 space-x-2">
                      <button   
                      onClick={() => {
                        setIsEditable(!isEditable);
                        setEditIndex(pointIndex);
                        setEditParentIndex(index);
                    }}
                      className="text-blue-600 hover:text-blue-800">
                        {(isEditable && editIndex===pointIndex && editParentIndex===index) ? 
                        <Check size={18} /> : 
                        <PenLine size={18} />  
                        }
                      </button>

                      <button 
                      onClick={()=>{
                        const updatedRoutes = [...routeData];
                        updatedRoutes[index].pickupPoints.splice(pointIndex, 1);
                        setRoutes(updatedRoutes);
                        setIsEditable(false);
                      }}
                      className="text-red-600 hover:text-red-800">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>}
                </tr>
              ))
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between p-4 border-t">
        <div className="text-sm text-gray-600">
          Records: 1 to 5 of 5
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`p-1 rounded-md ${currentPage === 1 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <ChevronLeft size={20} />
          </button>
          <span className="px-3 py-1 border rounded-md bg-gray-100">{currentPage}</span>
          <button 
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`p-1 rounded-md ${currentPage === totalPages ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}