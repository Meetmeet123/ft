import React from "react";

const UnderlinedInput = ({ width = "200px", className = "", ...props }) => (
  <input
    type="text"
    className={`outline-none border-0 border-b border-black bg-transparent ${className}`}
    style={{ width }}
    {...props}
  />
);

export default function AdmissionForm() {
  return (
    <div className="p-8 text-[13px] font-sans text-black leading-6">
      <div className="text-center mb-4">
        <p>Established: 1950</p>
        <p>UDISE No.: 27290403402</p>
        <p>Year: 2025</p>
        <img src="/school-logo.png" alt="logo" className="mx-auto h-16" />
        <p className="font-semibold">Shyamlal Smarak Shikshan Sanstha, Udgir Sanchalit</p>
        <h1 className="font-bold text-lg">DOLITTLE GLOBAL SCHOOL</h1>
        <h2 className="font-bold mt-2">APPLICATION FORM FOR ADMISSION</h2>
        <p className="mt-2">Student ID No.: <UnderlinedInput width="150px" /></p>
      </div>

      <p><strong>To,</strong></p>
      <p><strong>The Principal,</strong></p>
      <p><strong>Dolittle Global School</strong></p>

      <p>1. Full Name Of Student (In Block Letters): <UnderlinedInput width="300px" /></p>
      <p>2. Gender (Boy or Girl): <UnderlinedInput width="100px" /> &nbsp;&nbsp;&nbsp; 3. Date Of Birth: <UnderlinedInput width="150px" /></p>
      <p>4. Date Of Birth (In Words): <UnderlinedInput width="400px" /></p>
      <p>5. Place Of Birth: <UnderlinedInput width="120px" />&nbsp; Village: <UnderlinedInput width="120px" />&nbsp; Town: <UnderlinedInput width="120px" />&nbsp; Taluka: <UnderlinedInput width="120px" /></p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; District: <UnderlinedInput width="150px" /></p>

      <p>6. A) Father's Name: <UnderlinedInput width="200px" /> Living/Not Living: <UnderlinedInput width="100px" /></p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;B) Mother's Name: <UnderlinedInput width="200px" /> Living/Not Living: <UnderlinedInput width="100px" /></p>

      <p>7. A) Educational Qualification of Father: <UnderlinedInput width="250px" /></p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;B) Educational Qualification of Mother: <UnderlinedInput width="250px" /></p>

      <p>8. A) Father’s Occupation: <UnderlinedInput width="250px" /></p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;B) Mother’s Occupation: <UnderlinedInput width="250px" /></p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;C) Parent’s Annual Income: <UnderlinedInput width="200px" /> &nbsp;&nbsp; D) Number Of Dependents: <UnderlinedInput width="50px" /></p>

      <p>9. Whether Student is Living with Parent's: <UnderlinedInput width="150px" /></p>
      <p>10. Guardian’s Name & Address: <UnderlinedInput width="300px" /></p>
      <p>11. Nationality: <UnderlinedInput width="150px" /> &nbsp;&nbsp; Religion: <UnderlinedInput width="100px" /> &nbsp;&nbsp; Caste: <UnderlinedInput width="100px" /></p>
      <p>12. Scheduled Caste/Tribe: <UnderlinedInput width="150px" /></p>
      <p>13. Mother Tongue: <UnderlinedInput width="150px" /></p>
      <p>14. Any Other Language Spoken: <UnderlinedInput width="200px" /></p>
      <p>15. Number Of Brother's: <UnderlinedInput width="50px" /> Elder Brother's: <UnderlinedInput width="50px" /> Younger Brother's: <UnderlinedInput width="50px" /></p>
      <p>16. Number Of Sister’s: <UnderlinedInput width="50px" /> Elder Sister’s: <UnderlinedInput width="50px" /> Younger Sister’s: <UnderlinedInput width="50px" /></p>
      <p>17. Permanent Address Of Student: <UnderlinedInput width="400px" /></p>
      <p>18. Present Address Of Student: <UnderlinedInput width="400px" /></p>
      <p>19. School Attended Previously:</p>

      <div className="border border-black mt-2">
        <div className="grid grid-cols-4 font-bold text-center border-b border-black">
          <div className="border-r border-black">Name of the School Attended</div>
          <div className="border-r border-black">Concession/Scholarship</div>
          <div className="border-r border-black">Standard Covered</div>
          <div>Date of Leaving and Reasons</div>
        </div>
        {[...Array(2)].map((_, i) => (
          <div className="grid grid-cols-4 h-10 border-b border-black" key={i}>
            <div className="border-r border-black"></div>
            <div className="border-r border-black"></div>
            <div className="border-r border-black"></div>
            <div></div>
          </div>
        ))}
      </div>

      <p>20. Whether the Student has Produced the School Leaving Certificate: Yes/No <UnderlinedInput width="60px" /> If Yes, Date: <UnderlinedInput width="100px" /></p>
      <p>21. Vaccinations: <UnderlinedInput width="200px" /></p>
      <p>22. Fitness Certificate (Produce/Not Produce): <UnderlinedInput width="200px" /></p>
      <p>23. Languages Studied: <UnderlinedInput width="200px" /></p>
      <p>24. Medium Of Instruction in Last School: <UnderlinedInput width="200px" /></p>
      <p>25. Parents Full Name: <UnderlinedInput width="300px" /></p>
      <p>26. Date: <UnderlinedInput width="100px" defaultValue="08-05-2025" /> &nbsp;&nbsp;&nbsp; 27. Place: <UnderlinedInput width="150px" /></p>

      <div className="text-right mt-4">Signature of Parents/Guardian</div>

      <div className="border-t border-black mt-6 pt-2">
        <h2 className="font-bold text-center">PARTICULARS TO BE FILLED BY OFFICE</h2>
        <p>1. Admitted to <UnderlinedInput width="150px" /></p>
        <p>2. Standard: <UnderlinedInput width="100px" /> Section: <UnderlinedInput width="50px" /> on Payment Prescribed/Fees: Rs. <UnderlinedInput width="100px" /></p>
        <p>3. In Words (Rupees): <UnderlinedInput width="300px" /></p>
        <p>4. Date of Admission: <UnderlinedInput width="150px" /> Admission Number: <UnderlinedInput width="150px" /></p>
        <p>5. Fee Receipt No: <UnderlinedInput width="150px" /></p>
        <p>Date: <UnderlinedInput width="100px" defaultValue="08-05-2025" /></p>
        <div className="text-right mt-4">Signature of the Principal</div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <button className="bg-red-500 text-black px-4 py-2 rounded">Cancel</button>
        <button className="bg-green-600 text-black px-4 py-2 rounded">Confirm & Print</button>
      </div>
    </div>
  );
}