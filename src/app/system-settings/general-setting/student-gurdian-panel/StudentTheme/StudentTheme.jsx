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
  // State to manage if the radio button should be enabled or disabled
  const [isDisabled, setIsDisabled] = useState(false);

  // Toggle the disabled state
  const toggleDisable = () => setIsDisabled(prevState => !prevState);
  return (
    <div className="bg-white p-3">
      <h1 className="text-xl border-b dark:border-gray-700 pb-2">Student / Guardian Panel</h1>

      <form className="border-b dark:border-gray-700 pb-6">
        <div className="flex flex-col">
          {/* User Login Option */}
          <div className="flex items-center pt-2">
            <label className="mr-2">User Login Option</label>

            {/* Flexbox for the checkbox and label in the same row */}
            <div className="flex items-center space-x-4 ml-60">
              <div className="flex items-center">
                <input
                  id="inline-2-checkbox"
                  type="checkbox"
                  checked={isChecked1}
                  onChange={toggleCheckbox1} // Toggle on click
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600 outline-none"
                />
                <label
                  htmlFor="inline-2-checkbox"
                  className="ms-2 text-gray-900 dark:text-gray-300"
                >
                  Student Login
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="inline-checked-checkbox"
                  type="checkbox"
                  checked={isChecked2}
                  onChange={toggleCheckbox2} // Toggle on click
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600 outline-none"
                />
                <label
                  htmlFor="inline-checked-checkbox"
                  className="ms-2 text-gray-900 dark:text-gray-300"
                >
                  Parent Login
                </label>
              </div>
            </div>
          </div>

          {/* Color Code Inputs */}
          <div className="flex items-center pt-4">
            <label>Additional Username Option For Student Login</label>
            <div className="flex items-center me-4 ml-18">
              <input id="inline-checkbox" type="checkbox" value="number" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor="inline-checkbox" className="ms-2 text-gray-900 dark:text-gray-300">Admission No</label>
            </div>
            <div className="flex items-center me-4">
              <input id="inline-checkbox" type="checkbox" value="number" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor="inline-checkbox" className="ms-2 text-gray-900 dark:text-gray-300">Mobile Number </label>
            </div>
            <div className="flex items-center me-4">
              <input id="inline-checkbox" type="checkbox" value="email" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor="inline-checkbox" className="ms-2 text-gray-900 dark:text-gray-300">Email</label>
            </div>
          </div>
          <div className="flex items-center pt-4">
            <label>Additional Username Option For Parent Login</label>
            <div className="flex items-center me-4 ml-20">
              <input id="inline-checkbox" type="checkbox" value="number" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor="inline-checkbox" className="ms-2 text-gray-900 dark:text-gray-300">Mobile Number</label>
            </div>
            <div className="flex items-center me-4">
              <input id="inline-checkbox" type="checkbox" value="email" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor="inline-checkbox" className="ms-2 text-gray-900 dark:text-gray-300">Email </label>
            </div>
          </div>
          <div className="flex items-center pt-4">
            <label>Allow Student To Add Timeline</label>

            <div className="mb-4 ml-43">
              <label className="inline-flex ">
                <input
                  type="radio"
                  name="theme"
                  value="light"
                  disabled={isDisabled}
                  className={`form-radio h-4 w-4 text-blue-600 ${isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                    }`}
                />
                <span className="ml-2">Disabled</span>
              </label>
            </div>

            <div className="mb-4 ml-7">
              <label className="inline-flex">
                <input
                  type="radio"
                  name="theme"
                  value="dark"
                  disabled={isDisabled}
                  className={`form-radio h-4 w-4 text-blue-600 ${isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                    }`}
                />
                <span className="ml-2">Enabled</span>
              </label>
            </div>

            <div>
              <button
                onClick={toggleDisable}
                className="mt-4 px-4 py-2 text-white rounded-md "
              >
                {isDisabled ? 'Enable Radio Buttons' : 'Disable Radio Buttons'}
              </button>
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
