"use client"
import React, { useState } from 'react';
import Head from 'next/head';
import { Plus } from 'lucide-react';

import data1 from './Class2General';
import data2 from './Class2LumpSum';
import data3 from './Ayan';
import data4 from './Class5General';
import data5 from './Class1General';
import data6 from './Fees';
import data7 from './exam';
import data8 from './Class4General';
import data9 from './Class3General';

export default function FeesDEtails() {
  const [selectedHostel, setSelectedHostel] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [feeDetails, setFeeDetails] = useState([
    { id: 1, name: 'Class 1 General', amount: '4,93,500.00', content: data1, display: false },
    { id: 2, name: 'Class 1 Lump Sum', amount: '10,500.00', content: data2, display: false },
    { id: 3, name: 'Class 1- I Installment', amount: '7,000.00', content: data3, display: false },
    { id: 4, name: 'Class 2 General', amount: '4,83,000.00', content: data4, display: false },
    { id: 5, name: 'Class 2 Lump Sum', amount: '24,500.00', content: data5, display: false },
    { id: 6, name: 'Class 3 General', amount: '5,46,000.00', content: data6, display: false },
    { id: 7, name: 'Class 4 General', amount: '6,23,000.00', content: data7, display: false },
    { id: 8, name: 'Exam', amount: '17,500.00', content: data8, display: false },
    { id: 9, name: 'Fees', amount: '17,500.00', content: data9, display: false }
  ]);

  const handleFeeSelection = (id) => {
    setFeeDetails(feeDetails.map(fee =>
      fee.id === id
        ? { ...fee, display: !fee.display }
        : fee
    ));
  };

  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Hostel Management System</title>
        <meta name="description" content="Hostel fees management system" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="border-b border-gray-300 pb-2 mb-4">
        <h1 className="text-xl font-semibold">Hostel Details</h1>
      </div>

      <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4 mb-6">
        <div className='w-full'>
          <label htmlFor="hostel" className="block text-sm font-medium text-gray-700 mb-1">
            Hostel
          </label>
          <select
            id="hostel"
            value={selectedHostel}
            onChange={(e) => setSelectedHostel(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          >
            <option value="">Select</option>
            <option value="hostel1">Boys Hostel 1</option>
            <option value="hostel2">Boys Hostel 2</option>
            <option value="hostel3">Girls Hostel 3</option>
            <option value="hostel4">Girls Hostel 4</option>
          </select>
        </div>
        <div className='w-full'>
          <label htmlFor="room" className="block text-sm font-medium text-gray-700 mb-1">
            Room No.
          </label>
          <select
            id="room"
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          >
            <option value="">Select</option>
            <option value="101">101</option>
            <option value="102">102</option>
            <option value="103">103</option>
          </select>
        </div>
      </div>

      <div className="border-b border-gray-300 pb-2 mb-4">
        <h2 className="text-lg font-semibold">Fees Details</h2>
      </div>

      <div className="border rounded-md mb-6">
        {feeDetails.map((fee) => (
          <div key={fee.id}>
            <div className="border-b last:border-b-0 flex items-center p-3 hover:bg-gray-50">
              <Plus onClick={() => handleFeeSelection(fee.id)} className="cursor-pointer mr-3" />
              <input
                type="checkbox"
                checked={fee.display}
                onChange={() => handleFeeSelection(fee.id)}
                className="mr-3"
              />
              <label htmlFor={`fee-${fee.id}`} className="flex-grow">{fee.name}</label>
              <span className="text-right">{fee.amount}</span>
            </div>

            {fee.display && (
              <div className="mt-2 p-3 border bg-gray-50 rounded-md overflow-x-auto">
                <table className="min-w-full text-sm text-left border-collapse">
                  <thead className="bg-gray-100 text-gray-700 font-semibold">
                    <tr>
                      <th className="border px-4 py-2">Fees Type</th>
                      <th className="border px-4 py-2">Due Date</th>
                      <th className="border px-4 py-2">Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(Array.isArray(fee.content) ? fee.content : [fee.content]).map((item, index) => (
                      <tr key={index}>
                        <td className="border px-4 py-2">{item["Fees Type"]}</td>
                        <td className="border px-4 py-2">{item["Due Date"]}</td>
                        <td className="border px-4 py-2">{item["Amount (₹)"]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* You can implement discount logic here */}
    </div>
  );
}
