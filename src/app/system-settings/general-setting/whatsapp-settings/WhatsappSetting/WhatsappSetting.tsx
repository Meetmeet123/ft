import React, { useState } from 'react';
// import { ToastContainer, toast } from 'react-toastify';  // Importing ToastContainer and toast
// import 'react-toastify/dist/ReactToastify.css'; // Importing default styles for the toast

const WhatsappSetting: React.FC = () => {
  // Initialize the buttonStates array to [true, true, true] to make all radio buttons enabled by default
  const [buttonStates, setButtonStates] = useState<boolean[]>([true, true, true]);

  // Function to handle radio button changes
  const handleRadioChange = (index: number, value: boolean): void => {
    const updatedButtonStates: boolean[] = [...buttonStates];
    updatedButtonStates[index] = value;
    setButtonStates(updatedButtonStates);
  };

  const notify = (): void => {
    // toast.success("This is a success message!", {
    //   position: "top-right", // Position of the toast
    //   autoClose: 5000, // Duration of toast in milliseconds
    //   hideProgressBar: false, // Whether to show the progress bar
    //   closeOnClick: true, // Whether to close the toast when clicked
    //   pauseOnHover: true, // Whether to pause the toast on hover
    //   draggable: true, // Whether to allow dragging the toast
    //   progress: undefined, // Optional progress value
    // });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    notify();
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    notify();
  };

  return (
    <div className="w-full h-full bg-white p-3 relative">
      {/* Background content wrapper */}
      <div>
        <h1 className="text-xl border-b dark:border-gray-700 pb-2">Whatsapp Settings</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <div className="flex justify-between items-center pt-4">
              <h2 className="text-base">Front Site</h2>
            </div>
            {/* Group 1 */}
            <div className="lg:flex md:block pt-4">
              <label htmlFor="whatsapp-link-1" className='w-1/3 '>Whatsapp Link</label>
              <div className="flex items-center mb-4">
                <input
                  id="default-radio-1"
                  type="radio"
                  checked={!buttonStates[0]} // If 'buttonStates[0]' is false, 'Disabled' will be checked
                  onChange={() => handleRadioChange(0, false)} // Set to false when 'Disabled' is selected
                  name="default-radio-1"
                  className=" h-4 text-blue-600 bg-gray-100 focus:ring-0"
                />
                <label htmlFor="default-radio-1" className="ms-2 text-gray-600 dark:text-gray-300">
                  Disabled
                </label>
              </div>
              <div className="flex items-center lg:ml-2 mb-4">
                <input
                  id="default-radio-2"
                  type="radio"
                  checked={buttonStates[0]} // If 'buttonStates[0]' is true, 'Enabled' will be checked
                  onChange={() => handleRadioChange(0, true)} // Set to true when 'Enabled' is selected
                  name="default-radio-1"
                  className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-0"
                />
                <label htmlFor="default-radio-2" className="ms-2 text-gray-600 dark:text-gray-300">
                  Enabled
                </label>
              </div>
            </div>

            <div className="lg:flex md:block items-center pt-4">
              <label htmlFor="mobile-no-1" className='w-1/3' >Mobile No.</label>
              <div className='w-full'>
                <input 
                  type="text" 
                  id="mobile-no-1"
                  className='py-1 w-full h-6 text-xs' 
                  defaultValue={"9800000001"} 
                />
              </div>
            </div>
            <div className="lg:flex md:block items-center pt-4">
              <label htmlFor="time-from-1" className='w-1/3' >Time</label>
              <div className="flex">
                <input
                  type="time"
                  id="time-from-1"
                  className="rounded-none py-1 bg-gray-50 border text-gray-900 leading-none focus:ring-blue-500 focus:border-blue-500 block flex-1 w-39 text-xs border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  min="09:00"
                  max="18:00"
                  defaultValue="00:00"
                  required
                />
                <input
                  type="time"
                  id="time-to-1"
                  className="rounded-none ml-2 py-1 bg-gray-50 border text-gray-900 leading-none focus:ring-blue-500 focus:border-blue-500 block flex-1 w-39 text-xs border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  min="09:00"
                  max="18:00"
                  defaultValue="00:00"
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col border-t dark:border-gray-700 pb-2 mt-4">
            <div className="flex justify-between items-center pt-4">
            </div>
            {/* Group 2 */}
            <div className="lg:flex md:block items-center">
              <label htmlFor="whatsapp-link-2" className='w-1/3 mt-4 ' >Whatsapp Link</label>
              <div className="flex items-center mt-4">
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
              <div className="flex items-center lg:ml-2 mt-4">
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

            <div className="lg:flex md:block items-center pt-4">
              <label htmlFor="mobile-no-2" className='w-1/3 mt-4' >Mobile No.</label>
              <div className='w-full'>
                <input 
                  type="text" 
                  id="mobile-no-2"
                  className='py-1 w-full h-6 text-xs mt-4' 
                  defaultValue={"9800000001"} 
                />
              </div>
            </div>
            <div className="lg:flex md:block items-center pt-4">
              <label htmlFor="time-from-2" className='w-1/3 mt-4' >Time</label>
              <div className="flex mt-4">
                <input
                  type="time"
                  id="time-from-2"
                  className="rounded-none py-1 bg-gray-50 border text-gray-900 leading-none focus:ring-blue-500 focus:border-blue-500 block flex-1 w-39 text-xs border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  min="09:00"
                  max="18:00"
                  defaultValue="00:00"
                  required
                />
                <input
                  type="time"
                  id="time-to-2"
                  className="rounded-none ml-2 py-1 bg-gray-50 border text-gray-900 leading-none focus:ring-blue-500 focus:border-blue-500 block flex-1 w-39 text-xs border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  min="09:00"
                  max="18:00"
                  defaultValue="00:00"
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col border-t dark:border-gray-700 pb-2 mt-4">
            <div className="flex justify-between items-center pt-4">
              <h2 className="text-base">Student / Guardian Panel</h2>
            </div>
            {/* Group 3 */}

            <div className="lg:flex md:block items-center mt-4">
              <label htmlFor="whatsapp-link-3" className='w-1/3 mb-4' >Whatsapp Link</label>
              <div className="flex items-center w-1/4 mb-4 mt-4">
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

              <div className="flex items-center lg:ml-2 mb-4">
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
            <div className="lg:flex md:block items-center pt-4">
              <label htmlFor="mobile-no-3" className='w-1/3 mt-4' >Mobile No.</label>
              <div className='w-full mt-4'>
                <input 
                  type="text" 
                  id="mobile-no-3"
                  className='py-1 w-full h-6 text-xs' 
                  defaultValue={"9800000001"} 
                />
              </div>
            </div>
            <div className="lg:flex md:block items-center pt-4">
              <label htmlFor="time-from-3" className='w-1/3 mt-4' >Time</label>
              <div className="flex ml-full mt-4">
                <input
                  type="time"
                  id="time-from-3"
                  className="rounded-none py-1 bg-gray-50 border text-gray-900 leading-none focus:ring-blue-500 focus:border-blue-500 block flex-1 w-39 text-xs border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  min="09:00"
                  max="18:00"
                  defaultValue="00:00"
                  required
                />
                <input
                  type="time"
                  id="time-to-3"
                  className="rounded-none ml-2 py-1 bg-gray-50 border text-gray-900 leading-none focus:ring-blue-500 focus:border-blue-500 block flex-1 w-39 text-xs border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  min="09:00"
                  max="18:00"
                  defaultValue="00:00"
                  required
                />
              </div>
            </div>
          </div>
          {/* Save Button */}
          <div className="flex justify-end mt-5 border-b dark:border-gray-700 ">
            <button 
              type="button"
              onClick={handleButtonClick} 
              className="btn btn-primary bg-blue-500 text-white p-1 mt-2 px-2 rounded focus:ring-0 focus:outline-none"
            >
              Save
            </button>
            {/* <ToastContainer /> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default WhatsappSetting;