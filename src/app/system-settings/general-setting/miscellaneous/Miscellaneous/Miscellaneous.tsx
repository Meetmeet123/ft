// import React, { useState, ChangeEvent } from 'react';

// const Miscellaneous: React.FC = () => {
//   const [buttonStates, setButtonStates] = useState<boolean[]>(Array(7).fill(false));

//   const handleRadioChange = (index: number, value: boolean): void => {
//     const newStates = [...buttonStates];
//     newStates[index] = value;
//     setButtonStates(newStates);
//   };

//   return (
//     <div className="bg-white p-4">
//       <h1 className="text-xl border-b dark:border-gray-700 pb-2">Miscellaneous</h1>

//       <form className="space-y-6 mt-4">
//         {/* Online Examination */}
//         <div className="space-y-2 border-b pb-6">
//           <h2 className="text-lg">Online Examination</h2>
//           <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
//             <label>Show Me Only My Question</label>
//             <div className="flex gap-4">
//               <div className="flex items-center">
//                 <input
//                   type="radio"
//                   checked={!buttonStates[0]}
//                   onChange={() => handleRadioChange(0, false)}
//                   name="question"
//                   className="w-4 h-4 text-blue-600 bg-gray-100"
//                 />
//                 <label className="ml-2 text-sm">Disabled</label>
//               </div>
//               <div className="flex items-center">
//                 <input
//                   type="radio"
//                   checked={buttonStates[0]}
//                   onChange={() => handleRadioChange(0, true)}
//                   name="question"
//                   className="w-4 h-4 text-blue-600 bg-gray-100"
//                 />
//                 <label className="ml-2 text-sm">Enabled</label>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ID Card Scan Code */}
//         <div className="space-y-2 border-b pb-6">
//           <h2 className="text-lg">ID Card Scan Code</h2>
//           <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
//             <label>Single Page Fees Print</label>
//             <div className="flex gap-4">
//               <div className="flex items-center">
//                 <input
//                   type="radio"
//                   checked={!buttonStates[1]}
//                   onChange={() => handleRadioChange(1, false)}
//                   name="singlePage"
//                   className="w-4 h-4 text-blue-600 bg-gray-100"
//                 />
//                 <label className="ml-2 text-sm">Disabled</label>
//               </div>
//               <div className="flex items-center">
//                 <input
//                   type="radio"
//                   checked={buttonStates[1]}
//                   onChange={() => handleRadioChange(1, true)}
//                   name="singlePage"
//                   className="w-4 h-4 text-blue-600 bg-gray-100"
//                 />
//                 <label className="ml-2 text-sm">Enabled</label>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Examinations */}
//         <div className="space-y-4 border-b pb-6">
//           <h2 className="text-lg">Examinations</h2>

//           {/* Exam Result Page */}
//           <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
//             <label>Exam Result Page In Front Site</label>
//             <div className="flex gap-4">
//               <div className="flex items-center">
//                 <input
//                   type="radio"
//                   checked={!buttonStates[3]}
//                   onChange={() => handleRadioChange(3, false)}
//                   name="examResult"
//                   className="w-4 h-4 text-blue-600 bg-gray-100"
//                 />
//                 <label className="ml-2 text-sm">Disabled</label>
//               </div>
//               <div className="flex items-center">
//                 <input
//                   type="radio"
//                   checked={buttonStates[3]}
//                   onChange={() => handleRadioChange(3, true)}
//                   name="examResult"
//                   className="w-4 h-4 text-blue-600 bg-gray-100"
//                 />
//                 <label className="ml-2 text-sm">Enabled</label>
//               </div>
//             </div>
//           </div>

