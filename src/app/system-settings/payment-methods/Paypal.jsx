import Image from "next/image";
import image from "./assets/paypal.png";

function Paypal({
  handleSubmit,
  selectedMethod,
  paypalUsername,
  setPaypalUsername,
  paypalPassword,
  setPaypalPassword,
  paypalSignature,
  setPaypalSignature,
  processingFeesType,
  setProcessingFeesType,
  percentageFixAmount,
  setPercentageFixAmount,
}) {
  return (
    <div className="flex flex-col md:flex-row md:space-x-45 xl:w-[100%]">
      <form className="w-full w-x5 md:w-3/5 lg:w-3/5 mb-8 md:mb-0" onSubmit={handleSubmit}>
        {selectedMethod === "Paypal" && (
          <div className="space-y-3">
            {/* Paypal Username */}
            <div className="flex items-center space-x-4">
              <label htmlFor="paypalUsername" className="w-48 font-medium">
                Paypal Username<span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                id="paypalUsername"
                value={paypalUsername}
                onChange={(e) => setPaypalUsername(e.target.value)}
                className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Paypal Password */}
            <div className="flex items-center space-x-4">
              <label htmlFor="paypalPassword" className="w-48 font-medium">
                Paypal Password<span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="password"
                id="paypalPassword"
                value={paypalPassword}
                onChange={(e) => setPaypalPassword(e.target.value)}
                className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Paypal Signature */}
            <div className="flex items-center space-x-4">
              <label htmlFor="paypalSignature" className="w-48 font-medium">
                Paypal Signature<span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                id="paypalSignature"
                value={paypalSignature}
                onChange={(e) => setPaypalSignature(e.target.value)}
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
                    value="None"
                    checked={processingFeesType === "None"}
                    onChange={() => setProcessingFeesType("None")}
                    className="mr-2 h-4 w-4 text-blue-600"
                  />
                  None
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="processingFeesType"
                    value="Percentage"
                    checked={processingFeesType === "Percentage"}
                    onChange={() => setProcessingFeesType("Percentage")}
                    className="mr-2 h-4 w-4 text-blue-600"
                  />
                  Percentage (%)
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="processingFeesType"
                    value="FixAmount"
                    checked={processingFeesType === "FixAmount"}
                    onChange={() => setProcessingFeesType("FixAmount")}
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
                  processingFeesType === "Percentage" ? "Enter percentage" : "Enter amount"
                }
              />
            </div>
          </div>
        )}

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
        <h2 className="text-l text-blue-600 font-medium mb-4">
          Multinational Payment Gateway
        </h2>
        <div className="flex my-4 w-full">
          <Image
            src={image}
            alt="PayPal"
            width={150}
            height={60}
            priority
          />
        </div>
        <a
          href="https://www.paypal.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          https://www.paypal.com
        </a>
      </div>
    </div>
  );
}

export default Paypal;
