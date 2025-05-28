"use client";
import { useEffect, useState } from 'react';
import { Search, Database, Download, Copy, Printer, Tag, X } from 'lucide-react';
import class1Data from './Class1Data';
import class2Data from './Class2Data';
import class3Data from './Class3Data';
import class4Data from './Class4Data';
import class5Data from './Class5Data';
import * as XLSX from 'xlsx';

function StudentTransportFeeForm({onclose}) {
  const [studentData, setStudentData] = useState({
    name: "Ashwani Kumar",
    fatherName: "Arjun Kumar",
    mobileNumber: "980678463",
    pickup: "Brooklyn North",
    fees: "50.00",
    classSection: "Class 1 (A)",
    admissionNo: "120020",
    rollNumber: "100020",
    pickupTime: "09.00.00",
    distance: "20.0"
  });

  const [selectedMonths, setSelectedMonths] = useState({
    April: true,
    May: true,
    June: true,
    July: true,
    August: true,
    September: true,
    October: true,
    November: true,
    December: true,
    January: true,
    February: true,
    March: true
  });

  const feeSchedule = [
    { month: "April", dueDate: "04/05/2025", fineType: "Percentage", amount: "10.00%" },
    { month: "May", dueDate: "05/05/2025", fineType: "Fix", amount: "50.00 $" },
    { month: "June", dueDate: "06/05/2025", fineType: "Fix", amount: "50.00 $" },
    { month: "July", dueDate: "07/05/2025", fineType: "Percentage", amount: "20.00%" },
    { month: "August", dueDate: "08/05/2025", fineType: "Percentage", amount: "10.00%" },
    { month: "September", dueDate: "09/05/2025", fineType: "Percentage", amount: "15.00%" },
    { month: "October", dueDate: "10/05/2025", fineType: "Fix", amount: "50.00 $" },
    { month: "November", dueDate: "11/05/2025", fineType: "Fix", amount: "20.00 $" },
    { month: "December", dueDate: "12/05/2025", fineType: "Fix", amount: "20.00 $" },
    { month: "January", dueDate: "01/05/2026", fineType: "Percentage", amount: "10.00%" },
    { month: "February", dueDate: "02/05/2026", fineType: "Percentage", amount: "10.00%" },
    { month: "March", dueDate: "03/05/2026", fineType: "Fix", amount: "50.00 $" }
  ];

  const handleMonthToggle = (month) => {
    setSelectedMonths({
      ...selectedMonths,
      [month]: !selectedMonths[month]
    });
  };

  const handleSave = () => {
    // Handle save functionality
    alert("Form data saved!");
  };

  return (
    <section className="fixed top-20 w-3/4 bg-white shadow-md rounded-lg overflow-auto my-8 overflow-y-auto max-h-[80vh]">
  {/* Student details section */}
  <div className='w-full flex justify-end' >
    <X onClick={onclose} />
  </div>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border-b">
    <div className="space-y-4">
      <div className="grid grid-cols-2 items-center">
        <label className="text-gray-600 font-medium">Name</label>
        <div className="text-gray-800">{studentData.name}</div>
      </div>
      <div className="grid grid-cols-2 items-center">
        <label className="text-gray-600 font-medium">Father Name</label>
        <div className="text-gray-800">{studentData.fatherName}</div>
      </div>
      <div className="grid grid-cols-2 items-center">
        <label className="text-gray-600 font-medium">Mobile Number</label>
        <div className="text-gray-800">{studentData.mobileNumber}</div>
      </div>
      <div className="grid grid-cols-2 items-center">
        <label className="text-gray-600 font-medium">Pickup</label>
        <div className="text-gray-800">{studentData.pickup}</div>
      </div>
      <div className="grid grid-cols-2 items-center">
        <label className="text-gray-600 font-medium">Fees ($)</label>
        <div className="text-gray-800">{studentData.fees}</div>
      </div>
    </div>

    <div className="space-y-4">
      <div className="grid grid-cols-2 items-center">
        <label className="text-gray-600 font-medium">Class (Section)</label>
        <div className="text-gray-800">{studentData.classSection}</div>
      </div>
      <div className="grid grid-cols-2 items-center">
        <label className="text-gray-600 font-medium">Admission No</label>
        <div className="text-gray-800">{studentData.admissionNo}</div>
      </div>
      <div className="grid grid-cols-2 items-center">
        <label className="text-gray-600 font-medium">Roll Number</label>
        <div className="text-gray-800">{studentData.rollNumber}</div>
      </div>
      <div className="grid grid-cols-2 items-center">
        <label className="text-gray-600 font-medium">Pickup Time</label>
        <div className="text-gray-800">{studentData.pickupTime}</div>
      </div>
      <div className="grid grid-cols-2 items-center">
        <label className="text-gray-600 font-medium">Distance (km)</label>
        <div className="text-gray-800">{studentData.distance}</div>
      </div>
    </div>
  </div>

  {/* Fee schedule table */}
  <div className="overflow-x-auto">
    <table className="min-w-full">
      <thead className="bg-gray-50">
        <tr>
          <th className="py-3 px-4 text-left text-gray-600 font-medium">Month</th>
          <th className="py-3 px-4 text-left text-gray-600 font-medium">Due Date</th>
          <th className="py-3 px-4 text-left text-gray-600 font-medium">Fine Type</th>
          <th className="py-3 px-4 text-left text-gray-600 font-medium">Amount</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {feeSchedule.map((fee) => (
          <tr key={fee.month} className="hover:bg-gray-50">
            <td className="py-3 px-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedMonths[fee.month]}
                  onChange={() => handleMonthToggle(fee.month)}
                  className="h-4 w-4 text-blue-600 rounded mr-2"
                />
                <span>{fee.month}</span>
              </div>
            </td>
            <td className="py-3 px-4">{fee.dueDate}</td>
            <td className="py-3 px-4">{fee.fineType}</td>
            <td className="py-3 px-4">{fee.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Save button */}
  <div className="flex justify-end p-4">
    <button
      onClick={handleSave}
      className="btn btn-primary px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
    >
      Save
    </button>
  </div>
</section>

  );
};


export default function StudentTransport() {
  const [className, setClassName] = useState('');
  const [section, setSection] = useState('');
  const [students, setStudents] = useState([]);
  const [displayedStudents, setDisplayedStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showContent, setShowContent] = useState(false);
  const [balance, setBalance] = useState([]);
  const [showTransportFeeForm, setShowTransportFeeForm] = useState(false);

  // Function to handle search and filter students based on selected criteria
  function handleSearch() {
    let selectedData = [];

    setShowContent(true);

    switch (className) {
      case 'Class 1':
        selectedData = class1Data;
        break;
      case 'Class 2':
        selectedData = class2Data;
        break;
      case 'Class 3':
        selectedData = class3Data;
        break;
      case 'Class 4':
        selectedData = class4Data;
        break;
      case 'Class 5':
        selectedData = class5Data;
        break;
      default:
        selectedData = [];
    }

    // Filter based on section
    let filtered = selectedData;

    if (section && section !== 'Select') {
      filtered = filtered.filter(student => {
        const match = student.class.match(/\(([^)]+)\)/); // extract section from "Class 2(A)"
        const studentSection = match ? match[1] : '';
        return studentSection === section;
      });
    }

    setStudents(filtered);
    setDisplayedStudents(filtered);
    setBalance(filtered.map(() => 0)); // Initialize balance state (you can adjust this if you want to load specific balances)
  }

  // Search functionality based on user query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setDisplayedStudents(students);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filteredStudents = students.filter(student =>
      student.studentName?.toLowerCase().includes(query) ||
      student.admissionNo?.toString().includes(query) ||
      student.class?.toLowerCase().includes(query) ||
      student.fatherName?.toLowerCase().includes(query) ||
      student.dob?.toLowerCase().includes(query) ||
      student.routeTitle?.toLowerCase().includes(query) ||
      student.vehicleNumber?.toLowerCase().includes(query) ||
      student.pickupPoint?.toLowerCase().includes(query)
    );

    setDisplayedStudents(filteredStudents);
  }, [searchQuery, students]);

  const handleExcelExport = () => {
    // Step 1: Convert data to worksheet
    const worksheet = XLSX.utils.json_to_sheet(displayedStudents);
  
    // Step 2: Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Incomes');
  
    // Step 3: Trigger download
    XLSX.writeFile(workbook, 'transport_Pickup_points.xlsx');
  };

  const handleCopy = () => {
    if (!displayedStudents || displayedStudents.length === 0) return;
  
    const jsonText = JSON.stringify(displayedStudents, null, 2);
  
    navigator.clipboard.writeText(jsonText)
      .then(() => {
        alert('JSON data copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy JSON: ', err);
      });
  };

  const handlePrint = () => {
    if (!displayedStudents || displayedStudents.length === 0) return;
  
    const headers = Object.keys(displayedStudents[0]);
    let table = '<table border="1" style="border-collapse: collapse; width: 100%"><thead><tr>';
  
    // Headers
    headers.forEach(header => {
      table += `<th style="padding: 8px; text-align: left;">${header}</th>`;
    });
    table += '</tr></thead><tbody>';
  
    // Rows
    displayedStudents.forEach(row => {
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
          <title>Student Pickup points</title>
        </head>
        <body>
          <h2>Student Pickup points</h2>
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
    <div className="bg-gray-50 p-4 w-full min-h-screen">
  <div className="max-w-7xl mx-auto bg-white rounded-md shadow-sm">
    <div className="p-4 sm:p-6">
      <h2 className="text-xl font-medium text-gray-700 mb-6">Select Criteria</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Class <span className="text-red-500">*</span>
          </label>
          <select
            onChange={(e) => setClassName(e.target.value)}
            value={className}
            className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Select</option>
            <option>Class 1</option>
            <option>Class 2</option>
            <option>Class 3</option>
            <option>Class 4</option>
            <option>Class 5</option>
          </select>
          {(showContent && className === "") && (
            <p className="text-red-600">Fill this class field</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Section <span className="text-red-500">*</span>
          </label>
          <select
            onChange={(e) => setSection(e.target.value)}
            value={section}
            className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Select</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
            <option>D</option>
          </select>
          {(showContent && section === "") && (
            <p className="text-red-600">Fill this section field</p>
          )}
          <div className="flex justify-end sm:justify-start mt-4">
            <button
              onClick={handleSearch}
              className="flex items-center gap-2 bg-blue-600 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm"
            >
              <Search className="w-4 h-4" />
              Search
            </button>
          </div>
        </div>
      </div>

      {(showContent && className && section) && (
        <div>
          <div className="border-b border-gray-200 mb-4 flex flex-col sm:flex-row justify-between">
            <h3 className="text-xl font-medium text-gray-800 mb-2 sm:mb-0">Student Transport Fees</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search in results..."
            />
            <div className="flex justify-end gap-2 items-center">
              <button onClick={handleExcelExport} className="text-gray-600 hover:text-gray-800 p-1">
                <Database className="w-5 h-5" />
              </button>
              <button onClick={handleExcelExport} className="text-gray-600 hover:text-gray-800 p-1">
                <Download className="w-5 h-5" />
              </button>
              <button onClick={handleCopy} className="text-gray-600 hover:text-gray-800 p-1">
                <Copy className="w-5 h-5" />
              </button>
              <button onClick={handlePrint} className="text-gray-600 hover:text-gray-800 p-1">
                <Printer className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm bg-white border">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="py-3 px-4 font-medium text-left">Student Name</th>
                  <th className="py-3 px-4 font-medium text-left">Admission No</th>
                  <th className="py-3 px-4 font-medium text-left">Class</th>
                  <th className="py-3 px-4 font-medium text-left">Father's Name</th>
                  <th className="py-3 px-4 font-medium text-left">Route Title</th>
                  <th className="py-3 px-4 font-medium text-left">Vehicle Number</th>
                  <th className="py-3 px-4 font-medium text-left">Pickup Point</th>
                  <th className="py-3 px-4 font-medium text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {displayedStudents.map((student, index) => (
                  <tr key={index} className="border-t text-gray-600">
                    <td className="py-3 px-4">{student.studentName}</td>
                    <td className="py-3 px-4">{student.admissionNo}</td>
                    <td className="py-3 px-4">{student.class}</td>
                    <td className="py-3 px-4">{student.fatherName}</td>
                    <td className="py-3 px-4">{student.routeTitle || 'N/A'}</td>
                    <td className="py-3 px-4">{student.vehicleNumber || 'N/A'}</td>
                    <td className="py-3 px-4">{student.pickupPoint || 'N/A'}</td>
                    <td
                      className="py-3 px-4 cursor-pointer text-blue-600 hover:text-blue-800"
                      onClick={() => setShowTransportFeeForm(!showTransportFeeForm)}
                    >
                      <Tag size={18} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showTransportFeeForm && (
        <StudentTransportFeeForm onclose={() => setShowTransportFeeForm(false)} />
      )}
    </div>
  </div>
</div>

  );
}
