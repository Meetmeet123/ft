import React, { useState, useEffect } from "react";
import studentData from "./StudentsData";
import { ChevronDown, Database, Download, FileText, Printer } from "lucide-react";

function Student() {
  const [students, setStudents] = useState(studentData);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStudents, setFilteredStudents] = useState(studentData);

  useEffect(() => {
    const filtered = students.filter((s) =>
      Object.values(s).some((value) =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredStudents(filtered);
  }, [searchQuery, students]);

  const toggleActive = (admissionNo) => {
    const updated = students.map((s) =>
      s.admissionNo === admissionNo ? { ...s, active: !s.active } : s
    );
    setStudents(updated);
  };

  const handleCopyClick = () => {
    const text = JSON.stringify(filteredStudents, null, 2);
    navigator.clipboard.writeText(text).then(() => {
      alert("Data copied to clipboard!");
    });
  };

  const handleDownloadClick = () => {
    const csv = [
      ["Admission No", "Student Name", "Username", "Class", "Father Name", "Mobile Number", "Status"],
      ...filteredStudents.map((s) => [
        s.admissionNo,
        s.name,
        s.username,
        s.class,
        s.fatherName,
        s.mobileNumber,
        s.active ? "Active" : "Inactive",
      ]),
    ]
      .map((row) => row.map((val) => `"${val}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "students_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintClick = () => {
    const content = document.getElementById("print-section").innerHTML;
    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write(`
      <html>
        <head>
          <title>Print</title>
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background-color: #f9f9f9; }
          </style>
        </head>
        <body>${content}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="w-full px-2 sm:px-4 lg:px-6">
      {/* Search and Actions */}
      <div className="relative flex flex-wrap w-full gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <input
            type="text"
            placeholder="Search Students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 w-full py-2 border rounded"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <ChevronDown size={16} className="text-gray-400" />
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <button onClick={handleCopyClick} title="Copy JSON">
            <Database size={18} className="text-gray-500" />
          </button>
          <button onClick={handleDownloadClick} title="Download CSV">
            <Download size={18} className="text-gray-500" />
          </button>
          <button onClick={handleCopyClick} title="Copy JSON">
            <FileText size={18} className="text-gray-500" />
          </button>
          <button onClick={handlePrintClick} title="Print">
            <Printer size={18} className="text-gray-500" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto" id="print-section">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["Admission No", "Student Name", "Username", "Class", "Father Name", "Mobile Number", "Action"].map(
                (title, idx) => (
                  <th
                    key={idx}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div className="flex items-center">
                      {title}
                      {title !== "Action" && <ChevronDown size={14} className="ml-1" />}
                    </div>
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredStudents.map((student) => (
              <tr key={student.admissionNo}>
                <td className="px-4 py-3 text-sm text-gray-500">{student.admissionNo}</td>
                <td className="px-4 py-3 text-sm text-blue-500">{student.name}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{student.username}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{student.class}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{student.fatherName}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{student.mobileNumber}</td>
                <td className="px-4 py-3">
                  <label
                    className="inline-flex relative items-center cursor-pointer"
                    onClick={() => toggleActive(student.admissionNo)}
                  >
                    <div
                      className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                        student.active ? "bg-green-500" : "bg-gray-200"
                      }`}
                    >
                      <div
                        className={`absolute top-1 bg-white w-4 h-4 rounded-full shadow transition-all duration-300 ${
                          student.active ? "left-7" : "left-1"
                        }`}
                      ></div>
                    </div>
                  </label>
                </td>
              </tr>
            ))}
            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center px-4 py-3 text-sm text-gray-500">
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Student;
