"use client";
import React from "react";
import ExamGroupForm from "./AddExamForm/Examgroup";
import ExamGroupList from "./ExamGroupList/ExamGroupList";

const ExaminationGroup = () => {
  return (
    <div className="ml-5 mt-10 xl:w-full h-fit flex gap-10">
      <div className="w-1/3 ">
        {" "}
        {/* Adjust width as needed */}
        <ExamGroupForm />
      </div>
      <div className="flex-1">
        {" "}
        {/* This will take up the remaining space */}
        <ExamGroupList />
      </div>
    </div>
  );
};

export default ExaminationGroup;
