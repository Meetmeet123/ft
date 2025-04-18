import { useState } from 'react';
import Image from 'next/image';
import PayUImg from './assets/paym.png'; // Adjust the path as necessary

export default function PayUConfigForm() {
  const [formData, setFormData] = useState({
    payuKey: '',
    payuSalt: '',
    feeType: 'none',
    feeAmount: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRadioChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      feeType: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
  };

  return (
    <div className="flex flex-col md:flex-row md:space-x-40 xl:w-[100%] mx-auto px-4 pt-6">
      {/* Form Section */}
      <form onSubmit={handleSubmit} className="w-full md:w-3/5 lg:w-3/5 mb-8 md:mb-0 space-y-4">
        {/* PayU Key */}
        <div className="flex items-center space-x-4">
          <label htmlFor="payuKey" className="w-48 font-medium">
            PayU Money Key<span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            id="payuKey"
            name="payuKey"
            value={formData.payuKey}
            onChange={handleInputChange}
            className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* PayU Salt */}
        <div className="flex items-center space-x-4">
          <label htmlFor="payuSalt" className="w-48 font-medium">
            PayU Money Salt<span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            id="payuSalt"
            name="payuSalt"
            value={formData.payuSalt}
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
                checked={formData.feeType === 'none'}
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
                checked={formData.feeType === 'percentage'}
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
                checked={formData.feeType === 'fixAmount'}
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
            disabled={formData.feeType === 'none'}
            className="w-full max-w-xs p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            placeholder={
              formData.feeType === 'percentage' ? 'Enter percentage' : 'Enter amount'
            }
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-10">
          <button
            type="submit"
            className="btn btn-primary text-white px-6 py-2 rounded"
          >
            Save
          </button>
        </div>
      </form>

      {/* Info Section */}
      <div className="w-full md:w-2/5 lg:w-1/5 border border-gray-200 rounded p-6 mt-8 md:mt-0">
        <h2 className="text-xl text-blue-600 font-medium mb-4">
          Payment Gateway For India
        </h2>
        <div className="flex my-4">
          <Image
            src={PayUImg}
            alt="PayU Money"
            width={150}
            height={60}
            priority
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                'data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 viewBox%3D%220 0 120 40%22%3E%3Crect width%3D%22120%22 height%3D%2240%22 fill%3D%22%23fff%22%2F%3E%3Ctext x%3D%2260%22 y%3D%2225%22 font-family%3D%22Arial%22 font-size%3D%2212%22 fill%3D%22%2395ca3e%22 text-anchor%3D%22middle%22%3EPayU Money%3C%2Ftext%3E%3C%2Fsvg%3E';
            }}
          />
        </div>
        <a
          href="https://www.payumoney.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          https://www.payumoney.com
        </a>
      </div>
    </div>
  );
}
