import React from "react";
import AddSection from "./Add-section-form/Form";
import SectionList from "./List-sections-table/List";

const Sectionspage = () => {
  return (
    <div className="flex gap-5 mt-5">
      <AddSection />
      <SectionList />
    </div>
  );
};

export default Sectionspage;
