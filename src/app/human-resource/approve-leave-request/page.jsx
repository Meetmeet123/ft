import React from "react";
import ApproveLeaveRequestAdd from "./Approve-leave-request-Add-request/Form";
import LeaveManagementTable from "./aprrove-leave-table/Table";

const ApproveLeavepage = () => {
  return (
    <div className="ml-[130px]">
      <ApproveLeaveRequestAdd />
      <LeaveManagementTable />
    </div>
  );
};

export default ApproveLeavepage;
