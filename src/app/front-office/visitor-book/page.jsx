"use client";
import React, { useState } from "react";
import VisitorBookForm from "./VisitorBookForm/VisitorBookForm";
import VisitorBookList from "./VisitorBookList/VisitorBookList";

const VisitorManagement = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="ml-5 mt-10 xl:w-1230px h-fit flex flex-row gap-6" style={{ marginLeft: "150px" }}>
      {/* Form Section */}
      <div className="w-2/5">
        <div className="shadow-lg border-solid border-2 border-[#164f63]/60 shadow-gray-300 rounded-2xl">
          <div className="text-[#444] text-xl font-extrabold block p-6 relative">
            <h3>Add Visitor Book</h3>
          </div>
          <div className="p-5">
            <VisitorBookForm refreshList={handleRefresh} />
          </div>
        </div>
      </div>

      {/* List Section */}
      <div className="w-3/5">
        <div className="shadow-lg border-solid border-2 border-[#164f63]/60 shadow-gray-300 rounded-2xl">
          <div className="text-[#444] text-xl font-extrabold block p-6 relative border-solid border-[#f4f4f4] border-b-2">
            <h3>Visitor Book List</h3>
          </div>
          <div className="p-6">
            <VisitorBookList refreshTrigger={refreshTrigger} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorManagement;