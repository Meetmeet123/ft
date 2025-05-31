"use client";

import Image from "next/image";
import React, { useState } from 'react';
import payhereLogo from "./assets/payhere.png"; // Adjust the path as necessary

export default function PayHereGatewayForm() {
  const [processingType, setProcessingType] = useState("none");
  const [percentageOrAmount, setPercentageOrAmount] = useState("");
  const [merchantId, setMerchantId] = useState("");
  const [merchantSecret, setMerchantSecret] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="flex flex-col md:flex-row md:space-x-50 xl:w-full">
      <form className="w-full md:w-3/5 lg:w-3/5 mb-8 md:mb-0" onSubmit={handleSubmit}>
        <div className="space-y-3">
          {/* Merchant ID */}
          <div className="flex items-center space-x-4">
            <label className="w-48 font-medium">
              Merchant ID<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              value={merchantId}
              onChange={(e) => setMerchantId(e.target.value)}
              required
              className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Merchant Secret */}
          <div className="flex items-center space-x-4">
            <label className="w-48 font-medium">
              Merchant Secret<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              value={merchantSecret}
              onChange={(e) => setMerchantSecret(e.target.value)}
              required
              className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Processing Fees Type */}
          <div className="flex items-center gap-6">
            <span className="min-w-[200px] font-medium">Processing Fees Type</span>
            <div className="flex gap-10">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="processingType"
                  value="none"
                  checked={processingType === "none"}
                  onChange={() => setProcessingType("none")}
                  className="mr-2 h-4 w-4 text-blue-600"
                />
                None
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="processingType"
                  value="percentage"
                  checked={processingType === "percentage"}
                  onChange={() => setProcessingType("percentage")}
                  className="mr-2 h-4 w-4 text-blue-600"
                />
                Percentage (%)
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="processingType"
                  value="fixed"
                  checked={processingType === "fixed"}
                  onChange={() => setProcessingType("fixed")}
                  className="mr-2 h-4 w-4 text-blue-600"
                />
                Fix Amount (₹)
              </label>
            </div>
          </div>

          {/* Amount */}
          <div className="flex items-center gap-15 mt-6">
            <label className="min-w-[150px] font-medium">
              Percentage/Fix Amount
            </label>
            <input
              type="number"
              value={percentageOrAmount}
              onChange={(e) => setPercentageOrAmount(e.target.value)}
              disabled={processingType === "none"}
              className="w-full max-w-xs p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={
                processingType === "percentage"
                  ? "Enter percentage"
                  : "Enter amount"
              }
            />
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <button
            type="submit"
            className="btn btn-primary text-white px-6 py-2 rounded"
          >
            Save
          </button>
        </div>
      </form>

      {/* Sidebar */}
      <div className="w-full md:w-2/5 lg:w-1/5 border border-gray-200 rounded p-6">
        <h2 className="text-xl text-blue-600 font-medium mb-4">
          Payment Gateway for Sri Lanka
        </h2>
        <div className="flex my-4">
          <Image
            src={payhereLogo}
            alt="PayHere"
            width={150}
            height={60}
            priority
          />
        </div>
        <a
          href="https://www.payhere.lk/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          https://www.payhere.lk/
        </a>
      </div>
    </div>
  );
}
