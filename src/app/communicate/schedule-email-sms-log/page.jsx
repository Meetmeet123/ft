
"use client";
import React, { useEffect, useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { FiCheckSquare } from 'react-icons/fi';
import { VscFiles } from "react-icons/vsc";
import { FaRegFileExcel } from "react-icons/fa";
import { ImFileText2 } from "react-icons/im";
import { AiOutlineFilePdf } from "react-icons/ai";
import { LuColumns2 } from "react-icons/lu";
import { PiPrinterFill } from "react-icons/pi";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { IoReorderThreeSharp } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/navigation";

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

// export default function ScheduleEmailSMSLog() {
//     const router = useRouter();
//     const [data, setData] = useState(
//         initialData.map((item, index) => ({ ...item, id: Date.now() + index }))
//     );
//     const [searchTerm, setSearchTerm] = useState('');
//     const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'asc' });
//     const now = new Date().toLocaleString();

//     const handleDelete = (id) => {
//         const newData = data.filter((item) => item.id !== id);
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

const initialData = [
    {
        title: 'Republic Day Celebration',
        message: 'Republic Day is the day when the Republic of India marks and celebrates the date on which the Constitution of India came into effect on 26 January 2024.',
        date: '01/05/2024 11:56 am',
        scheduledate: "01/26/2024 08:00 am",
        email: true,
        sms: "",
        group: true,
        individual: "",
        class: ""
    },
    {
        title: 'Dussehra Celebration',
        message: 'The fee notification Dasara, also known as Dussehra or Vijayadashami, is a Hindu festival that celebrates the victory of good over evil.',
        date: '02/01/2022 05:12 pm',
        scheduledate: '10/12/2024 05:30 am',
        email: true,
        sms: false,
        group: true,
        individual: false,
        class: false
    },
    {
        title: 'Children’s day Celebration',
        message: 'Children’s day on the 14th November, 2024, with great festive fervour, to commemorate the 131st birth anniversary of Pandit Jawaharlal Nehru...',
        date: '11/02/2024 06:12 pm',
        scheduledate: '11/14/2024 07:00 am',
        email: true,
        sms: false,
        group: true,
        individual: false,
        class: false
    },
    {
        title: 'Christmas Celebration',
        message: 'Wishing you a merry little Christmas and a happy New Year! We love you more than all the presents on Santa’s sleigh.',
        date: '12/02/2024 10:10 am',
        scheduledate: '12/20/2024 10:10 am',
        email: true,
        sms: false,
        group: true,
        individual: false,
        class: false
    },
    {
        title: 'Online Classes',
        message: 'Be very punctual in log in time, screen off time, activity time table etc...',
        date: '02/04/2025 05:02 pm',
        email: true,
        sms: false,
        group: true,
        individual: false,
        class: false
    },
    {
        title: 'Holi Celebration Notice',
        message: 'The colors and special Holi food items will be organized by the school itself...',
        date: '03/04/2024 11:13 am',
        scheduledate: '10/12/2024 05:30 am',
        email: true,
        sms: false,
        group: true,
        individual: false,
        class: false
    },
    {
        title: "New Academic admission start (2025-26)",
        message: 'NEW ADMISSIONS FOR THE NEXT SESSION 2025-26 ARE OPEN FROM CLASSES NURSERY TO CLASS- VIII FROM 1ST APRIL 2025.',
        date: "04/04/2025 11:27 am",
        scheduledate: '04/04/2025 11:27 am',
        email: false,
        sms: true,
        group: true,
        individual: false,
        class: false
    }
];

export default function ScheduleEmailSMSLog() {
    const router = useRouter();
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'asc' });

    useEffect(() => {
        // LocalStorage से check करो
        const savedData = JSON.parse(localStorage.getItem('scheduleEmailSMSData'));
        if (savedData && savedData.length > 0) {
            setData(savedData);
        } else {
            // agar nahi hai to initial data ke sath id generate karo
            const initialWithId = initialData.map((item, index) => ({
                ...item,
                id: Date.now() + index,
            }));
            setData(initialWithId);
            localStorage.setItem('scheduleEmailSMSData', JSON.stringify(initialWithId));
        }
    }, []);

    const handleDelete = (id) => {
        const newData = data.filter((item) => item.id !== id);
        setData(newData);
        localStorage.setItem('scheduleEmailSMSData', JSON.stringify(newData));
    };

    const sortedData = [...data]
        .filter(
            (item) =>
                item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.message?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            const aVal = a[sortConfig.key];
            const bVal = b[sortConfig.key];

            if (sortConfig.key === 'date') {
                const dateA = new Date(aVal);
                const dateB = new Date(bVal);
                return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
            }

            if (typeof aVal === 'string') {
                return sortConfig.direction === 'asc'
                    ? aVal.localeCompare(bVal)
                    : bVal.localeCompare(aVal);
            }

            return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
        });

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const renderSortIcon = () => {
        return <IoMdArrowDropdown className="text-gray-600" />;
    };

    const renderCheckIcon = (value) => {
        return value ? <FiCheckSquare className="text-black-600" /> : null;
    };

    return (
        <div className="p-2 bg-white mt-2 shadow-lg">
            <h2 className="text-xl mb-2 border-b pb-2">Schedule Email SMS Log</h2>
            <div className='flex justify-between'>
                <div className="mb-2">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="form-input mt-1 w-[50%] border-none focus:border-none focus:ring-0 outline-none border-0 border-b focus:outline-none"
                        placeholder="Search..."
                    />
                </div>
                <div className="flex items-center border-b ">
                    <div className='hover:bg-gray-200 p-1'>  <VscFiles /></div>
                    <div className='hover:bg-gray-200 p-1'><FaRegFileExcel /></div>
                    <div className='hover:bg-gray-200 p-1'><ImFileText2 /></div>
                    <div className='hover:bg-gray-200 p-1'><AiOutlineFilePdf /></div>
                    <div className='hover:bg-gray-200 p-1'><PiPrinterFill /></div>
                    <div className='hover:bg-gray-200 p-1'><LuColumns2 /></div>
                </div>
            </div>
            <div className="overflow-auto">
                <table className="w-full text-sm text-left border-b pb-2">
                    <thead>
                        <tr>
                            {['title', 'message', 'date', 'schedule  date', 'email', 'sms', 'group', 'individual', 'class', 'action'].map((key) => (
                                <th
                                    key={key}
                                    className="font-medium cursor-pointer"
                                    onClick={() => key !== 'action' && requestSort(key)}
                                >
                                    <div className="items-center gap-1 capitalize">
                                        {key}
                                        {key !== 'action' && renderSortIcon(key)}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((item, index) => (
                            <tr key={index} className="border-t hover:bg-gray-200">
                                <td className="py-2 align-top font-medium text-gray-900 w-[170px]">{item.title}</td>
                                <td className="py-2 align-top text-gray-700 w-[810px] whitespace-pre-wrap break-words">{item.message}</td>
                                <td className="px-2 align-top text-gray-500 w-[120px]">{item.date}</td>
                                <td className="py-2 align-top text-gray-500 w-[100px]">{item.scheduledate}</td>
                                <td className="py-2 align-top w-[50px]">{renderCheckIcon(item.email)}</td>
                                <td className="py-2 align-top w-[50px]">{renderCheckIcon(item.sms)}</td>
                                <td className="py-2 align-top w-[50px]">{renderCheckIcon(item.group)}</td>
                                <td className="py-2 align-top w-[50px]">{renderCheckIcon(item.individual)}</td>
                                <td className="py-2 align-top w-[50px]">{renderCheckIcon(item.class)}</td>
                                <td className="py-2 align-top w-[50px]">{renderCheckIcon(item.action)}</td>
                                <td className="py-2 align-top w-[50px]">
                                    <div className="bg-white p-1 w-fit mx-auto text-sm cursor-pointer"
                                        onClick={() => {
                                            localStorage.setItem("editNotice", JSON.stringify(item));
                                            router.push("/edit-template/edit-template-schedule");
                                        }}
                                    >
                                        <IoReorderThreeSharp />

                                    </div>

                                </td>
                                <td className="py-2 align-top w-[50px]">
                                    <div className="bg-white p-1 w-fit mx-auto  text-sm cursor-pointer" onClick={() => handleDelete(item.id)}>
                                        <RiDeleteBin6Line />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {data && sortedData.length > 0 && (
                    <div>
                        <div className="flex items-center justify-between mt-4">
                            <p className="text-xs">
                                Records: {`1 to ${sortedData.length} of ${sortedData.length}`}
                            </p>
                            <div className="flex items-center space-x-1">
                                <button className="text-xs p-1 w-6 h-6 flex items-center justify-center rounded hover:bg-gray-200">
                                    <IoIosArrowBack />
                                </button>
                                <div className='hover:bg-gray-200'>
                                    <button className="text-xs p-1 w-6 h-6 flex items-center justify-center rounded bg-gray-200 text-black">
                                        1
                                    </button>
                                </div>
                                <button className="text-xs p-1 w-6 h-6 flex items-center justify-center rounded hover:bg-gray-200">
                                    <IoIosArrowForward />
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-end items-end border-b pb-4">
                            <button type="submit" className="btn btn-primary bg-blue-500 text-white p-1 px-2 rounded focus:ring-0 focus:outline-none flex items-center gap-1">
                                Send
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

