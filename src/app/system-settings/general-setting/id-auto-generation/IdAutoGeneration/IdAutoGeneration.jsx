import React, { useState, useEffect } from 'react';
import { getGeneralSettingDetails } from '../../GeneralSettingData';

const IdAutoGeneration = () => {

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


    // Initialize the buttonStates array to [false, false] to make both radio buttons disabled by default
    const [buttonStates, setButtonStates] = useState([false, false]);

    // Function to handle radio button changes
    const handleRadioChange = (index, value) => {
        const updatedButtonStates = [...buttonStates];
        updatedButtonStates[index] = value;
        setButtonStates(updatedButtonStates);
    };

    return (
        <div className="w-full h-full bg-white p-3 relative">
            {/* Background content wrapper */}
            <div>
                <h1 className="text-xl border-b dark:border-gray-700 pb-2">ID Auto Generation</h1>
                <form className=''>
                    <div className="flex flex-col">
                        <div className="flex justify-between items-center pt-4">
                            <h2 className="text-base">Student Admission No. Auto Generation</h2>
                        </div>
                        {/* Group 1 */}
                        <div className="lg:flex md:block pt-4">
                            <label htmlFor="" className='w-1/3 mt-4'>Auto Admission No.</label>
                            <div className="flex items-center mt-4">
                                <input
                                    id="default-radio-1"
                                    type="radio"
                                    checked={!buttonStates[0]} // If 'buttonStates[0]' is false, 'Disabled' will be checked
                                    onChange={() => handleRadioChange(0, false)} // Set to false when 'Disabled' is selected
                                    name="default-radio-1"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-0"
                                />
                                <label htmlFor="default-radio-1" className="ms-2 text-gray-900 dark:text-gray-300">
                                    Disabled
                                </label>
                            </div>
                            <div className="flex items-center lg:ml-2 mt-4">
                                <input
                                    id="default-radio-2"
                                    type="radio"
                                    checked={buttonStates[0]} // If 'buttonStates[0]' is true, 'Enabled' will be checked
                                    onChange={() => handleRadioChange(0, true)} // Set to true when 'Enabled' is selected
                                    name="default-radio-1"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-0"
                                />
                                <label htmlFor="default-radio-2" className="ms-2 text-gray-900 dark:text-gray-300">
                                    Enabled
                                </label>
                            </div>
                        </div>


                        <div className="lg:flex md:block justify-between items-center pt-4">
                            <label htmlFor="" className='w-1/3 mt-4' >Admission No. Prefix <span className='text-red-500'>*</span></label>
                            <input type="text" className='py-1 w-full h-6 text-xs mt-4' />
                        </div>

                        <div className="lg:flex md:block justify-between items-center pt-3">
                            <label htmlFor="" className='w-1/3 mt-4'>Admission No. Digit <span className='text-red-500'>*</span></label>
                            <select className='w-full py-1 h-6 text-xs mt-4'>
                                <option value="select">Select</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>

                            </select>
                        </div>
                        <div className="lg:flex md:block justify-between items-center pt-4">
                            <label htmlFor="" className='w-1/3 mt-4' >Admission Start From  <span className='text-red-500'>*</span></label>
                            <input type="text" className='py-1 w-full h-6 text-xs mt-4' />
                        </div>
                    </div>
                    <div className="flex flex-col ">
                        <div className="flex justify-between items-center border-t dark:border-gray-700 my-4">
                            <h2 className="text-base pt-2">Staff ID Auto Generation</h2>
                        </div>

                        {/* Group 2 */}
                        <div className="lg:flex md:block items-center">
                            <label htmlFor="" className='w-1/3 mt-4' >Auto Staff ID</label>
                            <div className="flex items-center mt-4">
                                <input
                                    id="default-radio-3"
                                    type="radio"
                                    checked={!buttonStates[1]} // Disabled selected when false
                                    onChange={() => handleRadioChange(1, false)} // Set to false when 'Disabled' is selected
                                    name="default-radio-2"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-0"
                                />
                                <label htmlFor="default-radio-3" className="ms-2 text-gray-600 dark:text-gray-300">
                                    Disabled
                                </label>
                            </div>
                            <div className="flex items-center lg:ml-4 mt-4">
                                <input
                                    id="default-radio-4"
                                    type="radio"
                                    checked={buttonStates[1]} // Enabled selected when true
                                    onChange={() => handleRadioChange(1, true)} // Set to true when 'Enabled' is selected
                                    name="default-radio-2"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-0"
                                />
                                <label htmlFor="default-radio-4" className="ms-2 text-gray-600 dark:text-gray-300">
                                    Enabled
                                </label>
                            </div>
                        </div>

                        <div className="lg:flex md:block justify-between items-center pt-4">
                            <label htmlFor="" className='w-1/3 mt-4'>Staff ID Prefix <span className='text-red-500'>*</span></label>
                            <input type="text" className='py-1 w-full mt-4 h-6 text-xs' defaultValue={settingDetails?.staffid_auto_insert} />
                        </div>

                        <div className="lg:flex md:block justify-between items-center pt-3">
                            <label htmlFor="" className='w-1/3 mt-4' >Staff No. Digit <span className='text-red-500'>*</span></label>
                            <select className='w-full mt-4 py-1 h-6 text-xs' value={settingDetails?.staffid_no_digit} >
                                <option value="select">Select</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>

                            </select>
                        </div>
                        <div className="lg:flex md:block justify-between items-center pt-4">
                            <label htmlFor="" className='w-1/3 mt-4'>Staff ID Start From <span className='text-red-500'>*</span></label>
                            <input type="text" className='py-1 w-full mt-4 h-6 text-xs' defaultValue={settingDetails?.staffid_start_from} />
                        </div>
                    </div>
                    {/* Save Button */}
                    <div className="flex justify-end mt-5 border-t dark:border-gray-700">
                        <button type=''
                            className="btn btn-primary bg-blue-500 text-white p-1 mt-2 px-2 rounded focus:ring-0 focus:outline-none"
                        >
                            Save
                        </button>
                    </div>
                </form>



            </div>
        </div>
    );
};

export default IdAutoGeneration;

