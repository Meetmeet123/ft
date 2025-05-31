import React, { useState } from 'react';
import Image from 'next/image';
import sslCommerzLogo from './assets/sslcommerz.png'; // Adjust the path as necessary

const SSLCommerzConfigForm = () => {
  const [processingFeesType, setProcessingFeesType] = useState('none');
  const [storeId, setStoreId] = useState('');
  const [storePassword, setStorePassword] = useState('');
  const [feeAmount, setFeeAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      storeId,
      storePassword,
      processingFeesType,
      feeAmount: processingFeesType !== 'none' ? feeAmount : null,
    });
  };

  return (
    <div className="flex flex-col md:flex-row md:space-x-45 xl:w-[100%]">
      <form className="w-full md:w-3/5 mb-8 md:mb-0" onSubmit={handleSubmit}>
        <div className="space-y-3">
          {/* Store ID */}
          <div className="flex items-center space-x-4">
            <label htmlFor="storeId" className="w-48 font-medium">
              Store ID<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              id="storeId"
              value={storeId}
              onChange={(e) => setStoreId(e.target.value)}
              className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Store Password */}
          <div className="flex items-center space-x-4">
            <label htmlFor="storePassword" className="w-48 font-medium">
              Store Password<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="password"
              id="storePassword"
              value={storePassword}
              onChange={(e) => setStorePassword(e.target.value)}
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
                  name="processingFeesType"
                  value="none"
                  checked={processingFeesType === 'none'}
                  onChange={() => setProcessingFeesType('none')}
                  className="mr-2 h-4 w-4 text-blue-600"
                />
                None
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="processingFeesType"
                  value="percentage"
                  checked={processingFeesType === 'percentage'}
                  onChange={() => setProcessingFeesType('percentage')}
                  className="mr-2 h-4 w-4 text-blue-600"
                />
                Percentage (%)
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="processingFeesType"
                  value="fixed"
                  checked={processingFeesType === 'fixed'}
                  onChange={() => setProcessingFeesType('fixed')}
                  className="mr-2 h-4 w-4 text-blue-600"
                />
                Fix Amount (₹)
              </label>
            </div>
          </div>

          {/* Fee Amount Field */}
          <div className="flex items-center gap-15 mt-6">
            <label htmlFor="feeAmount" className="min-w-[150px] font-medium">
              Percentage/Fix Amount
            </label>
            <input
              type="number"
              id="feeAmount"
              value={feeAmount}
              onChange={(e) => setFeeAmount(e.target.value)}
              className="w-full max-w-xs p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={processingFeesType === 'percentage' ? 'Enter percentage' : 'Enter amount'}
              step={processingFeesType === 'percentage' ? '0.01' : '1'}
              min="0"
              disabled={processingFeesType === 'none'}
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
          Payment Gateway For Bangladesh
        </h2>
        <div className="flex my-4">
          <Image
            src={sslCommerzLogo}
            alt="SSLCommerz Logo"
            width={150}
            height={60}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://www.sslcommerz.com/wp-content/uploads/2019/11/footer_logo.png';
            }}
          />
        </div>
        <a
          href="https://www.sslcommerz.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          https://www.sslcommerz.com/
        </a>
      </div>
    </div>
  );
};

export default SSLCommerzConfigForm;
