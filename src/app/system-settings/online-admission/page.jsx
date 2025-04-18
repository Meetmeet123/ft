"use client";
import React, { useState } from "react";
import {
  Upload,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Superscript,
  Subscript,
  Type,
  Link,
  Image,
  Table,
  List,
  ListOrdered,
  Indent,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  ChevronDown,
} from "lucide-react";
import TermsAndConditions from "./Terms&Condition";
import AdmisionInstructions from "./AdmisionInstruction";
import AdmisionField from "./AdmisionField";
import { on } from "events";

export default function OnlineAdmissionSettings() {
  const [activeTab, setActiveTab] = useState("Online Admission Form Setting");
  const [onlineAdmissionEnabled, setOnlineAdmissionEnabled] = useState(true);
  const [paymentOptionEnabled, setPaymentOptionEnabled] = useState(true);
  const [formFees, setFormFees] = useState("100.00");
  const [instructions, setInstructions] = useState(`General Instruction:- These instructions pertain to online application for admission to Mount Carmel School for the academic year 2024-2025. In the remainder of these instructions, a "Mount Carmel School".
1. To fill online admission form, Basic Details like as (Class, First Name, Last Name, Gender, Date of Birth, Mobile Number, Email) etc.
2. Filling in admission application form and uploading documents and then click on the Submit button.
3. After submitting form, this will redirect you in Online Admission Review Details page where you can check your details what you have filled previously.`);

  return (
    <div className="bg-white border border-gray-200 rounded-md">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <h1 className="text-xl font-medium text-gray-700">Online Admission</h1>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {["Online Admission Form Setting", "Online Admission Fields Setting"].map((tab) => (
          <button
            key={tab}
            className={`relative px-4 py-3 font-medium focus:outline-none ${
              activeTab === tab
                ? "text-blue-600 font-medium after:absolute after:bottom-0 after:left-0 after:h-1 after:w-full after:bg-blue-600"
                    : "text-gray-600"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      { activeTab === "Online Admission Form Setting" && 
          <div className="p-4 space-y-6">
          {/* Online Admission Toggle */}
          <div className="flex items-center justify-between">
            <div className="font-medium">Online Admission</div>
            <label className="relative inline-block w-12 h-6">
              <input
                type="checkbox"
                className="sr-only"
                checked={onlineAdmissionEnabled}
                onChange={() => setOnlineAdmissionEnabled(!onlineAdmissionEnabled)}
              />
              <div
                className={`absolute top-0 left-0  right-0 bottom-0 rounded-full transition-all duration-300 ${
                  onlineAdmissionEnabled ? "bg-green-500" : "bg-gray-300"
                }`}
              />
              <div
                className={`absolute top-1 h-4 w-4 bg-white rounded-full shadow transition-all duration-300 ${
                  onlineAdmissionEnabled ? "left-7" : "left-1"
                }`}
              />
            </label>
          </div>
  
          {/* Online Admission Payment Option */}
          
          {onlineAdmissionEnabled &&
              <div className="flex items-center justify-between">
              <div className="font-medium">Online Admission Payment Option</div>
              <label className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={paymentOptionEnabled}
                  onChange={() => setPaymentOptionEnabled(!paymentOptionEnabled)}
                />
                <div
                  className={`absolute top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${
                    paymentOptionEnabled ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
                <div
                  className={`absolute top-1 h-4 w-4 bg-white rounded-full shadow transition-all duration-300 ${
                    paymentOptionEnabled ? "left-7" : "left-1"
                  }`}
                />
              </label>
            </div>
          }
  
          {/* Form Fees */}
          {(paymentOptionEnabled && onlineAdmissionEnabled) &&
            <div className="flex items-center justify-between">
              <div className="font-medium">Online Admission Form Fees ($)</div>
                <input
                  type="text"
                  className="border border-gray-300 rounded p-2 w-32 text-right"
                  value={formFees}
                  onChange={(e) => setFormFees(e.target.value)}
                />
          </div>
          }
  
          {/* Upload Form */}
          {onlineAdmissionEnabled &&
            <div className="flex flex-col gap-2">
            <div className="font-medium">Upload Admission Application Form</div>
            <div className="flex">
              <label className="flex items-center border border-gray-300 rounded-l px-4 py-2 bg-gray-50 text-gray-500 cursor-pointer">
                <Upload size={16} className="mr-2" />
                <span>Choose file or drag here</span>
                <input type="file" className="hidden" />
              </label>
              <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-r">
                <Upload size={16} />
              </button>
            </div>
          </div>
          }
  
          {/* Instructions */}
          {onlineAdmissionEnabled && <AdmisionInstructions/>}
          {onlineAdmissionEnabled && <TermsAndConditions/>}

          <div className=" flex justify-end">
            <button className="btn btn-primary items-end" >
              Save
            </button>
          </div>
        </div>
      }
      {activeTab === "Online Admission Fields Setting" &&
      <AdmisionField/>
      }
    </div>
  );
}
