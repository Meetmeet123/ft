"use client";
import React, { useState } from 'react';
import { X } from "lucide-react";

export default function PaymentGateway({
  selectedGateway,
  setSelectedGateway,
  paymentGateways,
  paymentGateways2,
}) {
  const [showMobile, setShowMobile] = useState(false);

  const dynamicGateways = [
    ...paymentGateways.map((g) => g.name),
    ...paymentGateways2.map((g) => g.name),
  ];

  const allGateways = [
    'Paypal', 'Stripe', 'PayU', 'CCAvenue', 'InstaMojo', 'Paystack', 'Razorpay',
    'Paytm', 'Midtrans', 'Pesapal', 'Flutter Wave', 'iPay Africa', 'JazzCash', 'Billplz',
    'SSLCommerz','Walkingm','Mollie','Cashfree','Payfast','ToyyibPay','Twocheckout','Skrill',
    'Payhere','Onepay','None',
    ...dynamicGateways,
  ];

  const uniqueGateways = [...new Set(allGateways)];

  return (
    <>
      {/* 🔘 Mobile Toggle Button */}
      <div className="md:hidden fixed bottom-4 z-4">
        <button
          onClick={() => setShowMobile(true)}
          className="bg-blue-700 text-white px-4 py-2 rounded shadow"
        >
          Select Gateway
        </button>
      </div>

      {/* 💻 Desktop Sidebar */}
      <div className="hidden md:block fixed right-0 ml-0 top-24 w-64 bg-white border border-gray-300 shadow-md p-4 max-h-[calc(100vh-6rem)] overflow-y-auto">
        <h2 className="font-medium mb-4">Select Payment Gateway</h2>
        <div className="space-y-2">
          {uniqueGateways.map((gateway) => (
            <label key={gateway} className="flex items-center">
              <input
                type="radio"
                name="gatewaySelect"
                checked={selectedGateway === gateway}
                onChange={() => setSelectedGateway(gateway)}
                className="mr-2"
              />
              {gateway}
            </label>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <button
            style={{ backgroundColor: '#164E63' }}
            className="text-white px-6 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>

      {/* 📱 Mobile Slide-In Sidebar */}
      {showMobile && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={() => setShowMobile(false)}
          />

          {/* Slide-in Menu */}
          <div className="fixed top-0 right-0 w-3/4 max-w-xs h-full bg-white z-50 shadow-lg transition-transform duration-300 transform translate-x-0">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="font-medium text-lg">Select Payment Gateway</h2>
              <button onClick={() => setShowMobile(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="p-4 space-y-2 overflow-y-auto max-h-[calc(100vh-6rem)]">
              {uniqueGateways.map((gateway) => (
                <label key={gateway} className="flex items-center">
                  <input
                    type="radio"
                    name="gatewaySelect"
                    checked={selectedGateway === gateway}
                    onChange={() => {
                      setSelectedGateway(gateway);
                      setShowMobile(false);
                    }}
                    className="mr-2"
                  />
                  {gateway}
                </label>
              ))}
              <div className="flex justify-center mt-10">
                <button
                  className="btn btn-primary text-white px-6 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
