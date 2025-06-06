import React, { useState, useEffect } from 'react';
import { getGeneralSettingDetails } from '../../GeneralSettingData';

const Feespage = () => {
  // Set the default checked state for all checkboxes
  const [isChecked1, setIsChecked1] = useState(true);
  const [isChecked2, setIsChecked2] = useState(true);
  const [isChecked3, setIsChecked3] = useState(true);

  // Toggle functions to update the checkbox state
  const toggleCheckbox1 = () => setIsChecked1(!isChecked1);
  const toggleCheckbox2 = () => setIsChecked2(!isChecked2);
  const toggleCheckbox3 = () => setIsChecked3(!isChecked3);

  const [isEnabled, setIsEnabled] = useState(true); // State to track the radio button selection
  // Creating an array of states for each radio button group
  const [buttonStates, setButtonStates] = useState([true, true, true, true]); // Each item represents the enabled/disabled state for a group

  // Handler to toggle the state of a particular group
  const handleRadioChange = (index, value) => {
    const newButtonStates = [...buttonStates];
    newButtonStates[index] = value;
    setButtonStates(newButtonStates);
  };

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
    <div className="bg-white p-3 mb-3">
      <h1 className="text-xl border-b dark:border-gray-700">Fees</h1>

      <form className="">
        <div className="flex flex-col">

          <div className=" lg:flex items-center gap-20 md:block pt-4 mb-3">
            <label>Offline Bank Payment In Student Panel</label>

            {/* Group 1 */}
            <div className="flex items-center mt-3 ">
              <div className="flex items-center">
                <input
                  id="default-radio-1"
                  type="radio"
                  checked={!buttonStates[0]} // If 'isEnabled' is false, 'Disabled' will be checked
                  onChange={() => handleRadioChange(0, false)} // Set to false when 'Disabled' is selected
                  name="default-radio-1"
                  className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-0"
                />
                <label
                  htmlFor="default-radio-1"
                  className="ms-2 text-gray-600 dark:text-gray-300"
                >
                  Disabled
                </label>
              </div>

              <div className="flex items-center ml-2">
                <input
                  id="default-radio-2"
                  type="radio"
                  checked={buttonStates[0]} // If 'isEnabled' is true, 'Enabled' will be checked
                  onChange={() => handleRadioChange(0, true)} // Set to true when 'Enabled' is selected
                  name="default-radio-1"
                  className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-0"
                />
                <label
                  htmlFor="default-radio-2"
                  className="ms-2 text-gray-600 dark:text-gray-300"
                >
                  Enabled
                </label>
              </div>
            </div>
          </div>


          <div className="lg:flex md:block pt-2 ">
            <label htmlFor="" className='mt-5 w-1/3'>Offline Bank Payment Instruction</label>

            <div className="w-full mt-5">
              <div className="flex   items-center justify-between px-3 py-2 border-b border-gray-200 dark:border-gray-600 border-gray-200 mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse dark:divide-gray-600">
                  <div className="flex items-center space-x-1 rtl:space-x-reverse sm:pe-4">
                    <button
                      type="button"
                      className="p-2 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                    >
                      <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 12 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"
                        />
                      </svg>
                      <span className="sr-only">Attach file</span>
                    </button>
                    <button
                      type="button"
                      className="p-2 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                    >
                      <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 16 20"
                      >
                        <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                      </svg>
                      <span className="sr-only">Embed map</span>
                    </button>
                    <button
                      type="button"
                      className="p-2 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                    >
                      <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 16 20"
                      >
                        <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                      </svg>
                      <span className="sr-only">Upload image</span>
                    </button>
                    <button
                      type="button"
                      className="p-2 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                    >
                      <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 16 20"
                      >
                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                        <path d="M14.067 0H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.933-2ZM6.709 13.809a1 1 0 1 1-1.418 1.409l-2-2.013a1 1 0 0 1 0-1.412l2-2a1 1 0 0 1 1.414 1.414L5.412 12.5l1.297 1.309Zm6-.6-2 2.013a1 1 0 1 1-1.418-1.409l1.3-1.307-1.295-1.295a1 1 0 0 1 1.414-1.414l2 2a1 1 0 0 1-.001 1.408v.004Z" />
                      </svg>
                      <span className="sr-only">Format code</span>
                    </button>
                    <button
                      type="button"
                      className="p-2 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                    >
                      <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM13.5 6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm-7 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm3.5 9.5A5.5 5.5 0 0 1 4.6 11h10.81A5.5 5.5 0 0 1 10 15.5Z" />
                      </svg>
                      <span className="sr-only">Add emoji</span>
                    </button>
                  </div>
                  <div className="flex flex-wrap items-center space-x-1 rtl:space-x-reverse sm:ps-4">
                    <button
                      type="button"
                      className="p-2 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                    >
                      <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 21 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.5 3h9.563M9.5 9h9.563M9.5 15h9.563M1.5 13a2 2 0 1 1 3.321 1.5L1.5 17h5m-5-15 2-1v6m-2 0h4"
                        />
                      </svg>
                      <span className="sr-only">Add list</span>
                    </button>
                    <button
                      type="button"
                      className="p-2 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                    >
                      <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M18 7.5h-.423l-.452-1.09.3-.3a1.5 1.5 0 0 0 0-2.121L16.01 2.575a1.5 1.5 0 0 0-2.121 0l-.3.3-1.089-.452V2A1.5 1.5 0 0 0 11 .5H9A1.5 1.5 0 0 0 7.5 2v.423l-1.09.452-.3-.3a1.5 1.5 0 0 0-2.121 0L2.576 3.99a1.5 1.5 0 0 0 0 2.121l.3.3L2.423 7.5H2A1.5 1.5 0 0 0 .5 9v2A1.5 1.5 0 0 0 2 12.5h.423l.452 1.09-.3.3a1.5 1.5 0 0 0 0 2.121l1.415 1.413a1.5 1.5 0 0 0 2.121 0l.3-.3 1.09.452V18A1.5 1.5 0 0 0 9 19.5h2a1.5 1.5 0 0 0 1.5-1.5v-.423l1.09-.452.3.3a1.5 1.5 0 0 0 2.121 0l1.415-1.414a1.5 1.5 0 0 0 0-2.121l-.3-.3.452-1.09H18a1.5 1.5 0 0 0 1.5-1.5V9A1.5 1.5 0 0 0 18 7.5Zm-8 6a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z" />
                      </svg>
                      <span className="sr-only">Settings</span>
                    </button>
                    <button
                      type="button"
                      className="p-2 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                    >
                      <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M18 2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2ZM2 18V7h6.7l.4-.409A4.309 4.309 0 0 1 15.753 7H18v11H2Z" />
                        <path d="M8.139 10.411 5.289 13.3A1 1 0 0 0 5 14v2a1 1 0 0 0 1 1h2a1 1 0 0 0 .7-.288l2.886-2.851-3.447-3.45ZM14 8a2.463 2.463 0 0 0-3.484 0l-.971.983 3.468 3.468.987-.971A2.463 2.463 0 0 0 14 8Z" />
                      </svg>
                      <span className="sr-only">Timeline</span>
                    </button>
                    <button
                      type="button"
                      className="p-2 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                    >
                      <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
                        <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                      </svg>
                      <span className="sr-only">Download</span>
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  data-tooltip-target="tooltip-fullscreen"
                  className="p-2 text-gray-500 rounded-sm cursor-pointer sm:ms-auto hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 19 19"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 1h5m0 0v5m0-5-5 5M1.979 6V1H7m0 16.042H1.979V12M18 12v5.042h-5M13 12l5 5M2 1l5 5m0 6-5 5"
                    />
                  </svg>
                  <span className="sr-only">Full screen</span>
                </button>
                <div
                  id="tooltip-fullscreen"
                  role="tooltip"
                  className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700"
                >
                  Show full screen
                  <div className="tooltip-arrow" data-popper-arrow="" />
                </div>
              </div>
              <div className="bg-white rounded-b-lg dark:bg-gray-800">
                <label htmlFor="editor" className="sr-only">
                  Publish post
                </label>
                <textarea
                  id="editor"
                  rows={8}
                  className="block w-full px-0 text-sm text-gray-800 bg-white border-1 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                  placeholder="Write an article..."
                  required=""
                  defaultValue={""}
                />
              </div>
            </div>

          </div>

          <div className="pt-4">

            <div className="lg:flex items-center gap-20 md:block mt-4">
              <label className='mt-4' >Lock Student Panel If Fees Remaining</label>
              {/* Disabled Option */}
              <div className="flex items-center mt-4">
                <input
                  id="default-radio-1"
                  type="radio"
                  checked={!isEnabled}
                  onChange={() => setIsEnabled(false)}
                  name="default-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-0"
                />
                <label
                  htmlFor="default-radio-1"
                  className="ms-2 text-gray-600 dark:text-gray-300"
                >
                  Disabled
                </label>
              </div>

              {/* Enabled Option */}
              <div className="flex items-center mt-4">
                <input
                  id="default-radio-2"
                  type="radio"
                  checked={isEnabled}
                  onChange={() => setIsEnabled(true)}
                  name="default-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-0"
                />
                <label
                  htmlFor="default-radio-2"
                  className="ms-2 text-gray-600 dark:text-gray-300"
                >
                  Enabled
                </label>
              </div>
            </div>

            {/* Grace Period Input - Only visible when "Enabled" is selected */}
            {isEnabled && (
              <>
                <div className="lg:flex items-center md:block mb-4 mt-4">
                  <label htmlFor="" className="text-sm w-1/2 text-gray-900 dark:text-gray-800">
                    Fees Payment Grace Period Days <span className='text-red-500'>*</span>
                  </label>
                  <div className='w-full mb-4 mt-4'>
                    <input type="number" id="number-input" aria-describedby="helper-text-explanation" className="  py-1 bg-gray-50 text-xs w-120 p-2.5dark:focus:ring-0" placeholder="1" required />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User Login Option */}
          <div className="lg:flex md:block items-center pt-4">
            <label className="mr-2 w-1/3">Print Fees Receipt For</label>

            {/* Flexbox for the checkbox and label in the same row */}
            <div className="lg:flex sm:block items-center space-x-4 ">
              <div className="flex items-center m-4">
                <input
                  id="inline-2-checkbox"
                  type="checkbox"
                  checked={isChecked1}
                  onChange={toggleCheckbox1} // Toggle on click
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600 outline-none"
                />
                <label htmlFor="inline-2-checkbox" className="ms-2 text-gray-600 dark:text-gray-300">
                  Office Copy
                </label>
              </div>

              <div className="flex items-center m-4">
                <input
                  id="inline-checked-checkbox"
                  type="checkbox"
                  checked={isChecked2}
                  onChange={toggleCheckbox2} // Toggle on click
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600 outline-none"
                />
                <label htmlFor="inline-checked-checkbox" className="ms-2 text-gray-600 dark:text-gray-300">
                  Student Copy
                </label>
              </div>

              <div className="flex items-center m-4">
                <input
                  id="inline-3-checkbox"
                  type="checkbox"
                  checked={isChecked3}
                  onChange={toggleCheckbox3} // Toggle on click
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600 outline-none"
                />
                <label htmlFor="inline-3-checkbox" className="ms-2 text-gray-600 dark:text-gray-300">
                  Bank Copy
                </label>
              </div>
            </div>

          </div>
          <div className="lg:flex md:block pt-4">
            <label htmlFor="" className='w-1/3 mt-4' >Carry Forward Fees Due Days <span className='text-red-500'>*</span></label>
            <div className='md:mt-4'>
              <input type="number" id="number-input" aria-describedby="helper-text-explanation" className=' w-120 h-6  text-xs' defaultValue={settingDetails?.fee_due_days || "60"} />
            </div>
          </div>

          {/* Group 2 */}
          <div className="pt-4 ">

            <div className="lg:flex md:block items-center mt-2">
              <label htmlFor="" className='w-1/3 mt-4' >Single Page Fees Print</label>
              <div className="flex items-center mt-4">
                <input
                  id="default-radio-3"
                  type="radio"
                  checked={!buttonStates[1]} // If 'isEnabled' is false, 'Disabled' will be checked
                  onChange={() => handleRadioChange(1, false)} // Set to false when 'Disabled' is selected
                  name="default-radio-2"
                  className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-0"
                />
                <label
                  htmlFor="default-radio-3"
                  className="ms-2 text-gray-600 dark:text-gray-300"
                >
                  Disabled
                </label>
              </div>

              <div className="flex items-center lg:ml-2 mt-4">
                <input
                  id="default-radio-4"
                  type="radio"
                  checked={buttonStates[1]} // If 'isEnabled' is true, 'Enabled' will be checked
                  onChange={() => handleRadioChange(1, true)} // Set to true when 'Enabled' is selected
                  name="default-radio-2"
                  className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-0"
                />
                <label
                  htmlFor="default-radio-4"
                  className="ms-2 text-gray-600 dark:text-gray-300"
                >
                  Enabled
                </label>
              </div>
            </div>
          </div>
          {/* Group 3 */}
          <div className="lg:flex md:block items-center mt-4">
            <label htmlFor="" className='w-1/3 mt-4' >Collect Fees In Back Date</label>
            <div className="flex items-center mt-4">
              <input
                id="default-radio-5"
                type="radio"
                checked={!buttonStates[2]} // If 'isEnabled' is false, 'Disabled' will be checked
                onChange={() => handleRadioChange(2, false)} // Set to false when 'Disabled' is selected
                name="default-radio-3"
                className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-0"
              />
              <label
                htmlFor="default-radio-5"
                className="ms-2 text-gray-600 dark:text-gray-300"
              >
                Disabled
              </label>
            </div>

            <div className="flex items-center lg:ml-2 mt-4">
              <input
                id="default-radio-6"
                type="radio"
                checked={buttonStates[2]} // If 'isEnabled' is true, 'Enabled' will be checked
                onChange={() => handleRadioChange(2, true)} // Set to true when 'Enabled' is selected
                name="default-radio-3"
                className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-0"
              />
              <label
                htmlFor="default-radio-6"
                className="ms-2 text-gray-600 dark:text-gray-300"
              >
                Enabled
              </label>
            </div>
          </div>
          {/* Group 4 (New group added for Enable/Disable) */}
          <div className="lg:flex md:block items-center mt-4">
            <label htmlFor="" className='w-1/3 mt-4'>Student / Guardian Panel Fees Discount</label>
            <div className="flex items-center mt-4">
              <input
                id="default-radio-7"
                type="radio"
                checked={!buttonStates[3]} // If 'isEnabled' is false, 'Disabled' will be checked
                onChange={() => handleRadioChange(3, false)} // Set to false when 'Disabled' is selected
                name="default-radio-4"
                className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-0"
              />
              <label
                htmlFor="default-radio-7"
                className="ms-2 text-gray-600 dark:text-gray-300"
              >
                Disabled
              </label>
            </div>

            <div className="flex items-center lg:ml-2 mt-4">
              <input
                id="default-radio-8"
                type="radio"
                checked={buttonStates[3]} // If 'isEnabled' is true, 'Enabled' will be checked
                onChange={() => handleRadioChange(3, true)} // Set to true when 'Enabled' is selected
                name="default-radio-4"
                className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-0"
              />
              <label
                htmlFor="default-radio-8"
                className="ms-2 text-gray-600 dark:text-gray-300"
              >
                Enabled
              </label>
            </div>
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
  );
};

export default Feespage;

