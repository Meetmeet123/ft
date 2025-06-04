"use client"
import React, { useState } from "react";
import AddDesignation from "./Add-designation-form/Form";
import DesignationList from "./List-designation/List";

const Designationpage = () => {

  const [addData, setAddData] = useState({});

  return (
    <div className="flex gap-5 mt-5">
      <AddDesignation handleAddData = {(newData) => setAddData(newData)} />
      <DesignationList addData={addData} />
    </div>
  );
};

export default Designationpage;
