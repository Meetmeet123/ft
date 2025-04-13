"use client";

import React, { useState } from "react";
import Image from "next/image";
import toyyibPayLogo from "./assets/toyyibpay.png"; // Adjust the path as necessary

export default function ToyyibPayForm() {
  const [secretKey, setSecretKey] = useState("");
  const [categoryCode, setCategoryCode] = useState("");
  const [processingType, setProcessingType] = useState("none");
  const [amount, setAmount] = useState("");
  const [percentageFixAmount, setPercentageFixAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here
  };

  return (
    <div className="flex flex-col md:flex-row md:space-x-45 xl:w-[100%]">
      {/* Form Section */}
      <form className="w-full md:w-3/5 lg:w-3/5 mb-8 md:mb-0" onSubmit={handleSubmit}>
        <div className="space-y-3">
          {/* Secret Key */}
          <div className="flex items-center space-x-4">
            <label htmlFor="secretKey" className="w-48 font-medium">
              Secret Key<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              id="secretKey"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Category Code */}
          <div className="flex items-center space-x-4">
            <label htmlFor="categoryCode" className="w-48 font-medium">
              Category Code<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              id="categoryCode"
              value={categoryCode}
              onChange={(e) => setCategoryCode(e.target.value)}
              className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Processing Fees Type */}
          <div className="flex items-center gap-6 mt-4">
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
                  value="fix"
                  checked={processingType === "fix"}
                  onChange={() => setProcessingType("fix")}
                  className="mr-2 h-4 w-4 text-blue-600"
                />
                Fix Amount (₹)
              </label>
            </div>
          </div>

          {/* Amount Field (Conditional) */}
          <div className="flex items-center gap-15 mt-6">
            <label htmlFor="percentageFixAmount" className="min-w-[150px] font-medium">
              Percentage/Fix Amount
            </label>
            <input
              type="text"
              id="percentageFixAmount"
              value={percentageFixAmount}
              onChange={(e) => setPercentageFixAmount(e.target.value)}
              className="w-full max-w-xs p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={
                processingType === "percentage"
                  ? "Enter percentage"
                  : "Enter amount"
              }
              disabled={processingType === "none"}
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center mt-10">
          <button
            type="submit"
            className="btn btn-primary text-white px-6 py-2 rounded"
          >
            Save
          </button>
        </div>
      </form>

      {/* Sidebar Section */}
      <div className="w-full md:w-2/5 lg:w-1/5 border border-gray-200 rounded p-6">
        <h2 className="text-xl text-blue-600 font-medium mb-4">
          Payment Gateway For Malaysia
        </h2>
        <div className="flex my-4">
          <Image
            src={toyyibPayLogo}
            alt="ToyyibPay"
            width={150}
            height={60}
            priority
          />
        </div>
        <a
          href="https://toyyibpay.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          https://toyyibpay.com/
        </a>
      </div>
    </div>
  );
}
