import React from "react";
import AssignClassTeacherHeader from "./Assign-class-teacher-form/AssignFormHeader";
import ClassTeacherListHeader from "./Class-teacher-list/AssignedListHeader";

const AssignTeacherpage = () => {
  return (
    <div className="flex gap-5">
      <AssignClassTeacherHeader />
      <ClassTeacherListHeader />
    </div>
  );
};

export default AssignTeacherpage;
