import React from "react";
import StaffSearchCriteria from "./Search-form/Form";
import StaffList from "./Show-Disabled-Staff/List";

const DisabledStaffpage = () => {
  return (
    <div className="mt-5">
      <StaffSearchCriteria />
      <StaffList />
    </div>
  );
};

export default DisabledStaffpage;
