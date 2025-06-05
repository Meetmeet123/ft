"use client";
import { useEffect, useState, ChangeEvent } from "react";
import {
  Search,
  Database,
  Download,
  Copy,
  Printer,
} from "lucide-react";
import class1Data from "./Class1Data";
import class2Data from "./Class2Data";
import class3Data from "./Class3Data";
import class4Data from "./Class4Data";
import class5Data from "./Class5Data";

interface Student {
  id: number | string;
  name: string;
  dob: string;
  rollNo: number | string;
  fatherName: string;
  class: string;
  balance: string | number;
  [key: string]: any; // for any other optional fields
}

export default function FeesCarry() {
  const [className, setClassName] = useState<string>("");
  const [section, setSection] = useState<string>("");
  const [students, setStudents] = useState<Student[]>([]);
  const [displayedStudents, setDisplayedStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showContent, setShowContent] = useState<boolean>(false);
  const [balance, setBalance] = useState<Student[]>([]);

  function handleSearch() {
    let selectedData: Student[] = [];

    setShowContent(true);

    switch (className) {
      case "Class 1":
        selectedData = class1Data;
        break;
      case "Class 2":
        selectedData = class2Data;
        break;
      case "Class 3":
        selectedData = class3Data;
        break;
      case "Class 4":
        selectedData = class4Data;
        break;
      case "Class 5":
        selectedData = class5Data;
        break;
      default:
        selectedData = [];
    }

    let filtered = selectedData;

    setBalance(
      filtered.filter((student) => {
        return student.balance;
      })
    );

    if (section && section !== "Select") {
      filtered = filtered.filter((student) => {
        const match = student.class.match(/\(([^)]+)\)/); // extract section from "Class 2(A)"
        const studentSection = match ? match[1] : "";
        return studentSection === section;
      });
    }

    setStudents(filtered);
    setDisplayedStudents(filtered);
  }

  const handleExportExcel = () => {
    if (!displayedStudents || displayedStudents.length === 0) return;

    const headers = Object.keys(students[0]);
    let table = "<table border='1'><tr>";

    // Add table headers
    headers.forEach((header) => {
      table += `<th>${header}</th>`;
    });
    table += "</tr>";

    // Add table rows
    displayedStudents.forEach((row) => {
      table += "<tr>";
      headers.forEach((header) => {
        table += `<td>${row[header] ?? ""}</td>`;
      });
      table += "</tr>";
    });

    table += "</table>";

    const blob = new Blob(
      [
        `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" 
            xmlns:x="urn:schemas-microsoft-com:office:excel" 
            xmlns="http://www.w3.org/TR/REC-html40">
      <head><meta charset="UTF-8"></head>
      <body>${table}</body></html>
    `,
      ],
      {
        type: "application/vnd.ms-excel",
      }
    );

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Fees Balance List.xls";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handlePrint = () => {
    if (!displayedStudents || displayedStudents.length === 0) return;

    // const headers = Object.keys(displayedStudents[0]);
    // let table =
    //   '<table border="1" style="border-collapse: collapse; width: 100%"><thead><tr>';

    // // Headers
    // headers.forEach((header) => {
    //   table += `<th style="padding: 8px; text-align: left;">${header}</th>`;
    // });
    // table += "</tr></thead><tbody>";

    // // Rows
    // displayedStudents.forEach((row) => {
    //   table += "<tr>";
    //   headers.forEach((header) => {
    //     table += `<td style="padding: 8px;">${row[header] ?? ""}</td>`;
    //   });
    //   table += "</tr>";
    // });

    // table += "</tbody></table>";

    // const printWindow = window.open("", "_blank");
    // if (printWindow) {
    //   printWindow.document.write(`
    //   <html>
    //     <head>
    //       <title>Fees Balance List</title>
    //     </head>
    //     <body>
    //       <h2>Fees Balance List</h2>
    //       ${table}
    //       <script>
    //         window.onload = function () {
    //           window.print();
    //           window.onafterprint = function () {
    //             window.close();
    //           };
    //         };
    //       </script>
    //     </body>
    //   </html>
    // `);
    //   printWindow.document.close();
    // }
  };

  const handleCopy = () => {
    if (!displayedStudents || displayedStudents.length === 0) return;

    const jsonText = JSON.stringify(displayedStudents, null, 2);

    navigator.clipboard
      .writeText(jsonText)
      .then(() => alert("Copied to clipboard"))
      .catch(() => alert("Failed to copy"));
  };

  useEffect(() => {
    if (!searchQuery.trim()) {
      setDisplayedStudents(students);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filteredStudents = students.filter(
      (student) =>
        student.name?.toLowerCase().includes(query) ||
        student.rollNo?.toString().includes(query) ||
        student.id?.toString().includes(query) ||
        student.class?.toLowerCase().includes(query) ||
        student.fatherName?.toLowerCase().includes(query) ||
        student.dob?.toLowerCase().includes(query) ||
        student.gender?.toLowerCase().includes(query) ||
        student.category?.toLowerCase().includes(query) ||
        student.mobileNumber?.toString().includes(query) ||
        student.nationalId?.toString().includes(query) ||
        student.localId?.toString().includes(query)
    );

    setDisplayedStudents(filteredStudents);
  }, [searchQuery, students]);

  return (
    <div className="bg-gray-50 p-4 w-full min-h-screen">
      <div className="max-w-7xl mx-auto bg-white rounded-md shadow-sm">
        <div className="p-6">
          <h2 className="text-xl font-medium text-gray-700 mb-6">
            Select Criteria
          </h2>
          <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-6 mb-6">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Class <span className="text-red-500">*</span>
              </label>
              <select
                onChange={(e) => setClassName(e.target.value)}
                value={className}
                className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Select</option>
                <option>Class 1</option>
                <option>Class 2</option>
                <option>Class 3</option>
                <option>Class 4</option>
                <option>Class 5</option>
              </select>
              {showContent && className === "" && (
                <p className="text-red-600">Fill this class field</p>
              )}
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section<span className="text-red-600">*</span>
              </label>
              <select
                onChange={(e) => setSection(e.target.value)}
                value={section}
                className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Select</option>
                <option>A</option>
                <option>B</option>
                <option>C</option>
                <option>D</option>
              </select>
              {showContent && section === "" && (
                <p className="text-red-600">Fill this section field</p>
              )}
              <div className="flex justify-end md:justify-start mt-6">
                <button
                  onClick={handleSearch}
                  className="btn btn-primary hover:bg-gray-600 text-white py-2 rounded-md"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </button>
              </div>
            </div>
          </div>

          {showContent && className !== "" && section !== "" && (
            <div>
              <div className="border-b flex justify-between border-gray-200 mb-6">
                <div className="flex space-x-4 gap-5">
                  <h3 className="text-xl">Previous Session balance</h3>
                </div>
                <div className="flex">
                  <h3 className="text-red-600">Due Date: </h3>
                  <h3>4/11/2025</h3>
                </div>
              </div>
              <div className="overflow-x-auto">
                <div className="grid lg:grid-cols-2 sm:grid-cols-1 mb-4 space-x-2">
                  <div className="w-1/2">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Search in results..."
                    />
                  </div>
                  <div className="text-end">
                    <button
                      onClick={handleExportExcel}
                      className="p-1 text-gray-600 hover:text-gray-800"
                    >
                      <Database className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleExportExcel}
                      className="p-1 text-gray-600 hover:text-gray-800"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleCopy}
                      className="p-1 text-gray-600 hover:text-gray-800"
                    >
                      <Copy className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handlePrint}
                      className="p-1 text-gray-600 hover:text-gray-800"
                    >
                      <Printer className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-white text-left text-gray-700">
                      <th className="py-3 px-4 font-medium">Student Name</th>
                      <th className="py-3 px-4 font-medium">Admission No</th>
                      <th className="py-3 px-4 font-medium">Admission Data</th>
                      <th className="py-3 px-4 font-medium">Roll Number</th>
                      <th className="py-3 px-4 font-medium">Father's Name</th>
                      <th className="py-3 px-4 font-medium">Class</th>
                      <th className="py-3 px-4 font-medium">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedStudents.length === 0 ? (
                      <tr>
                        <td
                          colSpan={7}
                          className="text-center text-red-600 font-semibold py-3"
                        >
                          No Data Found
                        </td>
                      </tr>
                    ) : (
                      displayedStudents.map((student) => (
                        <tr
                          key={student.id}
                          className="border-b border-gray-200 hover:bg-gray-100"
                        >
                          <td className="py-3 px-4">{student.name}</td>
                          <td className="py-3 px-4">{student.id}</td>
                          <td className="py-3 px-4">{student.dob}</td>
                          <td className="py-3 px-4">{student.rollNo}</td>
                          <td className="py-3 px-4">{student.fatherName}</td>
                          <td className="py-3 px-4">{student.class}</td>
                          <td className="py-3 px-4">{student.balance}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
