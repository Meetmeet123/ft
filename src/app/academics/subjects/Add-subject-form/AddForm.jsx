"use client";
import { useState } from "react";

const AddSubjectForm = () => {
  const [subjectName, setSubjectName] = useState("");
  const [subjectType, setSubjectType] = useState("theory");
  const [subjectCode, setSubjectCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      subjectName,
      subjectType,
      subjectCode,
    });
  };

  return (
    <div className=" max-w-md flex-1/2 h-fit bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-semibold border-b pb-3">Add Subject</h3>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="space-y-4">
          {/* Subject Name Input */}
          <div>
            <label className="block font-medium">
              Subject Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="subjectName"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter subject name"
              autoComplete="off"
            />
          </div>

          {/* Subject Type (Radio Buttons) */}
          <div>
            <label className="block font-medium">Subject Type</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="theory"
                  checked={subjectType === "theory"}
                  onChange={(e) => setSubjectType(e.target.value)}
                  className="mr-2"
                />
                Theory
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="practical"
                  checked={subjectType === "practical"}
                  onChange={(e) => setSubjectType(e.target.value)}
                  className="mr-2"
                />
                Practical
              </label>
            </div>
          </div>

          {/* Subject Code Input */}
          <div>
            <label className="block font-medium">Subject Code</label>
            <input
              type="text"
              id="subjectCode"
              value={subjectCode}
              onChange={(e) => setSubjectCode(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter subject code"
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            style={{ backgroundColor: "#164f63" }}
            className=" text-white px-4 py-2 rounded hover:bg-teal-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSubjectForm;
