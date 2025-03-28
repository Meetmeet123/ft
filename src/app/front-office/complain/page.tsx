"use client";
import React from "react";
import ComplainForm from "./ComplainForm/ComplainFrom";
import ComplainList from "./ComplainList/ComplainList";

const Complain = () => {
  return (
    <div
      className="ml-5 mt-10 xl:w-1230px h-fit flex flex-row gap-6"
      style={{ marginLeft: "150px" }}
    >
      {/* Form Section */}
      <div className="w-2/5">
        <div className="shadow-lg border-solid border-2 border-[#164f63]/60 shadow-gray-300 rounded-2xl">
          <div className="text-[#444] text-xl font-extrabold block p-6 relative">
            <h3>Add Complain</h3>
          </div>
          <div className="p-5">
            <ComplainForm />
          </div>
        </div>
      </div>

      {/* List Section */}
      <div className="w-3/5">
        <div className="shadow-lg border-solid border-2 border-[#164f63]/60 shadow-gray-300 rounded-2xl">
          <div className="text-[#444] text-xl font-extrabold block p-6 relative border-solid border-[#f4f4f4] border-b-2">
            <h3>Complain List</h3>
          </div>
          <div className="p-6">
            <ComplainList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Complain;