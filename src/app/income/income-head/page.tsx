"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import IncomeHeadFrom from "./IncomeHeadFrom/IncomeHeadFrom";
import IncomeHeadList from "./IncomeHeadList/IcomeHeadList";

const IncomeHead = () => {
  return (
    <div className="min-h-screen w-full max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-6 p-5" style={{ marginLeft: "130px" }}>
      {/* Form Section */}
      <div className="lg:w-2/5">
        <div className="shadow-lg border-solid border-2 border-[#164f63]/60 shadow-gray-300 rounded-2xl">
          <div className="text-[#444] text-xl font-extrabold block p-6 relative">
            <h3>Add Income Head</h3>
          </div>
          <div className="p-5">
            <IncomeHeadFrom />
          </div>
        </div>
      </div>

      {/* List Section */}
      <div className="lg:w-5/5" style={{ marginRight: "30px" }}>
        <div className="shadow-lg border-solid border-2 border-[#164f63]/60 shadow-gray-300 rounded-2xl">
          <div className="text-[#444] text-xl font-extrabold block p-6 relative border-solid border-[#f4f4f4] border-b-2">
            <h3>Income Head List</h3>
          </div>
          <div className="p-6">
            <IncomeHeadList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeHead;