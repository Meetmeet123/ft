
import React, { useState } from 'react';

const Miscellaneous = () => {
  const [buttonStates, setButtonStates] = useState([false, false, false, false, false, false, false]); // Each item represents the enabled/disabled state for a group

  // Handler to toggle the state of a particular group
  const handleRadioChange = (index, value) => {
    const newButtonStates = [...buttonStates];
    newButtonStates[index] = value;
    setButtonStates(newButtonStates);
  };
  return (
    <div className="bg-white p-3">
      <h1 className="text-xl border-b dark:border-gray-700 pb-2">Miscellaneous
      </h1>

      <form className="">
        <div className="flex flex-col">
          <h1 className='text-lg pt-2'>Online Examination</h1>
          <div className=" flex pt-2 border-b dark:border-gray-700 pb-6 ">
            <label>Show Me Only My Question</label>

            {/* Group 1 */}
            <div className="flex items-center  ">
              <div className="flex items-center ml-21">
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
                  className="ms-2 text-gray-900 dark:text-gray-300"
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
                  className="ms-2 text-gray-900 dark:text-gray-300"
                >
                  Enabled
                </label>
              </div>
            </div>
          </div>
          {/* Group 2 */}
          <div className="pt-4 border-b dark:border-gray-700 pb-6 ">
            <h1 className='text-lg'>
              ID Card Scan Code</h1>
            <div className="flex items-center mt-2">
              <label htmlFor="">Single Page Fees Print</label>
              <div className="flex items-center ml-28">
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
                  className="ms-2 text-gray-900 dark:text-gray-300"
                >
                  Disabled
                </label>
              </div>

              <div className="flex items-center ml-2">
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
                  className="ms-2 text-gray-900 dark:text-gray-300"
                >
                  Enabled
                </label>
              </div>
            </div>
          </div>
          {/* Group 3 */}
          <div className="pt-4 border-b dark:border-gray-700 pb-6 ">
            <h1 className='text-lg'>Examinations</h1>
            <div className="flex items-center mt-2">
              <label htmlFor="">Exam Result Page In Front Site</label>
              <div className="flex items-center ml-30">
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
                  className="ms-2 text-gray-900 dark:text-gray-300"
                >
                  Disabled
                </label>
              </div>

              <div className="flex items-center ml-2">
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
                  className="ms-2 text-gray-900 dark:text-gray-300"
                >
                  Enabled
                </label>
              </div>
            </div>

            <div className="flex items-center mt-2">
              <label htmlFor="">Download Admit Card In Student / Parent Panel</label>
              <div className="flex items-center ml-4">
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
                  className="ms-2 text-gray-900 dark:text-gray-300"
                >
                  Disabled
                </label>
              </div>

              <div className="flex items-center ml-2">
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
                  className="ms-2 text-gray-900 dark:text-gray-300"
                >
                  Enabled
                </label>
              </div>
            </div>

          </div>

          {/* Group 4 - New Group */}
          <div className="pt-4 ">
            <div className="flex items-center mt-2">
              <label>Teacher Restricted Mode</label>
              <div className="flex items-center ml-24">
                <input
                  id="default-radio-9"
                  type="radio"
                  checked={!buttonStates[4]}
                  onChange={() => handleRadioChange(4, false)}
                  name="default-radio-5"
                  className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-0"
                />
                <label htmlFor="default-radio-9" className="ms-2 text-gray-900 dark:text-gray-300">
                  Disabled
                </label>
              </div>
              <div className="flex items-center ml-2">
                <input
                  id="default-radio-10"
                  type="radio"
                  checked={buttonStates[4]}
                  onChange={() => handleRadioChange(4, true)}
                  name="default-radio-5"
                  className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-0"
                />
                <label htmlFor="default-radio-10" className="ms-2 text-gray-900 dark:text-gray-300">
                  Enabled
                </label>
              </div>
            </div>
          </div>
          {/* Group 5 - New Group */}
          <div className="pt-4 ">
            <div className="flex items-center mt-2">
              <label>Superadmin Visibility</label>
              <div className="flex items-center ml-30">
                <input
                  id="default-radio-11"
                  type="radio"
                  checked={!buttonStates[5]}
                  onChange={() => handleRadioChange(5, false)}
                  name="default-radio-6"
                  className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-0"
                />
                <label htmlFor="default-radio-11" className="ms-2 text-gray-900 dark:text-gray-300">
                  Disabled
                </label>
              </div>
              <div className="flex items-center ml-2">
                <input
                  id="default-radio-12"
                  type="radio"
                  checked={buttonStates[5]}
                  onChange={() => handleRadioChange(5, true)}
                  name="default-radio-6"
                  className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-0"
                />
                <label htmlFor="default-radio-12" className="ms-2 text-gray-900 dark:text-gray-300">
                  Enabled
                </label>
              </div>
            </div>
          </div>

          {/* Group 6 - New Group */}
          <div className="pt-4 pb-6">
            <div className="flex items-center mt-2">
              <label>Event Reminder</label>

              {/* Disabled Option */}
              <div className="flex items-center ml-38">
                <input
                  id="default-radio-13"
                  type="radio"
                  checked={!buttonStates[6]} // Disabled when buttonStates[6] is false
                  onChange={() => handleRadioChange(6, false)}
                  name="default-radio-7"
                  className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-0"
                />
                <label htmlFor="default-radio-13" className="ms-2 text-gray-900 dark:text-gray-300">
                  Disabled
                </label>
              </div>

              {/* Enabled Option */}
              <div className="flex items-center ml-2">
                <input
                  id="default-radio-14"
                  type="radio"
                  checked={buttonStates[6]} // Enabled when buttonStates[6] is true
                  onChange={() => handleRadioChange(6, true)}
                  name="default-radio-7"
                  className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-0"
                />
                <label htmlFor="default-radio-14" className="ms-2 text-gray-900 dark:text-gray-300">
                  Enabled
                </label>
              </div>
            </div>

            {/* Conditionally render additional input when 'Enabled' is selected */}
            {buttonStates[6] && (
              <div className="flex items-center mt-4">
                <label htmlFor="" className="text-sm text-gray-900 dark:text-gray-300">
                  Calendar Event Reminder Before Days
                </label>
                <div className='ml-4'>
                  <input type="number" id="number-input" aria-describedby="helper-text-explanation" className="  py-1 bg-gray-50 text-xs w-50 p-2.5dark:focus:ring-0" placeholder="0" required />
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center">
            <label htmlFor="">Staff ID Start From</label>
            <div className='ml-34'>
              <input type="text" className='py-1 w-80 h-6 text-xs' />
            </div>
          </div>
        </div>
        {/* Save Button */}
        <div className="flex justify-end mt-5 border-t dark:border-gray-700 ">
          <button type=''
            className="btn btn-primary bg-blue-500 text-white p-1 px-2  mt-2 rounded focus:ring-0 focus:outline-none"
          >
            Save
          </button>
        </div>
      </form >

    </div>
  );
};

export default Miscellaneous;

