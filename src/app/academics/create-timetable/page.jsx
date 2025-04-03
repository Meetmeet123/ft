import React from "react";
import FormComponent from "./creation-form/Form";
import ParamFormComponent from "./params-form/FormParams";
import TimeTable from "./TimetableDisplay/TimeTableDisplay";

const Createpage = () => {
  return (
    <div>
      <FormComponent />
      <ParamFormComponent />
      <TimeTable />
    </div>
  );
};

export default Createpage;
