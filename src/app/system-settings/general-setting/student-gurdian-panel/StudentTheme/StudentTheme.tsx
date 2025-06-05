import React, { useState, useEffect } from 'react';

interface CheckboxState {
  admissionNo: boolean;
  mobileNumber: boolean;
  email: boolean;
}

interface ParentCheckboxState {
  mobileNumber: boolean;
  email: boolean;
}

const StudentTheme: React.FC = () => {
  const [isChecked1, setIsChecked1] = useState<boolean>(true);
  const [isChecked2, setIsChecked2] = useState<boolean>(true);
  
  // Student login additional options
  const [studentOptions, setStudentOptions] = useState<CheckboxState>({
    admissionNo: false,
    mobileNumber: false,
    email: false,
  });

  // Parent login additional options
  const [parentOptions, setParentOptions] = useState<ParentCheckboxState>({
    mobileNumber: false,
    email: false,
  });

  const [buttonStates, setButtonStates] = useState<boolean[]>([true]); // Each item represents the enabled/disabled state for a group

  // Toggle function for checkbox 1
  const toggleCheckbox1 = (): void => {
    setIsChecked1(!isChecked1);
  };

  // Toggle function for checkbox 2
  const toggleCheckbox2 = (): void => {
    setIsChecked2(!isChecked2);
  };

  // Handler to toggle student additional options
  const handleStudentOptionChange = (option: keyof CheckboxState): void => {
    setStudentOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  // Handler to toggle parent additional options
  const handleParentOptionChange = (option: keyof ParentCheckboxState): void => {
    setParentOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  // Handler to toggle the state of a particular group
  const handleRadioChange = (index: number, value: boolean): void => {
    const newButtonStates = [...buttonStates];
    newButtonStates[index] = value;
    setButtonStates(newButtonStates);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted with data:', {
      studentLogin: isChecked1,
      parentLogin: isChecked2,
      studentOptions,
      parentOptions,
      timelineEnabled: buttonStates[0]
    });
  };

  return (
    <div className="bg-white p-3">
      <h1 className="text-xl border-b dark:border-gray-700 pb-2">Student / Guardian Panel</h1>

      <form className="border-b dark:border-gray-700 pb-6" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          {/* User Login Option */}
          <div className="grid lg:grid-cols-2 md:grid-cols-1 items-center pt-2 mb-5">
            <label className="mr-2 mb-3">User Login Option</label>

            {/* Flexbox for the checkbox and label in the same row */}
            <div className="flex items-center gap-5">
              <div className="flex items-center mb-2">
                <input
                  id="student-login-checkbox"
                  type="checkbox"
                  checked={isChecked1}
                  onChange={toggleCheckbox1}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600 outline-none"
                />
                <label
                  htmlFor="student-login-checkbox"
                  className="ms-2 text-gray-700 dark:text-gray-300"
                >
                  Student Login
                </label>
              </div>

              <div className="flex items-center mb-2">
                <input
                  id="parent-login-checkbox"
                  type="checkbox"
                  checked={isChecked2}
                  onChange={toggleCheckbox2}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600 outline-none"
                />
                <label
                  htmlFor="parent-login-checkbox"
                  className="ms-2 text-gray-600 dark:text-gray-300"
                >
                  Parent Login
                </label>
              </div>
            </div>
          </div>

          {/* Student Additional Username Options */}
          <div className="grid lg:grid-cols-2 md:grid-cols-1 items-center pt-4 mb-5 gap-5">
            <label className='w-full'>Additional Username Option For Student Login</label>
            <div className='w-full lg:flex items-center sm:block'>
              <div className="flex items-center w-full me-4 mb-3">
                <input 
                  id="student-admission-checkbox" 
                  type="checkbox" 
                  checked={studentOptions.admissionNo}
                  onChange={() => handleStudentOptionChange('admissionNo')}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600" 
                />
                <label htmlFor="student-admission-checkbox" className="ms-2 text-gray-600 dark:text-gray-300">Admission No</label>
              </div>
              <div className="flex items-center me-4 w-full mb-3">
                <input 
                  id="student-mobile-checkbox" 
                  type="checkbox" 
                  checked={studentOptions.mobileNumber}
                  onChange={() => handleStudentOptionChange('mobileNumber')}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600" 
                />
                <label htmlFor="student-mobile-checkbox" className="ms-2 text-gray-600 dark:text-gray-300">Mobile Number</label>
              </div>
              <div className="flex items-center me-4 w-full mb-3">
                <input 
                  id="student-email-checkbox" 
                  type="checkbox" 
                  checked={studentOptions.email}
                  onChange={() => handleStudentOptionChange('email')}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600" 
                />
                <label htmlFor="student-email-checkbox" className="ms-2 text-gray-600 dark:text-gray-300">Email</label>
              </div>
            </div>
          </div>

          {/* Parent Additional Username Options */}
          <div className="grid lg:grid-cols-2 sm:grid-cols-1 items-center pt-4 w-full mb-5">
            <label className='mb-2'>Additional Username Option For Parent Login</label>
            <div className='lg:flex items-center sm:block'>
              <div className="flex items-center me-4 mb-3">
                <input 
                  id="parent-mobile-checkbox" 
                  type="checkbox" 
                  checked={parentOptions.mobileNumber}
                  onChange={() => handleParentOptionChange('mobileNumber')}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600" 
                />
                <label htmlFor="parent-mobile-checkbox" className="ms-2 text-gray-600 dark:text-gray-300">Mobile Number</label>
              </div>
              <div className="flex items-center me-4 mb-3">
                <input 
                  id="parent-email-checkbox" 
                  type="checkbox" 
                  checked={parentOptions.email}
                  onChange={() => handleParentOptionChange('email')}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600" 
                />
                <label htmlFor="parent-email-checkbox" className="ms-2 text-gray-600 dark:text-gray-300">Email</label>
              </div>
            </div>
          </div>

          {/* Timeline Option */}
          <div className="grid lg:grid-cols-2 sm:grid-cols-1 items-center pt-4 w-full mb-5">
            <label>Allow Student To Add Timeline</label>
            <div className="lg:flex items-center sm:block">
              <div className="flex items-center">
                <input
                  id="timeline-disabled-radio"
                  type="radio"
                  checked={!buttonStates[0]}
                  onChange={() => handleRadioChange(0, false)}
                  name="timeline-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-0"
                />
                <label
                  htmlFor="timeline-disabled-radio"
                  className="ms-2 text-gray-600 dark:text-gray-300"
                >
                  Disabled
                </label>
              </div>

              <div className="flex items-center ml-2">
                <input
                  id="timeline-enabled-radio"
                  type="radio"
                  checked={buttonStates[0]}
                  onChange={() => handleRadioChange(0, true)}
                  name="timeline-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-0"
                />
                <label
                  htmlFor="timeline-enabled-radio"
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
          type="submit"
          className="btn btn-primary bg-blue-500 text-white p-1 px-2 rounded focus:ring-0 focus:outline-none"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default StudentTheme;