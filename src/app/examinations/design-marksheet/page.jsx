"use client";
import React from "react";
import AddMarksheet from "./Add_Marks_Sheet/AddMarksSheetForm";
import MarksheetList from "./Show_Marks_sheets/MarksSheetsList";

const DesignMarks = () => {
  return (
    <div className="ml-5 grid grid-cols-1 lg:grid-cols-3 gap-5 p-4">
      {/* Add Admit Card Section */}
      <div className="lg:col-span-2 bg-white shadow-md rounded-lg p-4">
        <div className="text-[#444] text-xl font-extrabold border-b-2 border-[#f4f4f4] pb-2">
          <h3>Add marksheet</h3>
        </div>
        <AddMarksheet />
      </div>

      {/* Admit Card List Section */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="text-[#444] text-xl font-extrabold border-b-2 border-[#f4f4f4] pb-2">
          <h3>Marksheet List</h3>
        </div>
        <MarksheetList />
      </div>
    </div>
  );
};

export default DesignMarks;
