import React, { useState, useEffect } from 'react';
import { getGeneralSettingDetails } from '../../GeneralSettingData';

const MobileThemepage = () => {

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

    // State to manage modal visibility
    const [open, setOpen] = useState(false);
    const toggleModal = () => {
        setOpen(!open);
    };
    // form modal Validate
    const [purchaseCode, setPurchaseCode] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        let formErrors = {};
        // Validate the purchase code field
        if (!purchaseCode) {
            formErrors.purchaseCode = 'The Purchase Code field is required.';
        }
        // Validate the email field
        if (!email) {
            formErrors.email = 'The Email field is required.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            formErrors.email = 'Please enter a valid email address.';
        }

        // If there are errors, set them in the state
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        } else {
            setErrors({});
            // Form submission logic here (e.g., send data to an API)
            alert('Form submitted successfully!');
        }
    }

    return (
        <div className="w-full h-full bg-white p-3 relative">
            {/* Background content wrapper */}
            <div className={`transition-opacity duration-300 ${open ? 'opacity-50' : ''}`}>
                <h1 className="text-xl border-b dark:border-gray-700 pb-2">Mobile App</h1>

                <form className=' border-b dark:border-gray-700 pb-6 '>
                    <div className="flex flex-col">
                        <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 justify-between items-center pt-4">
                            <h2 className="text-base">User Mobile App</h2>
                            <div>
                                {/* Add button triggers the modal */}
                                <button
                                    type="button"
                                    onClick={toggleModal}
                                    className="btn btn-primary bg-blue-500 text-white p-1 px-2 rounded"
                                >
                                    Register your Android App
                                </button>
                            </div>
                        </div>
                        <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 justify-between items-center pt-4">
                            <label htmlFor="">User Mobile App API URL</label>
                            <input type="text" className='py-1 w-120 h-6  text-xs' defaultValue={settingDetails?.mobile_api_url || "https://demo.smart-school.in/api/"} />
                        </div>
                        <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 justify-between items-center pt-4">
                            <label htmlFor="">User Mobile App Primary Color Code</label>
                            <input type="text" className='py-1 w-120 h-6 text-xs' defaultValue={settingDetails?.app_primary_color_code || "#424242"} />
                        </div>
                        <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 justify-between items-center pt-4">
                            <label htmlFor="">User Mobile App Secondary Color Code</label>
                            <input type="text" className='py-1 w-120 h-6  text-xs' defaultValue={settingDetails?.app_secondary_color_code || "#E7F1EE"} />
                        </div>
                    </div>
                </form>
                {/* Save Button */}
                <div className="flex justify-end mt-5">
                    <button
                        className="btn btn-primary bg-blue-500 text-white p-1 px-2 rounded focus:ring-0 focus:outline-none"
                    >
                        Save
                    </button>
                </div>
            </div>

            {/* Modal structure */}
            {open && (
                <div className="fixed inset-0 flex items-center z-50 absolute  right-50 ">
                    <div className="bg-white max-w-4xl p-4 rounded-lg shadow-lg h-auto max-h-[500px] overflow-y-auto ">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center ">
                            <h2 className="text-xl font-normal mt-2">Register your Android App purchase code</h2>
                            <button onClick={toggleModal} className="text-gray-500 hover:text-gray-700 mb-10 ">
                                ✕
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className=' border-t dark:border-gray-700 pb-4 w-full'>
                            <form onSubmit={handleSubmit}>
                                <div className='pt-3'>
                                    <label htmlFor="purchaseCode" className='text-sm'>
                                        Envato Market Purchase Code For Smart School Android App <span className='text-sky-500 cursor-pointer'>( How To Find It? )</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="purchaseCode"
                                        value={purchaseCode}
                                        onChange={(e) => setPurchaseCode(e.target.value)}
                                        className='py-1 w-140 text-xs pt-1 mt-2'
                                    />
                                    {errors.purchaseCode && (
                                        <p className="text-red-500 text-xs mt-1">{errors.purchaseCode}</p>
                                    )}
                                </div>

                                <div className='pt-3 border-b dark:border-gray-700 pb-6'>
                                    <label htmlFor="email" className='text-sm'>
                                        Your Email Registered With Envato
                                    </label>
                                    <input
                                        type="text"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className='py-1 w-140 text-xs mt-2'
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                                    )}
                                </div>

                                <div className="flex justify-end mt-5">
                                    <button
                                        type="submit"
                                        className="btn btn-primary bg-blue-500 text-white p-1 px-2 rounded focus:ring-0 focus:outline-none"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MobileThemepage;
