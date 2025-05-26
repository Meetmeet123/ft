"use client"
import React from 'react';
import { Eye, Image, EyeOff } from "lucide-react";
import { getGeneralSettingDetails } from '../../GeneralSettingData';
import { useState, useEffect } from 'react';

const Signature = () => {

  const [settingDetails, setSettingDetails] = useState();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getGeneralSettingDetails();
        setSettingDetails(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSettings();
  }, []);

  return (
    <div className='w-100% h-full'>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-2 bg-white shadow-sm p-2">
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg dark:border-gray-900">
          <div className='bg-gray-100 p-2 border-b dark:border-gray-700 flex justify-between'>
            <h1 className='text-sm  font-semibold'>Clerk Signature</h1>
            <div className='flex w-10 h-6   bg-light-300 items-center justify-center border rounded hover:bg-gray-50 cursor-pointer'>

              <span><Eye className='h-5 w-5' />
              </span>
              <span>/</span>
              <span><EyeOff className='w-5 h-5'/></span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <img className=" m-3 w-45 border  border-solid rounded-md p-1 " src={settingDetails?.clerk_sign || "https://dltmerg64.dolittletech.co.in/uploads/school_content/logo/images.png"} alt="" />
            <div className='justify-center'>
              <button type="submit" className="btn btn-primary mt-4 bg-blue-500 text-xs text-white p-1 px-2 rounded flex justify-end focus:ring-0 focus:outline-none">
                <Image />  Edit Sign
              </button>
            </div>
            <div>
              <p className="mb-3 text-xs pt-2 text-center text-red-600">Standard Dimension(140px X 80px) </p>

            </div>
          </div>

        </div>
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg dark:border-gray-900">
          <div className='bg-gray-100 p-2 border-b dark:border-gray-700 flex justify-between'>
            <h1 className='text-sm  font-semibold'>Examiner Signature</h1>
            <div className='flex w-10 h-6   bg-light-300 items-center justify-center border rounded hover:bg-gray-50 cursor-pointer'>

              <span><Eye className='w-5 h-5' />
              </span>
              <span>/</span>
              <span><EyeOff className='w-5 h-5' /></span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <img className=" m-3 w-45 border  border-solid rounded-md p-1 " src={settingDetails?.examiner_sign || "https://dltmerg64.dolittletech.co.in/uploads/school_content/logo/images.png"} alt="" />
            <div className='justify-center'>
              <button type="submit" className="btn btn-primary mt-4 bg-blue-500 text-xs text-white p-1 px-2 rounded flex justify-end focus:ring-0 focus:outline-none">
                <Image />  Edit Sign
              </button>
            </div>
            <div >
              <p className="mb-3 text-xs pt-2 text-center text-red-600">Standard Dimension(140px X 80px) </p>

            </div>
          </div>

        </div>
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg dark:border-gray-900">
          <div className='bg-gray-100 p-2 border-b dark:border-gray-700 flex justify-between'>
            <h1 className='text-sm  font-semibold'>Principal Signature</h1>
            <div className='flex w-10 h-6   bg-light-300 items-center justify-center border rounded hover:bg-gray-50 cursor-pointer'>

              <span><Eye className='w-5 h-5' />
              </span>
              <span>/</span>
              <span><EyeOff className='w-5 h-5' /></span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <img className=" m-3 w-45 border  border-solid rounded-md p-1 " src={settingDetails?.principal_sign || "https://dltmerg64.dolittletech.co.in/uploads/school_content/logo/images.png"} alt="" />
            <div className='justify-center'>
              <button type="submit" className="btn btn-primary mt-4 bg-blue-500 text-xs text-white p-1 px-2 rounded flex justify-end focus:ring-0 focus:outline-none">
                <Image />  Edit Sign
              </button>
            </div>
            <div >
              <p className="mb-3 text-xs pt-2 text-center text-red-600">Standard Dimension(140px X 80px) </p>

            </div>
          </div>

        </div>
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg dark:border-gray-900">
          <div className='bg-gray-100 p-2 border-b dark:border-gray-700 flex justify-between'>
            <h1 className='text-sm  font-semibold'>Class Teacher</h1>
            <div className='flex w-10 h-6   bg-light-300 items-center justify-center border rounded hover:bg-gray-50 cursor-pointer'>

              <span><Eye className='w-5 h-5' />
              </span>
              <span>/</span>
              <span><EyeOff className='w-5 h-5' /></span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <img className=" m-3 w-45 border  border-solid rounded-md p-1 " src={settingDetails?.class_teacher || "https://dltmerg64.dolittletech.co.in/uploads/school_content/logo/images.png"} alt="" />
            <div className='justify-center'>
              <button type="submit" className="btn btn-primary mt-4 bg-blue-500 text-xs text-white p-1 px-2 rounded flex justify-end focus:ring-0 focus:outline-none">
                <Image />  Edit Sign
              </button>
            </div>
            <div >
              <p className="mb-3 text-xs pt-2 text-center text-red-600">Standard Dimension(140px X 80px) </p>

            </div>
          </div>
        </div>
      </div>

    </div>

  );
}

export default Signature;
