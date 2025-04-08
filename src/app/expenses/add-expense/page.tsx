"use client";
import React from "react";
import AddIncomeForm from "./AddIncomeForm/AddIncomeForm";
import AddIncomeList from "./AddIncomeList/AddIncomeList";

const AddIncome = () => {
  return (
    <div
      className="ml-5 mt-10 xl:w-1230px h-fit flex flex-row gap-6"
      style={{ marginLeft: "150px" }}
    >
      {/* Form Section */}
      <div className="w-2/5">
        <div className="shadow-lg border-solid border-2 border-[#164f63]/60 shadow-gray-300 rounded-2xl">
          <div className="text-[#444] text-xl font-extrabold block p-6 pb-2 relative border-solid border-[#f4f4f4] border-b-2">
            <h3>Add Expense</h3>
          </div>
          <div className="p-5">
            <AddIncomeForm />
          </div>
        </div>
      </div>

      {/* List Section */}
      <div className="w-5/5">
        <div className="shadow-lg border-solid border-2 border-[#164f63]/60 shadow-gray-300 rounded-2xl">
          <div className="text-[#444] text-xl font-extrabold block p-6 pb-2 relative border-solid border-[#f4f4f4] border-b-2">
            <h3>Expense List</h3>
          </div>
          <div className="p-6">
            <AddIncomeList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddIncome;