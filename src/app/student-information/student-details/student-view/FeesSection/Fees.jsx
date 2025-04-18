"use client";
import React from "react";
import feesData from "./FeesData";

export const FeesSection = () => {
  
    return (
      <div className="w-full overflow-hidden">
        <div className="border-b border-gray-200 pb-3">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Fees</h2>
        </div>
        
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fees
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount ($)
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment ID
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mode
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Discount ($)
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fine ($)
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paid ($)
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Balance ($)
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {feesData.map((fee, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-red-50' : 'bg-white'}>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">
                    {fee.description}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">
                    {fee.dueDate}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-pink-600 text-white">
                      {fee.status}
                    </span>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">
                    {fee.amount}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">
                    {fee.paymentId}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">
                    {fee.mode}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">
                    {fee.date}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">
                    {fee.discount}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">
                    {fee.fine}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">
                    {fee.paid}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">
                    {fee.balance}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  export default FeesSection;