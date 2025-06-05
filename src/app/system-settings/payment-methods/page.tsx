"use client";
import { useState, useEffect, FormEvent } from "react";
import Head from "next/head";
import PaymentGateway from "./PaymentGateway";
import PaymentMethods from "./PaymentMethod";
import { getPaymentDetails, AddPaymentDetails } from "./PaymentDetails";
import { X } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";

interface PaymentDetail {
  id: number;
  payment_type: string;
  active_status: boolean;
  api_username?: string;
  salt?: string;
  api_email?: string;
  paypal_demo?: string;
  is_active?: string;
  [key: string]: any;
}


export default function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [selectedGateway, setSelectedGateway] = useState<string | null>(null);
  const [showGateway, setShowGateway] = useState<boolean>(false);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const [paymentData, setPaymentData] = useState<PaymentDetail[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [addNewPayment, setAddNewPayment] = useState<boolean>(false);
  const [newPaymentDetails, setNewPaymentDetails] = useState<PaymentDetail>({
    id: 0,
    payment_type: "",
    active_status: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPaymentDetails();
        const safeData =
          data &&
          typeof data === "object" &&
          "data" in data &&
          data.data &&
          typeof data.data === "object" &&
          "data" in data.data &&
          Array.isArray((data.data as any).data)
            ? (data.data as { data: PaymentDetail[] }).data
            : [];
        setPaymentData(safeData);
        if (safeData.length > 0) {
          setSelectedMethod(safeData[0]?.payment_type || "");
          setSelectedIndex(0);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching payment data:", err);
        setPaymentData([]);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
  e.preventDefault();
  try {
    const res = await AddPaymentDetails(newPaymentDetails);
    if (res.status === 200) {
      toast.success("New Payment Method added");
      setAddNewPayment(false);
      setNewPaymentDetails({ id: 0, payment_type: "", active_status: false });
      window.location.reload();
    } else {
      toast.error("Failed to add Payment Method. Please try again.");
    }
  } catch {
    toast.error("Payment Method cannot be added");
  }
};

  const paymentMethods = paymentData.map((pay) => pay.payment_type);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Payment Methods</title>
      </Head>

      <ToastContainer />
      <main className="flex flex-col lg:flex-row gap-6 py-6">
        {/* Left/Main Panel */}
        <div className="w-full lg:flex-1">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
              Payment Methods
            </h1>
            <button
              onClick={() => setAddNewPayment(!addNewPayment)}
              className="btn btn-primary text-white font-medium px-4 py-2 rounded-md transition"
            >
              + Add
            </button>
          </div>

          {/* Add Payment Modal */}
          {addNewPayment && (
            <div className="fixed inset-0 z-50 bg-opacity-40 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Add New Payment</h2>
                  <button
                    onClick={() => setAddNewPayment(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Payment Type
                    </label>
                    <input
                      type="text"
                      value={newPaymentDetails.payment_type}
                      onChange={(e) =>
                        setNewPaymentDetails({
                          ...newPaymentDetails,
                          payment_type: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="Enter payment type"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={newPaymentDetails.active_status}
                      onChange={(e) =>
                        setNewPaymentDetails({
                          ...newPaymentDetails,
                          active_status: e.target.checked,
                        })
                      }
                      className="h-5 w-5 text-blue-600 border-gray-300 rounded"
                    />
                    <label className="text-sm font-medium text-gray-700">
                      Active Status
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={() => setAddNewPayment(false)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="btn btn-primary text-white px-4 py-2 rounded-md"
                    disabled={!newPaymentDetails.payment_type.trim()}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Payment Method Tabs */}
          {paymentMethods.length > 0 && (
            <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 border-b pb-2">
              {paymentMethods.map((method, index) => (
                <button
                  key={`${method}-${index}`}
                  onClick={() => {
                    setSelectedMethod(method);
                    setSelectedIndex(index);
                  }}
                  className={`text-sm px-3 py-2 rounded-md font-medium transition relative
                    ${selectedMethod === method
                      ? "text-blue-600 bg-yellow-100"
                      : "text-gray-700 hover:bg-gray-100"}`}
                >
                  {method}
                  {selectedMethod === method && (
                    <span className="absolute bottom-0 left-0 h-1 w-full bg-yellow-400 rounded-b-md" />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Main Content */}
          <div className="mt-6">
            {loading ? (
              <p className="text-center text-gray-500 py-8">
                Loading payment methods...
              </p>
            ) : paymentData.length > 0 &&
              selectedIndex >= 0 &&
              selectedIndex < paymentData.length ? (
              <PaymentMethods data={paymentData[selectedIndex]} toast={toast} />
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No payment method data available.</p>
                <p className="text-sm text-gray-400 mt-2">
                  Click the +Add button to create your first payment method.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-64 w-full">
          {isSmallScreen ? (
            <>
              <button
                onClick={() => setShowGateway(!showGateway)}
                className="bg-blue-600 hover:bg-blue-700 text-white w-full px-4 py-2 rounded-md mb-4"
              >
                {showGateway ? "Hide Gateways" : "Show Gateways"}
              </button>
              {showGateway && (
                <div className="bg-white p-4 rounded shadow">
                  <PaymentGateway
                    selectedGateway={selectedGateway ?? ""}
                    setSelectedGateway={setSelectedGateway}
                    paymentGateways={paymentMethods}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="bg-white p-4 rounded shadow">
              <PaymentGateway
                selectedGateway={selectedGateway ?? ""}
                setSelectedGateway={setSelectedGateway}
                paymentGateways={paymentMethods}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
