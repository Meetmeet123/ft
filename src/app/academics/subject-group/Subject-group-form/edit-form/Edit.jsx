"use client";
import { useState } from "react";

const EditSubjectGroupForm = ({ subjectGroup }) => {
  const [name, setName] = useState(subjectGroup?.name || "");
  const [classId, setClassId] = useState(subjectGroup?.classId || "");
  const [selectedSections, setSelectedSections] = useState(
    subjectGroup?.sections || []
  );
  const [selectedSubjects, setSelectedSubjects] = useState(
    subjectGroup?.subjects || []
  );
  const [description, setDescription] = useState(
    subjectGroup?.description || ""
  );

  const classes = [
    { value: "1", label: "Class 1" },
    { value: "2", label: "Class 2" },
    { value: "3", label: "Class 3" },
    { value: "4", label: "Class 4" },
    { value: "5", label: "Class 5" },
  ];

  const sections = [
    { value: "1", label: "A" },
    { value: "2", label: "B" },
    { value: "3", label: "C" },
    { value: "12", label: "D" },
  ];

  const subjects = [
    { value: "1", label: "English" },
    { value: "3", label: "Hindi" },
    { value: "4", label: "Mathematics" },
    { value: "5", label: "Science" },
    { value: "6", label: "Social Studies" },
    { value: "7", label: "French" },
    { value: "8", label: "Drawing" },
    { value: "9", label: "Computer" },
    { value: "10", label: "Elective 1" },
    { value: "11", label: "Elective 2" },
    { value: "12", label: "Elective 3" },
  ];

  const handleSectionChange = (value) => {
    setSelectedSections((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );
  };

  const handleSubjectChange = (value) => {
    setSelectedSubjects((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      name,
      classId,
      selectedSections,
      selectedSubjects,
      description,
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-semibold border-b pb-3">
        Edit Subject Group
      </h3>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="space-y-4">
          {/* Name Input */}
          <div>
            <label className="block font-medium">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-md"
              autoComplete="off"
            />
          </div>

          {/* Class Selection */}
          <div>
            <label className="block font-medium">
              Class <span className="text-red-500">*</span>
            </label>
            <select
              id="class_id"
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select</option>
              {classes.map((cls) => (
                <option key={cls.value} value={cls.value}>
                  {cls.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sections Checkboxes */}
          <div>
            <label className="block font-medium">
              Sections <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {sections.map((section) => (
                <label key={section.value} className="flex items-center">
                  <input
                    type="checkbox"
                    value={section.value}
                    checked={selectedSections.includes(section.value)}
                    onChange={() => handleSectionChange(section.value)}
                    className="mr-2"
                  />
                  {section.label}
                </label>
              ))}
            </div>
          </div>

          {/* Subjects Checkboxes */}
          <div>
            <label className="block font-medium">
              Subjects <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {subjects.map((subject) => (
                <label key={subject.value} className="flex items-center">
                  <input
                    type="checkbox"
                    value={subject.value}
                    checked={selectedSubjects.includes(subject.value)}
                    onChange={() => handleSubjectChange(subject.value)}
                    className="mr-2"
                  />
                  {subject.label}
                </label>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded-md"
              rows="3"
              placeholder="Enter description"
            ></textarea>
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

export default EditSubjectGroupForm;
