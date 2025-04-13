import { useState } from "react";
import Image from "next/image";
import paystackLogo from "./assets/paystack.png"; // Adjust the path as necessary

const Paystack = () => {
  const [secretKey, setSecretKey] = useState("sk_test_cd0be6933536323c671f994cc4e85bec4f15b83");
  const [feesType, setFeesType] = useState("percentage");
  const [amount, setAmount] = useState("20");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ secretKey, feesType, amount });
  };

  return (
    <div className="flex flex-col md:flex-row md:space-x-45 xl:w-[100%] mx-auto">
      <form className="w-full md:w-3/5 lg:w-1 mb-8 md:mb-0" onSubmit={handleSubmit}>
        <div className="space-y-3">
          {/* Secret Key */}
          <div className="flex items-center space-x-4">
            <label htmlFor="secretKey" className="w-48 font-medium">
              Paystack Secret Key<span className="text-red-500 ml-1">*</span>
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

          {/* Fees Type */}
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
                Fix Amount (£)
              </label>
            </div>
          </div>

          {/* Amount */}
          <div className="flex items-center gap-15 mt-6">
            <label htmlFor="amount" className="min-w-[150px] font-medium">
              {feesType === "percentage" ? "Percentage (%)" : "Fix Amount (£)"}
            </label>
            <input
              type="number"
              id="amount"
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

        {/* Submit */}
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
          Payment Gateway For African Countries
        </h2>
        <div className="flex my-4">
          <Image
            src={paystackLogo}
            alt="Paystack"
            width={150}
            height={60}
            priority
            onError={(e) => {
              e.target.src =
                "data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 viewBox%3D%220 0 120 40%22%3E%3Crect width%3D%22120%22 height%3D%2240%22 fill%3D%22%23fff%22%2F%3E%3Ctext x%3D%2260%22 y%3D%2225%22 font-family%3D%22Arial%22 font-size%3D%2212%22 fill%3D%22%23000%22 text-anchor%3D%22middle%22%3EPaystack%3C%2Ftext%3E%3C%2Fsvg%3E";
            }}
          />
        </div>
        <a
          href="https://paystack.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          https://paystack.com/
        </a>
      </div>
    </div>
  );
};

export default Paystack;
