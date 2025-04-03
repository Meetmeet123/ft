
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
function TimeInput({ id, label }) {
  // State to store the time value for each individual input
  const [time, setTime] = useState('');
  // Function to set the current time when the input is focused
  const handleFocus = () => {
    if (!time) { // Only set the time if it's not already set by the user
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    }
  };
  // Function to handle changes in the time input
  const handleChange = (event) => {
    setTime(event.target.value);
  };

  return (
    <div className="flex">
      <label htmlFor={id} className="block text-lg text-gray-500">{label}</label>
      <input
        type="time"
        id={id}
        name={id}
        value={time || ''} // Controlled input, value is linked to the state
        onFocus={handleFocus} // Set current time on focus
        onChange={handleChange} // Handle changes made by the user
        placeholder="Enter time"
        className="mt-1 block w-70 h-7 py-1 border border-gray-300 shadow-sm focus:outline-none focus:ring-0 focus:ring-gray-500 focus:border-gray-500 text-xs"
        required
      />
    </div>
  );
}
const AttendanceType = () => {
  const [buttonStates, setButtonStates] = useState([true, true]); // [Enabled, Disabled]

  // Handle the radio button change to set the enabled/disabled state
  const handleRadioChange = (index, state) => {
    setButtonStates((prevState) => {
      const newState = [...prevState];
      newState[index] = state;
      return newState;
    });
  };
  const notify = () => toast.success("Record Saved Seccessfully");


  return (

    <div className="w-full h-full relative">
      {/* Background content wrapper */}
      <div className=' bg-white p-3'>
        <h1 className="text-xl border-b dark:border-gray-700 pb-2">Attendance Type</h1>
        <form className=''>
          <div className="flex flex-col">
            {/* Group 1 */}
            <div className="flex flex-wrap pt-4">
              <div className="flex mr-10">
                <label htmlFor="">Attendance</label>
                <div className="flex ml-15">
                  <input
                    id="default-radio-1"
                    type="radio"
                    checked={!buttonStates[0]} // If 'buttonStates[0]' is false, 'Day Wise' will be checked
                    onChange={() => handleRadioChange(0, false)} // Set to false when 'Day Wise' is selected
                    name="default-radio-1"
                    className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-0"
                  />
                  <label htmlFor="default-radio-1" className="ms-2 text-gray-900 dark:text-gray-300">
                    Day Wise
                  </label>
                </div>
                <div className="flex ml-2">
                  <input
                    id="default-radio-2"
                    type="radio"
                    checked={buttonStates[0]} // If 'buttonStates[0]' is true, 'Period Wise' will be checked
                    onChange={() => handleRadioChange(0, true)} // Set to true when 'Period Wise' is selected
                    name="default-radio-1"
                    className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-0"
                  />
                  <label htmlFor="default-radio-2" className="ms-2 text-gray-900 dark:text-gray-300">
                    Period Wise
                  </label>
                </div>
              </div>

              {/* Second group (QR Code / Barcode / Biometric Attendance) */}
              <div className="flex ml-20">
                <div className="flex flex-col mr-4">
                  <label htmlFor="" className="text-gray-900 dark:text-gray-300">
                    QR Code / Barcode
                  </label>
                  <label htmlFor="" className="text-gray-900 dark:text-gray-300 mt-1">
                    Biometric Attendance
                  </label>
                </div>

                {/* Enable/Disable Radio buttons */}
                <div className="flex ml-6">
                  <input
                    id="default-radio-3"
                    type="radio"
                    checked={!buttonStates[1]} // Disabled selected when false
                    onChange={() => handleRadioChange(1, false)} // Set to false when 'Disabled' is selected
                    name="default-radio-2"
                    className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-0"
                  />
                  <label htmlFor="default-radio-3" className="ms-2 text-gray-900 dark:text-gray-300">
                    Disabled
                  </label>
                </div>
                <div className="flex ml-2">
                  <input
                    id="default-radio-4"
                    type="radio"
                    checked={buttonStates[1]} // Enabled selected when true
                    onChange={() => handleRadioChange(1, true)} // Set to true when 'Enabled' is selected
                    name="default-radio-2"
                    className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-0"
                  />
                  <label htmlFor="default-radio-4" className="ms-2 text-gray-900 dark:text-gray-300">
                    Enabled
                  </label>
                </div>
              </div>

            </div>
            <div className="flex justify-between items-center pt-4">
              <label htmlFor="">Devices (Separate By Comma)</label>
              <input type="text" className='py-1 w-140 h-6 text-xs focus:outline-none focus:border-gray-300' />
            </div>
            <div className="flex items-center pt-4">
              <label htmlFor="" className="flex items-center">
                Low Attendance Limit
                <span className="bg-blue-500 rounded-full w-4 h-4 text-white flex items-center justify-center cursor-pointer ml-2">
                  ?
                </span>
              </label>
              <div className="ml-21 inline-flex items-center">
                <input type="text" className="py-1 w-80 h-6 text-xs pr-2 pl-2" defaultValue={"75.00"} />
                <span className="text-sm h-6 flex items-center justify-center border px-2 pl-2 border-l-0">%</span>
              </div>

            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end mt-5 border-t dark:border-gray-700">
            <button onClick={notify} className="btn btn-primary bg-blue-500 text-white p-1 px-2 rounded focus:ring-0 focus:outline-none mt-2">
              Save
            </button>
            <ToastContainer />
          </div>
        </form>

      </div>

      <div className='mt-4 bg-white p-3'>
        <form className=''>
          {buttonStates[1] ? (
            <div className="flex flex-col">
              <h1 className="text-xl border-b dark:border-gray-700 pb-2">Class Attendance Time For Auto Attendance Submission (Day Wise With Cron Setting)
              </h1>
              <div className='flex items-center border-b dark:border-gray-700 pb-2 pt-2'>
                <input type="checkbox" className="text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600 outline-none"
                />
                <h3 className='ml-2'>Copy First Detail For All</h3>
              </div>

              <div className='flex col-sm-4 col-lg-4 col-md-4 border-b dark:border-gray-700 pb-4 pt-2'>
                <div>
                  <h4 className='text-lg'>Class 1</h4>
                </div>
                <div className='col-sm-8 col-lg-8 col-md-8'>

                  <div className="ml-40 flex pt-3 ">
                    <label htmlFor="time" className="block text-sm text-black mx-6">A</label>
                    <TimeInput />
                  </div>
                  <div className="ml-40 flex pt-3 ">
                    <label htmlFor="time" className="block text-sm text-black  mx-6">B</label>
                    <TimeInput />
                  </div>
                  <div className="ml-40 flex pt-3 ">
                    <label htmlFor="time" className="block text-sm text-black  mx-6">C</label>
                    <TimeInput />
                  </div>
                  <div className="ml-40 flex pt-3 ">
                    <label htmlFor="time" className="block text-sm text-black mx-6">D</label>
                    <TimeInput />
                  </div>

                </div>
              </div>
              <div className='flex col-sm-4 col-lg-4 col-md-4 border-b dark:border-gray-700 pb-4 pt-2'>
                <div>
                  <h4 className='text-lg'>Class 2</h4>
                </div>
                <div className='col-sm-8 col-lg-8 col-md-8'>

                  <div className="ml-40 flex pt-3 ">
                    <label htmlFor="time" className="block text-sm text-black  mx-6">A</label>
                    <TimeInput />
                  </div>
                  <div className="ml-40 flex pt-3 ">
                    <label htmlFor="time" className="block text-sm text-black  mx-6">B</label>
                    <TimeInput />
                  </div>
                  <div className="ml-40 flex pt-3 ">
                    <label htmlFor="time" className="block text-sm text-black mx-6">C</label>
                    <TimeInput />
                  </div>
                  <div className="ml-40 flex pt-3 ">
                    <label htmlFor="time" className="block text-sm text-black  mx-6">D</label>
                    <TimeInput />
                  </div>

                </div>
              </div>
              <div className='flex col-sm-4 col-lg-4 col-md-4 border-b dark:border-gray-700 pb-4 pt-2'>
                <div>
                  <h4 className='text-lg'>Class 3</h4>
                </div>
                <div className='col-sm-8 col-lg-8 col-md-8'>

                  <div className="ml-40 flex pt-3 ">
                    <label htmlFor="time" className="block text-sm text-black  mx-6">A</label>
                    <TimeInput />
                  </div>
                  <div className="ml-40 flex pt-3 ">
                    <label htmlFor="time" className="block text-sm text-black  mx-6">B</label>
                    <TimeInput />
                  </div>
                  <div className="ml-40 flex pt-3 ">
                    <label htmlFor="time" className="block text-sm text-black  mx-6">C</label>
                    <TimeInput />
                  </div>
                  <div className="ml-40 flex pt-3 ">
                    <label htmlFor="time" className="block text-sm text-black  mx-6">D</label>
                    <TimeInput />
                  </div>

                </div>
              </div>
              <div className='flex col-sm-4 col-lg-4 col-md-4 border-b dark:border-gray-700 pb-4 pt-2'>
                <div>
                  <h4 className='text-lg'>Class 4</h4>
                </div>
                <div className='col-sm-8 col-lg-8 col-md-8'>

                  <div className="ml-40 flex pt-3 ">
                    <label htmlFor="time" className="block text-sm text-black  mx-6">A</label>
                    <TimeInput />
                  </div>
                  <div className="ml-40 flex pt-3 ">
                    <label htmlFor="time" className="block text-sm text-black  mx-6">B</label>
                    <TimeInput />
                  </div>
                  <div className="ml-40 flex pt-3 ">
                    <label htmlFor="time" className="block text-sm text-black mx-6">C</label>
                    <TimeInput />
                  </div>
                  <div className="ml-40 flex pt-3 ">
                    <label htmlFor="time" className="block text-sm text-black mx-6">D</label>
                    <TimeInput />
                  </div>

                </div>
              </div>
              <div className='flex col-sm-4 col-lg-4 col-md-4 '>
                <div>
                  <h4 className='text-lg'>Class 5</h4>
                </div>
                <div className='col-sm-8 col-lg-8 col-md-8'>

                  <div className="ml-40 flex pt-3 ">
                    <label htmlFor="time" className="block text-sm text-black mx-6">A</label>
                    <TimeInput />
                  </div>
                  <div className="ml-40 flex pt-3 ">
                    <label htmlFor="time" className="block text-sm text-black mx-6">B</label>
                    <TimeInput />
                  </div>
                  <div className="ml-40 flex pt-3 ">
                    <label htmlFor="time" className="block text-sm text-black mx-6">C</label>
                    <TimeInput />
                  </div>
                  <div className="ml-40 flex pt-3 ">
                    <label htmlFor="time" className="block text-sm text-black  mx-6">D</label>
                    <TimeInput />
                  </div>

                </div>
              </div>

            </div>
          ) : (
            <div className="mt-4">
              {/* Form content for "Disabled" */}
              <h3>The form is currently disabled.</h3>
              <p>When enabled, you will be able to modify and save attendance details.</p>
            </div>
          )}
          <div className="flex justify-end mt-5 border-t dark:border-gray-700">
            <button className="btn btn-primary bg-blue-500 text-white p-1 px-2 rounded focus:ring-0 focus:outline-none mt-2">
              Save
            </button>
            <ToastContainer />
          </div>
        </form>

      </div>




    </div>


  );
};

export default AttendanceType;

