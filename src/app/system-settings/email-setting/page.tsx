"use client";
import { useState, useEffect, ChangeEvent } from "react";
import { CheckCircle } from "lucide-react";
import { getEmailSettingData } from "./EmaiDetails";

interface EmailDetails {
  email?: string;
  smtp_username?: string;
  smtp_password?: string;
  smtp_server?: string;
  smtp_port?: string;
  smtp_security?: string;
  smtp_auth?: boolean;
}

export default function EmailSetting() {
  const [emailEngine, setEmailEngine] = useState<string>("SendMail");
  const [success, setSuccess] = useState<boolean>(false);
  const [emailDetails, setEmailDetails] = useState<EmailDetails | null>(null);

  const handleSave = () => {
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getEmailSettingData();
        // setEmailDetails(data.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSettings();
  }, []);

  const handleEngineChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setEmailEngine(e.target.value);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold mb-6">Email Setting</h2>

      {success && (
        <div className="flex items-center gap-2 bg-green-100 border border-green-300 text-green-800 text-sm px-4 py-3 rounded mb-6">
          <CheckCircle size={18} />
          <span>Record Updated Successfully</span>
        </div>
      )}

      {/* Email Engine Selector */}
      <div className="mb-6">
        <label
          htmlFor="emailEngine"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email Engine <span className="text-red-500">*</span>
        </label>
        <select
          id="emailEngine"
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={emailEngine}
          onChange={handleEngineChange}
        >
          <option value="SendMail">SendMail</option>
          <option value="SMTP">SMTP</option>
          <option value="Mailgun">AWS SES</option>
        </select>
      </div>

      {/* SMTP Settings */}
      {emailEngine === "SMTP" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              defaultValue={emailDetails?.email || ""}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Username</label>
            <input
              type="text"
              defaultValue={emailDetails?.smtp_username || ""}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Password</label>
            <input
              type="password"
              defaultValue={emailDetails?.smtp_password || ""}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Server</label>
            <input
              type="text"
              defaultValue={emailDetails?.smtp_server || ""}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Port</label>
            <input
              type="text"
              defaultValue={emailDetails?.smtp_port || ""}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Security</label>
            <input
              type="text"
              defaultValue={emailDetails?.smtp_security || ""}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Auth</label>
            <select
              defaultValue={
                emailDetails?.smtp_auth === true
                  ? "ON"
                  : emailDetails?.smtp_auth === false
                    ? "OFF"
                    : ""
              }
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option>ON</option>
              <option>OFF</option>
            </select>
          </div>
        </div>
      )}

      {/* AWS SES (Mailgun) Settings */}
      {emailEngine === "Mailgun" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Access Key Id</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Secret Access Key</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-center">
        <button
          onClick={handleSave}
          className="btn btn-primary hover:bg-blue-800 text-white px-6 py-2 rounded shadow"
        >
          Save
        </button>
      </div>
    </div>
  );
}
