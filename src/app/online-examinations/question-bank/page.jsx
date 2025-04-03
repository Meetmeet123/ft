import React from "react";
import SelectCriteria from "./Add-Questions-Form/Form";
import QuestionSearchForm from "./Search-form/Form";
import QuestionBank from "./show-questions-list/List";

const QuestionBankpage = () => {
  return (
    <div>
      <SelectCriteria />
      <QuestionSearchForm />
      <QuestionBank />
    </div>
  );
};

export default QuestionBankpage;
