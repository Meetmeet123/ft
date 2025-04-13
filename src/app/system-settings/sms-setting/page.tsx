'use client';
import React, { useState } from 'react';
import ClickatellSmsGateway from './ClickatellSmsGateway';
import TwilioSmsGateway from './TwilioSmsGateway';
import MSG91 from './MSG91Form';
import TextLocal from './TextLocal';
import SmsCountry from './SmsCountry';
import BulkSms from './BulkSms';
import MobiReach from './MobiReach';
import NexmoForm from './NexmoForm';
import AfricasTalking from './AfricasTalking';
import SmsEgypt from './SmsEgypt';
import CustomSmsGateway from './CustomSmsGateway'

const tabs = [
  "Clickatell Sms Gateway",
  "Twilio SMS Gateway",
  "MSG91",
  "Text Local",
  "SMS Country",
  "Bulk SMS",
  "Mobi Reach",
  "Nexmo",
  "AfricasTalking",
  "SMS Egypt",
  "Custom SMS Gateway"
];

export default function SmsSettingsPage() {
  const [activeTab, setActiveTab] = useState("Clickatell Sms Gateway");

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="bg-white shadow rounded p-4 relative">
        <h2 className="text-2xl font-semibold mb-4">SMS Setting</h2>

        {/* Tabs */}
        <div className="flex flex-wrap border-b">
  {tabs.map((tab) => (
    <button
      key={tab}
      onClick={() => setActiveTab(tab)}
      className={`relative px-2 py-2 text-sm transition-all duration-300
        ${
          activeTab === tab
            ? 'text-black font-medium after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-yellow-400'
            : 'text-gray-500 hover:text-black'
        }`}
    >
      {tab}
    </button>
  ))}
</div>



        {/* Tab Content */}
        {activeTab === "Clickatell Sms Gateway" && <ClickatellSmsGateway />}
        {activeTab === "Twilio SMS Gateway" && <TwilioSmsGateway />}
        {activeTab === "MSG91" && <MSG91 />}
        {activeTab === "Text Local" && <TextLocal />}
        {activeTab === "SMS Country" && <SmsCountry />}
        {activeTab === "Bulk SMS" && <BulkSms/>}
        {activeTab === "Mobi Reach" && <MobiReach/>}
        {activeTab === "Nexmo" && <NexmoForm/>}
        {activeTab === "AfricasTalking" && <AfricasTalking/>}
        {activeTab === "SMS Egypt" && <SmsEgypt/>}
        {activeTab === "Custom SMS Gateway" && <CustomSmsGateway/>}
      </div>
    </div>
  );
}
