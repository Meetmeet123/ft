import React from "react";
import AttendanceForm from "./staff-attendence-form/form";
import AttendanceList from "./show-staff-attendence/List";

const StaffAttendencepage = () => {
  return (
    <div>
      <AttendanceForm />
      <AttendanceList />
    </div>
  );
};

export default StaffAttendencepage;
