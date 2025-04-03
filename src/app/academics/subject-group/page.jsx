import React from "react";
import AddSubjectGroup from "./Subject-group-form/Form";
import SubjectGroupList from "./Subject-group-list/List";

const SubjectGroupage = () => {
  return (
    <div className="flex">
      <AddSubjectGroup />
      <SubjectGroupList />
    </div>
  );
};

export default SubjectGroupage;
