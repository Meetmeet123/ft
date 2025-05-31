"use client"
import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Edit, Trash, Menu, Copy, Download, Printer, Book } from 'lucide-react';
import * as XLSX from 'xlsx';

function VehicleDetailsModal({ isOpen, onClose, vehicle }) {
    // Use provided vehicle or default
    const vehicleData = vehicle;
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed w-full inset-0 bg-opacity-50 mt-20 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl mx-4">
          {/* Header with title and close button */}
          <div className="flex justify-between items-center px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-gray-700">Vehicle Details</h2>
            <button 
              onClick={onClose} 
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
  
          {/* Content */}
          <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
              {/* Left column - Vehicle Photo */}
              <div className="flex gap-6 ">
                <h3 className="text-gray-700 font-medium mb-2">Vehicle Photo</h3>
                <div className="border border-gray-300 rounded p-2 mb-6">
                  <img 
                    src={vehicleData.photo} 
                    alt="Vehicle" 
                    className="w-50 h-100 object-cover"
                  />
                </div>
                
                <div>
                  <h3 className="text-gray-700 font-medium mb-2">Note:</h3>
                  <textarea 
                    className="w-full border border-gray-300 rounded p-2 h-24 resize-none" 
                    placeholder="Add notes here..."
                  />
                </div>
              </div>
  
              {/* Middle column */}
              <div>
              <div className="col-span-1">
                <div className="mb-4">
                  <span className="font-medium text-gray-700">Vehicle Number:</span> 
                  <span className="ml-2">{vehicleData.vehicleNumber}</span>
                </div>
                
                <div className="mb-4">
                  <span className="font-medium text-gray-700">Registration Number:</span> 
                  <span className="ml-2">{vehicleData.registrationNumber}</span>
                </div>
                
                <div className="mb-4">
                  <span className="font-medium text-gray-700">Driver Name:</span> 
                  <span className="ml-2">{vehicleData.driverName}</span>
                </div>
              </div>
  
              {/* Right column */}
              <div className="">
                <div className="mb-4">
                  <span className="font-medium text-gray-700">Vehicle Model:</span> 
                  <span className="ml-2">{vehicleData.vehicleModel}</span>
                </div>
                
                <div className="mb-4">
                  <span className="font-medium text-gray-700">Chasis Number:</span> 
                  <span className="ml-2">{vehicleData.chasisNumber}</span>
                </div>
                
                <div className="mb-4">
                  <span className="font-medium text-gray-700">Driver Licence:</span> 
                  <span className="ml-2">{vehicleData.driverLicence}</span>
                </div>
              </div>
              </div>
            </div>
  
            {/* Additional row for other details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="col-span-1">
                <span className="font-medium text-gray-700">Year Made:</span> 
                <span className="ml-2">{vehicleData.yearMade}</span>
              </div>
              
              <div className="col-span-1">
                <span className="font-medium text-gray-700">Max Seating Capacity:</span> 
                <span className="ml-2">{vehicleData.maxSeatingCapacity}</span>
              </div>
              
              <div className="col-span-1">
                <span className="font-medium text-gray-700">Driver Contact:</span> 
                <span className="ml-2">{vehicleData.driverContact}</span>
              </div>
            </div>
          </div>
  
          {/* Footer */}
          <div className="px-6 py-4 border-t flex justify-end">
            <button 
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded mr-2"
            >
              Close
            </button>
            <button 
            onClick={onClose}
              className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  }

  function VehicleEditForm({handleVehicleEdit, content, onClose}) {
    const {
        vehicleNumber,
        vehicleModel,
        yearMade,
        registrationNumber,
        chasisNumber,
        maxSeatingCapacity,
        driverName,
        driverLicence,
        driverContact,
        note,
      } = content;
      
      const [vehicleData, setVehicleData] = useState({
        vehicleNumber: vehicleNumber || '',
        vehicleModel: vehicleModel || '',
        yearMade: yearMade || '',
        registrationNumber: registrationNumber || '',
        chasisNumber: chasisNumber || '',
        maxSeatingCapacity: maxSeatingCapacity || '',
        driverName: driverName || '',
        driverLicence: driverLicence || '',
        driverContact: driverContact || '',
        note: note || '',
      });      
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setVehicleData(prev => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      handleVehicleEdit(vehicleData);
    };
  
    return (
      <div className="fixed inset-0 mt-20 bg-opacity-30 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-md shadow-lg w-full max-w-4xl">
          <div className="flex justify-between items-center border-b p-4">
            <h2 className="text-xl font-medium text-gray-800">Edit Vehicle</h2>
            <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          </div>
          
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Vehicle Number */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Vehicle Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="vehicleNumber"
                  value={vehicleData.vehicleNumber}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              {/* Vehicle Model */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Vehicle Model
                </label>
                <input
                  type="text"
                  name="vehicleModel"
                  value={vehicleData.vehicleModel}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              {/* Year Made */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Year Made
                </label>
                <input
                  type="text"
                  name="yearMade"
                  value={vehicleData.yearMade}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              {/* Registration Number */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Registration Number
                </label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={vehicleData.registrationNumber}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              {/* Chasis Number */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Chasis Number
                </label>
                <input
                  type="text"
                  name="chasisNumber"
                  value={vehicleData.chasisNumber}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              {/* Max Seating Capacity */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Max Seating Capacity
                </label>
                <input
                  type="text"
                  name="maxSeatingCapacity"
                  value={vehicleData.maxSeatingCapacity}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              {/* Driver Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Driver Name
                </label>
                <input
                  type="text"
                  name="driverName"
                  value={vehicleData.driverName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              {/* Driver Licence */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Driver Licence
                </label>
                <input
                  type="text"
                  name="driverLicence"
                  value={vehicleData.driverLicence}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              {/* Driver Contact */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Driver Contact
                </label>
                <input
                  type="text"
                  name="driverContact"
                  value={vehicleData.driverContact}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              {/* Note - Full width */}
              <div className="space-y-2 col-span-1 md:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium text-gray-700">
                  Note
                </label>
                <textarea
                  name="note"
                  value={vehicleData.note}
                  onChange={handleChange}
                  rows="4"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
            </div>
            
            {/* Save Button */}
            <div>
            <div className=" mt-6 flex justify-end">
              <button
                onClick={handleSubmit}
                className="btn btn-primary flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Save
              </button>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function AddVehicleForm({handleAddVehicle, onClose}) {
      
      const [vehicleData, setVehicleData] = useState({
        vehicleNumber: '',
        vehicleModel: '',
        yearMade:'',
        registrationNumber:'',
        chasisNumber:'',
        maxSeatingCapacity:'',
        driverName:'',
        driverLicence: '',
        driverContact:'',
        note: '',
      });      
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setVehicleData(prev => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      handleAddVehicle(vehicleData);
      onClose();
    };
  
    return (
      <div className="fixed inset-0 mt-20 bg-opacity-30 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-md shadow-lg w-full max-w-4xl">
          <div className="flex justify-between items-center border-b p-4">
            <h2 className="text-xl font-medium text-gray-800">Edit Vehicle</h2>
            <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          </div>
          
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Vehicle Number */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Vehicle Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="vehicleNumber"
                  value={vehicleData.vehicleNumber}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              {/* Vehicle Model */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Vehicle Model
                </label>
                <input
                  type="text"
                  name="vehicleModel"
                  value={vehicleData.vehicleModel}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              {/* Year Made */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Year Made
                </label>
                <input
                  type="text"
                  name="yearMade"
                  value={vehicleData.yearMade}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              {/* Registration Number */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Registration Number
                </label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={vehicleData.registrationNumber}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              {/* Chasis Number */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Chasis Number
                </label>
                <input
                  type="text"
                  name="chasisNumber"
                  value={vehicleData.chasisNumber}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              {/* Max Seating Capacity */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Max Seating Capacity
                </label>
                <input
                  type="text"
                  name="maxSeatingCapacity"
                  value={vehicleData.maxSeatingCapacity}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              {/* Driver Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Driver Name
                </label>
                <input
                  type="text"
                  name="driverName"
                  value={vehicleData.driverName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              {/* Driver Licence */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Driver Licence
                </label>
                <input
                  type="text"
                  name="driverLicence"
                  value={vehicleData.driverLicence}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              {/* Driver Contact */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Driver Contact
                </label>
                <input
                  type="text"
                  name="driverContact"
                  value={vehicleData.driverContact}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              {/* Note - Full width */}
              <div className="space-y-2 col-span-1 md:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium text-gray-700">
                  Note
                </label>
                <textarea
                  name="note"
                  value={vehicleData.note}
                  onChange={handleChange}
                  rows="4"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
            </div>
            
            {/* Save Button */}
            <div>
            <div className=" mt-6 flex justify-end">
              <button
                onClick={handleSubmit}
                className="btn btn-primary flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Save
              </button>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  

export default function VehicleList() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(0);
    const [showVehicleEditForm, setShowVehicleEditForm] = useState(false);
    const [showAddVehicleForm, setShowAddVehicleForm] = useState(false);

  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      vehicleNumber: 'VH4584',
      vehicleModel: 'Ford CAB',
      yearMade: 2015,
      registrationNumber: 'FFG-76575676787',
      chasisNumber: '523422',
      maxSeatingCapacity: 50,
      driverName: 'Jasper',
      driverLicence: '258714545',
      driverContact: '8521479630',
      photo: 'https://demo.smart-school.in//uploads/vehicle_photo/1677502339-191558462463fca783b26b0!fd.png?1746609868'
    },
    {
      id: 2,
      vehicleNumber: 'VH5645',
      vehicleModel: 'Volvo Bus',
      yearMade: 2018,
      registrationNumber: 'BGBFDF787987956',
      chasisNumber: '45433',
      maxSeatingCapacity: 50,
      driverName: 'Maximus',
      driverLicence: '5456456667676',
      driverContact: '885456456',
      photo: 'https://demo.smart-school.in//uploads/vehicle_photo/1677502339-191558462463fca783b26b0!fd.png?1746609868'
    },
    {
      id: 3,
      vehicleNumber: 'VH1001',
      vehicleModel: 'Volvo Bus',
      yearMade: 2017,
      registrationNumber: 'FVFF-08797865',
      chasisNumber: '45453',
      maxSeatingCapacity: 50,
      driverName: 'Michel',
      driverLicence: 'R534534',
      driverContact: '8667777869',
      photo: 'https://demo.smart-school.in//uploads/vehicle_photo/1677502339-191558462463fca783b26b0!fd.png?1746609868'
    }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = vehicles.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(vehicles.length / recordsPerPage);

  const handleExcelExport = () => {
    // Step 1: Convert data to worksheet
    const worksheet = XLSX.utils.json_to_sheet(vehicles);
  
    // Step 2: Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Incomes');
  
    // Step 3: Trigger download
    XLSX.writeFile(workbook, 'Vehicle_List.xlsx');
  };

  const handlePrint = () => {
    if (!vehicles || vehicles.length === 0) return;
  
    const headers = Object.keys(vehicles[0]);
    let table = '<table border="1" style="border-collapse: collapse; width: 100%"><thead><tr>';
  
    // Headers
    headers.forEach(header => {
      table += `<th style="padding: 8px; text-align: left;">${header}</th>`;
    });
    table += '</tr></thead><tbody>';
  
    // Rows
    vehicles.forEach(row => {
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
          <title>Vehicle List</title>
        </head>
        <body>
          <h2>Vehicle List</h2>
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
    if (!vehicles || vehicles.length === 0) return;
  
    const jsonText = JSON.stringify(vehicles, null, 2);
  
    navigator.clipboard.writeText(jsonText)
      .then(() => {
        alert('JSON data copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy JSON: ', err);
      });
  };

  const handleVehicleEdit = (newVehicle) => {
    const tempData = [...vehicles]; // create a shallow copy to avoid mutating state directly
    const newTemp = {id:vehicles.length+1, ...newVehicle}
    tempData[selectedVehicle] = newTemp;
    setVehicles(tempData);
    setShowVehicleEditForm(false);
  };

  const handleAddVehicle = (newVehicle) => {
    const tempData = [...vehicles]; 
    const newTemp = {id:vehicles.length+1, ...newVehicle}
    tempData.push(newTemp);
    setVehicles(tempData);
  }

  const [showGridTab, setShowGridTab] = useState(false);
  const headings = [
    "VehicleNumber",
    "VehicleModel",
    "YearMade",
    "RegistrationNumber",
    "ChasisNumber",
    "MaxSeatingCapacity",
    "DriverName",
    "DriverLicence",
    "DriverContact",
    "Action"
  ];
  const [gridTab,setGridTab] = useState(Array(headings.length).fill(true));

  return (
    <div className="flex flex-col w-full p-4 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-700">Vehicle List</h1>
        <button 
        onClick={() => setShowAddVehicleForm(true)}
        className="btn btn-primary bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded flex items-center gap-1">
          <span>+</span> Add
        </button>
      </div>

      <div className='flex justify-between items-center w-full' >
        <div className="mb-4 relative w-1/3">
            <input
            type="text"
            placeholder="Search..."
            className="w-full md:w-64 p-2 border border-gray-300 rounded"
            />
        </div>

        <div className="flex justify-end mb-2 gap-2">
            <button className="p-1 hover:bg-gray-200 rounded">
            <Copy 
            onClick={handleCopy}
            size={20} className="text-gray-600" />
            </button>

            <button className="p-1 hover:bg-gray-200 rounded">
            <Download 
            onClick={handleExcelExport}
            size={20} className="text-gray-600" />
            </button>

            <button 
            onClick={handlePrint}
            className="p-1 hover:bg-gray-200 rounded">
            <Printer size={20} className="text-gray-600" />
            </button>

            <button 
            onClick={()=>setShowGridTab(!showGridTab)}
            className="p-1 hover:bg-gray-200 rounded"
            >
            <Book size={20} className="text-gray-600" />
            </button>
        </div>
      </div>

      {showGridTab && <div className="flex w-full gap-2 my-5">
        {headings.map((heading, index) => (
          <button 
          key={index} 
          className={`btn ${gridTab[index] ? 'btn-primary' : 'btn-danger'} `}
          onClick={() => {
            const updatedGridTab = [...gridTab];
            updatedGridTab[index] = !updatedGridTab[index];
            setGridTab(updatedGridTab);
          }}
          >
            {heading}
          </button>
        ))}
      </div>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
                {
                    headings.map((heading, index) => (
                        (gridTab[index]) &&
                        <th key={index} 
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600 border-b">
                            {heading}
                        </th>
                    ))
                }
            </tr>
          </thead>
          <tbody>
            {records.map((vehicle,index) => (
              <tr key={vehicle.id} className="hover:bg-gray-50">
                {gridTab[0] && <td className="px-4 py-3 text-sm text-gray-700 border-b">{vehicle.vehicleNumber}</td>}
                {gridTab[1] && <td className="px-4 py-3 text-sm text-gray-700 border-b">{vehicle.vehicleModel}</td>}
                {gridTab[2] && <td className="px-4 py-3 text-sm text-gray-700 border-b">{vehicle.yearMade}</td>}
                {gridTab[3] && <td className="px-4 py-3 text-sm text-gray-700 border-b">{vehicle.registrationNumber}</td>}
                {gridTab[4] && <td className="px-4 py-3 text-sm text-gray-700 border-b">{vehicle.chasisNumber}</td>}
                {gridTab[5] && <td className="px-4 py-3 text-sm text-gray-700 border-b">{vehicle.maxSeatingCapacity}</td>}
                {gridTab[6] && <td className="px-4 py-3 text-sm text-gray-700 border-b">{vehicle.driverName}</td>}
                {gridTab[7] && <td className="px-4 py-3 text-sm text-gray-700 border-b">{vehicle.driverLicence}</td>}
                {gridTab[8] && <td className="px-4 py-3 text-sm text-gray-700 border-b">{vehicle.driverContact}</td>}
                {gridTab[9] && <td className="px-4 py-3 text-sm text-gray-700 border-b flex justify-center gap-2">
                  <button 
                  onClick={() => {
                    setIsModalOpen(true)
                    setSelectedVehicle(index)
                }}
                  className="p-1 hover:bg-gray-200 rounded">
                    <Menu size={18} className="text-gray-500" />
                  </button>
                  <button 
                  onClick={() => setShowVehicleEditForm(true)}
                  className="p-1 hover:bg-gray-200 rounded">
                    <Edit size={18} className="text-gray-500" />
                  </button>
                  <button 
                  onClick={() => {
                    const updatedVehicles = vehicles.filter((_, i) => i !== index);
                    setVehicles(updatedVehicles);
                  }}
                  className="p-1 hover:bg-gray-200 rounded">
                    <Trash size={18} className="text-gray-500" />
                  </button>
                </td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <VehicleDetailsModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          vehicle={vehicles[selectedVehicle]} 
        />
      )}

      {showVehicleEditForm && (
        <VehicleEditForm 
            handleVehicleEdit={handleVehicleEdit} 
            content={vehicles[selectedVehicle]} 
            onClose={() => setShowVehicleEditForm(false)}
        />)
        }

      {showAddVehicleForm && 
        <AddVehicleForm 
        handleAddVehicle={handleAddVehicle}
        onClose={() => setShowAddVehicleForm(false)}
        />
      }

      {/* Pagination */}

      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <div>Records: {firstIndex + 1} to {Math.min(lastIndex, vehicles.length)} of {vehicles.length}</div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`p-1 rounded ${currentPage === 1 ? 'text-gray-300' : 'hover:bg-gray-200 text-gray-600'}`}
          >
            <ChevronLeft size={20} />
          </button>
          <span className="px-3 py-1 bg-white border border-gray-300 rounded">{currentPage}</span>
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`p-1 rounded ${currentPage === totalPages ? 'text-gray-300' : 'hover:bg-gray-200 text-gray-600'}`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}