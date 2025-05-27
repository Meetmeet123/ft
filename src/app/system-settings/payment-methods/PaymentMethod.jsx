"use client";

import { useState, useEffect } from "react";
import { updatePaymentDetails, updatePaymentMethod } from "./PaymentDetails";

export default function PaymentMethod({ data }) {
  const [formData, setFormData] = useState({
    payment_type: "",
    api_username: "",
    salt: "",
    api_email: "",
    paypal_demo: "",
    is_active: false,
  });

  const [initialPaymentType, setInitialPaymentType] = useState("");

  useEffect(() => {
    if (data) {
      setFormData({
        payment_type: data.payment_type || "",
        api_username: data.api_username || "",
        salt: data.salt || "",
        api_email: data.api_email || "",
        paypal_demo: data.paypal_demo || "",
        is_active: data.is_active === "yes" && true || false,
      });
      setInitialPaymentType(data.payment_type || "");
    }
  }, [data]);

  const handleChange = (e) => {
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
    console.log(payload)
    try {
      const res = await updatePaymentDetails(payload);
      console.log("Saved:", res);
    } catch (err) {
      console.log("Save Error:", err);
    } finally {
      window.location.reload(); // Reload to reflect changes
    }
  };

  const handleUpdate = async () => {
    const payload = {
      id: data.id,
      payment_type: formData.payment_type,
      status: formData.is_active,
    };
    console.log(payload)
    try {
      const res = await updatePaymentMethod(payload);
      console.log("Updated:", res);
    } catch (err) {
      console.log("Update Error:", err);
    } finally {
      window.location.reload(); // Reload to reflect changes
    }
  };

  const handleSubmit = () => {
    if (formData.payment_type === initialPaymentType) {
      handleSave();
    } else {
      handleUpdate();
    }
  };

  return (
    <div className="w-full mx-auto p-6 rounded-xl space-y-6 bg-white shadow">
      <div className="space-y-4">
        {[ 
          { label: "Payment Type", name: "payment_type" },
          { label: "Username", name: "api_username" },
          { label: "Salt", name: "salt" },
          { label: "Email", name: "api_email", type: "email" },
          { label: "Paypal", name: "paypal_demo" },
        ].map(({ label, name, type = "text" }) => (
          <div key={name} className="lg:flex md:block items-center gap-4">
            <label className="block text-sm font-medium text-gray-700 lg:w-1/4">
              {label}
            </label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
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
          className="btn btn-primary px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Save
        </button>
      </div>
    </div>
  );
}
