"use client";

import PrintForm from "./Print_Admit_Card_Form/PrintForm";
import StudentAdmitList from "./print_Admidt_card_results/PrintAdmitTable";

const PrintAdmitCard = () => {
  const sampleStudents = [
    {
      id: 1,
      admissionNo: "18016",
      name: "Apolline",
      fatherName: "Elanie",
      dob: "02/16/2010",
      gender: "Male",
      category: "General",
      mobile: "895412630",
    },
    {
      id: 2,
      admissionNo: "18013",
      name: "Benjamin Gates",
      fatherName: "Nathan Gates",
      dob: "03/11/2016",
      gender: "Male",
      category: "General",
      mobile: "4654646546",
    },
    {
      id: 3,
      admissionNo: "18007",
      name: "Brian Kohlar",
      fatherName: "Nick Kohlar",
      dob: "01/05/2015",
      gender: "Male",
      category: "General",
      mobile: "5646546546",
    },
  ];

  return (
    <div className="ml-5 mt-5">
      <div className="shadow-lg border-solid border-2 border-[#164f63]/60 shadow-gray-300 rounded-2xl mb-5">
        <div className="text-[#444] text-xl font-extrabold block p-2.5 relative border-solid border-[#f4f4f4] border-b-2">
          <h3>Select Criteria</h3>
        </div>
        <PrintForm />
      </div>
      {sampleStudents.length > 0 && (
        <div className="shadow-lg border-solid border-2 border-[#164f63]/60 shadow-gray-300 rounded-2xl">
          <div className="text-[#444] text-xl font-extrabold block p-2.5 relative">
            <h3>Student List</h3>
          </div>
          <StudentAdmitList students={sampleStudents} />
        </div>
      )}
    </div>
  );
};

export default PrintAdmitCard;
