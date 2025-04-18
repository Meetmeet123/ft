import { useState } from "react";
import Image from "next/image";
import instamojoLogo from "./assets/instamojo.png"; // Adjust the path as necessary

export default function InstamojoConfigForm() {
  const [formData, setFormData] = useState({
    privateApiKey: "",
    privateAuthToken: "",
    privateSalt: "",
    feeType: "none",
    feeAmount: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRadioChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      feeType: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="flex flex-col md:flex-row md:space-x-40 xl:w-[100%] mx-auto">
      <form className="w-full md:w-3/5 lg:w-3/5 mb-8 md:mb-0" onSubmit={handleSubmit}>
        <div className="space-y-3">
          {/* API Key */}
          <div className="flex items-center space-x-4">
            <label htmlFor="privateApiKey" className="w-48 font-medium">
              Private API Key<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              id="privateApiKey"
              name="privateApiKey"
              value={formData.privateApiKey}
              onChange={handleInputChange}
              className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Auth Token */}
          <div className="flex items-center space-x-4">
            <label htmlFor="privateAuthToken" className="w-48 font-medium">
              Private Auth Token<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              id="privateAuthToken"
              name="privateAuthToken"
              value={formData.privateAuthToken}
              onChange={handleInputChange}
              className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Salt */}
          <div className="flex items-center space-x-4">
            <label htmlFor="privateSalt" className="w-48 font-medium">
              Private Salt<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              id="privateSalt"
              name="privateSalt"
              value={formData.privateSalt}
              onChange={handleInputChange}
              className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Fee Type */}
          <div className="flex items-center gap-6">
            <span className="min-w-[200px] font-medium">Processing Fees Type</span>
            <div className="flex gap-10">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="feeType"
                  value="none"
                  checked={formData.feeType === "none"}
                  onChange={handleRadioChange}
                  className="mr-2 h-4 w-4 text-blue-600"
                />
                None
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="feeType"
                  value="percentage"
                  checked={formData.feeType === "percentage"}
                  onChange={handleRadioChange}
                  className="mr-2 h-4 w-4 text-blue-600"
                />
                Percentage (%)
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="feeType"
                  value="fixAmount"
                  checked={formData.feeType === "fixAmount"}
                  onChange={handleRadioChange}
                  className="mr-2 h-4 w-4 text-blue-600"
                />
                Fix Amount (₹)
              </label>
            </div>
          </div>

          {/* Fee Amount */}
          <div className="flex items-center gap-15 mt-6">
            <label htmlFor="feeAmount" className="min-w-[150px] font-medium">
              Percentage/Fix Amount
            </label>
            <input
              type="number"
              id="feeAmount"
              name="feeAmount"
              value={formData.feeAmount}
              onChange={handleInputChange}
              disabled={formData.feeType === "none"}
              className="w-full max-w-xs p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              placeholder={
                formData.feeType === "percentage" ? "Enter percentage" : "Enter amount"
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
      <div className="w-full md:w-2/5 lg:w-1/5 border border-gray-200 rounded p-6 mt-6 md:mt-0">
        <h2 className="text-xl text-sky-700 font-medium mb-4">Payment Gateway For India</h2>
        <div className="flex my-4">
          <Image
            src={instamojoLogo}
            alt="Instamojo"
            className="h-10 mb-2"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                'data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 viewBox%3D%220 0 120 40%22%3E%3Crect width%3D%22120%22 height%3D%2240%22 fill%3D%22%23fff%22%2F%3E%3Ctext x%3D%2260%22 y%3D%2225%22 font-family%3D%22Arial%22 font-size%3D%2212%22 fill%3D%22%23000%22 text-anchor%3D%22middle%22%3EInstamojo%3C%2Ftext%3E%3C%2Fsvg%3E';
            }}
          />
        </div>
        <a
          href="https://www.instamojo.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-600 hover:underline"
        >
          https://www.instamojo.com/
        </a>
      </div>
    </div>
  );
}
