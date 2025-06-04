'use client'
import { useState } from 'react'
import { Download, Printer } from 'lucide-react'

interface Student {
  name: string;
  admissionNo: string;
  isAssigned: boolean;
}

interface FeeData {
  group: string;
  type: string;
  code: string;
  dueDate: string;
  fine: string;
  amount: string;
}

const students: Student[] = [
  { name: 'Ashwani Kumar', admissionNo: '120020', isAssigned: true },
  { name: 'Nathan Smith', admissionNo: '120124', isAssigned: false },
  { name: 'Xavier', admissionNo: '124502', isAssigned: false },
  { name: 'Hazel', admissionNo: '120209', isAssigned: false }
]

const feeData: FeeData[] = [
  {
    group: '260-120020-Ashwani',
    type: 'Ashwani Kumar (120020) - Installment-1',
    code: 'Ashwani Kumar (120020) - Installment-1',
    dueDate: '04/10/2025',
    fine: '3,500.00',
    amount: '35,000.00'
  },
  {
    group: '',
    type: 'Ashwani Kumar (120020) - Installment-2',
    code: 'Ashwani Kumar (120020) - Installment-2',
    dueDate: '05/10/2025',
    fine: '3,500.00',
    amount: '46,666.9'
  },
  {
    group: '',
    type: 'Ashwani Kumar (120020) - Installment-3',
    code: 'Ashwani Kumar (120020) - Installment-3',
    dueDate: '06/10/2025',
    fine: '3,500.00',
    amount: '46,666.9'
  },
  {
    group: '',
    type: 'Ashwani Kumar (120020) - Installment-4',
    code: 'Ashwani Kumar (120020) - Installment-4',
    dueDate: '07/10/2025',
    fine: '3,500.00',
    amount: '46,666.9'
  }
]

const handleExportExcel = (): void => {
  if (feeData.length === 0) return;

  const headers = Object.keys(feeData[0]) as (keyof FeeData)[];
  let table = '<table><tr>';

  // Add table headers
  headers.forEach(header => {
    table += `<th>${header}</th>`;
  });
  table += '</tr>';

  // Add table rows
  feeData.forEach(row => {
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
  a.download = 'Fees Master College.xls';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const handlePrint = (): void => {
  if (!feeData || feeData.length === 0) return;

  const headers = Object.keys(feeData[0]) as (keyof FeeData)[];
  let table = '<table border="1" style="border-collapse: collapse; width: 100%"><thead><tr>';

  // Headers
  headers.forEach(header => {
    table += `<th style="padding: 8px; text-align: left;">${header}</th>`;
  });
  table += '</tr></thead><tbody>';

  // Rows
  feeData.forEach(row => {
    table += '<tr>';
    headers.forEach(header => {
      table += `<td style="padding: 8px;">${row[header] ?? ''}</td>`;
    });
    table += '</tr>';
  });

  table += '</tbody></table>';

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(`
      <html>
        <head>
          <title>Fees Master College</title>
        </head>
        <body>
          <h2>Fees Master College</h2>
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
  }
};

export default function QuickFeesMaster() {
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedSection, setSelectedSection] = useState<string>("");

  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedClass(e.target.value);
  };

  const handleSectionChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedSection(e.target.value);
  };

  const handleStudentChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedStudent(e.target.value);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-xl font-semibold mb-4">Quick Fees Master</h1>

      {/* Filters */}
      <div className="grid sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">Class</label>
          <select 
            onChange={handleClassChange}
            className="w-full border rounded px-3 py-2"
            value={selectedClass}
          >
            <option value="">Select</option>
            <option value="Class1">Class 1</option>
            <option value="Class2">Class 2</option>
            <option value="Class3">Class 3</option>
            <option value="Class4">Class 4</option>
            <option value="Class5">Class 5</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Section</label>
          <select 
            onChange={handleSectionChange}
            className="w-full border rounded px-3 py-2"
            value={selectedSection}
          >
            <option value=''>Select</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Student</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={selectedStudent}
            onChange={handleStudentChange}
          >
            <option value="">Select</option>
            {students.map((s) => (
              <option key={s.admissionNo} value={s.admissionNo}>
                {s.name} ({s.admissionNo})
              </option>
            ))}
          </select>
        </div>
      </div>

      {
        (selectedClass !== "" && selectedSection !== "" && selectedStudent !== "") && 
        (selectedStudent === '120020' ? 
          <div> 
            {/* Alert */}
            <div className="bg-blue-100 text-blue-800 px-4 py-3 rounded mb-4 border border-blue-300">
              Note: Fee Already Assigned
            </div>

            {/* Table */}
            <div className="flex w-full justify-end items-center mt-4">
              <div className="flex justify-end gap-2">
                <button
                  onClick={handleExportExcel}
                  className="px-3 py-1 border rounded text-sm hover:bg-gray-100"
                >
                  <Download className='h-5 w-5' />
                </button>
                <button 
                  onClick={handlePrint}
                  className="px-3 py-1 border rounded text-sm hover:bg-gray-100"
                >
                  <Printer className='w-5 h-5' />
                </button>
              </div>
              <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">
                Unassign Fees
              </button>
            </div>
            <div className="bg-white rounded shadow overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-4 py-2 font-medium text-gray-600">Fees Group</th>
                    <th className="px-4 py-2 font-medium text-gray-600">Fees Type</th>
                    <th className="px-4 py-2 font-medium text-gray-600">Fees Code</th>
                    <th className="px-4 py-2 font-medium text-gray-600">Due Date</th>
                    <th className="px-4 py-2 font-medium text-gray-600">Fine Amount (₹)</th>
                    <th className="px-4 py-2 font-medium text-gray-600">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {feeData.map((fee, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2">{fee.group}</td>
                      <td className="px-4 py-2">{fee.type}</td>
                      <td className="px-4 py-2">{fee.code}</td>
                      <td className="px-4 py-2">{fee.dueDate}</td>
                      <td className="px-4 py-2">{fee.fine}</td>
                      <td className="px-4 py-2">{fee.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='w-full flex justify-end mt-5'>
              <button className='btn btn-primary'>Unassign Fees</button>
            </div>
          </div> : 
          <div className="mt-7 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
            <div className="w-full">
              <label className="block mb-1">Total Fees <span className="text-red-600">*</span></label>
              <input type="text" className="w-full border rounded px-3 py-2" />
            </div>
          
            <div className="w-full">
              <label className="block mb-1">1st Installment</label>
              <input type="text" className="w-full border rounded px-3 py-2" />
            </div>
          
            <div className="w-full">
              <label className="block mb-1">Balance Fees <span className="text-red-600">*</span></label>
              <input type="text" className="w-full border rounded px-3 py-2" />
            </div>
          
            <div className="w-full">
              <label className="block mb-1">No. Of Installment <span className="text-red-600">*</span></label>
              <input type="text" className="w-full border rounded px-3 py-2" />
            </div>
          
            <div className="w-full">
              <label className="block mb-1">Monthly Day for Due Date</label>
              <select className="w-full border rounded px-3 py-2">
                <option>None</option>
                {Array.from({ length: 31 }, (_, i) => i + 1).map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </select>
            </div>
          
            <div className="w-full">
              <label className="block mb-1">Fine Type</label>
              <select className="w-full border rounded px-3 py-2">
                <option>None</option>
                <option>Fix Amount</option>
                <option>Percent</option>
              </select>
            </div>
          
            <div className="w-1/2 flex mt-5 justify-end">
              <button className="btn btn-primary w-full">Assign Fees</button>
            </div>
          </div>
        )
      }
    </div>
  )
}