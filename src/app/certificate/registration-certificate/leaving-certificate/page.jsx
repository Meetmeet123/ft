"use client";

import React, { useState } from 'react';

export default function LeavingCertificateForm() {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Data:", formData);
    window.print();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto p-4 text-sm">
      <div className="text-center">
        <img src="/school-logo.png" alt="School Logo" className="mx-auto h-24" />
        <h1 className="text-2xl font-bold text-red-600">DOLITTLE GLOBAL SCHOOL</h1>
        <p>Dolittle Global School</p>
        <p>Hyderabad</p>
        <p>Kondapur, Hyderabad</p>
        <p>Email: dolittletech@gmail.com</p>
      
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <label>
          Serial No.:
          <input name="serial_no" onChange={handleChange} className="input" />
        </label>
        <label>
          General Register No.:
          <input name="general_register_no" onChange={handleChange} className="input" />
        </label>
        <label>
          School Recognition No.:
          <input disabled value="-" className="input bg-gray-100" />
        </label>
        <label>
          Medium:
          <input disabled value="English" className="input bg-gray-100" />
        </label>
        <label>
          UDISE No.:
          <input disabled value="27290403402" className="input bg-gray-100" />
        </label>
        <label>
          Student Session:
          <select name="session" onChange={handleChange} className="input">
            <option>2021-22</option>
            <option>2022-23</option>
            <option>2023-24</option>
          </select>
        </label>
      </div>

      <hr className="my-6" />
      <div className="text-center">

      <h2 className="text-xl font-bold mt-4 text-red-600 " >SCHOOL LEAVING CERTIFICATE</h2>
      </div>
      <hr className="my-6" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label>
          Student ID No.:
          <input name="student_id" onChange={handleChange} className="input" />
        </label>
        <label>
          UID (Aadhar No.):
          <input name="uid" onChange={handleChange} className="input" />
        </label>
        <label className="col-span-2">
          Full Name Of Student:
        </label>
        <label>
          First Name:
          <input name="first_name" onChange={handleChange} className="input" />
        </label>
        <label>
          Father’s Name:
          <input name="father_name" onChange={handleChange} className="input" />
        </label>
        <label>
          Surname:
          <input name="surname" onChange={handleChange} className="input" />
        </label>
        <label className="col-span-2 text-xs text-gray-500">
          Above full name in textbox will be printed on Leaving certificate(TC)
        </label>
        <label>
          Mother Name:
          <input name="mother_name" onChange={handleChange} className="input" />
        </label>
        <label>
          Nationality:
          <input name="nationality" onChange={handleChange} className="input" />
        </label>
        <label>
          Mother Tongue:
          <input name="mother_tongue" onChange={handleChange} className="input" />
        </label>
        <label>
          Religion:
          <input name="religion" onChange={handleChange} className="input" />
        </label>
        <label>
          Caste:
          <input name="caste" onChange={handleChange} className="input" />
        </label>
        <label>
          Sub Caste:
          <input name="sub_caste" onChange={handleChange} className="input" />
        </label>

        <label>
          Place Of Birth (Rural/Urban):
          <input name="birth_place" onChange={handleChange} className="input" />
        </label>
        <label>
          Taluka:
          <input name="taluka" onChange={handleChange} className="input" />
        </label>
        <label>
          District:
          <input name="district" onChange={handleChange} className="input" />
        </label>
        <label>
          State:
          <input name="state" onChange={handleChange} className="input" />
        </label>
        <label>
          Nation:
          <input disabled value="India" className="input bg-gray-100" />
        </label>

        <label>
          Date Of Birth (In Figures):
          <input type="date" name="dob_figures" onChange={handleChange} className="input" />
        </label>
        <label>
          Date Of Birth (In Words):
          <input name="dob_words" onChange={handleChange} className="input" />
        </label>
        <label className="col-span-2">
          Name Of Previous School and Standard:
          <input name="previous_school" onChange={handleChange} className="input w-full" />
        </label>
        <label>
          Date Of Admission in this School:
          <input type="date" name="admission_date" onChange={handleChange} className="input" />
        </label>
        <label>
          Class in Which Studying and Since When:
          <input name="class_studying" defaultValue="Nursery" onChange={handleChange} className="input" />
        </label>
        <label>
          Academic Preference:
          <input name="academic_pref" onChange={handleChange} className="input" />
        </label>
        <label>
          Conduct:
          <input name="conduct" onChange={handleChange} className="input" />
        </label>
        <label>
          Date Of Leaving School:
          <input type="date" name="leaving_date" onChange={handleChange} className="input" />
        </label>
        <label>
          Reason For Leaving School:
          <input name="leaving_reason" onChange={handleChange} className="input" />
        </label>
        <label className="col-span-2">
          Remark:
          <input name="remark" onChange={handleChange} className="input w-full" />
        </label>
      </div>

      <div className="text-sm mt-4">
        This is to certify that the information mentioned above is correct as per the record of General Register of school.
      </div>

      <div className="mt-4 flex justify-between text-sm">
        <span>Date : 08-05-2025</span>
      </div>

      <div className="grid grid-cols-3 text-center text-sm mt-6">
        <div>Class Teacher</div>
        <div>Clerk</div>
        <div>Principal</div>
      </div>

      <p className="text-xs mt-2 text-red-600">Note: Legal action will be taken against the person for any kind of inauthentic done in Transfer Certificate.</p>

      <div className="mt-6 flex justify-end gap-4">
        <button type="button" className="bg-red-500 text-black px-4 py-2 rounded">Cancel</button>
        <button type="submit" className="bg-green-500 text-black px-4 py-2 rounded">Save & Print</button>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 6px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
      `}</style>
    </form>
  );
}