'use client'
import { useState } from 'react'

const students = [
  { name: 'Ashwani Kumar', admissionNo: '120020' },
  { name:'Nathan Smith', admissionNo: '120124' },
  { name:'Xavier', admissionNo:'124502' }
]

const feeData = [
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

export default function QuickFeesMaster() {
  const [selectedStudent, setSelectedStudent] = useState('120020');
  const [selectedClass,setSelectedClass]=useState("");
  const [selectedSection,setSelectedSection]=useState("");
  
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-xl font-semibold mb-4">Quick Fees Master</h1>

      {/* Filters */}
      <div className="grid sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">Class</label>
          <select 
          onChange={(e)=>setSelectedClass(e.target.value)}
          className="w-full border rounded px-3 py-2">
            <option value="Class1" >Class 1</option>
            <option value="Class2" >Class 2</option>
            <option value="Class3" >Class 3</option>
            <option value="Class4" >Class 4</option>
            <option value="Class5" >Class 5</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Section</label>
          <select 
          onChange={(e)=>setSelectedSection(e.target.value)}
          className="w-full border rounded px-3 py-2">
            <option value='' >Select</option>
            <option value="A" >A</option>
            <option value="B" >B</option>
            <option value="C" >C</option>
            <option value="D" >D</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Student</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
          >
            {students.map((s) => (
              <option key={s.admissionNo} value={s.admissionNo}>
                {s.name} ({s.admissionNo})
              </option>
            ))}
          </select>
        </div>
      </div>

      {(selectedClass!=="" && selectedSection!=="" && selectedStudent!=="") && <div> 
        {/* Alert */}
        <div className="bg-blue-100 text-blue-800 px-4 py-3 rounded mb-4 border border-blue-300">
            Note: Fee Already Assigned
        </div>

        {/* Table */}
        <div className="flex w-full justify-end items-center mt-4">
            <div className="flex gap-2">
            <button className="px-3 py-1 border rounded text-sm hover:bg-gray-100">
                📄
            </button>
            <button className="px-3 py-1 border rounded text-sm hover:bg-gray-100">
                🖨️
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
      </div>}
    </div>
  )
}
