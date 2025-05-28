"use client";
import React, { useState } from "react";
import IncomeHeadForm from "./IncomeHeadFrom/IncomeHeadFrom";
// import IncomeHeadFrom from "./IncomeHeadFrom/IncomeHeadFrom";
import IncomeHeadList from "./IncomeHeadList/IcomeHeadList";

const IncomeHead = () => {
  const [refreshList, setRefreshList] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  return (
    <div className="min-h-screen w-full max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-6 p-5" style={{ marginLeft: "130px" }}>
      {/* Form Section */}
      <div className="lg:w-2/5">
        <div className="shadow-lg border-solid border-2 border-[#164f63]/60 shadow-gray-300 rounded-2xl">
          <div className="text-[#444] text-xl font-extrabold block p-6 relative">
            <h3>{editData ? "Edit Income Head" : "Add Income Head"}</h3>
          </div>
          <div className="p-5">
            <IncomeHeadForm 
              editData={editData}
              setEditData={setEditData}
              setRefreshList={setRefreshList}
              refreshList={refreshList}
            />
          </div>
        </div>
      </div>

      {/* List Section */}
      <div className="lg:w-3/5" style={{ marginRight: "30px" }}>
        <div className="shadow-lg border-solid border-2 border-[#164f63]/60 shadow-gray-300 rounded-2xl">
          <div className="text-[#444] text-xl font-extrabold block p-6 relative border-solid border-[#f4f4f4] border-b-2">
            <h3>Income Head List</h3>
          </div>
          <div className="p-6">
            <IncomeHeadList 
              refreshList={refreshList}
              setRefreshList={setRefreshList}
              setEditData={setEditData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeHead;