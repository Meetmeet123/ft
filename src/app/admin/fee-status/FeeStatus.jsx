"use client"
import React, { useState } from 'react';

export default function FeeStatus({feeDetails}) {
    return (
        <div className="w-full mx-auto">
            {/* Status Cards Row 1 */}
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 mb-6 ">
                {
                feeDetails.map((item, index) => (
                    <StatusCard
                        key={index}
                        title={item.title}
                        icon={item.icon}
                        count={item.count}
                        percent={item.percent}
                        color={item.color}
                    />
                ))
                }
            </div>
        </div>
    );
}

function StatusCard({ title, icon, count, percent, color }) {
    return (
        <div className="bg-blue-50 rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                    <span className="text-gray-700 mr-2">{icon}</span>
                    <h2 className="text-lg text-gray-700 font-medium">{title}</h2>
                </div>
                <span className="text-gray-700 font-semibold">{count}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div className={`${color} h-2 rounded-full`} style={{ width: percent }}></div>
            </div>
        </div>
    );
}
