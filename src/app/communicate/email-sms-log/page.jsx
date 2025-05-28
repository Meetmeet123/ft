
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
const initialData = [
    {
        title: 'Republic Day Celebration',
        description:
            'Republic Day is the day when the Republic of India marks and celebrates the date on which the Constitution of India came into effect on 26 January 2024.',
        date: '01/05/2024 11:56 am',
        email: true,
        sms: "",
        group: true,
        individual: "",
        class: ""
    },
    {
        title: 'National Republic Day',
        description:
            'India celebrated its 73rd National Republic Day on the 26th of January, 2022. The constitution of India was adopted on the 26th of November, 1949 with Dr. B. R. Ambedkar as the Chairman of the Drafting Committee.',
        date: '01/18/2023 01:34 pm',
        email: true,
        sms: false,
        group: true,
        individual: false,
        class: false
    },
    {
        title: 'Fees Notification',
        description:
            'The fee notification is sent electronically to the main contact stated in the ear-portal. Depending on which method of communication this person chose the notification is sent by email or fax.',
        date: '02/01/2022 05:12 pm',
        email: true,
        sms: false,
        group: true,
        individual: false,
        class: false
    },
    {
        title: 'Online Classes',
        description:
            'Be very punctual in log in time, screen off time, activity time table etc. Be ready with necessary text books, note books, pen, pencil and other accessories before class begins. Make sure the device is sufficiently charged before the beginning of the class.',
        date: '02/04/2025 05:02 pm',
        email: true,
        sms: false,
        group: true,
        individual: false,
        class: false
    },
    {
        title: 'Holi Celebration Notice',
        description:
            'The colors and special Holi food items will be organized by the school itself. No student is allowed to bring his/her own eatables and any kind of Holi color. Students are only allowed to enter by showing their ID-Cards.',
        date: '03/04/2024 11:13 am',
        email: true,
        sms: false,
        group: true,
        individual: false,
        class: false
    },
    {
        title: 'Holi Celebration Notice',
        description:
            'The colors and special Holi food items will be organized by the school itself. No student is allowed to bring his/her own eatables and any kind of Holi color. Students are only allowed to enter by showing their ID-Cards.',
        date: '03/04/2024 11:13 am',
        email: true,
        sms: false,
        group: true,
        individual: false,
        class: false
    },
    {
        title: "New Academic Session(2023-24)",
        description: `Registration for Admission from class I to IX is open from 05 Apr 2023. Parents are requested to register their ward(s) in online mode only for admission. Please note that admissions are subject to availability of seats in the respective class. Registration through online application for admission in the classes I to IX is not the guarantee for admission in APS Delhi. Admissions will be granted as per admission policy decided by the AWES Management.\n\nPrincipal\nAyasha Goyal`,
        date: "04/03/2023",
        email: false,
        sms: true,
        group: true,
        individual: false,
        class: false
    },
    {
        title: "Sports Day Events",
        description:
            "Games that are played on school sports days can be wide and varied. They can include straightforward sprints and longer races for all age groups as well as egg and spoon races.",
        date: "01/18/2023",
        email: true,
        sms: false,
        group: false,
        individual: false,
        class: true
    },
    {
        title: "Sports Day Events",
        description:
            "Games that are played on school sports days can be wide and varied. They can include straightforward sprints and longer races for all age groups as well as egg and spoon races.",
        date: "01/18/2023",
        email: true,
        sms: false,
        group: false,
        individual: false,
        class: true
    },
    {
        title: "Sports Day Events",
        description:
            "Games that are played on school sports days can be wide and varied. They can include straightforward sprints and longer races for all age groups as well as egg and spoon races.",
        date: "01/18/2023",
        email: true,
        sms: false,
        group: false,
        individual: false,
        class: true
    },
    {
        title: "National Republic Day",
        description:
            "India celebrated its 73rd National Republic Day on the 26th of January, 2022. The constitution of India was adopted on the 26th of November, 1949 with Dr. B. R. Ambedkar as the Chairman of the Drafting Committee.",
        date: "01/18/2023",
        email: true,
        sms: false,
        group: true,
        individual: false,
        class: false
    },
    {
        title: "Fees Notification",
        description:
            "The fee notification is sent electronically to the main contact stated in the ear-portal.",
        date: "02/01/2022",
        email: true,
        sms: false,
        group: true,
        individual: false,
        class: false
    },


];

export default function EmailSMSLog() {
    const [data, setData] = useState(initialData);


    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'asc' });

    const sortedData = [...data]
        .filter(
            (item) =>
                item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description.toLowerCase().includes(searchTerm.toLowerCase())
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
        <div className="p-6 bg-white mt-2 shadow-lg">
            <h2 className="text-xl mb-2 border-b pb-2">Email / SMS Log</h2>
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
                {/* Right Icons */}
                <div className="flex items-center border-b ">
                    <div className='hover:bg-gray-200 p-1'>  <VscFiles className='' /></div>
                    <div className='hover:bg-gray-200 p-1 ' ><FaRegFileExcel /></div>
                    <div className='hover:bg-gray-200 p-1' > <ImFileText2 /></div>
                    <div className='hover:bg-gray-200 p-1' > <AiOutlineFilePdf /></div>
                    <div className='hover:bg-gray-200 p-1 ' > <PiPrinterFill /></div>
                    <div className='hover:bg-gray-200 p-1' >  <LuColumns2 /></div>



                </div>
            </div>
            <div className="overflow-auto ">
                <table className="w-full text-sm text-left border-b pb-2">
                    <thead className=" w-[1160]">
                        <tr>
                            {['title', 'description', 'date', 'email', 'sms', 'group', 'individual', 'class'].map((key) => (
                                <th
                                    key={key}
                                    className="p-2 font-medium cursor-pointer"
                                    onClick={() => requestSort(key)}
                                >
                                    <div className="flex items-center gap-1 capitalize">
                                        {key} {renderSortIcon()}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((item, index) => (
                            <tr key={index} className="border-t hover:bg-gray-200">
                                {/* Title - more width */}
                                <td className="p-3 align-top font-medium text-gray-900 w-[200px]">
                                    {item.title}
                                </td>

                                {/* Description - maximum width */}
                                <td className="p-3 align-top text-gray-700 w-[1000px] break-words whitespace-pre-wrap">
                                    {item.description}
                                </td>

                                {/* Date + check icons - very narrow */}
                                <td className="p-3 align-top text-gray-500 whitespace-nowrap w-[60px]">
                                    {item.date}
                                </td>
                                <td className="p-3 align-top w-[20px]">{renderCheckIcon(item.email)}</td>
                                <td className="p-3 align-top w-[20px]">{renderCheckIcon(item.sms)}</td>
                                <td className="p-3 align-top w-[20px]">{renderCheckIcon(item.group)}</td>
                                <td className="p-3 align-top w-[20px]">{renderCheckIcon(item.individual)}</td>
                                <td className="p-3 align-top w-[20px]">{renderCheckIcon(item.class)}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>
                {data && sortedData.length > 0 && (
                    <div>
                        <div className="flex items-center justify-between mt-4">
                            <p className="text-xs">
                                Records: {sortedData.length > 0 ? `1 to ${sortedData.length} of ${sortedData.length}` : '0'}
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

