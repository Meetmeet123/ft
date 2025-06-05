"use client";
import React, { useState, ChangeEvent } from "react";
import { Plus } from "lucide-react";

interface Assignment {
  class: string;
  section: string;
}

interface Student {
  name: string;
  assignments: Assignment[];
}

const MultiClassStudent: React.FC = () => {
  const [studentData, setStudentData] = useState<Student[]>([]);
  const [classValue, setClassValue] = useState<string>("");
  const [section, setSection] = useState<string>("");

  const class1 = [
    ["Ashwani Kumar (120020)", "Nathan Smith (120039)", "xavier barlett (520039)"],
    ["Vinay Singh (5422)", "Nishant Sindhu (120028)"],
    [],
    [],
  ];

  const class2 = [
    ["Kaylen (2152)", "Ayan Desai (120036)", "Jacob Bethell (96302)", "Ashwani Kumar (120020)"],
    ["Mayer (5482)", "Hazel (1205)", "Vinni Khatri (980867)"],
    [],
    [],
  ];

  const class3 = [
    ["Alexander Kayla (18078)", "Suresh Patel (90775)", "John M. Pinto (03321)", "Jasaon Martin (12003)"],
    ["Dharambir Singh (18077)", "Emma Thomas (0202)"],
    ["Arpit Patel (326260)"],
    ["Shalini sharma (90957)"],
  ];

  const class4 = [
    ["David Heart (18008)", "Surya Lalwani (11025)", "Mohit Raina (18021)", "George Jeny Sharon (18097)"],
    ["Jhony Taylor (18020)", "Andrew Donna (18088)", "Henry Brown (911664)"],
    ["Rahul Sinha (18028)", "Rohit Khanna (18087)"],
    ["Guru Rana (18099)", "gaurav soni (12535)"],
  ];

  const class5 = [
    ["Edward Thomas (18001)", "Robin Peterson (18002)", "Brian Kohlar (18007)", "Laura Clinton (18004)"],
    ["Glen Stark (18005)", "Kriti Singh (18010)", "Rahul Sinha (18029)"],
    [],
  ];

  const handleSearch = () => {
    if (!classValue || !section) {
      alert("Please select both Class and Section.");
      return;
    }

    const sectionIndex = section.charCodeAt(0) - 65;
    const classMap: Record<number, string[][]> = {
      1: class1,
      2: class2,
      3: class3,
      4: class4,
      5: class5,
    };

    const selectedClass = classMap[Number(classValue)];
    if (selectedClass) {
      const studentsList = selectedClass[sectionIndex] || [];
      const formattedStudents: Student[] = studentsList.map((name) => ({
        name,
        assignments: [{ class: "", section: "" }],
      }));
      setStudentData(formattedStudents);
    }
  };

  const addAssignment = (index: number) => {
    setStudentData((prev) =>
      prev.map((student, i) =>
        i === index
          ? { ...student, assignments: [...student.assignments, { class: "", section: "" }] }
          : student
      )
    );
  };

  const removeAssignment = (studentIndex: number, assignmentIndex: number) => {
    setStudentData((prev) =>
      prev.map((student, i) =>
        i === studentIndex
          ? {
              ...student,
              assignments: student.assignments.filter((_, j) => j !== assignmentIndex),
            }
          : student
      )
    );
  };

  return (
    <div className="p-6">
      <h3 className="text-xl border-b pb-2 mb-4">Select Criteria</h3>
      <div className="grid lg:grid-cols-2 sm:grid-col-1 gap-4 mb-6">
        <div>
          <label className="block mb-1">Class</label>
          <select
            value={classValue}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setClassValue(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Class</option>
            {[1, 2, 3, 4, 5].map((c) => (
              <option key={c} value={String(c)}>
                Class {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">Section</label>
          <select
            value={section}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setSection(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Section</option>
            {["A", "B", "C", "D"].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="text-right mb-6">
        <button
          onClick={handleSearch}
          className="btn btn-primary bg-yellow-500 text-white font-semibold px-6 py-2 rounded hover:bg-yellow-600"
        >
          Search
        </button>
      </div>

      {studentData.length === 0 ? (
        <div className="bg-red-100 text-red-600 text-center p-3 rounded">
          No Records Found
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-6">
          {studentData.map((student, studentIndex) => (
            <div key={studentIndex} className="border min-h-60 rounded shadow p-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold">{student.name}</h4>
                <button
                  onClick={() => addAssignment(studentIndex)}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {student.assignments.map((_, assignIndex) => (
                <div key={assignIndex} className="w-full grid lg:grid-cols-3 md:grid-cols-1 gap-4 mb-4">
                  <div className="w-full">
                    <label className="block text-sm font-medium mb-1">Class</label>
                    <select className="w-full border px-2 py-1 rounded">
                      <option value="">Select</option>
                      {[1, 2, 3, 4, 5].map((c) => (
                        <option key={c} value={`Class ${c}`}>{`Class ${c}`}</option>
                      ))}
                    </select>
                  </div>
                  <div className="w-full">
                    <label className="block text-sm font-medium mb-1">Section</label>
                    <select className="w-full border px-2 py-1 rounded">
                      {["", "A", "B", "C", "D"].map((s) => (
                        <option key={s} value={s}>
                          {s || "Select"}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={() => removeAssignment(studentIndex, assignIndex)}
                    className="btn btn-danger w-1/2 bg-red-500 text-white px-4 h-10 mt-5 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}

              <div className="flex justify-end relative right-0">
                <button className="btn btn-primary border px-4 py-1 rounded hover:bg-gray-100">
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiClassStudent;
