import React from "react";
import AddLeaveType from "./Add-Leave-Type-form/Form";
import LeaveTypeList from "./Show-Leave-Type/List";

const LeaveTypepage = () => {
  return (
    <div className="flex gap-5 mt-5">
      <AddLeaveType />
      <LeaveTypeList />
    </div>
  );
};

export default LeaveTypepage;
