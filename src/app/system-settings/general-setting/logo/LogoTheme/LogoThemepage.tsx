import React from 'react';

const LogoThemepage = () => {
    return (
        <div className='w-full h-full'>
            <div className="grid grid-cols-4 gap-2 bg-white shadow-sm p-2">
                <div className="max-w-sm p-3 bg-white border border-gray-200 rounded-lg dark:border-gray-900">
                    <h1 className='text-xl border-b dark:border-gray-700 pb-2'>Print Logo</h1>
                    <div className="flex flex-col items-center justify-center">
                        <img className="mb-2 pt-6 px-2 w-45" src="https://demo.smart-school.in/uploads/school_content/logo/1675055679-40706394863d7523fe0c91!1.png?1743242850" alt="" />
                        <p className="mb-3  pt-2 font-normal text-gray-900 text-center">(170px X 184px)</p>
                    </div>
                    <div className='justify-end ml-30'>
                        <button type="submit" className="btn btn-primary mt-5 bg-blue-500 text-white p-1 px-2 rounded flex justify-end focus:ring-0 focus:outline-none">
                            Update
                        </button>
                    </div>
                </div>
                <div className="max-w-sm p-3 bg-white border border-gray-200 rounded-lg dark:border-gray-700">
                    <h1 className='text-xl border-b dark:border-gray-700 pb-2'>Admin Logo</h1>
                    <div className="flex flex-col items-center justify-center">
                        <img className="mb-2 pt-6 px-2 w-45" src="https://demo.smart-school.in/uploads/school_content/logo/1675055679-40706394863d7523fe0c91!1.png?1743242850" alt="" />
                        <p className="mb-3  pt-2 font-normal text-gray-900 text-center">(170px X 184px)</p>
                    </div>
                    <div className='justify-end ml-30'>
                        <button type="submit" className="btn btn-primary mt-5 bg-blue-500 text-white p-1 px-2 rounded flex justify-end focus:ring-0 focus:outline-none">
                            Update
                        </button>
                    </div>
                </div>
                <div className="max-w-sm p-3 bg-white border border-gray-200 rounded-lg dark:border-gray-700">
                    <h1 className='text-xl border-b dark:border-gray-700 pb-2'>Admin Small Logo</h1>
                    <div className="flex flex-col items-center justify-center">
                        <img className="mb-2 pt-6 px-2 " src="https://demo.smart-school.in/uploads/school_content/admin_small_logo/1.png?1743242850" alt="" />
                        <p className="mb-3  pt-2 font-normal text-gray-900 text-center">(170px X 184px)</p>
                    </div>
                    <div className='justify-end ml-30'>
                        <button type="submit" className="btn btn-primary mt-5 bg-blue-500 text-white p-1 px-2 rounded flex justify-end focus:ring-0 focus:outline-none">
                            Update
                        </button>
                    </div>
                </div>
                <div className="max-w-sm p-3 bg-white border border-gray-200 rounded-lg dark:border-gray-700">
                    <h1 className='text-xl border-b dark:border-gray-700 pb-2'>App Logo</h1>
                    <div className="flex flex-col items-center justify-center">
                        <img className="mb-2 pt-6 px-2 w-45" src="https://demo.smart-school.in/uploads/school_content/logo/1675055679-40706394863d7523fe0c91!1.png?1743242850" alt="" />
                        <p className="mb-3  pt-2 font-normal text-gray-900 text-center">(170px X 184px)</p>
                    </div>
                    <div className='justify-end ml-30'>
                        <button type="submit" className="btn btn-primary mt-5 bg-blue-500 text-white p-1 px-2 rounded flex justify-end focus:ring-0 focus:outline-none">
                            Update
                        </button>
                    </div>
                </div>

            </div>

        </div>

    );
}

export default LogoThemepage;
