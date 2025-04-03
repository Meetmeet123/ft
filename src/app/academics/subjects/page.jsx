import React from "react";
import AddSubjectForm from "./Add-subject-form/AddForm";
import SubjectList from "./Show-subject-list/Show";

const Subjectspage = () => {
  return (
    <div className="flex gap-5 mt-5">
      <AddSubjectForm />
      <SubjectList />
    </div>
  );
};

export default Subjectspage;
