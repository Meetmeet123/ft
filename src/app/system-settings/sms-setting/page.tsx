'use client';
import React, { useState, useEffect, useRef } from 'react';
import DisplayComponent from './TwilioSmsGateway';
import { getSmsDetails } from './SmsDetails';
import NewPaymentMethod from './NewPaymentMethod';

type SmsTab = {
  name: string;
  // Add other properties expected from each SMS entry
};

export default function SmsSettingsPage() {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [smsDetails, setSmsDetails] = useState<SmsTab[]>([]);
  const [tabHeading, setTabHeading] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [addNewMethod, setAddNewMethod] = useState<boolean>(false);
  const [displayKey, setDisplayKey] = useState<number>(0);

  const currentDataRef = useRef<SmsTab | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = (await getSmsDetails()) as { data?: { data?: SmsTab[] } }; // { data: { data: SmsTab[] } }
        const dataArray: SmsTab[] = response?.data?.data || [];
        console.log(dataArray)
        if (Array.isArray(dataArray) && dataArray.length > 0) {
          const tabs = dataArray.map((tab) => tab.name);
          setSmsDetails(dataArray);
          setTabHeading(tabs);
          setActiveTab(tabs[0]);
          setActiveIndex(0);
          currentDataRef.current = dataArray[0];
        } else {
          console.warn('No valid SMS gateway data found.');
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (smsDetails.length > 0 && smsDetails[activeIndex]) {
      currentDataRef.current = smsDetails[activeIndex];
      setDisplayKey(prev => prev + 1);
    }
  }, [activeIndex, smsDetails]);

  const handleTabClick = (tab: string, index: number) => {
    setActiveTab(tab);
    setActiveIndex(index);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="bg-white shadow rounded p-4 relative">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold mb-4">SMS Setting</h2>
          <button
            className="btn btn-primary"
            onClick={() => setAddNewMethod(prev => !prev)}
          >
            {addNewMethod ? 'Close' : 'Add+'}
          </button>
        </div>

        {/* Tabs */}
        {tabHeading.length > 0 ? (
          <div className="flex flex-wrap border-b">
            {tabHeading.map((tab, index) => (
              <button
                key={index}
                onClick={() => handleTabClick(tab, index)}
                className={`relative px-2 py-2 text-sm transition-all duration-300 ${activeIndex === index
                    ? 'text-black font-medium after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-yellow-400'
                    : 'text-gray-500 hover:text-black'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-500 mt-2">No SMS Gateways available</div>
        )}

        {/* Tab Content */}
        <div className="mt-4">
          {activeTab && smsDetails.length > 0 && smsDetails[activeIndex] && (
            <DisplayComponent
              key={displayKey}
              twilio={smsDetails[activeIndex]}
            />
          )}
        </div>

      </div>

      {/* Add New Method Modal */}
      {addNewMethod && (
        <NewPaymentMethod onClose={() => setAddNewMethod(false)} />
      )}
    </div>
  );
}
