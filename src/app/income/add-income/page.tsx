"use client";
import React, { useState } from "react";
import AddIncomeForm from "./AddIncomeForm/AddIncomeForm";
import AddIncomeList from "./AddIncomeList/AddIncomeList";

const AddIncome = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [incomeToEdit, setIncomeToEdit] = useState<any>(null);

  const handleIncomeAdded = () => {
    setRefreshTrigger(prev => !prev);
  };

  const handleIncomeUpdated = () => {
    setRefreshTrigger(prev => !prev);
  };

  const handleEditIncome = (income: any) => {
    setIncomeToEdit(income);
  };

  const resetEdit = () => {
    setIncomeToEdit(null);
  };

  return (
    <div className="ml-5 mt-10 xl:w-1230px h-fit flex flex-row gap-6" style={{ marginLeft: "150px" }}>
      {/* Form Section */}
      <div className="w-2/5">
        <div className="shadow-lg border-solid border-2 border-[#164f63]/60 shadow-gray-300 rounded-2xl">
          <div className="text-[#444] text-xl font-extrabold block p-6 relative">
            <h3>{incomeToEdit ? 'Edit Income' : 'Add Income'}</h3>
          </div>
          <div className="p-5">
            <AddIncomeForm 
              incomeToEdit={incomeToEdit}
              onIncomeAdded={handleIncomeAdded}
              onIncomeUpdated={handleIncomeUpdated}
              resetEdit={resetEdit}
            />
          </div>
        </div>
      </div>

      {/* List Section */}
      <div className="w-3/5">
        <div className="shadow-lg border-solid border-2 border-[#164f63]/60 shadow-gray-300 rounded-2xl">
          <div className="text-[#444] text-xl font-extrabold block p-6 relative border-solid border-[#f4f4f4] border-b-2">
            <h3>Income List</h3>
          </div>
          <div className="p-6">
            <AddIncomeList 
              refreshTrigger={refreshTrigger}
              onEditIncome={handleEditIncome}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddIncome;