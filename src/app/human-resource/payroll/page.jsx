import React from "react";
import PayrollForm from "./payroll-form/Form";
import StaffTable from "./payroll-list/List";

const Payrollpage = () => {
  return (
    <div>
      <PayrollForm />
      <StaffTable />
    </div>
  );
};

export default Payrollpage;
