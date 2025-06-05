"use client"
import { useState } from "react";
import { X } from "lucide-react";

function EnterMarks({onClose}){

    const [markDetails,setMarkDetails] = useState([
        {
          "admissionNo": "07874",
          "rollNo": "30210",
          "studentName": "Scarlett Kennedy",
          "class": "7th Grade(A)",
          "fatherName": "David",
          "gender": "Female",
          "marks": 67,
          "isAbsent": false
        },
        {
          "admissionNo": "18001",
          "rollNo": "101",
          "studentName": "Edward Thomas",
          "class": "7th Grade(A)",
          "fatherName": "Olivier Thomas",
          "gender": "Male",
          "marks": 90,
          "isAbsent": false
        },
        {
          "admissionNo": "18002",
          "rollNo": "102",
          "studentName": "Robin Peterson",
          "class": "7th Grade(A)",
          "fatherName": "Lucas Peterson",
          "gender": "Male",
          "marks": 78,
          "isAbsent": false
        },
        {
          "admissionNo": "18004",
          "rollNo": "109",
          "studentName": "Laura Clinton",
          "class": "7th Grade(A)",
          "fatherName": "Michael Clinton",
          "gender": "Female",
          "marks": 90,
          "isAbsent": false
        },
        {
          "admissionNo": "18005",
          "rollNo": "104",
          "studentName": "Glen Stark",
          "class": "7th Grade(B)",
          "fatherName": "James Stark",
          "gender": "Male",
          "marks": 56,
          "isAbsent": false
        },
        {
          "admissionNo": "18007",
          "rollNo": "107",
          "studentName": "Brian Kohlar",
          "class": "7th Grade(A)",
          "fatherName": "Nick Kohlar",
          "gender": "Male",
          "marks": 78,
          "isAbsent": false
        },
        {
          "admissionNo": "18010",
          "rollNo": "111",
          "studentName": "Kriti Singh",
          "class": "7th Grade(B)",
          "fatherName": "Manish Singh",
          "gender": "Female",
          "marks": 56,
          "isAbsent": false
        },
        {
          "admissionNo": "18013",
          "rollNo": "113",
          "studentName": "Benjamin Gates",
          "class": "7th Grade(A)",
          "fatherName": "Nathan Gates",
          "gender": "Male",
          "marks": 0,
          "isAbsent": false
        },
        {
          "admissionNo": "18014",
          "rollNo": "4785",
          "studentName": "Devin Coinneach",
          "class": "7th Grade(A)",
          "fatherName": "jack Coinneach",
          "gender": "Male",
          "marks": 56,
          "isAbsent": false
        },
        {
          "admissionNo": "18016",
          "rollNo": "1243",
          "studentName": "Apolline",
          "class": "7th Grade(A)",
          "fatherName": "Elanie",
          "gender": "Male",
          "marks": 34,
          "isAbsent": false
        },
        {
          "admissionNo": "18023",
          "rollNo": "6541",
          "studentName": "Karuna Rana",
          "class": "7th Grade(A)",
          "fatherName": "Rajesh Rana",
          "gender": "Female",
          "marks": 33,
          "isAbsent": false
        },
        {
          "admissionNo": "18025",
          "rollNo": "18004",
          "studentName": "Jhonson wood",
          "class": "7th Grade(C)",
          "fatherName": "David",
          "gender": "Male",
          "marks": 67,
          "isAbsent": false
        },
        {
          "admissionNo": "18029",
          "rollNo": "10",
          "studentName": "Rahul Sinha",
          "class": "7th Grade(B)",
          "fatherName": "G S SINHA",
          "gender": "Male",
          "marks": 78,
          "isAbsent": false
        },
        {
          "admissionNo": "18050",
          "rollNo": "",
          "studentName": "Kenal Dezzy",
          "class": "7th Grade(A)",
          "fatherName": "Rey Dezzy",
          "gender": "Male",
          "marks": 45,
          "isAbsent": false
        },
        {
          "admissionNo": "36220",
          "rollNo": "23220",
          "studentName": "Yash Sinha",
          "class": "7th Grade(C)",
          "fatherName": "Arjun",
          "gender": "Male",
          "marks": 89,
          "isAbsent": false
        },
        {
          "admissionNo": "53322",
          "rollNo": "",
          "studentName": "Harry",
          "class": "7th Grade(C)",
          "fatherName": "kalvin",
          "gender": "Male",
          "marks": 0,
          "isAbsent": false
        },
        {
          "admissionNo": "90877",
          "rollNo": "9088887",
          "studentName": "Vikash singh",
          "class": "7th Grade(C)",
          "fatherName": "Gaurav singh",
          "gender": "Male",
          "marks": 34,
          "isAbsent": false
        },
        {
          "admissionNo": "908875",
          "rollNo": "2311",
          "studentName": "Saurabh Shah",
          "class": "7th Grade(A)",
          "fatherName": "Vinay Shah",
          "gender": "Male",
          "marks": 56,
          "isAbsent": false
        },
        {
          "admissionNo": "980879",
          "rollNo": "",
          "studentName": "Markus Stones",
          "class": "7th Grade(B)",
          "fatherName": "Jonson Stones",
          "gender": "Male",
          "marks": 34,
          "isAbsent": false
        }
      ]      
      );

      return (
        <div className="fixed z-3 top-20 bg-blue-50 p-4 w-[95%]">
          <div className="mb-4 flex justify-between ">
            <h3 className="text-xl font-semibold">Enter Marks</h3>
            <button onClick={onClose} >
                <X/>
            </button>
          </div>
    
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Admission No</th>
                  <th className="border p-2">Roll No</th>
                  <th className="border p-2">Student Name</th>
                  <th className="border p-2">Class</th>
                  <th className="border p-2">Father Name</th>
                  <th className="border p-2">Gender</th>
                  <th className="border p-2">Marks</th>
                </tr>
              </thead>
              <tbody>
                {markDetails.map((student, index) => (
                  <tr key={index} className="text-center">
                    <td className="border p-2">{student.admissionNo}</td>
                    <td className="border p-2">{student.rollNo || "-"}</td>
                    <td className="border p-2">{student.studentName}</td>
                    <td className="border p-2">{student.class}</td>
                    <td className="border p-2">{student.fatherName}</td>
                    <td className="border p-2">{student.gender}</td>
                    <td className="border p-2">
                        <input 
                            type="checkbox" 
                            checked={student.isAbsent}
                            onChange={() => {
                                const tempData = [...markDetails];
                                const newData = {...markDetails[index], isAbsent: !markDetails[index].isAbsent}; // Toggle the value
                                tempData[index] = newData;
                                setMarkDetails(tempData);
                            }}
                        />
                        <label>Mark as absent</label><br/>
                        <input 
                        onChange={(e)=>{
                            const tempData = [...markDetails]
                            const newData = {...markDetails[index],marks:e.target.value}
                            tempData[index] = newData;
                            setMarkDetails(tempData);
                        }}
                        value={student.isAbsent ? 0 : student.marks}
                        type="number"
                        />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
}

export default EnterMarks;