import { useState, ChangeEvent } from "react";
import { uploadData } from "./SmsDetails";

interface PaymentData {
  type: string;
  status: boolean;
  name: string;
  api_id: string;
  authkey: string;
  senderid: string;
  contact: string;
  username: string;
  uri: string;
  password: string;
  is_active: boolean;
}

interface NewPaymentMethodProps {
  onClose: () => void;
  toast: {
    success: (message: string) => void;
    error: (message: string) => void;
  };
}

function NewPaymentMethod({ onClose, toast }: NewPaymentMethodProps) {
  const [newPayment, setNewPayment] = useState<PaymentData>({
    type: "",
    status: true,
    name: "",
    api_id: "",
    authkey: "",
    senderid: "",
    contact: "",
    username: "",
    uri: "",
    password: "",
    is_active: true,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setNewPayment((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePaymentChanges = async () => {
    try {
      const res = await uploadData(newPayment);
      console.log(res);
      if (typeof res === "object" && res !== null && "status" in res && (res as any).status) {
        toast.success("SMS Gateway added successfully!");
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add SMS Gateway. Please try again.");
    } finally {
      onClose();
    }
  };

  return (
    <div className="fixed top-20 left-0 right-0 bottom-0 z-50 bg-opacity-80 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative max-h-[80vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4">Add New Payment Method</h2>

        <div className="space-y-4">
          {Object.entries(newPayment).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <label className="capitalize font-medium mb-1">{key}</label>
              {typeof value === "boolean" ? (
                <input
                  type="checkbox"
                  name={key}
                  checked={value}
                  onChange={handleChange}
                  className="w-5 h-5"
                />
              ) : (
                <input
                  type={key === "password" ? "password" : "text"}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className="border border-gray-300 rounded px-3 py-2"
                />
              )}
            </div>
          ))}
        </div>

        <button
          onClick={handlePaymentChanges}
          className="btn btn-primary mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default NewPaymentMethod;