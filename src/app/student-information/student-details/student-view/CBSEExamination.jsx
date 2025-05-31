// DetailedExamResults.jsx
import React, { useState } from 'react'

const DetailedExamResults = () => {
  return (
    <div className="p-4 flex-1 bg-gray-50">
        
      {/* Monthly Test Section */}
      <div className="bg-white shadow-sm rounded-md mb-6">
        <div className="bg-gray-100 p-3 font-medium">
          Monthly Test (APRIL-2025)
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left py-3 px-4">Subject</th>
                <th className="text-center py-3 px-4">
                  Theory (TH02)
                  <div className="text-xs text-gray-500">(Max 100)</div>
                </th>
                <th className="text-center py-3 px-4">
                  Practical (PC03)
                  <div className="text-xs text-gray-500">(Max 75)</div>
                </th>
                <th className="text-center py-3 px-4">
                  Assignment (AS05)
                  <div className="text-xs text-gray-500">(Max 20)</div>
                </th>
                <th className="text-center py-3 px-4">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4">English (210)</td>
                <td className="py-3 px-4 text-center">78.00</td>
                <td className="py-3 px-4 text-center">xx</td>
                <td className="py-3 px-4 text-center">xx</td>
                <td className="py-3 px-4 text-center">78.00</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Computer (00220)</td>
                <td className="py-3 px-4 text-center">56.00</td>
                <td className="py-3 px-4 text-center">ABS</td>
                <td className="py-3 px-4 text-center">15.00</td>
                <td className="py-3 px-4 text-center">71.00</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Science (111)</td>
                <td className="py-3 px-4 text-center">67.00</td>
                <td className="py-3 px-4 text-center">44.00</td>
                <td className="py-3 px-4 text-center">15.00</td>
                <td className="py-3 px-4 text-center">126.00</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Mathematics (110)</td>
                <td className="py-3 px-4 text-center">67.00</td>
                <td className="py-3 px-4 text-center">xx</td>
                <td className="py-3 px-4 text-center">xx</td>
                <td className="py-3 px-4 text-center">67.00</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="py-3 px-4 font-medium">Total Marks : 342/590</td>
                <td className="py-3 px-4 text-center" colSpan="2">Percentage (%) : 57.97</td>
                <td className="py-3 px-4 text-center">Grade : C</td>
                <td className="py-3 px-4 text-center">Rank : 3</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DetailedExamResults;