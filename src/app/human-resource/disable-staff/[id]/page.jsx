// /app/professor/[id]/page.jsx
import React from "react";
import ProfessorDetail from "./Detail-View-component/Component";
import staffData from "../staffdata";

const ProfessorProfile = ({ params }) => {
  const { id } = params;
  const professor = staffData.find((staff) => staff.id === parseInt(id));

  if (!professor) {
    return <div>Professor not found</div>;
  }

  return (
    <div className="mt-5 ml-5">
      <h1 className="text-2xl font-bold mb-4">Professor Profile</h1>
      <ProfessorDetail professor={professor} />
    </div>
  );
};

export default ProfessorProfile;
