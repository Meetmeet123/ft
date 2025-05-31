import React, { useState } from 'react';
import Image from 'next/image';
import walkingmLogo from './assets/walkingm.png'; // Adjust the path as necessary

export default function PaymentGatewayForm() {
  const [processingFeeType, setProcessingFeeType] = useState('none');
  const [processingFeeAmount, setProcessingFeeAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your submit logic here
  };

  return (
    <div className="flex flex-col md:flex-row md:space-x-45 xl:w-[100%]">
      <form
        className="w-full w-x5 md:w-3/5 lg:w-3/5 mb-8 md:mb-0"
        onSubmit={handleSubmit}
      >
        <div className="space-y-3">
          {/* Client ID */}
          <div className="flex items-center space-x-4">
            <label htmlFor="clientId" className="w-48 font-medium">
              Client ID<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              id="clientId"
              className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Client Secret */}
          <div className="flex items-center space-x-4">
            <label htmlFor="clientSecret" className="w-48 font-medium">
              Client Secret<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              id="clientSecret"
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
                  name="processingFeeType"
                  value="none"
                  checked={processingFeeType === 'none'}
                  onChange={() => setProcessingFeeType('none')}
                  className="mr-2 h-4 w-4 text-blue-600"
                />
                None
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="processingFeeType"
                  value="percentage"
                  checked={processingFeeType === 'percentage'}
                  onChange={() => setProcessingFeeType('percentage')}
                  className="mr-2 h-4 w-4 text-blue-600"
                />
                Percentage (%)
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="processingFeeType"
                  value="fixAmount"
                  checked={processingFeeType === 'fixAmount'}
                  onChange={() => setProcessingFeeType('fixAmount')}
                  className="mr-2 h-4 w-4 text-blue-600"
                />
                Fix Amount ($)
              </label>
            </div>
          </div>

          {/* Amount Field */}
          <div className="flex items-center gap-15 mt-6">
            <label htmlFor="processingFeeAmount" className="min-w-[150px] font-medium">
              Percentage/Fix Amount
            </label>
            <input
              type="text"
              id="processingFeeAmount"
              value={processingFeeAmount}
              onChange={(e) => setProcessingFeeAmount(e.target.value)}
              className="w-full max-w-xs p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={
                processingFeeType === 'percentage'
                  ? 'Enter percentage'
                  : 'Enter amount'
              }
              disabled={processingFeeType === 'none'}
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
          Payment Gateway For Liberia
        </h2>
        <div className="flex my-4">
          <Image
            src={walkingmLogo}
            alt="WalkingM Logo"
            width={150}
            height={60}
            priority
          />
        </div>
        <a
          href="https://walkingm.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          https://walkingm.com/
        </a>
      </div>
    </div>
  );
}
