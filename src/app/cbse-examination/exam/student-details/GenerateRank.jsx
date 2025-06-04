import React from "react";
import { X } from "lucide-react";

const studentData = [
  {
    admissionNo: "18001",
    name: "Edward Thomas",
    class: "Class 5(A)",
    fatherName: "Olivier Thomas",
    dob: "2014-11-03",
    gender: "Male",
    mobile: "8233366611",
    rank: 1,
  },
  {
    admissionNo: "07874",
    name: "Scarlett Kennedy",
    class: "Class 5(A)",
    fatherName: "David",
    dob: "2020-03-05",
    gender: "Female",
    mobile: "07778713673",
    rank: 2,
  },
  {
    admissionNo: "18014",
    name: "Devin Coinneach",
    class: "Class 5(A)",
    fatherName: "jack Coinneach",
    dob: "2021-06-25",
    gender: "Male",
    mobile: "7411478552",
    rank: 3,
  },
  {
    admissionNo: "18023",
    name: "Karuna Rana",
    class: "Class 5(A)",
    fatherName: "Rajesh Rana",
    dob: "2009-06-16",
    gender: "Female",
    mobile: "789654123",
    rank: 4,
  },
  {
    admissionNo: "36220",
    name: "Yash Sinha",
    class: "Class 5(C)",
    fatherName: "Arjun",
    dob: "2015-07-16",
    gender: "Male",
    mobile: "90980678",
    rank: 5,
  },
  {
    admissionNo: "18004",
    name: "Laura Clinton",
    class: "Class 5(A)",
    fatherName: "Michael Clinton",
    dob: "2015-07-01",
    gender: "Female",
    mobile: "65656546",
    rank: 6,
  },
  {
    admissionNo: "18010",
    name: "Kriti Singh",
    class: "Class 5(B)",
    fatherName: "Manish Singh",
    dob: "2015-06-17",
    gender: "Female",
    mobile: "49456454",
    rank: 7,
  },
  {
    admissionNo: "18050",
    name: "Kenal Dezzy",
    class: "Class 5(A)",
    fatherName: "Rey Dezzy",
    dob: "2022-03-29",
    gender: "Male",
    mobile: "7748965525",
    rank: 7,
  },
  {
    admissionNo: "53322",
    name: "Harry",
    class: "Class 5(C)",
    fatherName: "kalvin",
    dob: "2023-02-08",
    gender: "Male",
    mobile: "",
    rank: 8,
  },
  {
    admissionNo: "18002",
    name: "Robin Peterson",
    class: "Class 5(A)",
    fatherName: "Lucas Peterson",
    dob: "2013-07-12",
    gender: "Male",
    mobile: "69898565464",
    rank: 9,
  },
  {
    admissionNo: "90877",
    name: "Vikash singh",
    class: "Class 5(C)",
    fatherName: "Gaurav singh",
    dob: "2013-06-14",
    gender: "Male",
    mobile: "9806787867",
    rank: 9,
  },
  {
    admissionNo: "18013",
    name: "Benjamin Gates",
    class: "Class 5(A)",
    fatherName: "Nathan Gates",
    dob: "2016-03-11",
    gender: "Male",
    mobile: "4654646546",
    rank: 10,
  },
  {
    admissionNo: "18029",
    name: "Rahul Sinha",
    class: "Class 5(B)",
    fatherName: "G S SINHA",
    dob: "2010-02-10",
    gender: "Male",
    mobile: "8527413690",
    rank: 11,
  },
  {
    admissionNo: "18016",
    name: "Apolline",
    class: "Class 5(A)",
    fatherName: "Elanie",
    dob: "2010-02-16",
    gender: "Male",
    mobile: "895412630",
    rank: 12,
  },
  {
    admissionNo: "908875",
    name: "Saurabh Shah",
    class: "Class 5(A)",
    fatherName: "Vinay Shah",
    dob: "2009-07-17",
    gender: "Male",
    mobile: "89078678",
    rank: 12,
  },
  {
    admissionNo: "18007",
    name: "Brian Kohlar",
    class: "Class 5(A)",
    fatherName: "Nick Kohlar",
    dob: "2015-01-05",
    gender: "Male",
    mobile: "5646546546",
    rank: 12,
  },
  {
    admissionNo: "18005",
    name: "Glen Stark",
    class: "Class 5(B)",
    fatherName: "James Stark",
    dob: "2015-09-10",
    gender: "Male",
    mobile: "9658471234",
    rank: 12,
  },
  {
    admissionNo: "980879",
    name: "Markus Stones",
    class: "Class 5(B)",
    fatherName: "Jonson Stones",
    dob: "2018-11-15",
    gender: "Male",
    mobile: "",
    rank: 13,
  },
  {
    admissionNo: "18025",
    name: "Jhonson wood",
    class: "Class 5(C)",
    fatherName: "David",
    dob: "2010-12-25",
    gender: "Male",
    mobile: "76878567",
    rank: 14,
  },
];

function GenerateRank({onClose}) {
  return (
    <div className="p-4 fixed z-60 -left-1 top-20 bg-blue-50 max-h-[80vh] w-full overflow-y-auto ">
        <div className="flex w-full justify-end cursor-pointer" > 
            <X onClick={onClose} />
        </div>
      <h2 className="text-xl font-semibold mb-4">Generate Rank</h2>
      <div className="overflow-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">Admission No</th>
              <th className="border px-2 py-1">Student Name</th>
              <th className="border px-2 py-1">Class</th>
              <th className="border px-2 py-1">Father Name</th>
              <th className="border px-2 py-1">Date of Birth</th>
              <th className="border px-2 py-1">Gender</th>
              <th className="border px-2 py-1">Mobile No</th>
              <th className="border px-2 py-1">Rank</th>
            </tr>
          </thead>
          <tbody>
            {studentData.map((student, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border px-2 py-1">{student.admissionNo}</td>
                <td className="border px-2 py-1">{student.name}</td>
                <td className="border px-2 py-1">{student.class}</td>
                <td className="border px-2 py-1">{student.fatherName}</td>
                <td className="border px-2 py-1">{student.dob}</td>
                <td className="border px-2 py-1">{student.gender}</td>
                <td className="border px-2 py-1">{student.mobile || "-"}</td>
                <td className="border px-2 py-1">{student.rank}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GenerateRank;
