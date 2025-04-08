"use client";
import React from "react";
import IncomeSearchForm from "./incomeSearchFrom/incomeSearchFrom";
import IncomeResult from "./IncomeResultList/IncomeResultList";

const SearchIncome = () => {
  return (
    <div className="ml-5 mt-5" style={{ marginLeft: "150px" }}>
      {/* Form Section */}
      <div className="shadow-lg border-solid border-2 border-[#164f63]/60 shadow-gray-300 rounded-2xl mb-5">
        <div className="text-[#444] text-xl font-extrabold block p-4 pb-0 relative border-solid border-[#f4f4f4] border-b-2">
          <h3>Select Criteria</h3>
        </div>
        <IncomeSearchForm />
      </div>

      {/* Table Section */}
      <div className="shadow-lg border-solid border-2 border-[#164f63]/60 shadow-gray-300 rounded-2xl mb-5">
        <div className="text-[#444] text-xl font-extrabold block p-4 relative border-solid border-[#f4f4f4] border-b-2">
          <h3>Expense Result</h3>
        </div>
        <div className="p-5">
          <IncomeResult />
        </div>
      </div>
    </div>
  );
};

export default SearchIncome;