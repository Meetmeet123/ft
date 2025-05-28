// components/FeeManagement.jsx
"use client";
import { useState, useEffect } from 'react';
import { Database, Download, Copy, Printer, SearchIcon } from 'lucide-react'; 
import student from './StudentData';
import Link from 'next/link';

export default function FeeManagement() {
  const [selectedFeesGroups, setSelectedFeesGroups] = useState([
    'admission-fees',
    'apr-month-fees',
    'may-month-fees',
    'jun-month-fees'
  ]);
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [search,setSearch]=useState(false);
  const [searchQuery,setSearchQuery]=useState();
  const [displayedStudents,setDisplayedStudents]=useState(student);

  const feesGroups = [
    { id: 'class-1-general', name: 'Class 1 General', parent: null },
    { id: 'admission-fees', name: 'Admission Fees (admission-fees)', parent: 'class-1-general' },
    { id: 'apr-month-fees', name: 'April Month Fees (apr-month-fees)', parent: 'class-1-general' },
    { id: 'may-month-fees', name: 'May Month Fees (may-month-fees)', parent: 'class-1-general' },
    { id: 'jun-month-fees', name: 'June Month Fees (jun-month-fees)', parent: 'class-1-general' },
    { id: 'jul-month-fees', name: 'July Month Fees (jul-month-fees)', parent: 'class-1-general' },
    { id: 'aug-month-fees', name: 'August Month Fees (aug-month-fees)', parent: 'class-1-general' },
    { id: 'bus-fees-1', name: 'Bus-fees (Bus-fees)', parent: 'class-1-general' },
    { id: 'exam', name: 'Exam Fees (Exam)', parent: 'class-1-general' },
    { id: 'sep-month-fees', name: 'September Month Fees (sep-month-fees)', parent: 'class-1-general' },
    { id: 'oct-month-fees', name: 'October Month Fees (oct-month-fees)', parent: 'class-1-general' },
    { id: 'nov-month-fees', name: 'November Month Fees (nov-month-fees)', parent: 'class-1-general' },
    { id: 'dec-month-fees', name: 'December Month Fees (dec-month-fees)', parent: 'class-1-general' },
    { id: 'jan-month-fees', name: 'January Month Fees (jan-month-fees)', parent: 'class-1-general' },
    { id: 'feb-month-fees', name: 'February Month Fees (feb-month-fees)', parent: 'class-1-general' },
    { id: 'march-month-fees', name: 'March Month Fees (march-month-fees)', parent: 'class-1-general' },
  
    { id: 'class-1-lumpsum', name: 'Class 1 Lump Sum', parent: null },
    { id: 'lumpsum-fees', name: 'Lumpsum fees (lumpsum-fees)', parent: 'class-1-lumpsum' },
  
    { id: 'class-1-installment', name: 'Class 1- I Installment', parent: null },
    { id: 'installment-apr', name: 'April Month Fees (apr-month-fees)', parent: 'class-1-installment' },
  
    { id: 'class-2-general', name: 'Class 2 General', parent: null },
    { id: 'admission-fees-2', name: 'Admission Fees (admission-fees)', parent: 'class-2-general' },
    { id: 'apr-month-fees-2', name: 'April Month Fees (apr-month-fees)', parent: 'class-2-general' },
    { id: 'bus-fees-2', name: 'Bus-fees (Bus-fees)', parent: 'class-2-general' },
    { id: 'may-month-fees-2', name: 'May Month Fees (may-month-fees)', parent: 'class-2-general' },
    { id: 'jun-month-fees-2', name: 'June Month Fees (jun-month-fees)', parent: 'class-2-general' },
    { id: 'jul-month-fees-2', name: 'July Month Fees (jul-month-fees)', parent: 'class-2-general' },
    { id: 'aug-month-fees-2', name: 'August Month Fees (aug-month-fees)', parent: 'class-2-general' },
    { id: 'sep-month-fees-2', name: 'September Month Fees (sep-month-fees)', parent: 'class-2-general' },
    { id: 'oct-month-fees-2', name: 'October Month Fees (oct-month-fees)', parent: 'class-2-general' },
    { id: 'nov-month-fees-2', name: 'November Month Fees (nov-month-fees)', parent: 'class-2-general' },
    { id: 'dec-month-fees-2', name: 'December Month Fees (dec-month-fees)', parent: 'class-2-general' },
    { id: 'jan-month-fees-2', name: 'January Month Fees (jan-month-fees)', parent: 'class-2-general' },
    { id: 'feb-month-fees-2', name: 'February Month Fees (feb-month-fees)', parent: 'class-2-general' },
    { id: 'march-month-fees-2', name: 'March Month Fees (march-month-fees)', parent: 'class-2-general' },
  
    { id: 'class-2-lumpsum', name: 'Class 2 Lump Sum', parent: null },
    { id: 'installment-1', name: '1st Installment Fees ( 1-installment-fees)', parent: 'class-2-lumpsum' },
  
    { id: 'class-3-general', name: 'Class 3 General', parent: null },
    { id: 'admission-fees-3', name: 'Admission Fees (admission-fees)', parent: 'class-3-general' },
    { id: 'apr-month-fees-3', name: 'April Month Fees (apr-month-fees)', parent: 'class-3-general' },
    { id: 'may-month-fees-3', name: 'May Month Fees (may-month-fees)', parent: 'class-3-general' },
    { id: 'jun-month-fees-3', name: 'June Month Fees (jun-month-fees)', parent: 'class-3-general' },
    { id: 'jul-month-fees-3', name: 'July Month Fees (jul-month-fees)', parent: 'class-3-general' },
    { id: 'aug-month-fees-3', name: 'August Month Fees (aug-month-fees)', parent: 'class-3-general' },
    { id: 'sep-month-fees-3', name: 'September Month Fees (sep-month-fees)', parent: 'class-3-general' },
    { id: 'oct-month-fees-3', name: 'October Month Fees (oct-month-fees)', parent: 'class-3-general' },
    { id: 'nov-month-fees-3', name: 'November Month Fees (nov-month-fees)', parent: 'class-3-general' },
    { id: 'dec-month-fees-3', name: 'December Month Fees (dec-month-fees)', parent: 'class-3-general' },
    { id: 'jan-month-fees-3', name: 'January Month Fees (jan-month-fees)', parent: 'class-3-general' },
    { id: 'feb-month-fees-3', name: 'February Month Fees (feb-month-fees)', parent: 'class-3-general' },
    { id: 'march-month-fees-3', name: 'March Month Fees (march-month-fees)', parent: 'class-3-general' },
  
    { id: 'class-4-general', name: 'Class 4 General', parent: null },
    { id: 'admission-fees-4', name: 'Admission Fees (admission-fees)', parent: 'class-4-general' },
    { id: 'apr-month-fees-4', name: 'April Month Fees (apr-month-fees)', parent: 'class-4-general' },
    { id: 'may-month-fees-4', name: 'May Month Fees (may-month-fees)', parent: 'class-4-general' },
    { id: 'jun-month-fees-4', name: 'June Month Fees (jun-month-fees)', parent: 'class-4-general' },
    { id: 'jul-month-fees-4', name: 'July Month Fees (jul-month-fees)', parent: 'class-4-general' },
    { id: 'aug-month-fees-4', name: 'August Month Fees (aug-month-fees)', parent: 'class-4-general' },
    { id: 'sep-month-fees-4', name: 'September Month Fees (sep-month-fees)', parent: 'class-4-general' },
    { id: 'oct-month-fees-4', name: 'October Month Fees (oct-month-fees)', parent: 'class-4-general' },
    { id: 'nov-month-fees-4', name: 'November Month Fees (nov-month-fees)', parent: 'class-4-general' },
    { id: 'dec-month-fees-4', name: 'December Month Fees (dec-month-fees)', parent: 'class-4-general' },
    { id: 'jan-month-fees-4', name: 'January Month Fees (jan-month-fees)', parent: 'class-4-general' },
    { id: 'feb-month-fees-4', name: 'February Month Fees (feb-month-fees)', parent: 'class-4-general' },
    { id: 'march-month-fees-4', name: 'March Month Fees (march-month-fees)', parent: 'class-4-general' },
  
    { id: 'exam-fees', name: 'Exam Fees (exam-fees)', parent: null },
    { id: 'fees', name: 'fees (fees)', parent: null },
  
    { id: 'class-5-general', name: 'Class 5 General', parent: null },
    { id: 'admission-fees-5', name: 'Admission Fees (admission-fees)', parent: 'class-5-general' },
    { id: 'apr-month-fees-5', name: 'April Month Fees (apr-month-fees)', parent: 'class-5-general' },
    { id: 'bus-fees-5', name: 'Bus-fees (Bus-fees)', parent: 'class-5-general' },
    { id: 'fees-5', name: 'fees (fees)', parent: 'class-5-general' },
    { id: 'may-month-fees-5', name: 'May Month Fees (may-month-fees)', parent: 'class-5-general' },
    { id: 'jun-month-fees-5', name: 'June Month Fees (jun-month-fees)', parent: 'class-5-general' },
    { id: 'jul-month-fees-5', name: 'July Month Fees (jul-month-fees)', parent: 'class-5-general' },
    { id: 'aug-month-fees-5', name: 'August Month Fees (aug-month-fees)', parent: 'class-5-general' },
    { id: 'sep-month-fees-5', name: 'September Month Fees (sep-month-fees)', parent: 'class-5-general' },
    { id: 'oct-month-fees-5', name: 'October Month Fees (oct-month-fees)', parent: 'class-5-general' },
    { id: 'nov-month-fees-5', name: 'November Month Fees (nov-month-fees)', parent: 'class-5-general' },
    { id: 'dec-month-fees-5', name: 'December Month Fees (dec-month-fees)', parent: 'class-5-general' },
    { id: 'jan-month-fees-5', name: 'January Month Fees (jan-month-fees)', parent: 'class-5-general' },
    { id: 'feb-month-fees-5', name: 'February Month Fees (feb-month-fees)', parent: 'class-5-general' },
    { id: 'march-month-fees-5', name: 'March Month Fees (march-month-fees)', parent: 'class-5-general' },
  
    { id: 'transport-fees', name: 'Transport Fees', parent: null },
    { id: 'transport-apr', name: 'April (Transport Fees)', parent: 'transport-fees' },
    { id: 'transport-may', name: 'May (Transport Fees)', parent: 'transport-fees' },
    { id: 'transport-jun', name: 'June (Transport Fees)', parent: 'transport-fees' },
    { id: 'transport-jul', name: 'July (Transport Fees)', parent: 'transport-fees' },
    { id: 'transport-aug', name: 'August (Transport Fees)', parent: 'transport-fees' },
    { id: 'transport-sep', name: 'September (Transport Fees)', parent: 'transport-fees' },
    { id: 'transport-oct', name: 'October (Transport Fees)', parent: 'transport-fees' },
    { id: 'transport-nov', name: 'November (Transport Fees)', parent: 'transport-fees' },
    { id: 'transport-dec', name: 'December (Transport Fees)', parent: 'transport-fees' },
    { id: 'transport-jan', name: 'January (Transport Fees)', parent: 'transport-fees' },
    { id: 'transport-feb', name: 'February (Transport Fees)', parent: 'transport-fees' },
    { id: 'transport-mar', name: 'March (Transport Fees)', parent: 'transport-fees' }
  ];  

  const toggleFeesGroup = (id) => {
    if (id === 'all') {
      if (selectedFeesGroups.length === feesGroups.filter(g => g.id !== 'all').length) {
        setSelectedFeesGroups([]);
      } else {
        setSelectedFeesGroups(feesGroups.filter(g => g.id !== 'all').map(g => g.id));
      }
    } else {
      if (selectedFeesGroups.includes(id)) {
        setSelectedFeesGroups(selectedFeesGroups.filter(groupId => groupId !== id));
      } else {
        setSelectedFeesGroups([...selectedFeesGroups, id]);
      }
    }
  };

  const handleExportExcel=()=>{
    if (student.length === 0) return;
  
    const headers = Object.keys(student[0]);
    let table = '<table><tr>';
  
    // Add table headers
    headers.forEach(header => {
      table += `<th>${header}</th>`;
    });
    table += '</tr>';
  
    // Add table rows
    student.forEach(row => {
      table += '<tr>';
      headers.forEach(header => {
        table += `<td>${row[header] ?? ''}</td>`;
      });
      table += '</tr>';
    });
  
    table += '</table>';
  
    const blob = new Blob([`
      <html xmlns:o="urn:schemas-microsoft-com:office:office" 
            xmlns:x="urn:schemas-microsoft-com:office:excel" 
            xmlns="http://www.w3.org/TR/REC-html40">
      <head><meta charset="UTF-8"></head>
      <body>${table}</body></html>
    `], {
      type: 'application/vnd.ms-excel'
    });
  
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Fees Due.xls'; // .xls works fine with this method
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };  

  const handleCopy = () => {
    if (!student || student.length === 0) return;
  
    const jsonText = JSON.stringify(student, null, 2);
  
    navigator.clipboard.writeText(jsonText)
      .then(() => {
        alert('JSON data copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy JSON: ', err);
      });
  };

  const handlePrint = () => {
    if (!student || student.length === 0) return;
  
    const headers = Object.keys(student[0]);
    let table = '<table border="1" style="border-collapse: collapse; width: 100%"><thead><tr>';
  
    // Headers
    headers.forEach(header => {
      table += `<th style="padding: 8px; text-align: left;">${header}</th>`;
    });
    table += '</tr></thead><tbody>';
  
    // Rows
    student.forEach(row => {
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
          <title>Fees Due</title>
        </head>
        <body>
          <h2>Fees Due</h2>
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

  useEffect(() => {
    if(!searchQuery) return;
      if (!searchQuery.trim()) {
        setDisplayedStudents(student);
        return;
      }
  
      const query = searchQuery.toLowerCase();
      const filteredStudents = student.filter(student => 
        student.student_name?.toLowerCase().includes(query) ||
        student.admission_no?.toString().includes(query)
      );
  
      setDisplayedStudents(filteredStudents);
    }, [searchQuery, student]);


  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-6">Select Criteria</h2>
      
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 mb-6">
        {/* Fees Group Dropdown */}
        <div className="relative">
          <label className="block text-gray-700 mb-2">
            Fees Group <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left flex justify-between items-center"
            >
              <span>Select</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            
            {isDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-64 overflow-y-auto">
                <div className="py-1">
                  {feesGroups.map(group => (
                    <div 
                      key={group.id}
                      className={`px-3 py-2 hover:bg-gray-100 cursor-pointer ${
                        group.parent ? 'pl-8' : ''
                      } ${group.id === 'class-1-general' ? 'font-medium' : ''}`}
                    >
                      {group.parent ?
                      <label className="flex items-center space-x-2 cursor-pointer w-full">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-blue-600"
                          checked={
                            group.id === 'all'
                              ? selectedFeesGroups.length === feesGroups.filter(g => g.id !== 'all').length
                              : selectedFeesGroups.includes(group.id)
                          }
                          onChange={() => toggleFeesGroup(group.id)}
                        />
                        <span>{group.name}</span>
                      </label> : 
                      <div><h1>{group.name}</h1></div>
                      }
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Class Dropdown */}
        <div>
          <label className="block text-gray-700 mb-2">Class</label>
          <select 
            className="w-full bg-white border border-gray-300 rounded-md py-2 px-3"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="" >Select</option>
            <option value="Class 1" >Class 1</option>
            <option value="Class 2">Class 2</option>
            <option value="Class 3">Class 3</option>
            <option value="Class 4">Class 4</option>
            <option value="Class 5">Class 5</option>
          </select>
        </div>
        
        {/* Section Dropdown */}
        <div>
          <label className="block text-gray-700 mb-2">Section</label>
          <select 
            className="w-full bg-white border border-gray-300 rounded-md py-2 px-3"
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
          >
            <option value="" >Select</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
          <div className='flex justify-end m-5' >
            <button
            onClick={()=>{(selectedClass!=="" && selectedSection!=="") && setSearch(true)}}
             className='btn btn-primary' >Search</button>
          </div>
        </div>
      </div>
      
      {/* Search Button */}
      {(selectedClass!=="" && selectedSection!=="" && search) && <div>
        <div className=" mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="relative w-full md:w-1/3">
              <SearchIcon className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-md border-gray-300"
              />
            </div>
            <div className="flex gap-2">
              <select
                className="border border-gray-300 rounded-md px-4 py-2"
                // value={filterBy}
                // onChange={(e) => setFilterBy(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Pending">100</option>
              </select>
              <button 
              onClick={handleExportExcel}
              className="border px-3 py-2 rounded-md text-sm hover:bg-gray-100"><Database/></button>
              <button 
              onClick={handleCopy}
              className="border px-3 py-2 rounded-md text-sm hover:bg-gray-100"><Copy/></button>
              <button 
              onClick={handleExportExcel}
              className="border px-3 py-2 rounded-md text-sm hover:bg-gray-100"><Download/></button>
              <button 
              onClick={handlePrint}
              className="border px-3 py-2 rounded-md text-sm hover:bg-gray-100"><Printer/></button>
            </div>
          </div>
      </div>
      
      {/* Results Table */}
      <div className="overflow-x-auto mb-6">
        
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Class</th>
              <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Admission No</th>
              <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Student Name</th>
              <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Fees Group</th>
              <th className="py-2 px-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Amount ($)</th>
              <th className="py-2 px-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Paid ($)</th>
              <th className="py-2 px-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Discount ($)</th>
              <th className="py-2 px-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Fine ($)</th>
              <th className="py-2 px-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Balance ($)</th>
              <th className="py-2 px-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {displayedStudents.map((student, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-2 px-3 text-sm text-gray-900 border-b">{student.class.slice(0,7)}</td>
                <td className="py-2 px-3 text-sm text-gray-900 border-b">{student.admission_no}</td>
                <td className="py-2 px-3 text-sm text-gray-900 border-b">{student.student_name}</td>
                <td className="py-2 px-3 text-sm text-gray-600 border-b">
                  <div className="max-h-24 overflow-y-auto text-xs">
                    {student.fees_group.map((fee, i) => (
                      <div key={i} className="mb-1">{fee}</div>
                    ))}
                  </div>
                </td>
                <td className="py-2 px-3 text-sm text-gray-900 text-right border-b">{student.amount.toFixed(2)}</td>
                <td className="py-2 px-3 text-sm text-gray-900 text-right border-b">{student.paid.toFixed(2)}</td>
                <td className="py-2 px-3 text-sm text-gray-900 text-right border-b">{student.discount.toFixed(2)}</td>
                <td className="py-2 px-3 text-sm text-gray-900 text-right border-b">{student.fine.toFixed(2)}</td>
                <td className="py-2 px-3 text-sm text-gray-900 text-right border-b">{student.balance.toFixed(2)}</td>
                <td className="py-2 px-3 text-sm text-center border-b">
                  <Link href='/fees-collection/collect-fees/view-fees-details' >
                    <button className="btn-dark bg-gray-600 hover:bg-gray-700 text-white py-1 px-3 rounded-md text-xs flex items-center mx-auto">
                      Add_Fees
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </div>}
    </div>
  );
}