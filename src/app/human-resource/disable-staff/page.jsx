import React from "react";
import StaffSearchCriteria from "./Search-form/Form";
import StaffList from "./Show-Disabled-Staff/List";

const DisabledStaffpage = () => {
  return (
    <div className="mt-5 ml-[130px]">
      <StaffSearchCriteria />
      <StaffList />
    </div>
  );
};

export default DisabledStaffpage;
