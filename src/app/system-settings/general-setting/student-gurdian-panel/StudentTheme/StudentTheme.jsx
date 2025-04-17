import React, { useState } from 'react';

const StudentTheme = () => {
  const [isChecked1, setIsChecked1] = useState(true);
  const [isChecked2, setIsChecked2] = useState(true);

  // Toggle function for checkbox 1
  const toggleCheckbox1 = () => {
    setIsChecked1(!isChecked1);
  };

  // Toggle function for checkbox 2
  const toggleCheckbox2 = () => {
    setIsChecked2(!isChecked2);
  };
  const [buttonStates, setButtonStates] = useState([true]); // Each item represents the enabled/disabled state for a group

  // Handler to toggle the state of a particular group
  const handleRadioChange = (index, value) => {
    const newButtonStates = [...buttonStates];
    newButtonStates[index] = value;
    setButtonStates(newButtonStates);
  };

  // Toggle the disabled state
  const toggleDisable = () => setIsDisabled(prevState => !prevState);
  return (
    <div className="bg-white p-3">
      <h1 className="text-xl border-b dark:border-gray-700 pb-2">Student / Guardian Panel</h1>

      <form className="border-b dark:border-gray-700 pb-6">
        <div className="flex flex-col">
          {/* User Login Option */}
          <div className="grid lg:grid-cols-2 md:grid-cols-1 items-center pt-2 mb-5">
            <label className="mr-2 mb-3">User Login Option</label>

            {/* Flexbox for the checkbox and label in the same row */}
            <div className="flex items-center gap-5">
              <div className="flex items-center mb-2">
                <input
                  id="inline-2-checkbox"
                  type="checkbox"
                  checked={isChecked1}
                  onChange={toggleCheckbox1} // Toggle on click
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600 outline-none"
                />
                <label
                  htmlFor="inline-2-checkbox"
                  className="ms-2 text-gray-700 dark:text-gray-300"
                >
                  Student Login
                </label>
              </div>

              <div className="flex items-center mb-2">
                <input
                  id="inline-checked-checkbox"
                  type="checkbox"
                  checked={isChecked2}
                  onChange={toggleCheckbox2} // Toggle on click
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600 outline-none"
                />
                <label
                  htmlFor="inline-checked-checkbox"
                  className="ms-2 text-gray-600 dark:text-gray-300"
                >
                  Parent Login
                </label>
              </div>
            </div>
          </div>

          {/* Color Code Inputs */}
          <div className="grid lg:grid-cols-2 md:grid-cols-1 items-center pt-4 mb-5 gap-5">
            <label className='w-full' >Additional Username Option For Student Login</label>
            <div className='w-full lg:flex items-center sm:block' >
              <div className="flex items-center w-full me-4 mb-3 ">
                <input id="inline-checkbox" type="checkbox" value="number" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="inline-checkbox" className="ms-2 text-gray-600 dark:text-gray-300">Admission No</label>
              </div>
              <div className="flex items-center me-4 w-full mb-3">
                <input id="inline-checkbox" type="checkbox" value="number" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="inline-checkbox" className="ms-2 text-gray-600 dark:text-gray-300">Mobile Number </label>
              </div>
              <div className="flex items-center me-4 w-full mb-3">
                <input id="inline-checkbox" type="checkbox" value="email" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="inline-checkbox" className="ms-2 text-gray-600 dark:text-gray-300">Email</label>
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 sm:grid-cols-1 items-center pt-4 w-full mb-5">
            <label className='mb-2' >Additional Username Option For Parent Login</label>
            <div className='lg:flex items-center sm:block' >
              <div className="flex items-center me-4 mb-3 ">
                <input id="inline-checkbox" type="checkbox" value="number" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="inline-checkbox" className="ms-2 text-gray-600 dark:text-gray-300">Mobile Number</label>
              </div>
              <div className="flex items-center me-4 mb-3">
                <input id="inline-checkbox" type="checkbox" value="email" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="inline-checkbox" className="ms-2 text-gray-600 dark:text-gray-300">Email </label>
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 sm:grid-cols-1 items-center pt-4 w-full mb-5">
            <label>Allow Student To Add Timeline</label>
            <div className="lg:flex items-center sm:block">
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
  );
};

export default StudentTheme;
