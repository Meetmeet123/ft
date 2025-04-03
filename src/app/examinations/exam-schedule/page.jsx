"use client";
import React from "react";
import { ClockCircleOutlined, SearchOutlined } from "@ant-design/icons";
import ExamScheduleForm from "./Exam_ScheduleForm/ExamScheduleForm";
import "antd/dist/reset.css";
import ExamScheduleTable from "./Exam_ScheduleTable/ExamScheduleTable";

const ExaminationSchedule = () => {
  return (
    <div className="ml-5 mt-5">
      <div className="shadow-lg border-solid border-2 border-[#164f63]/60 shadow-gray-300 rounded-2xl mb-5">
        <div className="text-[#444]  text-xl font-extrabold block p-2.5 relative ">
          <h3>
            <SearchOutlined /> Select Criteria
          </h3>
        </div>
        <ExamScheduleForm />
      </div>
      <div className="shadow-lg border-solid border-2 border-[#164f63]/60 shadow-gray-300 rounded-2xl mb-5">
        <h4 className="text-[#444] text-xl font-extrabold p-2.5 mb-4">
          <ClockCircleOutlined /> Exam Schedule
        </h4>
        <ExamScheduleTable />
      </div>
    </div>
  );
};

export default ExaminationSchedule;
