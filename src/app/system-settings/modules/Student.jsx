import React, { useState, useEffect } from 'react';
import { ChevronDown, Printer, FileText, Database, Download, Search } from 'lucide-react';
import studentData from './StudentData';
import { getModuleData } from './ParentData';
import * as XLSX from 'xlsx';

function Student() {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStudents, setFilteredStudents] = useState(studentData);

  // useEffect(() => {
  //   const filtered = students.filter((item) =>
  //     item.name.toLowerCase().includes(searchQuery.toLowerCase())
  //   );
  //   setFilteredStudents(filtered);
  // }, [searchQuery, students]);

  const toggleAction = (name) => {
    const updated = students.map((item) =>
      item.Name === name ? { ...item, Action: !item.Action } : item
    );
    setStudents(updated);
  };

  const handleCopyClick = () => {
    const text = JSON.stringify(filteredStudents, null, 2);
    navigator.clipboard.writeText(text).then(() => {
      alert('Data copied to clipboard!');
    });
  };

  const handleExcelExport = () => {
      // Step 1: Convert data to worksheet
      const worksheet = XLSX.utils.json_to_sheet(students);
    
      // Step 2: Create a new workbook and append the worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Incomes');
    
      // Step 3: Trigger download
      XLSX.writeFile(workbook, 'Students.xlsx');
    };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getModuleData();
        setStudents(data.data.studentPermissionList)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData();
  }, [])

  const handlePrintClick = () => {
    if (!students || students.length === 0) return;
  
    const headers = Object.keys(students[0]);
    let table = '<table border="1" style="border-collapse: collapse; width: 100%"><thead><tr>';
  
    // Headers
    headers.forEach(header => {
      table += `<th style="padding: 8px; text-align: left;">${header}</th>`;
    });
    table += '</tr></thead><tbody>';
  
    // Rows
    students.forEach(row => {
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
          <title>Students</title>
        </head>
        <body>
          <h2>Students</h2>
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

   const toggleSwitch = (name, key) => {
    const updated = students.map((item) =>
      item.name === name ? { ...item, [key]: item[key] === 1 ? 0 : 1 } : item
    );
    setStudents(updated);
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b p-4">
        <div className="flex-1 min-w-[200px] max-w-xs relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button onClick={handleExcelExport} className="text-gray-500" title="Copy to clipboard">
            <Database size={18} />
          </button>
          <button onClick={handleExcelExport} className="text-gray-500" title="Download CSV">
            <Download size={18} />
          </button>
          <button onClick={handleCopyClick} className="text-gray-500" title="Copy JSON">
            <FileText size={18} />
          </button>
          <button onClick={handlePrintClick} className="text-gray-500" title="Print">
            <Printer size={18} />
          </button>
        </div>
      </div>

      <div id="print-section" className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {/* ["Id", "Name", "Short Code", "System", "Student", "Parent", "Group ID"] */}
              {["Id", "Name", "Short Code", "System", "Student", "Parent", "Group ID"].map((title, idx) => (
                <th
                  key={idx}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <div className="flex items-center">
                    {title}
                    {title !== 'Action' && <ChevronDown size={14} className="ml-1" />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((item) => (
              <tr key={item.name}>
                <td className="px-4 py-3 text-sm text-blue-600 w-full">{item.id}</td>
                  <td className="px-4 py-3 text-sm text-blue-600 w-full">{item.name}</td>
                  <td className="px-4 py-3 text-sm text-blue-600 w-full">{item.short_code}</td>
                  <td className="px-4 py-3 text-sm text-blue-600 w-full">
                    <button
                      type="button"
                      className="focus:outline-none"
                     onClick={() => toggleSwitch(item.name, 'system')}
                    >
                      <div className="relative w-12 h-6">
                        <div
                          className={`absolute inset-0 rounded-full transition-colors duration-300 ${
                            item.system === 1 ? 'bg-green-500' : 'bg-gray-200'
                          }`}
                        />
                        <div
                          className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${
                            item.system === 1 ? 'left-7' : 'left-1'
                          }`}
                        />
                      </div>
                    </button>
                  </td>
                  <td className="px-4 py-3 text-sm text-blue-600 w-full">
                    <button
                      type="button"
                      className="focus:outline-none"
                      onClick={() => toggleSwitch(item.name, 'student')}
                    >
                      <div className="relative w-12 h-6">
                        <div
                          className={`absolute inset-0 rounded-full transition-colors duration-300 ${
                            item.student === 1 ? 'bg-green-500' : 'bg-gray-200'
                          }`}
                        />
                        <div
                          className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${
                            item.student === 1 ? 'left-7' : 'left-1'
                          }`}
                        />
                      </div>
                    </button>
                  </td>
                  <td className="px-4 py-3 text-sm text-blue-600 w-full">
                    <button
                      type="button"
                      className="focus:outline-none"
                      onClick={() => toggleSwitch(item.name, 'parent')}
                    >
                      <div className="relative w-12 h-6">
                        <div
                          className={`absolute inset-0 rounded-full transition-colors duration-300 ${
                            item.parent === 1 ? 'bg-green-500' : 'bg-gray-200'
                          }`}
                        />
                        <div
                          className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${
                            item.parent === 1 ? 'left-7' : 'left-1'
                          }`}
                        />
                      </div>
                    </button>
                  </td>
                  <td className="px-4 py-3 text-sm text-blue-600 w-full">{item.group_id}</td>
              </tr>
            ))}
            {filteredStudents.length === 0 && (
              <tr>
                <td
                  colSpan={2}
                  className="text-center px-4 py-3 text-sm text-gray-500"
                >
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end p-4">
        <button className='btn btn-primary' >Save</button>
      </div>
    </div>
  );
}

export default Student;
