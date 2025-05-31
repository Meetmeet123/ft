"use client";
import Image from 'next/image';
import React, { useState } from 'react';

export default function ParentIDCard() {
  const [formData, setFormData] = useState({
    rollNo: '',
    name: '',
    className: '',
    fatherName: '',
    motherName: '',
    mobile: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4">
      <div className="border rounded shadow bg-white">
        <h2 className="text-lg font-semibold border-b p-4">Preview Parent’s ID Card</h2>
        <div className="p-4 flex justify-center">
          <div className="w-[600px] h-[300px] bg-[#eee] rounded-md overflow-hidden shadow relative">
            <div className="bg-[#3f207d] text-black text-center py-2">
              <div className="text-sm font-bold leading-tight " style={{color:"white"}}>
                Shyamal Shikshan Sansthan <br />
                Shyamal Vidyalaya, Udgir <br />
                Udgir, Dist. Latur, Maharashtra, Pin: 413517
              </div>
            </div>
            
            <div className="flex px-4 gap-10 pt-2">
           
              <div>
                <Image  style={{position:"relative",bottom:"40px"}} src="/male-avatar.png" alt="logo" width={70} height={70} />
              </div>
              <div className="flex px-4 pt-2">
              <Image src="/male-avatar.png" alt="male" width={70} height={70} />

              <span className="bg-red text-black text-sm px-2 py-1 ml-2">Parent’s Identity Card</span>
            </div>
              <div>
                <Image  src="/female-avatar.png" alt="female" width={70} height={70} />
              </div>
            </div>
            <div  style={{position:"relative",bottom:"80px",fontSize:"16px"}}className="text-sm text-red-600 px-4 pt-2">
              <div className="flex gap-2"><span>Roll No.:</span><input className="border-b border-gray-400 w-full" name="rollNo" value={formData.rollNo} onChange={handleChange} /></div>
              <div className="flex gap-2"><span>Name:</span><input className="border-b border-gray-400 w-full" name="name" value={formData.name} onChange={handleChange} /></div>
              <div className="flex gap-2"><span>Class:</span><input className="border-b border-gray-400 w-full" name="className" value={formData.className} onChange={handleChange} /></div>
              <div className="flex gap-2"><span>Father’s Name:</span><input className="border-b border-gray-400 w-full" name="fatherName" value={formData.fatherName} onChange={handleChange} /></div>
              <div className="flex gap-2"><span>Mother’s Name:</span><input className="border-b border-gray-400 w-full" name="motherName" value={formData.motherName} onChange={handleChange} /></div>
              <div className="flex gap-2"><span>Mobile No.:</span><input className="border-b border-gray-400 w-full" name="mobile" value={formData.mobile} onChange={handleChange} /></div>
            </div>
            <div  style={{color:"white"}} className="absolute bottom-0 left-0 w-full bg-[#3f207d] text-black text-xs px-4 py-1 flex justify-between">
              <div>
                Udgir, Dist. Latur(MH), Pin: 413517. www.shyamalaudgir.com
              </div>
              <div>Phone: +91 70666 78774</div>
            </div>
            <div  className="absolute bottom-7 right-6 text-xs text-right">
              <Image src="/principal-sign.png" alt="sign" width={40} height={20} />
              <div>Principal</div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 p-4">
          <button className="bg-red-500 text-black px-4 py-1 rounded">Cancel</button>
          <button className="bg-yellow-500 text-black px-4 py-1 rounded">Edit Details</button>
          <button className="bg-green-600 text-black px-4 py-1 rounded">Confirm & Print</button>
        </div>
      </div>
    </div>
  );
}