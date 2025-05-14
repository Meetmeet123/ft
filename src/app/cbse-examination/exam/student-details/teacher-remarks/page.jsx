import React from 'react';
import { X } from 'lucide-react';

const data = [
  {
    "AdmissionNo": "18016",
    "RollNo": "1243",
    "Class": "Class 5",
    "Section": "A",
    "StudentName": "Apolline",
    "Gender": "Male",
    "Marks": 212.00
  },
  {
    "AdmissionNo": "18013",
    "RollNo": "113",
    "Class": "Class 5",
    "Section": "A",
    "StudentName": "Benjamin Gates",
    "Gender": "Male",
    "Marks": 253.00
  },
  {
    "AdmissionNo": "18007",
    "RollNo": "107",
    "Class": "Class 5",
    "Section": "A",
    "StudentName": "Brian Kohlar",
    "Gender": "Male",
    "Marks": 212.00
  },
  {
    "AdmissionNo": "18014",
    "RollNo": "4785",
    "Class": "Class 5",
    "Section": "A",
    "StudentName": "Devin Coinneach",
    "Gender": "Male",
    "Marks": 324.00
  },
  {
    "AdmissionNo": "18001",
    "RollNo": "101",
    "Class": "Class 5",
    "Section": "A",
    "StudentName": "Edward Thomas",
    "Gender": "Male",
    "Marks": 441.00
  },
  {
    "AdmissionNo": "18005",
    "RollNo": "104",
    "Class": "Class 5",
    "Section": "B",
    "StudentName": "Glen Stark",
    "Gender": "Male",
    "Marks": 212.00
  },
  {
    "AdmissionNo": "53322",
    "RollNo": "",
    "Class": "Class 5",
    "Section": "C",
    "StudentName": "Harry",
    "Gender": "Male",
    "Marks": 257.00
  },
  {
    "AdmissionNo": "18025",
    "RollNo": "18004",
    "Class": "Class 5",
    "Section": "C",
    "StudentName": "Jhonson wood",
    "Gender": "Male",
    "Marks": 168.00
  },
  {
    "AdmissionNo": "18023",
    "RollNo": "6541",
    "Class": "Class 5",
    "Section": "A",
    "StudentName": "Karuna Rana",
    "Gender": "Female",
    "Marks": 290.00
  },
  {
    "AdmissionNo": "18050",
    "RollNo": "",
    "Class": "Class 5",
    "Section": "A",
    "StudentName": "Kenal Dezzy",
    "Gender": "Male",
    "Marks": 269.00
  },
  {
    "AdmissionNo": "18010",
    "RollNo": "111",
    "Class": "Class 5",
    "Section": "B",
    "StudentName": "Kriti Singh",
    "Gender": "Female",
    "Marks": 269.00
  },
  {
    "AdmissionNo": "18004",
    "RollNo": "109",
    "Class": "Class 5",
    "Section": "A",
    "StudentName": "Laura Clinton",
    "Gender": "Female",
    "Marks": 270.00
  },
  {
    "AdmissionNo": "980879",
    "RollNo": "",
    "Class": "Class 5",
    "Section": "B",
    "StudentName": "Markus Stones",
    "Gender": "Male",
    "Marks": 179.00
  },
  {
    "AdmissionNo": "18029",
    "RollNo": "10",
    "Class": "Class 5",
    "Section": "B",
    "StudentName": "Rahul Sinha",
    "Gender": "Male",
    "Marks": 223.00
  },
  {
    "AdmissionNo": "18002",
    "RollNo": "102",
    "Class": "Class 5",
    "Section": "A",
    "StudentName": "Robin Peterson",
    "Gender": "Male",
    "Marks": 255.00
  },
  {
    "AdmissionNo": "908875",
    "RollNo": "2311",
    "Class": "Class 5",
    "Section": "A",
    "StudentName": "Saurabh Shah",
    "Gender": "Male",
    "Marks": 212.00
  },
  {
    "AdmissionNo": "07874",
    "RollNo": "30210",
    "Class": "Class 5",
    "Section": "A",
    "StudentName": "Scarlett Kennedy",
    "Gender": "Female",
    "Marks": 388.00
  },
  {
    "AdmissionNo": "90877",
    "RollNo": "9088887",
    "Class": "Class 5",
    "Section": "C",
    "StudentName": "Vikash singh",
    "Gender": "Male",
    "Marks": 255.00
  },
  {
    "AdmissionNo": "36220",
    "RollNo": "23220",
    "Class": "Class 5",
    "Section": "C",
    "StudentName": "Yash Sinha",
    "Gender": "Male",
    "Marks": 277.00
  }
];

function TeacherRemarks({onClose}) {
    return (
        <div className="fixed top-20 left-1 z-60 bg-white shadow-xl rounded-xl p-6 w-full max-h-[80vh] overflow-y-auto shadow">
            <div className='flex w-full justify-end cursor-pointer' >
                <X onClick={onClose} />
            </div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-600">Teacher Remarks</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-700 border border-gray-300">
              <thead className="bg-blue-100 text-gray-900 uppercase text-xs font-semibold sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-2 border">Admission No</th>
                  <th className="px-4 py-2 border">Roll No</th>
                  <th className="px-4 py-2 border">Class</th>
                  <th className="px-4 py-2 border">Section</th>
                  <th className="px-4 py-2 border">Student Name</th>
                  <th className="px-4 py-2 border">Gender</th>
                  <th className="px-4 py-2 border">Marks</th>
                  <th className="px-4 py-2 border">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {data.map((student, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? 'bg-white' : 'bg-blue-50'}
                  >
                    <td className="px-4 py-2 border">{student.AdmissionNo}</td>
                    <td className="px-4 py-2 border">{student.RollNo}</td>
                    <td className="px-4 py-2 border">{student.Class}</td>
                    <td className="px-4 py-2 border">{student.Section}</td>
                    <td className="px-4 py-2 border">{student.StudentName}</td>
                    <td className="px-4 py-2 border">{student.Gender}</td>
                    <td className="px-4 py-2 border">{student.Marks}</td>
                    <td className="px-4 py-2 border">
                      <input
                        type="text"
                        className="w-full border min-w-50 border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring focus:ring-blue-200"
                        placeholder="Enter remark"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='w-full flex justify-end my-4' >
            <button 
            onClick={onClose}
            className='btn btn-primary' >
                Save
            </button>
          </div>
        </div>
      );
}

export default TeacherRemarks;
