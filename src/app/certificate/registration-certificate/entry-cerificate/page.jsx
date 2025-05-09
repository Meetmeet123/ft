'use client';
import React, { useState } from 'react';

export default function BonafideCertificate() {
  const [formData, setFormData] = useState({
    admissionNo: '',
    studentId: '',
    firstName: '',
    fatherName: '',
    surname: '',
    motherName: '',
    caste: '',
    subCaste: '',
    religion: '',
    dobFigures: '',
    dobWords: '',
    placeOfBirth: '',
    taluka: '',
    district: '',
    state: '',
    lastSchool: '',
    admissionDate: '',
    uid: '',
    standardAdmitted: '',
    dateOfLeaving: '',
    studyingClass: '',
    reason: '',
    certificateNo: '',
    motherTongue: '',
    remark: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setFormData({});
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-5 border rounded mt-5 print:mt-0 print:border-none print:p-0">
      <div className="flex justify-between items-center border-b pb-2 print:hidden">
        <h2 className="text-lg font-semibold">Preview Entry Certificate</h2>
      </div>

      {/* Header */}
      <div className="text-center mt-4 mb-2">
        <img src="/school-logo.png" alt="logo" className="h-20 mx-auto mb-2" />
        <p className="font-semibold">Dolittle Global School</p>
        <h1 className="text-2xl font-bold text-red-600">DOLITTLE GLOBAL SCHOOL</h1>
        <p>Hyderabad<br />Kondapur, Hyderabad<br />Email: dolittletech@gmail.com</p>
        <img src="/marathi-title.png" alt="Marathi" className="mx-auto h-10 my-3" />
      </div>

      {/* Table */}
      <table className="table-auto w-full border border-collapse">
        <tbody className="text-sm">
          <tr>
            <td className="border p-2" colSpan={2}>No.:</td>
          </tr>
          <tr>
            <td className="border p-2">Admission No.:</td>
            <td className="border p-2">
              <input name="admissionNo" value={formData.admissionNo} onChange={handleChange} className="w-full" />
            </td>
          </tr>
          <tr>
            <td className="border p-2">Student ID No.:</td>
            <td className="border p-2">
              <input name="studentId" value={formData.studentId} onChange={handleChange} className="w-full" />
            </td>
          </tr>
          <tr>
            <td className="border p-2">Name of the Pupil in full:</td>
            <td className="border p-2">
              (First Name) <input name="firstName" value={formData.firstName} onChange={handleChange} className="w-1/4 mx-1" />
              (Father's Name) <input name="fatherName" value={formData.fatherName} onChange={handleChange} className="w-1/4 mx-1" />
              (Surname) <input name="surname" value={formData.surname} onChange={handleChange} className="w-1/4 mx-1" />
            </td>
          </tr>
          <tr>
            <td className="border p-2">Mother Name:</td>
            <td className="border p-2"><input name="motherName" value={formData.motherName} onChange={handleChange} className="w-full" /></td>
          </tr>
          <tr>
            <td className="border p-2">Religion and Caste:</td>
            <td className="border p-2">
              Religion: <input name="religion" value={formData.religion} onChange={handleChange} className="w-1/4 mx-1" />
              Caste: <input name="caste" value={formData.caste} onChange={handleChange} className="w-1/4 mx-1" />
              Sub Caste: <input name="subCaste" value={formData.subCaste} onChange={handleChange} className="w-1/4 mx-1" />
            </td>
          </tr>
          <tr>
            <td className="border p-2">Date Of Birth (In Figures):</td>
            <td className="border p-2"><input name="dobFigures" value={formData.dobFigures} onChange={handleChange} className="w-full" /></td>
          </tr>
          <tr>
            <td className="border p-2">Date Of Birth (In Words):</td>
            <td className="border p-2"><input name="dobWords" value={formData.dobWords} onChange={handleChange} className="w-full" /></td>
          </tr>
          <tr>
            <td className="border p-2">Place Of Birth:</td>
            <td className="border p-2">
              Place: <input name="placeOfBirth" value={formData.placeOfBirth} onChange={handleChange} className="w-1/4 mx-1" />
              Taluka: <input name="taluka" value={formData.taluka} onChange={handleChange} className="w-1/4 mx-1" />
              District: <input name="district" value={formData.district} onChange={handleChange} className="w-1/4 mx-1" />
              State: <input name="state" value={formData.state} onChange={handleChange} className="w-1/4 mx-1" />
            </td>
          </tr>
          <tr>
            <td className="border p-2">Last School Attended:</td>
            <td className="border p-2"><input name="lastSchool" value={formData.lastSchool} onChange={handleChange} className="w-full" /></td>
          </tr>
          <tr>
            <td className="border p-2">Date Of Admission:</td>
            <td className="border p-2"><input name="admissionDate" value={formData.admissionDate} onChange={handleChange} className="w-full" /></td>
          </tr>
          <tr>
            <td className="border p-2">UID (Aadhar No.):</td>
            <td className="border p-2"><input name="uid" value={formData.uid} onChange={handleChange} className="w-full" /></td>
          </tr>
          <tr>
            <td className="border p-2">Standard to Which Admitted:</td>
            <td className="border p-2"><input name="standardAdmitted" value={formData.standardAdmitted} onChange={handleChange} className="w-full" /></td>
          </tr>
          <tr>
            <td className="border p-2">Date Of Leaving School:</td>
            <td className="border p-2"><input name="dateOfLeaving" value={formData.dateOfLeaving} onChange={handleChange} className="w-full" /></td>
          </tr>
          <tr>
            <td className="border p-2">Class Studying at Time of Leaving:</td>
            <td className="border p-2"><input name="studyingClass" value={formData.studyingClass} onChange={handleChange} className="w-full" /></td>
          </tr>
          <tr>
            <td className="border p-2">Reason For Leaving School:</td>
            <td className="border p-2"><input name="reason" value={formData.reason} onChange={handleChange} className="w-full" /></td>
          </tr>
          <tr>
            <td className="border p-2">Certificate No.:</td>
            <td className="border p-2"><input name="certificateNo" value={formData.certificateNo} onChange={handleChange} className="w-full" /></td>
          </tr>
          <tr>
            <td className="border p-2">Mother Tongue:</td>
            <td className="border p-2"><input name="motherTongue" value={formData.motherTongue} onChange={handleChange} className="w-full" /></td>
          </tr>
          <tr>
            <td className="border p-2">Remark:</td>
            <td className="border p-2"><input name="remark" value={formData.remark} onChange={handleChange} className="w-full" /></td>
          </tr>
        </tbody>
      </table>

      {/* Footer */}
      <div className="mt-4 text-sm">
        <p className="italic">Certified that above information is in accordance with the School General Register.</p>
        <div className="flex justify-between mt-4">
          <p>Date: {new Date().toLocaleDateString()}</p>
          <div className="flex justify-between w-full mt-10">
            <p className="font-semibold">Clerk</p>
            <p className="font-semibold">Principal</p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-end space-x-2 print:hidden">
        <button  style={{backgroundColor:"green",color:"white"}}onClick={handleCancel} className="bg-red-600 text-black px-4 py-2 rounded">Cancel</button>
        <button onClick={handlePrint} className="bg-green-600 text-black px-4 py-2 rounded">Confirm & Print</button>
      </div>
    </div>
  );
}
