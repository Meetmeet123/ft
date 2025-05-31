import React, { useState } from 'react'
const LoginPageBackground = () => {
    return (

        <div className='w-full h-full'>
            <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-2 bg-white shadow-sm p-2">
                <div className="max-w-sm p-3 bg-white border border-gray-200 rounded-lg dark:border-gray-900">
                    <h1 className='text-xl border-b dark:border-gray-700 pb-2'>Admin Panel</h1>
                    <div className="flex flex-col items-center justify-center">
                        <img className="mb-2 pt-8 px-6" src="https://demo.smart-school.in/uploads/school_content/login_image/1663064530-1070210809632059d2b8b0b!1662796232-1721792380631c41c80d038!login_bg3.jpg?1743251939" alt="" />
                        <p className="mb-3 pt-6 font-normal text-gray-900 text-center">(170px X 184px)</p>
                    </div>
                    <div className='flex justify-end'>
                        <button type="submit" className="btn btn-primary mt-5 bg-blue-500 text-white p-1 px-2 rounded flex justify-end focus:ring-0 focus:outline-none">
                            Update
                        </button>
                    </div>
                </div>
                <div className="max-w-sm p-3 bg-white border border-gray-200 rounded-lg dark:border-gray-900">
                    <h1 className='text-xl border-b dark:border-gray-700 pb-2'>User Panel</h1>
                    <div className="flex flex-col items-center justify-center">
                        <img className="mb-2 pt-8 px-6 w-2/3 h-1/2" src="https://demo.smart-school.in/uploads/school_content/login_image/1663065284-93117584263205cc49769c!1662964519-2099955753631ed327d0ffa!login_bg5.jpg?1743256673" alt="" />
                        <p className="mb-3 pt-6 font-normal text-gray-900 text-center">(170px X 184px)</p>
                    </div>
                    <div className='flex justify-end'>
                        <button type="submit" className="btn btn-primary mt-5 bg-blue-500 text-white p-1 px-2 rounded flex justify-end focus:ring-0 focus:outline-none">
                            Update
                        </button>
                    </div>
                </div>
              
            </div>

        </div>
    );
}

export default LoginPageBackground;
