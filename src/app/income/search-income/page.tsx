"use client";
import React, { useState } from "react";
import IncomeSearchForm from "./incomeSearchFrom/incomeSearchFrom";
import IncomeResult from "./IncomeResultList/IncomeResultList";

const SearchIncome = () => {
  const [searchParams, setSearchParams] = useState({});
  const [refreshList, setRefreshList] = useState(false);

  return (
    <div className="ml-5 mt-5" style={{ marginLeft: "150px" }}>
      {/* Form Section */}
      <div className="shadow-lg border-solid border-2 border-[#164f63]/60 shadow-gray-300 rounded-2xl mb-5">
        <div className="text-[#444] text-xl font-extrabold block p-4 relative">
          <h3>Select Criteria</h3>
        </div>
        <IncomeSearchForm 
          setSearchParams={setSearchParams}
          setRefreshList={setRefreshList}
        />
      </div>

      {/* Table Section */}
      <div className="shadow-lg border-solid border-2 border-[#164f63]/60 shadow-gray-300 rounded-2xl mb-5">
        <div className="text-[#444] text-xl font-extrabold block p-4 relative border-solid border-[#f4f4f4] border-b-2">
          <h3>Income Result</h3>
        </div>
        <div className="p-5">
          <IncomeResult 
            searchParams={searchParams}
            refreshList={refreshList}
            setRefreshList={setRefreshList}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchIncome;