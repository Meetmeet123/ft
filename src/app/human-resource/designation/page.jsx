import React from "react";
import AddDesignation from "./Add-designation-form/Form";
import DesignationList from "./List-designation/List";

const Designationpage = () => {
  return (
    <div className="flex gap-5 ml-[130px] mt-5">
      <AddDesignation />
      <DesignationList />
    </div>
  );
};

export default Designationpage;