//           {/* Download Admit Card */}
//           <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
//             <label>Download Admit Card In Student / Parent Panel</label>
//             <div className="flex gap-4">
//               <div className="flex items-center">
//                 <input
//                   type="radio"
//                   checked={!buttonStates[2]}
//                   onChange={() => handleRadioChange(2, false)}
//                   name="admitCard"
//                   className="w-4 h-4 text-blue-600 bg-gray-100"
//                 />
//                 <label className="ml-2 text-sm">Disabled</label>
//               </div>
//               <div className="flex items-center">
//                 <input
//                   type="radio"
//                   checked={buttonStates[2]}
//                   onChange={() => handleRadioChange(2, true)}
//                   name="admitCard"
//                   className="w-4 h-4 text-blue-600 bg-gray-100"
//                 />
//                 <label className="ml-2 text-sm">Enabled</label>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Teacher Restricted Mode */}
//         <div className="space-y-2">
//           <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
//             <label>Teacher Restricted Mode</label>
//             <div className="flex gap-4">
//               <div className="flex items-center">
//                 <input
//                   type="radio"
//                   checked={!buttonStates[4]}
//                   onChange={() => handleRadioChange(4, false)}
//                   name="teacherMode"
//                   className="w-4 h-4 text-blue-600 bg-gray-100"
//                 />
//                 <label className="ml-2 text-sm">Disabled</label>
//               </div>
//               <div className="flex items-center">
//                 <input
//                   type="radio"
//                   checked={buttonStates[4]}
//                   onChange={() => handleRadioChange(4, true)}
//                   name="teacherMode"
//                   className="w-4 h-4 text-blue-600 bg-gray-100"
//                 />
//                 <label className="ml-2 text-sm">Enabled</label>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Superadmin Visibility */}
//         <div className="space-y-2">
//           <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
//             <label>Superadmin Visibility</label>
//             <div className="flex gap-4">
//               <div className="flex items-center">
//                 <input
//                   type="radio"
//                   checked={!buttonStates[5]}
//                   onChange={() => handleRadioChange(5, false)}
//                   name="superAdmin"
//                   className="w-4 h-4 text-blue-600 bg-gray-100"
//                 />
//                 <label className="ml-2 text-sm">Disabled</label>
//               </div>
//               <div className="flex items-center">
//                 <input
//                   type="radio"
//                   checked={buttonStates[5]}
//                   onChange={() => handleRadioChange(5, true)}
//                   name="superAdmin"
//                   className="w-4 h-4 text-blue-600 bg-gray-100"
//                 />
//                 <label className="ml-2 text-sm">Enabled</label>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Event Reminder */}
//         <div className="space-y-2 pb-4">
//           <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
//             <label>Event Reminder</label>
//             <div className="flex gap-4">
//               <div className="flex items-center">
//                 <input
//                   type="radio"
//                   checked={!buttonStates[6]}
//                   onChange={() => handleRadioChange(6, false)}
//                   name="eventReminder"
//                   className="w-4 h-4 text-blue-600 bg-gray-100"
//                 />
//                 <label className="ml-2 text-sm">Disabled</label>
//               </div>
//               <div className="flex items-center">
//                 <input
//                   type="radio"
//                   checked={buttonStates[6]}
//                   onChange={() => handleRadioChange(6, true)}
//                   name="eventReminder"
//                   className="w-4 h-4 text-blue-600 bg-gray-100"
//                 />
//                 <label className="ml-2 text-sm">Enabled</label>
//               </div>
//             </div>
//           </div>

//           {/* Conditional Event Input */}
//           {buttonStates[6] && (
//             <div className="flex flex-col md:flex-row items-start md:items-center gap-4 pl-4">
//               <label>Calendar Event Reminder Before Days</label>
//               <input
//                 type="number"
//                 className="w-32 p-1 text-sm border border-gray-300 rounded"
//                 placeholder="0"
//               />
//             </div>
//           )}
//         </div>

//         {/* Staff ID Start From */}
//         <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
//           <label>Staff ID Start From</label>
//           <input type="text" className="w-full md:w-80 p-1 text-sm border border-gray-300 rounded" />
//         </div>

//         {/* Save Button */}
//         <div className="flex justify-end pt-4 border-t">
//           <button
//             type="button"
//             className="bg-blue-500 text-white px-4 py-2 text-sm rounded hover:bg-blue-600"
//           >
//             Save
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Miscellaneous;

function Miscellaneous(){
  return(
    <div>Miscellaneous</div>
  )
}

export default Miscellaneous;