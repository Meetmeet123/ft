"use client";
import { useState } from "react";

const Ttform = () => {
  const [selectedTeacher, setSelectedTeacher] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedTeacher) {
      console.log("Fetching timetable for teacher:", selectedTeacher);
      // Handle form submission logic, e.g., API request
    }
  };
  return (
    <form
      action="https://demo.smart-school.in/admin/timetable/getteachertimetable"
      method="POST"
      id="getTimetable"
      className="flex flex-wrap gap-4 bg-white shadow-md rounded-lg p-4 border border-gray-300 ml-5 mt-5"
      onSubmit={handleSubmit}
    >
      <div className="w-full md:w-1/2 lg:w-1/3">
        <label htmlFor="teacher" className="block font-medium">
          Teachers<span className="text-red-500"> *</span>
        </label>
        <select
          className="w-full p-2 border rounded-md"
          name="teacher"
          id="teacher"
          value={selectedTeacher}
          onChange={(e) => setSelectedTeacher(e.target.value)}
        >
          <option value="">Select</option>
          <option value="2">Shivam Verma (9002)</option>
          <option value="5">Jason Sharlton (90006)</option>
          <option value="10">Albert Thomas (54545454)</option>
        </select>
      </div>

      <div className="w-full md:w-1/2 lg:w-1/3 flex items-end">
        <button
          type="submit"
          style={{ backgroundColor: "#164f63" }}
          className=" hover:bg-teal-700 text-white font-bold px-4 py-2 rounded-md transition"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default Ttform;
