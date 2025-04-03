import React from "react";
import TeacherTimeTableHeader from "./teacher-timetable-header/TtHeader";
import Ttform from "./teacher-timetable-form/Ttform";
import TeacherTimeTable from "./teacher-timetable-content/Ttcontent";

const TeacherTimetablepage = () => {
  return (
    <div>
      <TeacherTimeTableHeader />
      <Ttform />
      <TeacherTimeTable />
    </div>
  );
};

export default TeacherTimetablepage;
