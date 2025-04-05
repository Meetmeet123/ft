
import React from 'react';
import { FaImages } from "react-icons/fa";
import { PiEyeLight } from "react-icons/pi";
import { IoEyeOffOutline } from "react-icons/io5";
const Signature = () => {
  return (
    <div className='w-100% h-full'>
      <div className="grid grid-cols-4 gap-2 bg-white shadow-sm p-2">
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg dark:border-gray-900">
          <div className='bg-gray-100 p-2 border-b dark:border-gray-700 flex justify-between'>
            <h1 className='text-sm  font-semibold'>Clerk Signature</h1>
            <div className='flex w-10 h-6   bg-light-300 items-center justify-center border rounded hover:bg-gray-50 cursor-pointer'>

              <span><PiEyeLight />
              </span>
              <span>/</span>
              <span><IoEyeOffOutline /></span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <img className=" m-3 w-45 border  border-solid rounded-md p-1 " src="https://dltmerg64.dolittletech.co.in/uploads/school_content/logo/images.png" alt="" />
            <div className='justify-center'>
              <button type="submit" className="btn btn-primary mt-4 bg-blue-500 text-xs text-white p-1 px-2 rounded flex justify-end focus:ring-0 focus:outline-none">
                <FaImages />  Edit Sign
              </button>
            </div>
            <div style={{ color: "#a94442" }}>
              <p className="mb-3 text-xs pt-2 text-center">Standard Dimension(140px X 80px) </p>

            </div>
          </div>

        </div>
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg dark:border-gray-900">
          <div className='bg-gray-100 p-2 border-b dark:border-gray-700 flex justify-between'>
            <h1 className='text-sm  font-semibold'>Examiner Signature</h1>
            <div className='flex w-10 h-6   bg-light-300 items-center justify-center border rounded hover:bg-gray-50 cursor-pointer'>

              <span><PiEyeLight />
              </span>
              <span>/</span>
              <span><IoEyeOffOutline /></span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <img className=" m-3 w-45 border  border-solid rounded-md p-1 " src="https://dltmerg64.dolittletech.co.in/uploads/school_content/logo/images.png" alt="" />
            <div className='justify-center'>
              <button type="submit" className="btn btn-primary mt-4 bg-blue-500 text-xs text-white p-1 px-2 rounded flex justify-end focus:ring-0 focus:outline-none">
                <FaImages />  Edit Sign
              </button>
            </div>
            <div style={{ color: "#a94442" }}>
              <p className="mb-3 text-xs pt-2 text-center">Standard Dimension(140px X 80px) </p>

            </div>
          </div>

        </div>
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg dark:border-gray-900">
          <div className='bg-gray-100 p-2 border-b dark:border-gray-700 flex justify-between'>
            <h1 className='text-sm  font-semibold'>Principal Signature</h1>
            <div className='flex w-10 h-6   bg-light-300 items-center justify-center border rounded hover:bg-gray-50 cursor-pointer'>

              <span><PiEyeLight />
              </span>
              <span>/</span>
              <span><IoEyeOffOutline /></span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <img className=" m-3 w-45 border  border-solid rounded-md p-1 " src="https://dltmerg64.dolittletech.co.in/uploads/school_content/logo/images.png" alt="" />
            <div className='justify-center'>
              <button type="submit" className="btn btn-primary mt-4 bg-blue-500 text-white p-1 px-2 text-xs rounded flex justify-end focus:ring-0 focus:outline-none">
                <FaImages />  Edit Sign
              </button>
            </div>
            <div style={{ color: "#a94442" }}>
              <p className="mb-3 text-xs pt-2 text-center">Standard Dimension(140px X 80px) </p>

            </div>
          </div>

        </div>
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg dark:border-gray-900">
          <div className='bg-gray-100 p-2 border-b dark:border-gray-700 flex justify-between'>
            <h1 className='text-sm  font-semibold'>Class Teacher</h1>
            <div className='flex w-10 h-6   bg-light-300 items-center justify-center border rounded hover:bg-gray-50 cursor-pointer'>

              <span><PiEyeLight />
              </span>
              <span>/</span>
              <span><IoEyeOffOutline /></span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <img className=" m-3 w-45 border  border-solid rounded-md p-1 " src="https://dltmerg64.dolittletech.co.in/uploads/school_content/logo/images.png" alt="" />
            <div className='justify-center'>
              <button type="submit" className="btn btn-primary mt-4 bg-blue-500 text-xs text-white p-1 px-2 rounded flex justify-end focus:ring-0 focus:outline-none">
                <FaImages />  Edit Sign
              </button>
            </div>
            <div style={{ color: "#a94442" }}>
              <p className="mb-3 text-xs pt-2 text-center">Standard Dimension(140px X 80px) </p>

            </div>
          </div>

        </div>


      </div>

    </div>

  );
}

export default Signature;
