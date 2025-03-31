import ClassTeacherList from "./AssignedList";

const ClassTeacherListHeader = () => {
  return (
    <div className="flex-1/2">
      <div className="flex items-center justify-between bg-white mt-5 shadow-md rounded-lg p-4 border border-gray-300">
        <h3 className="text-lg font-semibold">Class Teacher List</h3>
        <div className="box-tools"></div>
      </div>
      <ClassTeacherList />
    </div>
  );
};

export default ClassTeacherListHeader;
