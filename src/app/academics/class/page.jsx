import React from "react";
import AddClassForm from "./Add-class-form/Form";
import ClassList from "./show-class-list/List";

const Classespage = () => {
  return (
    <div className="flex gap-5 mt-5">
      <AddClassForm />
      <ClassList />
    </div>
  );
};

export default Classespage;
