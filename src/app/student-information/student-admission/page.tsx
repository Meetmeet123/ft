"use client";
import React, { useState } from "react";
import StudentAdmissionForm from "./StudentAdmision";
import FeesDetails from "./FeesDetails";
import FeesDiscountDetails from "./FeesDiscount";
import StudentAddressForm from "./StudentAddress";
import NewStudent from './NewStudent';

const StudentAdmission: React.FC = () => {
  const [importStudent, setImportStudent] = useState<boolean>(true);

  function handleImportStudent(temp: boolean) {
    setImportStudent(temp);
  }

  return (
    <div>
      {importStudent ? (
        <div>
          <StudentAdmissionForm handleImportStudent={handleImportStudent} />
          <FeesDetails />
          <FeesDiscountDetails />
          <StudentAddressForm />
        </div>
      ) : (
        <NewStudent handleImportStudent={handleImportStudent} />
      )}
    </div>
  );
};

export default StudentAdmission;
