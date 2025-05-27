"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import PaymentGateway from "./PaymentGateway";
import PaymentMethods from "./PaymentMethod";
import { getPaymentDetails, AddPaymentDetails } from "./PaymentDetails";
import { ChevronsLeft, X } from "lucide-react";

export default function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [selectedGateway, setSelectedGateway] = useState(null);
  const [showGateway, setShowGateway] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [paymentData, setPaymentData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [addNewPayment, setAddNewPayment] = useState(false);
  const [newPaymentDetails, setNewPaymentDetails] = useState({
    payment_type: "",
    active_status: false,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPaymentDetails();
        const safeData = Array.isArray(data?.data?.data) ? data.data.data : [];
        console.log(safeData)
        setPaymentData(safeData);
        setSelectedMethod(safeData[0]?.payment_type || "");
        setLoading(false);
      } catch (err) {
        console.log(err);
        setPaymentData([]); // Ensure it's an array on error
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const paymentGateways = [
    { name: "Paypal", active: true },
    { name: "Stripe", active: false },
  ];

  const paymentGateways2 = [
    { name: "PayU", active: false },
    { name: "CCAvenue", active: false },
  ];

  // Add this just before the return in your component
  const paymentMethods = Array.isArray(paymentData) ? paymentData.map((pay) => pay.payment_type) : [];

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const res = await AddPaymentDetails(newPaymentDetails);
      console.log(res)
    }catch(err){
      console.log(err);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Head className="flex justify-between" >
        <title>Payment Methods</title>
      </Head>

      <main className="flex flex-col lg:flex-row gap-6 py-6">
        {/* Main Section */}
        <div className="w-full lg:w-[calc(100%-270px)]">
          <div className="flex justify-between items-center" >
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 mb-4">
              Payment Methods
            </h1>
            <button className="btn btn-primary" onClick={() => setAddNewPayment(!addNewPayment)} >+Add</button>
          </div>

          {addNewPayment && <div className="fixed left-1/3 w-full flex-row justify-center items-center bg-white p-6 rounded-2xl shadow-lg mb-6 z-50 w-full max-w-md space-y-4">
            <div className="flex justify-between items-center" >
              <h2>Add new Payment</h2>
              <button onClick={() => setAddNewPayment(false)} ><X/></button>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Payment Type</label>
              <input
                type="text"
                value={newPaymentDetails.payment_type}
                onChange={(e) => setNewPaymentDetails({ ...newPaymentDetails, payment_type: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-3 items-center space-x-2">
              <input
                type="checkbox"
                checked={newPaymentDetails.active_status}
                onChange={(e) => setNewPaymentDetails({ ...newPaymentDetails, active_status: e.target.checked })}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="text-sm font-medium text-gray-700">Active Status</label>
            </div>

            <div className="flex justify-end pt-2">
              <button 
              className="btn btn-primary px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-150"
              onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </div>}

          {/* Payment Method Tabs */}
          <div>
            <div
              className="
                grid
                sm:grid-cols-3
                md:grid-cols-5
                lg:grid-cols-7
                xl:grid-cols-10
                gap-2
                border-b
                border-gray-200
                pb-2
                min-w-full
              "
            >
              {paymentMethods.map((method, index) => (
                <button
                  key={method}
                  onClick={() => {
                    setSelectedMethod(method);
                    setSelectedIndex(index);
                  }}
                  className={`relative px-3 py-2 text-sm rounded-md font-medium transition
                    ${selectedMethod === method
                      ? "text-blue-600 bg-yellow-100"
                      : "text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  {method}
                  {selectedMethod === method && (
                    <div className="absolute left-0 bottom-0 h-1 w-full bg-yellow-400 rounded-b-md" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Payment Form */}
          <div className="mt-6">
            {loading ? (
              <p>Loading payment methods...</p>
            ) : paymentData.length > 0 && selectedIndex >= 0 && selectedIndex < paymentData.length ? (
              <PaymentMethods data={paymentData[selectedIndex]} />
            ) : (
              <p>No payment method data available.</p>
            )}
          </div>

        </div>

        {/* Sidebar */}
        <div className="lg:w-64 w-full ">
          {isSmallScreen ? (
            <>
              <button
                onClick={() => setShowGateway(!showGateway)}
                className="btn btn-primary w-full bg-blue-600 text-white py-2 px-4 rounded mb-4"
              >
                {showGateway ? "Hide Gateway Options" : "Show Gateway Options"}
              </button>
              {showGateway && (
                <div className="block bg-white p-4 rounded shadow-md">
                  <PaymentGateway
                    selectedGateway={selectedGateway}
                    setSelectedGateway={setSelectedGateway}
                    paymentGateways={paymentMethods}
                    paymentGateways2={paymentGateways2}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="block bg-white p-4 rounded shadow-md">
              <PaymentGateway
                selectedGateway={selectedGateway}
                setSelectedGateway={setSelectedGateway}
                paymentGateways={paymentMethods}
                paymentGateways2={paymentGateways2}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
