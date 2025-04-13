"use client";
import { useState } from "react";
import { CheckCircle } from "lucide-react";

export default function EmailSetting() {
  const [emailEngine, setEmailEngine] = useState("SendMail");
  const [success, setSuccess] = useState(false);

  const handleSave = () => {
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl font-semibold mb-6">Email Setting</h2>

      {success && (
        <div className="flex items-center gap-2 bg-green-100 border border-green-300 text-green-800 text-sm px-4 py-3 rounded mb-6">
          <CheckCircle size={18} />
          <span>Record Updated Successfully</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center mb-6 gap-2 sm:gap-4">
        <label
          htmlFor="emailEngine"
          className="sm:w-48 text-sm font-medium text-gray-700"
        >
          Email Engine <span className="text-red-500">*</span>
        </label>
        <div className="w-full md:w-80 lg:w-[32rem] xl:w-[40rem]">
          <select
            id="emailEngine"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={emailEngine}
            onChange={(e) => setEmailEngine(e.target.value)}
          >
            <option value="SendMail">SendMail</option>
            <option value="SMTP">SMTP</option>
            <option value="Mailgun">Mailgun</option>
          </select>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSave}
          className="btn btn-primary bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
}
