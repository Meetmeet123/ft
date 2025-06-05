"use client";
import { useState } from 'react';
import classGeneral from './Class1General';
import studentData from './student';

interface Student {
  admissionNo: string;
  studentName: string;
  class: string;
  fatherName: string;
  category: string;
  gender: string;
  rte?: string;
}

interface Fee {
  feesCode: string;
  amount: number | string;
}

function AssignFees() {
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [RTE, setRTE] = useState<string>('');
  const [displayedStudents, setDisplayedStudents] = useState<Student[]>(studentData);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [showContent, setShowContent] = useState<boolean>(false);

  const handleSearch = () => {
    const filtered = studentData.filter((student: Student) => {
      setShowContent(true);
      return (
        (!selectedClass || student.class.slice(0, 7) === selectedClass) &&
        (!selectedSection || student.class.slice(8, 9) === selectedSection) &&
        (!category || student.category === category) &&
        (!gender || student.gender === gender) &&
        (!RTE || student.rte === RTE)
      );
    });
    setDisplayedStudents(filtered);
    setSelectedStudents([]);
    setSelectAll(false);
  };

  const handleSelectStudent = (admissionNo: string) => {
    setSelectedStudents((prev) =>
      prev.includes(admissionNo)
        ? prev.filter((id) => id !== admissionNo)
        : [...prev, admissionNo]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedStudents([]);
    } else {
      const allIds = displayedStudents.map((s) => s.admissionNo);
      setSelectedStudents(allIds);
    }
    setSelectAll(!selectAll);
  };

  return (
    <div className="px-4 py-6 max-w-screen-xl mx-auto">
      {/* Criteria Section */}
      <div className="w-full border-b pb-4 mb-6">
        <h3 className="text-xl font-semibold">Select Criteria</h3>
      </div>

      <div className="grid lg:grid-cols-5 mt-3 mb-5 gap-5">
        <div>
          <label>Class</label>
          <select className="w-full" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
            <option value="">Select</option>
            <option value="Class 1">Class 1</option>
            <option value="Class 2">Class 2</option>
            <option value="Class 3">Class 3</option>
            <option value="Class 4">Class 4</option>
            <option value="Class 5">Class 5</option>
          </select>
        </div>

        <div>
          <label>Section</label>
          <select className="w-full" value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)}>
            <option value="">Select</option>
            <option value="A">Section A</option>
            <option value="B">Section B</option>
            <option value="C">Section C</option>
            <option value="D">Section D</option>
          </select>
        </div>

        <div>
          <label>Category</label>
          <select className="w-full" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select</option>
            <option value="General">General</option>
            <option value="OBC">OBC</option>
            <option value="Special">Special</option>
            <option value="PhysicallyChallenged">Physically Challenged</option>
          </select>
        </div>

        <div>
          <label>Gender</label>
          <select className="w-full" value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <label>RTE</label>
          <select className="w-full" value={RTE} onChange={(e) => setRTE(e.target.value)}>
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={handleSearch}
            className="btn btn-primary w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </div>

      {showContent && (
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">Assign Fees Discount</h1>
          <h2 className="text-lg font-medium text-gray-700 mb-4">Class 1 General</h2>

          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Fees Table */}
            <div className="bg-white rounded-md shadow overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fees Code
                    </th>
                    <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {classGeneral.map((fee: Fee, index: number) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="py-2 px-4 text-gray-700">{fee.feesCode}</td>
                      <td className="py-2 px-4 text-right text-gray-700">{fee.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Student List */}
            <div className="bg-white rounded-md shadow overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-3 text-center">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </th>
                    <th className="py-3 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Admission No
                    </th>
                    <th className="py-3 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student Name
                    </th>
                    <th className="py-3 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                    <th className="py-3 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Father Name
                    </th>
                    <th className="py-3 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="py-3 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Gender
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {displayedStudents.map((student: Student, index: number) => (
                    <tr key={student.admissionNo} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="py-2 px-3 text-center">
                        <input
                          type="checkbox"
                          checked={selectedStudents.includes(student.admissionNo)}
                          onChange={() => handleSelectStudent(student.admissionNo)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </td>
                      <td className="py-2 px-3 text-gray-700">{student.admissionNo}</td>
                      <td className="py-2 px-3 text-gray-700">{student.studentName}</td>
                      <td className="py-2 px-3 text-gray-700">{student.class}</td>
                      <td className="py-2 px-3 text-gray-700">{student.fatherName}</td>
                      <td className="py-2 px-3 text-gray-700">{student.category}</td>
                      <td className="py-2 px-3 text-gray-700">{student.gender}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Assign Button */}
          <div className="mt-6 flex justify-end">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Assign Fees
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AssignFees;
