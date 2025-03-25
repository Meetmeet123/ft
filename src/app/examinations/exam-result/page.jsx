"use client";
import React from "react";
import ResultForm from "./Exam_Results_Form/ExamResultForm";
import ExamResultsTable from "./Exam_Results/ResultsTable";

const ExamResults = () => {
  return (
    <div className="ml-5 mt-5">
      <div className="shadow-lg border-solid border-2 border-[#164f63]/60 shadow-gray-300 rounded-2xl mb-5">
        <div className="text-[#444] text-xl font-extrabold block p-2.5 relative">
          <h3>Select Criteria</h3>
        </div>
        <ResultForm />
      </div>
      <div className="shadow-lg border-solid border-2 border-[#164f63]/60 shadow-gray-300 rounded-2xl mb-5">
        {" "}
        <div className="text-[#444] text-xl font-extrabold block p-2.5 relative border-solid border-[#f4f4f4] border-b-2">
          <h3>Exam Results</h3>
        </div>
        <ExamResultsTable />
      </div>
    </div>
  );
};

export default ExamResults;
