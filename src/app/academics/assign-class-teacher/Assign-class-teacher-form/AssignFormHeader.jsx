import AssignClassTeacherForm from "./AssignForm";

const AssignClassTeacherHeader = () => {
  return (
    <div className="flex-1 ">
      <div className="bg-white shadow-md rounded-lg mt-5 ml-5 p-4 border border-gray-300">
        <h3 className="text-lg font-semibold">Assign Class Teacher</h3>
      </div>
      <AssignClassTeacherForm />
    </div>
  );
};

export default AssignClassTeacherHeader;
