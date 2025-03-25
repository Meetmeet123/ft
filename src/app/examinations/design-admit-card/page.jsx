"use client";
import React from "react";
import AddAdmitCard from "./Add_Admit_Card/AddAdmit";
import AdmitCardList from "./Admit_card_list/AdmitList";

const DesignAdmit = () => {
  return (
    <div className="grid ml-5 mt-5 grid-cols-1 lg:grid-cols-3 gap-5 p-4">
      {/* Add Admit Card Section */}
      <div className="lg:col-span-2 bg-white shadow-md rounded-lg p-4">
        <div className="text-[#444] text-xl font-extrabold border-b-2 border-[#f4f4f4] pb-2">
          <h3>Add Admit Card</h3>
        </div>
        <AddAdmitCard />
      </div>

      {/* Admit Card List Section */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="text-[#444] text-xl font-extrabold border-b-2 border-[#f4f4f4] pb-2">
          <h3>Admit Card List</h3>
        </div>
        <AdmitCardList />
      </div>
    </div>
  );
};

export default DesignAdmit;
