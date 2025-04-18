"use client";
import React from "react";
import { useState } from "react";
import StudentAdmissionForm from "./StudentAdmision";
import FeesDetails from "./FeesDetails";
import FeesDiscountDetails from "./FeesDiscount";
import StudentAddressForm from "./StudentAddress";
import NewStudent from './NewStudent';

function StudentAdmission() {
  const [importStudent,setImportStudent]=useState(true);
  function handleImportStudent(temp){
    setImportStudent(temp)
  }
  return (
    <div>
      {importStudent ? <div>
        <StudentAdmissionForm handleImportStudent={handleImportStudent} />
      <FeesDetails/>
      <FeesDiscountDetails/>
      <StudentAddressForm/>
        </div>:
        <NewStudent handleImportStudent={handleImportStudent} />
        }
    </div>
  );
}

export default StudentAdmission;