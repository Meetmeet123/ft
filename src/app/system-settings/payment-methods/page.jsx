"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import Paypal from "./Paypal";
import Stripe from "./Stripe";
import PayU from "./PayU";
import CCAvenueConfigForm from "./CCAvenue";
import InstamojoConfigForm from "./InstaMojo";
import PayStack from "./PayStack";
import RazorpayGatewayForm from "./RazorPay";
import Paytm from "./Paytm";
import MidtransGatewayForm from "./MidTrans";
import PesaPal from "./PesaPal";
import PaymentGateway from "./PaymentGateway";
import FlutterwaveConfigForm from "./FlutterWave";
import IPayConfigForm from "./IPay";
import JazzCashConfigForm from "./JazzCash";
import BillplzConfigForm from "./Billza";
import SSLCommerzConfigForm from "./SSLCommerze";
import WalkingmConfigForm from "./Walkingm";
import MollieConfigForm from "./Mollie";
import CashfreeConfigForm from "./Cashfree";
import PayFast from "./PayFast";
import ToyyibPay from "./ToyyibPay";
import TwoCheckoutForm from "./TwoCheckout";
import Skrill from "./Skrill";
import Payhere from "./PayHere";
import OnePay from "./OnePay";

export default function PaymentMethods() {
  const [selectedMethod, setSelectedMethod] = useState("Paypal");
  const [processingFeesType, setProcessingFeesType] = useState("None");
  const [paypalUsername, setPaypalUsername] = useState("");
  const [paypalPassword, setPaypalPassword] = useState("");
  const [paypalSignature, setPaypalSignature] = useState("");
  const [percentageFixAmount, setPercentageFixAmount] = useState("");
  const [selectedGateway, setSelectedGateway] = useState(null);
  const [showGateway, setShowGateway] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

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

  const paymentMethods = [
    "Paypal", "Stripe", "PayU", "CCAvenue", "InstaMojo", "Paystack",
    "Razorpay", "Paytm", "Midtrans", "Pesapal", "Flutter Wave",
    "iPay Africa", "JazzCash", "Billplz", "SSLCommerz", "Walkingm",
    "Mollie", "Cashfree", "Payfast", "ToyyibPay", "Twocheckout",
    "Skrill", "Payhere", "Onepay"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Payment method settings saved");
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Payment Methods</title>
      </Head>

      <main className="flex flex-col lg:flex-row gap-6 py-6">
        {/* Main Section */}
        <div className="w-full lg:w-[calc(100%-270px)]">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 mb-4">
            Payment Methods
          </h1>

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
              {paymentMethods.map((method) => (
                <button
                  key={method}
                  onClick={() => setSelectedMethod(method)}
                  className={`relative px-3 py-2 text-sm rounded-md font-medium transition
                    ${selectedMethod === method
                      ? "text-blue-600 bg-yellow-100"
                      : "text-gray-600 hover:bg-gray-100"}`}
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
            {selectedMethod === "Paypal" && (
              <Paypal
                selectedMethod={selectedMethod}
                paypalUsername={paypalUsername}
                setPaypalUsername={setPaypalUsername}
                paypalPassword={paypalPassword}
                setPaypalPassword={setPaypalPassword}
                paypalSignature={paypalSignature}
                setPaypalSignature={setPaypalSignature}
                processingFeesType={processingFeesType}
                setProcessingFeesType={setProcessingFeesType}
                percentageFixAmount={percentageFixAmount}
                setPercentageFixAmount={setPercentageFixAmount}
                handleSubmit={handleSubmit}
              />
            )}
            {selectedMethod === "Stripe" && <Stripe />}
            {selectedMethod === "PayU" && <PayU />}
            {selectedMethod === "CCAvenue" && <CCAvenueConfigForm />}
            {selectedMethod === "InstaMojo" && <InstamojoConfigForm />}
            {selectedMethod === "Paystack" && <PayStack />}
            {selectedMethod === "Razorpay" && <RazorpayGatewayForm />}
            {selectedMethod === "Paytm" && <Paytm />}
            {selectedMethod === "Midtrans" && <MidtransGatewayForm />}
            {selectedMethod === "Pesapal" && <PesaPal />}
            {selectedMethod === "Flutter Wave" && <FlutterwaveConfigForm />}
            {selectedMethod === "iPay Africa" && <IPayConfigForm />}
            {selectedMethod === "JazzCash" && <JazzCashConfigForm />}
            {selectedMethod === "Billplz" && <BillplzConfigForm />}
            {selectedMethod === "SSLCommerz" && <SSLCommerzConfigForm />}
            {selectedMethod === "Walkingm" && <WalkingmConfigForm />}
            {selectedMethod === "Mollie" && <MollieConfigForm />}
            {selectedMethod === "Cashfree" && <CashfreeConfigForm />}
            {selectedMethod === "Payfast" && <PayFast />}
            {selectedMethod === "ToyyibPay" && <ToyyibPay />}
            {selectedMethod === "Twocheckout" && <TwoCheckoutForm />}
            {selectedMethod === "Skrill" && <Skrill />}
            {selectedMethod === "Payhere" && <Payhere />}
            {selectedMethod === "Onepay" && <OnePay />}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-64 w-full">
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
                    paymentGateways={paymentGateways}
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
                paymentGateways={paymentGateways}
                paymentGateways2={paymentGateways2}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
