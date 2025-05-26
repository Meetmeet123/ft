"use client";
import React, { useState } from "react";
import AdmissionEnquiryForm from "./admissionEnquiryForm/AdmissionEnquiryForm";
import AdmissionEnquiryList from "./admissionEnquiryTable/AdmissionEnquiryList";

const AdmissionEnquiry = () => {
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSearch = (data) => {
    setFilteredEnquiries(data);
  };

  const refreshList = () => {
    setFilteredEnquiries([]);
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="ml-[150px] mt-5">
      {/* Form Section */}
      <div className="shadow-lg border-2 border-[#164f63]/60 shadow-gray-300 rounded-2xl mb-5">
        <div className="text-[#444] text-xl font-extrabold block p-4 relative">
          <h3>Select Criteria</h3>
        </div>
        <AdmissionEnquiryForm 
          onSearch={handleSearch} 
          refreshList={refreshList} 
        />
      </div>

      {/* Table Section */}
      <div className="shadow-lg border-2 border-[#164f63]/60 shadow-gray-300 rounded-2xl mb-5">
        <div className="text-[#444] text-xl font-extrabold block p-4 relative border-b-2 border-[#f4f4f4]">
          <h3>Admission Enquiry</h3>
        </div>
        <div className="p-5">
          <AdmissionEnquiryList 
            key={refreshKey}
            filteredData={filteredEnquiries}
          />
        </div>
      </div>
    </div>
  );
};

export default AdmissionEnquiry;