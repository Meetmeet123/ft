import React from "react";
import AddDepartment from "./Add-department-form/Form";
import DepartmentList from "./Show-departments-list/List";

const Departmentpage = () => {
  return (
    <div className="flex mt-5 ml-[130px] gap-5">
      <AddDepartment />
      <DepartmentList />
    </div>
  );
};

export default Departmentpage;
