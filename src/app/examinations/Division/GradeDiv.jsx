import React, { useState } from "react";
import GradeDivList from "./Grade_Division_List/GradeDivList";
import GradeDivForm from "./Grade_Division_Form/GradeDivForm";

const GradeDiv = () => {
  const [grades, setGrades] = useState([
    { key: 1, divisionName: "First", markFrom: "100", markUpto: "60" },
    { key: 2, divisionName: "Second", markFrom: "60", markUpto: "40" },
    { key: 3, divisionName: "Third", markFrom: "40", markUpto: "0" },
  ]);
  const handleAddGrade = (newGrade) => {
    setGrades([...grades, { ...newGrade, key: grades.length + 1 }]);
  };

  const handleEditGrade = (gradeToEdit) => {
    const updatedGrades = grades.map((grade) =>
      grade.key === gradeToEdit.key ? gradeToEdit : grade
    );
    setGrades(updatedGrades);
  };

  const handleDeleteGrade = (key) => {
    setGrades(grades.filter((grade) => grade.key !== key));
  };
  return (
    // <div>
    //   <GradeDivForm onSubmit={handleAddGrade} />
    //   <h4 className="text-[#444] text-xl font-extrabold p-2.5 mb-4">
    //     Exam Schedule
    //   </h4>
    //   <GradeDivList
    //     grades={grades}
    //     onEdit={handleEditGrade}
    //     onDelete={handleDeleteGrade}
    //   />
    // </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 p-4">
      {/* Add Admit Card Section */}
      <div className="lg:col-span-1 bg-white shadow-md rounded-lg p-4">
        <div className="text-[#444] text-xl font-extrabold border-b-2 border-[#f4f4f4] pb-2">
          <h3>Add Admit Card</h3>
        </div>
        <GradeDivForm onSubmit={handleAddGrade} />
      </div>

      {/* Admit Card List Section */}
      <div className="bg-white col-span-2 shadow-md rounded-lg p-4">
        <div className="text-[#444] text-xl font-extrabold border-b-2 border-[#f4f4f4] pb-2">
          <h3>Admit Card List</h3>
        </div>
        <GradeDivList
          grades={grades}
          onEdit={handleEditGrade}
          onDelete={handleDeleteGrade}
        />
      </div>
    </div>
  );
};

export default GradeDiv;
