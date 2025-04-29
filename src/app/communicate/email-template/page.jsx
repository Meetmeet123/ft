

// "use client";
// import React, { useState } from 'react';
// import { IoMdArrowDropdown } from 'react-icons/io';
// import { FiCheckSquare } from 'react-icons/fi';
// import { VscFiles } from "react-icons/vsc";
// import { FaRegFileExcel } from "react-icons/fa";
// import { ImFileText2 } from "react-icons/im";
// import { AiOutlineFilePdf } from "react-icons/ai";
// import { LuColumns2 } from "react-icons/lu";
// import { PiPrinterFill } from "react-icons/pi";
// import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
// import { MdEdit } from "react-icons/md";
// import { RxCross2 } from "react-icons/rx";
// import { MdAdd } from "react-icons/md";
// const initialData = [
//     {
//         title: 'Republic Day Celebration',
//         message: 'Republic Day is the day when the Republic of India marks and celebrates the date on which the Constitution of India came into effect on 26 January 2024.',
//         date: '01/05/2024 11:56 am',
//         scheduledate: "01/26/2024 08:00 am",
//         email: true,
//         sms: "",
//         group: true,
//         individual: "",
//         class: ""
//     },
//     {
//         title: 'Dussehra Celebration',
//         message: 'The fee notification Dasara, also known as Dussehra or Vijayadashami, is a Hindu festival that celebrates the victory of good over evil.',
//         date: '02/01/2022 05:12 pm',
//         scheduledate: '10/12/2024 05:30 am',
//         email: true,
//         sms: false,
//         group: true,
//         individual: false,
//         class: false
//     },
//     {
//         title: 'Children’s day Celebration',
//         message: 'Children’s day on the 14th November, 2024, with great festive fervour, to commemorate the 131st birth anniversary of Pandit Jawaharlal Nehru...',
//         date: '11/02/2024 06:12 pm',
//         scheduledate: '11/14/2024 07:00 am',
//         email: true,
//         sms: false,
//         group: true,
//         individual: false,
//         class: false
//     },
//     {
//         title: 'Christmas Celebration',
//         message: 'Wishing you a merry little Christmas and a happy New Year! We love you more than all the presents on Santa’s sleigh.',
//         date: '12/02/2024 10:10 am',
//         scheduledate: '12/20/2024 10:10 am',
//         email: true,
//         sms: false,
//         group: true,
//         individual: false,
//         class: false
//     },
//     {
//         title: 'Online Classes',
//         message: 'Be very punctual in log in time, screen off time, activity time table etc...',
//         date: '02/04/2025 05:02 pm',
//         email: true,
//         sms: false,
//         group: true,
//         individual: false,
//         class: false
//     },
//     {
//         title: 'Holi Celebration Notice',
//         message: 'The colors and special Holi food items will be organized by the school itself...',
//         date: '03/04/2024 11:13 am',
//         scheduledate: '10/12/2024 05:30 am',
//         email: true,
//         sms: false,
//         group: true,
//         individual: false,
//         class: false
//     },
//     {
//         title: "New Academic admission start (2025-26)",
//         message: 'NEW ADMISSIONS FOR THE NEXT SESSION 2025-26 ARE OPEN FROM CLASSES NURSERY TO CLASS- VIII FROM 1ST APRIL 2025.',
//         date: "04/04/2025 11:27 am",
//         scheduledate: '04/04/2025 11:27 am',
//         email: false,
//         sms: true,
//         group: true,
//         individual: false,
//         class: false
//     }
// ];

