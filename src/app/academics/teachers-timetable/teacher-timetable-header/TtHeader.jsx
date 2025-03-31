import { Search } from "lucide-react";

const TeacherTimeTableHeader = () => {
  return (
    <div className="flex items-center justify-between ml-5 mt-5 bg-white shadow-md rounded-lg p-4 border border-gray-300">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Search /> Teacher Time Table
      </h3>
      <div className="box-tools"></div>
    </div>
  );
};

export default TeacherTimeTableHeader;
