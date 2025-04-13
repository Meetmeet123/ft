import { useState } from "react";
import Image from "next/image";
import paytmLogo from "./assets/paytm.jpg"; // Adjust the path as necessary

const Paytm = () => {
  const [merchantId, setMerchantId] = useState('');
  const [merchantKey, setMerchantKey] = useState('');
  const [website, setWebsite] = useState('');
  const [industryType, setIndustryType] = useState('');
  const [feesType, setFeesType] = useState('none');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      merchantId,
      merchantKey,
      website,
      industryType,
      feesType,
      amount,
    });
  };

  return (
    <div className="flex flex-col md:flex-row md:space-x-45 xl:w-[100%] mx-auto">
      <form className="w-full md:w-3/5 lg:w-3/5 mb-8 md:mb-0" onSubmit={handleSubmit}>
        <div className="space-y-3">
          {/* Merchant ID */}
          <div className="flex items-center space-x-4">
            <label htmlFor="merchantId" className="w-48 font-medium">
              Merchant ID<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              id="merchantId"
              value={merchantId}
              onChange={(e) => setMerchantId(e.target.value)}
              className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Merchant Key */}
          <div className="flex items-center space-x-4">
            <label htmlFor="merchantKey" className="w-48 font-medium">
              Merchant Key<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="password"
              id="merchantKey"
              value={merchantKey}
              onChange={(e) => setMerchantKey(e.target.value)}
              className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Website */}
          <div className="flex items-center space-x-4">
            <label htmlFor="website" className="w-48 font-medium">
              Website
            </label>
            <input
              type="url"
              id="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com"
            />
          </div>

          {/* Industry Type */}
          <div className="flex items-center space-x-4">
            <label htmlFor="industryType" className="w-48 font-medium">
              Industry Type
            </label>
            <input
              type="text"
              id="industryType"
              value={industryType}
              onChange={(e) => setIndustryType(e.target.value)}
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
                  name="feesType"
                  value="none"
                  checked={feesType === "none"}
                  onChange={() => setFeesType("none")}
                  className="mr-2 h-4 w-4 text-blue-600"
                />
                None
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="feesType"
                  value="percentage"
                  checked={feesType === "percentage"}
                  onChange={() => setFeesType("percentage")}
                  className="mr-2 h-4 w-4 text-blue-600"
                />
                Percentage (%)
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="feesType"
                  value="fixed"
                  checked={feesType === "fixed"}
                  onChange={() => setFeesType("fixed")}
                  className="mr-2 h-4 w-4 text-blue-600"
                />
                Fix Amount (₹)
              </label>
            </div>
          </div>

          {/* Fee Amount */}
          <div className="flex items-center gap-15 mt-6">
            <label htmlFor="amount" className="min-w-[150px] font-medium">
              Percentage/Fix Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={feesType === "none"}
              className="w-full max-w-xs p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              placeholder={
                feesType === "percentage" ? "Enter percentage" : "Enter amount"
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
        <h2 className="text-xl text-blue-600 font-medium mb-4">Payment Gateway For India</h2>
        <div className="flex my-4">
          <Image
            src={paytmLogo}
            alt="Paytm"
            width={150}
            height={60}
            priority
          />
        </div>
        <a
          href="https://paytm.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          https://paytm.com/
        </a>
      </div>
    </div>
  );
};

export default Paytm;
