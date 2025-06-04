import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

interface TimeInputProps {
  id?: string;
  label?: string;
}

const TimeInput: React.FC<TimeInputProps> = ({ id, label }) => {
  // State to store the time value for each individual input
  const [time, setTime] = useState<string>('');

  // Function to set the current time when the input is focused
  const handleFocus = (): void => {
    if (!time) { // Only set the time if it's not already set by the user
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    }
  };

  // Function to handle changes in the time input
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
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
      />
    </div>
  );
};

const AttendanceTable: React.FC = () => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-sm text-gray-900 dark:text-gray-300 bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-3">Attendance Type</th>
            <th className="px-6 py-3">Entry From (hh:mm:ss)</th>
            <th className="px-6 py-3">Entry Upto (hh:mm:ss)</th>
            <th className="px-6 py-3">Total Hour</th>
          </tr>
        </thead>
        <tbody>
          {[
            "Present (P)",
            "Late (L)",
            "Half Day (F)",
            "Half Day Second Shift (SH)"
          ].map((label: string, idx: number) => (
            <tr key={idx} className="bg-white dark:bg-gray-800 border-b">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-600 whitespace-nowrap dark:text-white"
              >
                {label}
              </th>
              {[1, 2, 3].map((_: number, index: number) => (
                <td key={index} className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="time"
                      className="rounded-md py-1 bg-gray-50 border text-gray-900 leading-none focus:ring-blue-500 focus:border-blue-500 w-full text-xs border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      min="09:00"
                      max="18:00"
                      defaultValue="00:00"
                    />
                    <span className="inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 border rounded-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const AttendanceTable2: React.FC = () => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[800px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-sm text-gray-600 dark:text-gray-400 bg-gray-100">
          <tr>
            <th className="px-6 py-3">Attendance Type</th>
            <th className="px-6 py-3">Entry From (hh:mm:ss)</th>
            <th className="px-6 py-3">Entry Upto (hh:mm:ss)</th>
            <th className="px-6 py-3">Total Hour</th>
          </tr>
        </thead>
        <tbody>
          {["Present (P)", "Late (L)", "Half Day (F)"].map((type: string, i: number) => (
            <tr key={i} className="bg-white dark:bg-gray-800 border-b">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-600 whitespace-nowrap dark:text-white"
              >
                {type}
              </th>
              {[1, 2, 3].map((_: number, index: number) => (
                <td className="px-4 py-4" key={index}>
                  <div className="flex items-center gap-2">
                    <input
                      type="time"
                      className="rounded-md py-1 bg-gray-50 border text-gray-900 leading-none focus:ring-blue-500 focus:border-blue-500 w-full text-xs border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      min="09:00"
                      max="18:00"
                      defaultValue="00:00"
                    />
                    <span className="inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 border border-gray-300 rounded-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

type TabType = 'staff' | 'student';

const AttendanceType: React.FC = () => {
  const [buttonStates, setButtonStates] = useState<boolean[]>([false, true]); // [Enabled, Disabled]

  // Handle the radio button change to set the enabled/disabled state
  const handleRadioChange = (index: number, state: boolean): void => {
    setButtonStates((prevState: boolean[]) => {
      const newState = [...prevState];
      newState[index] = state;
      return newState;
    });
  };

  const notify = (): void => {
    toast.success("Record Saved Successfully");
  };

  const [selectedStaff, setSelectedStaff] = useState<TabType>('staff'); // Active tab (initially set to 'staff')

  const handleClick = (type: TabType): void => {
    setSelectedStaff(type); // Updates the active tab to "staff" or "student"
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    // Handle select change if needed
    console.log(event.target.value);
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    notify();
  };

  const renderRoleSection = (roleName: string): React.ReactElement => (
    <div className="relative overflow-x-auto border border-gray-200 rounded-lg shadow-md dark:border-gray-700 dark:bg-gray-800 mt-4">
      <div className='flex justify-between items-center p-2 bg-gray-100'>
        <h1 className='text-black font-bold'>Role: {roleName}</h1>
        <button className="btn btn-primary bg-blue-500 text-white p-1 px-2 rounded focus:ring-0 focus:outline-none mt-2">
          Update
        </button>
      </div>
      <AttendanceTable />
    </div>
  );

  const renderClassSection = (className: string): React.ReactElement => (
    <div className="relative overflow-x-auto border border-gray-200 rounded-lg shadow-md dark:border-gray-700 dark:bg-gray-800 mt-4">
      <div className='flex justify-between items-center p-2 bg-gray-100'>
        <h1 className='text-black font-bold'>Class: {className}</h1>
        <button className="btn btn-primary bg-blue-500 text-white p-1 px-2 rounded focus:ring-0 focus:outline-none mt-2">
          Update
        </button>
      </div>
      {['A', 'B', 'C', 'D'].map((section: string) => (
        <div key={section}>
          <div className='flex items-center justify-center pt-4'>
            <h1 className={`text-lg ${section === 'A' && selectedStaff === 'student' ? 'text-white' : ''}`}>
              Section: {section}
            </h1>
          </div>
          <AttendanceTable2 />
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full h-full relative">
      {/* Background content wrapper */}
      <div className='bg-white p-3'>
        <h1 className="text-xl border-b dark:border-gray-700 pb-2">Attendance Type</h1>
        <form>
          <div className="lg:flex md:block sm:block flex-col">
            {/* Group 1 */}
            <div className="flex flex-wrap pt-4">
              <div className="lg:flex md: mr-10">
                <label htmlFor="" className='w-full mt-4'>Attendance</label>
                <div className="flex w-full mt-4">
                  <input
                    id="default-radio-1"
                    type="radio"
                    checked={!buttonStates[0]} // If 'buttonStates[0]' is false, 'Day Wise' will be checked
                    onChange={() => handleRadioChange(0, false)} // Set to false when 'Day Wise' is selected
                    name="default-radio-1"
                    className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-0"
                  />
                  <label htmlFor="default-radio-1" className="ms-2 text-gray-600 dark:text-gray-300">
                    Day Wise
                  </label>
                </div>
                <div className="flex lg:ml-4 w-full mt-4">
                  <input
                    id="default-radio-2"
                    type="radio"
                    checked={buttonStates[0]} // If 'buttonStates[0]' is true, 'Period Wise' will be checked
                    onChange={() => handleRadioChange(0, true)} // Set to true when 'Period Wise' is selected
                    name="default-radio-1"
                    className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-0"
                  />
                  <label htmlFor="default-radio-2" className="ms-2 text-gray-600 dark:text-gray-300 w-full">
                    Period Wise
                  </label>
                </div>
              </div>

              {/* Second group (QR Code / Barcode / Biometric Attendance) */}
              <div className="lg:flex md:block">
                <div className="flex flex-col mr-4 mt-4">
                  <label htmlFor="" className="text-gray-600 dark:text-gray-300">
                    QR Code / Barcode
                  </label>
                  <label htmlFor="" className="text-gray-600 dark:text-gray-300 mt-1">
                    Biometric Attendance
                  </label>
                </div>

                {/* Enable/Disable Radio buttons */}
                <div className="flex lg:ml-6 mt-4">
                  <input
                    id="default-radio-3"
                    type="radio"
                    checked={!buttonStates[1]} // Disabled selected when false
                    onChange={() => handleRadioChange(1, false)} // Set to false when 'Disabled' is selected
                    name="default-radio-2"
                    className="w-4 h-4 text-blue-600 bg-gray-600 focus:ring-0"
                  />
                  <label htmlFor="default-radio-3" className="ms-2 text-gray-600 dark:text-gray-300">
                    Disabled
                  </label>
                </div>
                <div className="flex ml-2 mt-4">
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
            </div>

            <div className="lg:flex md:block justify-between items-center pt-4">
              <label htmlFor="" className='w-1/3'>Devices (Separate By Comma)</label>
              <input type="text" className='py-1 w-full h-6 text-xs focus:outline-none focus:border-gray-300' />
            </div>

            <div className="lg:flex md:block items-center pt-4">
              <label htmlFor="" className="flex w-1/3 items-center">
                Low Attendance Limit
                <span className="bg-blue-500 rounded-full w-4 h-4 text-white flex items-center justify-center cursor-pointer ml-2">
                  ?
                </span>
              </label>
              <div className="flex items-center w-full">
                <input type="text" className="py-1 w-full h-6 text-xs pr-2 pl-2" defaultValue="75.00" />
                <span className="text-sm h-6 flex items-center justify-center border px-2 pl-2 border-l-0">%</span>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end mt-5 border-t dark:border-gray-700">
            <button onClick={handleButtonClick} className="btn btn-primary bg-blue-500 text-white p-1 px-2 rounded focus:ring-0 focus:outline-none mt-2">
              Save
            </button>
            <ToastContainer />
          </div>
        </form>
      </div>

      <div className='mt-4'>
        <form>
          {buttonStates[1] ? (
            <div>
              <div className="flex flex-col bg-white p-3">
                <h1 className="text-xl border-b dark:border-gray-700 pb-2">
                  Class Attendance Time For Auto Attendance Submission (Day Wise With Cron Setting)
                </h1>
                <div className='flex items-center border-b dark:border-gray-700 pb-2 pt-2'>
                  <input
                    type="checkbox"
                    className="text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600 outline-none"
                  />
                  <h3 className='ml-2'>Copy First Detail For All</h3>
                </div>

                {[1, 2, 3, 4, 5].map((classNum: number) => (
                  <div key={classNum} className='lg:flex justify-evenly border-b md:block dark:border-gray-700 pb-4 pt-2'>
                    <div>
                      <h4 className='text-lg'>Class {classNum}</h4>
                    </div>
                    <div className='col-sm-8 col-lg-8 col-md-8'>
                      {['A', 'B', 'C', 'D'].map((section: string) => (
                        <div key={section} className="flex pt-3">
                          <label htmlFor="time" className="block text-sm text-black mx-6">{section}</label>
                          <TimeInput />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="flex justify-end mt-5 border-t dark:border-gray-700">
                  <button className="btn btn-primary bg-blue-500 text-white p-1 px-2 rounded focus:ring-0 focus:outline-none mt-2">
                    Save
                  </button>
                  <ToastContainer />
                </div>
              </div>

              <div className="mt-4 bg-white p-4">
                <div>
                  <nav className="flex flex-row border-b border-slate-200/60 dark:border-darkmode-400 items-center m-2">
                    <ul className="flex flex-row gap-1">
                      <li
                        style={{ borderRight: 'none', contain: 'none' }}
                        onClick={() => handleClick("staff")}
                        className={`cursor-pointer ${selectedStaff === "staff" ? "font-bold bg-gray-300 rounded p-2 border-none" : "p-2"}`}
                      >
                        <a href="#" className="hover:border-r-0 active:border-r-0">Staff</a>
                      </li>
                      <li
                        style={{ borderRight: 'none', contain: 'none' }}
                        onClick={() => handleClick("student")}
                        className={`cursor-pointer ${selectedStaff === "student" ? "font-bold bg-gray-300 rounded p-2 border-b-amber-500" : "p-2"}`}
                      >
                        <a href="#">Student</a>
                      </li>
                    </ul>
                  </nav>

                  {/* Conditionally render the content for Staff or Student */}
                  {selectedStaff === "staff" && (
                    <div className="mt-4">
                      <h2 className="text-xl border-b border-slate-200/60 dark:border-darkmode-400 pb-2 mb-2">
                        Staff Attendance Setting
                      </h2>
                      {['Admin', 'Teacher', 'Accountant', 'Librarian', 'Receptionist', 'Super Admin'].map((role: string) =>
                        <div key={role}>
                          {renderRoleSection(role)}
                        </div>
                      )}
                    </div>
                  )}

                  {selectedStaff === "student" && (
                    <div className="mt-4">
                      <div className='flex justify-between items-center p-2'>
                        <h1 className='text-black text-lg'>Student Attendance Setting</h1>
                        <select
                          className='w-50 py-1 h-6 text-xs'
                          onChange={handleSelectChange}
                        >
                          <option value="select">All Classes</option>
                          <option value="Class 1">Class 1</option>
                          <option value="Class 2">Class 2</option>
                          <option value="Class 3">Class 3</option>
                          <option value="Class 4">Class 4</option>
                          <option value="Class 5">Class 5</option>
                        </select>
                      </div>
                      {['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'].map((className: string) =>
                        renderClassSection(className)
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-4 bg-white p-4">
              <div>
                <nav className="flex flex-row border-b border-slate-200/60 dark:border-darkmode-400 items-center m-2">
                  <ul className="flex flex-row gap-1">
                    <li
                      style={{ borderRight: 'none', contain: 'none' }}
                      onClick={() => handleClick("staff")}
                      className={`cursor-pointer ${selectedStaff === "staff" ? "font-bold bg-gray-300 rounded p-2 border-none" : "p-2"}`}
                    >
                      <a href="#" className="hover:border-r-0 active:border-r-0">Staff</a>
                    </li>
                    <li
                      style={{ borderRight: 'none', contain: 'none' }}
                      onClick={() => handleClick("student")}
                      className={`cursor-pointer ${selectedStaff === "student" ? "font-bold bg-gray-300 rounded p-2 border-b-amber-500" : "p-2"}`}
                    >
                      <a href="#">Student</a>
                    </li>
                  </ul>
                </nav>

                {selectedStaff === "staff" && (
                  <div className="mt-4">
                    <h2 className="text-xl border-b border-slate-200/60 dark:border-darkmode-400 pb-2 mb-2">
                      Staff Attendance Setting
                    </h2>
                    {['Admin', 'Teacher', 'Accountant', 'Librarian', 'Receptionist', 'Super Admin'].map((role: string) =>
                      renderRoleSection(role)
                    )}
                  </div>
                )}

                {selectedStaff === "student" && (
                  <div className="mt-4">
                    <div className='flex justify-between items-center p-2'>
                      <h1 className='text-black text-lg'>Student Attendance Setting</h1>
                      <select
                        className='w-50 py-1 h-6 text-xs'
                        onChange={handleSelectChange}
                      >
                        <option value="select">All Classes</option>
                        <option value="Class 1">Class 1</option>
                        <option value="Class 2">Class 2</option>
                        <option value="Class 3">Class 3</option>
                        <option value="Class 4">Class 4</option>
                        <option value="Class 5">Class 5</option>
                      </select>
                    </div>
                    {['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'].map((className: string) =>
                      renderClassSection(className)
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AttendanceType;