"use client";
import { useState } from 'react';
import { Search, ChevronDown, ChevronUp, MapPin, Edit, X, ChevronLeft, ChevronRight, Download, Database, Copy, Printer } from 'lucide-react';
import * as XLSX from 'xlsx';

function AddPickupPoint({ handleAddPickupPoint, onclose }) {
  const [pickupPoint, setPickupPoint] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPickupPoint = {
      pickupPoint,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    };
    handleAddPickupPoint(newPickupPoint);
    onclose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50 px-4">
      <div className="bg-white w-full max-w-md md:max-w-lg p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Add Pickup Point</h3>
          <X
            onClick={onclose}
            className="w-5 h-5 cursor-pointer text-gray-500 hover:text-gray-700"
          />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Point</label>
            <input
              type="text"
              value={pickupPoint}
              onChange={(e) => setPickupPoint(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Enter pickup point"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
            <input
              type="number"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Enter latitude"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
            <input
              type="number"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Enter longitude"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="btn btn-primary bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function EditPickupPoint({ content, onclose, handleEditPickupPoint }) {
  const [pickupPoint, setPickupPoint] = useState(content.name);
  const [latitude, setLatitude] = useState(content.latitude);
  const [longitude, setLongitude] = useState(content.longitude);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPickupPoint = {
      name: pickupPoint,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    };
    handleEditPickupPoint(newPickupPoint);
    onclose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50 px-4">
      <div className="bg-white w-full max-w-md md:max-w-lg p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Edit Pickup Point</h3>
          <X onClick={onclose} className="w-5 h-5 cursor-pointer text-gray-500 hover:text-gray-700" />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Point</label>
            <input
              type="text"
              value={pickupPoint}
              onChange={(e) => setPickupPoint(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Enter pickup point"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
            <input
              type="number"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Enter latitude"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
            <input
              type="number"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Enter longitude"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="btn btn-primary bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


export default function PickupPointList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddPickupPoint, setShowAddPickupPoint] = useState(false);
  const [showEditPickupPoint, setShowEditPickupPoint] = useState(false);
  const [tempIndex, setTempIndex] = useState(0);
  const itemsPerPage = 10;

  // Sample data
  const initialPickupPoints = [
    { id: 1, name: 'Brooklyn North', latitude: 23.2195372069431, longitude: 79.9206839610967 },
    { id: 2, name: 'Brooklyn South', latitude: 23.2047817297381, longitude: 79.8975148672970 },
    { id: 3, name: 'Brooklyn West', latitude: 23.1932417286614, longitude: 79.9153632011368 },
    { id: 4, name: 'Brooklyn East', latitude: 23.1939526719550, longitude: 79.9243812546212 },
    { id: 5, name: 'Brooklyn Central', latitude: 23.2123049495982, longitude: 79.9291413939796 },
    { id: 6, name: 'Manhattan', latitude: 23.2066336875236, longitude: 80.0045104240182 },
    { id: 7, name: 'Railway Station', latitude: 23.1666274948928, longitude: 79.9505409641418 },
    { id: 8, name: 'High Court', latitude: 23.1686155662938, longitude: 79.9472699988700 },
    { id: 9, name: 'Civil Line', latitude: 23.1661200455596, longitude: 79.9553191026069 },
    { id: 10, name: 'Vijay Nagar', latitude: 23.1901703272868, longitude: 79.8964328055997 },
    { id: 11, name: 'Ranital Chowk', latitude: 23.1705045632430, longitude: 79.9238537798304 },
  ];

  const [pickupPoints, setPickupPoints] = useState(initialPickupPoints);

  // Sorting logic
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = () => {
    if (!sortConfig.key) return pickupPoints;
    
    return [...pickupPoints].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  };

  // Filtering by search term
  const filteredData = getSortedData().filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Handlers
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getSortIcon = (columnName) => {
    if (sortConfig.key !== columnName) {
      return <ChevronDown size={14} className="ml-1 opacity-50" />;
    }
    
    return sortConfig.direction === 'ascending' 
      ? <ChevronDown size={14} className="ml-1" /> 
      : <ChevronUp size={14} className="ml-1" />;
  };

  const handleAddPickupPoint = (newPoint) => {
    const newPickupPoint = {
        id: initialPickupPoints.length + 1,
        name: newPoint.pickupPoint,
        latitude: parseFloat(newPoint.latitude),
        longitude: parseFloat(newPoint.longitude)
    };
    setPickupPoints([...pickupPoints, newPickupPoint]);
    setShowAddPickupPoint(false);
  }

  const handleEditPickupPoint = (editedPoint) => {
    setPickupPoints(prev =>
      prev.map((point, index) =>
        index === tempIndex
          ? {
              ...point,
              name: editedPoint.name,
              latitude: editedPoint.latitude,
              longitude: editedPoint.longitude,
            }
          : point
      )
    );
  };  
  
  const handleExcelExport = () => {
      // Step 1: Convert data to worksheet
      const worksheet = XLSX.utils.json_to_sheet(pickupPoints);
    
      // Step 2: Create a new workbook and append the worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Incomes');
    
      // Step 3: Trigger download
      XLSX.writeFile(workbook, 'transport_Pickup_points.xlsx');
    };

    const handleCopy = () => {
        if (!pickupPoints || pickupPoints.length === 0) return;
      
        const jsonText = JSON.stringify(pickupPoints, null, 2);
      
        navigator.clipboard.writeText(jsonText)
          .then(() => {
            alert('JSON data copied to clipboard');
          })
          .catch(err => {
            console.error('Failed to copy JSON: ', err);
          });
      };

      const handlePrint = () => {
        if (!pickupPoints || pickupPoints.length === 0) return;
      
        const headers = Object.keys(pickupPoints[0]);
        let table = '<table border="1" style="border-collapse: collapse; width: 100%"><thead><tr>';
      
        // Headers
        headers.forEach(header => {
          table += `<th style="padding: 8px; text-align: left;">${header}</th>`;
        });
        table += '</tr></thead><tbody>';
      
        // Rows
        pickupPoints.forEach(row => {
          table += '<tr>';
          headers.forEach(header => {
            table += `<td style="padding: 8px;">${row[header] ?? ''}</td>`;
          });
          table += '</tr>';
        });
      
        table += '</tbody></table>';
      
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
          <html>
            <head>
              <title>Transport Pickup Points</title>
            </head>
            <body>
              <h2>Transport Pickups Points</h2>
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
    

  return (
    <div className="bg-white min-h-screen">
  <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6">
    <div className="bg-white rounded-md shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-b gap-4">
        <h1 className="text-lg font-medium text-gray-800">Pickup Point List</h1>
        <button 
          onClick={() => setShowAddPickupPoint(true)}
          className="btn btn-primary bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded flex items-center"
        >
          <span className="font-bold mr-1">+</span> Add
        </button>
      </div>

      {showAddPickupPoint && (
        <AddPickupPoint 
          handleAddPickupPoint={handleAddPickupPoint} 
          onclose={() => setShowAddPickupPoint(false)} 
        />
      )}

      <div className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative lg:w-1/2 md-w-full ">
          <input
            type="text"
            placeholder="Search..."
            className="w-full border rounded-md pl-3 pr-10 py-2 focus:outline-none focus:ring-1 focus:ring-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <button onClick={handleCopy}><Copy className="h-5 w-5" /></button>
          <button onClick={handleExcelExport}><Database className="h-5 w-5" /></button>
          <button onClick={handleExcelExport}><Download className="h-5 w-5" /></button>
          <button onClick={handlePrint}><Printer className="h-5 w-5" /></button>
        </div>
      </div>

      <div className="overflow-x-auto px-4">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              {['name', 'latitude', 'longitude'].map((key) => (
                <th
                  key={key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort(key)}
                >
                  <div className="flex items-center">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                    {getSortIcon(key)}
                  </div>
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((point, index) => (
              <tr key={point.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{point.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{point.latitude}</td>
                <td className="px-6 py-4 whitespace-nowrap">{point.longitude}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-4">
                    <button className="text-gray-600 hover:text-gray-900"><MapPin size={18} /></button>
                    <button 
                      onClick={() => { setShowEditPickupPoint(true); setTempIndex(index); }}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={() => setPickupPoints(pickupPoints.filter(item => item.id !== point.id))}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showEditPickupPoint && (
        <EditPickupPoint 
          content={initialPickupPoints[tempIndex]} 
          handleEditPickupPoint={handleEditPickupPoint} 
          onclose={() => setShowEditPickupPoint(false)} 
        />
      )}

      <div className="px-6 py-4 flex flex-col sm:flex-row justify-between items-center border-t gap-4">
        <div className="text-sm text-gray-700">
          Records: {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length}
        </div>
        <div className="flex items-center space-x-1">
          <button 
            onClick={() => handlePageChange(currentPage - 1)} 
            disabled={currentPage === 1}
            className={`px-2 py-1 border rounded ${currentPage === 1 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <ChevronLeft size={16} />
          </button>
          <div className="px-3 py-1 border rounded text-sm text-gray-600">{currentPage}</div>
          <button 
            onClick={() => handlePageChange(currentPage + 1)} 
            disabled={currentPage === totalPages}
            className={`px-2 py-1 border rounded ${currentPage === totalPages ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

  );
}