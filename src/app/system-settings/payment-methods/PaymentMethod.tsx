"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { updatePaymentDetails, updatePaymentMethod } from "./PaymentDetails";

interface PaymentData {
  id: number;
  payment_type?: string;
  api_username?: string;
  salt?: string;
  api_email?: string;
  paypal_demo?: string;
  is_active?: string;
  active_status?: boolean; // Added for consistency
}

interface FormState {
  payment_type: string;
  api_username: string;
  salt: string;
  api_email: string;
  paypal_demo: string;
  is_active: boolean;
}

interface Props {
  data: PaymentData;
  toast: {
    success: (message: string) => void;
    error: (message: string) => void;
  };
}

export default function PaymentMethod({ data, toast }: Props) {
  const [formData, setFormData] = useState<FormState>({
    payment_type: "",
    api_username: "",
    salt: "",
    api_email: "",
    paypal_demo: "",
    is_active: false,
  });

  const [initialPaymentType, setInitialPaymentType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (data && typeof data === 'object') {
      // Handle both is_active (string) and active_status (boolean)
      const isActive = data.is_active === "yes" || 
                      data.is_active === "true" || 
                      data.active_status === true;

      setFormData({
        payment_type: data.payment_type || "",
        api_username: data.api_username || "",
        salt: data.salt || "",
        api_email: data.api_email || "",
        paypal_demo: data.paypal_demo || "",
        is_active: isActive,
      });
      setInitialPaymentType(data.payment_type || "");
    }
  }, [data]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    const payload = {
      payment_type: formData.payment_type,
      status: formData.is_active,
    };
    try {
      setIsLoading(true);
      const res = await updatePaymentDetails(payload);
      console.log("Saved:", res);
      
      // Check response status and show appropriate toast message
      if ((res as any)?.status === 200 || (res as any)?.success) {
        toast.success("Payment details saved successfully!");
      } else {
        toast.error("Failed to save payment details. Please try again.");
      }
      
      return res;
    } catch (err) {
      console.error("Save Error:", err);
      toast.error("An error occurred while saving payment details.");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!data?.id) {
      console.error("No ID found for update operation");
      toast.error("Cannot update: Payment ID not found.");
      return;
    }

    const payload = {
      id: data.id,
      payment_type: formData.payment_type,
      status: formData.is_active,
    };
    try {
      setIsLoading(true);
      const res = await updatePaymentMethod(payload);
      console.log("Updated:", res);
      
      // Check response status and show appropriate toast message
      if ((res as any)?.status === 200 || (res as any)?.success) {
        toast.success("Payment method updated successfully!");
      } else {
        toast.error("Failed to update payment method. Please try again.");
      }
      
      return res;
    } catch (err) {
      console.error("Update Error:", err);
      toast.error("An error occurred while updating payment method.");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      if (formData.payment_type === initialPaymentType) {
        await handleSave();
      } else {
        await handleUpdate();
      }
      // Optional: Show success message instead of reload
      // window.location.reload();
    } catch (err) {
      // Handle error (show error message to user)
      console.error("Submit error:", err);
    }
  };

  // Add validation for required data
  if (!data || typeof data !== 'object') {
    return (
      <div className="w-full mx-auto p-6 rounded-xl bg-white shadow">
        <div className="text-center py-8">
          <p className="text-red-500">Error: Invalid payment data received</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-6 rounded-xl space-y-6 bg-white shadow">
      <div className="space-y-4">
        {[
          { label: "Payment Type", name: "payment_type", required: true },
          { label: "Username", name: "api_username" },
          { label: "Salt", name: "salt" },
          { label: "Email", name: "api_email", type: "email" },
          { label: "Paypal", name: "paypal_demo" },
        ].map(({ label, name, type = "text", required = false }) => (
          <div key={name} className="lg:flex md:block items-center gap-4">
            <label className="block text-sm font-medium text-gray-700 lg:w-1/4">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
              type={type}
              name={name}
              value={String(formData[name as keyof FormState] ?? "")}
              onChange={handleChange}
              required={required}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        ))}

        <div className="lg:flex md:block items-center gap-4">
          <label className="block text-sm font-medium text-gray-700 lg:w-1/4">
            Active
          </label>
          <input
            type="checkbox"
            name="is_active"
            checked={formData.is_active}
            onChange={handleChange}
            className="h-5 w-5 text-blue-600 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="text-right">
        <button
          onClick={handleSubmit}
          disabled={isLoading || !formData.payment_type.trim()}
          className="btn btn-primary px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}