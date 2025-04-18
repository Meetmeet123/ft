"use client";

import React, { useState } from "react";
import Image from "next/image";
import cashfreeLogo from "./assets/cashfree.png"; // Adjust the path as necessary

export default function CashfreeForm() {
  const [appId, setAppId] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [processingType, setProcessingType] = useState("none");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submission logic
  };

  return (
    <div className="flex flex-col md:flex-row md:space-x-45 xl:w-[100%]">
      <form className="w-full md:w-3/5 lg:w-3/5 mb-8 md:mb-0" onSubmit={handleSubmit}>
        <div className="space-y-3">
          {/* App ID */}
          <div className="flex items-center space-x-4">
            <label htmlFor="appId" className="w-48 font-medium">
              App ID<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              id="appId"
              value={appId}
              onChange={(e) => setAppId(e.target.value)}
              className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Secret Key */}
          <div className="flex items-center space-x-4">
            <label htmlFor="secretKey" className="w-48 font-medium">
              Secret Key<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="password"
              id="secretKey"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
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
                  value="fix"
                  checked={processingType === "fix"}
                  onChange={() => setProcessingType("fix")}
                  className="mr-2 h-4 w-4 text-blue-600"
                />
                Fix Amount (₹)
              </label>
            </div>
          </div>

          {/* Amount Field */}
          {(processingType === "percentage" || processingType === "fix") && (
            <div className="flex items-center gap-15 mt-6">
              <label htmlFor="amount" className="min-w-[150px] font-medium">
                Percentage/Fix Amount
              </label>
              <input
                type="text"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full max-w-xs p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={processingType === "percentage" ? "Enter percentage" : "Enter amount"}
              />
            </div>
          )}
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
          Multinational Payment Gateway
        </h2>
        <div className="flex my-4">
          <Image
            src={cashfreeLogo}
            alt="Cashfree"
            width={150}
            height={60}
            priority
          />
        </div>
        <a
          href="https://www.cashfree.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          https://www.cashfree.com/
        </a>
      </div>
    </div>
  );
}
