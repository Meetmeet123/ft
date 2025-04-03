"use client";
import React, { useState } from "react";
import GradeForm from "./Grade_Form/GradeForm";
import GradeList from "./Grade_List/GradeList";

const ManageGrades = () => {
  const [grades, setGrades] = useState([
    {
      key: 1,
      examType: "General Purpose (Pass/Fail)",
      gradeName: "B-",
      markFrom: 0,
      markUpto: 40,
      gradePoint: 0.0,
    },
    {
      key: 2,
      examType: "GPA Grading System",
      gradeName: "A+",
      markFrom: 90,
      markUpto: 100,
      gradePoint: 4.5,
    },
  ]);

  const addGrade = (grade) => {
    setGrades([...grades, { ...grade, key: grades.length + 1 }]);
  };

  const editGrade = (editedGrade) => {
    setGrades(grades.map((g) => (g.key === editedGrade.key ? editedGrade : g)));
  };

  const deleteGrade = (key) => {
    setGrades(grades.filter((g) => g.key !== key));
  };

  return (
    <div className="ml-5 mt-5 p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Grades</h2>
      <GradeForm onSubmit={addGrade} />
      <div className="mt-6">
        <GradeList grades={grades} onEdit={editGrade} onDelete={deleteGrade} />
      </div>
    </div>
  );
};

export default ManageGrades;