// export default function EmailTemplate() {
//     const [data, setData] = useState(initialData);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'asc' });
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [formData, setFormData] = useState({
//         title: '',
//         message: '',
//         attachment: '',
//     });

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const newEntry = {
//             ...formData,
//             date: new Date().toLocaleString(),
//             scheduledate: '',
//             email: true,
//             sms: false,
//             group: true,
//             individual: false,
//             class: false,
//         };

//         setData([newEntry, ...data]); // Add new item at the top
//         setIsModalOpen(false);
//         setFormData({ title: '', message: '', attachment: '' }); // Reset
//     };
//     const handleDelete = (index) => {
//         const newData = [...data];
//         newData.splice(index, 1);
//         setData(newData);
//     };



//     const sortedData = [...data]
//         .filter(
//             (item) =>
//                 item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 item.description?.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//         .sort((a, b) => {
//             const aVal = a[sortConfig.key];
//             const bVal = b[sortConfig.key];

//             if (sortConfig.key === 'date') {
//                 const dateA = new Date(aVal);
//                 const dateB = new Date(bVal);
//                 return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
//             }

//             if (typeof aVal === 'string') {
//                 return sortConfig.direction === 'asc'
//                     ? aVal.localeCompare(bVal)
//                     : bVal.localeCompare(aVal);
//             }

//             return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
//         });

//     const requestSort = (key) => {
//         let direction = 'asc';
//         if (sortConfig.key === key && sortConfig.direction === 'asc') {
//             direction = 'desc';
//         }
//         setSortConfig({ key, direction });
//     };

//     const renderSortIcon = () => {
//         return <IoMdArrowDropdown className="text-gray-600" />;
//     };

//     const renderCheckIcon = (value) => {
//         return value ? <FiCheckSquare className="text-black-600" /> : null;
//     };

//     return (
//         <div className="p-2 bg-white mt-2 shadow-lg">
//             <div className='flex justify-between border-b pb-2'>
//                 <div>   <h2 className="text-xl mb-2 ">Email Template List</h2></div>
//                 <div className='text-white'>

//                     <button
//                         onClick={() => setIsModalOpen(true)}
//                         className="btn btn-primary bg-blue-500 text-white p-1 px-2 rounded focus:ring-0 focus:outline-none flex items-center gap-1"
//                         type="button"
//                     >
//                         <MdAdd className="text-white text-xl" />
//                         Add
//                     </button>
//                 </div>

//             </div>
//             {/* Main modal */}
//             {isModalOpen && (
//                 <form onSubmit={handleSubmit}>
//                     <div className="fixed inset-0 z-50 flex justify-center items-center bg-[rgba(0,0,0,0.4)] overflow-hidden">
//                         <div className="relative p-4 w-[900] max-h-full">
//                             <div className="bg-white rounded-lg shadow-sm">
//                                 {/* Modal header */}
//                                 <div className="flex items-center justify-between p-4 border-b">
//                                     <h3 className="text-xl text-gray-900">
//                                         Add Email Template
//                                     </h3>
//                                     <button
//                                         onClick={() => setIsModalOpen(false)}
//                                         className="text-gray-400 hover:bg-gray-200 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
//                                     >
//                                         <svg className="w-3 h-3" fill="none" viewBox="0 0 14 14">
//                                             <path
//                                                 stroke="currentColor"
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                                 strokeWidth="2"
//                                                 d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
//                                             />
//                                         </svg>
//                                     </button>
//                                 </div>

//                                 {/* Modal body */}
//                                 <div className="p-4 space-y-4">
//                                     <div>
//                                         <label className="block py-1">
//                                             Title <span className='text-red-500'>*</span>
//                                         </label>
//                                         <input
//                                             name="title"
//                                             type="text"
//                                             value={formData.title}
//                                             onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                                             className="border w-full text-xs py-1 focus:outline-none focus:ring-0"
//                                         />
//                                     </div>
//                                     <div>
//                                         <div className="py-2">
//                                             <label htmlFor="">Attachment <span className='text-red-500'>*</span></label>
//                                         </div>
//                                         <div>
//                                             <input
//                                                 type="file"
//                                                 className="h-7 w-full text-xs border p-2 py-1 cursor-pointer focus:outline-none focus:ring-0 focus:border-none"
//                                             />
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <label className="block py-2">
//                                             Message <span className='text-red-500'>*</span>
//                                         </label>
//                                         <textarea
//                                             rows={8}
//                                             value={formData.message}
//                                             onChange={(e) => setFormData({ ...formData, message: e.target.value })}
//                                             className="block w-full px-0 text-sm text-gray-800 bg-white border-0 focus:ring-0"
//                                             placeholder="Write a message..."
//                                         />
//                                     </div>

//                                 </div>

//                                 {/* Modal footer */}
//                                 <div className="flex items-center p-4 border-t justify-end">
//                                     <button type="submit" className="btn btn-primary bg-blue-500 text-white p-1 px-2 rounded focus:ring-0 focus:outline-none flex items-center gap-1">
//                                         Save
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </form>
//             )}

//             <div className='flex justify-between'>
// <div className="mb-2">
//     <input
//         type="text"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         className="form-input mt-1 w-[50%] border-none focus:border-none focus:ring-0 outline-none border-0 border-b focus:outline-none"
//         placeholder="Search..."
//     />
// </div>
//                 <div className="flex items-center border-b ">
//                     <div className='hover:bg-gray-200 p-1'>  <VscFiles /></div>
//                     <div className='hover:bg-gray-200 p-1'><FaRegFileExcel /></div>
//                     <div className='hover:bg-gray-200 p-1'><ImFileText2 /></div>
//                     <div className='hover:bg-gray-200 p-1'><AiOutlineFilePdf /></div>
//                     <div className='hover:bg-gray-200 p-1'><PiPrinterFill /></div>
//                     <div className='hover:bg-gray-200 p-1'><LuColumns2 /></div>
//                 </div>
//             </div>
//             <div className="">
//                 <table className="w-full text-sm text-left border-b pb-2">
//                     <thead>
//                         <tr>
//                             {['title', 'message'].map((key) => (
//                                 <th
//                                     key={key}
//                                     className="font-medium cursor-pointer"
//                                     onClick={() => requestSort(key)}
//                                 >
//                                     <div className="gap-1 capitalize flex pb-2">
//                                         {key}
//                                         {renderSortIcon(key)}
//                                     </div>
//                                 </th>
//                             ))}

//                             {/* Action column — always last and aligned right */}
//                             <th className="font-medium text-right pr-4">Action</th>
//                         </tr>
//                     </thead>

//                     <tbody>
//                         {sortedData.map((item, index) => (
//                             <tr key={index} className="border-t hover:bg-gray-200">
//                                 <td className="py-2 align-top font-medium text-gray-900 w-[200px]">{item.title}</td>
//                                 <td className="py-2 align-top text-gray-700 w-[900px] whitespace-pre-wrap break-words">{item.message}</td>
//                                 <td className="py-2 align-top ">{renderCheckIcon(item.action)}</td>
//                                 <td className="py-2 align-top w-[100px]">
//                                     <div className="flex justify-end items-center gap-x-1">
//                                         <div className="bg-white p-1 text-sm font-bold cursor-pointer">
//                                             <MdEdit />
//                                         </div>
//                                         <div className="bg-white p-1 text-sm font-bold cursor-pointer mr-2" onClick={() => handleDelete(index)}>

//                                             <RxCross2 />
//                                         </div>
//                                     </div>
//                                 </td>

//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//                 {data && sortedData.length > 0 && (
//                     <div>
//                         <div className="flex items-center justify-between mt-4">
//                             <p className="text-xs">
//                                 Records: {`1 to ${sortedData.length} of ${sortedData.length}`}
//                             </p>
//                             <div className="flex items-center space-x-1">
//                                 <button className="text-xs p-1 w-6 h-6 flex items-center justify-center rounded hover:bg-gray-200">
//                                     <IoIosArrowBack />
//                                 </button>
//                                 <div className='hover:bg-gray-200'>
//                                     <button className="text-xs p-1 w-6 h-6 flex items-center justify-center rounded bg-gray-200 text-black">
//                                         1
//                                     </button>
//                                 </div>
//                                 <button className="text-xs p-1 w-6 h-6 flex items-center justify-center rounded hover:bg-gray-200">
//                                     <IoIosArrowForward />
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

"use client";
import React, { useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { FiCheckSquare } from 'react-icons/fi';
import { VscFiles } from "react-icons/vsc";
import { FaRegFileExcel } from "react-icons/fa";
import { ImFileText2 } from "react-icons/im";
import { AiOutlineFilePdf } from "react-icons/ai";
import { LuColumns2 } from "react-icons/lu";
import { PiPrinterFill } from "react-icons/pi";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { MdEdit, MdAdd } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const initialData = [
    {
        id: 1,
        title: 'Republic Day Celebration',
        message: 'Republic Day is the day when the Republic of India marks and celebrates the date...',

    },
    {
        id: 2,
        title: 'Dussehra Celebration',
        message: 'The fee notification Dasara, also known as Dussehra or Vijayadashami, is a Hindu festival that celebrates the victory of good over evil.',

    },
    {
        id: 3,
        title: 'Children’s day Celebration',
        message: 'Children’s day on the 14th November, 2024, with great festive fervour, to commemorate the 131st birth anniversary of Pandit Jawaharlal Nehru...',

    },
    {
        id: 4,
        title: 'Christmas Celebration',
        message: 'Wishing you a merry little Christmas and a happy New Year! We love you more than all the presents on Santa’s sleigh.',

    },
    {
        id: 5,
        title: 'Online Classes',
        message: 'Be very punctual in log in time, screen off time, activity time table etc...',

    },
    {
        id: 6,
        title: 'Holi Celebration Notice',
        message: 'The colors and special Holi food items will be organized by the school itself...',

    },
    {
        id: 7,
        title: "New Academic admission start (2025-26)",
        message: 'NEW ADMISSIONS FOR THE NEXT SESSION 2025-26 ARE OPEN FROM CLASSES NURSERY TO CLASS- VIII FROM 1ST APRIL 2025.',

    }
];

export default function EmailTemplate() {
    const [data, setData] = useState(initialData);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'asc' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ title: '', message: '', attachment: '' });
    const [editIndex, setEditIndex] = useState(null);
    const now = new Date().toLocaleString();

    const handleSubmit = (e) => {
        e.preventDefault();
        const now = new Date().toLocaleString();

        const newEntry = {
            id: editIndex !== null ? editIndex : Date.now(), // Preserve ID if editing
            ...formData,
            date: now,

        };

        if (editIndex !== null) {
            // ✅ Editing: find item by `id` and update it
            const updatedData = data.map(item =>
                item.id === editIndex ? { ...item, ...newEntry } : item
            );
            setData(updatedData);
        } else {
            // ✅ Adding: Add new data at top
            setData([newEntry, ...data]);
        }

        // Reset form
        setIsModalOpen(false);
        setFormData({ title: '', message: '', attachment: '' });
        setEditIndex(null);
    };

    const handleEdit = (id) => {
        const item = data.find((item) => item.id === id); // Find item by `id`
        if (item) {
            setFormData({ title: item.title, message: item.message, attachment: '' });
            setEditIndex(id); // Store the `id` of the item being edited
            setIsModalOpen(true);
        }
    };



    const handleDelete = (id) => {
        const newData = data.filter((item) => item.id !== id);
        setData(newData);
    };

    const sortedData = [...data]
        .filter(item =>
            item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.message?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            const aVal = a[sortConfig.key];
            const bVal = b[sortConfig.key];

            if (sortConfig.key === 'date') {
                return sortConfig.direction === 'asc'
                    ? new Date(aVal) - new Date(bVal)
                    : new Date(bVal) - new Date(aVal);
            }

            return sortConfig.direction === 'asc'
                ? aVal.localeCompare(bVal)
                : bVal.localeCompare(aVal);
        });

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
        setSortConfig({ key, direction });
    };

    const renderSortIcon = () => <IoMdArrowDropdown className="text-gray-600" />;
    const renderCheckIcon = (value) => value ? <FiCheckSquare className="text-black-600" /> : null;

    return (
        <div className="p-2 bg-white mt-2 shadow-lg ">
            <div className='flex justify-between border-b pb-2'>
                <h2 className="text-xl mb-2">Email Template List</h2>
                <button
                    onClick={() => {
                        setIsModalOpen(true);
                        setEditIndex(null);
                        setFormData({ title: '', message: '', attachment: '' });
                    }}
                    className="btn btn-primary bg-blue-500 text-white p-1 px-2 rounded focus:ring-0 flex items-center"
                >
                    <MdAdd className="text-white text-sm" /> Add
                </button>
            </div>
            {isModalOpen && (
                <form onSubmit={handleSubmit}>
                    <div className="fixed inset-0 z-50 flex justify-center items-center bg-[rgba(0,0,0,0.4)]">
                        <div className="relative w-[900px] max-h-screen overflow-auto p-4 mt-14">
                            <div className="bg-white shadow-sm">
                                {/* Modal Header */}
                                <div className="flex items-center justify-between p-4 border-b">
                                    <h3 className="text-xl text-gray-900">
                                        {editIndex !== null ? 'Edit Email Template' : 'Add Email Template'}
                                    </h3>
                                    <button
                                        onClick={() => {
                                            setIsModalOpen(false);
                                            setFormData({ title: '', message: '', attachment: '' });
                                            setEditIndex(null);
                                        }}
                                        className="text-gray-400 hover:bg-gray-200 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
                                        type="button"
                                    >
                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Modal Body */}
                                <div className="p-4 space-y-2 overflow-auto">
                                    <div>
                                        <label className="block py-1">Title <span className='text-red-500'>*</span></label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="border w-full text-xs py-1 focus:outline-none focus:ring-0 focus:border-none"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block py-1">Attachment</label>
                                        <input
                                            type="file"
                                            className="h-7 w-full text-xs border p-2 py-1 cursor-pointer focus:outline-none"
                                            onChange={(e) =>
                                                setFormData({ ...formData, attachment: e.target.files[0]?.name || '' })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="block py-2">Message <span className='text-red-500'>*</span></label>
                                        <div className="w-full mb-4 border border-gray-200  bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                                            <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 dark:border-gray-600 border-gray-200">
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
                                            <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
                                                <label htmlFor="editor" className="sr-only">
                                                    Publish post
                                                </label>
                                                <textarea
                                                    rows={6}
                                                    value={formData.message}
                                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                    className="block w-full text-sm text-gray-800 border focus:ring-0"
                                                    placeholder="Write a message..."
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Modal Footer */}
                                <div className="flex items-center p-4 border-t justify-end">
                                    <button type="submit" className="btn btn-primary bg-blue-500 text-white p-1 px-2 rounded focus:ring-0 focus:outline-none flex items-center gap-1">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            )}

            <div className='flex justify-between mt-2'>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-input mt-1 w-[30%] border-none focus:border-none focus:ring-0 outline-none border-0 border-b focus:outline-none"
                    placeholder="Search..."
                />

                <div className="flex items-center border-b">
                    {[VscFiles, FaRegFileExcel, ImFileText2, AiOutlineFilePdf, PiPrinterFill, LuColumns2].map((Icon, i) => (
                        <div key={i} className='hover:bg-gray-200 p-1 cursor-pointer'><Icon /></div>
                    ))}
                </div>
            </div>

            <table className="w-full text-sm text-left border-b mt-2">
                <thead>
                    <tr>
                        {['title', 'message'].map((key) => (
                            <th
                                key={key}
                                className="font-medium cursor-pointer"
                                onClick={() => requestSort(key)}
                            >
                                <div className="gap-1 capitalize flex pb-2">
                                    {key}
                                    {renderSortIcon()}
                                </div>
                            </th>
                        ))}
                        <th className="font-medium text-right pr-4">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((item) => (
                        <tr key={item.id} className="border-t hover:bg-gray-200">
                            <td className="py-2 font-medium text-gray-900 w-[200px]">{item.title}</td>
                            <td className="py-2 text-gray-700 w-[900px] whitespace-pre-wrap break-words">{item.message}</td>
                            <td className="py-2 text-right w-[100px]">
                                <div className="flex justify-end gap-1">
                                    <div className="cursor-pointer p-1 bg-white text-sm font-bold" onClick={() => handleEdit(item.id)}><MdEdit /></div>
                                    <div className="cursor-pointer p-1 bg-white text-sm font-bold mr-2" onClick={() => handleDelete(item.id)}><RxCross2 /></div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>


            </table>

            {data.length > 0 && (
                <div className="flex justify-between mt-4">
                    <p className="text-xs">Records: 1 to {sortedData.length} of {sortedData.length}</p>
                    <div className="flex items-center space-x-1">
                        <button className="text-xs p-1 w-6 h-6 rounded hover:bg-gray-200"><IoIosArrowBack /></button>
                        <button className="text-xs p-1 w-6 h-6 rounded bg-gray-200">1</button>
                        <button className="text-xs p-1 w-6 h-6 rounded hover:bg-gray-200"><IoIosArrowForward /></button>
                    </div>
                </div>
            )}
        </div>
    );
}
