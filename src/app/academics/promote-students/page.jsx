import React from "react";
import StudentPromotionForm from "./promote-students-form/Form";
import StudentList from "./promote-students-table/Table";

const Promotepage = () => {
  return (
    <div>
      <StudentPromotionForm />
      <StudentList />
    </div>
  );
};

export default Promotepage;
