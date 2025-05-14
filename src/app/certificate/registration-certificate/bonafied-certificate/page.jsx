'use client';
import React from 'react';

const bonafideData = {
  schoolLogo: '/logo.png', // Place your logo in the public folder
  schoolName: 'DOLITTLE GLOBAL SCHOOL',
  schoolAddress: 'Kondapur, Hyderabad',
  email: 'dolittletech@gmail.com',
  udise: '27290403402',
  date: '08-05-2025',
  serialNo: '',
  registerNo: '',
  studentName: 'John Doe',
  standard: '10th Standard',
  academicYear: '2024-2025',
  dob: '01-01-2010',
  dobWords: 'First January Two Thousand Ten',
  caste: 'General',
};

export default function BonafideCertificate() {
  const handlePrint = () => window.print();

  return (
    <div className="p-4 bg-white text-black font-[calibri]">
      <div className="border rounded shadow p-4 max-w-5xl mx-auto">
        <h2 className="text-lg font-semibold mb-4">Preview Bonafide Certificate</h2>
        <div className="flex justify-between items-start">
          <img src={bonafideData.schoolLogo} alt="Logo" className="h-28 w-auto" />
          <div className="text-center flex-1">
            <p className="text-sm">{bonafideData.schoolName.split(' ')[0]} Global School</p>
            <h1 className="text-red-600 text-2xl font-bold">{bonafideData.schoolName}</h1>
            <p className="text-sm">{bonafideData.schoolAddress}</p>
            <p className="text-sm">Email: {bonafideData.email}</p>
            <p className="text-sm">UDISE No: {bonafideData.udise}</p>
          </div>
          <div className="text-sm">Date : {bonafideData.date}</div>
        </div>

        <div className="text-center mt-6 mb-4">
          <div className="border-2 border-black inline-block px-6 py-2 rounded-xl text-xl font-bold">
            BONAFIDE CERTIFICATE
          </div>
        </div>

        <div className="text-sm mt-4">
          <p>Serial No. : {bonafideData.serialNo}</p>
          <p>General Register No. : {bonafideData.registerNo}</p>

          <div className="mt-4 leading-relaxed">
            <p>
              This is to certify that mister/ miss <span className="underline">{bonafideData.studentName}</span> is / was a bonafide student of this school studying in the <span className="underline">{bonafideData.standard}</span> his / her date of birth
              according to the school record is <span className="underline">{bonafideData.dob}</span> in words <span className="underline">{bonafideData.dobWords}</span> and his / her caste is <span className="underline">{bonafideData.caste}</span>.
            </p>
            <p className="mt-2">
              To the best of my knowledge and belief he / she bears a good moral character.
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-10 px-4 font-semibold">
          <div>Clerk</div>
          <div>Principal</div>
        </div>

        <div className="flex justify-end mt-6 gap-3 print:hidden">
          <button style={{backgroundColor:"red",color:"white"}}
            onClick={() => alert('Cancelled')}
            className="bg-red-500 text-black px-4 py-2 rounded hover:bg-red-600"
          >
            Cancel
          </button>
          <button style={{backgroundColor:"green",color:"white"}}
            onClick={handlePrint}
            className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-600"
          >
            Confirm & Print
          </button>
        </div>
      </div>
    </div>
  );
}
